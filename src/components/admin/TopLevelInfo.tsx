import { UserRound, Globe, Send } from "lucide-react";
import { Link } from "react-router-dom";

export const TopLevelInfo = () => {
  return (
    <section className="mt-10 p-4 text-white md:mt-0">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:flex-row">
        {/* 3 Top Level Info Bar */}

        <div className="flex w-full flex-col md:flex-row">
          <div className="w-full rounded-t-lg bg-gray-800 md:w-full">
            <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />

            <div className="p-4">
              <div className="flex items-start">
                <p className="rounded-lg border-2 border-white p-4">
                  <UserRound />
                </p>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">Total Clients:</h2>
                  <p className="text-2xl">150</p>
                </div>
              </div>
            </div>
            <Link to="../admin/AdminClients">
              <button className="transiton mt-4 w-full cursor-pointer bg-gray-600 p-4 text-left duration-300 hover:bg-gray-500">
                View Total Clients
              </button>
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          <div className="w-full rounded-t-lg bg-gray-800 md:w-full">
            <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
            <div className="p-4">
              <div className="flex items-start">
                <p className="rounded-lg border-2 border-white p-4">
                  <Globe />
                </p>

                <div className="ml-4">
                  <h2 className="text-xl font-bold">Web Clients:</h2>
                  <p className="text-2xl">102</p>
                </div>
              </div>
            </div>
            <Link to="../admin/AdminClients">
              <button className="transiton mt-4 w-full cursor-pointer bg-gray-600 p-4 text-left duration-300 hover:bg-gray-500">
                View Total Clients
              </button>
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          <div className="w-full rounded-t-lg bg-gray-800 md:w-full">
            <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
            <div className="p-4">
              <div className="flex items-start">
                <p className="rounded-lg border-2 border-white p-4">
                  <Send />
                </p>

                <div className="ml-4">
                  <h2 className="text-xl font-bold">View Messages:</h2>
                  <p className="text-2xl">4</p>
                </div>
              </div>
            </div>
            <Link to="../admin/AdminMessages">
              <button className="transiton mt-4 w-full cursor-pointer bg-gray-600 p-4 text-left duration-300 hover:bg-gray-500">
                View Messages
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
