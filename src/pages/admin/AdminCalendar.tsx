import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "../../components/admin/Calendar";

function getToken() {
  const user_id = sessionStorage.getItem('user_id');
  const user_username = sessionStorage.getItem('user_username');
  const isAdmin = sessionStorage.getItem('isAdmin'); 
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
      navigate('/forbidden', { replace: true });
      window.location.reload(); 
    }
  }, [navigate]);

  return (
    <div className="mb-4 text-black">
      <h1 className="hidden md:flex text-2xl font-bold text-black px-8">Calendar</h1>
      <p className="hidden md:flex text-black px-8">
        View and Manage Your Calendar
      </p>
      <div className="p-4 mt-10 md:mt-0">
        <Calendar />
      </div>
    </div>
  );
};
