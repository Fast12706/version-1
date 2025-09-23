'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { getServicesForSpecialty, getServiceDisplayName } from '@/utils/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

/**
 * Services page component
 * Displays available services for a selected medical specialty
 * Features modern design with animations and dark mode support
 */
export default function ServicesPage() {
  const params = useParams();
  const specialty = params.specialty as string;

  // Get available services for this specialty
  const services = getServicesForSpecialty(specialty);

  // Specialty display information
  const specialtyInfo: { [key: string]: { name: string; icon: string; description: string } } = {
    emergency: {
      name: 'Emergency Medicine',
      icon: '🚨',
      description: 'Critical care and emergency procedures'
    },
    icu: {
      name: 'Intensive Care Unit',
      icon: '🏥',
      description: 'Critical patient monitoring and care'
    },
    surgery: {
      name: 'Surgery',
      icon: '⚕️',
      description: 'Surgical procedures and operations'
    },
    'internal-medicine': {
      name: 'Internal Medicine',
      icon: '🩺',
      description: 'Adult medical care and diagnosis'
    },
    obgyn: {
      name: 'OB/GYN',
      icon: '👶',
      description: 'Obstetrics and gynecology care'
    },
    pediatrics: {
      name: 'Pediatrics',
      icon: '👶',
      description: 'Children\'s medical care'
    },
    'clinic-doctor': {
      name: 'Clinic Doctor',
      icon: '🏥',
      description: 'General practice and outpatient care'
    },
    'general-services': {
      name: 'General Services',
      icon: '⚕️',
      description: 'General medical services and support'
    }
  };

  const currentSpecialty = specialtyInfo[specialty] || {
    name: 'Unknown Specialty',
    icon: '❓',
    description: 'Medical specialty not recognized'
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
        <span className="text-slate-900 dark:text-slate-100">{currentSpecialty.name}</span>
      </motion.nav>

      {/* Specialty Header */}
      <motion.div variants={itemVariants} className="text-center">
        <motion.div 
          className="text-6xl mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {currentSpecialty.icon}
        </motion.div>
        <h1 className="heading-2 mb-4">
          {currentSpecialty.name}
        </h1>
        <p className="text-lg text-muted">
          {currentSpecialty.description}
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div variants={itemVariants}>
        <h2 className="heading-3 text-center mb-8">
          Available Services
        </h2>
        
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/services/${specialty}/${service}`}>
                  <Card hover className="h-full group">
                    <CardContent className="text-center">
                      <motion.div 
                        className="text-4xl mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {getServiceIcon(service)}
                      </motion.div>
                      <h3 className="heading-4 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-500 transition-colors">
                        {getServiceDisplayName(service)}
                      </h3>
                      <p className="text-sm text-muted">
                        {getServiceDescription(service)}
                      </p>
                      <div className="mt-4 flex items-center justify-center text-primary-600 dark:text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">Get Started</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={itemVariants}
            className="text-center py-16"
          >
            <div className="text-6xl mb-6">❌</div>
            <h3 className="heading-3 mb-4">
              No Services Available
            </h3>
            <p className="text-muted mb-8 max-w-md mx-auto">
              This specialty doesn't have any available services yet.
            </p>
            <Button asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Back Button */}
      <motion.div variants={itemVariants} className="text-center">
        <Button variant="secondary" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Specialties
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

/**
 * Get icon for a service
 * @param service - The service code
 * @returns Icon emoji
 */
function getServiceIcon(service: string): string {
  const icons: { [key: string]: string } = {
    'final-report': '📋',
    'insurance-approval': '📄',
    'dama-form': '📝',
    'consultation': '👥',
    'icd-10-finder': '🔍',
    'police-report': '👮',
    'discharge-summary': '🏥'
  };
  return icons[service] || '📄';
}

/**
 * Get description for a service
 * @param service - The service code
 * @returns Service description
 */
function getServiceDescription(service: string): string {
  const descriptions: { [key: string]: string } = {
    'final-report': 'Generate comprehensive final medical reports',
    'insurance-approval': 'Create insurance approval requests',
    'dama-form': 'Generate DAMA (Discharge Against Medical Advice) forms',
    'consultation': 'Create medical consultation reports',
    'icd-10-finder': 'Find appropriate ICD-10 codes for diagnoses',
    'police-report': 'Generate police medical reports',
    'discharge-summary': 'Create patient discharge summaries'
  };
  return descriptions[service] || 'Generate medical document';
}
