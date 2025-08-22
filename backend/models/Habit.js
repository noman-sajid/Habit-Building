const mongoose = require('mongoose');
const User = require('./User.js'); // ⬅️ make sure the path is correct

const habitSchema = new mongoose.Schema(
  {
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
    timeRange: {
      start: {
        type: String, // e.g., "07:00"
        required: false,
      },
      end: {
        type: String, // e.g., "08:00"
        required: false,
      },
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'custom'],
      default: 'daily',
    },
    customDays: {
      type: [String], // For custom frequency (Mon, Tue, etc.)
      default: [],
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
      default: '🌱',
    },
    goal: {
      type: Number,
      min: [1, 'Goal must be at least 1'],
      default: null,
    },
    progress: {
      type: Number,
      default: 0,
    },
    goalAchieved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Hook: after saving a habit, push its ID into the user's habits array
habitSchema.post("save", async function (doc, next) {
  try {
    await User.findByIdAndUpdate(doc.user, {
      $addToSet: { habits: doc._id }, // addToSet avoids duplicates
    });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Habit', habitSchema);
