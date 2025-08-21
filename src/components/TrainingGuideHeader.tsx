import { Fade } from "react-awesome-reveal";

export const TrainingGuideHeader = () => {
  return (
    <section className="bg-black py-20 text-white">
      <div className="container mx-auto items-center justify-center px-4 md:flex-row">
        <Fade duration={600} direction="down">
          <h1 className="text-center text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Training Guides & Programs
          </h1>
        </Fade>

        <Fade duration={600} direction="up">
          <p className="mt-4 text-center">
            Choose the perfect training guide and program to intergrate and fit
            in with your training split to maximise training results and
            progress. These training guides are downloadable, and come at no
            recurring cost or monthly rolling payment.
          </p>
        </Fade>
      </div>
    </section>
  );
};
