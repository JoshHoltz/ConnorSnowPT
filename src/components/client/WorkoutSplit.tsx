import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const WorkoutSplitTable = () => {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("id");
  const [workouts, setWorkouts] = useState([]);
  const [visibleHowTo, setVisibleHowTo] = useState({});

  useEffect(() => {
    if (!clientId) return;
    fetch(`https://connorsnowpt.onrender.com/api/workout-split/${clientId}`)
      .then((res) => res.json())
      .then((data) => setWorkouts(data || []));
  }, [clientId]);

  const toggleHowTo = (id) => {
    setVisibleHowTo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderExerciseRow = (exercise, sets, reps, howTo, id) => (
    <>
      <tr className="even:bg-gray-50">
        <td colSpan="2" className="p-4 text-left border-y">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{exercise}</span>
            {howTo && (
              <button
                onClick={() => toggleHowTo(id)}
                className="text-blue-600 hover:underline text-sm mt-1 self-start"
              >
                {visibleHowTo[id] ? "Hide How-To" : "Show How-To"}
              </button>
            )}
          </div>
        </td>
        <td className="border-y">{sets}</td>
        <td className="border-y">{reps}</td>
      </tr>
      {visibleHowTo[id] && (
        <tr className="bg-gray-100">
          <td colSpan="4" className="p-4">
            <iframe
              width="100%"
              height="250"
              src={howTo}
              title="Exercise Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-md"
            ></iframe>
          </td>
        </tr>
      )}
    </>
  );

  return (
    <div className="px-4 py-4 mb-4 text-black md:w-full w-full mt-10 md:mt-0">
      <h1 className="py-4 hidden md:flex text-2xl font-bold text-white px-8 bg-gray-800 rounded-t-2xl">
        Your Week Workout Split
      </h1>

      <div className="mt-4 gap-6 md:flex flex-wrap">
        {workouts.length === 0 ? (
          <p>No upcoming workouts found.</p>
        ) : (
          workouts.map((workout) => (
            <div
              key={workout.idupcoming_workouts}
              className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white transitioxn-transform hover:scale-[1.02] md:w-[32%] w-full mb-6"
            >
              <div className="h-2 bg-gray-700" />

              <div className="bg-gray-900 p-6 text-white">
                <h2 className="text-xl font-bold uppercase">
                  {workout.upcoming_workout_split_name}
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                  {new Date(workout.upcoming_workout_date).toLocaleDateString()}
                </p>
              </div>

              <table className="table-auto w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th colSpan="2" className="p-3 border">Exercise</th>
                    <th className="p-3 border">Sets</th>
                    <th className="p-3 border">Reps</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 text-sm">
                  {workout.upcoming_workout_e_one_name &&
                    renderExerciseRow(
                      workout.upcoming_workout_e_one_name,
                      workout.upcoming_workout_e_one_sets,
                      workout.upcoming_workout_e_one_reps,
                      workout.upcoming_workout_e_one_how_to,
                      `${workout.idupcoming_workouts}_1`
                    )}
                  {workout.upcoming_workout_e_two_name &&
                    renderExerciseRow(
                      workout.upcoming_workout_e_two_name,
                      workout.upcoming_workout_e_two_sets,
                      workout.upcoming_workout_e_two_reps,
                      workout.upcoming_workout_e_two_how_to,
                      `${workout.idupcoming_workouts}_2`
                    )}
                  {workout.upcoming_workout_e_three_name &&
                    renderExerciseRow(
                      workout.upcoming_workout_e_three_name,
                      workout.upcoming_workout_e_three_sets,
                      workout.upcoming_workout_e_three_reps,
                      workout.upcoming_workout_e_three_how_to,
                      `${workout.idupcoming_workouts}_3`
                    )}
                  {workout.upcoming_workout_e_four_name &&
                    renderExerciseRow(
                      workout.upcoming_workout_e_four_name,
                      workout.upcoming_workout_e_four_sets,
                      workout.upcoming_workout_e_four_reps,
                      workout.upcoming_workout_e_four_how_to,
                      `${workout.idupcoming_workouts}_4`
                    )}
                  {workout.upcoming_workout_e_five_name &&
                    renderExerciseRow(
                      workout.upcoming_workout_e_five_name,
                      workout.upcoming_workout_e_five_sets,
                      workout.upcoming_workout_e_five_reps,
                      workout.upcoming_workout_e_five_how_to,
                      `${workout.idupcoming_workouts}_5`
                    )}
                   {workout.upcoming_workout_e_six_name &&
                    renderExerciseRow(
                      workout.upcoming_workout_e_six_name,
                      workout.upcoming_workout_e_six_sets,
                      workout.upcoming_workout_e_six_reps,
                      workout.upcoming_workout_e_six_how_to,
                      `${workout.idupcoming_workouts}_6`
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
