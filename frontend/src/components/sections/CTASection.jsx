'use client';

import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full -ml-32 -mt-32 opacity-20" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-32 -mb-32 opacity-20" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
              Ready to Take the Next Step?
            </h2>
            <p className="text-indigo-100 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Join our community of over 500k professionals and thousands of
              verified companies today. Your dream job is just a few clicks away.
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/auth/register"
                className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-slate-50 transition-all shadow-xl"
              >
                Get Started as Seeker
              </Link>

              <Link
                href="/auth/register"
                className="px-10 py-4 bg-indigo-700 text-white font-bold rounded-full border border-indigo-400 hover:bg-indigo-800 transition-all"
              >
                Sign up as Employer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
