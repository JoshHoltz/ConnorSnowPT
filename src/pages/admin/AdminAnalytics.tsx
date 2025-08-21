import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WebTraffic } from "../../components/admin/WebTraffic";
import { HomepageCTAClicks } from "../../components/admin/HomePageCTAClicks";
import { CheckoutCTAClicks } from "../../components/admin/CheckoutCTAClicks";
import { AverageRating } from "../../components/admin/AverageRating";
import { FocusAreas } from "../../components/admin/FocusAreas";
import { StripeAnalytics } from "../../components/admin/StripeAnalytics";

function getToken() {
  const user_id = sessionStorage.getItem("user_id");
  const user_username = sessionStorage.getItem("user_username");
  const isAdmin = sessionStorage.getItem("isAdmin");
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
      navigate("/forbidden", { replace: true });
      window.location.reload();
    }
  }, [navigate]);

  return (
    <div className="flex h-screen flex-col gap-4 bg-gray-100 p-2">
      {/* Web Traffic */}
      <div className="h-1/3 rounded-lg bg-white p-4 shadow">
        <WebTraffic />
      </div>

      {/* Bottom section */}

      {/* CTA Clicking */}
      <div className="flex h-2/3 gap-4">
        <div className="flex w-1/4 flex-col gap-4">
          <div className="flex-1 rounded-lg bg-white p-4 shadow">
            <HomepageCTAClicks />
          </div>
          <div className="flex-1 rounded-lg bg-white p-4 shadow">
            <CheckoutCTAClicks />
          </div>
        </div>

        <div className="flex w-3/4 flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-1/2 flex-1 rounded-lg bg-white p-4 shadow">
              <AverageRating />
            </div>
            <div className="flex-1 rounded-lg bg-white p-4 shadow">
              <FocusAreas />
            </div>
          </div>

          <div className="flex-1 rounded-lg bg-white p-4 shadow">
            <StripeAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};
