// src/pages/static/TermsPage.jsx
import React from "react";
import { motion } from "framer-motion";

const TermsPage = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-amber-600 mb-6">Terms of Service</h1>
      <p className="mb-4 text-stone-700">
        Welcome to <strong>Habisium</strong>. By accessing or using our service, you agree to
        be bound by these Terms of Service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <p className="mb-4 text-stone-700">
        You agree to use Habisium only for lawful purposes. You must not misuse the service
        or attempt to disrupt its operation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Accounts</h2>
      <p className="mb-4 text-stone-700">
        You are responsible for maintaining the confidentiality of your account credentials
        and for all activities that occur under your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Limitations</h2>
      <p className="mb-4 text-stone-700">
        Habisium is not responsible for any damages arising from your use of the service. We
        provide the platform “as is” without warranties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Governing Law</h2>
      <p className="mb-4 text-stone-700">
        These Terms are governed by the laws of Pakistan.
      </p>

      <p className="mt-6 text-stone-500 text-sm">
        Last updated: August 16, 2025
      </p>
    </motion.div>
  );
};

export default TermsPage;
