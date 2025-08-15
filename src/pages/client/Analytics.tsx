import React from "react";
import { Metrics } from "../../components/client/Metrics";

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
    <div className="text-black px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">Client Analytics</h1>
      {clientId ? (
        <Metrics clientId={clientId} />
      ) : (
        <p className="text-red-500">No client ID found in session.</p>
      )}
    </div>
  );
};
