import React from "react";
import { WeightTracking } from "../../components/client/WeightTracking";
import { BMITracking } from "../../components/client/BMITracking";
import { BodyInputs } from "../../components/client/BodyInputs";
import { MuscleMassTracking } from "../../components/client/MuscleMassTracking";

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
    <div className="flex flex-col gap-4 px-4 py-4 text-black md:flex-row">
      {/* 1/3 of screen */}
      <div className="mt-16 w-full rounded-xl bg-white p-4 shadow md:mt-0 md:w-1/3">
        <BodyInputs clientId={clientId} />
      </div>

      {/* 2/3 of screen */}
      <div className="flex w-full flex-col gap-4 md:w-2/3">
        {/* Top row: Weight Tracking */}
        <div className="max-h-110 w-full rounded-xl bg-white p-4 shadow">
          <div className="h-auto">
            <WeightTracking clientId={clientId} />
          </div>
        </div>

        {/* Bottom row: Split half for BMI and additional metrics */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full rounded-xl bg-white p-4 shadow md:w-1/2">
            <h2 className="mb-2 text-lg font-bold">Body Mass Index</h2>
            <BMITracking clientId={clientId} />
          </div>

          <div className="w-full rounded-xl bg-white p-4 shadow md:w-1/2">
            <h2 className="mb-2 text-lg font-bold">Muscle Mass</h2>
            <MuscleMassTracking clientId={clientId} />
          </div>
        </div>
      </div>
    </div>
  );
};
