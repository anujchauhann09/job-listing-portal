'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Mail,
  Lock,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { validateRegistrationForm } from '@/utils/validators/auth.validators';
import { registerUser } from '@/services/auth.service';


import { USER_ROLE } from '@/constants';

const Register = () => {
  const [role, setRole] = useState(USER_ROLE.JOB_SEEKER);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      userType: role,
    };

    try {
      const validationErrors = validateRegistrationForm(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
      setIsLoading(true); 

      const response = await registerUser(formData);

      if (response.success) {
        window.location.href = '/auth/login';
      } else {
        alert(response.message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Registration failed';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, role]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 lg:p-24 bg-white order-2 lg:order-1">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Create Account
          </h2>
          <p className="text-slate-500 font-medium mb-10">
            Join Employrix and jumpstart your hiring or job search.
          </p>

          <div className="mb-8 p-1.5 bg-slate-100 rounded-2xl flex relative">
            <button
              onClick={() => setRole(USER_ROLE.JOB_SEEKER)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl relative z-10 ${
                role === USER_ROLE.JOB_SEEKER
                  ? 'text-indigo-600'
                  : 'text-slate-500'
              }`}
            >
              Job Seeker
            </button>
            <button
              onClick={() => setRole(USER_ROLE.EMPLOYER)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl relative z-10 ${
                role === USER_ROLE.EMPLOYER
                  ? 'text-indigo-600'
                  : 'text-slate-500'
              }`}
            >
              Employer
            </button>
            <div
              className={`absolute top-1.5 left-1.5 h-[calc(100%-12px)] w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-transform ${
                role === USER_ROLE.EMPLOYER
                  ? 'translate-x-full'
                  : 'translate-x-0'
              }`}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-600 mb-3 text-center">
              Sign in with
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Sign up with Google"
                className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <FcGoogle size={22} />
              </button>

              <button
                type="button"
                aria-label="Sign up with LinkedIn"
                className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <FaLinkedinIn size={18} className="text-[#0A66C2]" />
              </button>

              <button
                type="button"
                aria-label="Sign up with GitHub"
                className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <FaGithub size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-semibold text-slate-400 uppercase">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    role === USER_ROLE.JOB_SEEKER
                      ? "name@email.com"
                      : "hiring@company.com"
                  }
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 ml-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 ml-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 flex items-center justify-center"
            >
              {isLoading ? 'Creating...' : 'Create Account'}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-medium">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-indigo-600 font-bold hover:underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 relative p-12 items-center justify-center order-1 lg:order-2">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[100px] opacity-40 -ml-64 -mt-64" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-100 rounded-full blur-[100px] opacity-40 -mr-64 -mb-64" />

        <div className="relative z-10 max-w-lg">
          <img
            src="/auth.svg"
            alt="Authentication illustration"
            width={500}
            height={350}
            className="rounded-3xl shadow-2xl mb-12"
          />

          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Why professionals join Employrix
          </h3>

          <ul className="space-y-4">
            {[
              'Access to non-public job listings',
              'Advanced resume optimization tools',
              'Verified employer badges for security'
            ].map((text) => (
              <li key={text} className="flex items-center space-x-3">
                <CheckCircle2 className="text-teal-600" size={18} />
                <span className="text-slate-700 font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;