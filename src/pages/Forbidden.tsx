import React from "react";
import { Link } from "react-router-dom";

export const Forbidden = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <div className="flex flex-col justify-center items-center text-center h-screen">
        <div className="flex items-center justify-center space-x-4">
          <h1 className="text-9xl font-bold hover:text-red-600 transition duration-300 ease-in-out">
            4
          </h1>
          <img
            src="/images/403.png"
            alt="403"
            className="w-20 hover:animate-spin"
          />
          <h1 className="text-9xl font-bold hover:text-red-600 transition duration-300 ease-in-out">
            3
          </h1>
        </div>

        <h1 className="text-4xl mb-10 hover:text-red-600 transition duration-300 ease-in-out">
          [Unauthorized Access]
        </h1>

        <div className="text-lg">
          <p>
            Click{" "}
            <a className="text-blue-600 hover:underline font-bold" href="/">
              here
            </a>{" "}
            to go back to the home page.
          </p>
        </div>
        <p className="text-lg mt-4">
          You don't have permission to access this page.
        </p>
        <Link
          to="/login"
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </section>
  );
};
