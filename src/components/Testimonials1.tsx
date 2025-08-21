import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Skeleton from "react-loading-skeleton"; // REF (Skeleton Loading): https://www.npmjs.com/package/react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css";

{
  /* /////////////////////////////////////////////////////////////////////////////

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
  
///////////////////////////////////////////////////////////////////////////// */
}

type Testimonal = {
  testimonial_id: number;
  testimonial_rating: number;
  testimonial_descripton: string;
  client_name: string;
  testimonial_date: string;
};

export const Testimonials1 = () => {
  const [testimonals, setPackages] = useState<Testimonal[]>([]);
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
      <header className="w-full bg-gray-100 text-black">
        <h1 className="mb-6 p-4 text-center text-2xl font-bold md:text-4xl">
          Testimonials
        </h1>
        <div className="p-4 px-4 md:px-20">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded border p-4 transition duration-300 ease-in-out hover:bg-gray-100"
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
    <header className="w-full bg-gray-100 text-black">
      <div className="container mx-auto p-4">
        <h1 className="mb-10 text-center text-2xl font-bold md:text-4xl">
          Testimonials
        </h1>

        <div className="flex grid-cols-1 flex-col justify-between gap-6 md:grid md:grid-cols-3">
          {testimonals.map((test) => (
            <div
              key={test.testimonial_id}
              className="relative flex h-full flex-col border-t-4 bg-white p-8 shadow-md transition duration-300 ease-in-out hover:bg-gray-300"
            >
              <div className="mb-4 flex">
                {/* 
                From the array, length the rating to see how many stars to show
                .map will then state for the length of the rating create a star icon from lucid react
                REF: https://stackoverflow.com/questions/40528557/how-does-array-fromlength-5-v-i-i-work
                */}
                {Array.from({ length: Number(test.testimonial_rating) }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-500"
                      fill="currentColor"
                    />
                  ),
                )}
              </div>
              <div>
                <p className="mb-4">"{test.testimonial_descripton}"</p>
              </div>
              <h1 className="mt-auto font-bold">{test.client_name}</h1>
              <small>
                {new Date(test.testimonial_date).toLocaleDateString("en-GB")}
              </small>{" "}
              {/* Ref (Date Formatting): https://stackoverflow.com/questions/27939773/tolocaledatestring-short-format */}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
