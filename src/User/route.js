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
  requestPasswordReset
} from './controller.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/password-reset-request', requestPasswordReset);
// router.get('/profile', getProfile); // Assuming authentication middleware is applied
// router.put('/profile', updateProfile); // Assuming authentication middleware is applied
// router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;

