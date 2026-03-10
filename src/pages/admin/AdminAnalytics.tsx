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
    <div className="flex flex-col gap-4 bg-gray-100 md:p-2 min-h-screen">

      {/* Web Traffic */}
      <div className="rounded-lg bg-white shadow hidden p-4 md:block">
        <WebTraffic />
      </div>

      {/* CTA Clicks - stack on mobile, side by side on desktop */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded-lg bg-white p-4 shadow md:w-1/4">
          <HomepageCTAClicks />
        </div>
        <div className="rounded-lg bg-white p-4 shadow md:w-1/4">
          <CheckoutCTAClicks />
        </div>

        {/* Rating + Focus Areas */}
        <div className="rounded-lg bg-white p-4 shadow md:w-1/4">
          <AverageRating />
        </div>
        <div className="rounded-lg bg-white p-4 shadow md:w-1/4">
          <FocusAreas />
        </div>
      </div>

      {/* Stripe */}
      <div className="rounded-lg bg-white p-4 shadow">
        <StripeAnalytics />
      </div>

    </div>
  );
};