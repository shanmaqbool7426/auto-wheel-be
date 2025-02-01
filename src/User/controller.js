import asyncHandler from 'express-async-handler';
import crypto from "crypto"
import bcrypt from "bcryptjs"
import User from "./model.js"
import responses from "../Utils/response.js";
import generateToken from '../Utils/generateToken.js';
import sendVerificationEmail from '../Utils/sendEmail.js';
import { verifyGoogleToken, verifyFacebookToken } from '../Utils/socialAuthVerify.js';

// const { sendVerificationEmail } = require('../utils/sendEmail');
import { registerValidation, loginValidation } from '../Validations/authValidation.js';
import { otpTemplete } from '../Views/otpTemplete.js';
import Role from '../Roles/model.js';


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

  // await sendVerificationEmail(mailOptions);

  return responses.created(res, 'Verification code sent to your email address', user.verificationCode);
});


const login = asyncHandler(async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return responses.badRequest(res, error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    return responses.ok(res, 'User authenticated successfully', {
      user,
      token: generateToken(user._id),
    });
  } else {
    return responses.unauthorized(res, 'Invalid email or password');
  }
});

const socialLogin = asyncHandler(async (req, res) => {
  const { provider, accessToken, email } = req.body;

  try {
    let verifiedData;

    // Verify token based on provider
    switch (provider) {
      case 'google':
        verifiedData = await verifyGoogleToken(accessToken);
        break;
      case 'facebook':
        verifiedData = await verifyFacebookToken(accessToken);
        break;
      default:
        return responses.badRequest(res, 'Invalid provider');
    }

    // Verify email matches
    if (email !== verifiedData.email) {
      return responses.unauthorized(res, 'Invalid credentials');
    }

    // Check if user exists
    let user = await User.findOne({ email: verifiedData.email });
    
    if (user) {
      // Update existing user
      if (!user.loginType.includes(provider)) {
        user.loginType.push(provider);
      }

      // Update profile image if not already set
      if (verifiedData.picture && !user.profileImage) {
        user.profileImage = verifiedData.picture;
      }

      // Update last login
      user.lastLogin = new Date();
      
      await user.save();

      // Generate JWT token
      const token = generateToken(user._id);

      return responses.ok(res, 'Login successful', {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profileImage: user.profileImage,
          loginType: user.loginType,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin
        },
        token
      });
    } else {
      // Create new user
      const names = verifiedData.name.split(' ');
      const firstName = names[0];
      const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

      // Create new user
      const newUser = await User.create({
        firstName,
        lastName,
        email: verifiedData.email,
        profileImage: verifiedData.picture,
        loginType: [provider],
        isVerified: true, // Social login users are automatically verified
        password: crypto.randomBytes(16).toString('hex'), // Random password for social users
        lastLogin: new Date()
      });

      // Generate JWT token
      const token = generateToken(newUser._id);

      return responses.created(res, 'Account created successfully', {
        user: {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          profileImage: newUser.profileImage,
          loginType: newUser.loginType,
          isVerified: newUser.isVerified,
          createdAt: newUser.createdAt,
          lastLogin: newUser.lastLogin
        },
        token
      });
    }

  } catch (error) {
    console.error('Social login error:', error);
    return responses.unauthorized(res, error.message);
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phoneNumber, email, showEmail, whatsAppOnThisNumber } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  // user.email = email || user.email; // Ensure email is updated if provided
  user.phone = phoneNumber || user.phone; // Update phone number
  user.showEmail = showEmail !== undefined ? showEmail : user.showEmail; // Update showEmail if provided
  user.hasWhatsApp = whatsAppOnThisNumber !== undefined ? whatsAppOnThisNumber : user.whatsAppOnThisNumber; // Update WhatsApp status
  await user.save(); // Save the updated user information
  const userData = await User.findById(req.user._id);
  return responses.ok(res, 'User profile updated successfully', userData); // Return success response
});

