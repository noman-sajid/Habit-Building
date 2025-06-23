const express = require('express');
const { registerUser,
     loginUser
 } = require('../controllers/userController');
 const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);
//Login
router.post('/login', loginUser);

router
  .route('/profile')
  .get(protect, async (req, res) => {
    res.json(req.user); 
  });

module.exports = router;
