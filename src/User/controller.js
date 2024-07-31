import asyncHandler from 'express-async-handler';
import User from "./model.js"
import responses from "../Utils/response.js";
import generateToken from '../Utils/generateToken.js';
import  sendVerificationEmail  from '../Utils/sendEmail.js';

// const { sendVerificationEmail } = require('../utils/sendEmail');
import { registerValidation, loginValidation } from '../Validations/authValidation.js';


// User Registration
const registerUser = asyncHandler(async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return responses.badRequest(res, error.details[0].message);

  if (await User.findOne({ email: req.body.email })) {
    return responses.conflict(res, 'User already exists');
  }

  const user = await User.create(req.body);
  if (!user) {
    return responses.badRequest(res, 'Invalid user data');
  }

  user.verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
  await user.save();
  await sendVerificationEmail(user.email, user.verificationCode);

  return responses.created(res, 'Verification code sent to your email address', {});
});


// User Authentication
const login = asyncHandler(async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return responses.badRequest(res, error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return responses.ok(res, 'User authenticated successfully', {
      user,
      token: generateToken(user._id),
    });
  } else {
    return responses.unauthorized(res, 'Invalid email or password');
  }
});

// Verify User

const verifyUser = asyncHandler(async (req, res) => {
  const { userId, code } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  if (user.verificationCode === code) {
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    return responses.ok(res, 'User verified successfully');
  } else {
    return responses.badRequest(res, 'Invalid verification code');
  }
});



// Password Reset Request
const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const resetToken = generateToken(user._id);
    await sendVerificationEmail(user.email, `Your password reset token is ${resetToken}`);
    res.status(200).json({ message: 'Password reset token sent to email' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findById(userId);

  if (user) {
    user.password = password;
    await user.save();
    return responses.ok(res, 'Password reset successfully');
  } else {
    return responses.notFound(res, 'User not found');
  }
});

export {
  registerUser,
  login,
  verifyUser,
  requestPasswordReset,
  resetPassword,
};
