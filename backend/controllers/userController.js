const User = require('../models/User');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require('../config/cloudinary');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // POST /api/users/register
// const registerUser = catchAsyncErrors(async (req, res, next) => {
//    console.log(req.body);
//   const { name, email, password } = req.body;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return next(new ErrorHander("User already exists", 400));
//   }

//   const result = await cloudinary.uploader.upload(req.file.path, {
//     folder: 'avatars',
//     width: 150,
//     crop: 'scale'
//   });

//   const user = await User.create({
//     name,
//     email,
//     password,
//     avatar: {
//       public_id: result.public_id,
//       url: result.secure_url
//     }
//   });

//   sendToken(user, 201, res);
// });



const registerUser = catchAsyncErrors(async (req, res, next) => {


  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.warn("⚠ User already exists:", email);
    return next(new ErrorHander("User already exists", 400));
  }

  if (!req.file) {
    console.error("❌ No avatar file uploaded!");
    return next(new ErrorHander("Avatar is required", 400));
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'avatars',
    width: 150,
    crop: 'scale'
  });

  console.log("✅ Cloudinary upload success:", result);

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url
    }
  });

  
  sendToken(user, 201, res);
});


// Login with Google
const googleLogin = async (req, res) => {
  const { credential } = req.body;

  try {
    // 1. Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    if (!email) {
      return res.status(400).json({ success: false, message: "Google token did not return email." });
    }

    // 2. Check if user already exists
    let user = await User.findOne({ email });

    // 3. If not, create user
    if (!user) {
      // Upload Google profile picture to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(picture, {
        folder: "avatars",
      });

      user = await User.create({
        name,
        email,
        googleId,
        avatar: {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        },
        password: jwt.sign({ email }, process.env.JWT_SECRET), // dummy password
      });
    }

    // 4. Send token using consistent utility
    sendToken(user, 200, res);

  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ success: false, message: "Google login failed" });
  }
};


//Post /api/users/login
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Please enter both email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Email not found", 401)); // 👈 Specific message
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Incorrect password", 401)); // 👈 Specific message
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
// const getProfile = catchAsyncErrors(async (req, res, next) => {
//    console.log('[getProfile] Authenticated user ID:', req.user._id);
//   const user = await User.findById(req.user._id).populate('habits');
//     console.log('[getProfile] Returning user:', user?.email || 'Not found');
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });




// GET /api/users/profile
// controllers/userController.js

const getProfile = catchAsyncErrors(async (req, res, next) => {
  // If req.user doesn't exist (unauthenticated), return null without error
  if (!req.user) {
    return res.status(200).json({ user: null });
  }

  const user = await User.findById(req.user._id).populate('habits');

  res.status(200).json({
    user,
  });
});




// PATCH /api/users/update-profile
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
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
});

// Reset Password

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHander("Incorrect Email!", 404));
  }

  // Get reset token and save to DB
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
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

    return next(new ErrorHander("Email could not be sent", 500));
  }
});


// PUT /api/users/reset/:token
// const resetPassword = catchAsyncErrors(async (req, res, next) => {
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
//     return next(new ErrorHander("Invalid or expired reset token", 400));
//   }

//   const { password, confirmPassword } = req.body;

//   if (!password || !confirmPassword) {
//     return next(new ErrorHander("Please provide both fields", 400));
//   }

//   if (password !== confirmPassword) {
//     return next(new ErrorHander("Passwords do not match", 400));
//   }

//   // ✅ Just assign — Mongoose will hash it via pre-save middleware
//   user.password = password;

//   // Clear reset fields
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();

//   sendToken(user, 200, res);
// });

const resetPassword = catchAsyncErrors(async (req, res, next) => {
  console.log('[BACKEND] Raw token from params:', req.params.token);

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  console.log('[BACKEND] Hashed token for DB lookup:', resetPasswordToken);

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    console.warn('[BACKEND] No matching user for token or token expired');
    return next(new ErrorHander("Invalid or expired reset token", 400));
  }

  const { password, confirmPassword } = req.body;
  console.log('[BACKEND] Passwords received:', { password, confirmPassword });

  if (!password || !confirmPassword) {
    return next(new ErrorHander("Please provide both fields", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHander("Passwords do not match", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  console.log('[BACKEND] Password reset successful. Sending token...');
  sendToken(user, 200, res);
});



// PATCH /api/users/update-password
// const updatePassword = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user._id).select("+password");

//   const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
//   if (!isPasswordMatched) {
//     return next(new ErrorHander("Old password is incorrect", 400));
//   }

//   user.password = req.body.newPassword;
//   await user.save();

//   // Send security email after password change
//   const recoveryLink = `${req.protocol}://${req.get("host")}/recover-account?email=${user.email}`;
//   const message = `\nYour password was recently changed.\n\nIf you made this change, no action is required.\n\nIf you did NOT authorize this change, click the link below to recover your account:\n🔒 ${recoveryLink}\n\nRegards,\nThe Habit App Team\n  `;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Your Password Was Changed",
//       message,
//     });
//   } catch (err) {
//     console.error("Password change alert failed:", err.message);
//     // Still continue, as password update was successful
//   }

//   res.status(200).json({
//     success: true,
//     message: "Password updated successfully",
//   });
// });


const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ErrorHander("Old and new password fields are required", 400));
  }

  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  user.password = newPassword;
  await user.save();

  // Send security email after password change
  const normalizedEmail = user.email.toLowerCase();
  const recoveryLink = `${req.protocol}://${req.get("host")}/recover-account?email=${encodeURIComponent(normalizedEmail)}`;

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
      email: normalizedEmail,
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
});



