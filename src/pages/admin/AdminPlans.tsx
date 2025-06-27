import React from "react";
import { AdminPlansGrid } from "../../components/admin/Components/PlansGrid";

export const AdminPlans = () => {
  return (
    <div className="mb-4 text-black">
      <h1 className="hidden md:flex text-2xl font-bold text-black px-8">Plans</h1>
      <p className="hidden md:flex text-black px-8">
        View and Manage Your Plans
      </p>
      <AdminPlansGrid />
    </div>
  );
};