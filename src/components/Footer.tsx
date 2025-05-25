import React from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, InstagramIcon, FacebookIcon, TwitterIcon } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              CONNOR<span className="text-blue-600">SNOW</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Transforming lives through expert personal training and customized
              fitness programs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-500 transition-colors">
                <InstagramIcon size={24} />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <FacebookIcon size={24} />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <TwitterIcon size={24} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Trainers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Membership</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Basic Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Premium Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Elite Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Corporate Packages
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="mr-3 h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Fitness Street
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="mr-3 h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-gray-400">+441122334455</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="mr-3 h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-gray-400">contact@cspt.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} @ConnorSnowPT
          </p>
        </div>
      </div>
    </footer>;
};