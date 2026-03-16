'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  Users, 
  Briefcase,
  FileText,
  Shield,
  CreditCard,
  Settings,
  MessageCircle,
  ChevronRight,
  Mail
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function HelpCenterPage() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: Users,
      title: 'Getting Started',
      description: 'Learn the basics of using Employrix',
      color: 'primary',
      articles: [
        { title: 'How to create an account', link: '#' },
        { title: 'Setting up your profile', link: '#' },
        { title: 'Understanding user roles', link: '#' },
        { title: 'Navigating the platform', link: '#' },
      ],
    },
    {
      icon: Briefcase,
      title: 'For Job Seekers',
      description: 'Find and apply for your dream job',
      color: 'success',
      articles: [
        { title: 'How to search for jobs', link: '#' },
        { title: 'Applying to job listings', link: '#' },
        { title: 'Uploading your resume', link: '#' },
        { title: 'Tracking your applications', link: '#' },
      ],
    },
    {
      icon: FileText,
      title: 'For Employers',
      description: 'Post jobs and find great candidates',
      color: 'warning',
      articles: [
        { title: 'How to post a job', link: '#' },
        { title: 'Managing job listings', link: '#' },
        { title: 'Reviewing applications', link: '#' },
        { title: 'Contacting candidates', link: '#' },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string }> = {
      primary: { bg: 'bg-primary-100 dark:bg-primary-900/30', icon: 'text-primary-600 dark:text-primary-400' },
      success: { bg: 'bg-success-100 dark:bg-success-900/30', icon: 'text-success-600 dark:text-success-400' },
      warning: { bg: 'bg-warning-100 dark:bg-warning-900/30', icon: 'text-warning-600 dark:text-warning-400' },
      error: { bg: 'bg-error-100 dark:bg-error-900/30', icon: 'text-error-600 dark:text-error-400' },
      info: { bg: 'bg-info-100 dark:bg-info-900/30', icon: 'text-info-600 dark:text-info-400' },
      secondary: { bg: 'bg-secondary-100 dark:bg-secondary-700', icon: 'text-secondary-600 dark:text-secondary-400' },
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <HelpCircle className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                How can we help you?
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8">
                Search our knowledge base or browse categories below
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Find answers organized by topic
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => {
                const Icon = category.icon;
                const colors = getColorClasses(category.color);
                
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      {category.description}
                    </p>
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <a
                            href={article.link}
                            className="flex items-center text-sm text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{article.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <MessageCircle className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Still need help?
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={ROUTES.CONTACT}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Support
                </Link>
                <a
                  href="mailto:support@employrix.com"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
                >
                  Email Us
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
