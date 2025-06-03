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
    <section className=" text-black p-4 mt-10 md:mt-0">
      <div className="mb-4 px-4 text-white">
        <table className="w-full border-collapse border-2 border-black text-left">
          <thead className="border-2 border-black bg-gray-800">
            <th className="p-2">Client</th>
            <th>Contact</th>
            <th>Plan</th>
            <th>Assign Workout</th>
            <th>Edit</th>
          </thead>
          <tbody className="text-black">
            {clients.map((client, index) => (
              <tr key={index} 
              className={index % 2 == 0 ? "bg-gray-300 hover:bg-gray-400 transition duration-300" : "bg-white hover:bg-gray-400 transition duration-300"}>
                {/* photo */}
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://placehold.co/400"
                      alt="Client"
                      className="rounded-full w-16"
                    />
                    <span>
                      {client.client_firstname} {client.client_lastname}
                    </span>
                  </div>
                </td>
                <td className="p-2">{client.client_preferred_contact}</td>
                <td className="p-2">{client.client_plan_type}</td>
                <td className="p-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Assign
                  </button>
                </td>
                <td className="p-2">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                    Edit
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
