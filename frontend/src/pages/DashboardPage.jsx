





// // /pages/Dashboard.jsx
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHabits, fetchHabitSummary } from "../reducers/habitReducer";

// import WelcomeBanner from "../components/dashboard/WelcomeBanner";
// import WeeklyHabitTracker from "../components/dashboard/WeeklyHabitTracker";
// import StatsGrid from "../components/dashboard/StatsGrid";
// import SummaryChart from "../components/dashboard/SummaryChart";
// import ProgressRing from "../components/dashboard/ProgressRing";
// import HabitList from "../components/dashboard/HabitList";
// import QuickActionButton from "../components/dashboard/QuickActionButton";


// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const habits = useSelector((state) => state.habits.items || []);

//   // Fetch data
//   useEffect(() => {
//     dispatch(fetchHabits());
//     dispatch(fetchHabitSummary());
//   }, [dispatch]);

//   // Request Notification Permission + Simple Reminder Setup
// useEffect(() => {
//   if ("Notification" in window && "serviceWorker" in navigator) {
//     Notification.requestPermission().then((permission) => {
//       if (permission === "granted") {
//         console.log("Notifications allowed ✅");

//         // Example: notify once after 1 hour
//         const timer = setTimeout(() => {
//           navigator.serviceWorker.ready.then((registration) => {
//             registration.showNotification("⏰ Habit Reminder", {
//               body:
//                 habits.length > 0
//                   ? `You have ${habits.length} active habit${
//                       habits.length > 1 ? "s" : ""
//                     }. Check your progress!`
//                   : "Start building a habit today!",
//               icon: "/icons/icon-192x192.png",
//               badge: "/icons/icon-72x72.png",
//             });
//           });
//         }, 60 * 60 * 1000); // 1 hour

//         return () => clearTimeout(timer);
//       } else {
//         console.log("Notifications blocked ❌");
//       }
//     });
//   }
// }, [habits]);


//   return (
//     <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200">
//       <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-6">
//         <div className="lg:col-span-2 space-y-6">
//           <WelcomeBanner />
//           <div className="lg:hidden">
//             <ProgressRing />
//           </div>
//           <HabitList />
//           <WeeklyHabitTracker />
//         </div>
//         <div className="space-y-6">
//           <div className="hidden lg:block">
//             <ProgressRing />
//           </div>
//           <SummaryChart />
//           <StatsGrid />
//         </div>
//       </main>
//       <QuickActionButton />
//     </div>
//   );
// };

// export default Dashboard;








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
import { scheduleNotification } from "../hooks/useNotifications";

const Dashboard = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.items || []);

  // Fetch data
  useEffect(() => {
    dispatch(fetchHabits());
    dispatch(fetchHabitSummary());
  }, [dispatch]);

  // ✅ Hook automatically manages notifications
  
   scheduleNotification({
  title: "⏰ Reminder",
  body: "It’s 2:45 PM!",
  hour: 14,
  minute: 56,
},[]);

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
