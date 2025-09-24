/**
 * API utility functions for communicating with the backend
 * Handles all HTTP requests to the Emergency-Mind backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * API response interface
 * Standardizes the response format from the backend
 */
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
}

/**
 * Generate a medico-legal document
 * @param service - The service type (e.g., 'final-report', 'insurance-approval')
 * @param bullets - Array of bullet points from the doctor
 * @returns Promise with the generated report
 */
export async function generateReport(
  service: string, 
  bullets: string[]
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate/${service}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bullets }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<{ result: string }> = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to generate report');
    }

    return result.data.result;
  } catch (error) {
    console.error('Error generating report:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while generating the report'
    );
  }
}

/**
 * Check if the backend is healthy
 * @returns Promise with health status
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    
    if (!response.ok) {
      return false;
    }

    const result: ApiResponse<{ ok: boolean }> = await response.json();
    return result.success && result.data?.ok === true;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}

/**
 * Get available services for a specialty
 * @param specialty - The specialty name
 * @returns Array of available services
 */
export function getServicesForSpecialty(specialty: string): string[] {
  const servicesMap: { [key: string]: string[] } = {
    emergency: [
      'final-report',
      'insurance-approval',
      'dama-form',
      'police-report',
      'discharge-summary'
    ],
    icu: [
      'final-report',
      'insurance-approval',
      'consultation',
      'discharge-summary'
    ],
    surgery: [
      'final-report',
      'insurance-approval',
      'consultation',
      'discharge-summary'
    ],
    'internal-medicine': [
      'final-report',
      'insurance-approval',
      'consultation',
      'icd-10-finder',
      'discharge-summary'
    ],
    obgyn: [
      'final-report',
      'insurance-approval',
      'consultation',
      'discharge-summary'
    ],
    pediatrics: [
      'final-report',
      'insurance-approval',
      'consultation',
      'discharge-summary'
    ],
    'clinic-doctor': [
      'final-report',
      'consultation',
      'icd-10-finder'
    ],
    'general-services': [
      'final-report',
      'consultation',
      'icd-10-finder',
      'discharge-summary'
    ]
  };

  return servicesMap[specialty] || [];
}

/**
 * Get display name for a service
 * @param service - The service code
 * @returns Human-readable service name
 */
export function getServiceDisplayName(service: string): string {
  const serviceNames: { [key: string]: string } = {
    'final-report': 'Final Medical Report',
    'insurance-approval': 'Insurance Approval Request',
    'dama-form': 'DAMA Form',
    'consultation': 'Medical Consultation',
    'icd-10-finder': 'ICD-10 Code Finder',
    'police-report': 'Police Medical Report',
    'discharge-summary': 'Discharge Summary'
  };

  return serviceNames[service] || service;
}



