import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Line } from "react-chartjs-2"; 

// REF (Using Chart.js and React): https://www.youtube.com/watch?v=6q5d3Z1-5kQ&ab_channel=CodeComplete
// REF ( Chart,js Docs): https://www.chartjs.org/docs/latest/getting-started/


export const Metrics = ({ clientId }: { clientId: string | null }) => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/body-weights/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch body weights")
      )
      .then(setMetrics)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) return <Skeleton count={5} />;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Body Weight Over Time</h2>
      <Line
        data={{
          labels: metrics.map(
            (m) => m.submitted_date?.split("T")[0]),
          datasets: [
            {
              label: "Weight (kg)",
              data: metrics.map((m) => m.submitted_weight),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        }}
      />
    </div>
  );
};
