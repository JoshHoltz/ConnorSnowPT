import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopLevelInfo } from "../../components/admin/TopLevelInfo";
import { MembersTable } from "../../components/admin/MembersTable";

function getToken() {
  const user_id = sessionStorage.getItem("user_id");
  const user_username = sessionStorage.getItem("user_username");
  const isAdmin = sessionStorage.getItem("isAdmin");
  if (user_id && user_username && isAdmin) {
    return { user_id, user_username, isAdmin };
  }
  return null;
}

export const AdminClients = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token || token.isAdmin !== "Y") {
      navigate("/forbidden", { replace: true });
      window.location.reload();
    }
  }, [navigate]);

  return (
    <>
    <div className="hidden md:block">
      <TopLevelInfo />
    </div>
      <MembersTable />
    </>
  );
};
