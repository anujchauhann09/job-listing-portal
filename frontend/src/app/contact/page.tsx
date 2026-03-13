'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import emailjs from '@emailjs/browser';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Clock,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function ContactPage() {
  const { user, logout } = useAuth();
  
  const getUserName = () => {
    if (!user) return '';
    if (user.role === 'job-seeker') {
      const profile = user.profile as any;
      return profile?.firstName || '';
    }
    if (user.role === 'employer') {
      const profile = user.profile as any;
      return profile?.companyName || '';
    }
    return '';
  };
  
  const [formData, setFormData] = useState({
    name: getUserName(),
    email: user?.email || '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const contactTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey || !contactTemplateId) {
        throw new Error('EmailJS configuration is missing. Please check environment variables.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      await emailjs.send(
        serviceId,
        contactTemplateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSuccess(true);
      setFormData({
        name: getUserName(),
        email: user?.email || '',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error('Failed to send message:', err);
      setError(err.message || 'Failed to send message. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1 bg-secondary-50 dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-secondary-900 dark:text-secondary-100 mb-4">
              Contact Us
            </h1>
            <p className="text-center text-secondary-600 dark:text-secondary-400 text-lg max-w-2xl mx-auto">
              Have a question or need assistance? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
                    Get in Touch
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary-900 dark:text-secondary-100 mb-1">
                          Email
                        </h3>
                        <a 
                          href="mailto:support@employrix.com"
                          className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          support@employrix.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-success-600 dark:text-success-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary-900 dark:text-secondary-100 mb-1">
                          Phone
                        </h3>
                        <a 
                          href="tel:+15551234567"
                          className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-warning-600 dark:text-warning-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary-900 dark:text-secondary-100 mb-1">
                          Address
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400">
                          Dehradun<br />
                          Uttarakhand<br />
                          India - 248140
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-info-100 dark:bg-info-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-info-600 dark:text-info-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary-900 dark:text-secondary-100 mb-1">
                          Business Hours
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400">
                          Monday - Friday<br />
                          9:00 AM - 6:00 PM PST
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                        Need Quick Help?
                      </h3>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                        Check out our Help Center for instant answers to common questions.
                      </p>
                      <Link
                        href={ROUTES.HELP}
                        className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        Visit Help Center →
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
                    Send us a Message
                  </h2>

                  {success && (
                    <div className="mb-6 p-4 rounded-lg bg-success-50 border border-success-200 dark:bg-success-900/20 dark:border-success-800 flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-success-900 dark:text-success-100 mb-1">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-sm text-success-700 dark:text-success-300">
                          Thank you for contacting us. We'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-error-50 border border-error-200 dark:bg-error-900/20 dark:border-error-800 flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-error-900 dark:text-error-100 mb-1">
                          Error Sending Message
                        </h3>
                        <p className="text-sm text-error-700 dark:text-error-300">
                          {error}
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />

                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100 resize-none"
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                      <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                        {formData.message.length}/1000 characters
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        We typically respond within 24 hours
                      </p>
                      <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        disabled={loading}
                        className="flex items-center space-x-2"
                      >
                        <Send className="h-4 w-4" />
                        <span>{loading ? 'Sending...' : 'Send Message'}</span>
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
