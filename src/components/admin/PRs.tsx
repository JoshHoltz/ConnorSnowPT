import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export const PRs = ({ clientId }: { clientId: string | null }) => {
  const [client, setClient] = useState<any>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

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

  useEffect(() => {
    if (!client || edit) return;

    const fetchAnalysis = async () => {
      setAnalysisLoading(true);
      try {
        const response = await fetch(
          `https://connorsnowpt.onrender.com/api/pr-analysis/${clientId}`
        );
        if (response.ok) {
          const data = await response.json();
          setAnalysis(data.analysis);
        }
      } catch (error) {
        console.error("Error fetching analysis:", error);
      } finally {
        setAnalysisLoading(false);
      }
    };

    fetchAnalysis();
  }, [client, clientId, edit]);

  const Success = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

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
    <section className="w-full p-4 md:mt-0 md:w-1/2">
      <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
      <div className="bg-slate-100 border border-t-0 border-slate-200 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-900">Client PR's</h1>
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
      </div>

      {edit ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
              const response = await fetch(
                "https://connorsnowpt.onrender.com/api/insert-client-pr-result",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                }
              );

              if (response.ok) {
                setClient({
                  ...client,
                  client_pr_name_1: data.client_pr_name_1,
                  client_pr_result_1: data.client_pr_result_1,
                  client_pr_name_2: data.client_pr_name_2,
                  client_pr_result_2: data.client_pr_result_2,
                  client_pr_name_3: data.client_pr_name_3,
                  client_pr_result_3: data.client_pr_result_3,
                  client_pr_name_4: data.client_pr_name_4,
                  client_pr_result_4: data.client_pr_result_4,
                });
                setEdit(false);
                Success();
              } else {
                alert("Failed to update PRs");
              }
            } catch (error) {
              console.error("Error:", error);
              alert("Error updating PRs");
            }
          }}
          className="p-4 py-4 bg-white"
        >
          <input type="hidden" name="client_id" value={client.client_id} />

          <div className="grid grid-cols-2 gap-4 px-4 bg-white">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200 bg-white">
                <input
                  id={`client_pr_name_${i + 1}`}
                  name={`client_pr_name_${i + 1}`}
                  type="text"
                  placeholder="Goal name (e.g., Bench Press)"
                  defaultValue={client[`client_pr_name_${i + 1}`]}
                  className="mb-2 w-full rounded border px-2 py-1"
                  required
                />
                <input
                  id={`client_pr_result_${i + 1}`}
                  name={`client_pr_result_${i + 1}`}
                  type="text"
                  placeholder="Goal result"
                  defaultValue={client[`client_pr_result_${i + 1}`]}
                  className="w-full rounded border px-2 py-1"
                  required
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 mt-4"
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <div className="px-4 py-4 grid grid-cols-2 gap-4 bg-white">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="rounded-lg border-2 p-5 duration-300 hover:bg-gray-200">
                <p className="font-semibold">{client[`client_pr_name_${i + 1}`] || "Set Goal:"}</p>
                <p className="text-gray-700">{client[`client_pr_result_${i + 1}`] || "N/A"}</p>
              </div>
            ))}
          </div>

          <div className="bg-white py-8 px-8 rounded-b-lg border border-t-0 border-slate-200">
            <div className="bg-slate-100 shadow p-8">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-slate-700" />
                <h3 className="font-semibold text-gray-800">AI PR Analysis</h3>
              </div>
              {analysisLoading ? (
                <p className="text-gray-600 italic">Analyzing performance...</p>
              ) : analysis ? (
                <p className="text-gray-700 leading-relaxed">{analysis}</p>
              ) : (
                <p className="text-gray-600 italic">No analysis available yet</p>
              )}
            </div>
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