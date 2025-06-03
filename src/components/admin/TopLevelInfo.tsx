import { UserRound, Globe, Send } from 'lucide-react';

export const TopLevelInfo = () => {
  return (
    <section className=" text-white p-4 mt-10 md:mt-0">
      <div className="mb-4 px-4 text-black">
        <h1 className="hidden md:flex text-2xl font-bold text-black">Dashboard</h1>
        <p className="hidden md:flex text-black">
          Welcome Back! Take a look at your client overview:
        </p>
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4">
        {/* 3 Top Level Info Bar */}
        <div className="flex flex-col md:flex-row w-full">
          <div className="bg-gray-800 w-full md:w-full">
            <div className="p-4">
              <div className="flex items-start">
                <p className="border-2 border-white rounded-lg p-4">
                  <UserRound />
                </p>

                <div className="ml-4">
                  <h2 className="text-xl font-bold">Total Clients:</h2>
                  <p className="text-2xl">150</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-600">
              <p className="w-full bg-gray-600 mt-4 p-4 cursor-pointer hover:bg-gray-500 transiton duration-300">
                View Total Clients
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="bg-gray-800 w-full md:w-full">
            <div className="p-4">
              <div className="flex items-start">
                <p className="border-2 border-white rounded-lg p-4">
                  <Globe />
                </p>

                <div className="ml-4">
                  <h2 className="text-xl font-bold">Web Clients:</h2>
                  <p className="text-2xl">102</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-600">
              <p className="w-full bg-gray-600 mt-4 p-4 cursor-pointer hover:bg-gray-500 transiton duration-300">
                View Total Clients
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="bg-gray-800 w-full md:w-full">
            <div className="p-4">
              <div className="flex items-start">
                <p className="border-2 border-white rounded-lg p-4">
                  <Send />
                </p>

                <div className="ml-4">
                  <h2 className="text-xl font-bold">View Messages:</h2>
                  <p className="text-2xl">4</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-600">
              <p className="w-full bg-gray-600 mt-4 p-4 cursor-pointer hover:bg-gray-500 transiton duration-300">
                View Client Messages
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};
