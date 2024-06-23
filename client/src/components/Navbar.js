import React from 'react';
import { Link } from 'react-router-dom';
import { FiUpload, FiHome, FiInfo, FiLogIn } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <FiUpload className="mr-2" />
          FileShare
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white flex items-center">
              <FiHome className="mr-1" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-300 hover:text-white flex items-center">
              <FiInfo className="mr-1" />
              About
            </Link>
          </li>
          <li>
            <Link to="/signin" className="text-gray-300 hover:text-white flex items-center">
              <FiLogIn className="mr-1" />
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
