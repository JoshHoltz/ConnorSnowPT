import { useEffect, useState } from "react";
import { Zap, Loader } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export function AIAnalysis() {
  const [clientAnalysis, setClientAnalysis] = useState<any>(null);
  const [trafficAnalysis, setTrafficAnalysis] = useState<any>(null);
  const [clientLoading, setClientLoading] = useState(true);
  const [trafficLoading, setTrafficLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientAnalysis = async () => {
      try {
        const response = await fetch(
          "https://connorsnowpt.onrender.com/api/pr-analysis-all"
        );
        if (response.ok) {
          const data = await response.json();
          setClientAnalysis(data);
        }
      } catch (err) {
        console.error("Error fetching client analysis:", err);
        setError("Failed to load client analysis");
      } finally {
        setClientLoading(false);
      }
    };

    const fetchTrafficAnalysis = async () => {
      try {
        const response = await fetch(
          "https://connorsnowpt.onrender.com/api/ai/traffic-summary"
        );
        if (response.ok) {
          const data = await response.json();
          setTrafficAnalysis(data);
        }
      } catch (err) {
        console.error("Error fetching traffic analysis:", err);
        setError("Failed to load traffic analysis");
      } finally {
        setTrafficLoading(false);
      }
    };

    fetchClientAnalysis();
    fetchTrafficAnalysis();
  }, []);

  if (error) {
    return (
      <div className="w-full p-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="w-full p-4">
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-purple-600 to-purple-500 shadow-sm" />
      <div className="bg-slate-100 border border-t-0 border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-purple-600" />
          <h1 className="text-xl font-semibold text-slate-900">
            AI Analysis & Insights
          </h1>
        </div>
      </div>

      {/* Client Achievements Summary */}
      <div className="bg-white px-4 py-6 border border-t-0 border-slate-200">
        <div className="bg-purple-50 shadow p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">
            Client Achievements Summary
          </h3>
          {clientLoading ? (
            <Skeleton height={100} />
          ) : clientAnalysis?.clients && clientAnalysis.clients.length > 0 ? (
            <div className="space-y-4">
              {clientAnalysis.clients.slice(0, 3).map((client: any) => (
                <div key={client.clientId} className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold text-purple-900">
                    {client.clientName}
                  </p>
                  <p className="text-sm text-purple-800 leading-relaxed">
                    {client.analysis}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No client data available</p>
          )}
        </div>
      </div>

      {/* Traffic and AI Insights */}
      <div className="bg-white px-4 py-6 border border-t-0 border-slate-200 grid grid-cols-2 gap-4">
        {/* Traffic Summary */}
        <div className="bg-blue-50 shadow p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">
            Website Interaction Summary
          </h3>
          {trafficLoading ? (
            <Skeleton height={80} />
          ) : trafficAnalysis ? (
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Total Pageviews (7 days)</p>
                <p className="text-2xl font-bold text-blue-900">
                  {trafficAnalysis.pageviews}
                </p>
              </div>
              <div className="pt-2 border-t border-blue-200">
                <p className="text-gray-600">CTA Clicks</p>
                <p className="font-semibold text-blue-900">
                  {trafficAnalysis.ctaClicks}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Checkout Initiated</p>
                <p className="font-semibold text-blue-900">
                  {trafficAnalysis.checkoutClicks}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 italic">No traffic data available</p>
          )}
        </div>

        {/* AI Insights */}
        <div className="bg-green-50 shadow p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">AI Insights</h3>
          {trafficLoading ? (
            <Skeleton height={80} />
          ) : trafficAnalysis?.summary ? (
            <p className="text-sm text-green-900 leading-relaxed">
              {trafficAnalysis.summary}
            </p>
          ) : (
            <p className="text-gray-600 italic">No insights available</p>
          )}
        </div>
      </div>
    </section>
  );
}