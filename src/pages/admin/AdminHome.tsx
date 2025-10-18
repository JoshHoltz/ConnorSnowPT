import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopLevelInfo } from "../../components/admin/TopLevelInfo";
import { QuickLinks } from "../../components/admin/QuickLinks";
import { Calendar } from "../../components/admin/Calendar.tsx";
import { AIAnalysis } from "../../components/admin/AIOverviewAnalysis";
import { ToDo } from "../../components/admin/ToDo.tsx"

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
    <>

      {/* Width 100% */}
      <TopLevelInfo />
      <QuickLinks />

      {/* flex w-full */}
      <div className="flex w-full h-full">

       <div className="w-2/3 h-full">
        <AIAnalysis />
        </div>
        <div className="w-1/3 pr-8 h-full">
        <ToDo />
        </div>

        </div>
    </>
  );
};
