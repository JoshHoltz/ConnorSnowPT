import React from "react";
import { WeightTracking } from "../../client/WeightTracking";
import { BMITracking } from "../../client/BMITracking";
import { MuscleMassTracking } from "../../client/MuscleMassTracking";

const MetricsComponent = ({ clientId }: { clientId: string | null }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="h-96 overflow-y-auto">
        <WeightTracking clientId={clientId} />
      </div>
      <div className="h-96 overflow-y-auto">
        <BMITracking clientId={clientId} />
      </div>
      <div className="h-86 overflow-y-auto">
        <MuscleMassTracking clientId={clientId} />
      </div>
    </div>
  );
};

export default MetricsComponent;