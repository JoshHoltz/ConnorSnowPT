import { useEffect, useState } from "react";

export const ClientNotes = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!clientId) return;
    console.log("Extracted ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client")
      )
      .then(setClient)
      .catch((err) => console.error(err))
  }, [clientId]);
    if (!client) {
            return (
      <section className="text-white p-4 mt-10 md:mt-0">
        <p className="text-white">Loading client...</p>
      </section>
    );
  }

  return (
    <section className="text-white p-4 md:mt-0 w-full md:w-2/3">
      <div className="bg-gray-700 px-4 p-2">
        <h1 className="text-xl font-semibold">Client Notes</h1>
        <p className="text-sm">
          Notes for {client.client_firstname} {client.client_lastname}
        </p>
      </div>
        <div className="bg-gray-300 p-4">
            <form
            action="https://connorsnowpt.onrender.com/api/insert-client-note"
            method="POST"
            className="flex flex-col gap-4"
            >
            <input
                type="hidden"
                name="client_id"
                value={client.client_id}
            />
            <textarea 
                name="client_note"
                placeholder="Enter client notes..."
                className="w-full h-96 p-2 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={5}
            >
                {client.client_notes}
            </textarea>
            <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
            >
                Submit Note
            </button>
            </form>
        </div>
    </section>
  );
};
