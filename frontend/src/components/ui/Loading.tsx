import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  fullPage?: boolean;
}

export function Loading({ size = 'md', text, className, fullPage = false }: LoadingProps) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' };

  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-[#2563EB]', sizes[size])} aria-hidden="true" />
      {text && <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B0F19]">
        {content}
      </div>
    );
  }

  return content;
}

export function LoadingSpinner({ className }: { className?: string }) {
  return <Loader2 className={cn('animate-spin text-[#2563EB]', className)} aria-hidden="true" />;
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-7 w-7 animate-spin text-[#2563EB]" aria-hidden="true" />
    </div>
  );
}
