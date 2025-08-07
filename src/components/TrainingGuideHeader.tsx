import React from 'react'
import { Fade } from 'react-awesome-reveal';

export const TrainingGuideHeader = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4 md:flex-row items-center justify-center">

      <Fade duration={600} direction="down">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center">Training Guides & Programs</h1>
      </Fade>

      <Fade duration={600} direction="up">
        <p className='mt-4 text-center'>Choose the perfect training guide and program to intergrate and fit in with your training split to maximise training results and progress. These training guides are downloadable, and come at no recurring cost or monthly rolling payment.</p>
      </Fade>
      </div>
    </section>
  );
};
