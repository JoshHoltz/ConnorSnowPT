import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export const FAQs = () => {
  return (
    <section className="bg-gray-200 text-black py-20 md:mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full bg-gray-600 rounded p-4">
          <h1 className="text-2xl text-white mb-4">
            Fequently Asked Questions
          </h1>

          <div id="toggle-faqs" className="bg-gray-400 p-2 mb-2">
            <h1 className="text-xl rounded-xl font-bold">Lorem Question 1?</h1>
            <p className="text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              voluptatem, nemo quasi esse impedit deserunt quod non dolorum
              nihil facilis ratione eligendi, eos ad corporis et! Ad illo alias
              libero. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Magni inventore, esse quos magnam in obcaecati ipsum optio
              incidunt, suscipit tempora minus nisi dolore eos unde perspiciatis
              amet possimus rem placeat?
            </p>
          </div>

          <div id="toggle-faqs" className="bg-gray-400 p-2 mb-2">
            <h1 className="text-xl rounded-xl font-bold">Lorem Question 2?</h1>
            <p className="text-black hidden">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              voluptatem, nemo quasi esse impedit deserunt quod non dolorum
              nihil facilis ratione eligendi, eos ad corporis et! Ad illo alias
              libero. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Magni inventore, esse quos magnam in obcaecati ipsum optio
              incidunt, suscipit tempora minus nisi dolore eos unde perspiciatis
              amet possimus rem placeat?
            </p>
          </div>

          <div id="toggle-faqs" className="bg-gray-400 p-2">
            <h1 className="text-xl rounded-xl font-bold">Lorem Question 3?</h1>
            <p className="text-black hidden">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              voluptatem, nemo quasi esse impedit deserunt quod non dolorum
              nihil facilis ratione eligendi, eos ad corporis et! Ad illo alias
              libero. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Magni inventore, esse quos magnam in obcaecati ipsum optio
              incidunt, suscipit tempora minus nisi dolore eos unde perspiciatis
              amet possimus rem placeat?
            </p>
          </div>


        </div>
      </div>
    </section>
  );
};
