import React, { useEffect, useState } from "react";

export const MotivationMessage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/motivation-message")
      .then((res) => res.ok ? res.json() : Promise.reject("Failed to fetch"))
      .then((data) => setMessage(data.motivation_message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Motivational Message</h2>
      <p>{message || "Loading..."}</p>
    </div>
  );
};
