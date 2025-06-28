const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require('../config/cloudinary');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// POST /api/users/register
// const registerUser = async (req, res) => {

//    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//     folder: "avatars",
//     width: 150,
//     crop: "scale",
//   });

//   const { name, email, password } = req.body;

//   try {
//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//      const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     avatar: {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     },
//   });


//     // Create token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '7d'
//     });

//     // Respond with user data (excluding password)
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error during registration' });
//   }
// };

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
      width: 150,
      crop: 'scale'
    });

 


    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url
      }
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


//Post /api/users/login
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//Logout
const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});


// GET /api/users/profile
const getProfile = async (req, res) => {
 const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

// Reset Password

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found with this email' });
  }

  // Get reset token and save to DB
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/api/users/reset/${resetToken}`;
  const message = `You requested a password reset.\n\nClick to reset: ${resetUrl}\n\nIf you didn't request it, ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    // Clean up if email fails
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({ message: 'Email could not be sent' });
  }
};


// PUT /api/users/reset/:token
// const resetPassword = async (req, res, next) => {
//   // Hash the token to compare with DB
//   const resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex');

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });

//   if (!user) {
//     return res.status(400).json({ message: 'Invalid or expired reset token' });
//   }

//   const { password, confirmPassword } = req.body;

//   if (!password || !confirmPassword) {
//     return res.status(400).json({ message: 'Please provide both fields' });
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   // Hash and save new password
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(password, salt);

//   // Clear reset fields
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();

//   // Optionally log user in after reset
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   });

//  res.status(200).cookie('token', token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: 'strict',
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// }).json({
//   success: true,
//   message: 'Password reset successful',
//   token,
//   // For testing only — remove before deployment
//   plainPassword: password
// });

// };

const resetPassword = async (req, res, next) => {
  // Hash the token to compare with DB
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset token' });
  }

  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ message: 'Please provide both fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // ✅ Just assign — Mongoose will hash it via pre-save middleware
  user.password = password;

  // Clear reset fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // Optionally log user in after reset
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(200).cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  }).json({
    success: true,
    message: 'Password reset successful',
    token,
    // 🚨 For testing only — remove this in production!
    plainPassword: password
  });
};



  module.exports = {
    registerUser,
    loginUser,
    logout,
     getProfile,
     forgotPassword,
     resetPassword
  };

