import React, { useState, useEffect } from "react";
import Select from "react-select";

export const AdminAssignWorkout = ({ clientId }) => {
  const [workouts, setWorkouts] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

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
    (i) => workouts[i] || { ...emptyDayWorkout }
  );

  return (
    <div className="px-4 py-4 mb-4 text-black md:w-full w-full mt-10 md:mt-0">
      <h1 className="py-4 hidden md:flex text-2xl font-bold text-white px-8 bg-gray-800 rounded-t-2xl">
        Your Client's Workout Split
      </h1>

      <div className="mt-4 gap-6 md:flex flex-wrap">
        {completeWorkouts.map((workout, dayIndex) => (
          <form
            key={dayIndex}
            className="rounded-2xl overflow-hidden shadow-m bg-white transitioxn-transform hover:scale-[1.02] md:w-[32%] w-full mb-6"
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
                    className="text-lg font-semibold w-full mr-2 p-1"
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
              <div className="flex justify-between items-center"></div>
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

            <table className="table-auto w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2">Exercise</th>
                  <th className="p-2">Sets</th>
                  <th className="p-2">Reps</th>
                  <th className="p-2">How To</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm">
                {workout.exercises.map((ex, exIndex) => (
                  <tr key={exIndex} className="hover:bg-gray-200">
                    <td className="border-b p-2">
                      <input
                        name={`exercises[${exIndex}][name]`}
                        defaultValue={ex.name}
                        className="w-full p-1 rounded h-12"
                      />
                    {/* <td className="border-b p-2">
                      <Select
                        name={`exercises[${exIndex}][name]`}
                        options={options}
                        defaultValue={options.find((opt) => opt.value === ex.name)}
                        className="w-full rounded"
                        placeholder="Select an exercise"
                        isClearable
                      />
                    </td> */}
                    </td>
                    <td className="border-b p-2">
                      <input
                        name={`exercises[${exIndex}][sets]`}
                        defaultValue={ex.sets}
                        className="w-full p-1 rounded h-12"
                      />
                    </td>
                    <td className="border-b p-2">
                      <input
                        name={`exercises[${exIndex}][reps]`}
                        defaultValue={ex.reps}
                        className="w-full p-1 rounded h-12"
                      />
                    </td>
                    <td className="border-b p-2">
                      <input
                        name={`exercises[${exIndex}][howTo]`}
                        defaultValue={ex.howTo}
                        className="w-full p-1 rounded h-12"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
            >
              Save Workout Day {dayIndex + 1}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};
