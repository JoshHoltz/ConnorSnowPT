import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown"; // REF: https://stackoverflow.com/questions/31875748/how-do-i-render-markdown-from-a-react-component

export const ClientDetailsAnalysis = ({ clientId }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/detailed-client-tracking/${clientId}/analysis`)
      .then((res) => res.json())
      .then((data) => setAnalysis(data?.aiAnalysis || null));
  }, [clientId]);

  return (
    <div className="p-2 text-center">
      <div className="rounded-lg bg-gray-100 p-4 shadow">
        <h1 className="text-2xl font-bold mb-4">Client Details Analysis</h1>
        {analysis ? (
          <ReactMarkdown>
            {analysis}
          </ReactMarkdown>
        ) : (
          <p className="text-gray-500">No analysis data available.</p>
        )}
      </div>
    </div>
  );
};
