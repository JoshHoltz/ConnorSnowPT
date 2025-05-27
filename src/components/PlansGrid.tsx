import React, { useEffect, useState } from "react";

export const PlansGrid = () => {
  const [plans, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/workout-plans")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then(setPackages);
  }, []);

  return (
    <>
      <div className="bg-gray-200 px-4 md:px-20 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <input
            className="rounded-lg p-2 w-full sm:w-64"
            type="text"
            placeholder="Search..."
          />

          <div className="hidden md:flex gap-4">
            <button className="p-2 lg:w-40 md:w-auto rounded-lg bg-blue-200 hover:bg-blue-400 transition ease-in-out duration-300">
              Cardio
            </button>
            <button className="p-2 lg:w-40 md:w-auto rounded-lg bg-blue-200 hover:bg-blue-400 transition ease-in-out duration-300">
              Chest
            </button>
            <button className="p-2 lg:w-40 md:w-auto rounded-lg bg-blue-200 hover:bg-blue-400 transition ease-in-out duration-300">
              Back
            </button>
            <button className="p-2 lg:w-40 md:w-auto rounded-lg bg-blue-200 hover:bg-blue-400 transition ease-in-out duration-300">
              Legs
            </button>
            <button className="p-2 lg:w-40 md:w-auto rounded-lg bg-blue-200 hover:bg-blue-400 transition ease-in-out duration-300">
              Nutrition
            </button>
          </div>
        </div>
      </div>

      {/* Main Plan Grid - White Background */}
      <section>
        <div className="bg-white p-4 px-0 md:px-20">
          <div className="flex flex-col justify-between md:grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.plan_id}
                className="flex flex-col justify-between border p-4 rounded"
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
                  <p className="text-gray-600 mb-2">{plan.plan_description}</p>
                  <div className="flex justify-between">
                    <p className="font-bold">
                      Type:{" "}
                      <span className="text-blue-600">{plan.plan_type}</span>
                    </p>
                    <p className="font-bold">
                      Pages:{" "}
                      <span className="text-blue-600">{plan.plan_pages}</span>
                    </p>
                  </div>

                  <p className="text-green-600 font-semibold mt-2">
                    £{plan.plan_price}
                  </p>
                </div>

                {/* Button at the bottom */}
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 hover:font-bold transition duration-300 ease-in-out">
                  Purchase & Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
