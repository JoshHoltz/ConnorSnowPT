import { useEffect, useState } from "react";
import { Trophy } from "lucide-react"; // Ensure you have lucide-react installed

export const PRs = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState(null);
  const [edit, setEdit] = useState(false);

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
    <section className="w-full p-4 text-black md:mt-0 md:w-1/2">
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
      <div className="rounded-lg bg-white">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-4 text-white">
          <h1 className="flex items-center gap-2 text-lg font-semibold">
            <Trophy />
            Personal Records
          </h1>
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
            action="https://connorsnowpt.onrender.com/api/insert-client-pr-result" //update api call
            method="POST"
            className="mt-4 space-y-6"
          >
            <input type="hidden" name="client_id" value={client.client_id} />

            <div className="grid grid-cols-2 gap-4 px-4">
              <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
                <label
                  htmlFor="client_bench_pr"
                  className="mb-1 block font-medium"
                >
                  Bench Press PR
                </label>
                <input
                  id="client_bench_pr"
                  name="client_bench_pr"
                  type="text"
                  defaultValue={client.client_bench_pr}
                  className="w-full rounded border px-2 py-1"
                  required
                />
              </div>

              <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
                <label
                  htmlFor="client_squat_pr"
                  className="mb-1 block font-medium"
                >
                  Squat PR
                </label>
                <input
                  id="client_squat_pr"
                  name="client_squat_pr"
                  type="text"
                  defaultValue={client.client_squat_pr}
                  className="w-full rounded border px-2 py-1"
                  required
                />
              </div>

              <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
                <label
                  htmlFor="client_deadlift_pr"
                  className="mb-1 block font-medium"
                >
                  Deadlift PR
                </label>
                <input
                  id="client_deadlift_pr"
                  name="client_deadlift_pr"
                  type="text"
                  defaultValue={client.client_deadlift_pr}
                  className="w-full rounded border px-2 py-1"
                  required
                />
              </div>

              <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
                <label
                  htmlFor="client_5k_time_pr"
                  className="mb-1 block font-medium"
                >
                  5k PR
                </label>
                <input
                  id="client_5k_time_pr"
                  name="client_5k_time_pr"
                  type="text"
                  defaultValue={client.client_5k_time_pr}
                  className="w-full rounded border px-2 py-1"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="mt-2 grid grid-cols-2 gap-4 px-4 py-4">
            <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
              <p>Bench Press PR</p>
              <p>{client.client_bench_pr || "N/A"}</p>
            </div>
            <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
              <p>Squat PR</p>
              <p>{client.client_squat_pr || "N/A"}</p>
            </div>
            <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
              <p>Deadlift PR</p>
              <p>{client.client_deadlift_pr || "N/A"}</p>
            </div>
            <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
              <p>5k PR</p>
              <p>{client.client_5k_time_pr || "N/A"}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
