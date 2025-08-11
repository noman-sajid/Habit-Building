// src/components/layout/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/authReducer';
import ThemeToggle from '../theme/ThemeToggle';
import ProfileAvatar from '../common/ProfileAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, User, LogOut } from 'lucide-react';
import logo from '../../assets/logoImage.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Close dropdown when clicking outside
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
    <nav className="bg-white dark:bg-stone-900 shadow-light dark:shadow-dark border-b border-stone-200 dark:border-stone-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo or Title */}
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-2xl font-bold text-primary dark:text-accent flex items-center gap-2">
          <img src={logo} alt="Hibo Logo" className="h-8 w-8" />
        </Link>

        {/* Right: Icons / Controls */}
        <div className="flex items-center space-x-4">
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
              <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-accent transition-colors px-3 py-2 rounded-md">
                <LogIn size={16} />
                Login
              </Link>
              <Link to="/register" className="flex items-center gap-2 bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
                <UserPlus size={16} />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
