import { ArrowRightIcon } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="bg-black text-white py-20 md:mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-8 position-relative ">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            A WORKOUT PLAN, TAILORED TO <span className="text-blue-600 hover:underline transition duration-150 ">YOU</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sequi earum dolores saepe, numquam minus ea perspiciatis itaque ducimus est.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/packages"><button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 font-bold flex items-start gap-2">
              Start Your Journey
              <ArrowRightIcon className="w-5 h-5" />
            </button></a>

            <a href="/plans">
            <button className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition px-6 py-3 font-semibold">
              View Plans
            </button>
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Personal trainer working with client"
              className="w-full h-auto shadow-lg"
            />
            <div className="absolute inset-0 border-4 border-blue-600 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
