import React, { useState } from 'react';
import { insertDataToDB } from './insertDataToDB';

export const LoginForm = () => {
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, result } = await insertDataToDB('http://localhost:4000/add-user', e.target);

    setMsg(ok ? `✅ User added with ID: ${result.userId}` : `❌ ${result.error}`);
    if (ok) e.target.reset();
  };

  return (
    <section className="text-black py-20 md:mt-20 bg-gray-100 h-screen">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-6 font-bold">Add New User</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <label className="block mb-4">
            First Name:
            <input
              type="text"
              name="user_firstname"
              required
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <label className="block mb-4">
            Last Name:
            <input
              type="text"
              name="user_lastname"
              required
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              name="user_password"
              required
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-center">{msg}</p>
      </div>
    </section>
  );
};
