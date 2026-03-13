'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { Cookie, Shield, Settings, Eye, CheckCircle, Info } from 'lucide-react';

export default function CookiePolicyPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1 bg-secondary-50 dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Cookie className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-secondary-900 dark:text-secondary-100 mb-4">
              Cookie Policy
            </h1>
            <p className="text-center text-secondary-600 dark:text-secondary-400 text-lg">
              Last updated: March 6, 2026
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  This Cookie Policy explains how Employrix uses cookies and similar tracking technologies 
                  to recognize you when you visit our platform. It explains what these technologies are, 
                  why we use them, and your rights to control our use of them.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <Info className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    What Are Cookies?
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  Cookies are small text files that are placed on your device (computer, smartphone, or tablet) 
                  when you visit a website. They are widely used to make websites work more efficiently and 
                  provide information to website owners.
                </p>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Cookies can be "persistent" (remain on your device until deleted or expired) or "session" 
                  (deleted when you close your browser). They can also be "first-party" (set by the website 
                  you're visiting) or "third-party" (set by other websites).
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <Eye className="h-6 w-6 text-success-600 dark:text-success-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    How We Use Cookies
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  We use cookies for several purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>To keep you signed in to your account</li>
                  <li>To remember your preferences and settings</li>
                  <li>To understand how you use our platform</li>
                  <li>To improve our services and user experience</li>
                  <li>To provide personalized content and recommendations</li>
                  <li>To ensure platform security and prevent fraud</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
                Types of Cookies We Use
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                    1. Essential Cookies (Required)
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-3">
                    These cookies are necessary for the platform to function and cannot be disabled. 
                    They are usually set in response to actions you take, such as logging in or filling out forms.
                  </p>
                  <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Examples:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-secondary-600 dark:text-secondary-400">
                      <li><strong>Authentication Cookies:</strong> HTTP-only cookies that store your session tokens (access and refresh tokens)</li>
                      <li><strong>Security Cookies:</strong> Cookies that help detect and prevent security threats</li>
                      <li><strong>Load Balancing:</strong> Cookies that ensure your requests are routed to the correct server</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-success-600 pl-4">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                    2. Functional Cookies
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-3">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your preferences and settings.
                  </p>
                  <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Examples:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-secondary-600 dark:text-secondary-400">
                      <li><strong>Theme Preference:</strong> Remembers your dark/light mode preference</li>
                      <li><strong>Language Settings:</strong> Stores your preferred language</li>
                      <li><strong>Search Filters:</strong> Remembers your job search filters and preferences</li>
                      <li><strong>UI Preferences:</strong> Stores your layout and display preferences</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-warning-600 pl-4">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                    3. Analytics Cookies
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-3">
                    These cookies help us understand how visitors interact with our platform by collecting 
                    and reporting information anonymously.
                  </p>
                  <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Examples:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-secondary-600 dark:text-secondary-400">
                      <li><strong>Usage Analytics:</strong> Tracks which pages you visit and features you use</li>
                      <li><strong>Performance Metrics:</strong> Measures page load times and errors</li>
                      <li><strong>User Behavior:</strong> Analyzes how users navigate through the platform</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Authentication Cookies (Technical Details)
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  For security and authentication, we use HTTP-only cookies that cannot be accessed by 
                  JavaScript. This protects your session from XSS (Cross-Site Scripting) attacks.
                </p>
                
                <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-6 mb-4">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                    Our Authentication Cookies:
                  </h3>
                  <ul className="space-y-3 text-secondary-600 dark:text-secondary-400">
                    <li>
                      <strong className="text-secondary-900 dark:text-secondary-100">Access Token Cookie:</strong>
                      <ul className="list-disc pl-6 mt-1 space-y-1 text-sm">
                        <li>Contains your JWT access token</li>
                        <li>Expires in 15 minutes</li>
                        <li>HTTP-only and Secure flags enabled</li>
                        <li>SameSite=Strict for CSRF protection</li>
                      </ul>
                    </li>
                    <li>
                      <strong className="text-secondary-900 dark:text-secondary-100">Refresh Token Cookie:</strong>
                      <ul className="list-disc pl-6 mt-1 space-y-1 text-sm">
                        <li>Contains your refresh token for obtaining new access tokens</li>
                        <li>Expires in 7 days</li>
                        <li>HTTP-only and Secure flags enabled</li>
                        <li>SameSite=Strict for CSRF protection</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <p className="text-secondary-600 dark:text-secondary-400">
                  These cookies are essential for maintaining your logged-in state and cannot be disabled 
                  if you want to use authenticated features of the platform.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <Settings className="h-6 w-6 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Managing Your Cookie Preferences
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  You have several options to manage cookies:
                </p>

                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                  Browser Settings
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  Most browsers allow you to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li>View and delete cookies</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies (this may affect functionality)</li>
                  <li>Clear cookies when you close your browser</li>
                </ul>

                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3 mt-6">
                  Browser-Specific Instructions
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>

                <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-4 mt-6">
                  <p className="text-sm text-warning-800 dark:text-warning-200">
                    <strong>Note:</strong> Blocking or deleting cookies may affect your ability to use certain 
                    features of Employrix, including staying logged in and accessing personalized content.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Third-Party Cookies
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  We may use third-party services that set their own cookies. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li><strong>OAuth Providers:</strong> Google, GitHub, LinkedIn for social login</li>
                  <li><strong>Analytics Services:</strong> To understand platform usage</li>
                  <li><strong>CDN Providers:</strong> To deliver content efficiently</li>
                </ul>
                <p className="text-secondary-600 dark:text-secondary-400 mt-4">
                  These third parties have their own privacy policies and cookie policies. We recommend 
                  reviewing their policies to understand how they use cookies.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-4">
                <CheckCircle className="h-6 w-6 text-success-600 dark:text-success-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Your Rights
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  Under data protection laws, you have rights regarding cookies:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-secondary-600 dark:text-secondary-400">
                  <li><strong>Right to be informed:</strong> We provide clear information about our cookie use</li>
                  <li><strong>Right to access:</strong> You can see what cookies are stored on your device</li>
                  <li><strong>Right to withdraw consent:</strong> You can change your cookie preferences at any time</li>
                  <li><strong>Right to object:</strong> You can object to certain types of cookies</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Updates to This Policy
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-400">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for legal, operational, or regulatory reasons. We will notify you of any material 
                  changes by posting the updated policy on this page with a new "Last updated" date.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
              <div className="flex items-start space-x-4">
                <Info className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Contact Us
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      If you have questions about our use of cookies, please contact us:
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
