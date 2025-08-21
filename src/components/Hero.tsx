import { ArrowRightIcon } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import party from "party-js"; //REF (Party.js): https://party.js.org/docs
import React from "react";

const partyHover = (e: React.MouseEvent) => {
  party.confetti(e.currentTarget! as HTMLSpanElement, {
    count: party.variation.range(10, 20),
    size: party.variation.range(0.5, 1),
  });
};

export const Hero = () => {
  return (
    <section className="bg-black py-20 text-white md:mt-20">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 md:flex-row">
        {/* Text Section */}
        <div className="position-relative w-full space-y-8 md:w-1/2">
          <Fade duration={600} direction="down">
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              A WORKOUT PLAN, TAILORED TO{" "}
              <span className="text-blue-600">YOU</span>
            </h1>
            <p className="pr-2">
              Ready to take your fitness to the next level? Whether you're
              looking to build strength and endurence, lose weight, or simply
              enhance your overall well-being, my personalised traning programs
              and packages are designed to help you succeed.
            </p>
          </Fade>

          {/* REF: https://devdojo.com/tailwindcss/buttons#_ */}
          <Fade duration={600} direction="up">
            <div className="flex gap-4">
              <a
                href="/packages"
                className="homepage-cta group relative flex cursor-pointer flex-row overflow-hidden border border-blue-600 px-6 py-3 font-medium text-blue-600"
              >
                <span className="ease absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45 bg-blue-600 transition-all duration-300 group-hover:h-64 group-hover:-translate-y-32"></span>
                <span
                  onMouseEnter={partyHover}
                  className="ease relative flex flex-row text-blue-600 transition duration-300 group-hover:text-white"
                >
                  Start Your Journey
                  <ArrowRightIcon />
                </span>
              </a>

              <a href="/plans">
                <button className="border border-blue-600 bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-transparent hover:text-blue-600">
                  View Plans
                </button>
              </a>
            </div>
          </Fade>
        </div>

        <div className="mt-10 w-full md:mt-0 md:w-1/2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Personal trainer working with client"
              className="h-auto w-full border-4 border-blue-600 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
