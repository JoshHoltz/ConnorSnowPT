import { useEffect, useState } from "react";

export const ClientNotes = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState<any>(null);
  const [noteText, setNoteText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!clientId) return;
    console.log("Extracted ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client"),
      )
      .then((data) => {
        setClient(data);
        setNoteText(data.client_notes || "");
      })
      .catch((err) => console.error(err));
  }, [clientId]);

  if (!client) {
    return (
      <section className="mt-10 p-4 text-slate-900 md:mt-0">
        <p>Loading client...</p>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      payload.append(key, value.toString());
    }

    try {
      const response = await fetch(
        "https://www.connorsnowpt.com/api/insert-client-note",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: payload.toString(),
        },
      );

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
      } else {
        console.error("Failed to submit client note");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative w-full p-4 md:mt-0 md:w-1/2">
      {/* Success message popup */}
      {showSuccess && (
        <div className="fixed right-4 top-4 z-50 rounded-lg bg-green-500/80 px-6 py-3 text-white shadow-lg">
          ✓ Client note saved successfully!
        </div>
      )}

      {/* Header */}
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
      <div className="border border-t-0 border-slate-200 bg-slate-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">Client Notes</h1>
          <p className="text-sm text-slate-600">
            Notes for {client.client_firstname} {client.client_lastname}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-b-lg border border-t-0 border-slate-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="client_id" value={client.client_id} />
          <textarea
            name="client_note"
            placeholder="Enter client notes..."
            className="h-96 w-full rounded-lg border border-slate-300 bg-white p-4 text-slate-900 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
            rows={5}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-950"
          >
            Submit Note
          </button>
        </form>
      </div>
    </section>
  );
};