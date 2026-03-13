'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkipLink {
  href: string;
  label: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
  className?: string;
}

const defaultLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#footer', label: 'Skip to footer' },
];

const SkipLinks: React.FC<SkipLinksProps> = ({ 
  links = defaultLinks, 
  className 
}) => {
  return (
    <div className={cn('skip-links', className)}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className={cn(
            // Hidden by default
            'absolute left-[-10000px] top-auto w-px h-px overflow-hidden',
            // Visible when focused
            'focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:overflow-visible',
            'focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white',
            'focus:rounded-lg focus:shadow-lg focus:no-underline focus:outline-none',
            'focus:ring-2 focus:ring-primary-300 focus:ring-offset-2',
            'transition-all duration-150'
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const target = document.querySelector(link.href);
              if (target) {
                (target as HTMLElement).focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export { SkipLinks };
export type { SkipLinksProps, SkipLink };