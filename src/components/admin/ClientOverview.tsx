import { useEffect, useState } from "react";

export const ClientOverview = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!clientId) return;
    console.log("Extracted ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client")
      )
      .then(setClient)
      .catch((err) => console.error(err));
  }, [clientId]);

    if (!client) {
            return (
      <section className="text-white p-4 mt-10 md:mt-0">
        <p className="text-white">Loading client...</p>
      </section>
    );
  }

  return (
    <section className="text-white p-4 mt-10 md:mt-0">
      <div className="px-4 text-black bg-gray-800">
        <h1 className="text-white p-4 font-bold text-2xl">
          {client
            ? `${client.client_firstname} ${client.client_lastname}`
            : "Loading client..."}
        </h1>
      </div>
      <div className="px-4 w-full bg-gray-600 flex justify-between">
        <p className="flex justify-between p-2 font-semibold">Goal: {client.client_goal}</p>
        <p className="flex justify-between p-2 font-semibold">Contact: {client.client_preferred_contact}</p>
        <p className="flex justify-between p-2 font-semibold">Plan: {client.client_plan_type}</p>
      </div>
    </section>
  );
};
