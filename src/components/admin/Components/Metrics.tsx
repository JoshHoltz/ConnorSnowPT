// src/components/client/MetricsComponent.tsx

import React from "react";
import ClientProgressChart from "./ClientProgressChart";

const MetricsComponent = () => {
  // Temporary mock data
  const labels = ["Jan", "Feb", "Mar", "Apr"];
  const dataPoints = [75, 72, 70, 68];

  return (
    <div className="p-4 md:max-w-[33.3333%] bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Metrics</h2>
      <ClientProgressChart labels={labels} dataPoints={dataPoints} />
    </div>
  );
};

export default MetricsComponent;
