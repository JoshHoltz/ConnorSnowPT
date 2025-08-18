import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

export const BMITracking = ({ clientId }: { clientId: string }) => {
  const [bmiMeasurement, setBMIMeasurement] = useState(0);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!clientId) return;

  fetch(`https://connorsnowpt.onrender.com/api/client-bmi/${clientId}`)
    .then(res => res.json())
    .then(data => setBMIMeasurement(data.bmi_measurement))
    .finally(() => setLoading(false));
}, [clientId]);


  if (loading) return <Skeleton count={1} />;

  const clientBMI = bmiMeasurement; 
  const maxBMI = 40;

  const data = {
    labels: ["Underweight", "Healthy", "Overweight", "Obese"],
    datasets: [
      {
        label: "BMI Categories",
        data: [18.5, 6.5, 5, 10], // to reflect bmi poportions 
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Underweight
          "rgba(54, 162, 235, 0.6)", // Healthy
          "rgba(255, 206, 86, 0.6)", // Overweight
          "rgba(153, 102, 255, 0.6)", // Obese
        ],
        cutout: "60%",
      },
      {
        label: "Client BMI",
        data: [clientBMI, maxBMI - clientBMI],
        backgroundColor: ["black", "white"],
        cutout: "40%", // inner ring
      },
    ],
  };

  return <Doughnut data={data} />;
};
