import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const WorkoutSplitTable = () => {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("id");
  const [workouts, setWorkouts] = useState([]); // setup the array setWorkouts to fetch workouts to map later

  useEffect(() => {
    if (!clientId) return;
    fetch(`https://connorsnowpt.onrender.com/api/workout-split/${clientId}`) // fetch the response
      .then((res) => res.json()) // format the response in JSON
      .then((data) => setWorkouts(data || [])); // store data in workouts or default to empty array
  }, [clientId]);

  return (
    <div className="px-4 py-4 mb-4 text-black md:w-full w-full mt-10 md:mt-0">
      <h1 className="py-4 hidden md:flex text-2xl font-bold text-white px-8 bg-gray-800">
        Your Week Workout Split
      </h1>

      <div className="mt-4 gap-4 md:flex">
        {workouts.length === 0 ? (
          <p>No upcoming workouts found.</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout.idupcoming_workouts} className="border-2 bg-white md:w-1/3">
              <div className="bg-gray-600 p-4 flex justify-between text-white">
                <h1 className="text-l">{workout.upcoming_workout_split_name}</h1>
                <h1 className="text-l">
                  {new Date(workout.upcoming_workout_date).toLocaleDateString()}
                </h1>
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
                  {workout.upcoming_workout_e_one_name && (
                    <tr>
                      <td className="border-2">{workout.upcoming_workout_e_one_name}</td>
                      <td className="border-2">{workout.upcoming_workout_e_one_sets}</td>
                      <td className="border-2">{workout.upcoming_workout_e_one_reps}</td>
                      <td className="border-2">
                        <iframe
                          width="100%"
                          height="150"
                          src={workout.upcoming_workout_e_one_how_to}
                          title="Exercise Video 1"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </td>
                    </tr>
                  )}

                  {workout.upcoming_workout_e_two_name && (
                    <tr>
                      <td className="border-2">{workout.upcoming_workout_e_two_name}</td>
                      <td className="border-2">{workout.upcoming_workout_e_two_sets}</td>
                      <td className="border-2">{workout.upcoming_workout_e_two_reps}</td>
                      <td className="border-2">
                        <iframe
                          width="100%"
                          height="150"
                          src={workout.upcoming_workout_e_two_how_to}
                          title="Exercise Video 2"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </td>
                    </tr>
                  )}

                  {workout.upcoming_workout_e_three_name && (
                    <tr>
                      <td className="border-2">{workout.upcoming_workout_e_three_name}</td>
                      <td className="border-2">{workout.upcoming_workout_e_three_sets}</td>
                      <td className="border-2">{workout.upcoming_workout_e_three_reps}</td>
                      <td className="border-2">
                        <iframe
                          width="100%"
                          height="150"
                          src={workout.upcoming_workout_e_three_how_to}
                          title="Exercise Video 3"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </td>
                    </tr>
                  )}

                {workout.upcoming_workout_e_four_name && (
                    <tr>
                      <td className="border-2">{workout.upcoming_workout_e_four_name}</td>
                      <td className="border-2">{workout.upcoming_workout_e_four_sets}</td>
                      <td className="border-2">{workout.upcoming_workout_e_four_reps}</td>
                      <td className="border-2">
                        <iframe
                          width="100%"
                          height="150"
                          src={workout.upcoming_workout_e_four_how_to}
                          title="Exercise Video 3"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
