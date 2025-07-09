import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 flex items-center justify-center px-4">
      <div className="text-center p-6 rounded-2xl shadow-light dark:shadow-dark bg-white dark:bg-stone-800 transition-shadow duration-300 w-full max-w-md">
        <h1 className="text-4xl font-poppins font-bold text-primary dark:text-accent mb-4">
          Welcome to Hibo
        </h1>
        <p className="text-lg font-inter text-stone-900 dark:text-stone-100">
          Your habit journey begins here.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="mt-6 px-6 py-2 bg-accent dark:bg-primary text-stone-900 dark:text-white font-semibold rounded-md transition-colors duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
