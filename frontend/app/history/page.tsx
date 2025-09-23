'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, Trash2, FileText, Calendar, Stethoscope, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { LocalStorageManager, Report } from '@/utils/localStorage';
import { getServiceDisplayName } from '@/utils/api';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

/**
 * History page component
 * Displays all saved reports from Local Storage
 * Features modern design with animations and dark mode support
 */
export default function HistoryPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [filterService, setFilterService] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load reports from Local Storage on component mount
  useEffect(() => {
    loadReports();
  }, []);

  // Apply filters when reports or filter values change
  useEffect(() => {
    applyFilters();
  }, [reports, filterSpecialty, filterService, searchTerm]);

  const loadReports = () => {
    try {
      const allReports = LocalStorageManager.getAllReports();
      // Sort by timestamp (newest first)
      const sortedReports = allReports.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setReports(sortedReports);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reports];

    // Filter by specialty
    if (filterSpecialty !== 'all') {
      filtered = filtered.filter(report => report.specialty === filterSpecialty);
    }

    // Filter by service
    if (filterService !== 'all') {
      filtered = filtered.filter(report => report.service === filterService);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.notes.some(note => note.toLowerCase().includes(term)) ||
        report.result.toLowerCase().includes(term) ||
        getServiceDisplayName(report.service).toLowerCase().includes(term)
      );
    }

    setFilteredReports(filtered);
  };

  const deleteReport = (id: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      const success = LocalStorageManager.deleteReport(id);
      if (success) {
        loadReports(); // Reload reports
      } else {
        alert('Failed to delete report');
      }
    }
  };

  const clearAllReports = () => {
    if (window.confirm('Are you sure you want to delete ALL reports? This action cannot be undone.')) {
      const success = LocalStorageManager.clearAllReports();
      if (success) {
        setReports([]);
        setFilteredReports([]);
      } else {
        alert('Failed to clear reports');
      }
    }
  };

  // Get unique specialties for filter
  const specialties = Array.from(new Set(reports.map(report => report.specialty)));
  
  // Get unique services for filter
  const services = Array.from(new Set(reports.map(report => report.service)));

  // Get storage info
  const storageInfo = LocalStorageManager.getStorageInfo();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-muted">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="heading-2 mb-4">
          Report History
        </h1>
        <p className="text-lg text-muted">
          View and manage your saved medical reports
        </p>
      </motion.div>

      {/* Statistics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-500 mb-2">
              {reports.length}
            </div>
            <div className="text-sm text-muted">Total Reports</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-accent-info mb-2">
              {specialties.length}
            </div>
            <div className="text-sm text-muted">Specialties Used</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-slate-600 dark:text-slate-400 mb-2">
              {(storageInfo.storageSize / 1024).toFixed(1)} KB
            </div>
            <div className="text-sm text-muted">Storage Used</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters and Search */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary-600 dark:text-primary-500" />
              <h2 className="heading-4">Filters & Search</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <Input
                  label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search reports..."
                  icon={<Search className="h-4 w-4" />}
                />
              </div>

              {/* Specialty Filter */}
              <div>
                <Select
                  label="Specialty"
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Specialties' },
                    ...specialties.map(specialty => ({
                      value: specialty,
                      label: specialty.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                    }))
                  ]}
                />
              </div>

              {/* Service Filter */}
              <div>
                <Select
                  label="Service"
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Services' },
                    ...services.map(service => ({
                      value: service,
                      label: getServiceDisplayName(service)
                    }))
                  ]}
                />
              </div>

              {/* Clear All Button */}
              <div className="flex items-end">
                <Button
                  onClick={clearAllReports}
                  disabled={reports.length === 0}
                  variant="danger"
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reports List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {filteredReports.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-6">📄</div>
            <h3 className="heading-3 mb-4">
              {reports.length === 0 ? 'No Reports Yet' : 'No Reports Match Your Filters'}
            </h3>
            <p className="text-muted mb-8 max-w-md mx-auto">
              {reports.length === 0 
                ? 'Start by generating your first medical report!'
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
            <Button asChild>
              <Link href="/">
                Generate Report
              </Link>
            </Button>
          </motion.div>
        ) : (
          filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReportCard
                report={report}
                onDelete={deleteReport}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * Report Card Component
 * Displays individual report information with modern design
 */
function ReportCard({ 
  report, 
  onDelete 
}: { 
  report: Report; 
  onDelete: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getSpecialtyIcon = (specialty: string) => {
    const icons: { [key: string]: string } = {
      emergency: '🚨',
      icu: '🏥',
      surgery: '⚕️',
      'internal-medicine': '🩺',
      obgyn: '👶',
      pediatrics: '👶',
      'clinic-doctor': '🏥',
      'general-services': '⚕️'
    };
    return icons[specialty] || '❓';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl">{getSpecialtyIcon(report.specialty)}</div>
              <div className="flex-1">
                <h3 className="heading-4 mb-1">
                  {getServiceDisplayName(report.service)}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-muted">
                  <div className="flex items-center space-x-1">
                    <Stethoscope className="h-4 w-4" />
                    <span>{report.specialty.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(report.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Preview */}
            <div className="mb-4">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Notes:</strong> {report.notes.join(' • ')}
              </p>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="group-hover:bg-primary-50 dark:group-hover:bg-primary-950/20 group-hover:text-primary-600 dark:group-hover:text-primary-500"
            >
              <FileText className="h-4 w-4 mr-2" />
              {isExpanded ? 'Hide Report' : 'View Report'}
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(report.id)}
            className="text-accent-error hover:text-accent-error hover:bg-accent-error/10 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Delete this report"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Expanded Report Content */}
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-6 pt-6 border-t border-border-light dark:border-border-dark"
          >
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 max-h-64 overflow-y-auto border border-border-light dark:border-border-dark">
              <pre className="whitespace-pre-wrap text-sm text-slate-800 dark:text-slate-200 font-mono leading-relaxed">
                {report.result}
              </pre>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
