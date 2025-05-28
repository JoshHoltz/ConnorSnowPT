import React from "react";
import { Instagram, Mail, Ghost } from "lucide-react";

export const ContactMe = () => {
  return (
    <section className="text-black py-20">
      <div className="container mx-auto px-4 flex flex-col w-full md:flex-row">
        {/* Socials */}
        <div className="bg-gray-300 p-4 rounded-xl w-full mb-4 md:w-1/4 md:flex md:flex-col">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

          <div className="flex items-center">
            <Mail />
            <span className="text-lg ml-2 font-bold">Email:</span>
          </div>
          <p className="ml-8">contact@cspt.com</p>

          <div className="flex items-center mt-6">
            <Instagram />
            <span className="text-lg ml-2 font-bold">Instagram</span>
          </div>
          <p className="ml-8">@ConnorSnowPT</p>

          <div className="flex items-center mt-6">
            <Ghost />
            <span className="text-lg ml-2 font-bold">Snapchat:</span>
          </div>
          <p className="ml-8">@ConnorSnowPT</p>
        </div>

        {/* Send Me a Message */}
        <div className="w-full md:w-3/4 md:ml-4 bg-gray-300 p-4 rounded-xl ">
          <h1 className="text-2xl font-bold mb-4">Send Me a Message</h1>

          <form action="">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
              />
            </div>

            <input
              type="phone"
              placeholder="Enter Phone Number (Optional)"
              className="w-full border mt-4 border-gray-300 rounded p-2"
            />

            <textarea
              placeholder="Your Message"
              className="w-full mt-4 p-2 border border-gray-300 rounded h-32"
            ></textarea>

            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
