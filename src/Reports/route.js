import express from 'express';
import {
    createReport,
    getAllReports,
    getReportsByVehicle,
    updateReportStatus,
    deleteReport,
    getReportsStats
} from './controller.js';
import { authenticateToken, isAdmin } from '../Middleware/auth.js'; // Assuming you have auth middleware

const router = express.Router();

// Public routes (require only user auth)
router.post('/', authenticateToken, createReport);

// Admin routes
router.get('/', authenticateToken, isAdmin, getAllReports);
router.get('/stats', getReportsStats);
router.get('/vehicle/:vehicleId', getReportsByVehicle);
router.put('/:id', updateReportStatus);
router.delete('/:id', deleteReport);

export default router;
