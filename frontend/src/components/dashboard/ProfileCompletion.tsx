import Link from 'next/link';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  done: boolean;
  href?: string;
}

interface ProfileCompletionProps {
  steps: Step[];
  userType: 'job-seeker' | 'employer';
}

export function ProfileCompletion({ steps }: ProfileCompletionProps) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] p-5">
      <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-3">Profile</h3>

      {steps.length > 0 ? (
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2.5">
              {step.done
                ? <CheckCircle className="h-4 w-4 text-[#16A34A] shrink-0" aria-hidden="true" />
                : <Circle className="h-4 w-4 text-[#CBD5E1] dark:text-[#374151] shrink-0" aria-hidden="true" />
              }
              {step.href && !step.done ? (
                <Link href={step.href} className="text-xs text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#60A5FA] transition-colors">
                  {step.label}
                </Link>
              ) : (
                <span className={cn('text-xs', step.done ? 'text-[#64748B] dark:text-[#9CA3AF] line-through' : 'text-[#374151] dark:text-[#D1D5DB]')}>
                  {step.label}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mb-3">Keep your profile up to date</p>
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#60A5FA] transition-colors"
          >
            Edit Profile <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
