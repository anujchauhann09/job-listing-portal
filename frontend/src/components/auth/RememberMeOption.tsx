'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RememberMeOptionProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  showInfo?: boolean;
  className?: string;
}

export function RememberMeOption({ 
  checked, 
  onChange, 
  disabled = false,
  showInfo = true,
  className 
}: RememberMeOptionProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center">
        <input
          id="rememberMe"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded disabled:opacity-50"
        />
        <label 
          htmlFor="rememberMe" 
          className={cn(
            "ml-2 block text-sm text-secondary-900 dark:text-secondary-100",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          Remember me
        </label>
      </div>
      
      {showInfo && (
        <div className="flex items-start space-x-2 text-xs text-secondary-600 dark:text-secondary-400">
          <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <p>
            {checked 
              ? "Your session will be saved for 30 days. You'll stay signed in even after closing your browser."
              : "You'll need to sign in again when you close your browser."
            }
          </p>
        </div>
      )}
    </div>
  );
}