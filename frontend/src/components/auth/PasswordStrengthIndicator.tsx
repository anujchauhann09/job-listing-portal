'use client';

import React from 'react';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
  password: string;
  showDetails?: boolean;
  className?: string;
}

export function PasswordStrengthIndicator({ 
  password, 
  showDetails = true, 
  className 
}: PasswordStrengthIndicatorProps) {
  const passwordStrength = usePasswordStrength(password);

  if (!password) {
    return null;
  }

  const getStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-error-500';
    if (score === 2) return 'bg-warning-500';
    if (score === 3) return 'bg-primary-500';
    return 'bg-success-500';
  };

  const getTextColor = (score: number) => {
    if (score <= 1) return 'text-error-600 dark:text-error-400';
    if (score === 2) return 'text-warning-600 dark:text-warning-400';
    if (score === 3) return 'text-primary-600 dark:text-primary-400';
    return 'text-success-600 dark:text-success-400';
  };

  const requirements = [
    {
      label: 'At least 8 characters',
      met: password.length >= 8,
    },
    {
      label: 'Contains uppercase letter',
      met: /[A-Z]/.test(password),
    },
    {
      label: 'Contains lowercase letter',
      met: /[a-z]/.test(password),
    },
    {
      label: 'Contains number',
      met: /\d/.test(password),
    },
    {
      label: 'Contains special character',
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className={cn('space-y-3', className)}>
      {/* Strength Bar and Label */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-secondary-600 dark:text-secondary-400">
            Password strength:
          </span>
          <span className={getTextColor(passwordStrength.score)}>
            {passwordStrength.label}
          </span>
        </div>
        
        <div className="w-full bg-secondary-200 rounded-full h-2 dark:bg-secondary-700">
          <div
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              getStrengthColor(passwordStrength.score)
            )}
            style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
          />
        </div>
      </div>

      {showDetails && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Password requirements:
          </p>
          <div className="space-y-1">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                {requirement.met ? (
                  <CheckCircle className="w-4 h-4 text-success-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-error-500" />
                )}
                <span
                  className={cn(
                    requirement.met
                      ? 'text-success-600 dark:text-success-400'
                      : 'text-secondary-600 dark:text-secondary-400'
                  )}
                >
                  {requirement.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {passwordStrength.suggestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-warning-500" />
            <p className="text-sm font-medium text-warning-600 dark:text-warning-400">
              Suggestions:
            </p>
          </div>
          <ul className="space-y-1 text-sm text-secondary-600 dark:text-secondary-400">
            {passwordStrength.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-warning-500 mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}