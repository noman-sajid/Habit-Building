// src/pages/authPages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { load } from '../../reducers/authReducer';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar, Edit, Settings } from 'lucide-react';
import UpdateProfileModal from '../../components/auth/UpdateProfileModal';
import PageLayout from '../../components/layout/PageLayout';

const StatCard = ({ label, value }) => (
  <div className="bg-white dark:bg-stone-800 rounded-xl shadow p-4 text-center">
    <div className="text-3xl font-bold text-amber-500">{value}</div>
    <div className="text-sm text-stone-500 dark:text-stone-400">{label}</div>
  </div>
);

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error, initialized } = useSelector((state) => state.auth);
  const { habits } = useSelector((state) => state.habits);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!initialized) {
      dispatch(load());
    }
  }, [dispatch, initialized]);

  if (loading && !initialized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  const totalHabits = habits?.length || 0;
  const bestStreak = habits?.reduce((max, h) => (h.maxStreak > max ? h.maxStreak : max), 0) || 0;
  const memberSince = user ? new Date(user.createdAt).toLocaleDateString() : 'N/A';

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <img
                  src={user?.avatar?.url || 'https://via.placeholder.com/128'}
                  alt="User avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-amber-500"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-stone-800 dark:text-white">{user?.name}</h1>
                <p className="text-stone-500 dark:text-stone-400 flex items-center justify-center md:justify-start gap-2 mt-2">
                  <Mail size={16} /> {user?.email}
                </p>
                <p className="text-stone-500 dark:text-stone-400 flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Calendar size={16} /> Member since {memberSince}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition flex items-center gap-2"
                >
                  <Edit size={16} /> Edit Profile
                </button>
                <Link to="/settings" className="bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold py-2 px-4 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition flex items-center gap-2">
                  <Settings size={16} /> Settings
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Habits" value={totalHabits} />
            <StatCard label="Best Streak" value={bestStreak} />
            <StatCard label="Habits Completed" value={user?.habits?.length || 0} />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && <UpdateProfileModal closeModal={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </PageLayout>
  );
};

export default ProfilePage;
