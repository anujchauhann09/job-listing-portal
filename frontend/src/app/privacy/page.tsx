'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1 bg-secondary-50 dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-secondary-900 dark:text-secondary-100 mb-4">
              Privacy Policy
            </h1>
            <p className="text-center text-secondary-600 dark:text-secondary-400 text-lg">
              Last updated: March 6, 2026
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  At Employrix, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our job listing platform. 
                  Please read this privacy policy carefully.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <Database className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Information We Collect
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                  Personal Information
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials (username and password)</li>
                  <li>Profile information (bio, skills, experience, education)</li>
                  <li>Resume and cover letter documents</li>
                  <li>Company information (for employers)</li>
                  <li>Job application data and preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3 mt-6">
                  Automatically Collected Information
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  When you access our platform, we automatically collect:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Log data and analytics information</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <Eye className="h-6 w-6 text-success-600 dark:text-success-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    How We Use Your Information
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Create and manage your account</li>
                  <li>Process job applications and connect job seekers with employers</li>
                  <li>Personalize your experience and provide relevant recommendations</li>
                  <li>Analyze usage patterns and improve our platform</li>
                  <li>Prevent fraud and ensure platform security</li>
                  <li>Comply with legal obligations</li>
                  <li>Communicate with you about our services</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <UserCheck className="h-6 w-6 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Information Sharing and Disclosure
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li><strong>With Employers:</strong> When you apply for a job, we share your profile and application materials with the employer</li>
                  <li><strong>Service Providers:</strong> We work with third-party service providers who help us operate our platform</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> We may share information with your explicit permission</li>
                </ul>
                <p className="text-secondary-600 dark:text-secondary-400 mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <Lock className="h-6 w-6 text-error-600 dark:text-error-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Data Security
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  We implement appropriate technical and organizational measures to protect your information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication using JWT tokens and HTTP-only cookies</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and employee training</li>
                  <li>Secure data storage and backup procedures</li>
                </ul>
                <p className="text-secondary-600 dark:text-secondary-400 mt-4">
                  However, no method of transmission over the internet is 100% secure. While we strive to 
                  protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Your Rights and Choices
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Restrict Processing:</strong> Limit how we use your information</li>
                </ul>
                <p className="text-secondary-600 dark:text-secondary-400 mt-4">
                  To exercise these rights, please contact us at privacy@employrix.com or through your account settings.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Cookies and Tracking Technologies
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  We use cookies and similar technologies to enhance your experience. For detailed information 
                  about our cookie practices, please see our <a href="/cookies" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">Cookie Policy</a>.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Children's Privacy
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400">
                  Our platform is not intended for users under the age of 16. We do not knowingly collect 
                  personal information from children. If you believe we have collected information from a 
                  child, please contact us immediately.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                International Data Transfers
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place to protect your information in accordance 
                  with this Privacy Policy and applicable laws.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Changes to This Privacy Policy
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                  We encourage you to review this Privacy Policy periodically.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Contact Us
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <ul className="list-none space-y-2 text-secondary-600 dark:text-secondary-400">
                      <li><strong>Email:</strong> privacy@employrix.com</li>
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
