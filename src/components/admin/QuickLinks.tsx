import { Zap } from "lucide-react";
import { Link } from "react-router-dom"; //Ref (Linking To): https://www.youtube.com/watch?v=DO-pSysGItQ&ab_channel=NetNinja

export const QuickLinks = () => {
  return (
    <section className="mt-10 p-4 text-white md:mt-0">
      <div className="mb-4 px-4 text-black">
        <div className="relative h-2 overflow-hidden rounded-t-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-sm" />

        <div className="hidden border-2 border-gray-800 bg-gray-800 px-4 py-4 md:flex">
          <p className="rounded-lg p-2 text-white">
            <Zap />
          </p>

          {/* Nav Buttons */}
          <div className="hidden w-full justify-between gap-2 text-white md:flex">
            <Link
              to="../admin/AdminClients"
              className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500"
            >
              <button className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500">
                View Clients
              </button>
            </Link>

            <Link
              to="../admin/AdminCommunications"
              className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500"
            >
              <button className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500">
                View Messages
              </button>
            </Link>

            <Link
              to="../admin/AdminPackages"
              className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500"
            >
              <button className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500">
                View Packages
              </button>
            </Link>

            <Link
              to="../admin/AdminPlans"
              className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500"
            >
              <button className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500">
                View Plans
              </button>
            </Link>

            <Link
              to="../admin/analytics"
              className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500"
            >
              <button className="transiton w-full rounded-lg bg-gray-600 p-2 duration-300 hover:bg-gray-500">
                View Analytics
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
