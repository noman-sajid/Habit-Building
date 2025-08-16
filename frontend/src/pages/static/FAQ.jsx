// src/pages/static/FAQ.jsx
import React from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is Habisium?",
    answer:
      "Habisium is a habit-building app designed to help you create, track, and sustain positive habits through a friendly and minimalistic experience.",
  },
  {
    question: "Is Habisium free to use?",
    answer:
      "Yes, Habisium offers free core features. Additional premium features may be introduced in the future.",
  },
  {
    question: "Do I need an account to use Habisium?",
    answer:
      "You can explore some features without an account, but creating an account allows you to sync, track, and save your progress across devices.",
  },
  {
    question: "Does Habisium provide medical advice?",
    answer:
      "No, Habisium is for informational and motivational purposes only. For medical or psychological advice, always consult a licensed professional.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-6">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200">
                {faq.question}
              </h2>
              <p className="text-stone-700 dark:text-stone-300 mt-2">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
