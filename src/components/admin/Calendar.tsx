import React from "react";

export const Calendar = () => {
  return (
    <div>
      {/* <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
      <h1 className="hidden w-full bg-gray-800 px-8 py-4 text-2xl font-bold text-white md:flex">
        Your Schedule
      </h1>
      <div className="mt-10 bg-gray-200 md:mt-0">
        <div className="mt-10 text-black md:mt-0"> */}
          {/* <iframe
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2awze57wY62kAINPUmx7QtFX8L0vU9oWh3uYgF40N_-QZpK5tGa4o7js8mXEX4mBp2LZPZX6aE?gv=true"
        style={{ border: 0 }}
        width="100%"
        height="900"
        title="Google Calendar"
      ></iframe> */}

          <iframe
            src="https://calendar.google.com/calendar/embed?src=joshua.holtz03%40gmail.com&ctz=Europe%2FLondon"
            style={{ border: 0 }}
            width="100%"
            height="775"
            title="Google Calendar"
          ></iframe>
        </div>
    //   </div>
    // </div>
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
