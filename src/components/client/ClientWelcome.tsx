import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton' 

export const ClientWelcome = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!clientId) return;
    console.log("Extracted ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client")
      )
      .then((data) => {
        setClient(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [clientId]);

    if (loading) {
    return (
      <div className="px-4 py-4">
        <Skeleton height={75} />
      </div>
    )
  }

  if (!client) {
    return (
      <section className="text-white p-4 mt-10 md:mt-0">
        <p className="text-white">Loading client...</p>
      </section>
    );
  }

  return (
    <section className="text-white p-4 mt-10 md:mt-0">
            <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-t-lg shadow-sm h-2 relative overflow-hidden text-white" />

      <div className="px-2 text-black bg-gray-800 rounded-b-md">
        <h1 className="text-white p-4 font-bold text-2xl">
          {client
            ? `${client.client_firstname} ${client.client_lastname}`
            : "Loading client..."}
        </h1>
      </div>
    </section>
  );
};
