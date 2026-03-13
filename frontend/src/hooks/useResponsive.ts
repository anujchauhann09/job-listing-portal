import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

const breakpoints: BreakpointConfig = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isBreakpoint = (breakpoint: Breakpoint): boolean => {
    return windowSize.width >= breakpoints[breakpoint];
  };

  const isBetween = (min: Breakpoint, max: Breakpoint): boolean => {
    return windowSize.width >= breakpoints[min] && windowSize.width < breakpoints[max];
  };

  const getCurrentBreakpoint = (): Breakpoint => {
    const { width } = windowSize;
    
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  return {
    windowSize,
    isXs: isBetween('xs', 'sm'),
    isSm: isBetween('sm', 'md'),
    isMd: isBetween('md', 'lg'),
    isLg: isBetween('lg', 'xl'),
    isXl: isBetween('xl', '2xl'),
    is2Xl: isBreakpoint('2xl'),
    isSmUp: isBreakpoint('sm'),
    isMdUp: isBreakpoint('md'),
    isLgUp: isBreakpoint('lg'),
    isXlUp: isBreakpoint('xl'),
    is2XlUp: isBreakpoint('2xl'),
    isSmDown: !isBreakpoint('sm'),
    isMdDown: !isBreakpoint('md'),
    isLgDown: !isBreakpoint('lg'),
    isXlDown: !isBreakpoint('xl'),
    isMobile: !isBreakpoint('md'),
    isTablet: isBetween('md', 'lg'),
    isDesktop: isBreakpoint('lg'),
    currentBreakpoint: getCurrentBreakpoint(),
    isBreakpoint,
    isBetween,
  };
}

export function useResponsiveValue<T>(values: Partial<Record<Breakpoint, T>>, defaultValue: T): T {
  const { currentBreakpoint } = useResponsive();
  
  const breakpointOrder: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  
  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp] as T;
    }
  }
  
  return defaultValue;
}

export function useResponsiveColumns(
  columns: Partial<Record<Breakpoint, number>>,
  defaultColumns: number = 1
): number {
  return useResponsiveValue(columns, defaultColumns);
}