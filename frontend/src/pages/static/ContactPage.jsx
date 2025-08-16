// src/pages/static/ContactPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Mail, Twitter, Facebook, Instagram } from "lucide-react";

const ContactPage = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-900 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-6">
        Contact Us
      </h1>
      <p className="text-stone-600 dark:text-stone-300 text-lg mb-8 text-center max-w-xl">
        Have questions or feedback? We’d love to hear from you.
      </p>

      {/* Email */}
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6 text-amber-600" />
        <a
          href="mailto:hello@habisium.com"
          className="text-stone-700 dark:text-stone-200 hover:text-amber-600 transition"
        >
          hello@habisium.com
        </a>
      </div>

      {/* Socials */}
      <div className="flex gap-6">
        <a href="#" className="text-stone-600 dark:text-stone-300 hover:text-amber-600 transition">
          <Twitter className="w-6 h-6" />
        </a>
        <a href="#" className="text-stone-600 dark:text-stone-300 hover:text-amber-600 transition">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="#" className="text-stone-600 dark:text-stone-300 hover:text-amber-600 transition">
          <Instagram className="w-6 h-6" />
        </a>
      </div>
    </motion.div>
  );
};

export default ContactPage;
