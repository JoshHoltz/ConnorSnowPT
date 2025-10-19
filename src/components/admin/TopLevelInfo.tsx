import { UserRound, Globe, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const TopLevelInfo = () => {
  const [clientCount, setClientCount] = useState(0);

    useEffect(() => {
      fetch("https://connorsnowpt.onrender.com/api/client-count")
        .then((res) => res.json())
        .then((data) => setClientCount(data.count));
    }, []);

  return (
    <section className="mt-10 p-4 md:mt-0">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:flex-row">
        {/* 3 Top Level Info Bar */}

        <div className="flex w-full flex-col md:flex-row">
          <div className="w-full rounded-xl bg-white border border-slate-100 shadow-lg overflow-hidden md:w-full">
            <div className="relative h-2 overflow-hidden rounded-b-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />

            <div className="p-6">
              <div className="flex items-start">
                <div className="rounded-lg bg-slate-800 p-3">
                  <UserRound className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-slate-600">Total Clients:</h2>
                  <p className="text-3xl font-bold text-slate-900">{clientCount}</p>
                </div>
              </div>
            </div>
            {/* <Link to="../admin/AdminClients">
              <button className="w-full cursor-pointer bg-gray-700 p-4 text-center font-medium text-white duration-300 hover:bg-gray-800 transition">
                View Total Clients
              </button>
            </Link> */}
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          <div className="w-full rounded-xl bg-white border border-slate-100 shadow-lg overflow-hidden md:w-full">
            <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
            <div className="p-6">
              <div className="flex items-start">
                <div className="rounded-lg bg-slate-800 p-3">
                  <Globe className="text-white" size={24} />
                </div>

                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-slate-600">Web Clients:</h2>
                  <p className="text-3xl font-bold text-slate-900">102</p>
                </div>
              </div>
            </div>
            {/* <Link to="../admin/AdminClients">
              <button className="w-full cursor-pointer bg-gray-700 p-4 text-center font-medium text-white duration-300 hover:bg-gray-800 transition">
                View Total Clients
              </button>
            </Link> */}
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          <div className="w-full rounded-xl bg-white border border-slate-100 shadow-lg overflow-hidden md:w-full">
            <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />
            <div className="p-6">
              <div className="flex items-start">
                <div className="rounded-lg bg-slate-800 p-3">
                  <Send className="text-white" size={24} />
                </div>

                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-slate-600">View Messages:</h2>
                  <p className="text-3xl font-bold text-slate-900">4</p>
                </div>
              </div>
            </div>
            {/* <Link to="../admin/AdminMessages">
              <button className="w-full cursor-pointer bg-gray-700 p-4 text-center font-medium text-white duration-300 hover:bg-gray-800 transition">
                View Messages
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};