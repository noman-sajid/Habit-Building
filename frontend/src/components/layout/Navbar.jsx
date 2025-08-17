// src/components/layout/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/authReducer';
import ThemeToggle from '../theme/ThemeToggle';
import ProfileAvatar from '../common/ProfileAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, User, LogOut } from 'lucide-react';
import logo from '../../assets/hb_logo1.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-stone-900 shadow-light dark:shadow-dark border-b border-stone-200 dark:border-stone-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          className="text-2xl font-bold text-primary dark:text-accent flex items-center gap-2"
        >
          <img src={logo} alt="Hibo Logo" className="h-12 w-12" />
        </Link>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <ProfileAvatar src={user?.avatar?.url} size="md" />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-800 rounded-md shadow-lg py-1 z-50 border border-stone-200 dark:border-stone-700"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={16} className="mr-2" /> My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-accent transition-colors px-3 py-2 rounded-md"
              >
                <LogIn size={16} />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                <UserPlus size={16} />
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-3 flex flex-col justify-center items-center w-10 h-10 relative"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-stone-900 dark:bg-stone-100 mb-1"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-stone-900 dark:bg-stone-100 mb-1"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-stone-900 dark:bg-stone-100"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-stone-900 shadow-lg md:hidden z-40"
          >
            <div className="flex flex-col space-y-4 p-4">
              <Link
                to="/about"
                className="text-stone-700 dark:text-stone-300 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-stone-700 dark:text-stone-300 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="text-stone-700 dark:text-stone-300 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn size={16} /> Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus size={16} /> Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200 hover:text-amber-600"
                >
                  <LogOut size={16} /> Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
