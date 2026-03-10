




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, fetchHabitSummary } from "../reducers/habitReducer";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import WeeklyHabitTracker from "../components/dashboard/WeeklyHabitTracker";
import StatsGrid from "../components/dashboard/StatsGrid";
import SummaryChart from "../components/dashboard/SummaryChart";
import ProgressRing from "../components/dashboard/ProgressRing";
import HabitList from "../components/dashboard/HabitList";
import QuickActionButton from "../components/dashboard/QuickActionButton";
import { scheduleReminder } from "../hooks/useNotifications";

const Dashboard = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.items || []);

  // Fetch dashboard data
  useEffect(() => {
    dispatch(fetchHabits());
    dispatch(fetchHabitSummary());
  }, [dispatch]);

  // Notifications setup (recall from previous version)

useEffect(() => {
    const notifications = [
      {
        title: "🌅 Morning Commitment",
        body: "Start your day with purpose. Remember the habits you've committed to!",
        hour: 9,
        minute: 0,
      },
      {
        title: "🌞 Midday Check-in",
        body: "Just a gentle reminder to stay consistent with your goals today.",
        hour: 14,
        minute: 30,
      },
      {
        title: "🌙 Evening Wrap-up",
        body: "Take a moment for yourself. Have you checked your habits today?",
        hour: 20,
        minute: 0,
      },
    ];

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        // Fixed: Destructuring the object to match (hour, minute, title, body)
        notifications.forEach(({ hour, minute, title, body }) => 
          scheduleReminder(hour, minute, title, body)
        );
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            notifications.forEach(({ hour, minute, title, body }) => 
              scheduleReminder(hour, minute, title, body)
            );
          }
        });
      }
    }
  }, []);
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-6">
        <div className="lg:col-span-2 space-y-6">
          <WelcomeBanner />
          <div className="lg:hidden">
            <ProgressRing />
          </div>
          <HabitList />
          <WeeklyHabitTracker />
        </div>
        <div className="space-y-6">
          <div className="hidden lg:block">
            <ProgressRing />
          </div>
          <SummaryChart />
          <StatsGrid />
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default Dashboard;
