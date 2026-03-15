'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'compact';
  className?: string;
}

export function ThemeToggle({ variant = 'button', className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  if (variant === 'compact') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        className={cn('w-10 h-10 p-0', className)}
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('flex flex-col space-y-1', className)}>
        <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
          Theme
        </span>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={theme === 'light' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTheme('light')}
            className="flex items-center justify-center"
          >
            <Sun className="h-4 w-4 mr-1" />
            Light
          </Button>
          <Button
            variant={theme === 'dark' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTheme('dark')}
            className="flex items-center justify-center"
          >
            <Moon className="h-4 w-4 mr-1" />
            Dark
          </Button>
          <Button
            variant={theme === 'system' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTheme('system')}
            className="flex items-center justify-center"
          >
            <Monitor className="h-4 w-4 mr-1" />
            Auto
          </Button>
        </div>
      </div>
    );
  }

  // Default button variant
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
        Theme:
      </span>
      <div className="flex items-center space-x-1 p-1 bg-secondary-100 rounded-lg dark:bg-secondary-800">
        <Button
          variant={theme === 'light' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTheme('light')}
          className="h-8 px-2"
          aria-label="Light theme"
        >
          <Sun className="h-4 w-4" />
        </Button>
        <Button
          variant={theme === 'dark' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTheme('dark')}
          className="h-8 px-2"
          aria-label="Dark theme"
        >
          <Moon className="h-4 w-4" />
        </Button>
        <Button
          variant={theme === 'system' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTheme('system')}
          className="h-8 px-2"
          aria-label="System theme"
        >
          <Monitor className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Hook for theme-aware styling
export function useThemeAwareStyle() {
  const { resolvedTheme } = useTheme();
  
  return {
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    themeClass: resolvedTheme,
    getThemeValue: function<T>(lightValue: T, darkValue: T): T {
      return resolvedTheme === 'dark' ? darkValue : lightValue;
    },
  };
}