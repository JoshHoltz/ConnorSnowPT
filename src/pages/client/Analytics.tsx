import React from "react";
import { WeightTracking } from "../../components/client/WeightTracking";
import { BMITracking } from "../../components/client/BMITracking";
import { BodyInputs } from "../../components/client/BodyInputs";

function getToken() {
  const user_id = sessionStorage.getItem("user_id");
  const user_username = sessionStorage.getItem("user_username");
  if (user_id && user_username) {
    return { user_id, user_username };
  }
  return null;
}

export const Analytics = () => {
  const token = getToken();
  const clientId = token ? token.user_id : null;

  return (
    <div className="flex flex-col md:flex-row text-black px-4 py-4 gap-4">
      {/* 1/3 of screen */}
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow p-4 mt-16 md:mt-0">
        <BodyInputs clientId={clientId} />
      </div>

      {/* 2/3 of screen */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {/* Top row: Weight Tracking */}
        <div className="bg-white rounded-xl shadow p-4 w-full max-h-110">
          <div className="h-auto">
            <WeightTracking clientId={clientId} />
          </div>
        </div>

        {/* Bottom row: Split half for BMI and additional metrics */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 bg-white rounded-xl shadow p-4">
            <BMITracking clientId={clientId} />
          </div>

          <div className="w-full md:w-1/2 bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-bold mb-2">Additional Metrics</h2>
            {/* Placeholder for additional metrics or charts */}
            <p>More analytics can be added here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
