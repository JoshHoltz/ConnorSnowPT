import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopLevelInfo } from "../../components/admin/TopLevelInfo";
import { QuickLinks } from "../../components/admin/QuickLinks";
import { Calendar } from "../../components/admin/Calendar.tsx";

function getToken() {
  const user_id = sessionStorage.getItem("user_id");
  const user_username = sessionStorage.getItem("user_username");
  const isAdmin = sessionStorage.getItem("isAdmin"); // "Y" or "N"
  if (user_id && user_username && isAdmin) {
    return { user_id, user_username, isAdmin };
  }
  return null;
}

export const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token || token.isAdmin !== "Y") {
      navigate("/forbidden", { replace: true });
      window.location.reload();
    }
  }, [navigate]);

  return (
    <div className="mb-4 text-black">
      <h1 className="hidden px-8 text-2xl font-bold text-black md:flex">
        Dashboard
      </h1>
      <p className="hidden px-8 text-black md:flex">
        Welcome Back! Take a look at your client overview:
      </p>

      <TopLevelInfo />
      <QuickLinks />

      <div className="px-8">
        <Calendar />
      </div>
    </div>
  );
};
