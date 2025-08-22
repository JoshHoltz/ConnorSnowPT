import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ClientOverview } from "../../components/admin/ClientOverview";
import { ClientMetrics } from "../../components/admin/ClientMetrics";
import { ClientNotes } from "../../components/admin/ClientNotes";
import { PRs } from "../../components/admin/PRs.tsx";

function getToken() {
  const user_id = sessionStorage.getItem("user_id");
  const user_username = sessionStorage.getItem("user_username");
  const isAdmin = sessionStorage.getItem("isAdmin");
  if (user_id && user_username && isAdmin) {
    return { user_id, user_username, isAdmin };
  }
  return null;
}

const ViewClient = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clientId = searchParams.get("id");

  useEffect(() => {
    const token = getToken();

    if (!token || token.isAdmin !== "Y") {
      navigate("/forbidden", { replace: true });
      window.location.reload();
    }
  }, [navigate]);

  return (
    <div>
      <ClientOverview clientId={clientId} />
      <ClientMetrics clientId={clientId} />
      <div className="flex">
        <ClientNotes clientId={clientId} />
        <PRs clientId={clientId} />
      </div>
    </div>
  );
};

export default ViewClient;
