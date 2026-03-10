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

      <div className="pt-16 md:pt-10 mb-6 px-6 md:hidden">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Connor</h1>
      </div>

      <div className="hidden md:block">
        <TopLevelInfo />
        <QuickLinks />
      </div>

      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-2/3 h-full">
          <AIAnalysis />
        </div>
        <div className="w-full md:w-1/3 pr-0 md:pr-8">
          <ToDo />
        </div>
      </div>
    </>
  );
};