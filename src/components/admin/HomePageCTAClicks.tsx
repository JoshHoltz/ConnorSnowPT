import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

export const HomepageCTAClicks = () => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/posthog-homepage-cta-clicks")
      .then((res) => res.json())
      .then((data) => {
        setClicks(data.results[0][0]);
      });
  }, []);

  return (
    <div className="h-1/2 rounded-lg bg-white px-4">
      <h1 className="text-sm font-bold text-black">Homepage CTA Clicks</h1>
      <CircularProgressbar
        className="h-52 pt-2"
        value={clicks}
        maxValue={5}
        text={`${clicks}`}
      />
    </div>
  );
};
