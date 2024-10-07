import express from 'express';
import { sendMessage, getConversation, getConversationList } from './controller.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

router.post('/send', protect, sendMessage);
router.get('/conversation/:userId', protect, getConversation);
router.get('/conversations', protect, getConversationList);

export default router;