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
