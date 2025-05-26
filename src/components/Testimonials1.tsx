import React, { useEffect, useState } from "react";
import { Star } from 'lucide-react';

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
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-10">
           Testimonials
        </h1>

        <div className="flex flex-col justify-between md:grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonals.map((test) => (
            <div
              key={test.testimonial_id}
              className="border-t-4 bg-white p-8 flex flex-col h-full relative"
            >
              <div className="flex mb-4">
                {/* 
                From the array, length the rating to see how many stars to show
                .map will then state for the length of the rating create a star icon from lucid react
                REF: https://stackoverflow.com/questions/40528557/how-does-array-fromlength-5-v-i-i-work
                */}
                {Array.from({ length: Number(test.testimonial_rating) }).map((_, i) => (
                  <Star key={i} className="text-yellow-500 w-5 h-5" fill="currentColor" />
                ))}
              </div>

              <div>
                <p className="mb-4">"{test.testimonial_descripton}"</p>
              </div>
              <h1 className="font-bold mt-auto">{test.client_name}</h1>
              <small>{test.testimonial_date}</small>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
