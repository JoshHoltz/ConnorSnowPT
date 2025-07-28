import { useEffect, useState } from "react";
import { UserIcon, TargetIcon, PhoneIcon, CrownIcon } from "lucide-react";
import Skeleton from 'react-loading-skeleton' 

export const ClientDetails = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch")))
      .then(setClient)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [clientId]);

  if (loading) {
    return (
    <div className="w-1/2 px-4 py-4">
        <Skeleton height={300} />
    </div>
    )
  }

  if (!client) return <p>Loading client...</p>;

  return (
    <section className="p-4 w-full md:w-1/2 text-black">
      <div className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">Client Information</h1>
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="text-blue-600 hover:underline"
              type="button"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => setEdit(false)}
              className="text-red-600 hover:underline"
              type="button"
            >
              Cancel
            </button>
          )}
        </div>

        {edit ? (
          <form
            action="https://connorsnowpt.onrender.com/api/" //update query
            method="POST"
            className="mt-4 space-y-4"
          >
            <input type="hidden" name="client_id" value={client.client_id} />

            <div className="flex items-center space-x-2">
              <UserIcon />
              <input
                type="text"
                name="client_firstname"
                defaultValue={client.client_firstname}
                className="border rounded px-2 py-1 w-1/2"
                required
              />
              <input
                type="text"
                name="client_lastname"
                defaultValue={client.client_lastname}
                className="border rounded px-2 py-1 w-1/2"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <TargetIcon />
              <input
                type="text"
                name="client_goal"
                defaultValue={client.client_goal}
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <PhoneIcon />
              <input
                type="text"
                name="client_preferred_contact"
                defaultValue={client.client_preferred_contact}
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <CrownIcon />
              <p className="font-bold">{client.client_plan_type}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-2">
              <UserIcon />
              <p>
                {client.client_firstname} {client.client_lastname}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <TargetIcon />
              <p>{client.client_goal}</p>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneIcon />
              <p>{client.client_preferred_contact}</p>
            </div>
            <div className="flex items-center space-x-2">
              <CrownIcon />
              <p>{client.client_plan_type}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
