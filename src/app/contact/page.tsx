'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-biblical-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/assets/images/bible_android12.png" 
                alt="Verse Pursuit" 
                className="w-16 h-16 mr-4 rounded-2xl"
              />
              <h1 className="text-4xl md:text-6xl font-biblical text-biblical-700">
                Contact Us
              </h1>
            </div>
            <p className="text-xl text-biblical-600">
              We'd love to hear from you! Get in touch with the Verse Pursuit team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-biblical text-biblical-700 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-biblical-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-biblical-700 mb-2">Email Support</h3>
                    <p className="text-biblical-600 mb-2">
                      For technical support, bug reports, or general inquiries
                    </p>
                    <a 
                      href="mailto:tranquilitypages@gmail.com"
                      className="text-biblical-500 hover:text-biblical-700 font-medium"
                    >
                      tranquilitypages@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-biblical-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-biblical-700 mb-2">Tranquility Pages</h3>
                    <p className="text-biblical-600">
                      The team behind Verse Pursuit, dedicated to creating meaningful Christian technology experiences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-biblical-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-biblical-700 mb-2">Response Time</h3>
                    <p className="text-biblical-600">
                      We typically respond to emails within 24-48 hours during business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Reasons */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-biblical-700 mb-6">What can we help you with?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "🐛", title: "Bug Reports", desc: "Found an issue? Let us know!" },
                    { icon: "💡", title: "Feature Requests", desc: "Ideas for new features" },
                    { icon: "🤝", title: "Partnerships", desc: "Church or ministry partnerships" },
                    { icon: "📚", title: "Content Suggestions", desc: "New verse categories or content" },
                    { icon: "❓", title: "General Support", desc: "Questions about the game" },
                    { icon: "🎓", title: "Educational Use", desc: "Using Verse Pursuit in schools" }
                  ].map((item, index) => (
                    <div key={index} className="bg-biblical-50 rounded-lg p-4 border border-biblical-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h4 className="font-semibold text-biblical-700">{item.title}</h4>
                          <p className="text-sm text-biblical-600">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-lg p-8 border border-biblical-200"
            >
              <h2 className="text-2xl font-biblical text-biblical-700 mb-6">Send us a Message</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-biblical-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-biblical-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biblical-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-biblical-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-biblical-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biblical-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-biblical-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-biblical-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biblical-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="content">Content Suggestion</option>
                    <option value="support">General Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-biblical-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-biblical-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biblical-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-biblical-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-biblical-700 transition-colors focus:outline-none focus:ring-2 focus:ring-biblical-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-6 p-4 bg-biblical-50 rounded-lg border border-biblical-200">
                <p className="text-sm text-biblical-600">
                  <strong>Note:</strong> This form sends an email directly to our support team. 
                  We respect your privacy and will never share your contact information.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-biblical-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-biblical text-biblical-700 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: "Is Verse Pursuit really free to play?",
                  answer: "Yes! The web version is completely free to play. The mobile app is also free with optional tip jar donations to support development."
                },
                {
                  question: "What Bible translations are used in the game?",
                  answer: "We primarily use the King James Version (KJV) for consistency, but we're working on adding support for multiple translations in future updates."
                },
                {
                  question: "Can I play offline?",
                  answer: "The mobile app supports offline single-player mode. The web version requires an internet connection for the best experience."
                },
                {
                  question: "Is this suitable for children?",
                  answer: "Absolutely! Verse Pursuit is designed to be family-friendly and is perfect for children, youth groups, and Sunday school classes."
                },
                {
                  question: "How can I suggest new verses or categories?",
                  answer: "We love suggestions! Use the contact form above or email us directly with your ideas for new content."
                },
                {
                  question: "Can churches use this for educational purposes?",
                  answer: "Yes! Many churches use Verse Pursuit for youth groups, Bible study classes, and family events. Contact us about partnership opportunities."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-biblical-200">
                  <h3 className="text-lg font-semibold text-biblical-700 mb-3">{faq.question}</h3>
                  <p className="text-biblical-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}