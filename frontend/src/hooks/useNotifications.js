// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export default function useNotifications() {
//   const habits = useSelector((state) => state.habits.items || []);

//   useEffect(() => {
//     if (!("Notification" in window) || !("serviceWorker" in navigator)) return;

//     Notification.requestPermission().then((permission) => {
//       if (permission !== "granted") return;

//       const sendNotification = (title, body) => {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.active.postMessage({
//             type: "SHOW_NOTIFICATION",
//             title,
//             body,
//           });
//         });
//       };

//       // Morning reminder (8 AM)
//       const morningTimer = scheduleAtTime(8, 0, () => {
//         if (habits.length > 0) {
//           sendNotification(
//             "🌅 Good Morning!",
//             `You have ${habits.length} habit${habits.length > 1 ? "s" : ""} today. Let's get started!`
//           );
//         } else {
//           sendNotification("🌅 Good Morning!", "Start your day with a new habit!");
//         }
//       });

//       // Noon reminder (12 PM)
//       const noonTimer = scheduleAtTime(12, 0, () => {
//         sendNotification(
//           "☀️ Midday Boost!",
//           "You're halfway through the day. Keep building those habits!"
//         );
//       });

//       // Evening reminder (8 PM)
//       const eveningTimer = scheduleAtTime(20, 0, () => {
//         const completedCount = habits.filter((h) => {
//           return h.completedDates?.some((date) => {
//             const d = new Date(date);
//             d.setHours(0, 0, 0, 0);
//             return d.getTime() === new Date().setHours(0, 0, 0, 0);
//           });
//         }).length;

//         if (completedCount === habits.length && habits.length > 0) {
//           sendNotification("🎉 All Done!", "You crushed all your habits today!");
//         } else {
//           const left = habits.length - completedCount;
//           sendNotification(
//             "🌙 Evening Check-in",
//             left > 0
//               ? `Still ${left} habit${left > 1 ? "s" : ""} left today. You got this!`
//               : "Take a rest, tomorrow is a new day!"
//           );
//         }
//       });

//       // ⏱ Test reminder at 2:21 PM (temporary)
//       const testTimer = scheduleAtTime(14, 22, () => {
//         sendNotification("🔔 Test Notification", "This is just a test at 2:21 PM!");
//       });

//       // Cleanup
//       return () => {
//         clearTimeout(morningTimer);
//         clearTimeout(noonTimer);
//         clearTimeout(eveningTimer);
//         clearTimeout(testTimer);
//       };
//     });
//   }, [habits]);
// }

// // Helper: schedule callback at next occurrence of given time
// function scheduleAtTime(hour, minute, callback) {
//   const now = new Date();
//   const target = new Date();
//   target.setHours(hour, minute, 0, 0);

//   if (target <= now) {
//     target.setDate(target.getDate() + 1); // tomorrow
//   }

//   const timeout = target.getTime() - now.getTime();
//   return setTimeout(callback, timeout);
// }




// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export default function useNotifications() {
//   const habits = useSelector((state) => state.habits.items || []);

//   useEffect(() => {
//     if (!("Notification" in window) || !("serviceWorker" in navigator)) {
//       console.log("🚫 Notifications or Service Workers not supported in this browser.");
//       return;
//     }

//     console.log("🔔 Requesting notification permission...");
//     Notification.requestPermission().then((permission) => {
//       console.log("✅ Notification permission:", permission);
//       if (permission !== "granted") return;

//       const sendNotification = async (title, body) => {
//         console.log("📨 Sending notification:", { title, body });

//         try {
//           const registration = await navigator.serviceWorker.ready;

//           if (registration.active) {
//             console.log("📡 Using postMessage to service worker");
//             registration.active.postMessage({
//               type: "SHOW_NOTIFICATION",
//               title,
//               body,
//             });
//           } else {
//             console.log("⚡ No active SW, falling back to showNotification directly");
//             registration.showNotification(title, {
//               body,
//               icon: "/icons/icon-192x192.png",
//               badge: "/icons/icon-72x72.png",
//             });
//           }
//         } catch (err) {
//           console.error("❌ Notification error:", err);
//         }
//       };

//       // Morning reminder (8 AM)
//       const morningTimer = scheduleAtTime(8, 0, () => {
//         console.log("⏰ Morning reminder fired!");
//         if (habits.length > 0) {
//           sendNotification(
//             "🌅 Good Morning!",
//             `You have ${habits.length} habit${habits.length > 1 ? "s" : ""} today. Let's get started!`
//           );
//         } else {
//           sendNotification("🌅 Good Morning!", "Start your day with a new habit!");
//         }
//       });

//       // Noon reminder (12 PM)
//       const noonTimer = scheduleAtTime(12, 0, () => {
//         console.log("⏰ Noon reminder fired!");
//         sendNotification(
//           "☀️ Midday Boost!",
//           "You're halfway through the day. Keep building those habits!"
//         );
//       });

//       // Evening reminder (8 PM)
//       const eveningTimer = scheduleAtTime(20, 0, () => {
//         console.log("⏰ Evening reminder fired!");
//         const completedCount = habits.filter((h) => {
//           return h.completedDates?.some((date) => {
//             const d = new Date(date);
//             d.setHours(0, 0, 0, 0);
//             return d.getTime() === new Date().setHours(0, 0, 0, 0);
//           });
//         }).length;

//         if (completedCount === habits.length && habits.length > 0) {
//           sendNotification("🎉 All Done!", "You crushed all your habits today!");
//         } else {
//           const left = habits.length - completedCount;
//           sendNotification(
//             "🌙 Evening Check-in",
//             left > 0
//               ? `Still ${left} habit${left > 1 ? "s" : ""} left today. You got this!`
//               : "Take a rest, tomorrow is a new day!"
//           );
//         }
//       });

//       // ⏱ Test reminder at 2:22 PM (temporary, adjust to test quickly)
//       const testTimer = scheduleAtTime(14, 42, () => {
//         console.log("⏰ Test reminder fired!");
//         sendNotification("🔔 Test Notification", "This is just a test at 2:22 PM!");
//       });

//       // Cleanup
//       return () => {
//         clearTimeout(morningTimer);
//         clearTimeout(noonTimer);
//         clearTimeout(eveningTimer);
//         clearTimeout(testTimer);
//       };
//     });
//   }, [habits]);
// }

// // Helper: schedule callback at next occurrence of given time
// function scheduleAtTime(hour, minute, callback) {
//   const now = new Date();
//   const target = new Date();
//   target.setHours(hour, minute, 0, 0);

//   if (target <= now) {
//     target.setDate(target.getDate() + 1); // tomorrow
//   }

//   const timeout = target.getTime() - now.getTime();
//   console.log(`📅 Scheduling reminder for ${hour}:${minute}, in ${timeout / 1000}s`);
//   return setTimeout(callback, timeout);
// }







// useNotifications.js
export const sendNotification = ({ title, body }) => {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else {
    console.log("❌ Notification permission not granted");
  }
};

// helper function to schedule one notification
export const scheduleNotification = ({ title, body, hour, minute }) => {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);

  // if target time already passed today → schedule for tomorrow
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();
  console.log(`⏳ Notification scheduled in ${Math.round(delay / 1000)}s`);

  setTimeout(() => {
    sendNotification({ title, body });

    // 🔁 Reschedule daily
    scheduleNotification({ title, body, hour, minute });
  }, delay);
};
