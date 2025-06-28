import React from "react";

// app.get('/api/upcoming-workouts/:id', async (req, res) => {
//   const clientId = req.params.id;
//   try {
//     const [rows] = await pool.query('SELECT * FROM upcoming_workouts WHERE client_id = ? AND workout_date >= CURDATE() ORDER BY upcoming_workout_date ASC LIMIT 1', [clientId]);
//     res.json(rows);
//   } catch (err) {
//     console.error(`Error on /upcoming-workouts/${clientId}:`, err);
//     res.status(500).json({ error: 'Failed to fetch upcoming workouts', details: err.message });
//   }
// });

export const UpcomingWorkout = () => {
    fetch("https://connorsnowpt.onrender.com/api/upcoming-workouts/1")
      .then((res) => {
        if (!res.ok) {  
            throw new Error("Failed to fetch upcoming workouts");
            }
        return res.json();
        })

  return (
    <div className="px-4 py-4 mb-4 text-black md:w-2/3 w-full">
      <h1 className="py-4 hidden md:flex text-2xl font-bold text-white px-8 bg-gray-800">
        Your Upcoming Workout
      </h1>
      <div className="p-4 mt-10 md:mt-0 bg-white ">
        <div className="p-4 mt-10 md:mt-0 text-black">
          {/* Placeholder for upcoming workout content */}
          <p>No upcoming workouts scheduled.</p>


        </div>
      </div>
    </div>
  );
};