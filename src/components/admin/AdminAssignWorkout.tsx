import React, { useState, useEffect } from "react";

export const AdminAssignWorkout = ({ clientId }) => {
  const [workouts, setWorkouts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/workout-split/${clientId}`)
      .then((res) => res.json())
      .then((data) => {
        // Data now comes as: { exercises: [{name, sets, reps, howTo}, ...], ...metadata }
        const mapped = (data || []).map((w) => ({
          ...w,
          exercises: w.exercises || [],
        }));
        setWorkouts(mapped);
      })
      .catch(() => setWorkouts([]));
  }, [clientId]);

  const handleAddExercise = (dayIndex) => {
    const updated = [...workouts];
    updated[dayIndex].exercises.push({
      name: "",
      sets: "",
      reps: "",
      howTo: "",
    });
    setWorkouts(updated);
  };

  const handleRemoveExercise = (dayIndex, exIndex) => {
    const updated = [...workouts];
    updated[dayIndex].exercises.splice(exIndex, 1);
    setWorkouts(updated);
  };

  const handleExerciseChange = (dayIndex, exIndex, field, value) => {
    const updated = [...workouts];
    updated[dayIndex].exercises[exIndex][field] = value;
    setWorkouts(updated);
  };

  const handleSubmit = async (e, dayIndex) => {
    e.preventDefault();
    const workout = workouts[dayIndex];

    const payload = {
      client_id: clientId,
      day: dayIndex + 1,
      upcoming_workout_split_name: workout.upcoming_workout_split_name,
      upcoming_workout_date: workout.upcoming_workout_date,
      idupcoming_workouts: workout.idupcoming_workouts || null,
      exercises: workout.exercises,
    };

    const response = await fetch(
      "https://connorsnowpt.onrender.com/api/insert-a-client-split",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (!clientId) return <p className="text-red-500">Loading client ID...</p>;

  const emptyDayWorkout = {
    upcoming_workout_split_name: "",
    upcoming_workout_date: "",
    idupcoming_workouts: null,
    exercises: [],
  };

  const completeWorkouts = [0, 1, 2].map(
    (i) => workouts[i] || { ...emptyDayWorkout }
  );

  return (
    <div className="w-full px-4 py-4">
      <div className="gap-6 md:flex md:flex-wrap">
        {completeWorkouts.map((workout, dayIndex) => (
          <form
            key={dayIndex}
            onSubmit={(e) => handleSubmit(e, dayIndex)}
            className="mb-6 w-full overflow-hidden rounded-xl bg-white shadow-lg border border-slate-100 md:w-[32%]"
          >
            <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600" />

            <div className="bg-gray-900 p-6 text-white">
              <input
                value={workout.upcoming_workout_split_name}
                onChange={(e) => {
                  const updated = [...workouts];
                  updated[dayIndex].upcoming_workout_split_name = e.target.value;
                  setWorkouts(updated);
                }}
                placeholder={`Workout Name Day ${dayIndex + 1}`}
                className="w-full bg-transparent text-xl font-bold text-white placeholder-slate-400 focus:outline-none mb-3"
              />
              <input
                type="date"
                value={
                  workout.upcoming_workout_date ||
                  new Date().toISOString().split("T")[0]
                }
                onChange={(e) => {
                  const updated = [...workouts];
                  updated[dayIndex].upcoming_workout_date = e.target.value;
                  setWorkouts(updated);
                }}
                className="w-full bg-slate-800 text-white text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 font-semibold text-slate-700">
                      Exercise
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-700">
                      Sets
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-700">
                      Reps
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-700">
                      How To
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {workout.exercises.map((ex, exIndex) => (
                    <tr
                      key={exIndex}
                      className="border-b border-slate-200 hover:bg-blue-50 transition"
                    >
                      <td className="px-4 py-3">
                        <input
                          value={ex.name}
                          onChange={(e) =>
                            handleExerciseChange(
                              dayIndex,
                              exIndex,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Exercise name"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          value={ex.sets}
                          onChange={(e) =>
                            handleExerciseChange(
                              dayIndex,
                              exIndex,
                              "sets",
                              e.target.value
                            )
                          }
                          placeholder="Sets"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          value={ex.reps}
                          onChange={(e) =>
                            handleExerciseChange(
                              dayIndex,
                              exIndex,
                              "reps",
                              e.target.value
                            )
                          }
                          placeholder="Reps"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          value={ex.howTo}
                          onChange={(e) =>
                            handleExerciseChange(
                              dayIndex,
                              exIndex,
                              "howTo",
                              e.target.value
                            )
                          }
                          placeholder="Video URL"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveExercise(dayIndex, exIndex)
                          }
                          className="text-red-500 hover:text-red-700 font-semibold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-slate-200 space-y-3">
              <button
                type="button"
                onClick={() => handleAddExercise(dayIndex)}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                + Add Exercise
              </button>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Save Workout Day {dayIndex + 1}
              </button>
            </div>
          </form>
        ))}
      </div>

      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500/80 text-white px-6 py-3 rounded-lg shadow-lg">
          ✓ Workout saved successfully!
        </div>
      )}
    </div>
  );
};