import { Request, Response, NextFunction } from 'express';

/**
 * Centralized error handling middleware
 * This ensures all errors are returned in a consistent JSON format
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error occurred:', error);

  // Default error response
  const statusCode = 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : error.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
    }
  });
};




