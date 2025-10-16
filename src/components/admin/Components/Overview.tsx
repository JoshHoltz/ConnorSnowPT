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
        res.ok ? res.json() : Promise.reject("Failed to fetch client"),
      )
      .then(setClient)
      .catch((err) => console.error(err));
  }, []);

  if (!client) {
    return (
      <section className="p-4 text-slate-900">
        <p>Loading client...</p>
      </section>
    );
  }

  const overviewItems = [
    {
      icon: Trophy,
      label: "Goal",
      value: client.client_goal,
    },
    {
      icon: Weight,
      label: "Weight",
      value: `${client.client_weight} kg`,
    },
    {
      icon: Phone,
      label: "Contact",
      value: client.client_preferred_contact,
    },
    {
      icon: NotepadText,
      label: "Plan",
      value: client.client_plan_type,
    },
  ];

  return (
    <section className="w-full">
      {/* Client Name Header */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900">
          {client.client_firstname} {client.client_lastname}
        </h1>
        <p className="text-slate-600 mt-1">Client Overview</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:border-blue-900 hover:bg-blue-50 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-900 rounded-lg">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-slate-700">{item.label}</h3>
              </div>
              <p className="text-xl font-bold text-slate-900">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OverviewComponent;