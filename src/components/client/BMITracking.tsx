import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

export const BMITracking = ({ clientId }: { clientId: string }) => {
  const [bmiMeasurement, setBMIMeasurement] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/client-bmi/${clientId}`)
      .then((res) => res.json())
      .then((data) => setBMIMeasurement(data.bmi_measurement))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) return <Skeleton count={1} />;

  const clientBMI = bmiMeasurement;
  const maxBMI = 40;

  const data = {
    labels: ["Underweight", "Healthy", "Overweight", "Obese"],
    datasets: [
      {
        label: "BMI Categories",
        data: [18.5, 6.5, 5, 10], // to reflect bmi poportions
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Underweight
          "rgba(54, 162, 235, 0.6)", // Healthy
          "rgba(255, 206, 86, 0.6)", // Overweight
          "rgba(153, 102, 255, 0.6)", // Obese
        ],
        cutout: "60%",
      },
      {
        label: "Client BMI",
        data: [clientBMI, maxBMI - clientBMI],
        backgroundColor: ["black", "white"],
        cutout: "40%", // inner ring
      },
    ],
  };

  return (
    <>
       <Doughnut data={data} />;

          <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
              const response = await fetch(
                "https://connorsnowpt.onrender.com/api/insert-bmi",
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
              name="bmi"
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

   </>
        )
};
