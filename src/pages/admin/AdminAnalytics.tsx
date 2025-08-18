import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WebTraffic } from "../../components/admin/WebTraffic";

function getToken() {
  const user_id = sessionStorage.getItem('user_id');
  const user_username = sessionStorage.getItem('user_username');
  const isAdmin = sessionStorage.getItem('isAdmin'); 
  if (user_id && user_username && isAdmin) {
    return { user_id, user_username, isAdmin };
  }
  return null;
}

export const AdminAnalytics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token || token.isAdmin !== "Y") {
      navigate('/forbidden', { replace: true });
      window.location.reload(); 
    }
  }, [navigate]);

  return (
    <div className="h-screen p-4 bg-gray-100 flex flex-col gap-4">
      
      {/* Top full-width chart, 1/3 of viewport height */}
      <div className="bg-white p-4 rounded-lg shadow h-1/3">
        <WebTraffic />
      </div>

      {/* Bottom section: smaller widgets, 2/3 of viewport height */}
      <div className="flex gap-4 h-2/3">
        <div className="bg-white p-4 rounded-lg shadow flex-1">
          <WebTraffic />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex-1">
          <WebTraffic />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex-1">
          <WebTraffic />
        </div>
      </div>
    </div>
  );
};
