import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ClientWelcome } from "../../components/client/ClientWelcome";
import { PRs } from "../../components/client/PRs";
import { UpcomingWorkout } from "../../components/client/UpcomingWorkout";
import { MotivationMessage } from "../../components/client/Motivation";
import { ClientDetails } from "../../components/client/ClientDetails";

function getToken() {
  const user_id = sessionStorage.getItem("user_id");
  const user_username = sessionStorage.getItem("user_username");
  if (user_id && user_username) {
    return { user_id, user_username };
  }
  return null;
}

export const ClientHome = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clientId = searchParams.get("id");

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/forbidden", { replace: true });
      window.location.reload();
      return;
    }

    if (!clientId) {
      navigate(`/client/home?id=${token.user_id}`, { replace: true });
      return;
    }

    if (clientId !== token.user_id) {
      navigate("/forbidden", { replace: true });
      window.location.reload();
      return;
    }
  }, [clientId, navigate]);

  if (!clientId) {
    return <div className="p-4 text-white">Loading client data...</div>;
  }

  return (
    <div className="px-4 py-4">
      <div className="mb-4 text-black">
        {/* <ClientWelcome clientId={clientId} /> */}

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <ClientDetails clientId={clientId} />
                    <MotivationMessage />
        </div>

        <div className="mt-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <UpcomingWorkout />
          <PRs clientId={clientId} />
        </div>
      </div>
    </div>
  );
};
