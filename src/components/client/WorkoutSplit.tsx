import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


export const WorkoutSplit = () => {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("id");

  useEffect(() => {
    if (!clientId) return;

    fetch(`https://connorsnowpt.onrender.com/api/workout-split/${clientId}`)
  
})}