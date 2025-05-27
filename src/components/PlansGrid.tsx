import React, { useEffect, useState } from "react";

export const PlansGrid = () => {
  const [plan, setPackages] = useState([]);

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
        <div className="bg-white px-20">
          <div className="container flex flex-col md:flex-row text-black"></div>
        </div>
      </section>
    </>
  );
};
