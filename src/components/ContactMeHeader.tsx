import React from "react";
import { Fade } from "react-awesome-reveal";

export const ContactMeHeader = () => {
  return (
    <section className="bg-black py-20 text-white">
      <div className="container mx-auto items-center justify-center px-4 md:flex-row">
        <Fade duration={600} direction="down">
          <h1 className="text-center text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Wanting to Contact Me?
          </h1>
        </Fade>

        <Fade duration={600} direction="up">
          <p className="mt-4 text-center">
            Unsure of what to expect, or in seek or more information? Find my
            Frequently Asked Questions below, or feel free to use the contact
            form to contact me directly with any specific inquiry. Let's make a
            start to your journey!
          </p>
        </Fade>
      </div>
    </section>
  );
};
