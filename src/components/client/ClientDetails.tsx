import { useEffect, useState } from "react";
import { UserRound, Trophy, Phone, Crown, Mic } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export const ClientDetails = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch")))
      .then(setClient)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clientId]);

  const Success = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const startVoiceConversation = async () => {
    if (!clientId) return;

    setVoiceLoading(true);
    try {
      const response = await fetch(
        `https://connorsnowpt.onrender.com/api/voice-agent/${clientId}/start`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        window.open(`https://elevenlabs.io/app/conversations/${data.sessionId}`, "_blank");
      } else {
        alert("Failed to start voice conversation");
      }
    } catch (error) {
      console.error("Error starting voice conversation:", error);
      alert("Error starting voice conversation");
    } finally {
      setVoiceLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full px-4 py-4">
        <Skeleton height={300} />
      </div>
    );
  }

  if (!client) return <p>Loading client...</p>;

  const detailItems = [
    {
      icon: Trophy,
      label: "Goal",
      value: client.client_goal,
      name: "client_goal",
    },
    {
      icon: Phone,
      label: "Contact",
      value: client.client_preferred_contact,
      name: "client_preferred_contact",
    },
    {
      icon: Crown,
      label: "Plan",
      value: client.client_plan_type,
      name: "client_plan_type",
      readOnly: true,
    },
  ];

  return (
    <section className="w-full text-slate-900 bg-white m-4 p-8 rounded-xl shadow-lg">
      {/* Client Name Header */}
      <div className="mb-6 pb-6 border-b border-slate-200 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {client.client_firstname} {client.client_lastname}
          </h1>
          <p className="text-slate-600 mt-1">Client Information</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={startVoiceConversation}
            disabled={voiceLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            <Mic size={18} />
            {voiceLoading ? "Starting..." : "Talk to Connor"}
          </button>
          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="text-slate-600 px-4 py-2 rounded-lg hover:font-bold transition"
            >
              Edit
            </button>
          )}
          {edit && (
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="text-slate-600 hover:text-slate-900 text-sm font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {!edit ? (
        <>
          {/* Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {detailItems.map((item, index) => {
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
                    <h3 className="font-semibold text-slate-700">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-slate-900">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <input type="hidden" value={client.client_id} />

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue={client.client_firstname}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue={client.client_lastname}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Goal Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Goal
              </label>
              <input
                type="text"
                defaultValue={client.client_goal}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
                required
              />
            </div>

            {/* Contact Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Contact
              </label>
              <input
                type="text"
                defaultValue={client.client_preferred_contact}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
                required
              />
            </div>

            <button
              type="button"
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Save Changes
            </button>
          </div>
        </>
      )}

      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500/80 text-white px-6 py-3 rounded-lg shadow-lg">
          ✓ Client details updated successfully!
        </div>
      )}
    </section>
  );
};