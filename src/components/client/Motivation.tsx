import React, { useEffect, useState } from "react";

export const MotivationMessage = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/motivation-message")
      .then((res) => res.ok ? res.json() : Promise.reject("Failed to fetch"))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMessage(data[0]); 
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
          <div className="px-4 py-4 text-black w-full">
        <h1 className="py-4 hidden md:flex text-xl font-bold text-white px-8 bg-gray-800 text-center">
      "{message ? message.motivation_message : "Loading..."}" - Connor
        </h1>
        </div>

  );
};