// PATCH /api/users/request-email-change
const requestEmailChange = catchAsyncErrors(async (req, res, next) => {
  const { newEmail, currentPassword } = req.body;

  
  if (!newEmail || !currentPassword) {
    return next(new ErrorHander("New email and current password are required", 400));
  }

  const normalizedNewEmail = newEmail.toLowerCase();

  // Fetch user and include password
  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Prevent updating to the same email
  if (normalizedNewEmail === user.email.toLowerCase()) {
    return next(new ErrorHander("New email is same as current email", 400));
  }

  //Check if email is already taken
  const existingUser = await User.findOne({ email: normalizedNewEmail });
  if (existingUser) {
    return next(new ErrorHander("This email is already in use", 400));
  }

  // Confirm user's password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new ErrorHander("Incorrect password", 401));
  }

  // Generate token
  const { rawToken, hashedToken } = User.generateHashedToken();


  user.emailChangeToken = hashedToken;
  user.emailChangeExpire = Date.now() + 20 * 60 * 1000; // 20 mins
  user.pendingEmail = normalizedNewEmail;

  await user.save();

  // Send email to new address
  const confirmMessage = `\nHi there,\n\nYou requested to change your email address on the Habit App.\n\nTo confirm this change, please send a PATCH request to the following backend route:\n\n📡 /api/users/confirm-email/${rawToken}\n\nThis link will expire in 20 minutes.\n\nIf you did NOT make this request, please ignore this email.\n\nRegards,  \nThe Habit App Team\n`;

  await sendEmail({
    email: normalizedNewEmail,
    subject: 'Confirm Your New Email Address',
    message: confirmMessage
  });

  // Send alert to current email
  const alertMessage = `\n⚠️ Heads up!\n\nA request was made to change the email address on your Habit App account to:\n📧 ${normalizedNewEmail}\n\nIf **you DID NOT** make this request, someone may be trying to take over your account.\n\nTo secure your account, reset your password now:\n🔐 /api/users/forgot-password\n\nIf you DID make this request, no further action is required.\n\nStay safe,  \nThe Habit App Team\n`;

  await sendEmail({
    email: user.email,
    subject: 'Email Change Alert',
    message: alertMessage
  });

  //Respond success
  res.status(200).json({ success: true, message: 'Confirmation email sent to new address' });
});



// PATCH /api/users/confirm-email/:token
const confirmEmailChange = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(new ErrorHander("Token is required", 400));
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    emailChangeToken: hashedToken,
    emailChangeExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHander("Invalid or expired token", 400));
  }

  if (!user.pendingEmail) {
    return next(new ErrorHander("No pending email change found", 400));
  }

  const oldEmail = user.email;
  const newEmail = user.pendingEmail;

  // Update the email
  user.email = newEmail;
  user.pendingEmail = undefined;
  user.emailChangeToken = undefined;
  user.emailChangeExpire = undefined;

  await user.save();

  // 📩 Send confirmation email to new address
  const message = `\n🎉 Your email address has been successfully changed!\n\n🔐 New Email: ${newEmail}\n\nIf you did NOT authorize this change, reset your password immediately by visiting the forgot-password route.\n\nRegards,  \nThe Habit App Team\n  `;

  try {
    await sendEmail({
      email: newEmail,
      subject: 'Email Address Successfully Updated',
      message,
    });
  } catch (err) {
    console.error('Failed to send confirmation email:', err.message);
    // Still proceed, as the change was successful
  }

  res.status(200).json({
    success: true,
    message: 'Email address successfully updated and confirmation sent',
    updatedEmail: user.email,
  });
});




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
    confirmEmailChange,
    googleLogin,
};