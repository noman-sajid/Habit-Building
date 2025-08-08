const express = require('express');
const { registerUser,
     loginUser,
     logout,
     getProfile,
     forgotPassword,
     resetPassword,
     updateProfile,
     updatePassword,
     requestEmailChange,
     confirmEmailChange,
     googleLogin,
} = require('../controllers/userController');
const upload = require('../middleware/multer');
const { protect } = require('../middleware/authMiddleware');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

// POST /api/users/register
router.post('/register', upload.single('avatar'), registerUser);

// Google Login
router.post('/google-login', googleLogin);

//Login
router.post('/login', loginUser);

router.get('/logout', logout);

router.route('/profile').get(protect, getProfile);

router.post('/forgot-password', forgotPassword);

router.put('/reset/:token', resetPassword);

// PATCH /api/users/update-profile
router.patch('/update-profile', protect, upload.single('avatar'), updateProfile);

// PATCH /api/users/update-password
router.patch('/update-password', protect, updatePassword);

// PATCH /api/users/request-email-change
router.patch('/request-email-change', protect, requestEmailChange);

// PATCH /api/users/confirm-email-change
router.patch('/confirm-email/:token', confirmEmailChange);

router.get('/auth/check', isAuthenticated, (req, res) => {
  if (req.user) {
    return res.status(200).json({ authenticated: true });
  } else {
    return res.status(200).json({ authenticated: false });
  }
});


module.exports = router;
