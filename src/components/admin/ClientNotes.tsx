import { useEffect, useState } from "react";

export const ClientNotes = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!clientId) return;
    console.log("Extracted ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client"),
      )
      .then(setClient)
      .catch((err) => console.error(err));
  }, [clientId]);
  if (!client) {
    return (
      <section className="mt-10 p-4 text-white md:mt-0">
        <p className="text-white">Loading client...</p>
      </section>
    );
  }

  return (
    <section className="w-full p-4 text-white md:mt-0 md:w-1/2">
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
      <div className="bg-gray-800 p-2 px-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Client Notes</h1>
          <p className="text-sm">
            Notes for {client.client_firstname} {client.client_lastname}
          </p>
        </div>
      </div>
      <div className="bg-gray-300 p-4">
        <form
          action="https://www.connorsnowpt.com/api/insert-client-note"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="client_id" value={client.client_id} />
          <textarea
            name="client_note"
            placeholder="Enter client notes..."
            className="h-96 w-full rounded bg-gray-900 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={5}
          >
            {client.client_notes}
          </textarea>
          <button
            type="submit"
            className="rounded bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
          >
            Submit Note
          </button>
        </form>
      </div>
    </section>
  );
};
