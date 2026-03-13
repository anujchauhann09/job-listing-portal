import React, { useEffect, useRef } from 'react';
import { useFocusManagement } from '@/hooks/useAccessibility';

interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  restoreFocus?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  className?: string;
}

const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  active = true,
  restoreFocus = true,
  initialFocus,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const { trapFocus, restoreFocus: restoreFocusUtil } = useFocusManagement();

  useEffect(() => {
    if (!active || !containerRef.current) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement;

    const cleanup = trapFocus(containerRef.current);

    if (initialFocus?.current) {
      initialFocus.current.focus();
    }

    return () => {
      cleanup();
      
      if (restoreFocus && previousActiveElementRef.current) {
        restoreFocusUtil(previousActiveElementRef.current);
      }
    };
  }, [active, trapFocus, restoreFocusUtil, restoreFocus, initialFocus]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export { FocusTrap };
export type { FocusTrapProps };