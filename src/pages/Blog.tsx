
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, CheckCircle, Target, BarChart3, MessageSquare, Bell, Clock, Search, FileText, TrendingUp, Zap, Eye, Filter } from 'lucide-react';

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                TenderBharat
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-teal-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Blogs Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            TenderBharat Blogs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, updates, and guides to help you master the tendering landscape with AI-powered intelligence.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* First Blog Post */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white p-6">
              <div className="flex items-center space-x-4 text-teal-100 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">January 15, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">TenderBharat Team</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 leading-tight">
                TenderBharat: Your AI-Powered Tendering Intelligence Platform
              </h2>
              <p className="text-teal-100 leading-relaxed">
                A full-stack intelligence platform that automates the entire tendering process, from discovery to deep analysis.
              </p>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Say goodbye to endless document scans, missed opportunities, and guesswork. Here's how we simplify your workflow:
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Smart Compatibility Matching</h3>
                    <p className="text-gray-600 text-sm">Analyze tenders against your past projects and rank by relevance.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <BarChart3 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Work & Location Breakdown</h3>
                    <p className="text-gray-600 text-sm">Visualize scope, terrain, and logistics at a glance.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">AI-Powered Assistant</h3>
                    <p className="text-gray-600 text-sm">Ask Tender Robo for custom searches and market insights.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Smart Notifications</h3>
                    <p className="text-gray-600 text-sm">Get alerts for high-compatibility tenders instantly.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </article>

          {/* Second Blog Post */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white p-6">
              <div className="flex items-center space-x-4 text-orange-100 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">January 12, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">TenderBharat Team</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 leading-tight">
                Tender Bharat: The Tender Race Has Changed
              </h2>
              <p className="text-orange-100 leading-relaxed">
                In today's fast-paced infrastructure market, identifying and acting on the right tender at the right time is critical.
              </p>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Contractors are flooded with opportunities, but spotting the right one in time can make the difference between a profitable year and missed growth.
              </p>

              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 text-red-600 mr-2" />
                  Current Workflow Challenges
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Search className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Searching 30+ fragmented portals with captchas</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Manually reading bulky PDFs for work scopes</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Filter className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Prioritizing without smart systems or standards</span>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Zap className="w-5 h-5 text-teal-600 mr-2" />
                  What We Do Differently
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Analyze tenders against your capacity and strengths</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Target className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Surface tenders you can realistically win</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Eye className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Visualize work scope clearly at a glance</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  Discover More
                </Button>
              </div>
            </div>
          </article>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-xl p-8 text-center text-white mt-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Tendering Process?</h2>
          <p className="text-xl text-teal-100 mb-6">
            Join TenderBharat today and let AI do the heavy lifting—so you can focus on winning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Sign Up Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg bg-transparent"
            >
              Request Demo
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            TenderBharat: Where Intelligence Meets Opportunity.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="text-xl font-bold">TenderBharat</span>
          </div>
          <p className="text-gray-400">&copy; 2025 TenderBharat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
