import { useEffect } from "react";
import { useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

export const FocusAreas = () => {
const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/posthog-client-focus-areas")
      .then((res) => res.json())
      .then((data) => {
        // Extract labels and values from results
        const labels = data.results.map((item) => item[0]);
        const values = data.results.map((item) => item[1]);

        setChartData({
          labels,
          datasets: [
            {
              label: "Focus Areas",
              data: values,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};
