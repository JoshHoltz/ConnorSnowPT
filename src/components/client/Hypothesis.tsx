import React, { useEffect, useState } from "react";

function ClientHypothesisAnalysis() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/analyse-client-hypothesis")
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch analysis")))
      .then((data) => {
        if (data?.analysis) setAnalysis(data.analysis);
      })
      .catch((err) => {
        console.error("Error fetching analysis:", err);
        setError("Unable to load analysis at this time.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading analysis...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Client Hypothesis Analysis</h2>
      <pre>{analysis}</pre>
    </div>
  );
}

export default ClientHypothesisAnalysis;
