// src/pages/static/ApproachPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Repeat, Award, ArrowRight } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import approachImage from '../../assets/approach1.png';

const FeatureCard = ({ icon, title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
  >
    <div className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-stone-800 dark:text-white mb-3">{title}</h3>
    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{children}</p>
  </motion.div>
);

const ApproachPage = () => {
  return (
    <PageLayout>
      <div className="bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 overflow-x-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-16 sm:py-20 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
              The "Bit by Bit" Philosophy
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-stone-600 dark:text-stone-300">
            We believe building lasting habits isn't about giant leaps. It's about the small, consistent steps you take every single day.
          </p>
        </motion.div>

        {/* Main Content Section */}
        <div className="container mx-auto px-6 pt-8 pb-16 md:py-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src={approachImage}
                alt="Our Approach"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-white">The Power of Micro-Habits</h2>
              <p className="text-lg text-stone-600 dark:text-stone-400">
                Overwhelming goals lead to burnout. Tiny, manageable actions create momentum. Our app is designed to help you break down your ambitions into daily, achievable tasks that feel effortless.
              </p>
              <p className="text-lg text-stone-600 dark:text-stone-400">
                Each day, you focus on one small piece of the puzzle. This consistency builds a strong foundation, and before you know it, you've constructed a powerful new habit that lasts.
              </p>
            </motion.div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white dark:bg-stone-800 py-16 sm:py-24">
          <div className="container mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-center mb-16"
            >
              Your Journey to Lasting Change
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-10">
              <FeatureCard
                icon={<Target size={32} className="text-amber-600" />}
                title="1. Start Small"
                delay={0.1}
              >
                Choose a habit and break it down into the smallest possible step. Want to read more? Start with just one page a day.
              </FeatureCard>
              <FeatureCard
                icon={<Repeat size={32} className="text-amber-600" />}
                title="2. Stay Consistent"
                delay={0.2}
              >
                Log your progress daily. Our app helps you visualize your streak and provides the motivation to keep going.
              </FeatureCard>
              <FeatureCard
                icon={<Award size={32} className="text-amber-600" />}
                title="3. Celebrate Progress"
                delay={0.3}
              >
                Acknowledge every achievement, no matter how small. Each step forward is a victory worth celebrating!
              </FeatureCard>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Build Your Best Self?</h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-8">
              Start your journey today. The path to a better you begins with a single step.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-amber-500 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-600 transition-transform hover:scale-105 text-lg"
            >
              Get Started Now <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ApproachPage;
