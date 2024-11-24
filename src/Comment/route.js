import express from 'express';
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  getFilteredComments,
  bulkSoftDelete,
  replyToComment,
} from './controller.js';

const router = express.Router();

router.post('/', createComment);
router.get('/filtered', getFilteredComments);

router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.post('/:id/reply', replyToComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.post('/bulk-delete', bulkSoftDelete);
export default router;
