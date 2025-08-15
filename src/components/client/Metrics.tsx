// api fetch 
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'; // Skeleton component for loading state

export const Metrics = ({ clientId }: { clientId: string | null }) => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/metrics/${clientId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch metrics")))
      .then(setMetrics)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return <Skeleton count={5} />;
  }

  return (
    <div className="p-4">
      {metrics.map((metric, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <p>{metric.submitted_weight}</p>
        </div>
      ))}
    </div>
  );
};
