import React from 'react';
import { MapPin, DollarSign, Clock, Bookmark } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 relative cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-2 group-hover:bg-indigo-50 transition-colors">
            <img
              src={job.logo}
              alt={job.company}
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              {job.company}
            </p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
          <Bookmark size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mb-4">
        <div className="flex items-center text-slate-500 text-sm">
          <MapPin size={16} className="mr-1.5 text-slate-400" />
          {job.location}
        </div>
        <div className="flex items-center text-slate-500 text-sm">
          <DollarSign size={16} className="mr-1.5 text-slate-400" />
          {job.salary}
        </div>
        <div className="flex items-center text-slate-500 text-sm">
          <Clock size={16} className="mr-1.5 text-slate-400" />
          {job.postedAt}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            job.type === 'Full-time'
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-teal-100 text-teal-700'
          }`}
        >
          {job.type}
        </span>
        <button className="text-xs font-bold text-indigo-600 flex items-center hover:underline">
          View Details
          <svg
            className="w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
