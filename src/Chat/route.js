import express from 'express';
import { getConversationsList, getMessages, markMessagesAsRead } from './controller.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

router.get('/conversations', protect, getConversationsList);
router.get('/messages/:otherUserId',protect,  getMessages);
router.put('/messages/:otherUserId/read',  markMessagesAsRead);

export default router;