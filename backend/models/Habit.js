const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a habit title'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number, // Duration in minutes
    min: [1, 'Duration must be at least 1 minute'],
    default: null,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'custom'],
    default: 'daily',
  },
  completedDates: [
    {
      type: Date,
    },
  ],
  streak: {
    type: Number,
    default: 0,
  },
  maxStreak: {
    type: Number,
    default: 0,
  },
  lastCompleted: {
    type: Date,
  },
  emoji: {
    type: String,
    trim: true,
    default: '🌱', // Optional default emoji
  },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
