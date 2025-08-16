// src/pages/static/AboutHabisiumPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/common/Card";
import PageLayout from "../../components/layout/PageLayout";
import thinking from "../../assets/aboutImage.png";
import { motion } from "framer-motion";
import { BookOpen, Compass, HeartHandshake } from "lucide-react";

const AboutHabisiumPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-primary dark:text-accent mb-6">
            About Habisium
          </h1>
          <p className="text-lg md:text-xl font-inter text-stone-700 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
            I created Habisium with one guiding principle:{" "}
            <span className="text-amber-600 dark:text-amber-400 font-semibold">
              change isn’t spontaneous — it’s the product of consistency
            </span>
            . This isn’t just another habit tracker. Habisium is designed to
            educate, guide, and support you in building habits that last a
            lifetime.
          </p>
        </motion.div>

        {/* Image + Text Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-20">
          <motion.img
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={thinking}
            alt="Habisium Mascot Thinking"
            className="w-64 md:w-80 drop-shadow-xl rounded-2xl"
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-center md:text-left space-y-4"
          >
            <p className="font-inter text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
              Habits don’t happen overnight. They’re built one day at a time,
              through repetition and mindful effort. Habisium was born to help
              people embrace this process — to prove that growth is gradual but
              deeply rewarding.
            </p>
            <p className="font-inter text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
              More than tracking, Habisium is about{" "}
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                education and guidance
              </span>
              . You’ll learn how habits work, why consistency matters, and how
              to turn daily actions into lasting transformation.
            </p>
          </motion.div>
        </div>

  
     

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-stone-800 dark:text-stone-100 mb-5">
            Your Story Starts Here
          </h2>
          <p className="font-inter text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Real change is the sum of small, consistent choices. With Habisium,
            you’re not just checking off habits — you’re creating a story of
            growth, balance, and possibility.
          </p>

          {/* CTA Button */}
          <Link
            to="/register"
            className="inline-block px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500 text-white font-poppins font-semibold shadow-lg transition-colors"
          >
            Start Building Today
          </Link>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default AboutHabisiumPage;
