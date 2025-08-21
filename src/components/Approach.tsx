import { Heart } from "lucide-react";
import { User } from "lucide-react";
import { Trophy } from "lucide-react";

export const Approach = () => {
  return (
    <section className="bg-gray-100 py-20 text-black">
      <div className="container mx-auto px-4">
        <h1 className="mb-10 text-center text-2xl font-bold md:text-4xl">
          My Training Approach
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="relative flex h-full flex-col border-t-4 bg-white p-8 shadow-md transition duration-300 ease-in-out hover:bg-gray-300">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" />{" "}
              <span className="text-xl font-bold">Compassion</span>
            </div>
            <p className="mb-4 mt-4">
              My custom training programs are carefully crafted for each client
              on an individual basis, accoutning for, potential mobility or
              health restrictions while still allowing you to achive your goals.
            </p>
          </div>

          <div className="relative flex h-full flex-col border-t-4 bg-white p-8 shadow-md transition duration-300 ease-in-out hover:bg-gray-300">
            <div className="flex items-center gap-2">
              <User className="text-red-500" />{" "}
              <span className="text-xl font-bold">Accountabilty</span>
            </div>
            <p className="mb-4 mt-4">
              With constant daily and direct communication with me, my training
              programs also offer accountability to ensure that my clients get
              the best motivation possible to keep on track and achive their
              goals.
            </p>
          </div>

          <div className="relative flex h-full flex-col border-t-4 bg-white p-8 shadow-md transition duration-300 ease-in-out hover:bg-gray-300">
            <div className="flex items-center gap-2">
              <Trophy className="text-red-500" />{" "}
              <span className="text-xl font-bold">Reward</span>
            </div>
            <p className="mb-4 mt-4">
              Clients following my plans have seen a positive change within less
              than 60 days of traning and following my tailored made plan for
              them. This gives my clients a sense of reward and success
              motivating them further.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
