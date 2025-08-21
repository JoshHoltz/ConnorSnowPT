import { useEffect, useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import Skeleton from "react-loading-skeleton"; // REF (Skeleton Loading): https://www.npmjs.com/package/react-loading-skeleton

/* //////////////////////////////////////////////////////////////////////////////

* Using Consts
    1. packages and setPackages, used to fetch the membership packages data from the API
    2. loading and setLoading, used to show the skeleton effect while the data is being fetched

* Using useEffect
    1. useEffect changes state once the API call has been fetched
    2. Once the data has been fetched the:
        - setPackages is called and the packages is passed into the state as an array
        - setLoading is set to false to stop the skeleton effect (Boolean then set to false)

* Map
    1. {packages.map(pkg => ( ... ))} is used to loop through each fetched package
    2. Each package is then displayed according to the defined layout. 
    Note: package is set to pkg so it is handled in the jsx
  
////////////////////////////////////////////////////////////////////////////// */

type Package = {
  package_id: number;
  package_name: string;
  package_price: number;
  package_description: string;
  package_features: string;
  package_excludes?: string;
};

export const MembershipTiers = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/membership-packages")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then((data) => {
        setPackages(data);
        setLoading(false); // once data is fetched, set loading to false to stop the skeleton effect
      });
  }, []);

  if (loading) {
    //If it is loading, show this skeleton effect
    return (
      <div className="p-4 px-4 md:px-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(3)].map(
            (
              _,
              i, // ARRRAY: length of 6 elements, which maps to the skeleton cards, so for each length index create a skeleeton card
            ) => (
              <div
                key={i}
                className="rounded border p-4 transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <Skeleton width="40%" />
                <Skeleton height={100} />
                <div className="mb-4"></div>
                <Skeleton width="100%" height={50} />
                <div className="mb-2"></div>
                <div>
                  {[...Array(10)].map((_, i) => (
                    <Skeleton key={i} width="60%" />
                  ))}
                </div>
                <Skeleton width="40%" />
                <div className="mb-8"></div>
                <Skeleton width="100%" height={30} />
              </div>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="h-100vh bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="relative flex h-full flex-col border-t-4 bg-white p-8 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-200"
            >
              <h3 className="mb-2 text-2xl font-bold">{pkg.package_name}</h3>
              <div className="mb-6 flex flex-wrap items-baseline gap-x-1 leading-none">
                <span className="text-5xl font-bold">£{pkg.package_price}</span>
                <span className="text-2xl text-gray-500">p/m</span>
              </div>
              <p className="mb-6 text-gray-600">{pkg.package_description}</p>

              <div className="mb-8">
                <h4 className="mb-4 text-lg font-bold">What's included:</h4>
                <ul className="mb-4 list-inside list-disc">
                  {pkg.package_features.split(",").map((feature, i) => (
                    <li key={i} className="mb-2 flex items-center">
                      <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
                {pkg.package_excludes && (
                  <>
                    <h4 className="mb-2 mt-4 text-lg font-bold">Excludes:</h4>
                    <ul className="list-inside list-disc">
                      {pkg.package_excludes.split(",").map((exclude, i) => (
                        <li key={i} className="mb-2 flex items-center">
                          <XIcon className="mr-2 h-5 w-5 text-red-500" />
                          {exclude.trim()}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-end">
                <button className="w-full bg-black py-4 font-medium text-white transition-colors hover:bg-gray-800">
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
