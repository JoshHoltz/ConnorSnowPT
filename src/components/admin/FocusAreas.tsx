import { useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

export const FocusAreas = () => {
  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/posthog-average-rating")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  const data = {
    labels: ["Cardio", "Strength", "Events", "Mental Health", "Weight Loss"],
    datasets: [
      {
        label: "Focus Areas",
        data: [10, 4, 2, 6, 9],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: false, 
  scales: {
    r: {
      beginAtZero: true,
    },
  },
};

return (
<Radar data={data} options={options} />
)
};
