const express = require('express');
const { createHabit, getUserHabits, updateHabit } = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
// POST /api/habits - Create a habit
router.post('/', protect, createHabit);

// GET /api/habits - Get all habits for the logged-in user
router.get('/', protect, getUserHabits);

// PUT /api/habits/:id - Update a habit
router.put("/:id", protect, updateHabit);

module.exports = router;