'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-40 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <span className="inline-block py-1 px-4 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
              The Future of Hiring is Here
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
                Dream Job
              </span>{' '}
              or Hire Top Talent
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Employrix is the premium marketplace connecting visionary companies
              with world-class talent. Accelerate your career or build your dream
              team today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/auth/register"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center"
              >
                Find Jobs <ChevronRight size={20} className="ml-2" />
              </Link>

              <Link
                href="/auth/register"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded-full hover:bg-slate-50 transition-all"
              >
                Post a Job
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/home.svg"
                alt="Professionals collaborating"
                width={500}
                height={350}
              />
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl z-20 hidden md:block border border-slate-100 animate-bounce">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full" />
                <span className="text-sm font-bold text-slate-800">
                  1.2k+ New Jobs Today
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
