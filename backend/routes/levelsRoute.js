import express from 'express';
import { getLevels } from '../controllers/levelController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getLevels',authMiddleware, getLevels);

export default router;