const updateUserProfileByUserByEmail = asyncHandler(async (req, res) => {
  const { firstName, lastName, phoneNumber, email, showEmail, whatsAppOnThisNumber,role } = req.body;

  const user = await User.findOne({email}).populate();
  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  console.log('>>>>>> firstName',firstName,lastName)
  user.firstName = firstName || user.firstName;
  user.role = role || user.role;
  user.lastName = lastName || user.lastName;
  // user.email = email || user.email; // Ensure email is updated if provided
  user.phone = phoneNumber || user.phone; // Update phone number
  user.showEmail = showEmail !== undefined ? showEmail : user.showEmail; // Update showEmail if provided
  user.hasWhatsApp = whatsAppOnThisNumber !== undefined ? whatsAppOnThisNumber : user.whatsAppOnThisNumber; // Update WhatsApp status
  await user.save(); // Save the updated user information
  const userData = await User.findById(user._id);
console.log('userData',userData)
  return responses.ok(res, 'User profile updated successfully', userData); // Return success response
});
const updateDealerInfo = asyncHandler(async (req, res) => {
  const { dealerName, licenseNumber, location, workingHours } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return responses.notFound(res, 'User not found');
    }

    // Update basic dealer information
    user.dealerName = dealerName || user.dealerName;
    user.licenseNumber = licenseNumber || user.licenseNumber;
    user.locationAddress = location || user.locationAddress;

    // Update working hours if provided
    if (workingHours) {
      // First, validate the working hours structure
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const validWorkingHours = {};

      for (const day of days) {
        if (workingHours[day]) {
          validWorkingHours[day] = {
            isOpen: workingHours[day].isOpen || false,
            start: workingHours[day].isOpen ? workingHours[day].start : null,
            end: workingHours[day].isOpen ? workingHours[day].end : null,
          };
        }
      }

      user.workingHours = validWorkingHours;
    }

    await user.save();
    return responses.ok(res, 'Dealer information updated successfully', user);
  } catch (error) {
    console.error('Error updating dealer information:', error);
    return responses.serverError(res, 'Error updating dealer information');
  }
});

const updateServicesOffered = asyncHandler(async (req, res) => {
  const { servicesOffered } = req.body; // Expecting an array of services

  const user = await User.findById(req.user._id);
  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  // Update services offered
  user.servicesOffered = servicesOffered; // Replace existing services with new ones

  await user.save();
  return responses.ok(res, 'Services offered updated successfully', user.servicesOffered);
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Ensure req.user is defined
    if (!req.user || !req.user._id) {
      return responses.unauthorized(res, 'User not authenticated');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return responses.notFound(res, 'User not found');
    }

    // Check if the current password matches
    const isMatch = await user.matchPassword(currentPassword);
    console.log('Password match:', isMatch); // Log the result of password match

    if (!isMatch) {
      return responses.unauthorized(res, 'Current password is incorrect');
    }

    // Update the password
    user.password = newPassword; // Set the new password
    await user.save(); // Save the user

    return responses.ok(res, 'Password changed successfully');
  } catch (error) {
    console.error('Error changing password:', error);
    return responses.serverError(res, 'An error occurred while changing the password');
  }
});

const changePasswordByUserId = asyncHandler(async (req, res) => {
  try {
    const { currentPassword, newPassword} = req.body;

const userId = req.params.userId;
    const user = await User.findById(userId);
    console.log('User found:', user); // Log the user object

    if (!user) {
      return responses.notFound(res, 'User not found');
    }

    // Check if the current password matches
    const isMatch = await user.matchPassword(currentPassword);
    console.log('Password match:', isMatch); // Log the result of password match

    if (!isMatch) {
      return responses.unauthorized(res, 'Current password is incorrect');
    }

    // Update the password
    user.password = newPassword; // Set the new password
    await user.save(); // Save the user

    return responses.ok(res, 'Password changed successfully');
  } catch (error) {
    console.error('Error changing password:', error);
    return responses.serverError(res, 'An error occurred while changing the password');
  }
});

const updateProfileImages = asyncHandler(async (req, res) => {
  try {
    const { profileImage, bannerImage } = req.body;
    
    if (!req.user || !req.user._id) {
      return responses.unauthorized(res, 'User not authenticated');
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return responses.notFound(res, 'User not found');
    }
    // Update images if provided
    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }
    if (bannerImage !== undefined) {
      user.bannerImage = bannerImage;
    }
    await user.save();
    return responses.ok(res, 'Profile images updated successfully', {
      profileImage: user.profileImage,
      bannerImage: user.bannerImage
    });
  } catch (error) {
    console.error('Error updating profile images:', error);
    return responses.serverError(res, 'An error occurred while updating profile images');
  }
});

const connectAccount = asyncHandler(async (req, res) => {
  const { loginType } = req.body; // e.g., Google, Facebook, etc.

  const user = await User.findById(req.user._id);
  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  if (!user.loginType.includes(loginType)) {
    user.loginType.push(loginType);
    await user.save();
    return responses.ok(res, 'Account connected successfully');
  } else {
    return responses.badRequest(res, 'Account already connected');
  }
});

const disconnectAccount = asyncHandler(async (req, res) => {
  const { loginType } = req.body; // e.g., Google, Facebook, etc.

  const user = await User.findById(req.user._id);
  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  user.loginType = user.loginType.filter(type => type !== loginType);
  await user.save();
  return responses.ok(res, 'Account disconnected successfully');
});

const getProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    // Ensure req.user is defined
    // if (!req.user || !req.user._id) {
    //   return responses.unauthorized(res, 'User not authenticated');
    // }

    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select('-password'); // Exclude password from the response

    if (!user) {
      return responses.notFound(res, 'User not found');
    }

    return responses.ok(res, 'User profile retrieved successfully', user);
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    return responses.serverError(res, 'An error occurred while retrieving the user profile');
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  console.log('<,,,,',email, otp)

  const user = await User.findOne({email:email});
  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  if (1234 === otp) {
    user.isVerified = true;
    user.verificationCodea = null;
    const token = generateToken(user._id);

    await user.save();
    // generateToken(user._id)
    console.log('user>>>>>>>>>',user,email, otp,user)
    return responses.ok(res, 'User verified successfully',{user,token});
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


const getDealers = asyncHandler(async (req, res) => {
  const { location, sort, page = 1, limit = 10, type } = req.query; // Added type parameter
  let query = { accountType: 'Dealer' };

  if (location) query.location = { $regex: location, $options: 'i' };
  if (type && type.toLowerCase() !== 'all') query.type = type.toLowerCase(); // Add type to the query if provided

  let sortOption = {};
  if (sort === 'rating') {
    sortOption = { rating: -1 };
  } else if (sort === 'ads') {
    sortOption = { adsCount: -1 };
  }

  const dealers = await User.find(query)
    .sort(sortOption)
    .select('fullName rating phone location reviewCount adsCount')
    .skip((page - 1) * limit) // Skip the records for pagination
    .limit(Number(limit)); // Limit the number of records returned

  const totalDealers = await User.countDocuments(query); // Get total count for pagination
  const totalPages = Math.ceil(totalDealers / limit); // Calculate total pages

  return responses.ok(res, 'Dealers fetched successfully', {
    dealers,
    totalPages,
    currentPage: Number(page),
  });
});


const getFollowing = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user._id;
  const { page = 1, limit = 10, search = '' } = req.query;
  const skip = (page - 1) * limit;

  const user = await User.findById(userId);
  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  const query = {
    _id: { $in: user.following },
    $or: [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ]
  };

  const followings = await User.find(query)
    .select('fullName email accountType city createdAt')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await User.countDocuments(query);

  return responses.ok(res, 'Followers retrieved successfully', {
    followings,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit)
  });
});

const getFollowers = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user._id;
  const { page = 1, limit = 10, search = '' } = req.query;
  const skip = (page - 1) * limit;

  const user = await User.findById(userId);
  if (!user) {
    return responses.notFound(res, 'User not found');
  }

  const query = {
    _id: { $in: user.followers },
    $or: [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ]
  };

  const followers = await User.find(query)
    .select('fullName email accountType city createdAt')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await User.countDocuments(query);

  return responses.ok(res, 'Followers retrieved successfully', {
    followers,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit)
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const { 
    search, 
    accountType, 
    roles, // Can be single role or comma-separated roles
    sort = 'createdAt', 
    page = 1, 
    limit = 10,
    isActive 
  } = req.query;

  // Build query object
  let query = {};

  // Add search functionality across multiple fields
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }

  // Filter by account type
  if (accountType) {
    query.accountType = accountType;
  }

  // Filter by roles
  if (roles) {
    const roleArray = roles.split(',').map(role => role.trim());
    // Find role IDs from role names
    const roleDocuments = await Role.find({ name: { $in: roleArray } });
    const roleIds = roleDocuments.map(role => role._id);
    query.roles = { $in: roleIds };
  }

  // Filter by active status
  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  // Build sort options
  let sortOption = {};
  switch (sort) {
    case 'name':
      sortOption = { firstName: 1, lastName: 1 };
      break;
    case 'email':
      sortOption = { email: 1 };
      break;
    case 'createdAt':
      sortOption = { createdAt: -1 };
      break;
    case 'role':
      sortOption = { roles: 1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  try {
    // Execute query with population of roles
    const users = await User.find(query)
      .populate('roles', 'name') // Populate roles with just the name field
      .sort(sortOption)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    // Get all available roles for filters
    const availableRoles = await Role.find().select('name');

    return responses.ok(res, 'Users fetched successfully', {
      users,
      totalUsers,
      totalPages,
      currentPage: Number(page),
      filters: {
        availableRoles: availableRoles.map(role => role.name),
        accountTypes: ['Individual', 'Dealer', 'Admin'] // Add your actual account types
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return responses.serverError(res, 'Error fetching users');
  }
});



const followUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = req.user._id;

    // Validate if user is trying to follow themselves
    if (userId === currentUser.toString()) {
      return responses.badRequest(res, 'You cannot follow yourself');
    }

    // Find both users
    let user, userToFollow;
    try {
      [user, userToFollow] = await Promise.all([
        User.findById(currentUser),
        User.findById(userId)
      ]);
    } catch (error) {
      console.error('Database query error:', error);
      return responses.badRequest(res, 'Error fetching user data');
    }

    // Validate if users exist
    if (!user) {
      return responses.notFound(res, 'Current user not found');
    }

    if (!userToFollow) {
      return responses.notFound(res, 'User to follow not found');
    }
console.log('>>>>>>>>',user)
    // Check if already following
    if (user.following.includes(userId)) {
      return responses.badRequest(res, 'You are already following this user');
    }

    // Update following/followers
    try {
      user.following.push(userId);
      userToFollow.followers.push(currentUser);

      await Promise.all([user.save(), userToFollow.save()]);

      return responses.ok(res, 'User followed successfully', {
        followingCount: user.following.length,
        followersCount: userToFollow.followers.length
      });
    } catch (error) {
      console.error('Error updating follow relationship:', error);
      return responses.serverError(res, 'Failed to update follow relationship');
    }

  } catch (error) {
    console.error('Follow user error:', error);
    return responses.serverError(res, 'An unexpected error occurred',error);
  }
});

const unfollowUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user._id;

  

  if (userId === currentUser.toString()) {
    return responses.badRequest(res, 'You cannot unfollow yourself');
  }

  const [user, userToUnfollow] = await Promise.all([
    User.findById(currentUser),
    User.findById(userId)
  ]);

  if (!userToUnfollow) {
    return responses.notFound(res, 'User to unfollow not found');
  }

  if (!user.following.includes(userId)) {
    return responses.badRequest(res, 'You are not following this user');
  }

  user.following = user.following.filter(id => id.toString() !== userId);
  userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUser.toString());

  await Promise.all([user.save(), userToUnfollow.save()]);

  return responses.ok(res, 'User unfollowed successfully');
});



export const createUser = asyncHandler(async (req, res) => {
  try {
      const { firstName, lastName, email, role } = req.body;

      // Validate input
      if (!firstName || !lastName || !email || !role) {
          return responses.badRequest(res, 'Please provide all required fields');
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return responses.conflict(res, 'Email already registered');
      }

      // [ {
      //   name: 'Administrator',
      //   totalUsers: 5,
      //   permissions: [Object],
      //   capabilities: [Array],
      //   isActive: true
      // },]
      
      // Get role ID from role name
      // const userRole = await Role.findOne({ });
      // console.log('>>>userRole',userRole)
      // userRole.filter(role=>role.name===role)
      // if (!userRole) {
      //     return responses.badRequest(res, 'Invalid role specified');
      // }

      // Generate random password
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash('12345678', 10);


      // Create user
      const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          roles: role,
          isActive: true
      });

      console.log('>>>user',user)
      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      // Send email with credentials
      const emailTemplate = `
          Hello ${firstName} ${lastName},
          
          Your account has been created on AutoWheels.pk
          
          Your login credentials:
          Email: ${email}
          Temporary Password: ${tempPassword}
          
          Please change your password after first login.
          
          Best regards,
          AutoWheels Team
      `;

      // await sendEmail({
      //     to: email,
      //     subject: 'Welcome to AutoWheels - Your Account Details',
      //     text: emailTemplate
      // });

      return responses.ok(res, 'User created successfully', {
          user: userResponse,
          passwordSent: true
      });

  } catch (error) {
      console.error('Create user error:', error);
      return responses.error(res, 'Error creating user');
      // return responses.error(res, 'Error creating user');
  }
});

// Get latest users
const getLatestUsers = asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;

  const latestUsers = await User.find({ 
    isActive: true 
  })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .select('fullName email accountType city createdAt profileImage followers activeAds pendingAds')
    .lean();

  responses.ok(res, 'Latest users fetched successfully', latestUsers);
});

export {
  registerUser,
  socialLogin,
  login,
  getProfile,
  updateUserProfile,
  updateDealerInfo,
  updateServicesOffered,
  changePassword,
  connectAccount,
  disconnectAccount,
  addReport,
  getReports,
  verifyUser,
  requestPasswordReset,
  resetPassword,
  getDealers,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getUsers,
  updateProfileImages,
  updateUserProfileByUserByEmail,
  changePasswordByUserId,
  getLatestUsers
};
