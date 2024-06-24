import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUpload, FiHome, FiInfo, FiLogIn, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <FiUpload className="mr-2" />
          FileShare
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
        <ul className={`md:flex md:items-center md:space-x-4 absolute md:relative top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent ${isOpen ? 'block' : 'hidden'} md:flex`}>
          <li className="border-t md:border-none">
            <Link to="/" className="block px-4 py-2 text-gray-300 hover:text-white">
              <FiHome className="inline mr-1" />
              Home
            </Link>
          </li>
          <li className="border-t md:border-none">
            <Link to="/about" className="block px-4 py-2 text-gray-300 hover:text-white">
              <FiInfo className="inline mr-1" />
              About
            </Link>
          </li>
          <li className="border-t md:border-none">
            <Link to="/signin" className="block px-4 py-2 text-gray-300 hover:text-white">
              <FiLogIn className="inline mr-1" />
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
