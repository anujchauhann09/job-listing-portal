'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
    period?: string;
  };
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, change, icon, className }: StatsCardProps) {
  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      case 'neutral':
        return <Minus className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    if (!change) return '';
    
    switch (change.trend) {
      case 'up':
        return 'text-success-600 dark:text-success-400';
      case 'down':
        return 'text-error-600 dark:text-error-400';
      case 'neutral':
        return 'text-secondary-500 dark:text-secondary-400';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      'bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6',
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-2">
            {value}
          </p>
          
          {change && (
            <div className={cn(
              'flex items-center space-x-1 mt-2 text-sm',
              getTrendColor()
            )}>
              {getTrendIcon()}
              <span>
                {change.value > 0 ? '+' : ''}{change.value}
                {change.period && ` ${change.period}`}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}