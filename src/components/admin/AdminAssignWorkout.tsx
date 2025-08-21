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
    <div className="mb-4 mt-10 w-full px-4 py-4 text-black md:mt-0 md:w-full">
      <h1 className="hidden rounded-t-2xl bg-gray-800 px-8 py-4 text-2xl font-bold text-white md:flex">
        Your Client's Workout Split
      </h1>

      <div className="mt-4 flex-wrap gap-6 md:flex">
        {completeWorkouts.map((workout, dayIndex) => (
          <form
            key={dayIndex}
            className="shadow-m transitioxn-transform mb-6 w-full overflow-hidden rounded-2xl bg-white hover:scale-[1.02] md:w-[32%]"
            method="POST"
            action="https://www.connorsnowpt.com/api/insert-a-client-split"
          >
            <div className="flex flex-col">
              <div className="bg-gray-900 text-black">
                <div className="bg-gray-900 p-6">
                  <h2 className="text-xl font-bold uppercase"></h2>
                  <input
                    name="upcoming_workout_split_name"
                    defaultValue={workout.upcoming_workout_split_name}
                    placeholder={`Workout Name Day ${dayIndex + 1}`}
                    className="mr-2 w-full p-1 text-lg font-semibold"
                  />
                  <input
                    name="upcoming_workout_date"
                    type="date"
                    defaultValue={
                      workout.upcoming_workout_date ||
                      new Date().toISOString().split("T")[0]
                    }
                    className="rounded p-1 text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between"></div>
              {workout.idupcoming_workouts && (
                <input
                  type="hidden"
                  name="idupcoming_workouts"
                  value={workout.idupcoming_workouts}
                />
              )}
              <input type="hidden" name="client_id" value={clientId} />
              <input type="hidden" name="day" value={dayIndex + 1} />
            </div>

            <table className="w-full table-auto text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2">Exercise</th>
                  <th className="p-2">Sets</th>
                  <th className="p-2">Reps</th>
                  <th className="p-2">How To</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                {workout.exercises.map((ex, exIndex) => (
                  <tr key={exIndex} className="hover:bg-gray-200">
                    <td className="border-b p-2">
                      <input
                        name={`exercises[${exIndex}][name]`}
                        defaultValue={ex.name}
                        className="h-12 w-full rounded p-1"
                      />
                      <td className="border-b p-2">
                        {/* <Select
                        name={`exercises[${exIndex}][name]`}
                        options={options}
                        defaultValue={options.find(
                          (option) => option.value === ex.name
                        )}
                        className="w-full rounded"
                        placeholder="Select an exercise"
                        isClearable
                      /> */}
                      </td>
                    </td>
                    <td className="border-b p-2">
                      <input
                        name={`exercises[${exIndex}][sets]`}
                        defaultValue={ex.sets}
                        className="h-12 w-full rounded p-1"
                      />
                    </td>
                    <td className="border-b p-2">
                      <input
                        name={`exercises[${exIndex}][reps]`}
                        defaultValue={ex.reps}
                        className="h-12 w-full rounded p-1"
                      />
                    </td>
                    <td className="border-b p-2">
                      <input
                        name={`exercises[${exIndex}][howTo]`}
                        defaultValue={ex.howTo}
                        className="h-12 w-full rounded p-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Save Workout Day {dayIndex + 1}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};
