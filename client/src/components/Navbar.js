import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUpload, FiHome, FiInfo, FiLogIn, FiMenu } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <FiUpload className="mr-2" />
          FileShare
        </Link>
        <div className="menu-desktop hidden md:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white flex items-center">
            <FiHome className="mr-1" />
            Home
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white flex items-center">
            <FiInfo className="mr-1" />
            About
          </Link>
          <Link to="/signin" className="text-gray-300 hover:text-white flex items-center">
            <FiLogIn className="mr-1" />
            Sign In
          </Link>
        </div>
        <div className="menu-mobile md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white">
            <FiMenu size={24} />
          </button>
          {menuOpen && (
            <div className="dropdown-menu bg-gray-800 shadow-lg rounded-lg absolute right-4 top-12 w-48">
              <Link to="/" className="block px-4 py-2 text-gray-300 hover:text-white">
                <FiHome className="mr-1" />
                Home
              </Link>
              <Link to="/about" className="block px-4 py-2 text-gray-300 hover:text-white">
                <FiInfo className="mr-1" />
                About
              </Link>
              <Link to="/signin" className="block px-4 py-2 text-gray-300 hover:text-white">
                <FiLogIn className="mr-1" />
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
