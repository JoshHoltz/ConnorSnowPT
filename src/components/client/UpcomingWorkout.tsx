import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export const UpcomingWorkout = () => {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("id");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/upcoming-workouts/${clientId}`)
      .then((res) => res.json())
      .then((data) => setWorkouts(data || []))
      .catch(() => setWorkouts([]))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return (
      <div className="w-1/2 px-4 py-4">
        <Skeleton height={400} />
      </div>
    );
  }

  if (!clientId) return <p>Loading client ID...</p>;

  if (workouts.length === 0) {
    return (
      <div className="mb-4 w-full px-4 py-4 text-black md:w-1/2">
        <h1 className="bg-gray-800 px-8 py-4 text-2xl font-bold text-white md:flex">
          Your Upcoming Workout
        </h1>
        <table className="h-full w-full border-2 px-2 py-2 text-black">
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
    <div className="mb-4 w-full px-4 py-4 text-black md:w-1/2">
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
      <div className="border border-t-0 border-slate-200 bg-slate-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">
            Your Upcoming Workout
          </h1>
          <a
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            href="/client/workouts"
          >
            All Splits
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="rounded-t-lg bg-white md:mt-0">
        <div className="p-4 text-white md:mt-0">
          {workouts.map((workout) => {
            return (
              <div key={workout.idupcoming_workouts} className="mb-4">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between border-b border-slate-200 p-6 pb-6">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <div className="rounded-lg bg-blue-900 p-2">
                        <span className="text-white text-2xl">💪</span>
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                          {workout.upcoming_workout_split_name}
                        </h1>
                        <p className="mt-1 text-slate-600">
                          {workout.upcoming_workout_date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workouts */}
                <div className="px-4 text-black">
                  {workout.exercises_json &&
                    workout.exercises_json.map((exercise, index) => (
                      <div
                        key={index}
                        className="mb-4 rounded-lg border border-slate-200 bg-slate-100 duration-300 hover:bg-gray-400"
                      >
                        <h1 className="p-4 text-lg">
                          {index + 1}. {exercise.name}
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};