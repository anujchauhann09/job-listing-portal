"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Briefcase,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { validateLoginForm } from '@/utils/validators/auth.validators';

import { USER_ROLE } from '@/constants';

const Login = () => {
  const [role, setRole] = useState(USER_ROLE.JOB_SEEKER);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm({
      email,
      password,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    console.log('Login payload:', {
      email,
      password,
      role,
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative p-12 overflow-hidden items-center justify-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-20 -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500 rounded-full blur-[120px] opacity-10 -ml-64 -mb-64" />

        <div className="relative z-10 max-w-lg">
          <div className="mb-12">
            <div className="flex items-center space-x-2 text-white mb-8">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Briefcase size={32} />
              </div>
              <span className="text-3xl font-extrabold tracking-tight">
                Employrix
              </span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              {role === USER_ROLE.JOB_SEEKER
                ? "Unlock your potential with top opportunities."
                : "The future of your team starts here."}
            </h2>

            <p className="text-slate-400 text-lg">
              Join millions of professionals and companies using Employrix to
              shape the future of work.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-indigo-600/20 p-1.5 rounded-full">
                <CheckCircle size={20} className="text-indigo-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Premium Job Matching
                </h4>
                <p className="text-sm text-slate-500">
                  Our AI identifies the best roles for your specific skill set.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-indigo-600/20 p-1.5 rounded-full">
                <CheckCircle size={20} className="text-indigo-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Direct Communication
                </h4>
                <p className="text-sm text-slate-500">
                  Message hiring managers or candidates directly within the app.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <p className="text-slate-300 italic mb-4">
              "Employrix helped us find our founding engineer within 2 weeks. The
              quality of talent here is unmatched."
            </p>
            <div className="flex items-center space-x-3">
              <img
                src="https://picsum.photos/seed/ceo/40/40"
                className="w-10 h-10 rounded-full border border-white/20"
                alt="CEO"
              />
              <div>
                <p className="text-white text-sm font-bold">Marcus Sterling</p>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                  CEO at InnovateX
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 lg:p-24 bg-white">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          <div className="mb-8 p-1.5 bg-slate-100 rounded-2xl flex relative">
            <button
              onClick={() => setRole(USER_ROLE.JOB_SEEKER)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all relative z-10 ${
                role === USER_ROLE.JOB_SEEKER
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Job Seeker
            </button>

            <button
              onClick={() => setRole(USER_ROLE.EMPLOYER)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all relative z-10 ${
                role === USER_ROLE.EMPLOYER
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Employer
            </button>

            <div
              className={`absolute top-1.5 left-1.5 h-[calc(100%-12px)] w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-out ${
                role === USER_ROLE.EMPLOYER
                  ? "translate-x-full"
                  : "translate-x-0"
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

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                <button
                  type="button"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-slate-600 cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>

            <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center group">
              Sign In to Employrix
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
