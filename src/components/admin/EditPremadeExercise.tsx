import React, { useState, useEffect } from "react";
import { X, PlusCircle, Trash2 } from "lucide-react";

export const UpcomingWorkoutEditor = ({ onClose, initialWorkout }) => {
  const [workoutName, setWorkoutName] = useState(initialWorkout?.name || "");
  const [exercises, setExercises] = useState(initialWorkout?.exercises || []);
  const [premadeWorkouts, setPremadeWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch premade workouts
  useEffect(() => {
    const fetchPremadeWorkouts = async () => {
      try {
        const res = await fetch("https://connorsnowpt.onrender.com/api/premade_workouts");
        if (!res.ok) throw new Error("Failed to fetch premade workouts");
        const data = await res.json();
        setPremadeWorkouts(data);
      } catch (err) {
        console.error("Error fetching premade workouts:", err);
      }
    };

    fetchPremadeWorkouts();
  }, []);

  // Handle selecting a premade workout
  const handleSelectPremadeWorkout = (id) => {
    const selected = premadeWorkouts.find((w) => w.id === parseInt(id));
    if (!selected) return;

    setWorkoutName(selected.name);
    setExercises(selected.exercises);
  };

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: "", reps: "", howTo: "" },
    ]);
  };

  const handleRemoveExercise = (index) => {
    const updated = [...exercises];
    updated.splice(index, 1);
    setExercises(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const handleSubmit = async () => {
    if (!workoutName.trim()) {
      alert("Please enter a workout name");
      return;
    }
    if (exercises.length === 0) {
      alert("Please add at least one exercise");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://connorsnowpt.onrender.com/api/update-upcoming-workout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: workoutName, exercises }),
        }
      );

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        alert("Failed to save workout");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Edit Upcoming Workout
            </h2>
            <p className="text-sm text-gray-600">
              Add, edit, or remove exercises for this workout
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-8 p-6">
          {/* Workout Name */}
          <section className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
            <h1 className="mb-4 text-lg font-semibold text-gray-800">
              Workout Details
            </h1>

            <label className="block font-medium text-gray-700 mb-2">
              Workout Name
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Push Day, Pull Day, Leg Day"
            />

            {/* Premade Workout Selector */}
            <label className="block font-medium text-gray-700 mt-4 mb-2">
              Load Premade Workout
            </label>
            <select
              onChange={(e) => handleSelectPremadeWorkout(e.target.value)}
              className="w-full bg-white border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a premade workout...</option>
              {premadeWorkouts.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </section>

          {/* Exercises */}
          <section className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-semibold text-gray-800">Exercises</h1>
              <button
                onClick={handleAddExercise}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
              >
                <PlusCircle size={20} />
                Add Exercise
              </button>
            </div>

            {exercises.length === 0 ? (
              <p className="text-gray-500 italic">
                No exercises added yet.
              </p>
            ) : (
              exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="mb-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">
                      Exercise {index + 1}
                    </h3>
                    <button
                      onClick={() => handleRemoveExercise(index)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <label className="block text-gray-700 text-sm mt-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bench Press"
                  />

                  <div className="flex gap-4 mt-3">
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm">
                        Sets
                      </label>
                      <input
                        type="text"
                        value={exercise.sets}
                        onChange={(e) =>
                          handleChange(index, "sets", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 3"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm">
                        Reps
                      </label>
                      <input
                        type="text"
                        value={exercise.reps}
                        onChange={(e) =>
                          handleChange(index, "reps", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 12"
                      />
                    </div>
                  </div>

                  <label className="block text-gray-700 text-sm mt-3">
                    How-To (YouTube embed URL)
                  </label>
                  <input
                    type="text"
                    value={exercise.howTo}
                    onChange={(e) =>
                      handleChange(index, "howTo", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
              ))
            )}
          </section>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-gray-400 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-gray-500 hover:shadow-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Workout"}
            </button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed right-4 top-4 rounded-lg bg-green-500/80 px-6 py-3 text-white shadow-lg">
          ✓ Workout Saved Successfully!
        </div>
      )}
    </div>
  );
};

export default UpcomingWorkoutEditor;
