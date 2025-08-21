import { ArrowRightIcon } from "lucide-react";

export const CTA = () => {
  return (
    <section className="m-6 bg-black py-20 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 md:flex-row">
        <div className="w-full space-y-8">
          <h1 className="mb-2 text-center text-2xl font-bold md:text-left md:text-3xl">
            Wanting to get started? Join Me Now!
          </h1>
          <p className="text-center md:text-left">
            Explore my training packages and find the perfect plan for your
            fitness journey.
          </p>
        </div>

        <div className="mt-10 w-full md:mt-0">
          <div className="relative flex justify-center md:justify-end">
            <a href="/packages">
              <button className="flex items-start gap-2 bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-700">
                Start Your Journey
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
