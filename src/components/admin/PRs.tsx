import { useEffect, useState } from "react";
import { Trophy } from "lucide-react"; // Ensure you have lucide-react installed

export const PRs = ({ clientId }: { clientId: string | null }) => {
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
      <section className="text-white p-4 mt-10 md:mt-0">
        <p className="text-white">Loading client...</p>
      </section>
    );
  }

  return (
    <section className="text-white p-4 md:mt-0 w-full md:w-1/3">
      <div className="bg-gray-700 px-4 p-2">
        <h1 className="text-xl font-semibold">Client Personal Records</h1>
        <p className="text-sm">Personal Records</p>
      </div>

      <div className="bg-gray-900 p-4 px-4">
        {/* pr 1 */}
        <div className="bg-gray-600 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <p className="border-2 border-white rounded-lg p-4">
              <Trophy />
            </p>
            <div className="ml-4">
              <h2 className="md:text-l font-bold sm:text-sm">Bench:</h2>
              <form action="https://connorsnowpt.onrender.com/api/insert-client-bench-pr" className="flex">
                <input
                  type="hidden"
                  name="client_id"
                  value={client.client_id}
                />
                <input className="md:text-2xl sm:text-sm"
                  type="text"
                  name="client_bench_pr"
                  defaultValue={client.client_bench_pr}
                  className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                />
                <button
                  type="submit"
                  className="ml-4 p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* pr 2 */}
        <div className="bg-gray-600 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <p className="border-2 border-white rounded-lg p-4">
              <Trophy />
            </p>
            <div className="ml-4">
              <h2 className="md:text-l font-bold sm:text-sm">Squat:</h2>
              <p className="md:text-2xl sm:text-sm">{client.client_squat_pr}</p>
            </div>
          </div>
        </div>

        {/* pr 3 */}
        <div className="bg-gray-600 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <p className="border-2 border-white rounded-lg p-4">
              <Trophy />
            </p>
            <div className="ml-4">
              <h2 className="md:text-l font-bold sm:text-sm">Deadlift:</h2>
              <p className="md:text-2xl sm:text-sm">
                {client.client_deadlift_pr}
              </p>
            </div>
          </div>
        </div>

        {/* pr 4 */}
        <div className="bg-gray-600 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <p className="border-2 border-white rounded-lg p-4">
              <Trophy />
            </p>
            <div className="ml-4">
              <h2 className="md:text-l font-bold sm:text-sm">5k Time:</h2>
              <p className="md:text-2xl sm:text-sm">
                {client.client_5k_time_pr}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
