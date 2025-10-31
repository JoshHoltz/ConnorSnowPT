import React, { useState, useEffect } from "react";
import { Edit2, Plus } from "lucide-react";
import { UpcomingWorkoutEditor } from "./EditPremadeExercise"

export const PremadeTrainingPlanTable = () => {
  const [premadePlans, setPremadePlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showEditor, setShowEditor] = useState(false);


  // Fetch premade workouts from backend
  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/premade_workouts")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then(setPremadePlans)
      .catch((err) => console.error("Error fetching premade plans:", err));
  }, []);

  return (
    <section className="p-6">
      <div className="mb-8">
        {/* Add Premade Plan Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => alert("Add Premade Plan here")}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Premade Plan</span>
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
          <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Workout Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Exercises</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {premadePlans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="border-b border-slate-100 hover:bg-blue-50 transition duration-200"
                  >
                    {/* Workout Name */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{plan.name}</p>
                      <p className="text-sm text-slate-500">ID: {plan.id}</p>
                    </td>

                    {/* Exercise Count */}
                    <td className="px-6 py-4">
                      <span className="text-slate-700 font-medium">
                        {plan.exercises?.length || 0} exercises
                      </span>
                    </td>

                    {/* Edit Button */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setEditingPlan(plan);
                          setShowEditor(true);
                        }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
                      >
                        <Edit2 size={18} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {premadePlans.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-500 font-medium">No premade plans found</p>
              <p className="text-slate-400 text-sm">
                Add a new one to get started
              </p>
            </div>
          )}

          {/* show editor */}
          {showEditor && editingPlan && (
            <UpcomingWorkoutEditor
              initialWorkout={editingPlan}
              onClose={() => setShowEditor(false)}
            />
          )}


          {/* Footer Stats */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {premadePlans.length}
              </span>{" "}
              premade plans
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
