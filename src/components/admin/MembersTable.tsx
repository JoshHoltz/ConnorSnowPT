import React, { useState, useEffect } from "react";
import { Edit2, Dumbbell, Search, Plus } from "lucide-react";
import { AddClient } from "./AddClient";

export const MembersTable = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddClient, setShowAddClient] = useState(false);

  const fetchClients = () => {
    fetch("https://connorsnowpt.onrender.com/api/client-information")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then(setClients)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Filter clients based on search
  const filteredClients = clients.filter((client) =>
    `${client.client_firstname} ${client.client_lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

 return (
    <section className="p-6 mt-10 md:mt-0">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
            />
          </div>
          <button
            onClick={() => setShowAddClient(true)}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md"
          >
            <Plus size={20} />
            <span className="sm:inline">Add Client</span>
          </button>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden space-y-3 bg-gray-200 p-2 rounded-lg">
          {filteredClients.map((client, index) => (
            <div key={index} className="bg-white rounded-xl shadow border border-slate-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://placehold.co/400"
                  alt="Client"
                  className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
                />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {client.client_firstname} {client.client_lastname}
                  </p>
                  <p className="text-xs text-slate-500">{client.client_plan_type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`/admin/AssignWorkout?id=${client.client_id}`}>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition shadow">
                    <Dumbbell size={16} />
                  </button>
                </a>
                <a href={`/admin/ViewClient?id=${client.client_id}`}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition shadow">
                    <Edit2 size={16} />
                  </button>
                </a>
              </div>
            </div>
          ))}
          {filteredClients.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-500 font-medium">No clients found</p>
              <p className="text-slate-400 text-sm">Try adjusting your search</p>
            </div>
          )}
        </div>

        {/* Desktop Table - unchanged */}
        <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
          <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Client</th>
                  <th className="px-6 py-4 text-left font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left font-semibold">Plan</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-blue-50 transition duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src="https://placehold.co/400"
                          alt="Client"
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{client.client_firstname} {client.client_lastname}</p>
                          <p className="text-sm text-slate-500">ID: {client.client_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-slate-700">{client.client_preferred_contact}</span></td>
                    <td className="px-6 py-4"><span className="inline-block px-3 py-1 text-slate-700 font-medium">{client.client_plan_type}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <a href={`/admin/AssignWorkout?id=${client.client_id}`}>
                          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg">
                            <Dumbbell size={18} /><span className="hidden sm:inline">Assign</span>
                          </button>
                        </a>
                        <a href={`/admin/ViewClient?id=${client.client_id}`}>
                          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg">
                            <Edit2 size={18} /><span className="hidden sm:inline">Edit</span>
                          </button>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredClients.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-500 font-medium">No clients found</p>
              <p className="text-slate-400 text-sm">Try adjusting your search</p>
            </div>
          )}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredClients.length}</span> of <span className="font-semibold text-slate-900">{clients.length}</span> clients
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-slate-200 rounded-lg hover:bg-slate-100 transition">← Prev</button>
              <button className="px-3 py-1 text-sm border border-slate-200 rounded-lg hover:bg-slate-100 transition">Next →</button>
            </div>
          </div>
        </div>
      </div>

      {showAddClient && (
        <AddClient onClose={() => setShowAddClient(false)} onSuccess={() => fetchClients()} />
      )}
    </section>
  );
};