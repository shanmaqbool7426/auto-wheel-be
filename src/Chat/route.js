import express from 'express';
import { sendMessage, getConversation, getConversationList } from './controller.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

router.post('/send', protect, sendMessage);
router.get('/:conversationId', getConversation);
router.get('/list/:userId', getConversationList);

export default router;