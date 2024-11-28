import express from 'express';
import { createRole, getRoles, updateRole, deleteRole } from './controller.js';
import { protect } from '../Middleware/auth.js';
// import { isAdmin } from '../Middleware/permissions.js';

const router = express.Router();

router.post('/', protect,  createRole);
router.get('/',   getRoles);
router.put('/:id', updateRole);
router.delete('/:id', protect, deleteRole);

export default router;