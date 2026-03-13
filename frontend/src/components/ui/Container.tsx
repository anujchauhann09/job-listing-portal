import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-screen-2xl',
  full: 'max-w-none',
};

export function Container({ children, size = 'lg', className }: ContainerProps) {
  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  );
}

// Responsive grid component
interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: number;
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { xs: 1, sm: 2, md: 3, lg: 4 }, 
  gap = 6,
  className 
}: ResponsiveGridProps) {
  const getGridCols = () => {
    const classes = [];
    if (cols.xs) classes.push(`grid-cols-${cols.xs}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
    return classes.join(' ');
  };

  return (
    <div className={cn(
      'grid',
      getGridCols(),
      `gap-${gap}`,
      className
    )}>
      {children}
    </div>
  );
}

// Responsive stack component
interface ResponsiveStackProps {
  children: React.ReactNode;
  direction?: {
    xs?: 'row' | 'col';
    sm?: 'row' | 'col';
    md?: 'row' | 'col';
    lg?: 'row' | 'col';
    xl?: 'row' | 'col';
    '2xl'?: 'row' | 'col';
  };
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  className?: string;
}

export function ResponsiveStack({ 
  children, 
  direction = { xs: 'col', md: 'row' },
  gap = 4,
  align = 'start',
  justify = 'start',
  className 
}: ResponsiveStackProps) {
  const getFlexDirection = () => {
    const classes = [];
    if (direction.xs) classes.push(`flex-${direction.xs}`);
    if (direction.sm) classes.push(`sm:flex-${direction.sm}`);
    if (direction.md) classes.push(`md:flex-${direction.md}`);
    if (direction.lg) classes.push(`lg:flex-${direction.lg}`);
    if (direction.xl) classes.push(`xl:flex-${direction.xl}`);
    if (direction['2xl']) classes.push(`2xl:flex-${direction['2xl']}`);
    return classes.join(' ');
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <div className={cn(
      'flex',
      getFlexDirection(),
      `gap-${gap}`,
      alignClasses[align],
      justifyClasses[justify],
      className
    )}>
      {children}
    </div>
  );
}