import React from "react";
import { Heart } from 'lucide-react';
import { User } from 'lucide-react';
import { Trophy } from 'lucide-react';

export const Approach = () => {
  return (
    <section className="bg-gray-100 text-black py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-10">
          My Training Approach
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="border-t-4 bg-white p-8 flex flex-col h-full relative shadow-md hover:bg-gray-300 transition duration-300 ease-in-out">
            <div className="flex items-center gap-2"><Heart className="text-red-500" /> <span className="text-xl font-bold">Compassion</span></div>
            <p className="mb-4 mt-4">My custom training programs are carefully crafted for each client on an individual basis, accoutning for, potential mobility or health restrictions while still allowing you to achive your goals.</p>
          </div>

          <div className="border-t-4 bg-white p-8 flex flex-col h-full relative shadow-md hover:bg-gray-300 transition duration-300 ease-in-out">
            <div className="flex items-center gap-2"><User className="text-red-500" /> <span className="text-xl font-bold">Accountabilty</span></div>
            <p className="mb-4 mt-4">With constant daily and direct communication with me, my training programs also offer accountability to ensure that my clients get the best motivation possible to keep on track and achive their goals.</p>
          </div>

          <div className="border-t-4 bg-white p-8 flex flex-col h-full relative shadow-md hover:bg-gray-300 transition duration-300 ease-in-out">
            <div className="flex items-center gap-2"><Trophy className="text-red-500" /> <span className="text-xl font-bold">Reward</span></div>
            <p className="mb-4 mt-4">Clients following my plans have seen a positive change within less than 60 days of traning and following my tailored made plan for them. This gives my clients a sense of reward and success motivating them further.</p>
          </div>

        </div>
      </div>
    </section>
  );
};
