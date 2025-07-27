import React, { useEffect, useState } from "react";
import { QuoteIcon } from "lucide-react";

export const MotivationMessage = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/motivation-message")
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch")))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMessage(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-4 md:py-4 text-white w-full md:w-3/4">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-sm p-4 md:p-6 h-full relative overflow-hidden">
        <div className="absolute top-2 text-white/20">
          {/* REF (Chainging the Opacity): https://tailwindcss.com/docs/color */}
          <QuoteIcon className="h-12 md:h-16 w-12 md:w-16" />
        </div>
        <h1 className="font-bold text-lg">A Message from your Trainer:</h1>
        <h1 className="py-4 text-l text-white pr-14">
          {message ? message.motivation_message : "Loading..."}

          <div>
            <p className="italic">- Connor</p>

            <QuoteIcon className="absolute right-2 bottom-2 text-white/40 h-12 md:h-16 w-12 md:w-16" />
          </div>
        </h1>
      </div>
    </div>
  );
};
