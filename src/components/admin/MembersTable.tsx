import React, { useState, useEffect } from "react";

export const MembersTable = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/client-information")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then(setClients)
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="mt-10 p-4 text-black md:mt-0">
      <div className="mb-4 px-4 text-white">
        <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
        {/* <button className="flex justifiy-end p-2 m-2 bg-gray-500 rounded-lg hover:bg-gray-400 transition duraton-300">Add Client</button> */}
        <table className="w-full border-collapse border-2 border-t-0 border-black text-left">
          <thead className="border-2 border-t-0 border-black bg-gray-800">
            <th className="p-2">Client</th>
            <th>Contact</th>
            <th>Plan</th>
            <th>Assign Workout</th>
            <th>Edit</th>
          </thead>
          <tbody className="text-black">
            {clients.map((client, index) => (
              <tr
                key={index}
                className={
                  index % 2 == 0
                    ? "bg-gray-300 transition duration-300 hover:bg-gray-400"
                    : "bg-white transition duration-300 hover:bg-gray-400"
                }
              >
                {/* photo */}
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://placehold.co/400"
                      alt="Client"
                      className="w-16 rounded-full"
                    />
                    <span>
                      {client.client_firstname} {client.client_lastname}
                    </span>
                  </div>
                </td>
                <td className="p-2">{client.client_preferred_contact}</td>
                <td className="p-2">{client.client_plan_type}</td>
                <td className="p-2">
                  <button className="rounded bg-blue-500 px-4 py-2 text-white">
                    <a href={`/admin/AssignWorkout?id=${client.client_id}`}>
                      Assign
                    </a>
                  </button>
                </td>
                <td className="p-2">
                  <button className="rounded bg-yellow-500 px-4 py-2 text-white">
                    <a href={`/admin/ViewClient?id=${client.client_id}`}>
                      Edit
                    </a>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
