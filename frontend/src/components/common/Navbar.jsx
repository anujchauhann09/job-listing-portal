'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const isAuthPage =
    pathname === '/auth/login' || pathname === '/auth/register';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Briefcase size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Employrix
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Companies
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Salaries
            </Link>
          </div>

          {!isAuthPage && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-4 py-2"
              >
                Log in
              </Link>

              <Link
                href="/auth/register"
                className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-all shadow-sm"
              >
                Sign up
              </Link>
            </div>
          )}

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-2">
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Find Jobs
          </Link>
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Companies
          </Link>
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Salaries
          </Link>

          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              href="/auth/login"
              className="text-center py-2 font-medium text-slate-700 border border-slate-200 rounded-md"
            >
              Log in
            </Link>

            <Link
              href="/auth/register"
              className="text-center py-2 font-medium bg-indigo-600 text-white rounded-md"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
