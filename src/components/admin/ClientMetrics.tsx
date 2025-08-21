// REF (Condtionals): https://react.dev/learn/conditional-rendering
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
      <section className="mt-10 p-4 text-black md:mt-0">
        <p className="text-black">Loading client metrics...</p>
      </section>
    );
  }

  return (
    <section className="mt-10 p-4 md:mt-0">
      <div className="">
        <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
        <div className="tab-buttons flex gap-4 bg-gray-800 p-2 px-4 text-white">
          <button
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "font-bold underline" : ""}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            className={activeTab === "metrics" ? "font-bold underline" : ""}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={activeTab === "activity" ? "font-bold underline" : ""}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={activeTab === "account" ? "font-bold underline" : ""}
          >
            Account Settings
          </button>
        </div>

        <div>
          {activeTab === "overview" && <OverviewComponent />}
          {activeTab === "metrics" && <MetricsComponent />}
          {activeTab === "activity" && <ActivityComponent />}
          {activeTab === "account" && <AccountComponent />}
        </div>
      </div>
    </section>
  );
};
