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
  getDealers
} from './controller.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/register', registerUser);
router.get('/get-dealers', getDealers);
router.post('/login', login);
router.post('/verify-user', verifyUser);
router.post('/password-reset-request', requestPasswordReset);
// router.get('/profile', getProfile); // Assuming authentication middleware is applied
// router.put('/profile', updateProfile); // Assuming authentication middleware is applied
// router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/report', addReport);
router.get('/reports', getReports);

export default router;

