import { Request, Response } from 'express';
import { aiService } from '../services/aiService';

/**
 * Generate controller handles document generation requests
 * Acts as a bridge between routes and AI services
 */
export const generateController = {
  /**
   * POST /api/generate/:service
   * Generates a medico-legal document based on bullet points
   */
  generateReport: async (req: Request, res: Response) => {
    try {
      const { service } = req.params;
      const { bullets } = req.body;

      // Generate the report using AI service
      const result = await aiService.generateReport(service, bullets);

      res.json({
        success: true,
        data: {
          result,
          service,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to generate report'
        }
      });
    }
  }
};


