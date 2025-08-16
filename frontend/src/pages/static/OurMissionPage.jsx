// src/pages/staticPages/OurMissionPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/common/Card";
import PageLayout from "../../components/layout/PageLayout";
import { Target, Users, Sparkles } from "lucide-react";

const OurMissionPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-primary dark:text-accent mb-6">
            Our Mission
          </h1>
          <p className="text-lg md:text-xl font-inter text-stone-700 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
            At Habisium, we believe that <span className="text-amber-600 dark:text-amber-400 font-semibold">small actions, repeated daily</span>, 
            have the power to reshape lives. Our mission is to guide, inspire, 
            and support you in building habits that last.
          </p>
        </div>

        {/* 3 Core Values */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Card className="p-8">
            <div className="flex justify-center mb-5">
              <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-full">
                <Target size={42} className="text-amber-500 dark:text-amber-400" />
              </div>
            </div>
            <h2 className="text-2xl font-poppins font-semibold text-stone-800 dark:text-stone-100 mb-3">
              Purposeful Growth
            </h2>
            <p className="font-inter text-stone-600 dark:text-stone-400">
              Helping you stay consistent with what matters most, so every step
              you take brings you closer to the life you envision.
            </p>
          </Card>

          <Card className="p-8">
            <div className="flex justify-center mb-5">
              <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-full">
                <Users size={42} className="text-amber-500 dark:text-amber-400" />
              </div>
            </div>
            <h2 className="text-2xl font-poppins font-semibold text-stone-800 dark:text-stone-100 mb-3">
              Built for Everyone
            </h2>
            <p className="font-inter text-stone-600 dark:text-stone-400">
              Whether you’re forming your very first habit or refining a
              long-term practice, Habisium adapts to your journey.
            </p>
          </Card>

          <Card className="p-8">
            <div className="flex justify-center mb-5">
              <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-full">
                <Sparkles size={42} className="text-amber-500 dark:text-amber-400" />
              </div>
            </div>
            <h2 className="text-2xl font-poppins font-semibold text-stone-800 dark:text-stone-100 mb-3">
              Inspired by Possibility
            </h2>
            <p className="font-inter text-stone-600 dark:text-stone-400">
              We’re driven by the belief that habits unlock hidden potential —
              sparking progress, creativity, and well-being.
            </p>
          </Card>
        </div>

        {/* Closing Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-stone-800 dark:text-stone-100 mb-5">
            Together, We Grow
          </h2>
          <p className="font-inter text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Habisium isn’t just an app — it’s a companion on your journey of
            self-improvement. Join us as we shape habits, nurture resilience,
            and create a future defined by small, meaningful wins.
          </p>

          {/* CTA Button */}
          <Link
            to="/register"
            className="inline-block px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500 text-white font-poppins font-semibold shadow-lg transition-colors"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default OurMissionPage;
