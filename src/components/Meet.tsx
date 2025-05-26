import React from "react";
import { CheckIcon } from 'lucide-react';  

export const Meet = () => {
  return (
    <section className="bg-white text-black py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/4 space-y-8 relative">
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="Personal trainer working with client"
            className="w-full h-auto shadow-lg rounded-full"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-3/4 mt-10 md:mt-0 md:ml-8">
          <h1 className="text-3xl font-bold mb-4">
            Meet Your Personal Trainer:
            <span className="text-blue-600"> Connor Snow</span>
          </h1>
          <p className="mb-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            quis voluptas delectus inventore placeat qui non eum facilis
            voluptatem quo eveniet, quaerat sint perferendis dolores ipsum
            laborum id praesentium? Eligendi. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Natus, perspiciatis doloremque labore
            accusantium, aperiam fugiat inventore incidunt omnis officia facere
            eligendi cupiditate repudiandae explicabo soluta beatae. Ullam
            quaerat iusto vero.
          </p>

          {/* Ticks */}
          {/* grid with 4 sections */}
        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2"><CheckIcon className="text-green-500" /> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span></div>
            <div className="flex items-center gap-2"><CheckIcon className="text-green-500" /> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span></div>
            <div className="flex items-center gap-2"><CheckIcon className="text-green-500" /> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span></div>
            <div className="flex items-center gap-2"><CheckIcon className="text-green-500" /> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span></div>
        </div>
        </div>
      </div>
    </section>
  );
};
