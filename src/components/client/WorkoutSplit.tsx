import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export const WorkoutSplitTable = () => {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("id");
  const [workouts, setWorkouts] = useState([]);
  const [visibleHowTo, setVisibleHowTo] = useState({});
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState("");

  useEffect(() => {
    if (!clientId) return;
    fetch(`https://connorsnowpt.onrender.com/api/workout-split/${clientId}`)
      .then((res) => res.json())
      .then((data) => setWorkouts(data || []))
      .finally(() => setLoading(false));
  }, [clientId]);

  // obtain ai analysis of ucpoming workout
  useEffect(() => {
    if (!clientId) return;
    fetch(
      `https://connorsnowpt.onrender.com/api/upcoming-workouts/${clientId}/analysis`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.aiAnalysis) {
          setAnalysis(data.aiAnalysis);
        }
      })
      .catch((err) => console.error("Error fetching AI analysis:", err));
  }, [clientId]);

  const toggleHowTo = (id) => {
    setVisibleHowTo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const downloadPDF = () => {
    window.location.href = `https://connorsnowpt.onrender.com/api/workout-split/${clientId}/pdf`;
  };

  if (loading) {
    return (
      <div className="px-4 py-4">
        <Skeleton height={100} />
        <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height={600} />
          ))}
        </div>
      </div>
    );
  }

  const renderExerciseRow = (exercise, sets, reps, howTo, id) => (
    <>
      <tr className="even:bg-gray-50">
        <td colSpan="2" className="border-y p-4 text-left">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{exercise}</span>
            {howTo && (
              <button
                onClick={() => toggleHowTo(id)}
                className="mt-1 self-start text-sm text-blue-600 hover:underline"
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
    <div className="mb-4 mt-10 w-full px-4 py-4 text-black md:mt-0 md:w-full">
      <h1 className="hidden rounded-2xl bg-gray-800 px-8 py-4 text-2xl font-bold text-white md:flex">
        Your Week Workout Split
      </h1>

      <button onClick={downloadPDF}>
        Download PDF
      </button>

      <div className="mt-4 flex-wrap gap-6 md:flex">
        {workouts.length === 0 ? (
          <p>No upcoming workouts found.</p>
        ) : (
          workouts.map((workout) => (
            <div
              key={workout.idupcoming_workouts}
              className="transitioxn-transform mb-6 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:scale-[1.02] md:w-[32%]"
            >
              <div className="h-2 bg-gray-700" />

              <div className="bg-gray-900 p-6 text-white">
                <h2 className="text-xl font-bold uppercase">
                  {workout.upcoming_workout_split_name}
                </h2>
                <p className="mt-1 text-sm text-gray-300">
                  {new Date(workout.upcoming_workout_date).toLocaleDateString()}
                </p>
              </div>

              <table className="w-full table-auto text-left text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th colSpan="2" className="border p-3">
                      Exercise
                    </th>
                    <th className="border p-3">Sets</th>
                    <th className="border p-3">Reps</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {workout.exercises && workout.exercises.length > 0 ? (
                    workout.exercises.map((exercise, index) =>
                      exercise.name ? (
                        renderExerciseRow(
                          exercise.name,
                          exercise.sets,
                          exercise.reps,
                          exercise.howTo,
                          `${workout.idupcoming_workouts}_${index}`,
                        )
                      ) : null,
                    )
                  ) : (
                    <tr>
                      <td colSpan="4" className="border p-4 text-center text-gray-500">
                        No exercises assigned
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>

      {/* Upcoming Workout Help AI */}
      <div className="mt-6 overflow-hidden rounded-lg bg-gray-50 shadow hover:scale-[1.02]">
        <div className="h-2 bg-gray-700" />
        <div className="bg-gray-900 p-4 text-white">
          <h2 className="text-xl font-bold uppercase">
            Connor's Tips for Upcoming Workout
          </h2>
        </div>
        <p className="p-4 text-gray-600">{analysis}</p>
      </div>
    </div>
  );
};