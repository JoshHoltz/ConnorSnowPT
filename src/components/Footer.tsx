import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  InstagramIcon,
  Ghost,
} from "lucide-react";
export const Footer = () => {
  return (
    <footer className="bg-black pb-8 pt-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-6 text-2xl font-bold">
              CONNOR<span className="text-blue-600">SNOW</span>
            </h3>
            <p className="mb-6 text-gray-400">
              Transforming lives through expert personal training and customised
              fitness programs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/connorsnowpt?igsh=MWR3ZDliNmlyZ2h4Zw=="
                target="_blank"
                className="transition-colors hover:text-blue-500"
              >
                <InstagramIcon size={24} />
              </a>

              <a
                href="https://t.snapchat.com/XwLMWefN"
                target="_blank"
                className="transition-colors hover:text-blue-500"
              >
                <Ghost size={24} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-6 text-lg font-bold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/plans"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Plans
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Packages
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-lg font-bold">Membership</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/packages"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Bronze Plan
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Silver Plan
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Gold Plan
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-lg font-bold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="mr-3 h-6 w-6 flex-shrink-0 text-blue-500" />
                <span className="text-gray-400 hover:underline">
                  <a
                    href="https://maps.app.goo.gl/zu7adaUEWkXKscQZ8"
                    target="_blank"
                  >
                    Gym: 91 Windingbrook Ln, Collingtree
                  </a>
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="mr-3 h-6 w-6 flex-shrink-0 text-blue-500" />
                <a
                  className="text-gray-400 hover:underline"
                  href="tel:07305 926187"
                >
                  07305 926187
                </a>
              </li>
              <li className="flex items-center">
                <MailIcon className="mr-3 h-6 w-6 flex-shrink-0 text-blue-500" />
                <a
                  className="click text-gray-400 transition duration-500 hover:underline"
                  href="mailto:connor@connorsnowpt.com"
                >
                  connor@connorsnowpt.com
                </a>{" "}
                {/* REF: https://stackoverflow.com/questions/63782544/react-open-mailto-e-mail-client-onclick-with-body-from-textarea */}
                {/* <span className="text-gray-400">connor@connorsnowpt.com</span> */}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} ConnorSnowPT
          </p>
        </div>
      </div>
    </footer>
  );
};
