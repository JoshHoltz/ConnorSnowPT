import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export const PRs = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client"),
      )
      .then(setClient)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return (
      <div className="w-1/2 px-4 py-4">
        <Skeleton height={400} />
      </div>
    );
  }

  if (!client)
    return <p className="mt-10 p-4 text-white md:mt-0">Loading client...</p>;

  return (
    <section className="w-full p-4 text-black md:mt-0 md:w-1/2">
      <div className="rounded-lg bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-lg font-semibold">
            <Trophy className="text-blue-900" />
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
            action="https://connorsnowpt.onrender.com/api/insert-client-pr-result"
            method="POST"
            className="mt-4 space-y-6"
          >
            <input type="hidden" name="client_id" value={client.client_id} />

            <div className="grid grid-cols-2 gap-4 px-4">
              <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
                <input
                  id="client_pr_name_1"
                  name="client_pr_name_1"
                  type="text"
                  placeholder="Goal name (e.g., Bench Press)"
                  defaultValue={client.client_pr_name_1}
                  className="mb-2 w-full rounded border px-2 py-1"
                  required
                />
                <input
                  id="client_pr_result_1"
                  name="client_pr_result_1"
                  type="text"
                  placeholder="Goal result"
                  defaultValue={client.client_pr_result_1}
                  className="w-full rounded border px-2 py-1"
                  required
                />
              </div>

              <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
                <input
                  id="client_pr_name_2"
                  name="client_pr_name_2"
                  type="text"
                  placeholder="Goal name (e.g., Squat)"
                  defaultValue={client.client_pr_name_2}
                  className="mb-2 w-full rounded border px-2 py-1"
                  required
                />
                <input
                  id="client_pr_result_2"
                  name="client_pr_result_2"
                  type="text"
                  placeholder="Goal result"
                  defaultValue={client.client_pr_result_2}
                  className="w-full rounded border px-2 py-1"
                  required
                />
              </div>

              <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
                <input
                  id="client_pr_name_3"
                  name="client_pr_name_3"
                  type="text"
                  placeholder="Goal name (e.g., Deadlift)"
                  defaultValue={client.client_pr_name_3}
                  className="mb-2 w-full rounded border px-2 py-1"
                  required
                />
                <input
                  id="client_pr_result_3"
                  name="client_pr_result_3"
                  type="text"
                  placeholder="Goal result"
                  defaultValue={client.client_pr_result_3}
                  className="w-full rounded border px-2 py-1"
                  required
                />
              </div>

              <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
                <input
                  id="client_pr_name_4"
                  name="client_pr_name_4"
                  type="text"
                  placeholder="Goal name (e.g., 5K Time)"
                  defaultValue={client.client_pr_name_4}
                  className="mb-2 w-full rounded border px-2 py-1"
                  required
                />
                <input
                  id="client_pr_result_4"
                  name="client_pr_result_4"
                  type="text"
                  placeholder="Goal result"
                  defaultValue={client.client_pr_result_4}
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
          <div className="mt-8 grid grid-cols-2 gap-4 px-4">
            <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
              <p>{client.client_pr_name_1 || "Set Goal:"}</p>
              <p>{client.client_pr_result_1 || "N/A"}</p>
            </div>
            <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
              <p>{client.client_pr_name_2 || "Set Goal:"}</p>
              <p>{client.client_pr_result_2 || "N/A"}</p>
            </div>
            <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
              <p>{client.client_pr_name_3 || "Set Goal:"}</p>
              <p>{client.client_pr_result_3 || "N/A"}</p>
            </div>
            <div className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
              <p>{client.client_pr_name_4 || "Set Goal:"}</p>
              <p>{client.client_pr_result_4 || "N/A"}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};