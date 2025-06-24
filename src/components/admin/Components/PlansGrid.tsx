import React, { useEffect, useState } from "react";

export const AdminPlansGrid = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/workout-plans")
      .then((res) => res.json())
      .then(setPlans);
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedPlans = [...plans];
    updatedPlans[index][field] = value;
    setPlans(updatedPlans);
  };

  const handleSave = (plan) => {
    fetch(`https://connorsnowpt.onrender.com/api/workout-plans/${plan.plan_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        alert("Plan updated successfully");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <section className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Admin Workout Plan Editor</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {plans.map((plan, index) => (
          <div key={plan.plan_id} className="border p-4 rounded shadow">
            <img
              src={`data:image/jpeg;base64,${plan.plan_image}`}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <input
              className="mb-2 p-2 border w-full"
              value={plan.plan_name}
              onChange={(e) =>
                handleInputChange(index, "plan_name", e.target.value)
              }
            />
            <textarea
              className="mb-2 p-2 border w-full"
              value={plan.plan_description}
              onChange={(e) =>
                handleInputChange(index, "plan_description", e.target.value)
              }
            />
            <input
              className="mb-2 p-2 border w-full"
              value={plan.plan_type}
              onChange={(e) =>
                handleInputChange(index, "plan_type", e.target.value)
              }
            />
            <input
              className="mb-2 p-2 border w-full"
              type="number"
              value={plan.plan_pages}
              onChange={(e) =>
                handleInputChange(index, "plan_pages", e.target.value)
              }
            />
            <input
              className="mb-2 p-2 border w-full"
              type="number"
              value={plan.plan_price}
              onChange={(e) =>
                handleInputChange(index, "plan_price", e.target.value)
              }
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => handleSave(plan)}
            >
              Save Changes
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
