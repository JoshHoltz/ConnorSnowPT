import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AdminAssignWorkout } from "../../components/admin/AdminAssignWorkout";

function getToken() {
  const user_id = sessionStorage.getItem('user_id');
  const user_username = sessionStorage.getItem('user_username');
  const isAdmin = sessionStorage.getItem('isAdmin'); 
  if (user_id && user_username && isAdmin) {
    return { user_id, user_username, isAdmin };
  }
  return null;
}

export const AdminWorkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clientId = searchParams.get('id');

  useEffect(() => {
    const token = getToken();

    if (!token || token.isAdmin !== "Y") {
      navigate('/forbidden', { replace: true });
      window.location.reload(); 
    }
  }, [navigate]);

  return (
    <div className="mb-4 text-black">
      <p className="hidden md:flex text-black px-8"></p>
      <div className="p-4 mt-10 md:mt-0">
        <AdminAssignWorkout clientId={clientId} />
      </div>
    </div>
  );
};
