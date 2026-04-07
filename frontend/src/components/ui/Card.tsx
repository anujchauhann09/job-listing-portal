import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode }
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode }
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { children: React.ReactNode }
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { children: React.ReactNode }
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode }
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode }

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-xl border border-[#E2E8F0] bg-white shadow-card dark:border-[#1F2937] dark:bg-[#111827]', className)}
    {...props}
  >
    {children}
  </div>
));

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1 p-5', className)} {...props}>{children}</div>
));

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-lg font-semibold leading-snug text-[#0F172A] dark:text-[#E5E7EB]', className)} {...props}>{children}</h3>
));

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-[#64748B] dark:text-[#9CA3AF]', className)} {...props}>{children}</p>
));

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 pt-0', className)} {...props}>{children}</div>
));

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-5 pt-0', className)} {...props}>{children}</div>
));

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
