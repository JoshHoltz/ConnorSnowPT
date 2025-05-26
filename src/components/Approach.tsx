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
            <div className="flex items-center gap-2"><Heart className="text-red-500" /> <span className="text-xl font-bold">Lorem</span></div>
            <p className="mb-4 mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia optio nobis dolor ex fugit perspiciatis iusto accusantium, quod sed eveniet! Autem, eius eum corrupti aspernatur nam quod rerum natus. Qui.</p>
          </div>

          <div className="border-t-4 bg-white p-8 flex flex-col h-full relative shadow-md hover:bg-gray-300 transition duration-300 ease-in-out">
            <div className="flex items-center gap-2"><User className="text-red-500" /> <span className="text-xl font-bold">Lorem</span></div>
            <p className="mb-4 mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia optio nobis dolor ex fugit perspiciatis iusto accusantium, quod sed eveniet! Autem, eius eum corrupti aspernatur nam quod rerum natus. Qui.</p>
          </div>

          <div className="border-t-4 bg-white p-8 flex flex-col h-full relative shadow-md hover:bg-gray-300 transition duration-300 ease-in-out">
            <div className="flex items-center gap-2"><Trophy className="text-red-500" /> <span className="text-xl font-bold">Lorem</span></div>
            <p className="mb-4 mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia optio nobis dolor ex fugit perspiciatis iusto accusantium, quod sed eveniet! Autem, eius eum corrupti aspernatur nam quod rerum natus. Qui.</p>
          </div>

        </div>
      </div>
    </section>
  );
};
