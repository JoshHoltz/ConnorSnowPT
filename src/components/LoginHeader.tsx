import React from "react";
import { Fade } from "react-awesome-reveal";

export const LoginHeader = () => {
  return (
    <section className="bg-black py-20 text-white">
      <div className="container mx-auto items-center justify-center px-4 md:flex-row">
        <Fade duration={600} direction="down">
          <h1 className="text-center text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Let's Start a Workout. Login!
          </h1>
        </Fade>

        <Fade duration={600} direction="up">
          <p className="mt-4 text-center">
            Let's start your journey together. Login using your details and
            start making the progress you've dreamed of. Have not got an
            account? Set up a FREE consultation meeting with Connor to discuss
            your training and packages for you!
          </p>
        </Fade>
      </div>
    </section>
  );
};
