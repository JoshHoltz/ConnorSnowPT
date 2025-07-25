import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// REF (Filtering with an API and UseEffect): https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm

{/* /////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////// */}

export const PlansGrid = () => {
  const [plans, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchedItem] = useState("");
  const [filteredItems, setFilteredItems] = useState([]); 
  const [filterType, setFilterType] = useState(""); //button filtering

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/workout-plans")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then((data) => {
        setPackages(data);
        setFilteredItems(data);
        setLoading(false);

        const filtered = data.filter((plan) =>
          plan.plan_name.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredItems(filtered);
      });
  }, [searchItem]);

  const handleInputChange = (e) => {
    setSearchedItem(e.target.value);
  };

  if (loading) {
    //If it is loading, show this skeleton effect
    return (
      <div className="p-4 px-4 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map(
            (
              _,
              i // ARRRAY: length of 6 elements, which maps to the skeleton cards, so for each length index create a skeleeton card
            ) => (
              <div
                key={i}
                className="border p-4 rounded hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <Skeleton height={200} />
                <Skeleton count={2} />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-wrap items-center gap-4 bg-gray-200 py-4">
          <div className="px-20 flex gap-4">
            <input
              className="rounded-lg p-2 w-full sm:w-64"
              type="text"
              value={searchItem}
              onChange={handleInputChange}
              placeholder="Search..."
            />

            <div className="hidden md:flex gap-4">
            <button
              onClick={() => {
                setFilterType("Cardio");
              }}
              className={`p-2 lg:w-40 md:w-auto rounded-lg transition ease-in-out duration-300 ${
                (filterType === "Cardio" ) ? "text-white bg-blue-600 hover:bg-blue-700" : "bg-blue-200 hover:bg-blue-400"
              }`}
            >
              Cardio
            </button>

            <button
              onClick={() => {
                setFilterType("Chest");
              }}
              className={`p-2 lg:w-40 md:w-auto rounded-lg transition ease-in-out duration-300 ${
                (filterType === "Chest" ) ? "text-white bg-blue-600 hover:bg-blue-700" : "bg-blue-200 hover:bg-blue-400"
              }`}
            >
              Chest
            </button>

            <button
              onClick={() => {
                setFilterType("Back");
              }}
              className={`p-2 lg:w-40 md:w-auto rounded-lg transition ease-in-out duration-300 ${
                (filterType === "Back" ) ? "text-white bg-blue-600 hover:bg-blue-700" : "bg-blue-200 hover:bg-blue-400"
              }`}
            >
              Back
            </button>

            <button
              onClick={() => {
                setFilterType("Legs");
              }}
              className={`p-2 lg:w-40 md:w-auto rounded-lg transition ease-in-out duration-300 ${
                (filterType === "Legs" ) ? "text-white bg-blue-600 hover:bg-blue-700" : "bg-blue-200 hover:bg-blue-400"
              }`}
            >
              Legs
            </button>

            <button
              onClick={() => {
                setFilterType("Nutrition");
              }}
              className={`p-2 lg:w-40 md:w-auto rounded-lg transition ease-in-out duration-300 ${
                (filterType === "Nutrition" ) ? "text-white bg-blue-600 hover:bg-blue-700" : "bg-blue-200 hover:bg-blue-400"
              }`}
            >
              Nutrition
            </button>

              <button
                onClick={() => {
                  setFilteredItems([]); // Clear filtered items
                  setFilterType(""); // Reset filterType
                  setSearchedItem("");
                }}
                className="lg:w-40 md:w-auto p-2 rounded-lg bg-red-200 hover:bg-red-400 text-red-800 transition ease-in-out duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Main Plan Grid - White Background */}
          <section>
            <div className="bg-white px-20 p-4">
              {searchItem && // If the searchItem has been set, show the number of matching results and plans
                (filteredItems.length > 0 ? (
                  <p className="text-gray-700 mb-4">
                    Showing {filteredItems.length} matching plans
                  </p>
                ) : (
                  // <p className="text-gray-500 mb-4">No plans match your search.</p>
                  <p className="text-gray-500 mb-4">
                    Nothing found for "{searchItem}"
                  </p>
                ))}

              <div className="flex flex-col justify-between md:grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans
                  .filter(
                    (
                      plan //If filter has been applied, conver the plan input to lowercase and see if it is in the searchItem
                    ) =>
                      plan.plan_name
                        .toLowerCase()
                        .includes(searchItem.toLowerCase())
                  )

                  .filter((plan) =>
                    filterType ? plan.plan_type === filterType : true
                  )

                  .map((plan) => (
                    <div
                      key={plan.plan_id}
                      className="flex flex-col justify-between border p-4 rounded hover:bg-gray-100 transition duration-300 ease-in-out"
                    >
                      <div>
                        {/* plan image */}
                        <img
                          src={`data:image/jpeg;base64,${plan.plan_image}`}
                          className="w-full h-48 object-cover rounded mb-4"
                        />

                        <h2 className="text-xl font-bold underline">
                          {plan.plan_name}
                        </h2>
                        <p className="text-gray-600 mb-2">
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

                        <p className="text-green-600 font-semibold mt-14">
                          £{plan.plan_price}
                        </p>
                      </div>

                      {/* Button at the bottom */}
                      <a
                        href={plan.plan_stripe_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 hover:font-bold transition duration-300 ease-in-out text-center block"
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
}
