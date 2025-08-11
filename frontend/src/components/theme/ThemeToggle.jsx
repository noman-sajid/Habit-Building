// src/components/theme/ThemeToggle.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors
      ${theme === 'dark' ? 'bg-stone-700' : 'bg-amber-400'}`}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute w-6 h-6 bg-white rounded-full shadow-md"
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        style={{
          left: theme === 'dark' ? 'calc(100% - 28px)' : '4px',
        }}
      />
      <div className="w-full flex justify-between items-center">
        <Sun size={16} className="text-yellow-200 ml-1" />
        <Moon size={16} className="text-slate-300 mr-1" />
      </div>
    </button>
  );
};

export default ThemeToggle;
