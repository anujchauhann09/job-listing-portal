'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { 
  User, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface ProfileCompletionStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  href: string;
  priority: 'high' | 'medium' | 'low';
}

interface ProfileCompletionProps {
  completionPercentage: number;
  steps: ProfileCompletionStep[];
  userType: 'job-seeker' | 'employer';
  className?: string;
}

export function ProfileCompletion({ 
  completionPercentage, 
  steps, 
  userType,
  className 
}: ProfileCompletionProps) {
  const incompleteSteps = steps.filter(step => !step.completed);
  const highPrioritySteps = incompleteSteps.filter(step => step.priority === 'high');
  
  const getCompletionMessage = () => {
    if (completionPercentage === 100) {
      return "Your profile is complete! You're ready to make a great impression.";
    }
    if (completionPercentage >= 80) {
      return "Almost there! Just a few more details to complete your profile.";
    }
    if (completionPercentage >= 50) {
      return "Good progress! Complete your profile to improve your visibility.";
    }
    return "Let's get started! Complete your profile to attract the right opportunities.";
  };

  const getProgressColor = () => {
    if (completionPercentage >= 80) return 'success';
    if (completionPercentage >= 50) return 'warning';
    return 'primary';
  };

  return (
    <div className={cn(
      'bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6',
      className
    )}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
          <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
            Profile Completion
          </h3>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            {completionPercentage}% complete
          </p>
        </div>
      </div>

      <div className="mb-4">
        <Progress 
          value={completionPercentage} 
          variant={getProgressColor()}
          className="h-2"
        />
      </div>

      <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
        {getCompletionMessage()}
      </p>

      {incompleteSteps.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
            Next Steps:
          </h4>
          
          {(highPrioritySteps.length > 0 ? highPrioritySteps : incompleteSteps.slice(0, 3)).map((step) => (
            <div
              key={step.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-secondary-100 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {step.priority === 'high' ? (
                  <AlertCircle className="h-4 w-4 text-warning-500" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-secondary-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                  {step.title}
                </h5>
                <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
                  {step.description}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-6 w-6 flex-shrink-0"
                asChild
              >
                <Link href={step.href}>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          ))}
          
          {incompleteSteps.length > 3 && highPrioritySteps.length === 0 && (
            <p className="text-xs text-secondary-500 dark:text-secondary-400 text-center">
              +{incompleteSteps.length - 3} more steps
            </p>
          )}
        </div>
      )}

      {completionPercentage < 100 && (
        <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <Button variant="primary" size="sm" className="w-full" asChild>
            <Link href="/profile">
              Complete Profile
            </Link>
          </Button>
        </div>
      )}

      {completionPercentage === 100 && (
        <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700 text-center">
          <div className="flex items-center justify-center space-x-2 text-success-600 dark:text-success-400">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Profile Complete!</span>
          </div>
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <Link href="/profile">
              Edit Profile
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}