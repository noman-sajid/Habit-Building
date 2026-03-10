// src/components/layout/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/authReducer';
import ThemeToggle from '../theme/ThemeToggle';
import ProfileAvatar from '../common/ProfileAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, User, LogOut, Info, Mail } from 'lucide-react';
import logo from '../../assets/hb_logo1.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      setIsMobileMenuOpen(false);
      setIsDropdownOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      ref={navRef}
      className="bg-white dark:bg-stone-900 shadow-light dark:shadow-dark border-b border-stone-200 dark:border-stone-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Section: Logo only */}
        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img src={logo} alt="Hibo Logo" className="h-11 w-11 object-contain" />
        </Link>

        {/* Right Section: Nav Links + Controls */}
        <div className="hidden md:flex items-center space-x-6">
          
          {/* Landing links: Only show if NOT authenticated */}
          {!isAuthenticated && (
            <div className="flex items-center space-x-6 mr-2">
              <Link 
                to="/about" 
                className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-amber-500' : 'text-stone-600 dark:text-stone-300 hover:text-amber-500'}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-amber-500' : 'text-stone-600 dark:text-stone-300 hover:text-amber-500'}`}
              >
                Contact
              </Link>
            </div>
          )}

          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <ProfileAvatar src={user?.avatar?.url} size="md" />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-stone-800 rounded-lg shadow-xl py-2 z-50 border border-stone-200 dark:border-stone-700"
                  >
                    <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-700 mb-1">
                      <p className="text-xs text-stone-500 dark:text-stone-400">Signed in as</p>
                      <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 truncate">{user?.name}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={16} className="mr-2 text-stone-400" /> My Profile
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-amber-500">
              Login
              </Link>
              <Link
                to="/register"
                className="bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex flex-col justify-center items-center relative z-50"
          >
            <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-stone-800 dark:bg-stone-100 mb-1.5" />
            <motion.span animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-stone-800 dark:bg-stone-100 mb-1.5" />
            <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-stone-800 dark:bg-stone-100" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 md:hidden"
          >
            <div className="flex flex-col p-4 space-y-1">
              {/* Only show these to guests on mobile too */}
              {!isAuthenticated && (
                <>
                  <Link to="/about" className="flex items-center gap-3 p-3 rounded-lg text-stone-700 dark:text-stone-200" onClick={() => setIsMobileMenuOpen(false)}>
                    <Info size={18} /> About
                  </Link>
                  <Link to="/contact" className="flex items-center gap-3 p-3 rounded-lg text-stone-700 dark:text-stone-200" onClick={() => setIsMobileMenuOpen(false)}>
                    <Mail size={18} /> Contact
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <Link to="/profile" className="flex items-center gap-3 p-3 rounded-lg text-stone-700 dark:text-stone-200" onClick={() => setIsMobileMenuOpen(false)}>
                  <User size={18} /> My Profile
                </Link>
              )}

              <div className="pt-4 mt-2 border-t border-stone-100 dark:border-stone-800">
                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/login" className="flex justify-center items-center gap-2 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </Link>
                    <Link to="/register" className="flex justify-center items-center gap-2 py-2.5 rounded-lg bg-amber-500 text-white font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 dark:text-red-400">
                    <LogOut size={18}/> Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;