/**
 * LLM Provider Interface
 * This interface defines the contract for AI providers
 * Makes it easy to swap between different AI services
 */
export interface LLMProvider {
  /**
   * Generate a medico-legal document
   * @param service - The type of document to generate
   * @param bullets - Array of bullet points from the doctor
   * @returns Promise that resolves to the generated document
   */
  generateReport(service: string, bullets: string[]): Promise<string>;
}


