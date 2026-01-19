'use client';

import { Search, MapPin, Briefcase } from 'lucide-react';

const SearchBarSection = () => {
  return (
    <section className="relative z-20 -mt-10 lg:-mt-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100 py-3 md:py-0">
            <Search className="text-indigo-600 mr-3" size={20} />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full focus:outline-none text-slate-700 text-sm font-medium"
            />
          </div>

          <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100 py-3 md:py-0">
            <MapPin className="text-indigo-600 mr-3" size={20} />
            <input
              type="text"
              placeholder="Location"
              className="w-full focus:outline-none text-slate-700 text-sm font-medium"
            />
          </div>

          <div className="flex items-center px-4 py-3 md:py-0">
            <Briefcase className="text-indigo-600 mr-3" size={20} />
            <select className="w-full bg-transparent focus:outline-none text-slate-700 text-sm font-medium cursor-pointer">
              <option>All Types</option>
              <option>Full-time</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>
          </div>

          <button className="bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 w-full">
            Search Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchBarSection;
