'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function OAuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);

      setTimeout(() => {
        router.replace('/');
      }, 1200);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 w-full max-w-md text-center shadow-xl">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>

        <h1 className="text-xl font-semibold text-white mb-2">
          Sign-in Successful
        </h1>

        <p className="text-slate-400 text-sm mb-6">
          We’re setting up your account and signing you in.
        </p>

        <div className="flex items-center justify-center gap-2 text-slate-300 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Redirecting to your dashboard…
        </div>
      </div>
    </div>
  );
}
