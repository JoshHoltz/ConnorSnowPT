import React, { useState, useEffect } from "react";
import { Edit2, Plus } from "lucide-react";
import { UpcomingWorkoutEditor } from "./EditPremadeExercise";

export const PremadeTrainingPlanTable = () => {
  const [premadePlans, setPremadePlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [addedPlanForm, setAddedPlanForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlans = () => {
    fetch("https://connorsnowpt.onrender.com/api/premade_workouts")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then(setPremadePlans)
      .catch((err) => console.error("Error fetching premade plans:", err));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAddPlan = async (workout) => {
    setError(null);
    setSaving(true);
    try {
      const res = await fetch(
        "https://connorsnowpt.onrender.com/api/insert-premade-workout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            premade_workout_name: workout.name,
            premade_workout_exercises: workout.exercises ?? [],
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save plan");
      }

      setAddedPlanForm(false);
      fetchPlans();
    } catch (err) {
      console.error("Error inserting premade plan:", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="p-6">
      <div className="mb-8">
        {/* Add Premade Plan Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setEditingPlan(null);
              setError(null);
              setAddedPlanForm(true);
            }}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Premade Plan</span>
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

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
              <p className="text-slate-400 text-sm">Add a new one to get started</p>
            </div>
          )}

          {/* Edit existing plan */}
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
              <span className="font-semibold text-slate-900">{premadePlans.length}</span>{" "}
              premade plans
            </p>
          </div>
        </div>
      </div>

      {/* Add new plan form */}
      {addedPlanForm && (
        <UpcomingWorkoutEditor
          initialWorkout={null}
          onClose={() => setAddedPlanForm(false)}
          onSave={handleAddPlan}         
          saving={saving}    
        />
      )}
    </section>
  );
};