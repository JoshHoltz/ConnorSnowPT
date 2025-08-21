import { useEffect, useState } from "react";

export const ClientOverview = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!clientId) return;
    console.log("Extracted ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client"),
      )
      .then(setClient)
      .catch((err) => console.error(err));
  }, [clientId]);

  if (!client) {
    return (
      <section className="mt-10 p-4 text-white md:mt-0">
        <p className="text-white">Loading client...</p>
      </section>
    );
  }

  return (
    <section className="mt-10 p-4 text-white md:mt-0">
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />

      <div className="rounded-b-md bg-gray-800 px-2 text-black">
        <h1 className="p-4 text-2xl font-bold text-white">
          {client
            ? `${client.client_firstname} ${client.client_lastname}`
            : "Loading client..."}
        </h1>
      </div>
    </section>
  );
};
