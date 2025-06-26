import React from "react";

export const Calendar = () => {
  return (
    <div className="p-4 mt-10 md:mt-0 text-black">
      <iframe
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2awze57wY62kAINPUmx7QtFX8L0vU9oWh3uYgF40N_-QZpK5tGa4o7js8mXEX4mBp2LZPZX6aE?gv=true"
        style={{ border: 0 }}
        width="100%"
        height="900"
        title="Google Calendar"
      ></iframe>
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
