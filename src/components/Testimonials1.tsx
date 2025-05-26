import React, { useEffect, useState } from "react";
import { createIcons, icons } from 'lucide';

export const Testimonials1 = () => {
  const [testimonals, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/client-testimonals")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then(setPackages);
  }, []);

  return (
    <header className="bg-gray-100 text-black w-full">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">
          My Testimonals
        </h1>

        <div className="flex flex-col justify-between md:grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonals.map((test) => (
            <div
              key={test.testimonial_id}
              className="border-t-4 bg-white p-8 flex flex-col h-full relative"
            >
              
              

              <div>
                <p className="mb-4">"{test.testimonial_descripton}"</p>
              </div>
              <h1 className="font-bold mt-auto">{test.client_name}</h1>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
