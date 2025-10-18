import React from "react";

export const Calendar = () => {
  return (
    <div className="px-4 py-4">
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600" />

      <h1 className="w-full bg-gray-800 px-8 py-4 text-2xl font-bold text-white">
        Book in With Connor
      </h1>

      <div className="bg-white p-4">
        <div className="md:hidden w-full overflow-y-auto rounded-lg" style={{ maxHeight: "90vh" }}>
          <iframe
            className="w-full rounded-lg"
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2awze57wY62kAINPUmx7QtFX8L0vU9oWh3uYgF40N_-QZpK5tGa4o7js8mXEX4mBp2LZPZX6aE?gv=true"
            style={{ border: 0, minHeight: "800px" }}
            width="100%"
            title="Google Calendar"
            scrolling="yes"
          ></iframe>
        </div>
        <div className="hidden md:block rounded-lg">
          <iframe
            className="w-full rounded-lg"
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2awze57wY62kAINPUmx7QtFX8L0vU9oWh3uYgF40N_-QZpK5tGa4o7js8mXEX4mBp2LZPZX6aE?gv=true"
            style={{ border: 0, minHeight: "800px" }}
            width="100%"
            height="710"
            title="Google Calendar"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  );
};