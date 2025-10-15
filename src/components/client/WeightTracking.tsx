import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const WeightTracking = ({ clientId }: { clientId: string | null }) => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/body-weights/${clientId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch body weights");
        return res.json();
      })
      .then((data) => {
        console.log("Received data:", data); 
        setMetrics(data.bodyWeights || []);
        setAnalysis(data.analysis || "");
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) return <Skeleton count={5} />;

  if (!metrics.length) {
    return <div className="p-4">No weight data available</div>;
  }

  return (
    <div className="h-auto p-4">
      <h2 className="mb-2 text-lg font-bold">Body Weight Over Time</h2>

      {/* Weight Chart */}
      <Line
        data={{
          labels: metrics.map((m) => m.submitted_date?.split("T")[0]),
          datasets: [
            {
              label: "Weight (kg)",
              data: metrics.map((m) => parseFloat(m.submitted_weight)), // Convert string to number
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              tension: 0.4,
              pointBorderWidth: 3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        }}
      />

      {/* AI Trainer Analysis */}
      {analysis && (
        <div className="mt-6 rounded-lg bg-gray-100 p-4 shadow">
          <h3 className="font-semibold text-gray-800">Weight Specific Trainer's Analysis</h3>
          <p className="mt-2 text-gray-600">{analysis}</p>
        </div>
      )}
    </div>
  );
};