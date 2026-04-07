'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Clock,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowLeft,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function SalaryNegotiationPage() {
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
                  Career Development
                </span>
                <span className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  12 min read
                </span>
              </div>

              <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Negotiating Your Salary: Strategies That Work
              </h1>

              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-6">
                Get the compensation you deserve. Learn proven negotiation tactics and when to use them for maximum impact.
              </p>

              <div className="flex items-center pt-6 border-t border-secondary-200 dark:border-secondary-700">
                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                  Published: March 6, 2026
                </div>
              </div>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  Salary negotiation is one of the most important conversations you'll have in your career, yet many professionals 
                  leave thousands of dollars on the table by accepting the first offer. This guide will equip you with proven 
                  strategies to negotiate confidently and secure the compensation you deserve.
                </p>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  1. Do Your Research First
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Knowledge is power in salary negotiations. Before any discussion:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Research Market Rates:</strong> Use sites like Glassdoor, Payscale, and Levels.fyi</li>
                  <li><strong>Consider Location:</strong> Factor in cost of living and regional differences</li>
                  <li><strong>Assess Your Value:</strong> Account for your experience, skills, and achievements</li>
                  <li><strong>Know the Company:</strong> Research their compensation philosophy and financial health</li>
                  <li><strong>Understand the Role:</strong> Clarify responsibilities and expectations</li>
                </ul>

                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 my-8">
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">Salary Research Tip</h3>
                      <p className="text-secondary-700 dark:text-secondary-300">
                        Aim for a range rather than a single number. Your target should be 10-20% above the market average 
                        if you have strong qualifications, with a minimum acceptable figure in mind.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  2. Timing Is Everything
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  When you negotiate matters as much as how you negotiate:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Wait for the Offer:</strong> Never discuss salary until you have a formal offer</li>
                  <li><strong>Let Them Go First:</strong> Whoever mentions a number first typically loses leverage</li>
                  <li><strong>Take Your Time:</strong> Ask for 24-48 hours to review the offer</li>
                  <li><strong>Annual Reviews:</strong> Prepare 3-6 months in advance with documented achievements</li>
                  <li><strong>Promotions:</strong> Negotiate before accepting new responsibilities</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  3. The Art of the Counter-Offer
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  How to respond when you receive an offer:
                </p>

                <div className="space-y-4 my-6">
                  <div className="bg-success-50 dark:bg-success-900/20 border-l-4 border-success-600 p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-success-900 dark:text-success-100 mb-1">Effective Response:</p>
                        <p className="text-sm text-success-800 dark:text-success-200">
                          "Thank you for the offer. I'm excited about the opportunity. Based on my research and experience, 
                          I was expecting something in the range of $X to $Y. Is there flexibility in the compensation package?"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-error-50 dark:bg-error-900/20 border-l-4 border-error-600 p-4">
                    <div className="flex items-start space-x-3">
                      <XCircle className="h-5 w-5 text-error-600 dark:text-error-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-error-900 dark:text-error-100 mb-1">Ineffective Response:</p>
                        <p className="text-sm text-error-800 dark:text-error-200">
                          "That's too low. I need at least $X or I'm not interested."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  4. Beyond Base Salary: Total Compensation
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  If base salary is fixed, negotiate other components:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Signing Bonus:</strong> One-time payment to bridge the gap</li>
                  <li><strong>Performance Bonus:</strong> Annual or quarterly incentives</li>
                  <li><strong>Equity/Stock Options:</strong> Ownership stake in the company</li>
                  <li><strong>Vacation Time:</strong> Additional PTO days</li>
                  <li><strong>Remote Work:</strong> Flexibility in work location</li>
                  <li><strong>Professional Development:</strong> Training budget or conference attendance</li>
                  <li><strong>Relocation Package:</strong> Moving expenses and temporary housing</li>
                  <li><strong>Early Review:</strong> Salary review after 6 months instead of 12</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  5. Building Your Case
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Support your request with concrete evidence:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Quantify Achievements:</strong> "Increased revenue by 30%" or "Reduced costs by $50K"</li>
                  <li><strong>Highlight Unique Skills:</strong> Certifications, languages, or specialized expertise</li>
                  <li><strong>Show Market Data:</strong> Reference industry salary reports</li>
                  <li><strong>Demonstrate Value:</strong> Explain how you'll contribute to company goals</li>
                  <li><strong>Present Competing Offers:</strong> If you have them (use carefully)</li>
                </ol>

                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 my-8">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">Pro Tip</h3>
                      <p className="text-secondary-700 dark:text-secondary-300">
                        Create a "brag document" throughout the year documenting your wins, projects completed, 
                        and positive feedback. This makes negotiation preparation much easier.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  6. Common Negotiation Mistakes to Avoid
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Accepting Too Quickly:</strong> Always take time to consider</li>
                  <li><strong>Being Apologetic:</strong> Don't apologize for negotiating</li>
                  <li><strong>Lying About Offers:</strong> Never fabricate competing offers</li>
                  <li><strong>Getting Emotional:</strong> Stay professional and fact-based</li>
                  <li><strong>Focusing Only on Salary:</strong> Consider the total package</li>
                  <li><strong>Negotiating Too Hard:</strong> Know when to accept a fair offer</li>
                  <li><strong>Burning Bridges:</strong> Maintain positive relationships regardless of outcome</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  7. Handling Different Scenarios
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Adapt your approach based on the situation:
                </p>

                <div className="space-y-4 my-6">
                  <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4">
                    <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      New Job Offer
                    </h4>
                    <p className="text-sm text-secondary-700 dark:text-secondary-300">
                      You have the most leverage here. Research thoroughly, counter confidently, and negotiate 
                      the entire package before accepting.
                    </p>
                  </div>

                  <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4">
                    <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Annual Review
                    </h4>
                    <p className="text-sm text-secondary-700 dark:text-secondary-300">
                      Document achievements throughout the year. Schedule a meeting specifically for compensation 
                      discussion. Present your case with data and examples.
                    </p>
                  </div>

                  <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4">
                    <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Promotion
                    </h4>
                    <p className="text-sm text-secondary-700 dark:text-secondary-300">
                      Negotiate before accepting new responsibilities. Research the market rate for the new role. 
                      Ensure compensation reflects increased scope.
                    </p>
                  </div>

                  <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4">
                    <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Counter-Offer from Current Employer
                    </h4>
                    <p className="text-sm text-secondary-700 dark:text-secondary-300">
                      Be cautious. Consider why you were looking to leave. Ensure the counter-offer addresses 
                      your concerns beyond just salary.
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  8. The Psychology of Negotiation
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Understanding negotiation psychology gives you an edge:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Anchoring:</strong> The first number sets the tone. Aim high but reasonable.</li>
                  <li><strong>Silence:</strong> After stating your number, stay quiet. Let them respond.</li>
                  <li><strong>Reciprocity:</strong> When they give something, be willing to compromise too.</li>
                  <li><strong>Framing:</strong> Present requests positively: "I'd like to discuss" vs "I need"</li>
                  <li><strong>Confidence:</strong> Believe in your worth. Confidence is contagious.</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  9. Sample Negotiation Scripts
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Use these templates as starting points:
                </p>

                <div className="bg-secondary-100 dark:bg-secondary-800 rounded-lg p-4 my-4">
                  <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    Initial Counter-Offer:
                  </p>
                  <p className="text-sm text-secondary-700 dark:text-secondary-300 italic">
                    "I'm very excited about this opportunity and appreciate the offer. Based on my research of similar 
                    roles in this market and my X years of experience with [specific skills], I was expecting a salary 
                    in the range of $X to $Y. Is there room for adjustment?"
                  </p>
                </div>

                <div className="bg-secondary-100 dark:bg-secondary-800 rounded-lg p-4 my-4">
                  <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    Requesting a Raise:
                  </p>
                  <p className="text-sm text-secondary-700 dark:text-secondary-300 italic">
                    "I'd like to discuss my compensation. Over the past year, I've [specific achievements with metrics]. 
                    Based on my contributions and market research, I believe a salary of $X would be appropriate. 
                    Can we discuss this?"
                  </p>
                </div>

                <div className="bg-secondary-100 dark:bg-secondary-800 rounded-lg p-4 my-4">
                  <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    When Salary Is Fixed:
                  </p>
                  <p className="text-sm text-secondary-700 dark:text-secondary-300 italic">
                    "I understand the base salary is set. Could we explore other aspects of the compensation package, 
                    such as a signing bonus, additional vacation days, or professional development budget?"
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  10. When to Walk Away
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Know your limits and be prepared to decline:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>The offer is significantly below market rate with no flexibility</li>
                  <li>The company shows disrespect during negotiations</li>
                  <li>Red flags emerge about company culture or stability</li>
                  <li>The role doesn't align with your career goals</li>
                  <li>You have a better offer elsewhere</li>
                </ul>

                <div className="bg-warning-50 dark:bg-warning-900/20 border-l-4 border-warning-600 p-4 my-6">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-warning-900 dark:text-warning-100 mb-1">Remember:</p>
                      <p className="text-sm text-warning-800 dark:text-warning-200">
                        Walking away from a low offer isn't failure—it's protecting your worth. The right opportunity 
                        will value your contributions appropriately.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  Conclusion
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  Salary negotiation is a skill that improves with practice. By doing thorough research, timing your 
                  discussions strategically, and presenting your case confidently, you can secure compensation that 
                  reflects your true value. Remember, companies expect negotiation—it's a normal part of the hiring 
                  process. The worst they can say is no, and you'll be no worse off than before you asked.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
                Related Articles
              </h3>
              <div className="space-y-4">
                <Link
                  href="/career-advice/resume-writing-2026"
                  className="block p-4 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
                >
                  <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">
                    How to Write a Resume That Gets You Hired in 2026
                  </h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    8 min read • Resume Tips
                  </p>
                </Link>
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
              </div>
            </Card>

            <Card className="p-8 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-center">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Ready to Find Your Next Opportunity?
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                Explore positions that offer competitive compensation and growth potential.
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
