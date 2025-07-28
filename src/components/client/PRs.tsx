import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

export const PRs = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState<any>(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch client")))
      .then(setClient)
      .catch(console.error);
  }, [clientId]);

  if (!client) return <p className="text-white p-4 mt-10 md:mt-0">Loading client...</p>;

  return (
    <section className="text-black p-4 md:mt-0 w-full md:w-1/2">
      <div className="bg-white px-4 py-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="text-blue-900" />
            Personal Records
          </h1>
          {!edit ? (
            <button onClick={() => setEdit(true)} className="text-blue-600 hover:underline" type="button">
              Edit
            </button>
          ) : (
            <button onClick={() => setEdit(false)} className="text-red-600 hover:underline" type="button">
              Cancel
            </button>
          )}
        </div>

        {edit ? (
          <form
            action="https://connorsnowpt.onrender.com/api/insert-client-pr-result" //update api call
            method="POST"
            className="mt-4 space-y-6"
          >
            <input type="hidden" name="client_id" value={client.client_id} />

            <div className="grid grid-cols-2 gap-4 px-4">
              <div className="rounded-lg border-2 p-5 hover:bg-gray-200 duration-300">
                <label htmlFor="client_bench_pr" className="block mb-1 font-medium">
                  Bench Press PR
                </label>
                <input
                  id="client_bench_pr"
                  name="client_bench_pr"
                  type="text"
                  defaultValue={client.client_bench_pr}
                  className="border rounded px-2 py-1 w-full"
                  required
                />
              </div>

              <div className="rounded-lg border-2 p-5 hover:bg-gray-200 duration-300">
                <label htmlFor="client_squat_pr" className="block mb-1 font-medium">
                  Squat PR
                </label>
                <input
                  id="client_squat_pr"
                  name="client_squat_pr"
                  type="text"
                  defaultValue={client.client_squat_pr}
                  className="border rounded px-2 py-1 w-full"
                  required
                />
              </div>

              <div className="rounded-lg border-2 p-5 hover:bg-gray-200 duration-300">
                <label htmlFor="client_deadlift_pr" className="block mb-1 font-medium">
                  Deadlift PR
                </label>
                <input
                  id="client_deadlift_pr"
                  name="client_deadlift_pr"
                  type="text"
                  defaultValue={client.client_deadlift_pr}
                  className="border rounded px-2 py-1 w-full"
                  required
                />
              </div>

              <div className="rounded-lg border-2 p-5 hover:bg-gray-200 duration-300">
                <label htmlFor="client_5k_time_pr" className="block mb-1 font-medium">
                  5k PR
                </label>
                <input
                  id="client_5k_time_pr"
                  name="client_5k_time_pr"
                  type="text"
                  defaultValue={client.client_5k_time_pr}
                  className="border rounded px-2 py-1 w-full"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 px-4">
            <div className="rounded-lg border-2 p-5 hover:bg-gray-200 duration-300">
              <p>Bench Press PR</p>
              <p>{client.client_bench_pr || "N/A"}</p>
            </div>
            <div className="rounded-lg border-2 p-5 hover:bg-gray-200 duration-300">
              <p>Squat PR</p>
              <p>{client.client_squat_pr || "N/A"}</p>
            </div>
            <div className="rounded-lg border-2 p-5 hover:bg-gray-200 duration-300">
              <p>Deadlift PR</p>
              <p>{client.client_deadlift_pr || "N/A"}</p>
            </div>
            <div className="rounded-lg border-2 p-5 hover:bg-gray-200 duration-300">
              <p>5k PR</p>
              <p>{client.client_5k_time_pr || "N/A"}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
