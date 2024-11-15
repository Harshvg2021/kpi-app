import express from 'express';
import { addKpiWithReportFilter, addReport, getReports, getReportsByCategory } from '../controllers/reportsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/getReports',authMiddleware, getReports);
router.post('/getReportsByCategory', authMiddleware, getReportsByCategory);
router.post('/addReport',authMiddleware, addReport);
router.post('/addKpiWithReportFilter', authMiddleware,addKpiWithReportFilter)

export default router;
