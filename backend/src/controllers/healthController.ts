import { Request, Response } from 'express';

/**
 * Health controller handles health check endpoints
 * This is useful for monitoring and ensuring the API is running
 */
export const healthController = {
  /**
   * GET /api/health
   * Returns basic server information and status
   */
  getHealth: (req: Request, res: Response) => {
    res.json({
      success: true,
      data: {
        ok: true,
        message: 'Backend is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });
  }
};


