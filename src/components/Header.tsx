import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, X as CloseIcon } from "lucide-react";
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed z-10 w-full bg-black text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <button>
            <a href="/">
              <h1 className="text-2xl font-bold">
                CONNOR<span className="text-blue-600">SNOW</span>
              </h1>
            </a>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center p-2 md:flex">
          {" "}
          {/* Hide the Navigaiton Bar on medium devices */}
          <Link to="/#" className="ml-4 text-white hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="ml-4 text-white hover:text-gray-400">
            About
          </Link>
          <Link to="/packages" className="ml-4 text-white hover:text-gray-400">
            Packages
          </Link>
          <Link to="/plans" className="ml-4 text-white hover:text-gray-400">
            Plans
          </Link>
          <Link to="/contact" className="ml-4 text-white hover:text-gray-400">
            Contact
          </Link>
          <Link
            to="/Login"
            className="ml-4 bg-blue-600 px-6 py-3 text-white hover:text-gray-400"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {" "}
          {/* Hide the Menu Button on medium devices */}
          {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}{" "}
          {/* Toggle between Menu and Close Icon if menu is open or if menu is closed */}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="bg-black md:hidden">
          <div className="container mx-auto flex flex-col space-y-4 px-4 py-4">
            <Link to="/#" className="ml-4 text-white hover:text-gray-400">
              Home
            </Link>
            <Link to="/about" className="ml-4 text-white hover:text-gray-400">
              About
            </Link>
            <Link to="/plans" className="ml-4 text-white hover:text-gray-400">
              Plans
            </Link>
            <Link
              to="/packages"
              className="ml-4 text-white hover:text-gray-400"
            >
              Packages
            </Link>
            <Link to="/contact" className="ml-4 text-white hover:text-gray-400">
              Contact
            </Link>

            <Link
              to="/login"
              className="text- ml-4 bg-blue-600 px-6 py-3 text-white hover:text-gray-400"
            >
              <a href="/login">Login</a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
