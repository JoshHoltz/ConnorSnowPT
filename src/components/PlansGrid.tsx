import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// REF (Filtering with an API and UseEffect): https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm

{
  /* /////////////////////////////////////////////////////////////////////////////

* Using Consts
    1. plans and setPackages, are an array which will be be filled by the data from the API backend call
    2. Loading and setLoading, uses the Skeleton effect to show the loading effect while the data is being fetched by the API call. (Boolean Value)
    3. searchItem and setSearchedItem is used to store the search input from the user 
    4. filteredItems and setFilteredItems is used to store the filtered results based on the selected searchItem
    5. filterType and setFilterType is used to store the type of plan selected by the user if that be Cardio, Chest ect. 

* Use Effect & Functions
    1. The use effect is a hook that changes the state once the API call has been made and the data has been fetched
    2. Once the data has been fetched it:
        - Passes the data into the plans array (plans, setPackages)
        - Sets the filteredItems to the same data (so it can be filetered later if selected)
        - Booolean value of setLoading set to false to remove the sekelton effect 

  Handle Input Change
      1. This function is used to update the searchItem state once the user has inputed the search input
      2. Here we get the value (setSearchedItem) from the search field and then set of the setFilteredItems function off with the value input 
      3. The function then uses then calls the data and then uses .filter(plan) to filter and limit the results 


* If Loading
    1. If loading is true then the skeleton effect is shown while the data is being fetched

////////////////////////////////////////////////////////////////////////////// */
}

type Plan = {
  plan_id: number;
  plan_name: string;
  plan_pages: number;
  plan_type: string;
  plan_description: string;
  plan_price: number;
  plan_image: string;
  plan_stripe_link: string;
};

type PlanType = "cardio" | "chest" | "back" | "legs" | "nutrition";

export const PlansGrid = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [filterType, setFilterType] = useState<PlanType | null>(null); //button filtering

  // load the data from the API on initial render
  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/workout-plans")
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        setLoading(false);
      });
  }, []);

  // Filter the plans based on searchItem and filterType
  const filtered = plans.filter((plan: Plan) => {
    // Filter by search item
    const matchesSearch = plan.plan_name
      .toLowerCase()
      .includes(searchItem.toLowerCase());

    // Filter by type if filterType is set
    const matchesType =
      filterType !== null
        ? plan.plan_type.toLowerCase() == filterType.toLowerCase()
        : true;

    return matchesSearch && matchesType;
  });

  const handleInputChange = (e: React.ChangeEvent) => {
    setSearchItem((e.target as HTMLInputElement).value);
  };

  if (loading) {
    //If it is loading, show this skeleton effect
    return (
      <div className="p-4 px-4 md:px-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(6)].map(
            (
              _,
              i, // ARRRAY: length of 6 elements, which maps to the skeleton cards, so for each length index create a skeleeton card
            ) => (
              <div
                key={i}
                className="rounded border p-4 transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <Skeleton height={200} />
                <Skeleton count={2} />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
              </div>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-wrap items-center gap-4 bg-gray-200 py-4">
          <div className="flex gap-4 px-20">
            <input
              className="w-full rounded-lg p-2 sm:w-64"
              type="text"
              value={searchItem}
              onChange={handleInputChange}
              placeholder="Search..."
            />

            <div className="hidden gap-4 md:flex">
              <button
                onClick={() => {
                  setFilterType("cardio");
                }}
                className={`rounded-lg p-2 transition duration-300 ease-in-out md:w-auto lg:w-40 ${
                  filterType === "cardio"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-200 hover:bg-blue-400"
                }`}
              >
                Cardio
              </button>

              <button
                onClick={() => {
                  setFilterType("chest");
                }}
                className={`rounded-lg p-2 transition duration-300 ease-in-out md:w-auto lg:w-40 ${
                  filterType === "chest"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-200 hover:bg-blue-400"
                }`}
              >
                Chest
              </button>

              <button
                onClick={() => {
                  setFilterType("back");
                }}
                className={`rounded-lg p-2 transition duration-300 ease-in-out md:w-auto lg:w-40 ${
                  filterType === "back"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-200 hover:bg-blue-400"
                }`}
              >
                Back
              </button>

              <button
                onClick={() => {
                  setFilterType("legs");
                }}
                className={`rounded-lg p-2 transition duration-300 ease-in-out md:w-auto lg:w-40 ${
                  filterType === "legs"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-200 hover:bg-blue-400"
                }`}
              >
                Legs
              </button>

              <button
                onClick={() => {
                  setFilterType("nutrition");
                }}
                className={`rounded-lg p-2 transition duration-300 ease-in-out md:w-auto lg:w-40 ${
                  filterType === "nutrition"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-200 hover:bg-blue-400"
                }`}
              >
                Nutrition
              </button>

              <button
                onClick={() => {
                  setFilterType(null); // Reset filterType
                  setSearchItem("");
                }}
                className="rounded-lg bg-red-200 p-2 text-red-800 transition duration-300 ease-in-out hover:bg-red-400 md:w-auto lg:w-40"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Main Plan Grid - White Background */}
          <section>
            <div className="bg-white p-4 px-6 md:px-20">
              {searchItem && // If the searchItem has been set, show the number of matching results and plans
                (filtered.length > 0 ? (
                  <p className="mb-4 text-gray-700">
                    Showing {filtered.length} matching plans
                  </p>
                ) : (
                  // <p className="text-gray-500 mb-4">No plans match your search.</p>
                  <p className="mb-4 text-gray-500">
                    Nothing found for "{searchItem}"
                  </p>
                ))}

              <div className="flex grid-cols-1 flex-col justify-between gap-4 md:grid md:grid-cols-3">
                {filtered.map((plan) => (
                  <div
                    key={plan.plan_id}
                    className="flex flex-col justify-between rounded border p-4 transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <div>
                      {/* plan image */}
                      <img
                        src={`data:image/jpeg;base64,${plan.plan_image}`}
                        className="mb-4 h-48 w-full rounded object-cover"
                      />

                      <h2 className="text-xl font-bold underline">
                        {plan.plan_name}
                      </h2>
                      <p className="mb-2 text-gray-600">
                        {plan.plan_description}
                      </p>
                      <div className="flex justify-between">
                        <p className="font-bold">
                          Type:{" "}
                          <span className="text-blue-600">
                            {plan.plan_type}
                          </span>
                        </p>
                        <p className="font-bold">
                          Pages:{" "}
                          <span className="text-blue-600">
                            {plan.plan_pages}
                          </span>
                        </p>
                      </div>

                      <p className="mt-14 font-semibold text-green-600">
                        £{plan.plan_price}
                      </p>
                    </div>

                    {/* Button at the bottom */}
                    <a
                      href={plan.plan_stripe_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="plan-purchase mt-4 block w-full rounded bg-blue-500 py-2 text-center text-white transition duration-300 ease-in-out hover:bg-blue-600 hover:font-bold"
                    >
                      Purchase & Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
