import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export const AverageRating = () => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/posthog-average-rating")
      .then((res) => res.json())
      .then((data) => {
        setRating(data.results?.[0]?.[0] ?? 0);
      });
  }, []);

  return (
    <>
    <h1 className="text-sm font-bold text-black">Trainer Rating</h1>
    <Bar
      data={{
        labels: ["Rating"],
        datasets: [
          {
            data: [rating],
            backgroundColor: "rgba(62, 152, 199, 0.7)",
          },
        ],
      }}
      options={{
        indexAxis: "y",
        scales: {
          x: {
            min: 0,
            max: 10,
          },
        },
      }}
    />
    </>
  );
};
