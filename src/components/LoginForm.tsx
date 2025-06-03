import React from 'react';

const InsertUserForm = () => {
  return (
    <section className="text-black py-20 md:mt-20 bg-gray-100 h-screen">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <h1>Insert User</h1>
        <form action="https://connorsnowpt.onrender.com/api/insert-user" method="POST" className="mt-4">
          <input
            type="text"
            name="user_firstname"
            placeholder="Enter your name"
            className="text-black w-full p-2 mt-4 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            name="user_lastname"
            placeholder="Enter your last name"
            className="text-black w-full p-2 mt-4 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            name="user_password"
            placeholder="Enter your password"
            className="text-black w-full p-2 mt-4 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

