import { useEffect, useState } from 'react';

export const ClientOverview = ({ clientId }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!clientId) return;
    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch client"))
      .then(setClient)
      .catch(err => console.error(err));
  }, [clientId]);

  return (
    <div>
      <h2>{client.user_firstname}</h2>
      {/* Render more fields as needed */}
    </div>
  );
};
