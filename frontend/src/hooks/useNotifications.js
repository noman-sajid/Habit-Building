// src/utils/useNotifications.js

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = (title, body) => {
  if (Notification.permission === "granted") {
    new Notification(title, { 
      body,
      icon: '/logo192.png' 
    });
  }
};

export const scheduleReminder = (hour, minute, title, body) => {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();
  console.log(`⏳ Reminder "${title}" scheduled for ${target.toLocaleTimeString()}`);

  setTimeout(() => {
    sendNotification(title, body);
    scheduleReminder(hour, minute, title, body);
  }, delay);
};