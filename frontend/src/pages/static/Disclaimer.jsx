// src/pages/static/Disclaimer.jsx
import React from "react";
import { motion } from "framer-motion";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Disclaimer
        </h1>
        <p className="text-stone-700 dark:text-stone-300 mb-4">
          The content provided by <span className="font-semibold">Habisium</span> 
          is for informational and motivational purposes only. It is not intended 
          to be a substitute for professional medical, psychological, or other 
          licensed advice. Always seek the guidance of a qualified professional 
          regarding your health, well-being, or other specific concerns.
        </p>
        <p className="text-stone-700 dark:text-stone-300 mb-4">
          By using Habisium, you acknowledge and agree that any actions you take 
          are your own responsibility. Habisium and its creators are not liable 
          for any outcomes, consequences, or claims resulting from the use of 
          this application.
        </p>
        <p className="text-stone-700 dark:text-stone-300">
          If you experience any issues related to your health or mental well-being, 
          please consult with a licensed healthcare provider immediately.
        </p>
      </motion.div>
    </div>
  );
};

export default Disclaimer;
