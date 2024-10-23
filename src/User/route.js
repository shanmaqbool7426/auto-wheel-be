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
  getProfile
} from './controller.js';
import { deleteFavoriteVehicle, getFavoriteVehiclesByUserId, getVehiclesByUserId } from '../Vehicle/controller.js';
import { protect } from '../Middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();


router.post('/register', registerUser);
router.get('/get-dealers', getDealers);

router.post('/login', login);
router.post('/verify-user', verifyUser);
router.post('/password-reset-request', requestPasswordReset);
router.get('/profile',protect, getProfile); // Assuming authentication middleware is applied
// router.put('/profile', updateProfile); // Assuming authentication middleware is applied
// router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/report', addReport);
router.get('/reports', getReports);
router.put('/profile',protect, updateUserProfile); // Update user profile
router.put('/dealer-info',protect, updateDealerInfo); // Update dealer information
router.put('/services-offered',protect, updateServicesOffered); // Update services offered
router.put('/change-password',protect, changePassword); // Change user password
router.post('/connect-account',protect, connectAccount); // Connect account
router.post('/disconnect-account',protect, disconnectAccount); // Disconnect account
router.get('/vehicles-by-user/:userId', getVehiclesByUserId);
router.get('/:userId/favorites', getFavoriteVehiclesByUserId);
router.put('/favorites/:userId/:vehicleId', deleteFavoriteVehicle);

router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);
router.post('/:userId/follow', followUser);
router.post('/:userId/unfollow', unfollowUser);

export default router;

