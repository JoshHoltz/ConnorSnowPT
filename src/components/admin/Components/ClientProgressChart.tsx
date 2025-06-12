// src/components/client/ClientProgressChart.tsx

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ClientProgressChartProps {
  labels: string[];
  dataPoints: number[];
}

const ClientProgressChart: React.FC<ClientProgressChartProps> = ({
  labels,
  dataPoints,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Weight (kg)",
        data: dataPoints,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Client Weight Progress",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ClientProgressChart;
