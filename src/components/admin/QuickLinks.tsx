import { Zap } from "lucide-react";

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
          <button className="p-2 bg-gray-600 w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            <a href="/admin/insert-user">Manage Clients</a>
          </button>

          <button className="p-2 bg-gray-600  w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            <a href="/admin/insert-user">Communications</a>
          </button>

          <button className="p-2 bg-gray-600  w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            <a href="/admin/insert-user">View Packages</a>
          </button>

          <button className="p-2 bg-gray-600  w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            <a href="/admin/insert-user">View Plans</a>
          </button>

          <button className="p-2 bg-gray-600  w-full rounded-lg hover:bg-gray-500 transiton duration-300">
            <a href="/admin/insert-user">Analytics</a>
          </button>
        </div>
          </div>

      </div>
    </section>
  );
};
