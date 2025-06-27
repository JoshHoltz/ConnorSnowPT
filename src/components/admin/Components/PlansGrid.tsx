import React, { useEffect, useState } from "react";

export const AdminPlansGrid = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/workout-plans")
      .then((res) => res.json())
      .then(setPlans);
  }, []);

  return (
    <section>
      <div className="bg-white p-4 px-4 md:px-8">
        <div className="flex flex-col justify-between md:grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <form
              action="https://connorsnowpt.onrender.com/api/insert-plan-change"
              method="POST"
              className="flex flex-col gap-4"
            >
              <div
                key={plan.plan_id}
                className="flex flex-col justify-between border p-4 rounded hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <div>
                  <input type="hidden" name="plan_id" value={plan.plan_id} />

                  {/* plan image */}
                  <img
                    src={`data:image/jpeg;base64,${plan.plan_image}`}
                    className="w-full h-48 object-cover rounded mb-4"
                  />

                  <input
                    type="text"
                    name="plan_name"
                    className="text-xl font-bold underline w-full border-2 p-2 mb-4"
                    defaultValue={plan.plan_name}
                  />

                  <textarea
                    name="plan_description"
                    className="text-gray-600 mb-2 w-full border-2 p-2 h-28"
                    defaultValue={plan.plan_description}
                  />

                  <div className="flex justify-between">
                    <p className="font-bold">
                      Type:{" "}
                      <input
                        type="text"
                        name="plan_type"
                        className="text-blue-600 font-semibold border-2 p-2 mb-4"
                        defaultValue={plan.plan_type}
                      />
                    </p>
                    <p className="font-bold">
                      Pages:{" "}
                      <input
                        type="text"
                        name="plan_pages"
                        className="text-blue-600 font-semibold border-2 p-2 mb-4"
                        defaultValue={plan.plan_pages}
                      />
                    </p>
                  </div>

                  <input
                    type="text"
                    name="plan_price"
                    className="text-green-600 font-semibold mt-14 border-2 p-2 mb-4 w-full"
                    defaultValue={plan.plan_price}
                  />
                </div>

                {/* Button at the bottom */}
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 hover:font-bold transition duration-300 ease-in-out">
                  Save & Update
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </section>
  );
};
