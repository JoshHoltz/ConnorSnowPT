import React from "react";
import { Metrics } from "../../components/client/Metrics";
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
    <div className="text-black px-4 py-4 flex">
        <div className="mb-6 px-4 py-4 w-1/3">
            <BodyInputs />
        </div>
      <div className="md:w-full w-1/2">
        <Metrics clientId={clientId} />
      </div>
    </div>
  );
};
