import React, { useEffect, useState } from "react";
import { QuoteIcon } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export const MotivationMessage = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/motivation-message")
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch")))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMessage(data[0]);
        }
      })
      .finally(() => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 py-4">
        <Skeleton height={300} />
      </div>
    );
  }

  return (
    <div className="w-full px-4 text-white md:w-3/4 md:py-4">
      <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 p-4 shadow-sm md:p-6">
        <div className="absolute top-2 text-white/20">
          {/* REF (Chainging the Opacity): https://tailwindcss.com/docs/color */}
          <QuoteIcon className="h-12 w-12 md:h-16 md:w-16" />
        </div>
        <h1 className="text-lg font-bold">A Message from your Trainer:</h1>
        <h1 className="text-l py-4 pr-14 text-white">
          {message ? message.motivation_message : "Loading..."}

          <div>
            <p className="italic">- Connor</p>

            <QuoteIcon className="absolute bottom-2 right-2 h-12 w-12 text-white/40 md:h-16 md:w-16" />
          </div>
        </h1>
      </div>
    </div>
  );
};
