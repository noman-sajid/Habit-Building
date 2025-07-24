import React from "react";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsGrid from "../components/dashboard/StatsGrid";
import SummaryChart from "../components/dashboard/SummaryChart";
import ProgressRing from "../components/dashboard/ProgressRing";
import HabitList from "../components/dashboard/HabitList";
import QuickActionButton from "../components/dashboard/QuickActionButton";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200">


      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <WelcomeBanner />
          <HabitList />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ProgressRing />
          <SummaryChart />
          <StatsGrid />
        </div>
      </main>

      {/* Floating Action Button */}
      <QuickActionButton />
    </div>
  );
};

export default Dashboard;
