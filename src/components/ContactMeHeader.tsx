import React from 'react'
import { Fade } from 'react-awesome-reveal';

export const ContactMeHeader = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4 md:flex-row items-center justify-center">

      <Fade duration={600} direction="down">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center">Wanting to Contact Me?</h1>
      </Fade>

      <Fade duration={600} direction="up">
        <p className='mt-4 text-center'>Unsure of what to expect, or in seek or more information? Find my Frequently Asked Questions below, or feel free to use the contact form to contact me directly with any specific inquiry. Let's make a start to your journey!</p>
      </Fade>
      </div>
    </section>
  );
};
