import React, { useState, useEffect } from "react";
import Select from "react-select";

export const AdminAssignWorkout = ({ clientId }) => {
  const [workouts, setWorkouts] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/workout-split/${clientId}`)
      .then((res) => res.json())
      .then((data) => {
        const fields = ["one", "two", "three", "four", "five", "six"];
        const mapped = (data || []).map((w) => ({
          ...w,
          exercises: fields.map((n) => ({
            name: w[`upcoming_workout_e_${n}_name`] || "",
            sets: w[`upcoming_workout_e_${n}_sets`] || "",
            reps: w[`upcoming_workout_e_${n}_reps`] || "",
            howTo: w[`upcoming_workout_e_${n}_how_to`] || "",
          })),
        }));
        setWorkouts(mapped);
      })
      .catch(() => setWorkouts([]));
  }, [clientId]);

  //get all exercies from the exercise api
  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/exercises")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((exercise) => ({
          value: exercise.exercise_name,
          label: exercise.exercise_name,
        }));
        setOptions(options);
      })
      .catch(() => setOptions([]));
  }, []);

  if (!clientId) return <p className="text-red-500">Loading client ID...</p>;

  const emptyDayWorkout = {
    upcoming_workout_split_name: "",
    upcoming_workout_date: "",
    idupcoming_workouts: null,
    exercises: Array(6).fill({ name: "", sets: "", reps: "", howTo: "" }),
  };

  const completeWorkouts = [0, 1, 2].map(
    (i) => workouts[i] || { ...emptyDayWorkout },
  );

  return (
    <div className="w-full px-4 py-4">
      <div className="mb-4">
      </div>

      <div className="gap-6 md:flex md:flex-wrap">
        {completeWorkouts.map((workout, dayIndex) => (
          <form
            key={dayIndex}
            className="mb-6 w-full overflow-hidden rounded-xl bg-white shadow-lg border border-slate-100 md:w-[32%]"
            method="POST"
            action="https://www.connorsnowpt.com/api/insert-a-client-split"
          >
            {/* Header Gradient */}
            <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />

            {/* Card Header */}
            <div className="bg-gray-900 p-6 text-white">
              <input
                name="upcoming_workout_split_name"
                defaultValue={workout.upcoming_workout_split_name}
                placeholder={`Workout Name Day ${dayIndex + 1}`}
                className="w-full bg-transparent text-xl font-bold text-white placeholder-slate-400 focus:outline-none mb-3"
              />
              <input
                name="upcoming_workout_date"
                type="date"
                defaultValue={
                  workout.upcoming_workout_date ||
                  new Date().toISOString().split("T")[0]
                }
                className="w-full bg-slate-800 text-white text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Hidden Fields */}
            {workout.idupcoming_workouts && (
              <input
                type="hidden"
                name="idupcoming_workouts"
                value={workout.idupcoming_workouts}
              />
            )}
            <input type="hidden" name="client_id" value={clientId} />
            <input type="hidden" name="day" value={dayIndex + 1} />

            {/* Exercises Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 font-semibold text-slate-700">Exercise</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Sets</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Reps</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">How To</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {workout.exercises.map((ex, exIndex) => (
                    <tr key={exIndex} className="border-b border-slate-200 hover:bg-blue-50 transition">
                      <td className="px-4 py-3">
                        <input
                          name={`exercises[${exIndex}][name]`}
                          defaultValue={ex.name}
                          placeholder="Exercise name"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          name={`exercises[${exIndex}][sets]`}
                          defaultValue={ex.sets}
                          placeholder="Sets"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          name={`exercises[${exIndex}][reps]`}
                          defaultValue={ex.reps}
                          placeholder="Reps"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          name={`exercises[${exIndex}][howTo]`}
                          defaultValue={ex.howTo}
                          placeholder="Video URL"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
            <div className="p-6 border-t border-slate-200">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Save Workout Day {dayIndex + 1}
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};