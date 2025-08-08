import { UserRound, Globe, Send } from "lucide-react";
import { Link } from "react-router-dom";

export const TopLevelInfo = () => {
  return (
    <section className=" text-white p-4 mt-10 md:mt-0">
      <div className="px-4 container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
        {/* 3 Top Level Info Bar */}
        
        
        <div className="flex flex-col md:flex-row w-full">
          <div className="bg-gray-800 w-full md:w-full rounded-t-lg">
              <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-t-lg shadow-sm h-2 relative overflow-hidden text-white" />

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
            <Link to="../admin/AdminClients">
              <button className="text-left w-full bg-gray-600 mt-4 p-4 cursor-pointer hover:bg-gray-500 transiton duration-300">
                View Total Clients
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="bg-gray-800 w-full md:w-full rounded-t-lg">
                          <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-t-lg shadow-sm h-2 relative overflow-hidden text-white" />
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
            <Link to="../admin/AdminClients">
              <button className="text-left w-full bg-gray-600 mt-4 p-4 cursor-pointer hover:bg-gray-500 transiton duration-300">
                View Total Clients
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="bg-gray-800 w-full md:w-full rounded-t-lg">
              <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-t-lg shadow-sm h-2 relative overflow-hidden text-white" />
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
            <Link to="../admin/AdminMessages">
              <button className="text-left w-full bg-gray-600 mt-4 p-4 cursor-pointer hover:bg-gray-500 transiton duration-300">
                View Messages
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
