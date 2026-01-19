import React from 'react';
import { Briefcase, Twitter, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Briefcase size={20} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Employrix
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              The world's most advanced job search platform connecting visionary
              companies with top-tier talent across the globe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">For Candidates</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Job Alerts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Candidate Dashboard
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">For Employers</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Browse Talent
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Hiring Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-indigo-500" />
                <span>123 Tech Avenue, San Francisco, CA</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-indigo-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-indigo-500" />
                <span>support@employrix.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <p>&copy; 2026 Employrix Inc. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
