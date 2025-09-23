import { Router } from 'express';
import { healthController } from '../controllers/healthController';

const router = Router();

/**
 * Health check endpoint
 * GET /api/health
 * Returns server status and basic information
 */
router.get('/', healthController.getHealth);

export { router as healthRoutes };


