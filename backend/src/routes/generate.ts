import { Router } from 'express';
import { generateController } from '../controllers/generateController';
import { validateGenerateRequest } from '../middleware/validation';

const router = Router();

/**
 * Generate medico-legal documents
 * POST /api/generate/:service
 * Accepts bullet points and returns generated report
 */
router.post('/:service', validateGenerateRequest, generateController.generateReport);

export { router as generateRoutes };


