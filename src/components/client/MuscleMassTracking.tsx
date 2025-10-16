import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const MuscleMassTracking = ({ clientId = "test-client" }) => {
  const [muscleMass, setMuscleMass] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fetchMuscleMass = async () => {
    if (!clientId) return;
    try {
      const res = await fetch(
        `https://connorsnowpt.onrender.com/api/client-muscle-mass/${clientId}`,
      );
      const data = await res.json();
      setMuscleMass(data.muscle_mass);
    } catch (error) {
      console.error("Error fetching muscle mass:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMuscleMass();
  }, [clientId]);

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      muscle_mass: parseFloat(inputValue),
      client_id: clientId,
    };

    try {
      const response = await fetch(
        "https://connorsnowpt.onrender.com/api/insert-muscle-mass",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        showSuccessMessage();
        fetchMuscleMass();
        setInputValue("");
      } else {
        alert("Failed to log body weight");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error logging body weight");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <CircularProgressbar
          value={muscleMass}
          maxValue={100}
          text={`${muscleMass}%`}
        />
      </div>

      <div className="mt-4">
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter muscle mass %"
            step="0.01"
            className="rounded border px-3 py-2"
            required
          />
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500/80 text-white px-6 py-3 rounded-lg shadow-lg">
          ✓ Client details updated successfully!
        </div>
      )}
    </>
  );
};