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
const user = await User.findById(req.user._id).populate('habits');


  res.status(200).json({
    success: true,
    user,
  });
};


// PATCH /api/users/update-profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { name } = req.body;

    // Handle avatar change
    if (req.file) {
      // Delete previous avatar from Cloudinary
      if (user.avatar && user.avatar.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      // Upload new avatar
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
      });

      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url
      };
    }

    if (name) user.name = name;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
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

// PATCH /api/users/update-password
// const updatePassword = async (req, res) => {
//   const user = await User.findById(req.user._id).select("+password");

//   const { oldPassword, newPassword, confirmPassword } = req.body;

//   if (!oldPassword || !newPassword || !confirmPassword) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const isPasswordMatched = await user.comparePassword(oldPassword);

//   if (!isPasswordMatched) {
//     return res.status(400).json({ message: 'Old password is incorrect' });
//   }

//   if (newPassword !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   // Hashing is handled by the userSchema pre-save hook
//   user.password = newPassword;
//   await user.save();

//   // 🔔 Send notification email
//   try {
//     const resetLink = `${req.protocol}://${req.get('host')}/api/users/forgot`; // Can be changed to a custom support page
//     const message = `
// Hi ${user.name},

// Your password was recently changed for your account.

// If **you made this change**, no further action is needed.

// If **you did NOT make this change**, click the link below to reset your password immediately:
// ${resetLink}

// If you have any concerns, please contact support.

// Best regards,  
// ${process.env.FROM_NAME}
//     `;

//     await sendEmail({
//       email: user.email,
//       subject: "Security Alert: Password Changed",
//       message
//     });

//   } catch (error) {
//     console.warn("Password updated, but email notification failed:", error.message);
//     // Not throwing error here since the main operation (password update) succeeded
//   }

//   res.status(200).json({
//     success: true,
//     message: 'Password updated successfully',
//   });
// };


const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return res.status(400).json({ success: false, message: "Old password is incorrect" });
  }

  user.password = req.body.newPassword;
  await user.save();

  // Send security email after password change
  const recoveryLink = `${req.protocol}://${req.get("host")}/recover-account?email=${user.email}`;
  const message = `
Your password was recently changed.

If you made this change, no action is required.

If you did NOT authorize this change, click the link below to recover your account:
🔒 ${recoveryLink}

Regards,
The Habit App Team
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Was Changed",
      message,
    });
  } catch (err) {
    console.error("Password change alert failed:", err.message);
    // Still continue, as password update was successful
  }

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};



const requestEmailChange = async (req, res) => {
  const { newEmail, currentPassword } = req.body;

  
  if (!newEmail || !currentPassword) {
    return res.status(400).json({ message: 'New email and current password are required' });
  }

  const normalizedNewEmail = newEmail.toLowerCase();

  // Fetch user and include password
  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Prevent updating to the same email
  if (normalizedNewEmail === user.email.toLowerCase()) {
    return res.status(400).json({ message: 'New email is same as current email' });
  }

  //Check if email is already taken
  const existingUser = await User.findOne({ email: normalizedNewEmail });
  if (existingUser) {
    return res.status(400).json({ message: 'This email is already in use' });
  }

  // Confirm user's password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // Generate token
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

  user.emailChangeToken = hashedToken;
  user.emailChangeExpire = Date.now() + 20 * 60 * 1000; // 20 mins
  user.pendingEmail = normalizedNewEmail;

  await user.save();

  // Send email to new address
  const confirmMessage = `
Hi there,

You requested to change your email address on the Habit App.

To confirm this change, please send a PATCH request to the following backend route:

📡 /api/users/confirm-email/${rawToken}

This link will expire in 20 minutes.

If you did NOT make this request, please ignore this email.

Regards,  
The Habit App Team
`;

  await sendEmail({
    email: normalizedNewEmail,
    subject: 'Confirm Your New Email Address',
    message: confirmMessage
  });

  // Send alert to current email
  const alertMessage = `
⚠️ Heads up!

A request was made to change the email address on your Habit App account to:
📧 ${normalizedNewEmail}

If **you DID NOT** make this request, someone may be trying to take over your account.

To secure your account, reset your password now:
🔐 /api/users/forgot-password

If you DID make this request, no further action is required.

Stay safe,  
The Habit App Team
`;

  await sendEmail({
    email: user.email,
    subject: 'Email Change Alert',
    message: alertMessage
  });

  //Respond success
  res.status(200).json({ success: true, message: 'Confirmation email sent to new address' });
};

module.exports = requestEmailChange;



  module.exports = {
    registerUser,
    loginUser,
    logout,
     getProfile,
     forgotPassword,
     resetPassword,
     updateProfile,
    updatePassword,
    requestEmailChange,
  };

