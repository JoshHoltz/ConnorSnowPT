import { useEffect, useState } from "react";

export const UpcomingWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://connorsnowpt.onrender.com/api/upcoming-workouts/${clientId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch upcoming workouts");
        return res.json();
      })
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="px-4 py-4 mb-4 text-black md:w-2/3 w-full">
      <h1 className="py-4 hidden md:flex text-2xl font-bold text-white px-8 bg-gray-800">
        Your Upcoming Workout
      </h1>
      <div className="border-2 mt-10 md:mt-0 bg-white ">
        <div className="p-4 mt-10 md:mt-0 text-white">
          {workouts.map((workout) => (
            <div key={workout.idupcoming_workouts} className="mb-4">
              <div className="bg-gray-600 p-4 flex justify-between">
                <h1 className="text-l">
                  {workout.upcoming_workout_split_name}
                </h1>
                <h1 className="text-l">{workout.upcoming_workout_date}</h1>
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
                    {/* row 1 */}

                    {workout.upcoming_workout_e_one_name != null && (
                  <tr>
                    <td className="border-2">
                      {workout.upcoming_workout_e_one_name}
                    </td>
                    <td className="border-2">
                      {workout.upcoming_workout_e_one_sets}
                    </td>
                    <td className="border-2">
                      {workout.upcoming_workout_e_one_reps}
                    </td>
                    <td className="border-2">
                      <iframe
                        src={workout.upcoming_workout_e_one_how_to}
                        frameBorder="0"
                        className="w-full h-48"
                        allowFullScreen
                      />
                    </td>
                  </tr>
                    )}


                  {/* row 2 */}
                {workout.upcoming_workout_e_two_name != null && (
                  <tr>
                    <td className="border-2">
                      {workout.upcoming_workout_e_two_name}
                    </td>
                    <td className="border-2">
                      {workout.upcoming_workout_e_two_sets}
                    </td>
                    <td className="border-2">
                      {workout.upcoming_workout_e_two_reps}
                    </td>
                    <td className="border-2">
                      <iframe
                        src={workout.upcoming_workout_e_two_how_to}
                        frameBorder="0"
                        className="w-full h-48"
                        allowFullScreen
                      />
                    </td>
                  </tr>
                )}

            {/* row 3 */}
                {workout.upcoming_workout_e_three_name != null && (
                  <tr>
                    <td className="border-2">
                      {workout.upcoming_workout_e_three_name}
                    </td>
                    <td className="border-2">
                      {workout.upcoming_workout_e_three_sets}
                    </td>
                    <td className="border-2">
                      {workout.upcoming_workout_e_three_reps}
                    </td>
                    <td className="border-2">
                      <iframe
                        src={workout.upcoming_workout_e_three_how_to}
                        frameBorder="0"
                        className="w-full h-48"
                        allowFullScreen
                      />
                    </td>
                  </tr>
                )}

            {/* row 4 */}
                {workout.upcoming_workout_e_four_name != null && (
                  <tr>
                    <td className="border-2">
                      {workout.upcoming_workout_e_four_name}
                    </td>
                    <td className="border-2">
                      {workout.upcoming_workout_e_four_sets}
                    </td>
                    <td className="border-2">
                      {workout.upcoming_workout_e_four_reps}
                    </td>
                    <td className="border-2">
                      <iframe
                        src={workout.upcoming_workout_e_four_how_to}
                        frameBorder="0"
                        className="w-full h-48"
                        allowFullScreen
                      />
                    </td>
                  </tr>
                )}

                </tbody>
              </table>


            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
