import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-200 dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-sm py-6 ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* Left Text */}
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Hibo. All rights reserved.
        </p>

        {/* Mock Navigation Links */}
        <div className="flex space-x-4 text-center sm:text-right">
          <Link to="/" className="hover:text-primary dark:hover:text-amber-400 transition">
            Home
          </Link>
          <Link to="/register" className="hover:text-primary dark:hover:text-amber-400 transition">
            Register
          </Link>
          <Link to="/dashboard" className="hover:text-primary dark:hover:text-amber-400 transition">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:text-primary dark:hover:text-amber-400 transition">
            Profile
          </Link>
          <Link to="/settings" className="hover:text-primary dark:hover:text-amber-400 transition">
            Settings
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
