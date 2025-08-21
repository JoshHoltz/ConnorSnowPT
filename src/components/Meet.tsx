import { CheckIcon } from "lucide-react";

export const Meet = () => {
  return (
    <section className="bg-white py-20 text-black">
      <div className="container mx-auto flex flex-col px-4 md:flex-row">
        {/* Image Section */}
        <div className="relative w-full space-y-8 md:w-1/4">
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="Personal trainer working with client"
            className="h-auto w-full rounded-full shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="mt-10 w-full md:ml-8 md:mt-0 md:w-3/4">
          <h1 className="mb-4 text-3xl font-bold">
            Meet Your Personal Trainer:
            <span className="text-blue-600"> Connor Snow</span>
          </h1>
          <p className="mb-6">
            Hey! I'm Connor Snow, a passionate personal trainer dedicated to
            helping you achive your desired fitness goals, whether it be
            strength and conditioning, weight loss, to mobility and improving
            your overall well-being, I am here happy to support you in your
            journey. With a solid background in fitness and a commitment to
            personalised training, I strive to create a positive and motivating
            environment for all my clients. My approach is tailored to your
            unique needs, ensuring that you receive the guidance and support
            necessary to reach your full potential.
          </p>

          {/* Ticks */}
          {/* grid with 4 sections */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-green-500" />{" "}
              <span>Track progress and adjust routines for improvement.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="text-green-500" />{" "}
              <span>
                Personalised programs for all fitness goals and achievements.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="text-green-500" />{" "}
              <span>
                Expert advice on nutrition and recovery to support well-being.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="text-green-500" />{" "}
              <span>
                Strong client relations through motivation and accountability.
              </span>
            </div>
          </div>

          {/* Video Connor Section */}
          <div className="mt-10 h-96">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/NpEaa2P7qZI?si=K8NMT9UxAUejFV22"
              title="Placeholder Connor Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
