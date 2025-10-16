import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopLevelInfo } from "../../components/admin/TopLevelInfo";
import { QuickLinks } from "../../components/admin/QuickLinks";
import { Calendar } from "../../components/admin/Calendar.tsx";
import { AIAnalysis } from "../../components/admin/AIOverviewAnalysis";

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
    {/* <section className="mt-10 p-4 text-white md:mt-0">
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />

      <div className="rounded-b-md bg-gray-800 px-2 text-black">
        <h1 className="p-4 text-2xl font-bold text-white">
          Dashboard
        </h1>
      </div>
    </section> */}

      <TopLevelInfo />
      {/* <QuickLinks /> */}

      <div className="flex">
       <div className="w-2/3">
        <AIAnalysis />
        </div>
        <div className="w-1/3"> 

        </div>
      </div>

      <div className="px-8">
        {/* <Calendar /> */}
      </div>
    </>
  );
};
