'use client';

import HeroSection from '@/components/sections/HeroSection';
import SearchBarSection from '@/components/sections/SearchBarSection';
import FeaturedJobsSection from '@/components/sections/FeaturedJobsSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import CTASection from '@/components/sections/CTASection';

const Home = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection />
      <SearchBarSection />
      <FeaturedJobsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default Home;
