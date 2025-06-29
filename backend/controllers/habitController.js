const Habit = require('../models/Habit');
const User = require('../models/User');

// Create a new habit
const createHabit = async (req, res) => {
  const { title, description, frequency } = req.body;

  try {
    // Step 1: Create the habit with user ID
    const habit = await Habit.create({
      user: req.user._id,
      title,
      description,
      frequency
    });

    // Step 2: Push the habit ID to user's habits array
    const user = await User.findById(req.user._id);
    user.habits.push(habit._id);
    await user.save();

    res.status(201).json({
      success: true,
      habit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create habit'
    });
  }
};

// Get all habits of the logged-in user
const getUserHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      habits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch habits' });
  }
};

module.exports = {
  createHabit,
  getUserHabits,
};