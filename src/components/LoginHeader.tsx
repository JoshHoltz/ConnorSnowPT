import React from 'react'
import { Fade } from 'react-awesome-reveal';

export const LoginHeader = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4 md:flex-row items-center justify-center">
        <Fade duration={600} direction="down">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center">Let's Start a Workout. Login!</h1>
        </Fade>

        <Fade duration={600} direction="up">
          <p className='mt-4 text-center'>Let's start your journey together. Login using your details and start making the progress you've dreamed of. Have not got an account? Set up a FREE consultation meeting with Connor to discuss your training and packages for you!</p>
        </Fade>
      </div>
    </section>
  );
};
