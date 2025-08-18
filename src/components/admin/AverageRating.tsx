import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement } from "chart.js";

ChartJS.register(BarElement);

export const AverageRating = () => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/posthog-average-rating")
      .then((res) => res.json())
      .then((data) => setRating(data.result[0]?.average_recommendation || 0));
  }, []);

  return (
    <Bar
      data={{
        labels: ["Rating"],
        datasets: [{ data: [8.3], 
            backgroundColor: "rgba(62, 152, 199, 0.7)" 
        }],
      }}
      options={{ 
        indexAxis: "y",
        scales: { 
            x: {
                min: 0,
                max: 10,
            }
            }
      }}
    />
  );
};
