'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { 
  BookOpen,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';

export default function CareerAdvicePage() {
  const { user, logout } = useAuth();

  const featuredArticles = [
    {
      title: 'How to Write a Resume That Gets You Hired in 2026',
      excerpt: 'Learn the latest resume trends and best practices that will make your application stand out to recruiters and hiring managers.',
      category: 'Resume Tips',
      readTime: '8 min read',
      image: '📄',
      featured: true,
      link: '/career-advice/resume-writing-2026',
    },
    {
      title: 'Mastering the Virtual Interview: A Complete Guide',
      excerpt: 'Remote interviews are here to stay. Discover how to ace your next virtual interview with confidence and professionalism.',
      category: 'Interview Skills',
      readTime: '10 min read',
      image: '💻',
      featured: true,
      link: '/career-advice/virtual-interview-guide',
    },
    {
      title: 'Negotiating Your Salary: Strategies That Work',
      excerpt: 'Get the compensation you deserve. Learn proven negotiation tactics and when to use them for maximum impact.',
      category: 'Career Development',
      readTime: '12 min read',
      image: '💰',
      featured: true,
      link: '/career-advice/salary-negotiation',
    },
  ];

  const quickTips = [
    'Update your LinkedIn profile regularly',
    'Network before you need a job',
    'Practice your elevator pitch',
    'Keep learning new skills',
    'Ask for feedback regularly',
    'Build a portfolio of your work',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Career Advice & Resources
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8">
                Expert guidance to help you navigate your career journey and achieve your professional goals
              </p>
              
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                  Featured Articles
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Must-read content for career success
                </p>
              </div>
              <Star className="h-8 w-8 text-warning-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <Link key={index} href={article.link}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group h-full">
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center text-6xl">
                      {article.image}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                          {article.category}
                        </span>
                        <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                  Quick Career Tips
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400">
                  Simple actions you can take today
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickTips.map((tip, index) => (
                  <Card key={index} className="p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-secondary-900 dark:text-secondary-100 font-medium">
                      {tip}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Take the Next Step?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Start applying these insights to your career today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/jobs"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium bg-white text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Browse Jobs
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
                <a
                  href="/profile"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium border-2 border-white text-white hover:bg-white/10 transition-colors"
                >
                  Update Your Profile
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
