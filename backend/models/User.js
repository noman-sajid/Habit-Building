// const mongoose = require('mongoose');
// const bcrypt = require("bcryptjs");
// const Habit = require('../models/Habit');
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true
//     },
    
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: 6,
//       select: false
//     },
//      avatar: {
//     public_id: {
//       type: String,
//       required: true
//     },
//     url: {
//       type: String,
//       required: true
//     }
//   },
//     habits: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Habit'
//       }
//     ]
//   },
  
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = await bcrypt.hash(this.password, 10);
// });

// // JWT TOKEN
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// // Compare Password

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// // Generating Password Reset Token
// userSchema.add({
//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
//    emailChangeToken: String,
//   emailChangeExpire: Date,
//   pendingEmail: String,
// });

// userSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString('hex');

//   // Hash it before saving to DB
//   this.resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   // Token expires in 15 minutes
//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//   return resetToken;
// };

// module.exports = mongoose.model('User', userSchema);






const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // 🔒 Auto-hidden from queries
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    habits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit',
      },
    ],
    // 🔐 Tokens & security-related
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailChangeToken: String,
    emailChangeExpire: Date,
    pendingEmail: String,
  },
  { timestamps: true }
);

// 🔐 Pre-save password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // ✅ Added return

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 JWT generation
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// 🔑 Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🔐 Reset password token generator
userSchema.methods.getResetPasswordToken = function () {
  const { rawToken, hashedToken } = this.constructor.generateHashedToken();
  this.resetPasswordToken = hashedToken;
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min expiry
  return rawToken;
};

// 🧠 Static reusable token generator (used in email flow too)
userSchema.statics.generateHashedToken = function () {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  return { rawToken, hashedToken };
};

module.exports = mongoose.model('User', userSchema);
