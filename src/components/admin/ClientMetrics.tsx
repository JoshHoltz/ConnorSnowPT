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
        res.ok ? res.json() : Promise.reject("Failed to fetch client")
      )
      .then(setClient)
      .catch((err) => console.error(err));
  }, [clientId]);

  if (!client) {
    return (
      <section className=" text-black p-4 mt-10 md:mt-0">
        <p className="text-black">Loading client metrics...</p>
      </section>
    );
  }

  return (
    <section className="bg-red-6text-black p-4 mt-10 md:mt-0">
      <div className="bg-gray-400 px-4 p-4">
        <div className="tab-buttons flex gap-4 mb-4">
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

        <div className="tab-content">
          {activeTab === "overview" && <OverviewComponent />}
          {activeTab === "metrics" && <MetricsComponent />}
          {activeTab === "activity" && <ActivityComponent />}
          {activeTab === "account" && <AccountComponent />}

        </div>
      </div>
    </section>
  );
};
