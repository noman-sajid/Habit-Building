import React from 'react';
import { Link } from 'react-router-dom';

const PasswordResetSent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-4">
          📩 Check Your Email
        </h2>

        <p className="text-base text-stone-700 dark:text-stone-300 mb-4 leading-relaxed">
          We’ve sent a <span className="font-semibold text-stone-900 dark:text-white">password reset link</span> to your inbox.
        </p>

        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          Didn’t receive it? Be sure to check your <span className="font-medium text-amber-600 dark:text-amber-400">spam</span> or <span className="font-medium text-amber-600 dark:text-amber-400">junk</span> folder.
        </p>

        <Link
          to="/login"
          className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordResetSent;
