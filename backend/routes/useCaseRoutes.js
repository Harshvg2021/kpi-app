import express from 'express';
import { addUseCase,getUseCaseByCategory,getUseCases } from '../controllers/usecasesController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/getUsecases',authMiddleware, getUseCases);
router.post('/getUsecasesByCategory', authMiddleware, getUseCaseByCategory);
router.post('/addUsecase',authMiddleware, addUseCase);

export default router;
