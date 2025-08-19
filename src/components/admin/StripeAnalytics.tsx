import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Line } from 'react-chartjs-2';


export const StripeAnalytics = () => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    fetch('https://connorsnowpt.onrender.com/api/posthog-homepage-cta-clicks')
      .then(res => res.json())
      .then(data => {
        setClicks(data.results[0][0]);
      });
  }, []);

  return (
    <div className="bg-white px-4 rounded-lg h-1/2">
      <h1 className="text-sm font-bold text-black">Sale Analytics</h1>
        
        <div className="flex">
            <div className="w-3/4">
        <Line
            data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                    {
                    label: 'Sales',
                    data: [65, 59, 80, 81, 56, 55],
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    },
                ],
                }}
            options={{
                maintainAspectRatio: false, 
                scales: {
                    y: {
                    beginAtZero: true,
                    },  
                },
            }}
            className="h-1/2"
        />
            </div>


        <div className="flex flex-col w-1/4 space-between">
        <h1 className='text-sm text-center font-bold'>Total Sales </h1>
        <CircularProgressbar className='h-24 pt-2 flex' value={54} text={`£345`} />
        <h1 className='text-sm text-center font-bold'>Monthly Sales </h1>
        <CircularProgressbar className='h-24 pt-2 flex' value={54} text={`£130`} />
        </div>
        </div>
      </div>
  );
};