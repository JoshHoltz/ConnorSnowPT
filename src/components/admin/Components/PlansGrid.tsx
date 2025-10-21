import React, { useEffect, useState } from "react";
import { AddPlan } from "../AddPlan";
import { Plus, Trash2 } from "lucide-react";

export const AdminPlansGrid = () => {
  const [plans, setPlans] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    fetch("https://connorsnowpt.onrender.com/api/workout-plans")
      .then((res) => res.json())
      .then(setPlans);
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = async (planId: number) => {
    if (!window.confirm("Are you sure you want to delete this plan? This will also delete it from Stripe.")) {
      return;
    }

    setDeleting(planId);
    try {
      const response = await fetch(
        `https://connorsnowpt.onrender.com/api/delete-plan/${planId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setPlans(plans.filter((p) => p.plan_id !== planId));
        showSuccessMessage();
      } else {
        console.error("Delete failed:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <section>
      {/* Add plan button */}
      <div className="px-8 absolute top-4 right-4 mb-4">
        <button
          onClick={() => setShowAddPlan(true)}
          className="px-8 flex items-center gap-2 rounded-lg bg-blue-900 py-2 font-medium text-white shadow-md transition duration-200 hover:bg-blue-950"
        >
          <Plus size={20} />
          <span className="sm:inline">Add Plan</span>
        </button>
      </div>

      <div className="p-4 px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <form
              key={plan.plan_id}
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);

                try {
                  const response = await fetch(
                    "https://connorsnowpt.onrender.com/api/insert-plan-change",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    },
                  );

                  if (response.ok) {
                    showSuccessMessage();
                  } else {
                    console.error("Update failed:", await response.text());
                  }
                } catch (error) {
                  console.error("Error updating plan:", error);
                }
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col justify-between rounded border bg-white p-4 transition duration-300 ease-in-out hover:shadow-lg">
                <div>
                  <input type="hidden" name="plan_id" value={plan.plan_id} />

                  <img
                    src={`data:image/jpeg;base64,${plan.plan_image}`}
                    className="mb-4 h-48 w-full rounded object-cover"
                    alt={plan.plan_name}
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

                  <div className="flex justify-between gap-2">
                    <p className="font-bold">
                      Type:{" "}
                      <input
                        type="text"
                        name="plan_type"
                        className="w-20 border-2 p-1 font-semibold text-blue-600"
                        defaultValue={plan.plan_type}
                      />
                    </p>
                    <p className="font-bold">
                      Pages:{" "}
                      <input
                        type="text"
                        name="plan_pages"
                        className="w-20 border-2 p-1 font-semibold text-blue-600"
                        defaultValue={plan.plan_pages}
                      />
                    </p>
                  </div>

                  {/* <p>
                    Stripe Link:{" "}
                    <input
                      type="text"
                      name="plan_stripe_link"
                      className="mb-4 w-full border-2 p-2"
                      defaultValue={plan.plan_stripe_link}
                    />
                  </p> */}
                </div>

                <input
                  type="text"
                  name="plan_price"
                  className="mb-4 mt-6 w-full border-2 p-2 font-semibold text-green-600"
                  defaultValue={plan.plan_price}
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 mt-4 rounded bg-blue-500 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-600 hover:font-bold"
                  >
                    Save & Update
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(plan.plan_id)}
                    disabled={deleting === plan.plan_id}
                    className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded bg-red-600 text-white transition duration-300 ease-in-out hover:bg-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                    {deleting === plan.plan_id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </form>
          ))}
        </div>
      </div>

      {showSuccess && (
        <div className="animate-fade-in fixed right-4 top-4 z-50 rounded-lg bg-green-500/90 px-6 py-3 text-white shadow-lg">
          ✓ Operation completed successfully!
        </div>
      )}

      {showAddPlan && (
        <AddPlan
          onClose={() => setShowAddPlan(false)}
          onSuccess={() => fetchPlans()}
        />
      )}
    </section>
  );
};