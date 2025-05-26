import React from "react";
import { ArrowRightIcon } from "lucide-react";

export const Approach = () => {
  return (
    <section className="bg-gray-100 text-black py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-10">
          My Training Approach
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="border-t-4 bg-white p-8 flex flex-col h-full relative shadow-md hover:bg-gray-300 transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold mb-2">"Amazing results!"</h3>
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia optio nobis dolor ex fugit perspiciatis iusto accusantium, quod sed eveniet! Autem, eius eum corrupti aspernatur nam quod rerum natus. Qui.</p>
          </div>

          <div className="border-t-4 bg-white p-8 flex flex-col h-full relative shadow-md hover:bg-gray-300 transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold mb-2">"Supportive & effective"</h3>
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis harum error corrupti sint porro illo aliquam natus beatae at tenetur, odit ut, reiciendis laboriosam hic sunt ex asperiores dignissimos consequatur!</p>
          </div>

          <div className="border-t-4 bg-white p-8 flex flex-col h-full relative shadow-md hover:bg-gray-300 transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold mb-2">"Professional & motivating"</h3>
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt architecto voluptate, nulla nisi provident autem qui soluta a unde doloribus corporis pariatur, repellendus nihil laborum minima magni animi adipisci praesentium!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
