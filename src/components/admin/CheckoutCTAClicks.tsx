import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

export const CheckoutCTAClicks = () => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    fetch('https://connorsnowpt.onrender.com/api/posthog-checkout-clicks')
      .then(res => res.json())
      .then(data => {
        setClicks(data.results[0][0]);
      });
  }, []);

  return (
    <div className="bg-white px-4 py-4 rounded-lg h-1/2">
      <h1 className="text-center text-xl font-bold text-black px-8">Checkout Clicks</h1>
        <CircularProgressbar className='h-52 pt-2' value={clicks} maxValue={5} text={`${clicks}`} />
    </div>
  );
};