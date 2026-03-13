'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FileText, 
  Clock, 
  Eye,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowLeft,
  Share2,
  Bookmark
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function ResumeWriting2026Page() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1 bg-secondary-50 dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto mb-6">
            <Link
              href={ROUTES.CAREER_ADVICE}
              className="inline-flex items-center text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Career Advice
            </Link>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <Card className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium">
                  Resume Tips
                </span>
                <span className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  8 min read
                </span>
                <span className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  25.3K views
                </span>
              </div>

              <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                How to Write a Resume That Gets You Hired in 2026
              </h1>

              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-6">
                Learn the latest resume trends and best practices that will make your application stand out to recruiters and hiring managers.
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-secondary-200 dark:border-secondary-700">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-secondary-600 dark:text-secondary-400">
                    Published: March 6, 2026
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  In today's competitive job market, your resume is often your first—and sometimes only—chance to make an impression. 
                  With hiring managers spending an average of just 6-7 seconds on initial resume reviews, every word counts. 
                  Here's how to craft a resume that captures attention and lands interviews in 2026.
                </p>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  1. Optimize for Applicant Tracking Systems (ATS)
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Over 90% of large companies use ATS software to filter resumes before they reach human eyes. To pass these systems:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>Use standard section headings (Experience, Education, Skills)</li>
                  <li>Include relevant keywords from the job description</li>
                  <li>Avoid tables, text boxes, and complex formatting</li>
                  <li>Save your resume as a .docx or PDF file</li>
                  <li>Use standard fonts like Arial, Calibri, or Times New Roman</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  2. Lead with a Powerful Summary
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Replace outdated objective statements with a compelling professional summary that highlights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>Your years of experience and area of expertise</li>
                  <li>Key achievements with quantifiable results</li>
                  <li>Unique value proposition</li>
                  <li>Relevant skills and certifications</li>
                </ul>

                <div className="bg-success-50 dark:bg-success-900/20 border-l-4 border-success-600 p-4 my-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-success-900 dark:text-success-100 mb-1">Good Example:</p>
                      <p className="text-sm text-success-800 dark:text-success-200">
                        "Results-driven Software Engineer with 5+ years of experience building scalable web applications. 
                        Increased system performance by 40% and reduced costs by $200K annually through optimization initiatives. 
                        Expert in React, Node.js, and cloud architecture."
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  3. Quantify Your Achievements
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Numbers speak louder than words. Transform vague descriptions into concrete achievements:
                </p>

                <div className="space-y-4 my-6">
                  <div className="bg-error-50 dark:bg-error-900/20 border-l-4 border-error-600 p-4">
                    <div className="flex items-start space-x-3">
                      <XCircle className="h-5 w-5 text-error-600 dark:text-error-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-error-900 dark:text-error-100 mb-1">Weak:</p>
                        <p className="text-sm text-error-800 dark:text-error-200">
                          "Responsible for managing social media accounts"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-success-50 dark:bg-success-900/20 border-l-4 border-success-600 p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-success-900 dark:text-success-100 mb-1">Strong:</p>
                        <p className="text-sm text-success-800 dark:text-success-200">
                          "Grew Instagram following from 5K to 50K in 6 months, increasing engagement rate by 150% 
                          and generating $100K in sales through targeted campaigns"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  4. Tailor Your Resume for Each Application
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Generic resumes rarely succeed. Customize your resume by:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>Matching your skills to the job requirements</li>
                  <li>Using keywords from the job posting</li>
                  <li>Highlighting relevant experience first</li>
                  <li>Adjusting your summary to align with the role</li>
                  <li>Emphasizing achievements that matter most for that position</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  5. Modern Resume Format Best Practices
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  In 2026, successful resumes follow these formatting guidelines:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Length:</strong> 1 page for &lt;10 years experience, 2 pages for senior roles</li>
                  <li><strong>Font Size:</strong> 10-12pt for body text, 14-16pt for headings</li>
                  <li><strong>Margins:</strong> 0.5-1 inch on all sides</li>
                  <li><strong>White Space:</strong> Use adequate spacing for readability</li>
                  <li><strong>Bullet Points:</strong> 3-5 per role, starting with action verbs</li>
                  <li><strong>Reverse Chronological:</strong> Most recent experience first</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  6. Essential Sections to Include
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Every strong resume should contain:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Contact Information:</strong> Name, phone, email, LinkedIn, location (city/state)</li>
                  <li><strong>Professional Summary:</strong> 3-4 lines highlighting your value</li>
                  <li><strong>Work Experience:</strong> Relevant positions with achievements</li>
                  <li><strong>Education:</strong> Degrees, certifications, relevant coursework</li>
                  <li><strong>Skills:</strong> Technical and soft skills relevant to the role</li>
                  <li><strong>Optional:</strong> Projects, publications, awards, volunteer work</li>
                </ol>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  7. Common Mistakes to Avoid
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>Typos and grammatical errors</li>
                  <li>Using personal pronouns (I, me, my)</li>
                  <li>Including irrelevant information</li>
                  <li>Listing job duties instead of achievements</li>
                  <li>Using an unprofessional email address</li>
                  <li>Including photos (unless required in your country)</li>
                  <li>Lying or exaggerating qualifications</li>
                  <li>Using passive voice</li>
                </ul>

                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 my-8">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">Pro Tip</h3>
                      <p className="text-secondary-700 dark:text-secondary-300">
                        Before submitting, ask 2-3 people to review your resume. Fresh eyes catch errors you might miss 
                        and provide valuable feedback on clarity and impact.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  Conclusion
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  Writing an effective resume in 2026 requires balancing ATS optimization with human appeal. 
                  Focus on quantifiable achievements, tailor your content to each role, and maintain clean, 
                  professional formatting. Remember, your resume is a marketing document—make every word count 
                  and showcase the unique value you bring to potential employers.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
                Related Articles
              </h3>
              <div className="space-y-4">
                <Link
                  href="/career-advice/virtual-interview-guide"
                  className="block p-4 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
                >
                  <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">
                    Mastering the Virtual Interview: A Complete Guide
                  </h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    10 min read • Interview Skills
                  </p>
                </Link>
                <Link
                  href="/career-advice/salary-negotiation"
                  className="block p-4 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
                >
                  <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">
                    Negotiating Your Salary: Strategies That Work
                  </h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    12 min read • Career Development
                  </p>
                </Link>
              </div>
            </Card>

            <Card className="p-8 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-center">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Ready to Put Your Resume to Work?
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                Start applying to jobs that match your skills and experience.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href={ROUTES.JOBS}>
                  Browse Job Opportunities
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
