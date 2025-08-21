// src/components/client/MetricsComponent.tsx

import React from "react";
import ClientProgressChart from "./ClientProgressChart";

const MetricsComponent = () => {
  // Temporary mock data
  const labels = ["Jan", "Feb", "Mar", "Apr"];
  const dataPoints = [75, 72, 70, 68];

  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-md md:max-w-[33.3333%]">
      <h2 className="mb-4 text-xl font-bold">Metrics</h2>
      <ClientProgressChart labels={labels} dataPoints={dataPoints} />
    </div>
  );
};

export default MetricsComponent;
