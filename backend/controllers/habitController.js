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

// PUT /api/habits/:id
const updateHabit = async (req, res) => {
  const habitId = req.params.id;
  const { title, description, frequency } = req.body;

  try {
    let habit = await Habit.findOne({ _id: habitId, user: req.user._id });

    if (!habit) {
      return res.status(404).json({ success: false, message: "Habit not found or unauthorized" });
    }

    // Update fields
    if (title) habit.title = title;
    if (description) habit.description = description;
    if (frequency) habit.frequency = frequency;

    await habit.save();

    res.status(200).json({
      success: true,
      message: "Habit updated successfully",
      habit,
    });
  } catch (error) {
    console.error("Update Habit Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


module.exports = {
  createHabit,
  getUserHabits,
  updateHabit
};