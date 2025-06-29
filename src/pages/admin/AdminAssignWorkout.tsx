import React from "react";
import { useSearchParams } from 'react-router-dom'
import { AdminAssignWorkout } from "../../components/admin/AdminAssignWorkout";

export const AdminWorkout = () => {
  const [searchParams] = useSearchParams()
  const clientId = searchParams.get('id')

  return (
    <div className="mb-4 text-black">
      <p className="hidden md:flex text-black px-8">
        
      </p>
      <div className="p-4 mt-10 md:mt-0">
        <AdminAssignWorkout clientId={clientId}  />
    </div>
    </div>
  );
};