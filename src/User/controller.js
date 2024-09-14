import asyncHandler from 'express-async-handler';
import crypto from "crypto"
import bcrypt from "bcryptjs"
import User from "./model.js"
import responses from "../Utils/response.js";
import generateToken from '../Utils/generateToken.js';
import sendVerificationEmail from '../Utils/sendEmail.js';

// const { sendVerificationEmail } = require('../utils/sendEmail');
import { registerValidation, loginValidation } from '../Validations/authValidation.js';
import { otpTemplete } from '../Views/otpTemplete.js';


const registerUser = asyncHandler(async (req, res) => {
  // console.log('registerUser', req.body)
  // const { error } = registerValidation(req.body);
  // if (error) return responses.badRequest(res, error.details[0].message);

  if (await User.findOne({ email: req.body.email })) {
    return responses.conflict(res, 'User already exists');
  }

  const user = await User.create(req.body);
  if (!user) {
    return responses.badRequest(res, 'Invalid user data');
  }

  user.verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
  await user.save();

  const templete= otpTemplete(user.verificationCode)
  const mailOptions = {
    to: user.email, subject: 'Verification Code', text: templete
  }
  await sendVerificationEmail(mailOptions);

  return responses.created(res, 'Verification code sent to your email address', {});
});


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


const verifyUser = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  console.log('<,,,,',email, otp)

  const user = await User.findOne({email:email});
  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  if (user.verificationCode === otp) {
    user.isVerified = true;
    user.verificationCodea = null;
    await user.save();
    console.log('user>>>>>>>>>',user,email, otp,user)
    return responses.ok(res, 'User verified successfully',user);
  } else {
    return responses.ok(res, 'User verified successfully',user);
  }
});



const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return responses.notFound(res, 'User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = await bcrypt.hash(resetToken, 10);

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();
    

    const resetLink = `http://yourdomain.com/reset-password/${resetToken}`;
    const mailOptions = {
      to: 'johandosea@mailinator.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    ${resetLink}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await sendVerificationEmail(mailOptions);
    console.log('aaaaaaaaaaaaaa')
    responses.ok(res, "Password reset link sent to email")
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

    const user = await User.findOne({
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.badRequest(res,'Password reset token is invalid or has expired');
    }

    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isTokenValid) {
      return res.badRequest(res,'Password reset token is invalid or has expired');
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    responses.ok(res,'Password has been reset');
});


const addReport = asyncHandler(async (req, res) => {
  // const { error } = addReportValidation(req.body);
  // if (error) return responses.badRequest(res, error.details[0].message);

  const { vehicleId, reason } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return responses.notFound(res, 'User not found');

  await user.reports.push(vehicleId, reason);
  user.save()
  return responses.ok(res, 'Report added successfully');
});


const getReports = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return responses.notFound(res, 'User not found');

  const reports = await user.getReports();

  return responses.ok(res, 'Reports retrieved successfully', reports);
});


export {
  registerUser,
  login,
  addReport,
  getReports,
  verifyUser,
  requestPasswordReset,
  resetPassword,
};
