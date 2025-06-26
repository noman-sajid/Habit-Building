const express = require('express');
const { registerUser,
     loginUser,
     logout,
      getProfile
 } = require('../controllers/userController');
 const upload = require('../middleware/multer');
 const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/users/register
router.post('/register', upload.single('avatar'), registerUser);

//Login
router.post('/login', loginUser);

router.get('/logout', logout);

router.route('/profile').get(protect, getProfile);

module.exports = router;
