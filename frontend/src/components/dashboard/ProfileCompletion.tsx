'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { User, ArrowRight, AlertCircle } from 'lucide-react';

interface ProfileCompletionStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  href: string;
  priority: 'high' | 'medium' | 'low';
}

interface ProfileCompletionProps {
  steps: ProfileCompletionStep[];
  userType: 'job-seeker' | 'employer';
  className?: string;
}

export function ProfileCompletion({ steps, userType, className }: ProfileCompletionProps) {
  const incompleteSteps = steps.filter((s) => !s.completed);
  const highPriority = incompleteSteps.filter((s) => s.priority === 'high');
  const visibleSteps = highPriority.length > 0 ? highPriority : incompleteSteps.slice(0, 3);

  return (
    <div className={cn(
      'bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6',
      className
    )}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
          <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
          Profile
        </h3>
      </div>

      {incompleteSteps.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Next Steps:</h4>
          {visibleSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-secondary-100 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
            >
              <AlertCircle className="h-4 w-4 text-warning-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{step.title}</h5>
                <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">{step.description}</p>
              </div>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6 flex-shrink-0" asChild>
                <Link href={step.href}>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          ))}
          {incompleteSteps.length > 3 && highPriority.length === 0 && (
            <p className="text-xs text-secondary-500 dark:text-secondary-400 text-center">
              +{incompleteSteps.length - 3} more steps
            </p>
          )}
        </div>
      ) : null}

      <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
        <Button variant="primary" size="sm" className="w-full" asChild>
          <Link href="/profile">
            {incompleteSteps.length > 0 ? 'Complete Profile' : 'Edit Profile'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
