const express = require('express');
const { registerUser,
     loginUser,
     logout,
      getProfile
 } = require('../controllers/userController');
 const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);
//Login
router.post('/login', loginUser);

router.get('/logout', logout);

router.route('/profile').get(protect, getProfile);

module.exports = router;
