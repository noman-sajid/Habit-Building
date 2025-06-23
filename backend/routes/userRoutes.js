const express = require('express');
const { registerUser,
     loginUser,
      getProfile
 } = require('../controllers/userController');
 const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);
//Login
router.post('/login', loginUser);

router.route('/profile').get(protect, getProfile);

module.exports = router;
