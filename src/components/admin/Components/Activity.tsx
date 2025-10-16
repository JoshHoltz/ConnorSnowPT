import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ActivityComponent = ({ clientId }: { clientId: string | null }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/detailed-client-tracking/${clientId}/analysis`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then((data) => setAnalysis(data?.aiAnalysis || null))
      .catch(() => setAnalysis(null));
  }, [clientId]);

  return (
    <section className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        AI-Generated Analysis
      </h2>
      <div className="prose prose-sm text-gray-800 max-w-none">
        {analysis ? (
          <ReactMarkdown>{analysis}</ReactMarkdown>
        ) : (
          <p className="text-gray-500">No analysis data available.</p>
        )}
      </div>
    </section>
  );
};

export default ActivityComponent;