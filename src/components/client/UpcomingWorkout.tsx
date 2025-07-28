import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DumbbellIcon } from "lucide-react";
import Skeleton from 'react-loading-skeleton' 

export const UpcomingWorkout = () => {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("id");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/upcoming-workouts/${clientId}`)
      .then((res) => res.json())
      .then((data) => setWorkouts(data || []))
      .catch(() => setWorkouts([]))
      .finally(() => setLoading(false))
  }, [clientId]);

  if (loading) {
    return (
      <div className="px-4 py-4 w-1/2">
        <Skeleton height={400}/>
      </div>
    )
  }

  if (!clientId) return <p>Loading client ID...</p>;

  if (workouts.length === 0) {
    return (
      <div className="px-4 py-4 mb-4 text-black w-full md:w-1/2">
        <h1 className="py-4 md:flex text-2xl font-bold text-white px-8 bg-gray-800">
          Your Upcoming Workout
        </h1>
        <table className="px-2 py-2 text-black border-2 w-full h-full">
          <thead>
            <tr>
              <th className="border-2">Exercise</th>
              <th className="border-2">No. of Sets</th>
              <th className="border-2">No. of Reps</th>
              <th className="border-2">How To</th>
            </tr>
          </thead>
          <tbody className="border-2 text-center">
            <tr>
              <td colSpan={4}>No upcoming workouts found</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 mb-4 text-black md:w-1/2 w-full">
      {/* <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-t-lg shadow-sm h-2 relative overflow-hidden text-white" /> */}
      {/* <h1 className="py-4 hidden md:flex text-2xl font-bold text-white px-8 bg-gray-800">
        Your Upcoming Workout
      </h1> */}
      <div className="md:mt-0 bg-white rounded-t-lg ">
        <div className="p-4 md:mt-0 text-white">
          {workouts.map((workout) => {
            const exerciseNames = [
              "upcoming_workout_e_one_name",
              "upcoming_workout_e_two_name",
              "upcoming_workout_e_three_name",
              "upcoming_workout_e_four_name",
              "upcoming_workout_e_five_name",
              "upcoming_workout_e_six_name",
            ];

            return (
              <div key={workout.idupcoming_workouts} className="mb-4">
                <div className="text-black px-4">
                  <div className="flex justify-between">
                  <h1 className="mb-2 text-lg font-bold">Upcoming Workout</h1>
                  <a className="text-blue-600 hover:underline" href="/client/workouts">All Splits</a>
                  </div>
                  <div className="flex">
                    <DumbbellIcon className="bg-blue-200 text-blue-900" />
                    <h1 className="text-lg ml-4">
                      {workout.upcoming_workout_split_name}
                    </h1>
                  </div>
                  <h1 className="text-lg ml-10">
                    {workout.upcoming_workout_date}
                  </h1>
                </div>

                <div className="bg-black rounded-lg h-2 m-4" />

                <div className="text-black px-4">
                  {exerciseNames.map(
                    (field, index) =>
                      workout[field] && (
                        <div
                          key={index}
                          className="bg-gray-200 rounded-lg hover:bg-gray-400 duration-300 mb-4"
                        >
                          <h1 className="text-lg p-4">
                            {index + 1}. {workout[field]}
                          </h1>
                        </div>
                      )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
