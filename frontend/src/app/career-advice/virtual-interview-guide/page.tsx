'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Clock, 
  Eye,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowLeft,
  Share2,
  Bookmark,
  Monitor,
  Wifi,
  Camera,
  Mic
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function VirtualInterviewGuidePage() {
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
                  Interview Skills
                </span>
                <span className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  10 min read
                </span>
                <span className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  18.7K views
                </span>
              </div>

              <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Mastering the Virtual Interview: A Complete Guide
              </h1>

              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-6">
                Remote interviews are here to stay. Discover how to ace your next virtual interview with confidence and professionalism.
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
                  Virtual interviews have become the standard in modern hiring. Whether you're interviewing from home, 
                  a coffee shop, or anywhere in between, mastering the virtual interview format is essential for career success. 
                  This comprehensive guide will help you navigate every aspect of remote interviewing.
                </p>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  1. Technical Setup and Testing
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Technical issues can derail even the best interview. Prepare your setup at least 24 hours in advance:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Wifi className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">Internet Connection</h4>
                        <p className="text-sm text-secondary-700 dark:text-secondary-300">
                          Test your connection speed. Use ethernet if possible. Have a backup plan (mobile hotspot).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Camera className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">Camera Quality</h4>
                        <p className="text-sm text-secondary-700 dark:text-secondary-300">
                          Position camera at eye level. Ensure good lighting. Test video quality beforehand.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Mic className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">Audio Setup</h4>
                        <p className="text-sm text-secondary-700 dark:text-secondary-300">
                          Use headphones to prevent echo. Test microphone levels. Eliminate background noise.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Monitor className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">Platform Familiarity</h4>
                        <p className="text-sm text-secondary-700 dark:text-secondary-300">
                          Download required software. Test screen sharing. Know how to mute/unmute.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  2. Creating the Perfect Interview Environment
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Your environment speaks volumes about your professionalism:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Background:</strong> Choose a clean, uncluttered space. Neutral walls work best. Avoid distracting items.</li>
                  <li><strong>Lighting:</strong> Face a window or lamp. Avoid backlighting. Use soft, natural light when possible.</li>
                  <li><strong>Noise Control:</strong> Find a quiet room. Inform household members. Turn off notifications and devices.</li>
                  <li><strong>Comfort:</strong> Sit in a comfortable chair. Maintain good posture. Keep water nearby.</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  3. Professional Appearance and Body Language
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Dress and act as you would for an in-person interview:
                </p>

                <div className="space-y-4 my-6">
                  <div className="bg-success-50 dark:bg-success-900/20 border-l-4 border-success-600 p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-success-900 dark:text-success-100 mb-1">Do:</p>
                        <ul className="text-sm text-success-800 dark:text-success-200 space-y-1">
                          <li>• Dress professionally from head to toe</li>
                          <li>• Make eye contact by looking at the camera</li>
                          <li>• Smile and show enthusiasm</li>
                          <li>• Use hand gestures naturally</li>
                          <li>• Sit up straight and lean slightly forward</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-error-50 dark:bg-error-900/20 border-l-4 border-error-600 p-4">
                    <div className="flex items-start space-x-3">
                      <XCircle className="h-5 w-5 text-error-600 dark:text-error-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-error-900 dark:text-error-100 mb-1">Don't:</p>
                        <ul className="text-sm text-error-800 dark:text-error-200 space-y-1">
                          <li>• Wear pajamas or overly casual clothing</li>
                          <li>• Look at yourself on screen constantly</li>
                          <li>• Fidget or play with objects</li>
                          <li>• Eat, drink, or chew gum</li>
                          <li>• Slouch or lean back excessively</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  4. Preparing Your Content
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Virtual interviews allow for strategic preparation:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>Keep your resume and job description visible (but don't read from them)</li>
                  <li>Prepare notes with key talking points and questions</li>
                  <li>Have examples of your work ready to share</li>
                  <li>Research the company thoroughly</li>
                  <li>Practice your STAR method responses</li>
                  <li>Prepare thoughtful questions for the interviewer</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  5. During the Interview: Best Practices
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Execute these strategies during your virtual interview:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Join Early:</strong> Log in 5-10 minutes before the scheduled time</li>
                  <li><strong>Greet Professionally:</strong> Smile and introduce yourself clearly</li>
                  <li><strong>Manage Delays:</strong> Account for audio lag; pause before responding</li>
                  <li><strong>Engage Actively:</strong> Nod, smile, and show you're listening</li>
                  <li><strong>Speak Clearly:</strong> Enunciate and maintain a moderate pace</li>
                  <li><strong>Handle Technical Issues:</strong> Stay calm and have a backup communication method</li>
                </ol>

                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 my-8">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">Pro Tip</h3>
                      <p className="text-secondary-700 dark:text-secondary-300">
                        Place sticky notes with key points around your screen's border. This keeps important information 
                        visible while maintaining natural eye contact with the camera.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  6. Common Virtual Interview Challenges
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Be prepared to handle these common issues:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li><strong>Connection Drops:</strong> Have the interviewer's phone number ready. Reconnect quickly and apologize briefly.</li>
                  <li><strong>Audio Issues:</strong> Use chat to communicate. Switch to phone if necessary.</li>
                  <li><strong>Interruptions:</strong> Apologize professionally and refocus immediately.</li>
                  <li><strong>Screen Sharing:</strong> Practice beforehand. Close unnecessary tabs and applications.</li>
                  <li><strong>Awkward Silences:</strong> Don't panic. Take a breath and ask for clarification if needed.</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  7. Following Up After the Interview
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  Your follow-up is just as important virtually:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>Send a thank-you email within 24 hours</li>
                  <li>Reference specific conversation points from the interview</li>
                  <li>Reiterate your interest and qualifications</li>
                  <li>Provide any additional information requested</li>
                  <li>Connect on LinkedIn if appropriate</li>
                </ul>

                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-8 mb-4">
                  Conclusion
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  Virtual interviews require the same preparation as in-person meetings, plus additional technical 
                  considerations. By mastering your setup, creating a professional environment, and practicing your 
                  delivery, you'll project confidence and competence. Remember, the goal is to make the technology 
                  invisible so your skills and personality can shine through.
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
                Ready to Ace Your Next Interview?
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                Practice makes perfect. Start applying to positions that match your skills.
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
