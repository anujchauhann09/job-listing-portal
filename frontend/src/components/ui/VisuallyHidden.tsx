import React from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ 
  children, 
  className,
  asChild = false 
}) => {
  const srOnlyClasses = 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0';
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: cn(srOnlyClasses, (children.props as any).className, className),
    });
  }

  return (
    <span className={cn(srOnlyClasses, className)}>
      {children}
    </span>
  );
};

export { VisuallyHidden };
export type { VisuallyHiddenProps };