import { MockProvider } from './providers/MockProvider';
import { LLMProvider } from './providers/LLMProvider';

/**
 * AI Service - Main service for document generation
 * This service abstracts the AI provider implementation
 * Currently uses MockProvider, but can easily be swapped for real AI
 */
class AIService {
  private provider: LLMProvider;

  constructor() {
    // Initialize with mock provider for MVP
    // In production, this could be OpenAI, Anthropic, etc.
    this.provider = new MockProvider();
  }

  /**
   * Generate a medico-legal document
   * @param service - The type of document to generate
   * @param bullets - Array of bullet points from the doctor
   * @returns Generated document as string
   */
  async generateReport(service: string, bullets: string[]): Promise<string> {
    return await this.provider.generateReport(service, bullets);
  }

  /**
   * Switch AI provider (for future use)
   * @param provider - New AI provider instance
   */
  setProvider(provider: LLMProvider): void {
    this.provider = provider;
  }
}

// Export singleton instance
export const aiService = new AIService();



