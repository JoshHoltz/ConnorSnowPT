import { Fade } from "react-awesome-reveal";

export const CTA2 = () => {
  return (
    <section className="bg-black py-20 text-white md:mt-20">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 md:flex-row">
        {/* Text Section */}
        <div className="position-relative w-full space-y-8 md:w-3/4">
          <Fade duration={600} direction="down">
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Transform Your Life With{" "}
              <span className="text-blue-600">Expert</span> Personal Training
            </h1>
            <p>
              Get ready to transform your life with personalised expoert
              training designed to help you achive your fitness goals. Start
              your journey today!
            </p>
          </Fade>

          <div className="flex flex-wrap gap-4">
            <Fade duration={600} direction="up">
              <a href="/plans">
                <button className="flex items-start gap-2 bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-700">
                  Plans
                </button>
              </a>

              <a href="/packages">
                <button className="border border-blue-600 bg-transparent px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">
                  Packages
                </button>
              </a>
            </Fade>
          </div>
        </div>

        <div className="mt-10 w-full md:mt-0 md:w-1/4">
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
