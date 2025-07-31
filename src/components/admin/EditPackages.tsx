import React, { useEffect, useState } from 'react';
import { CheckIcon, XIcon } from 'lucide-react';  

export const AdminMembershipTiers = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch('https://connorsnowpt.onrender.com/api/membership-packages') 
      .then(res => res.ok ? res.json() : Promise.reject('Fetch failed'))
      .then(setPackages)
  }, []);

  return (
    <section className="bg-white py-5 h-100vh">
      <div className="container mx-auto px-6 py-10 md:py-2">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {packages.map(pkg => (
                        <form
            action="https://www.connorsnowpt.com/api/insert-package-change"
            method="POST"
            className="flex flex-col gap-4"
            >
            <div
              key={pkg.package_id}
              className="border-t-4 bg-white p-8 shadow-lg flex flex-col h-full relative hover:bg-gray-200 transition duration-300 ease-in-out"
            >

              <input type="hidden" name="package_id" value={pkg.package_id} />

              <input
                type="text"
                name="package_name"
                className="border-2 p-2 mb-4"
                defaultValue={pkg.package_name}
              />

              <div className="mb-6">
                <input
                  type="text"
                  name="package_price"
                  className="border-2 p-2"
                  defaultValue={pkg.package_price}
                />
              </div>
              <textarea
                className="border-2 p-2 mb-4"
                name="package_description"
                defaultValue={pkg.package_description}
              />

              <div className="mb-8">
                <h4 className="font-bold mb-4 text-lg">What's included:</h4>
                                  <ul className="list-disc list-inside mb-4">
                    {pkg.package_features.split(',').map((feature, i) => (
                      <li key={i} className="flex items-center mb-2">
                        <CheckIcon className="text-green-500 w-5 h-5 mr-2" />
                        <input
                          type="text"
                          name="package_features[]"
                          className="border p-1 flex-1"
                          defaultValue={feature.trim()}
                        />
                      </li>
                    ))}
                  </ul>
                  {pkg.package_excludes && (
                    <>
                      <h4 className="font-bold mt-4 mb-2 text-lg">Excludes:</h4>
                      <ul className="list-disc list-inside">
                        {pkg.package_excludes.split(',').map((exclude, i) => (
                          <li key={i} className="flex items-center mb-2">
                            <XIcon className="text-red-500 w-5 h-5 mr-2" />
                            <input
                              type="text"
                              name="package_excludes[]"
                              className="border p-1 flex-1"
                              defaultValue={exclude.trim()}
                            />
                          </li>
                        ))}
                      </ul>
                  </>
                )}
              </div>

              <button className="w-full py-4 font-medium bg-black text-white hover:bg-gray-800 transition-colors">
                Save
              </button>
            </div>
          </form>
          ))}
          </div>
      </div>
    </section>
  );
}