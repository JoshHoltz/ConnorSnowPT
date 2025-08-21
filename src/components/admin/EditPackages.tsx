import React, { useEffect, useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";

export const AdminMembershipTiers = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("https://connorsnowpt.onrender.com/api/membership-packages")
      .then((res) => (res.ok ? res.json() : Promise.reject("Fetch failed")))
      .then(setPackages);
  }, []);

  return (
    <section className="h-100vh py-5">
      <div className="container mx-auto px-6 py-10 md:py-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <form
              action="https://www.connorsnowpt.com/api/insert-package-change"
              method="POST"
              className="flex flex-col gap-4"
            >
              <div
                key={pkg.package_id}
                className="relative flex h-full flex-col border-t-4 bg-white p-8 shadow-lg transition duration-300 ease-in-out hover:bg-gray-200"
              >
                <input type="hidden" name="package_id" value={pkg.package_id} />

                <input
                  type="text"
                  name="package_name"
                  className="mb-4 border-2 p-2"
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
                  className="mb-4 border-2 p-2"
                  name="package_description"
                  defaultValue={pkg.package_description}
                />

                <div className="mb-8">
                  <h4 className="mb-4 text-lg font-bold">What's included:</h4>
                  <ul className="mb-4 list-inside list-disc">
                    {pkg.package_features.split(",").map((feature, i) => (
                      <li key={i} className="mb-2 flex items-center">
                        <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                        <input
                          type="text"
                          name="package_features[]"
                          className="flex-1 border p-1"
                          defaultValue={feature.trim()}
                        />
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
                            <input
                              type="text"
                              name="package_excludes[]"
                              className="flex-1 border p-1"
                              defaultValue={exclude.trim()}
                            />
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <button className="w-full bg-black py-4 font-medium text-white transition-colors hover:bg-gray-800">
                  Save
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </section>
  );
};
