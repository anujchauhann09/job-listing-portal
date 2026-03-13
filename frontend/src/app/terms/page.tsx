'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

export default function TermsOfServicePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1 bg-secondary-50 dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-secondary-900 dark:text-secondary-100 mb-4">
              Terms of Service
            </h1>
            <p className="text-center text-secondary-600 dark:text-secondary-400 text-lg">
              Last updated: March 6, 2026
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  Welcome to Employrix. These Terms of Service ("Terms") govern your access to and use of 
                  our job listing platform. By accessing or using Employrix, you agree to be bound by these Terms. 
                  If you do not agree to these Terms, please do not use our services.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <Scale className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    1. Acceptance of Terms
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  By creating an account or using Employrix, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all users, 
                  including job seekers, employers, and visitors.
                </p>
                <p className="text-secondary-600 dark:text-secondary-400">
                  You must be at least 16 years old to use our services. By using Employrix, you represent 
                  and warrant that you meet this age requirement.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                2. User Accounts
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                  Account Creation
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  To access certain features, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>

                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3 mt-6">
                  Account Types
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  We offer two types of accounts:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li><strong>Job Seeker Accounts:</strong> For individuals seeking employment opportunities</li>
                  <li><strong>Employer Accounts:</strong> For companies and organizations posting job listings</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <CheckCircle className="h-6 w-6 text-success-600 dark:text-success-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    3. Acceptable Use
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  You agree to use Employrix only for lawful purposes. You must not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Post false, misleading, or fraudulent information</li>
                  <li>Impersonate any person or entity</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated systems (bots, scrapers) without permission</li>
                  <li>Post spam, advertisements, or promotional content</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit viruses or malicious code</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                4. Job Seeker Responsibilities
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  As a job seeker, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Provide truthful and accurate information in your profile and applications</li>
                  <li>Keep your resume and profile information up to date</li>
                  <li>Respond professionally to employer communications</li>
                  <li>Not apply for positions you are not qualified for or interested in</li>
                  <li>Respect employer confidentiality and proprietary information</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                5. Employer Responsibilities
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  As an employer, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Post only legitimate job opportunities</li>
                  <li>Provide accurate job descriptions and requirements</li>
                  <li>Comply with all employment laws and regulations</li>
                  <li>Not discriminate based on protected characteristics</li>
                  <li>Respect candidate privacy and confidentiality</li>
                  <li>Not use candidate information for purposes other than hiring</li>
                  <li>Respond to applications in a timely and professional manner</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                6. Content and Intellectual Property
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                  Your Content
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  You retain ownership of content you submit (profiles, resumes, job postings). By submitting 
                  content, you grant us a license to use, display, and distribute it as necessary to provide 
                  our services.
                </p>

                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3 mt-6">
                  Our Content
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  All platform content, features, and functionality (including design, text, graphics, logos) 
                  are owned by Employrix and protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <XCircle className="h-6 w-6 text-error-600 dark:text-error-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    7. Prohibited Activities
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  The following activities are strictly prohibited:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Posting fake jobs or pyramid schemes</li>
                  <li>Requesting payment from job seekers</li>
                  <li>Collecting personal information for unauthorized purposes</li>
                  <li>Engaging in discriminatory hiring practices</li>
                  <li>Posting adult content or illegal services</li>
                  <li>Attempting to circumvent our fees or payment systems</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <Shield className="h-6 w-6 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    8. Disclaimers and Limitations
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  Employrix is provided "as is" without warranties of any kind. We do not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Guarantee job placement or hiring success</li>
                  <li>Verify the accuracy of user-submitted information</li>
                  <li>Endorse any employer or job seeker</li>
                  <li>Guarantee uninterrupted or error-free service</li>
                  <li>Assume responsibility for user interactions or transactions</li>
                </ul>
                <p className="text-secondary-600 dark:text-secondary-400 mt-4">
                  To the maximum extent permitted by law, we are not liable for any indirect, incidental, 
                  special, or consequential damages arising from your use of our services.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                9. Termination
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  We may suspend or terminate your account if you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Violate these Terms</li>
                  <li>Engage in fraudulent or illegal activities</li>
                  <li>Harm other users or our platform</li>
                  <li>Fail to pay applicable fees</li>
                </ul>
                <p className="text-secondary-600 dark:text-secondary-400 mt-4">
                  You may terminate your account at any time through your account settings. Upon termination, 
                  your right to use our services ceases immediately.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                10. Dispute Resolution
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  Any disputes arising from these Terms or your use of Employrix will be resolved through:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Good faith negotiation between the parties</li>
                  <li>Binding arbitration if negotiation fails</li>
                  <li>Governing law of the State of California, USA</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                11. Changes to Terms
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400">
                  We may update these Terms from time to time. We will notify you of material changes by 
                  posting the new Terms on this page and updating the "Last updated" date. Your continued 
                  use of Employrix after changes constitutes acceptance of the new Terms.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                12. General Provisions
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Employrix</li>
                  <li><strong>Severability:</strong> If any provision is found invalid, the remaining provisions remain in effect</li>
                  <li><strong>Waiver:</strong> Our failure to enforce any right does not waive that right</li>
                  <li><strong>Assignment:</strong> You may not assign these Terms without our consent</li>
                  <li><strong>Force Majeure:</strong> We are not liable for delays due to circumstances beyond our control</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Contact Us
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      If you have questions about these Terms of Service, please contact us:
                    </p>
                    <ul className="list-none space-y-2 text-secondary-600 dark:text-secondary-400">
                      <li><strong>Email:</strong> legal@employrix.com</li>
                      <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                      <li><strong>Address:</strong> Dehradun, Uttarakhand, India</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
