const Habit = require('../models/Habit');
const User = require('../models/User');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhander');


// Create a new habit
const createHabit = catchAsyncErrors(async (req, res, next) => {
  const { title, description, frequency, emoji, duration, goal } = req.body;

  const habit = await Habit.create({
    user: req.user._id,
    title,
    description,
    frequency,
    emoji,
    duration,
    goal: goal || null,
    progress: 0,
    goalAchieved: false,
  });

  res.status(201).json({
    success: true,
    data: habit,
  });
});


// Get all habits of the logged-in user
const getUserHabits = catchAsyncErrors(async (req, res, next) => {
  const habits = await Habit.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    habits,
  });
});

// PUT /api/habits/:id
const updateHabit = catchAsyncErrors(async (req, res, next) => {
  const habitId = req.params.id;
  const { title, description, frequency, duration, goal } = req.body;

  let habit = await Habit.findOne({ _id: habitId, user: req.user._id });
  if (!habit) {
    return next(new ErrorHandler("Habit not found or unauthorized", 404));
  }

  // ✅ Update fields if provided
  if (title) habit.title = title;
  if (description) habit.description = description;
  if (frequency) habit.frequency = frequency;
  if (duration) habit.duration = duration;

  // ✅ If goal is updated
  if (goal !== undefined) {
    habit.goal = goal;

    // ✅ Do NOT reset progress to 0
    // If progress > goal, cap it and mark goal as achieved
    if (habit.progress >= goal) {
      habit.progress = goal;
      habit.goalAchieved = true; // auto-mark achieved if already exceeded
    } else {
      habit.goalAchieved = false; // new goal, still not achieved
      // Keep current progress (e.g., streak or previous completions)
    }
  }

  await habit.save();

  res.status(200).json({
    success: true,
    message: "Habit updated successfully",
    habit,
  });
});


// PATCH /api/habits/:id/complete
const markHabitComplete = catchAsyncErrors(async (req, res, next) => {
  const habitId = req.params.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const habit = await Habit.findOne({ _id: habitId, user: req.user._id });

  if (!habit) {
    return next(new ErrorHandler("Habit not found or unauthorized", 404));
  }

  const alreadyCompletedToday = habit.completedDates.some(date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  if (alreadyCompletedToday) {
    return next(new ErrorHandler("Habit already marked as complete today", 400));
  }

  // Add today's completion
  habit.completedDates.push(today);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const last = habit.lastCompleted ? new Date(habit.lastCompleted) : null;

  // Update streak
  habit.streak = last && last.toDateString() === yesterday.toDateString() ? habit.streak + 1 : 1;
  habit.lastCompleted = today;
  if (habit.streak > habit.maxStreak) habit.maxStreak = habit.streak;

  // ✅ Update goal progress if goal exists
  if (habit.goal && !habit.goalAchieved) {
    habit.progress += 1;
    if (habit.progress >= habit.goal) {
      habit.progress = habit.goal; // prevent overflow
      habit.goalAchieved = true;
    }
  }

  await habit.save();

  res.status(200).json({
    success: true,
    message: "Habit marked as complete for today",
    habit,
  });
});


// DELETE /api/habits/:id
const deleteHabit = catchAsyncErrors(async (req, res, next) => {
  const habitId = req.params.id;

  const habit = await Habit.findOne({ _id: habitId, user: req.user._id });

  if (!habit) {
    return next(new ErrorHandler("Habit not found or unauthorized", 404));
  }

  // Remove habit from User model
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { habits: habitId }
  });

  // Delete the habit
  await Habit.findByIdAndDelete(habitId);

  res.status(200).json({
    success: true,
    message: "Habit deleted successfully"
  });
});

// GET /api/habits/summary
const getHabitSummary = catchAsyncErrors(async (req, res, next) => {
  const habits = await Habit.find({ user: req.user._id });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let totalHabits = habits.length;
  let completedToday = 0;
  let currentStreaks = 0;
  let maxStreaks = 0;

  habits.forEach(habit => {
    // Check if completed today
    const doneToday = habit.completedDates.some(date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });
    if (doneToday) completedToday++;

    // Track streaks
    if (habit.streak) currentStreaks += habit.streak;
    if (habit.maxStreak) maxStreaks += habit.maxStreak;
  });

  res.status(200).json({
    success: true,
    summary: {
      totalHabits,
      completedToday,
      currentStreaks,
      maxStreaks,
    },
  });
});

module.exports = {
  createHabit,
  getUserHabits,
  updateHabit,
  markHabitComplete,
  deleteHabit,
  getHabitSummary
};
