import { useEffect, useState } from 'react';

export const ClientOverview = ({ id }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch client"))
      .then(setClient)
      .catch(err => console.error(err));
  }, [id]);

  return (
    <section className="text-white p-4 mt-10 md:mt-0">
      <div className="mb-4 px-4 text-black">
        <h2>
          {client ? `${client.client_firstname} ${client.client_lastname}` : 'Client not found'}
        </h2>
      </div>
    </section>
  );
};
