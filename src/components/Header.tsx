import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, X as CloseIcon } from 'lucide-react';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return <header className="bg-black text-white w-full fixed z-10">
    <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
            <h1 className="text-2xl font-bold">CONNOR <span className="text-blue-600">SNOW</span></h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="p-2 hidden md:flex items-center"> {/* Hide the Navigaiton Bar on medium devices */}
            <Link to="/#" className="text-white hover:text-gray-400 ml-4">Home</Link>
            <Link to="/about" className="text-white hover:text-gray-400 ml-4">About</Link>
            <Link to="/plans" className="text-white hover:text-gray-400 ml-4">Plans</Link>
            <Link to="/packages" className="text-white hover:text-gray-400 ml-4">Packages</Link>
            <Link to="/contact" className="text-white hover:text-gray-400 ml-4">Contact</Link>
            <button className="ml-4 bg-blue-600 text-white hover:text-gray-400 px-6 py-3">
                <a href="/Login">Login</a>
            </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}> {/* Hide the Menu Button on medium devices */}
          {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />} {/* Toggle between Menu and Close Icon if menu is open or if menu is closed */}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-black">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/#" className="text-white hover:text-gray-400 ml-4">Home</Link>
            <Link to="/about" className="text-white hover:text-gray-400 ml-4">About</Link>
            <Link to="/plans" className="text-white hover:text-gray-400 ml-4">Plans</Link>
            <Link to="/packages" className="text-white hover:text-gray-400 ml-4">Packages</Link>
            <Link to="/contact" className="text-white hover:text-gray-400 ml-4">Contact</Link>
            <button className="ml-4 bg-blue-600 text-white hover:text-gray-400 px-6 py-3">
                <a href="#">Login</a>
            </button>
          </div>
        </div>}
    </header>;
};

