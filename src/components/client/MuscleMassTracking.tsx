import { useState, useEffect } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const MuscleMassTracking = ({ clientId }: { clientId: string }) => {
  const [muscleMass, setMuscleMass] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/client-muscle-mass/${clientId}`)
      .then(res => res.json())
      .then(data => setMuscleMass(data.muscle_mass))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Muscle Mass Tracking</h2>
      <CircularProgressbar value={20} maxValue={100} text="Muscle Mass" />
      <p>Current Muscle Mass: {muscleMass} kg</p>
    </div>
  );
}
