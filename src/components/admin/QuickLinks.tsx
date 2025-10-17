import React from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

type QuickLinkProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
};

function QuickLink({ icon, label, to }: QuickLinkProps) {
  return (
    <Link to={to}>
      <button className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors w-20">        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1 shadow-sm">
          {icon}
        </div>
        <span className="text-xs font-medium text-gray-700 text-center leading-tight">
          {label}
        </span>
      </button>
    </Link>
  );
}

export const QuickLinks = () => {
  return (
    <section className="mt-6 px-8 py-4 md:mt-0">
      <div className="relative h-2 overflow-hidden rounded-t-xl bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
      <div className="bg-white rounded-b-xl p-4 shadow-lg border border-gray-100 mb-4">
        <h2 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Zap className="text-blue-600" size={18} />
          Quick Links
        </h2>

        <div className="flex overflow-x-auto gap-2 pb-1">
          <QuickLink icon={<Zap size={16} />} label="Clients" to="../admin/AdminClients" />
          <QuickLink icon={<Zap size={16} />} label="Messages" to="../admin/AdminCommunications" />
          <QuickLink icon={<Zap size={16} />} label="Packages" to="../admin/AdminPackages" />
          <QuickLink icon={<Zap size={16} />} label="Plans" to="../admin/AdminPlans" />
          <QuickLink icon={<Zap size={16} />} label="Analytics" to="../admin/analytics" />
        </div>
      </div>
    </section>
  );
};
