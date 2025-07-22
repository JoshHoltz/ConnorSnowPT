import React from 'react';
import { Link } from 'react-router-dom';

export const Forbidden = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-red-600">403</h1>
      <p className="text-lg mt-4">You don't have permission to access this page.</p>
      <Link to="/login" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Go to Login
      </Link>
    </section>
  );
};
