import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export const ClientWelcome = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    console.log("Extracted ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client"),
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
    );
  }

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
