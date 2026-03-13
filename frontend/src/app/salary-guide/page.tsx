'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { 
  DollarSign,
  TrendingUp,
  Briefcase,
  MapPin,
  Award,
  Users,
  BarChart3,
  Search,
  ChevronRight,
  Info
} from 'lucide-react';

export default function SalaryGuidePage() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const topPayingRoles = [
    {
      title: 'Senior Software Engineer',
      industry: 'Technology',
      avgSalary: '$145,000',
      range: '$120k - $180k',
      growth: '+12%',
      icon: '💻',
    },
    {
      title: 'Data Scientist',
      industry: 'Technology',
      avgSalary: '$135,000',
      range: '$110k - $170k',
      growth: '+15%',
      icon: '📊',
    },
    {
      title: 'Product Manager',
      industry: 'Technology',
      avgSalary: '$130,000',
      range: '$105k - $165k',
      growth: '+10%',
      icon: '🎯',
    },
    {
      title: 'DevOps Engineer',
      industry: 'Technology',
      avgSalary: '$125,000',
      range: '$100k - $155k',
      growth: '+18%',
      icon: '⚙️',
    },
    {
      title: 'UX/UI Designer',
      industry: 'Design',
      avgSalary: '$95,000',
      range: '$75k - $125k',
      growth: '+8%',
      icon: '🎨',
    },
    {
      title: 'Marketing Manager',
      industry: 'Marketing',
      avgSalary: '$90,000',
      range: '$70k - $120k',
      growth: '+7%',
      icon: '📱',
    },
  ];

  const salaryFactors = [
    {
      icon: MapPin,
      title: 'Location',
      description: 'Geographic location significantly impacts salary. Major tech hubs typically offer 20-40% higher compensation.',
      color: 'primary',
    },
    {
      icon: Award,
      title: 'Experience',
      description: 'Years of experience and skill level are key factors. Senior roles command 50-100% more than entry-level positions.',
      color: 'success',
    },
    {
      icon: Briefcase,
      title: 'Industry',
      description: 'Different industries have varying pay scales. Tech and finance typically offer higher compensation packages.',
      color: 'warning',
    },
    {
      icon: Users,
      title: 'Company Size',
      description: 'Larger companies often provide higher base salaries, while startups may offer more equity compensation.',
      color: 'info',
    },
  ];

  const industryAverages = [
    { industry: 'Technology', avg: '$115,000', change: '+14%', color: 'primary' },
    { industry: 'Finance', avg: '$105,000', change: '+9%', color: 'success' },
    { industry: 'Healthcare', avg: '$85,000', change: '+11%', color: 'warning' },
    { industry: 'Marketing', avg: '$75,000', change: '+7%', color: 'info' },
    { industry: 'Education', avg: '$65,000', change: '+5%', color: 'error' },
    { industry: 'Retail', avg: '$55,000', change: '+4%', color: 'secondary' },
  ];

  const negotiationTips = [
    'Research market rates thoroughly before negotiations',
    'Consider the entire compensation package, not just base salary',
    'Practice your negotiation pitch with a friend',
    'Be prepared to justify your salary expectations',
    'Know your walk-away number before starting',
    'Don\'t accept the first offer immediately',
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; text: string }> = {
      primary: { 
        bg: 'bg-primary-100 dark:bg-primary-900/30', 
        icon: 'text-primary-600 dark:text-primary-400',
        text: 'text-primary-600 dark:text-primary-400'
      },
      success: { 
        bg: 'bg-success-100 dark:bg-success-900/30', 
        icon: 'text-success-600 dark:text-success-400',
        text: 'text-success-600 dark:text-success-400'
      },
      warning: { 
        bg: 'bg-warning-100 dark:bg-warning-900/30', 
        icon: 'text-warning-600 dark:text-warning-400',
        text: 'text-warning-600 dark:text-warning-400'
      },
      error: { 
        bg: 'bg-error-100 dark:bg-error-900/30', 
        icon: 'text-error-600 dark:text-error-400',
        text: 'text-error-600 dark:text-error-400'
      },
      info: { 
        bg: 'bg-info-100 dark:bg-info-900/30', 
        icon: 'text-info-600 dark:text-info-400',
        text: 'text-info-600 dark:text-info-400'
      },
      secondary: { 
        bg: 'bg-secondary-100 dark:bg-secondary-700', 
        icon: 'text-secondary-600 dark:text-secondary-400',
        text: 'text-secondary-600 dark:text-secondary-400'
      },
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-success-600 dark:text-success-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Salary Guide 2026
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8">
                Comprehensive salary data to help you understand your worth and negotiate with confidence
              </p>
              
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                  Top Paying Roles
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Highest earning positions across industries
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-success-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPayingRoles.map((role, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{role.icon}</div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {role.growth}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    {role.industry}
                  </p>
                  <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-secondary-600 dark:text-secondary-400">
                        Average Salary
                      </span>
                      <span className="text-2xl font-bold text-success-600 dark:text-success-400">
                        {role.avgSalary}
                      </span>
                    </div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">
                      Range: {role.range}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                What Affects Your Salary?
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Key factors that influence compensation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {salaryFactors.map((factor, index) => {
                const Icon = factor.icon;
                const colors = getColorClasses(factor.color);
                
                return (
                  <Card key={index} className="p-6">
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      {factor.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {factor.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                  Average Salaries by Industry
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400">
                  Compare compensation across different sectors
                </p>
              </div>

              <Card className="divide-y divide-secondary-200 dark:divide-secondary-700">
                {industryAverages.map((item, index) => {
                  const colors = getColorClasses(item.color);
                  return (
                    <div key={index} className="p-6 flex items-center justify-between hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                          <span className="text-lg font-bold text-secondary-700 dark:text-secondary-300">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">
                            {item.industry}
                          </h3>
                          <p className="text-sm text-secondary-600 dark:text-secondary-400">
                            Industry average
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                          {item.avg}
                        </div>
                        <div className={`text-sm font-medium ${colors.text} flex items-center justify-end`}>
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {item.change}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                  Salary Negotiation Tips
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400">
                  Get the compensation you deserve
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {negotiationTips.map((tip, index) => (
                  <Card key={index} className="p-4 flex items-start space-x-4">
                    <div className="w-8 h-8 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-5 w-5 text-success-600 dark:text-success-400" />
                    </div>
                    <p className="text-secondary-900 dark:text-secondary-100 font-medium">
                      {tip}
                    </p>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 p-6 bg-info-50 dark:bg-info-900/20 border-info-200 dark:border-info-800">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-info-600 dark:text-info-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Pro Tip
                    </h3>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      Timing matters! The best time to negotiate is after receiving an offer but before accepting it. 
                      Once you've accepted, you have much less leverage. Always negotiate professionally and be prepared 
                      to walk away if the offer doesn't meet your minimum requirements.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-success-600 to-primary-600 dark:from-success-800 dark:to-primary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Know Your Worth
              </h2>
              <p className="text-xl text-success-100 mb-8">
                Use this data to negotiate confidently and advance your career
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/jobs"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium bg-white text-success-600 hover:bg-success-50 transition-colors"
                >
                  Find High-Paying Jobs
                </a>
                <a
                  href="/career-advice"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium border-2 border-white text-white hover:bg-white/10 transition-colors"
                >
                  Career Advice
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
