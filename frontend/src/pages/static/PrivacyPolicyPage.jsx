// src/pages/static/PrivacyPolicyPage.jsx
import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-amber-600 mb-6">Privacy Policy</h1>
      <p className="mb-4 text-stone-700">
        Your privacy is important to us at <strong>Habisium</strong>. This Privacy Policy
        explains how we collect, use, and safeguard your information when you use our service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4 text-stone-700">
        We may collect personal information such as your email address and data related to
        your habits. This information helps us improve your experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <p className="mb-4 text-stone-700">
        Data collected is used to provide, personalize, and improve our service. We will never
        sell or rent your information to third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
      <p className="mb-4 text-stone-700">
        Habisium may use cookies to enhance your browsing experience. You can disable cookies
        in your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4 text-stone-700">
        You have the right to access, update, or delete your personal data. Contact us anytime
        to exercise these rights.
      </p>

      <p className="mt-6 text-stone-500 text-sm">
        Last updated: August 16, 2025
      </p>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
