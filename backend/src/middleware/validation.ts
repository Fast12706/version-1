import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

/**
 * Validation schemas using Zod
 * This ensures input data is properly validated before processing
 */

// Schema for generate report request
const generateRequestSchema = z.object({
  bullets: z.array(z.string().min(1, 'Bullet point cannot be empty')).min(1, 'At least one bullet point is required')
});

// Valid service types
const validServices = [
  'final-report',
  'insurance-approval', 
  'dama-form',
  'consultation',
  'icd-10-finder',
  'police-report',
  'discharge-summary'
];

/**
 * Middleware to validate generate report requests
 * Checks both request body and service parameter
 */
export const validateGenerateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate service parameter
    const { service } = req.params;
    if (!validServices.includes(service)) {
      return res.status(400).json({
        success: false,
        error: {
          message: `Invalid service. Must be one of: ${validServices.join(', ')}`
        }
      });
    }

    // Validate request body
    const validatedData = generateRequestSchema.parse(req.body);
    req.body = validatedData; // Replace with validated data
    
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: error.errors
        }
      });
    }
    
    next(error);
  }
};



