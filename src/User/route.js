import express from 'express';
import multer from 'multer';
import {
  registerUser,
  login,
  // verifyUser,
  // getProfile,
  // updateProfile,
  // forgotPassword,
  resetPassword,
  requestPasswordReset,
  verifyUser,
  addReport,
  getReports,
  getDealers,

  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  updateUserProfile,
  updateDealerInfo,
  updateServicesOffered,
  changePassword,
  connectAccount,
  disconnectAccount,
  getProfile,
  updateProfileImages,
  createUser,
  getUsers,
  updateUserProfileByUserByEmail,
  changePasswordByUserId,
  getLatestUsers
} from './controller.js';
import { getFavoriteVehiclesByUserId, getVehiclesByUserId, toggleFavoriteVehicle } from '../Vehicle/controller.js';
import { protect } from '../Middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();


router.post('/register', registerUser);
router.get('/get-dealers', getDealers);
router.get('/get-users', getUsers);

router.post('/login', login);
router.post('/verify-user', verifyUser);
router.post('/password-reset-request', requestPasswordReset);
router.get('/profile/:userId', getProfile); // Assuming authentication middleware is applied
// router.put('/profile', updateProfile); // Assuming authentication middleware is applied
// router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/report', addReport);
router.get('/reports', getReports);
router.put('/profile',protect, updateUserProfile); // Update user profile
router.put('/profile-update-by-email',updateUserProfileByUserByEmail); // Update user profile
router.put('/dealer-info',protect, updateDealerInfo); // Update dealer information
router.put('/services-offered',protect, updateServicesOffered); // Update services offered
router.put('/change-password',protect, changePassword); // Change user password
router.put('/change-password-by-userId/:userId',changePasswordByUserId); // Change user password
router.post('/connect-account',protect, connectAccount); // Connect account
router.post('/disconnect-account',protect, disconnectAccount); // Disconnect account
router.get('/vehicles-by-user/:userId', getVehiclesByUserId);
router.get('/:userId/favorites', getFavoriteVehiclesByUserId);
router.put('/:vehicleId/toggle-favorite/:userId',  toggleFavoriteVehicle);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);
router.post('/:userId/follow',protect, followUser);
router.post('/:userId/unfollow',protect, unfollowUser);
router.put('/update-profile-images', protect, updateProfileImages);
// router.post('/create', protect, hasPermission('users', 'create'), createUser);
 router.post('/create',  createUser);
router.get('/latest-users', getLatestUsers);

export default router;

