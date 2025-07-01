const express = require('express');
const { registerUser,
     loginUser,
     logout,
     getProfile,
     forgotPassword,
     resetPassword,
     updateProfile
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

router.post('/forgot-password', forgotPassword);

router.put('/reset/:token', resetPassword);

// PATCH /api/users/update-profile
router.patch('/update-profile', protect, upload.single('avatar'), updateProfile);

module.exports = router;
