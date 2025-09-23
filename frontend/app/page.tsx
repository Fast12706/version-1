'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Shield, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { checkHealth } from '@/utils/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

/**
 * Home page component
 * Displays a grid of medical specialties for doctors to choose from
 * Features modern design with subtle animations and dark mode support
 */
export default function HomePage() {
  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean | null>(null);

  // Check backend health on component mount
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const healthy = await checkHealth();
        setIsBackendHealthy(healthy);
      } catch (error) {
        console.error('Failed to check backend health:', error);
        setIsBackendHealthy(false);
      }
    };

    checkBackendHealth();
  }, []);

  // Medical specialties data
  const specialties = [
    {
      id: 'emergency',
      name: 'Emergency Medicine',
      description: 'Critical care and emergency procedures',
      icon: '🚨',
      color: 'specialty-emergency'
    },
    {
      id: 'icu',
      name: 'Intensive Care Unit',
      description: 'Critical patient monitoring and care',
      icon: '🏥',
      color: 'specialty-icu'
    },
    {
      id: 'surgery',
      name: 'Surgery',
      description: 'Surgical procedures and operations',
      icon: '⚕️',
      color: 'specialty-surgery'
    },
    {
      id: 'internal-medicine',
      name: 'Internal Medicine',
      description: 'Adult medical care and diagnosis',
      icon: '🩺',
      color: 'specialty-internal'
    },
    {
      id: 'obgyn',
      name: 'OB/GYN',
      description: 'Obstetrics and gynecology care',
      icon: '👶',
      color: 'specialty-obgyn'
    },
    {
      id: 'pediatrics',
      name: 'Pediatrics',
      description: 'Children\'s medical care',
      icon: '👶',
      color: 'specialty-pediatrics'
    },
    {
      id: 'clinic-doctor',
      name: 'Clinic Doctor',
      description: 'General practice and outpatient care',
      icon: '🏥',
      color: 'specialty-clinic'
    },
    {
      id: 'general-services',
      name: 'General Services',
      description: 'General medical services and support',
      icon: '⚕️',
      color: 'specialty-general'
    }
  ];

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
      className="space-y-12"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
        <h1 className="heading-1 mb-4">
          Welcome to Emergency-Mind
        </h1>
        <p className="text-xl text-muted mb-8">
          AI-powered medico-legal document generation for healthcare professionals
        </p>
        
        {/* Backend Status Indicator */}
        <div className="flex justify-center items-center space-x-3 mb-8">
          <div className={`w-3 h-3 rounded-full ${
            isBackendHealthy === null 
              ? 'status-loading' 
              : isBackendHealthy 
                ? 'status-online' 
                : 'status-offline'
          }`}></div>
          <span className="text-sm text-muted">
            {isBackendHealthy === null 
              ? 'Checking system status...' 
              : isBackendHealthy 
                ? 'System online' 
                : 'Backend offline - Some features may be limited'
            }
          </span>
        </div>
      </motion.div>

      {/* Features Overview */}
      <motion.div variants={itemVariants}>
        <Card className="max-w-5xl mx-auto">
          <CardContent>
            <h2 className="heading-3 text-center mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-primary-600 dark:text-primary-500" />
                </div>
                <h3 className="heading-4 mb-2">AI-Powered</h3>
                <p className="body-text text-sm">
                  Generate professional medical documents using advanced AI
                </p>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-accent-warning/10 dark:bg-accent-warning/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-accent-warning" />
                </div>
                <h3 className="heading-4 mb-2">Fast & Efficient</h3>
                <p className="body-text text-sm">
                  Create reports in seconds, not minutes
                </p>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-accent-info/10 dark:bg-accent-info/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent-info" />
                </div>
                <h3 className="heading-4 mb-2">Secure & Private</h3>
                <p className="body-text text-sm">
                  Your data stays secure with local storage
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Specialties Grid */}
      <motion.div variants={itemVariants}>
        <h2 className="heading-3 text-center mb-8">
          Select Your Medical Specialty
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/services/${specialty.id}`}>
                <Card hover className={`${specialty.color} h-full`}>
                  <CardContent className="text-center">
                    <div className="text-4xl mb-4">{specialty.icon}</div>
                    <h3 className="heading-4 mb-2">
                      {specialty.name}
                    </h3>
                    <p className="text-sm text-muted">
                      {specialty.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Start Guide */}
      <motion.div variants={itemVariants}>
        <Card className="bg-primary-50 dark:bg-primary-950/20 border-primary-200 dark:border-primary-800">
          <CardContent>
            <h3 className="heading-4 text-primary-900 dark:text-primary-100 mb-6">
              How to Get Started
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { step: 1, text: 'Select your medical specialty', icon: CheckCircle },
                { step: 2, text: 'Choose document type', icon: CheckCircle },
                { step: 3, text: 'Enter clinical notes', icon: CheckCircle },
                { step: 4, text: 'Generate document', icon: CheckCircle },
                { step: 5, text: 'Save to history', icon: CheckCircle },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {item.step}
                  </div>
                  <span className="text-sm text-primary-800 dark:text-primary-200">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
