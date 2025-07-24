// /pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchHabits, fetchHabitSummary } from "../reducers/habitReducer";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsGrid from "../components/dashboard/StatsGrid";
import SummaryChart from "../components/dashboard/SummaryChart";
import ProgressRing from "../components/dashboard/ProgressRing";
import HabitList from "../components/dashboard/HabitList";
import QuickActionButton from "../components/dashboard/QuickActionButton";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
    dispatch(fetchHabitSummary());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-6">
        <div className="lg:col-span-2 space-y-6">
          <WelcomeBanner />
          <HabitList />
        </div>
        <div className="space-y-6">
          <ProgressRing />
          <SummaryChart />
          <StatsGrid />
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default Dashboard;
