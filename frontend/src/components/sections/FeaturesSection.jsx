'use client';

import FEATURES from '@/data/features';

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Why the Best Talent Choice Employrix
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We've built a platform that puts the user first, ensuring quality
            connections and seamless experiences for both seekers and employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl border border-slate-100 hover:bg-indigo-50/30 transition-all hover:border-indigo-100"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
