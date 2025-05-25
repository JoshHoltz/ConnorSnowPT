import React from "react";
import { ArrowRightIcon } from "lucide-react";
export const CTA = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full space-y-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Wanting to get started? Join Me Now!
          </h1>
          <p className="flex flex-col md:flex-row">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            accusantium sunt.
          </p>
        </div>

        <div className="w-full mt-10 md:mt-0">
          <div className="relative flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 font-bold flex items-center gap-2">
              Start Your Journey
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
