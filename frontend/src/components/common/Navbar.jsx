"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";

  useEffect(() => {
  if (isAuthPage) {
    setUser(null);
    return;
  }

  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 401) return null; 
      return res.json();
    })
    .then((data) => {
      if (data?.data) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    })
    .catch(() => {
      setUser(null);
    });
}, [isAuthPage]);


  const getDisplayName = () => {
    if (!user) return "";
    return user.name || user.email;
  };

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    window.location.href = "/auth/login";
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Briefcase size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900">Employrix</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-slate-700">
            <Link href="/" className="nav-link">
              Find Jobs
            </Link>
            <Link href="/" className="nav-link">
              Companies
            </Link>
            <Link href="/" className="nav-link">
              Salaries
            </Link>
          </div>

          {!isAuthPage && (
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm font-medium text-slate-700">
                    {getDisplayName()}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm font-semibold text-slate-700 hover:text-indigo-600"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2.5 rounded-full"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-indigo-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Find Jobs
            </Link>
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Companies
            </Link>
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Salaries
            </Link>
          </div>

          {!isAuthPage && (
            <div className="border-t border-slate-100 px-4 py-3 space-y-2">
              {user ? (
                <>
                  <div className="px-3 py-2 rounded-lg bg-slate-50 text-sm text-slate-600">
                    Signed in as
                    <div className="font-medium text-slate-800 truncate">
                      {getDisplayName()}
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
