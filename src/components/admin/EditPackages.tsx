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
    <section className="bg-white py-20 h-100vh">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {packages.map(pkg => (
            <div
              key={pkg.package_id}
              className="border-t-4 bg-white p-8 shadow-lg flex flex-col h-full relative hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              <textarea className="border-2 black">{pkg.package_name}</textarea>
              <div className="mb-6">
                <textarea className='border-2 black"'>{pkg.package_price}</textarea>
              </div>
              <textarea className="border-2 black">{pkg.package_description}</textarea>

              <div className="mb-8">
                <h4 className="font-bold mb-4 text-lg">What's included:</h4>
                <ul className="list-disc list-inside mb-4">
                  {pkg.package_features.split(',').map((feature, i) => (
                    <li key={i} className="flex items-center mb-2">
                      <CheckIcon className="text-green-500 w-5 h-5 mr-2" />
                      {feature.trim()}
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
                          {exclude.trim()}
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
          ))}
        </div>
      </div>
    </section>
  );
};
