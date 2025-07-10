import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md bg-accent text-dark hover:bg-primary hover:text-white transition"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
