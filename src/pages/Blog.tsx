
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, CheckCircle, Target, BarChart3, MessageSquare, Bell } from 'lucide-react';

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Blog Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Article Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white p-8">
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
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              TenderBharat: Your AI-Powered Tendering Intelligence Platform
            </h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              TenderBharat isn't just another tender discovery tool—it's a full-stack intelligence platform that automates the entire tendering process, from discovery to deep analysis, delivering high-fit tenders tailored to your strengths.
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Say goodbye to endless document scans, missed opportunities, and guesswork. Here's how we simplify your workflow:
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-8 h-8 text-teal-600 mr-3" />
                How TenderBharat Works
              </h2>

              {/* Feature 1 - Smart Search */}
              <Card className="mb-8 border-l-4 border-l-teal-600">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-6 h-6 text-teal-600 mr-2" />
                    1. Smart Compatibility Matching
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    We analyze every tender against your past projects, preferences, and capacity, then rank them by relevance. No more sifting through irrelevant tenders—just high-potential matches.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <img 
                      src="/lovable-uploads/fe55c99d-508d-4b0c-91f1-81fc8c17f7a6.png" 
                      alt="Smart Search Page showing tenders ranked by compatibility"
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center italic">
                      Smart Search Page – Tenders ranked by compatibility with detailed scoring
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2 - Analysis */}
              <Card className="mb-8 border-l-4 border-l-blue-600">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
                    2. Work & Location Breakdown
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Visualize the scope, terrain, logistics, and payment weightages at a glance—no need to download documents. Our structured format includes:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                    <li>Chainage-level insights (e.g., road composition, flyovers)</li>
                    <li>Terrain & climate analysis (e.g., coastal, monsoon impact)</li>
                    <li>Material availability & logistical challenges</li>
                  </ul>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <img 
                        src="/lovable-uploads/7ec76e1b-5381-4fd3-a197-8d3abe56e6ba.png" 
                        alt="Tender Analysis Report showing location and work breakdown"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-600 mt-2 text-center italic">
                        Tender Analysis Report – Location & Work Breakdown
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <img 
                        src="/lovable-uploads/343cea75-421e-40f1-89c6-c9a172022dd9.png" 
                        alt="Payment Weightage and Scope Table"
                        className="w-full rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-600 mt-2 text-center italic">
                        Payment Weightage & Scope Table
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 3 - AI Assistant */}
              <Card className="mb-8 border-l-4 border-l-purple-600">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageSquare className="w-6 h-6 text-purple-600 mr-2" />
                    3. AI-Powered Assistance (Tender Robo)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Ask Tender Robo, your AI assistant, for:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                    <li>Custom tender searches (e.g., "Show tenders {'>'}200 Cr with {'<'}30% bridge work")</li>
                    <li>Market insights & risk analysis</li>
                    <li>Personalized scoring refinements based on your feedback</li>
                  </ul>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <img 
                      src="/lovable-uploads/e01751f1-02ec-4f38-8280-d686c13205da.png" 
                      alt="Tender Robo Chat Interface"
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center italic">
                      Tender Robo Chat Interface – AI-powered tender assistance
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 4 - Dashboard */}
              <Card className="mb-8 border-l-4 border-l-green-600">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Bell className="w-6 h-6 text-green-600 mr-2" />
                    4. Smart Notifications & Dashboard
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Get alerts for high-compatibility tenders and track updates in your dashboard.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <img 
                      src="/lovable-uploads/4c5fae77-897a-44d3-913a-282222d80b16.png" 
                      alt="Company Profile with Recent Updates"
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center italic">
                      Company Profile with Recent Updates and notifications
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Why TenderBharat */}
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why TenderBharat?</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">
                      <strong>No document reading</strong> – Critical info is extracted and summarized.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">
                      <strong>No guesswork</strong> – Data-driven scoring tells you what you can win.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">
                      <strong>No missed matches</strong> – AI ensures you see the best opportunities first.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-xl p-8 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Tendering Process?</h2>
                <p className="text-xl text-teal-100 mb-6">
                  🚀 Join TenderBharat today and let AI do the heavy lifting—so you can focus on winning.
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
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
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
