import express from 'express';
import { addUseCase,getUseCaseByCategory,getUseCases } from '../controllers/usecasesController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/getUseCases',authMiddleware, getUseCases);
router.post('/getUseCasesByCategory', authMiddleware, getUseCaseByCategory);
router.post('/addUseCase',authMiddleware, addUseCase);

export default router;
