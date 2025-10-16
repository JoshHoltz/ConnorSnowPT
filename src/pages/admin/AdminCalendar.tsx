import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "../../components/admin/Calendar.tsx";

function getToken() {
  const user_id = sessionStorage.getItem("user_id");
  const user_username = sessionStorage.getItem("user_username");
  const isAdmin = sessionStorage.getItem("isAdmin");
  if (user_id && user_username && isAdmin) {
    return { user_id, user_username, isAdmin };
  }
  return null;
}

export const AdminCalendar = () => {
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
    <section className="mt-10 p-4 text-white md:mt-0">
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />

      <div className="rounded-b-md bg-gray-800 px-2 text-black">
        <h1 className="p-4 text-2xl font-bold text-white">
          Your Calendar
        </h1>
      </div>
    </section>
        <Calendar />
        </>
  );
};
