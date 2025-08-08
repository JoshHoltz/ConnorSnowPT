import React from "react";

export const Calendar = () => {
  return (
      <div>
      <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-t-lg shadow-sm h-2 relative overflow-hidden text-white" />
      <h1 className="py-4 hidden md:flex text-2xl font-bold text-white px-8 w-full bg-gray-800">Your Schedule</h1>
      <div className="mt-10 md:mt-0 bg-gray-200">
        
    <div className="mt-10 md:mt-0 text-black">
      {/* <iframe
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2awze57wY62kAINPUmx7QtFX8L0vU9oWh3uYgF40N_-QZpK5tGa4o7js8mXEX4mBp2LZPZX6aE?gv=true"
        style={{ border: 0 }}
        width="100%"
        height="900"
        title="Google Calendar"
      ></iframe> */}

      <iframe src="https://calendar.google.com/calendar/embed?src=joshua.holtz03%40gmail.com&ctz=Europe%2FLondon" 
        style={{ border: 0 }}
        width="100%"
        height="775"
        title="Google Calendar"
        ></iframe>
    </div>
    </div>
      </div>

  );
};

// <!-- Google Calendar Appointment Scheduling begin -->
// <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet">
// <script src="https://calendar.google.com/calendar/scheduling-button-script.js" async></script>
// <script>
// (function() {
//   var target = document.currentScript;
//   window.addEventListener('load', function() {
//     calendar.schedulingButton.load({
//       url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2awze57wY62kAINPUmx7QtFX8L0vU9oWh3uYgF40N_-QZpK5tGa4o7js8mXEX4mBp2LZPZX6aE?gv=true',
//       color: '#039BE5',
//       label: 'Book an appointment',
//       target,
//     });
//   });
// })();
// </script>
// <!-- end Google Calendar Appointment Scheduling --></link>

// https://calendar.app.google/heqPAmJgpVE7JQhF9
