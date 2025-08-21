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
      <div className="p-4 px-4 md:px-8">
        <div className="flex grid-cols-1 flex-col justify-between gap-4 md:grid md:grid-cols-3">
          {plans.map((plan) => (
            <form
              key={plan.plan_id}
              action="https://connorsnowpt.onrender.com/api/insert-plan-change"
              method="POST"
              className="flex flex-col gap-4"
            >
              <div
                key={plan.plan_id}
                className="flex flex-col justify-between rounded border bg-white p-4 transition duration-300 ease-in-out hover:shadow-lg"
              >
                <div>
                  <input type="hidden" name="plan_id" value={plan.plan_id} />

                  <img
                    src={`data:image/jpeg;base64,${plan.plan_image}`}
                    className="mb-4 h-48 w-full rounded object-cover"
                  />

                  <input
                    type="text"
                    name="plan_name"
                    className="mb-4 w-full border-2 p-2 text-xl font-bold underline"
                    defaultValue={plan.plan_name}
                  />

                  <textarea
                    name="plan_description"
                    className="mb-2 h-28 w-full border-2 p-2 text-gray-600"
                    defaultValue={plan.plan_description}
                  />

                  <div className="flex justify-between">
                    <p className="font-bold">
                      Type:{" "}
                      <input
                        type="text"
                        name="plan_type"
                        className="mb-4 border-2 p-2 font-semibold text-blue-600"
                        defaultValue={plan.plan_type}
                      />
                    </p>
                    <p className="font-bold">
                      Pages:{" "}
                      <input
                        type="text"
                        name="plan_pages"
                        className="mb-4 border-2 p-2 font-semibold text-blue-600"
                        defaultValue={plan.plan_pages}
                      />
                    </p>
                  </div>

                  <input
                    type="text"
                    name="plan_price"
                    className="mb-4 mt-14 w-full border-2 p-2 font-semibold text-green-600"
                    defaultValue={plan.plan_price}
                  />
                </div>

                {/* Button at the bottom */}
                <button className="mt-4 w-full rounded bg-blue-500 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-600 hover:font-bold">
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
