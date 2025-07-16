const express = require('express');
const {
  createHabit,
  getUserHabits,
  updateHabit,
  markHabitComplete,
  deleteHabit,
  getHabitSummary
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/habits - Create a new habit
router.post('/', protect, createHabit);

// GET /api/habits - Get all habits for the logged-in user
router.get('/', protect, getUserHabits);

// PUT /api/habits/:id - Update a habit
router.put('/:id', protect, updateHabit);

// PATCH /api/habits/:id/complete - Mark a habit as complete
router.patch('/:id/complete', protect, markHabitComplete);

// DELETE /api/habits/:id - Delete a habit
router.delete('/:id', protect, deleteHabit);

// GET /api/habits/summary - Get habit summary
router.get('/summary', protect, getHabitSummary);

module.exports = router;
