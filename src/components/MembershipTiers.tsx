// import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';

export const MembershipTiers = () => {
  return <section className="bg-white py-20 h-100vh">
      <div className="container mx-auto p-6">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold mb-4">View Membership Packages</h2>
          <p className="text-lg">
            Choose the perfect plan to achieve your fitness goals with our
            expert trainers and state-of-the-art facilities.
          </p>
        </div>

        {/* TIER LEVELS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* GRID LAYOUT: 3 Cols for desktop, 1 for mobile */}
          <div className="border-t-4 bg-white p-8 shadow-lg flex flex-col h-full relative"> {/* LAYOUT: For each teir level, it has a class of this */}
            
            {/* FOR EACH TIER LEVEL */}
              <h3 className="text-2xl font-bold mb-2">Tier Name</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">£Price</span>
              </div>
              

              <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quam magni velit, facilis possimus quas quidem, animi, reiciendis esse aliquam nisi reprehenderit?</p>

              <div className="mb-8">
                <h4 className="font-bold mb-4 text-lg">What's included:</h4>
                <ul className="list-disc list-inside mb-4">
                  <CheckIcon className="text-green-500 w-5 h-5 mr-2 mb-4" />
                  <CheckIcon className="text-green-500 w-5 h-5 mr-2 mb-4" />
                  <CheckIcon className="text-green-500 w-5 h-5 mr-2 mb-4" />
                  <CheckIcon className="text-green-500 w-5 h-5 mr-2 mb-4" />
                  <CheckIcon className="text-green-500 w-5 h-5 mr-2 mb-4" />
                  <CheckIcon className="text-green-500 w-5 h-5 mr-2 mb-4" />
                  <XIcon className="text-red-500 w-5 h-5 mr-2 mb-4" />
                  <XIcon className="text-red-500 w-5 h-5 mr-2 mb-4" />
                  <XIcon className="text-red-500 w-5 h-5 mr-2 mb-4" />

                </ul>
              </div>

              <button className={`w-full py-4 font-medium bg-black text-white hover:bg-gray-800 transition-colors')`}>
                Select Plan
              </button>
            </div>
        </div>
      </div>
    </section>;
};