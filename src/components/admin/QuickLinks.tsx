import { Zap } from "lucide-react";
import { Link } from "react-router-dom"; //Ref (Linking To): https://www.youtube.com/watch?v=DO-pSysGItQ&ab_channel=NetNinja

export const QuickLinks = () => {
  return (
    <section className=" text-white p-4 mt-10 md:mt-0">
      <div className="mb-4 px-4 text-black">
        <div className="hidden border-2 px-4 py-4 border-gray-800 md:flex bg-gray-800">
          <p className="p-2 rounded-lg text-white">
            <Zap />
          </p>

          {/* Nav Buttons */}
<div className="hidden md:flex justify-between gap-2 w-full text-white">

        <Link to="../admin/AdminClients" className="p-2 bg-gray-600  w-full rounded-lg hover:bg-gray-500 transiton duration-300">
          <button className="p-2 bg-gray-600 w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            View Clients
          </button>
        </Link>

        <Link to="../admin/AdminCommunications" className="p-2 bg-gray-600  w-full rounded-lg hover:bg-gray-500 transiton duration-300">
          <button className="p-2 bg-gray-600 w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            View Messages
          </button>
        </Link>

        <Link to="../admin/AdminPackages" className="p-2 bg-gray-600  w-full rounded-lg hover:bg-gray-500 transiton duration-300">
          <button className="p-2 bg-gray-600 w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            View Packages
          </button>
        </Link>

        <Link to="../admin/AdminPlans" className="p-2 bg-gray-600  w-full rounded-lg hover:bg-gray-500 transiton duration-300">
          <button className="p-2 bg-gray-600 w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            View Plans
          </button>
        </Link>

        <Link to="../admin/analytics" className="p-2 bg-gray-600  w-full rounded-lg hover:bg-gray-500 transiton duration-300">
          <button className="p-2 bg-gray-600 w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            View Analytics
          </button>
        </Link>

        </div>
          </div>

      </div>
    </section>
  );
};
