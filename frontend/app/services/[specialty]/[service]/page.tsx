'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, X, Save, FileText, ChevronRight } from 'lucide-react';
import { generateReport, getServiceDisplayName } from '@/utils/api';
import { LocalStorageManager, Report } from '@/utils/localStorage';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * Service Form page component
 * Allows doctors to enter bullet points and generate medico-legal documents
 * Features modern design with animations and dark mode support
 */
export default function ServiceFormPage() {
  const params = useParams();
  const specialty = params.specialty as string;
  const service = params.service as string;

  // Form state
  const [bullets, setBullets] = useState<string[]>(['']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  // Add a new bullet point input
  const addBulletPoint = () => {
    setBullets([...bullets, '']);
  };

  // Update a specific bullet point
  const updateBulletPoint = (index: number, value: string) => {
    const newBullets = [...bullets];
    newBullets[index] = value;
    setBullets(newBullets);
  };

  // Remove a bullet point
  const removeBulletPoint = (index: number) => {
    if (bullets.length > 1) {
      const newBullets = bullets.filter((_, i) => i !== index);
      setBullets(newBullets);
    }
  };

  // Generate the report
  const handleGenerate = async () => {
    // Validate input
    const validBullets = bullets.filter(bullet => bullet.trim() !== '');
    if (validBullets.length === 0) {
      setError('Please enter at least one bullet point');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedReport('');

    try {
      const result = await generateReport(service, validBullets);
      setGeneratedReport(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save the report to Local Storage
  const handleSave = () => {
    if (!generatedReport) {
      setError('No report to save');
      return;
    }

    try {
      const validBullets = bullets.filter(bullet => bullet.trim() !== '');
      const report: Omit<Report, 'id' | 'timestamp'> = {
        specialty,
        service,
        notes: validBullets,
        result: generatedReport
      };

      LocalStorageManager.saveReport(report);
      setIsSaved(true);
      setError('');
    } catch (err) {
      setError('Failed to save report');
    }
  };

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Breadcrumb Navigation */}
      <motion.nav variants={itemVariants} className="flex items-center space-x-2 text-sm text-muted">
        <Link 
          href="/" 
          className="hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link 
          href={`/services/${specialty}`} 
          className="hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
        >
          {specialty.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-900 dark:text-slate-100">{getServiceDisplayName(service)}</span>
      </motion.nav>

      {/* Page Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="heading-2 mb-4">
          {getServiceDisplayName(service)}
        </h1>
        <p className="text-lg text-muted">
          Enter your clinical notes and generate a professional medical document
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div variants={itemVariants} className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="heading-4">
                Clinical Notes
              </h2>
              <p className="text-sm text-muted">
                Enter your clinical observations, findings, and notes as bullet points:
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Bullet Points Input */}
              <div className="space-y-3">
                {bullets.map((bullet, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-primary-600 dark:text-primary-500 font-bold text-lg">•</span>
                    <Input
                      value={bullet}
                      onChange={(e) => updateBulletPoint(index, e.target.value)}
                      placeholder="Enter clinical note..."
                      className="flex-1"
                    />
                    {bullets.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBulletPoint(index)}
                        className="text-accent-error hover:text-accent-error hover:bg-accent-error/10 p-2"
                        aria-label="Remove this bullet point"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Add Bullet Point Button */}
              <Button
                variant="secondary"
                onClick={addBulletPoint}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Note
              </Button>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="spinner mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>

              {/* Error Display */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="alert-error"
                >
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}

              {/* Success Message */}
              {isSaved && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="alert-success"
                >
                  <p className="text-sm">
                    ✅ Report saved successfully to your history!
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Generated Report */}
        <motion.div variants={itemVariants} className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="heading-4">
                  Generated Report
                </h2>
                {generatedReport && (
                  <Button
                    onClick={handleSave}
                    disabled={isSaved}
                    variant={isSaved ? "secondary" : "primary"}
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaved ? 'Saved' : 'Save Report'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedReport ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 max-h-96 overflow-y-auto border border-border-light dark:border-border-dark"
                >
                  <pre className="whitespace-pre-wrap text-sm text-slate-800 dark:text-slate-200 font-mono leading-relaxed">
                    {generatedReport}
                  </pre>
                </motion.div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-12 text-center border border-border-light dark:border-border-dark">
                  <div className="text-4xl mb-4">📄</div>
                  <p className="text-muted">
                    Your generated report will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <motion.div variants={itemVariants} className="flex justify-between">
        <Link href={`/services/${specialty}`}>
          <Button variant="secondary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
        </Link>
        <Link href="/history">
          <Button>
            View History
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
