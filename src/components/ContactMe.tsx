import React from "react";
import { Instagram, Mail, Ghost } from "lucide-react";

export const ContactMe = () => {
  return (
    <section className="py-20 text-black">
      <div className="container mx-auto w-full flex-col px-4 md:flex md:flex-row">
        {/* Socials */}
        <div className="mb-4 hidden w-full rounded-xl border-2 bg-white p-4 md:flex md:w-1/4 md:flex-col">
          <h2 className="mb-4 text-2xl font-bold">Contact Information</h2>

          <div className="flex items-center">
            <Mail />
            <span className="ml-2 text-lg font-bold">Email:</span>
          </div>
          <p className="ml-8">connor@connorsnowpt.com</p>

          <div className="mt-6 flex items-center">
            <Instagram />
            <span className="ml-2 text-lg font-bold">Instagram</span>
          </div>
          <p className="ml-8">@ConnorSnowPT</p>

          <div className="mt-6 flex items-center">
            <Ghost />
            <span className="ml-2 text-lg font-bold">Snapchat:</span>
          </div>
          <p className="ml-8">@ConnorSnowPT</p>
        </div>

        {/* Send Me a Message */}
        <div className="w-full rounded-xl border-2 bg-white p-4 md:ml-4 md:w-3/4">
          <h1 className="mb-4 text-2xl font-bold">Send Me a Message</h1>

          <form action="">
            <div className="flex flex-col md:flex-row">
              <input
                type="text"
                placeholder="Your Name"
                className="mr-2 w-full rounded border border-gray-300 p-2 md:w-1/2"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded border border-gray-300 p-2 md:w-1/2"
              />
            </div>

            <input
              type="phone"
              placeholder="Enter Phone Number (Optional)"
              className="mt-4 w-full rounded border border-gray-300 p-2"
            />

            <textarea
              placeholder="Your Message"
              className="mt-4 h-32 w-full rounded border border-gray-300 p-2"
            ></textarea>

            <button
              type="submit"
              className="mt-4 w-full rounded bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
