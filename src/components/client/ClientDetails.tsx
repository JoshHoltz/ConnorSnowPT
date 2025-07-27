import { useEffect, useState } from "react";
import { UserIcon, TargetIcon, PhoneIcon, CrownIcon, User, Crown } from "lucide-react";

// REF (Creating a Circle edge): https://tailwindcss.com/docs/border-radius

export const ClientDetails = ({ clientId }: { clientId: string | null }) => {
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
      <section className="text-black p-4 mt-10 md:mt-0">
        <p className="text-black">Loading client...</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-4 w-full md:w-1/2 text-black mt-0 md:mt-0">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 h-full relative overflow-hidden text-black">
        <div className="absolute top-0 left-0 w-20 md:w-24 h-16 md:h-24 bg-white/20 rounded-br-full"></div>

        <div className="flex justify-between">
            <h1 className="text-lg font-bold">Client Information</h1>
            <a className="text-blue-600 hover:underline" href="#">Edit</a>
        </div>

        <div className="py-2">
          <div className="flex">
            <UserIcon />
            <div className="flex flex-col">
              <small className="px-2 font-bold">Name</small>
              <p className="mt-1 px-2">
                {client.client_firstname} {client.client_lastname}
              </p>
            </div>
          </div>

          <div className="flex mt-6">
            <TargetIcon />
            <div className="flex flex-col">
              <small className="px-2 font-bold">Goal</small>
              <p className="mt-1 px-2">{client.client_goal}</p>
            </div>
          </div>

          <div className="flex mt-6">
            <PhoneIcon />
            <div className="flex flex-col">
              <small className="px-2 font-bold">Contact</small>
              <p className="mt-1 px-2">{client.client_preferred_contact}</p>
            </div>
          </div>

          <div className="flex mt-6">
            <CrownIcon />
            <div className="flex flex-col">
              <small className="px-2 font-bold">Plan Type</small>
              <p className="mt-1 px-2">{client.client_plan_type}</p>
            </div>
          </div>

        </div>
        <div className="absolute bottom-0 right-0 w-20 md:w-24 h-16 md:h-24 bg-white/10 rounded-tl-full"></div>
      </div>
    </section>
  );
};
