import { v4 as uuidv4 } from 'uuid';

/**
 * Report interface matching the backend specification
 * This defines the structure of reports stored in Local Storage
 */
export interface Report {
  id: string;
  specialty: string;
  service: string;
  notes: string[];
  result: string;
  timestamp: string;
}

/**
 * Local Storage utility functions
 * Handles saving, retrieving, and managing reports in browser storage
 */
export class LocalStorageManager {
  private static readonly STORAGE_KEY = 'emergency-mind-reports';

  /**
   * Save a new report to Local Storage
   * @param report - The report object to save (without id and timestamp)
   * @returns The saved report with generated id and timestamp
   */
  static saveReport(report: Omit<Report, 'id' | 'timestamp'>): Report {
    const newReport: Report = {
      ...report,
      id: uuidv4(),
      timestamp: new Date().toISOString()
    };

    try {
      const existingReports = this.getAllReports();
      const updatedReports = [...existingReports, newReport];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedReports));
      return newReport;
    } catch (error) {
      console.error('Error saving report to Local Storage:', error);
      throw new Error('Failed to save report');
    }
  }

  /**
   * Get all reports from Local Storage
   * @returns Array of all saved reports
   */
  static getAllReports(): Report[] {
    try {
      const reportsJson = localStorage.getItem(this.STORAGE_KEY);
      if (!reportsJson) return [];
      
      const reports = JSON.parse(reportsJson);
      return Array.isArray(reports) ? reports : [];
    } catch (error) {
      console.error('Error reading reports from Local Storage:', error);
      return [];
    }
  }

  /**
   * Get a specific report by ID
   * @param id - The report ID
   * @returns The report or null if not found
   */
  static getReportById(id: string): Report | null {
    const reports = this.getAllReports();
    return reports.find(report => report.id === id) || null;
  }

  /**
   * Get reports filtered by specialty
   * @param specialty - The specialty to filter by
   * @returns Array of reports for the specified specialty
   */
  static getReportsBySpecialty(specialty: string): Report[] {
    const reports = this.getAllReports();
    return reports.filter(report => report.specialty === specialty);
  }

  /**
   * Get reports filtered by service
   * @param service - The service to filter by
   * @returns Array of reports for the specified service
   */
  static getReportsByService(service: string): Report[] {
    const reports = this.getAllReports();
    return reports.filter(report => report.service === service);
  }

  /**
   * Delete a report by ID
   * @param id - The report ID to delete
   * @returns True if deleted, false if not found
   */
  static deleteReport(id: string): boolean {
    try {
      const reports = this.getAllReports();
      const filteredReports = reports.filter(report => report.id !== id);
      
      if (filteredReports.length === reports.length) {
        return false; // Report not found
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredReports));
      return true;
    } catch (error) {
      console.error('Error deleting report from Local Storage:', error);
      return false;
    }
  }

  /**
   * Clear all reports from Local Storage
   * @returns True if cleared successfully
   */
  static clearAllReports(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing reports from Local Storage:', error);
      return false;
    }
  }

  /**
   * Get storage usage information
   * @returns Object with storage statistics
   */
  static getStorageInfo(): { totalReports: number; storageSize: number } {
    const reports = this.getAllReports();
    const storageSize = JSON.stringify(reports).length;
    
    return {
      totalReports: reports.length,
      storageSize
    };
  }
}



