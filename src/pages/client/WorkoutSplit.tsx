import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { WorkoutSplitTable } from "../../components/client/WorkoutSplit";

function getToken() {
  const user_id = sessionStorage.getItem('user_id');
  const user_username = sessionStorage.getItem('user_username');
  if (user_id && user_username) {
    return { user_id, user_username };
  }
  return null;
}

export const WorkoutSplit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getToken();
    const params = new URLSearchParams(location.search);
    const idFromUrl = params.get('id');

    if (!token) {
      navigate('/forbidden', { replace: true });
      window.location.reload();
      return;
    }

    if (!idFromUrl) {
      navigate(`/client/workouts?id=${token.user_id}`, { replace: true });
      return;
    }

    if (idFromUrl !== token.user_id) {
      navigate('/forbidden', { replace: true });
      window.location.reload(); 
      return;
    }

  }, [location, navigate]);

  return (
    <div className="mb-4 text-black">
      <WorkoutSplitTable />
    </div>
  );
};
