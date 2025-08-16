// src/pages/static/TermsPage.jsx
import React from "react";
import { motion } from "framer-motion";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-6">
      <motion.div
        className="max-w-3xl bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-6">
          Terms of Service
        </h1>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          Welcome to <strong>Habisium</strong>. By accessing or using our service, you agree to
          be bound by these Terms of Service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-stone-800 dark:text-stone-100">
          Use of Service
        </h2>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          You agree to use Habisium only for lawful purposes. You must not misuse the service
          or attempt to disrupt its operation.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-stone-800 dark:text-stone-100">
          Accounts
        </h2>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          You are responsible for maintaining the confidentiality of your account credentials
          and for all activities that occur under your account.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-stone-800 dark:text-stone-100">
          Limitations
        </h2>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          Habisium is not responsible for any damages arising from your use of the service. We
          provide the platform “as is” without warranties.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-stone-800 dark:text-stone-100">
          Governing Law
        </h2>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          These Terms are governed by the laws of Pakistan.
        </p>

        <p className="mt-6 text-stone-500 dark:text-stone-400 text-sm">
          Last updated: August 16, 2025
        </p>
      </motion.div>
    </div>
  );
};

export default TermsPage;
