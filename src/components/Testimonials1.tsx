import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Skeleton from 'react-loading-skeleton' // REF (Skeleton Loading): https://www.npmjs.com/package/react-loading-skeleton
import 'react-loading-skeleton/dist/skeleton.css'
import { data } from "react-router-dom";

{/* /////////////////////////////////////////////////////////////////////////////

* Using Consts
    1. testionals and setPackages, used to fetch the testimonials data from the API
    2. loading and setLoading, used to show the skeleton effect while the data is being fetched

* Using useEffect
    1. useEffect changes state once the API call has been fetched
    2. Once the data has been fetched the:
        - setPackages is called and the data is passed into the state as an array
        - setLoading is set to false to stop the skeleton effect 

* Array
    1. The array is used to map (loop) through each fetched testimonial
    2. Each testimonial is then diplayed according to the card layout 
  
///////////////////////////////////////////////////////////////////////////// */}

export const Testimonials1 = () => {
  const [testimonals, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/client-testimonals")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then((data) => {
        setPackages(data);
        setLoading(false); // once data is fetched, set loading to false to stop the skeleton effect
      });
  }, []);

  if (loading) {
    return (
          <header className="bg-gray-100 text-black w-full">
        <h1 className="p-4 text-2xl md:text-4xl font-bold text-center mb-6">
          Testimonials
        </h1>
      <div className="p-4 px-4 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border p-4 rounded hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <Skeleton width="40%" />
              <Skeleton height={200} />
              <div className="mb-4"></div>
              <Skeleton width="30%" />
              <Skeleton width="40%" />
            </div>
          ))}
        </div>
      </div>
    </header>
    );
  }

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
              className="border-t-4 bg-white p-8 flex flex-col h-full relative shadow-md hover:bg-gray-300 transition duration-300 ease-in-out"
            >
              <div className="flex mb-4">
                {/* 
                From the array, length the rating to see how many stars to show
                .map will then state for the length of the rating create a star icon from lucid react
                REF: https://stackoverflow.com/questions/40528557/how-does-array-fromlength-5-v-i-i-work
                */}
                {Array.from({ length: Number(test.testimonial_rating) }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-500 w-5 h-5"
                      fill="currentColor"
                    />
                  )
                )}
              </div>

              <div>
                <p className="mb-4">"{test.testimonial_descripton}"</p>
              </div>
              <h1 className="font-bold mt-auto">{test.client_name}</h1>
              <small>{new Date(test.testimonial_date).toLocaleDateString('en-GB')}</small> {/* Ref (Date Formatting): https://stackoverflow.com/questions/27939773/tolocaledatestring-short-format */}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
