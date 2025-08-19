import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WebTraffic } from "../../components/admin/WebTraffic";
import { HomepageCTAClicks } from "../../components/admin/HomePageCTAClicks";
import { CheckoutCTAClicks } from "../../components/admin/CheckoutCTAClicks";
import { AverageRating } from "../../components/admin/AverageRating";
import { FocusAreas } from "../../components/admin/FocusAreas";
import { StripeAnalytics } from "../../components/admin/StripeAnalytics";

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
    <div className="h-screen p-2 bg-gray-100 flex flex-col gap-4">
      
      {/* Web Traffic */}
      <div className="bg-white p-4 rounded-lg shadow h-1/3">
        <WebTraffic />
      </div>

      {/* Bottom section */}

      {/* CTA Clicking */}
      <div className="flex gap-4 h-2/3">
        <div className="flex flex-col gap-4 w-1/4">
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <HomepageCTAClicks />
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <CheckoutCTAClicks />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-3/4">
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-lg shadow flex-1 w-1/2">
            <AverageRating />
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <FocusAreas />
          </div>
        </div>

          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <StripeAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};
