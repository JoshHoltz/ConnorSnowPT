import React, { useState, useEffect } from "react";

export const AdminAssignWorkout = ({ clientId }) => {
  const [workouts, setWorkouts] = useState([]);

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

  if (!clientId) return <p>Loading client ID...</p>;

  const emptyDayWorkout = {
    upcoming_workout_split_name: "",
    upcoming_workout_date: "",
    idupcoming_workouts: null,
    exercises: [
      { name: "", sets: "", reps: "", howTo: "" },
      { name: "", sets: "", reps: "", howTo: "" },
      { name: "", sets: "", reps: "", howTo: "" },
      { name: "", sets: "", reps: "", howTo: "" },
    ],
  };

  // Always render 3 workout forms
  const completeWorkouts = [0, 1, 2].map((i) => workouts[i] || { ...emptyDayWorkout });

  return (
    <div className="px-4 py-4 mb-4 text-black md:w-full w-full mt-10 md:mt-0">
      <h1 className="py-4 hidden md:flex text-2xl font-bold text-white px-8 bg-gray-800">
        Your Clients Workout Split
      </h1>

      <div className="mt-4 gap-4 md:flex flex-wrap">
        {completeWorkouts.map((workout, dayIndex) => (
          <form
            key={dayIndex}
            className="border-2 bg-white md:w-[32%] mb-6 min-h-[500px]"
            method="POST"
            action="https://connor-snow-pt-bdd7a068ad9e.herokuapp.com/api/insert-a-client-split"
          >
            <div className="bg-gray-600 p-4 flex justify-between text-black">
              <input
                name="upcoming_workout_split_name"
                defaultValue={workout.upcoming_workout_split_name}
                className="text-l"
                placeholder={`Workout Split Name Day ${dayIndex + 1}`}
              />
              <input
                name="upcoming_workout_date"
                defaultValue={
                  workout.upcoming_workout_date ||
                  new Date().toISOString().split("T")[0]
                }
                className="text-l text-black"
                type="date"
              />
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

            <table className="px-2 py-2 text-black border-2 w-full">
              <thead>
                <tr>
                  <th className="border-2">Exercise</th>
                  <th className="border-2">No. of Sets</th>
                  <th className="border-2">No. of Reps</th>
                  <th className="border-2">How To</th>
                </tr>
              </thead>
              <tbody className="border-2 text-center">
                {workout.exercises.map((ex, exIndex) => (
                  <tr key={exIndex}>
                    <td className="border-2">
                      <input
                        className="border-2 w-full"
                        name={`exercises[${exIndex}][name]`}
                        defaultValue={ex.name}
                      />
                    </td>
                    <td className="border-2">
                      <input
                        className="border-2 w-full"
                        name={`exercises[${exIndex}][sets]`}
                        defaultValue={ex.sets}
                      />
                    </td>
                    <td className="border-2">
                      <input
                        className="border-2 w-full"
                        name={`exercises[${exIndex}][reps]`}
                        defaultValue={ex.reps}
                      />
                    </td>
                    <td className="border-2">
                      <input
                        className="border-2 w-full"
                        name={`exercises[${exIndex}][howTo]`}
                        defaultValue={ex.howTo}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit" className="p-2 m-4 bg-blue-600 text-white">
              Save Workout Day {dayIndex + 1}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};
