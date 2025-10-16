import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const MuscleMassTracking = ({ clientId }: { clientId: string }) => {
  const [muscleMass, setMuscleMass] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    fetch(
      `https://connorsnowpt.onrender.com/api/client-muscle-mass/${clientId}`,
    )
      .then((res) => res.json())
      .then((data) => setMuscleMass(data.muscle_mass))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <CircularProgressbar
          value={muscleMass}
          maxValue={100}
          text={`${muscleMass}%`}
        />
      </div>

      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
              const response = await fetch(
                "https://connorsnowpt.onrender.com/api/insert-client-body-weight",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                },
              );

              if (response.ok) {
                (e.target as HTMLFormElement).reset();
                window.location.reload();
              } else {
                alert("Failed to log body weight");
              }
            } catch (error) {
              console.error("Error:", error);
              alert("Error logging body weight");
            }
          }}
          className="mt-4"
        >
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              name="muscle_mass"
              placeholder="Enter muscle mass %"
              step="0.01"
              className="rounded border px-3 py-2"
              required
            />
            <input type="hidden" name="client_id" value={clientId} />
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
