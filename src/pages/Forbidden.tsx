import React from "react";
import { Link } from "react-router-dom";

export const Forbidden = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center space-x-4">
          <h1 className="text-9xl font-bold transition duration-300 ease-in-out hover:text-red-600">
            4
          </h1>
          <img
            src="/images/403.png"
            alt="403"
            className="w-20 hover:animate-spin"
          />
          <h1 className="text-9xl font-bold transition duration-300 ease-in-out hover:text-red-600">
            3
          </h1>
        </div>

        <h1 className="mb-10 text-4xl transition duration-300 ease-in-out hover:text-red-600">
          [Unauthorized Access]
        </h1>

        <div className="text-lg">
          <p>
            Click{" "}
            <a className="font-bold text-blue-600 hover:underline" href="/">
              here
            </a>{" "}
            to go back to the home page.
          </p>
        </div>
        <p className="mt-4 text-lg">
          You don't have permission to access this page.
        </p>
        <Link
          to="/login"
          className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </section>
  );
};
