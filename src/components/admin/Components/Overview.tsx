import { useEffect, useState } from "react";
import { UserRound, Trophy, Weight, Phone, NotepadText } from "lucide-react"; 

const OverviewComponent = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const clientId = searchParams.get("id");

    console.log("Client ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client")
      )
      .then(setClient)
      .catch((err) => console.error(err));
  }, []);

  if (!client) {
    return (
      <section className="text-white p-4 sm:mt-0">
        <p>Loading client...</p>
      </section>
    );
  }

  return (
    <section className="text-black bg-gray-200 rounded-b-lg p-4 md:mt-0 grid grid-cols-5 gap-4">
      <h1 className="md:text-xl font-bold text-center">
        {client.client_firstname} <br /> {client.client_lastname}
      </h1>
 <div className="grid gap-6 md:grid-cols-4 w-full col-span-4">
  {/* Overview Block */}
  <div className="flex items-start">
    <p className="border-2 border-white rounded-lg p-4">
      <Trophy />
    </p>
    <div className="ml-4">
      <h2 className="md:text-l font-bold sm:text-sm">Goal:</h2>
      <p className="md:text-2xl sm:text-sm">{client.client_goal}</p>
    </div>
  </div>

  <div className="flex items-start">
    <p className="border-2 border-white rounded-lg p-4">
      <Weight />
    </p>
    <div className="ml-4">
      <h2 className="md:text-l font-bold sm:text-sm">Weight:</h2>
      <p className="md:text-2xl sm:text-sm">
        {client.client_weight} <span className="text-sm">kg</span>
      </p>
    </div>
  </div>

  <div className="flex items-start">
    <p className="border-2 border-white rounded-lg p-4">
      <Phone />
    </p>
    <div className="ml-4">
      <h2 className="md:text-l font-bold sm:text-sm">Contact:</h2>
      <p className="md:text-2xl sm:text-sm">{client.client_preferred_contact}</p>
    </div>
  </div>

  <div className="flex items-start">
    <p className="border-2 border-white rounded-lg p-4">
      <NotepadText />
    </p>
    <div className="ml-4">
      <h2 className="md:text-l font-bold sm:text-sm">Plan:</h2>
      <p className="md:text-2xl sm:text-sm">{client.client_plan_type}</p>
    </div>
  </div>
</div>

    </section>
  );
};

export default OverviewComponent;
