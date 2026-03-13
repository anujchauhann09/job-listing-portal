'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Users,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Search,
  FileText,
  BarChart,
  Globe,
  Award
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function HiringSolutionsPage() {
  const { user, logout } = useAuth();

  const solutions = [
    {
      icon: Search,
      title: 'Candidate Matching',
      description: 'Our platform matches your job postings with the most qualified candidates based on skills, experience, and cultural fit.',
      features: [
        'skill matching',
        'Experience level filtering',
        'Location-based search',
      ],
      color: 'primary'
    },
    {
      icon: Zap,
      title: 'Streamlined Hiring Process',
      description: 'Reduce time-to-hire with our efficient application tracking and candidate management system.',
      features: [
        'One-click application review',
        'Automated candidate screening',
        'Collaborative team reviews'
      ],
      color: 'success'
    },
    {
      icon: BarChart,
      title: 'Analytics & Insights',
      description: 'Make data-driven hiring decisions with comprehensive analytics and reporting tools.',
      features: [
        'Time-to-hire tracking',
        'Source effectiveness analysis',
        'Candidate quality reports'
      ],
      color: 'warning'
    },
    {
      icon: Globe,
      title: 'Wide Talent Reach',
      description: 'Access a diverse pool of qualified professionals actively seeking opportunities.',
      features: [
        'Nationwide candidate network',
        'Industry-specific talent pools',
        'Passive candidate outreach'
      ],
      color: 'info'
    }
  ];

  const stats = [
    { value: '1+', label: 'Active Candidates' },
    { value: '1+', label: 'Companies Hiring' },
    { value: '1+', label: 'Jobs Posted' },
    { value: '95%', label: 'Success Rate' }
  ];

  const testimonials = [
    {
      quote: "Employrix transformed our hiring process. We filled 5 positions in just 2 weeks!",
      author: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp Inc."
    },
    {
      quote: "The quality of candidates we receive through Employrix is exceptional. Highly recommended!",
      author: "Michael Chen",
      role: "Founder & CEO",
      company: "StartupHub"
    },
    {
      quote: "Best hiring platform we've used. The analytics help us optimize our recruitment strategy.",
      author: "Emily Rodriguez",
      role: "Talent Acquisition Manager",
      company: "Global Solutions Ltd."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Hiring Solutions That Work
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8">
                Find, attract, and hire top talent faster with our comprehensive recruitment platform. 
                Streamline your hiring process and build your dream team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <Link href={user?.role === 'employer' ? ROUTES.DASHBOARD_EMPLOYER : ROUTES.REGISTER}>
                    {user?.role === 'employer' ? 'Go to Dashboard' : 'Start Hiring Today'}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={ROUTES.CONTACT}>
                    Schedule a Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Complete Hiring Solutions
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Everything you need to attract, evaluate, and hire the best candidates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                    <div className={`w-12 h-12 rounded-lg bg-${solution.color}-100 dark:bg-${solution.color}-900/30 flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 text-${solution.color}-600 dark:text-${solution.color}-400`} />
                    </div>
                    <h3 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      {solution.description}
                    </p>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                          <span className="text-secondary-700 dark:text-secondary-300">{feature}</span>
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
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Get started in minutes and hire your next great employee
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">1</div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  Post Your Job
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Create a detailed job posting in minutes with our easy-to-use form
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-success-600 dark:text-success-400" />
                </div>
                <div className="text-2xl font-bold text-success-600 dark:text-success-400 mb-2">2</div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  Receive Applications
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Get matched with qualified candidates who fit your requirements
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-warning-600 dark:text-warning-400" />
                </div>
                <div className="text-2xl font-bold text-warning-600 dark:text-warning-400 mb-2">3</div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  Review & Interview
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Screen candidates and schedule interviews with our built-in tools
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-info-100 dark:bg-info-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-info-600 dark:text-info-400" />
                </div>
                <div className="text-2xl font-bold text-info-600 dark:text-info-400 mb-2">4</div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  Hire the Best
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Make your offer and onboard your new team member seamlessly
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Trusted by Leading Companies
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                See what our clients say about their hiring experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                    <p className="font-semibold text-secondary-900 dark:text-secondary-100">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-500">
                      {testimonial.company}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Save Time
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      Reduce time-to-hire by up to 50% with automated screening and smart matching
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-success-600 dark:text-success-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Better Quality
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      Access pre-screened candidates and improve hire quality with data-driven insights
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-warning-600 dark:text-warning-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Secure & Compliant
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      Enterprise-grade security with GDPR compliance and data protection
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-info-100 dark:bg-info-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-info-600 dark:text-info-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Team Collaboration
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      Involve your team in the hiring process with shared notes and feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join thousands of companies finding their perfect candidates on Employrix
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link href={user?.role === 'employer' ? ROUTES.DASHBOARD_EMPLOYER : ROUTES.REGISTER}>
                    {user?.role === 'employer' ? 'Post a Job Now' : 'Get Started Free'}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href={ROUTES.CONTACT}>
                    Talk to Sales
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
