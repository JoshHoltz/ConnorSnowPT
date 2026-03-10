import React, { useEffect, useState } from "react";
import { Zap, Loader } from "lucide-react";

export function AIAnalysis() {
  const [webAnalysis, setWebAnalysis] = useState(null);
  const [focusAnalysis, setFocusAnalysis] = useState(null);
  const [trainerAnalysis, setTrainerAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const webRes = await fetch(
          "https://connorsnowpt.onrender.com/api/posthog-web-connections"
        );
        if (webRes.ok) {
          const webData = await webRes.json();
          setWebAnalysis(webData);
        }

        const focusRes = await fetch(
          "https://connorsnowpt.onrender.com/api/posthog-client-focus-areas"
        );
        if (focusRes.ok) {
          const focusData = await focusRes.json();
          setFocusAnalysis(focusData);
        }

        const trainerRes = await fetch(
          "https://connorsnowpt.onrender.com/api/posthog-average-rating"
        );
        if (trainerRes.ok) {
          const trainerData = await trainerRes.json();
          setTrainerAnalysis(trainerData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error loading analysis");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="px-4 py-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="animate-spin text-purple-500" size={24} />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8">
      <div className="mb-6 rounded-xl border-gray-100 bg-white p-4 md:p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center text-lg font-semibold text-gray-800">
            <Zap size={20} className="mr-2 text-purple-500" />
            AI Analysis & Insights
          </h2>
        </div>

        <div>
          <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
            <h1 className="font-bold mb-2">Client Focus Areas</h1>
            <p className="text-sm text-purple-900 leading-relaxed">
              {focusAnalysis?.analysis || "No focus area data available"}
            </p>
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                <h1 className="font-bold mb-2">AI Trainer Analysis</h1>
                <p className="text-sm">
                  {trainerAnalysis?.analysis || "No analysis available"}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                <h1 className="font-bold mb-2">AI Web Analysis</h1>
                <p className="text-sm text-green-900 leading-relaxed">
                  {webAnalysis?.analysis || "No analysis available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}