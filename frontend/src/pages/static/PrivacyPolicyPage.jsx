// src/pages/static/PrivacyPolicyPage.jsx
import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-6">
      <motion.div
        className="max-w-3xl bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-6">
          Privacy Policy
        </h1>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          Your privacy is important to us at <strong>Habisium</strong>. This Privacy Policy
          explains how we collect, use, and safeguard your information when you use our service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-stone-800 dark:text-stone-100">
          Information We Collect
        </h2>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          We may collect personal information such as your email address and data related to
          your habits. This information helps us improve your experience.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-stone-800 dark:text-stone-100">
          How We Use Your Information
        </h2>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          Data collected is used to provide, personalize, and improve our service. We will never
          sell or rent your information to third parties.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-stone-800 dark:text-stone-100">
          Cookies
        </h2>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          Habisium may use cookies to enhance your browsing experience. You can disable cookies
          in your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-stone-800 dark:text-stone-100">
          Your Rights
        </h2>
        <p className="mb-4 text-stone-700 dark:text-stone-300">
          You have the right to access, update, or delete your personal data. Contact us anytime
          to exercise these rights.
        </p>

        <p className="mt-6 text-stone-500 dark:text-stone-400 text-sm">
          Last updated: August 16, 2025
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
