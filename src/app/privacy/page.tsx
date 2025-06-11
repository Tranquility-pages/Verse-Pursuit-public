'use client';

import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-biblical text-biblical-700 mb-8 text-center">
            Verse Pursuit Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none text-biblical-600">
            <p className="text-center text-lg mb-8">
              <strong>Effective Date: April 28, 2025</strong>
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">Introduction</h2>
              <p className="mb-4">
                Welcome to Verse Pursuit. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and protect your information when you use our mobile 
                application.
              </p>
              <p className="mb-4">
                Tranquility Pages ("we", "us", or "our") operates the Verse Pursuit mobile application (the "App").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-biblical-700 mb-3">Information You Provide to Us</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>User Profile Information:</strong> When you create a profile, we collect only your chosen 
                  display name and avatar selection. We do not collect email addresses, as the App uses anonymous 
                  authentication.
                </li>
                <li>
                  <strong>Purchase Information:</strong> When you make in-app purchases via our tip jar feature, 
                  payment information is processed by Apple App Store or Google Play Store, not by us. We receive 
                  only confirmation that a purchase was completed without any personal payment details.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-biblical-700 mb-3">Information Collected Automatically</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>Usage Data:</strong> We collect anonymous usage statistics to improve the App, including 
                  game completion rates, feature usage, and performance metrics.
                </li>
                <li>
                  <strong>Device Information:</strong> We collect basic device information such as device type, 
                  operating system version, and app version to troubleshoot issues and optimize performance.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide, maintain, and improve the App</li>
                <li>Process in-app purchases</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Fix bugs and resolve technical issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">Data Sharing and Disclosure</h2>
              <p className="mb-4">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> We share limited information with third-party vendors who 
                  provide services on our behalf, such as hosting (Supabase) and analytics.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law 
                  or in response to valid legal requests.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">Third-Party Services</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>Supabase:</strong> We use Supabase for database and anonymous authentication services. 
                  Their privacy policy can be found at <a href="https://supabase.io/privacy" className="text-biblical-500 hover:text-biblical-700">https://supabase.io/privacy</a>.
                </li>
                <li>
                  <strong>App Stores:</strong> The App is distributed through the Apple App Store and Google Play Store, 
                  which collect information according to their respective privacy policies.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information. However, no method 
                of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee 
                absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">Children's Privacy</h2>
              <p className="mb-4">
                The App is suitable for all ages and complies with the Children's Online Privacy Protection Act (COPPA). 
                We do not knowingly collect personal information from children under 13. If we discover we have collected 
                personal information from a child under 13, we will delete this information promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>The right to access information we have about you</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your information</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us at the email address provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting 
                the new privacy policy in the App and updating the "Effective Date" at the top of this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">California Privacy Rights</h2>
              <p className="mb-4">
                If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA). 
                For more information about your California privacy rights, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than the one in which you reside. 
                These countries may have different data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-biblical-700 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <p className="mb-4">
                <strong>Email:</strong> <a href="mailto:tranquilitypages@gmail.com" className="text-biblical-500 hover:text-biblical-700">tranquilitypages@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}