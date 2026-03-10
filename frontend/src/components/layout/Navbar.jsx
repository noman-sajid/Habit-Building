// src/components/layout/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/authReducer';
import ThemeToggle from '../theme/ThemeToggle';
import ProfileAvatar from '../common/ProfileAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Info, Mail, Menu, X } from 'lucide-react';
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
      className="bg-white dark:bg-stone-900 shadow-sm border-b border-stone-200 dark:border-stone-800 sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Section: Logo */}
        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img src={logo} alt="Hibo Logo" className="h-10 w-10 object-contain" />
          <span className="hidden sm:block font-bold text-xl text-stone-800 dark:text-white tracking-tight">
            Habitium
          </span>
        </Link>

        {/* Right Section: Grouped Links & Actions */}
        <div className="hidden md:flex items-center space-x-4">
          
          {/* Group 1: Page Links (Only for guests) */}
          {!isAuthenticated && (
            <div className="flex items-center space-x-6 border-r border-stone-200 dark:border-stone-700 pr-6 mr-2">
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

          {/* Group 2: Utilities & Account */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none hover:ring-2 hover:ring-amber-500/20 rounded-full transition-all"
                >
                  <ProfileAvatar src={user?.avatar?.url} size="md" />
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-white dark:bg-stone-800 rounded-xl shadow-xl py-2 z-50 border border-stone-200 dark:border-stone-700"
                    >
                      <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-700/50 mb-1">
                        <p className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Loged In As</p>
                        <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 truncate">{user?.name}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User size={16} className="mr-3 text-stone-400" /> My Profile
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                      >
                        <LogOut size={16} className="mr-3" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-amber-500 px-2 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-600 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {!isAuthenticated && (
                <>
                  <Link to="/about" className="flex items-center gap-3 p-3 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    <Info size={18} className="text-stone-400" /> About
                  </Link>
                  <Link to="/contact" className="flex items-center gap-3 p-3 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    <Mail size={18} className="text-stone-400" /> Contact
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <User size={18} className="text-stone-400" /> My Profile
                </Link>
              )}

              <div className="pt-4 mt-2 border-t border-stone-200 dark:border-stone-800">
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" className="w-full text-center py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </Link>
                    <Link to="/register" className="w-full text-center py-3 rounded-xl bg-amber-500 text-white font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
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