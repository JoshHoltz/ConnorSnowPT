import React from "react";
import { Fade } from "react-awesome-reveal";

export const PackagesHeader = () => {
  return (
    <section className="bg-black py-20 text-white">
      <div className="container mx-auto items-center justify-center px-4 md:flex-row">
        <Fade duration={600} direction="down">
          <h1 className="text-center text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            View Membership Packages
          </h1>
        </Fade>

        <Fade duration={600} direction="up">
          <p className="mt-4 text-center">
            Explore my training packages below and find the perfect package to
            fit your goals, lifestyle and budget. Each training program comes
            with direct contact with me. Let's get started on your journey to a
            stronger healthier you!
          </p>
        </Fade>
      </div>
    </section>
  );
};
