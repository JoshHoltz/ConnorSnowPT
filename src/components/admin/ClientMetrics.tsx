// REF (Conditionals): https://react.dev/learn/conditional-rendering
// REF (Event handling): https://react.dev/learn/responding-to-events

import OverviewComponent from "./Components/Overview";
import MetricsComponent from "./Components/Metrics";
import ActivityComponent from "./Components/Activity";
import AccountComponent from "./Components/Account.tsx";

import { useEffect, useState } from "react";

export const ClientMetrics = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!clientId) return;
    console.log("Extracted ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client"),
      )
      .then(setClient)
      .catch((err) => console.error(err));
  }, [clientId]);

  if (!client) {
    return (
      <section className="mt-10 p-4 text-slate-900 md:mt-0">
        <p>Loading client metrics...</p>
      </section>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "metrics", label: "Metrics" },
    { id: "AI Overview", label: "AI Overview" },
    { id: "account", label: "Account Settings" },
  ];

  return (
    <section className="mt-10 p-4 md:mt-0">
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Header Gradient */}
        <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-0 border-b border-slate-200 bg-slate-50 p-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition duration-200 border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-900 text-blue-900 bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "overview" && <OverviewComponent />}
          {activeTab === "metrics" && <MetricsComponent clientId={clientId} />}
          {activeTab === "AI Overview" && <ActivityComponent clientId={clientId} />}
          {activeTab === "account" && <AccountComponent />}
        </div>
      </div>
    </section>
  );
};