import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export const WebTraffic = () => {
  const [views, setViews] = useState<number[]>(Array(7).fill(0));

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/posthog-web-connections")
      .then((res) => res.json())
      .then((data) => {
        const last7Days = Array(7).fill(0);
        data.results.forEach((item: any, i: number) => {
          last7Days[i] = item[1];
        });
        setViews(last7Days);
        console.log("Web Traffic Data:", last7Days);
      });
  }, []);

  return (
    <div className="flex h-full flex-col text-black">
      <h1 className="text-sm font-bold text-black">
        Web Traffic (7 Day Overview)
      </h1>
      <div className="flex-1">
        <Line
          data={{
            labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
            datasets: [
              {
                label: "Views",
                data: views,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false, // allows chart to fill parent div
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};
