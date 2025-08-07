import { ArrowRightIcon } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';

export const Hero = () => {
  return (
    <section className="bg-black text-white py-20 md:mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-8 position-relative ">
        <Fade duration={600} direction="down"> 
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            A WORKOUT PLAN, TAILORED TO <span className="text-blue-600">YOU</span>
          </h1>
          <p className='pr-2'>
            Ready to take your fitness to the next level? Whether you're looking to build strength and endurence, lose weight, or simply enhance your overall well-being, my personalised traning programs and packages are designed to help you succeed.
          </p>
          </Fade>

          {/* REF: https://devdojo.com/tailwindcss/buttons#_ */}
          <Fade duration={600} direction="up">
          <div className="flex gap-4">
<a href="/packages" className=" px-6 py-3 flex flex-row overflow-hidden relative group cursor-pointer border font-medium border-blue-600 text-blue-600 text-white">
    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-blue-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
    <span className="relative flex flex-row text-blue-600 transition duration-300 group-hover:text-white ease">Start Your Journey<ArrowRightIcon/></span>
</a>
            

            <a href="/plans">
            <button className="font-semibold border border-blue-600 text-white bg-blue-600 hover:bg-transparent hover:text-blue-600 transition px-6 py-3">
              View Plans
            </button>
            </a>
          </div>
          </Fade>
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
