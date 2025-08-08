// src/components/layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/authReducer';
import ThemeToggle from '../theme/ThemeToggle';
import ProfileAvatar from '../common/ProfileAvatar';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="bg-white dark:bg-stone-900 shadow-light dark:shadow-dark border-b border-stone-200 dark:border-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo or Title */}
        <Link to="/" className="text-xl font-bold text-primary dark:text-accent">
          Hibo
        </Link>

        {/* Right: Icons / Controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <ProfileAvatar src="/images/smallProfile.png" size="md" />
          <button
            onClick={handleLogout}
            className="text-sm bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
