import { useEffect, useRef, useState, useCallback } from 'react';

export const useFocusManagement = () => {
  const focusableElementsSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  const getFocusableElements = useCallback((container: HTMLElement) => {
    return Array.from(container.querySelectorAll(focusableElementsSelector)) as HTMLElement[];
  }, [focusableElementsSelector]);

  const trapFocus = useCallback((container: HTMLElement) => {
    const focusableElements = getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [getFocusableElements]);

  const restoreFocus = useCallback((element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }, []);

  return {
    getFocusableElements,
    trapFocus,
    restoreFocus,
  };
};

export const useKeyboardNavigation = (
  items: any[],
  options: {
    onSelect?: (index: number, item: any) => void;
    onEscape?: () => void;
    loop?: boolean;
    orientation?: 'horizontal' | 'vertical';
  } = {}
) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { onSelect, onEscape, loop = true, orientation = 'vertical' } = options;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isVertical = orientation === 'vertical';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

    switch (e.key) {
      case nextKey:
        e.preventDefault();
        setActiveIndex(prev => {
          const next = prev + 1;
          return next >= items.length ? (loop ? 0 : prev) : next;
        });
        break;

      case prevKey:
        e.preventDefault();
        setActiveIndex(prev => {
          const next = prev - 1;
          return next < 0 ? (loop ? items.length - 1 : prev) : next;
        });
        break;

      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;

      case 'End':
        e.preventDefault();
        setActiveIndex(items.length - 1);
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < items.length) {
          onSelect?.(activeIndex, items[activeIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        onEscape?.();
        break;
    }
  }, [items, activeIndex, onSelect, onEscape, loop, orientation]);

  const reset = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    reset,
  };
};

export const useScreenReader = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncements(prev => [...prev, message]);
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
      setAnnouncements(prev => prev.filter(a => a !== message));
    }, 1000);
  }, []);

  return {
    announce,
    announcements,
  };
};

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

export const useAriaAttributes = () => {
  const generateId = useCallback((prefix: string = 'aria') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const getAriaProps = useCallback((config: {
    label?: string;
    labelledBy?: string;
    describedBy?: string;
    expanded?: boolean;
    selected?: boolean;
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
    live?: 'polite' | 'assertive' | 'off';
    atomic?: boolean;
  }) => {
    const props: Record<string, any> = {};

    if (config.label) props['aria-label'] = config.label;
    if (config.labelledBy) props['aria-labelledby'] = config.labelledBy;
    if (config.describedBy) props['aria-describedby'] = config.describedBy;
    if (config.expanded !== undefined) props['aria-expanded'] = config.expanded;
    if (config.selected !== undefined) props['aria-selected'] = config.selected;
    if (config.disabled !== undefined) props['aria-disabled'] = config.disabled;
    if (config.required !== undefined) props['aria-required'] = config.required;
    if (config.invalid !== undefined) props['aria-invalid'] = config.invalid;
    if (config.live) props['aria-live'] = config.live;
    if (config.atomic !== undefined) props['aria-atomic'] = config.atomic;

    return props;
  }, []);

  return {
    generateId,
    getAriaProps,
  };
};

export const useSkipLinks = () => {
  const skipLinksRef = useRef<HTMLDivElement>(null);

  const addSkipLink = useCallback((target: string, label: string) => {
    if (!skipLinksRef.current) return;

    const link = document.createElement('a');
    link.href = `#${target}`;
    link.textContent = label;
    link.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg';
    
    skipLinksRef.current.appendChild(link);
  }, []);

  return {
    addSkipLink,
    skipLinksRef,
  };
};

export default {
  useFocusManagement,
  useKeyboardNavigation,
  useScreenReader,
  useReducedMotion,
  useAriaAttributes,
  useSkipLinks,
};