
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, CheckCircle, Target, BarChart3, MessageSquare, Bell, Clock, Search, FileText, TrendingUp, Zap, Eye, Filter, ChevronRight } from 'lucide-react';

const Blog = () => {
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "TenderBharat: Your AI-Powered Tendering Intelligence Platform",
      date: "January 15, 2025",
      author: "TenderBharat Team",
      summary: "A full-stack intelligence platform that automates the entire tendering process, from discovery to deep analysis.",
      color: "from-teal-600 to-blue-700",
      content: {
        intro: "Say goodbye to endless document scans, missed opportunities, and guesswork. Here's how we simplify your workflow:",
        features: [
          {
            icon: Target,
            title: "Smart Compatibility Matching",
            description: "Analyze tenders against your past projects and rank by relevance."
          },
          {
            icon: BarChart3,
            title: "Work & Location Breakdown",
            description: "Visualize scope, terrain, and logistics at a glance."
          },
          {
            icon: MessageSquare,
            title: "AI-Powered Assistant",
            description: "Ask Tender Robo for custom searches and market insights."
          },
          {
            icon: Bell,
            title: "Smart Notifications",
            description: "Get alerts for high-compatibility tenders instantly."
          }
        ],
        expandedContent: {
          title: "How It Works",
          description: "TenderBharat leverages advanced AI algorithms to transform how contractors discover and evaluate tenders:",
          points: [
            "Automated scanning of 30+ tender portals",
            "Real-time document analysis and classification",
            "Intelligent matching based on your company profile",
            "Predictive scoring for win probability"
          ]
        }
      }
    },
    {
      id: 2,
      title: "Tender Bharat: The Tender Race Has Changed",
      date: "January 12, 2025",
      author: "TenderBharat Team",
      summary: "In today's fast-paced infrastructure market, identifying and acting on the right tender at the right time is critical.",
      color: "from-orange-600 to-red-700",
      content: {
        intro: "Contractors are constantly flooded with new opportunities — but spotting the right one in time can be the difference between a profitable year and a missed growth cycle.",
        mainText: "To stay ahead in this environment, contractors must act fast, plan ahead, and remain consistently updated on relevant tenders. Missing just one high-fit opportunity can throw off months of planning and severely impact business outcomes.",
        challenges: {
          title: "Why Staying Updated Is Still So Difficult",
          description: "Despite the critical nature of tender discovery, most procurement teams are still trapped in outdated, manual workflows that haven't evolved with the scale or pace of today's tender ecosystem.",
          items: [
            {
              icon: Search,
              text: "Searching across 30+ fragmented portals, often dealing with captchas and unintuitive interfaces"
            },
            {
              icon: Clock,
              text: "Waiting on missing technical documents to arrive before any real evaluation can begin"
            },
            {
              icon: FileText,
              text: "Manually reading bulky PDFs, extracting work scopes, BOQs, and eligibility details"
            },
            {
              icon: Filter,
              text: "Prioritizing tenders without any standard or smart system, often relying on guesswork and senior judgment"
            }
          ]
        },
        solution: {
          title: "What Tender Bharat Does Differently",
          description: "Tender Bharat is not just a discovery tool. It's a full-stack intelligence platform that automates the entire tendering process — from discovery to deep work analysis — and serves high-fit tenders tailored to your strengths.",
          items: [
            {
              icon: TrendingUp,
              text: "We analyze every tender and match it against your past work, preferences, and capacity."
            },
            {
              icon: Target,
              text: "We surface the tenders you can realistically win."
            },
            {
              icon: Eye,
              text: "We visualize the scope of work clearly, so you know what's involved with just one glance."
            }
          ]
        }
      }
    }
  ];

  const currentBlog = selectedBlog ? blogPosts.find(blog => blog.id === selectedBlog) : null;

  if (currentBlog) {
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
                  onClick={() => setSelectedBlog(null)}
                  className="text-gray-600 hover:text-teal-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blogs
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

        {/* Individual Blog Post */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <article className="max-w-4xl mx-auto">
            <div className={`bg-gradient-to-r ${currentBlog.color} text-white rounded-t-2xl p-8`}>
              <div className="flex items-center space-x-4 text-white/80 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{currentBlog.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{currentBlog.author}</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                {currentBlog.title}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                {currentBlog.summary}
              </p>
            </div>

            <div className="bg-white rounded-b-2xl shadow-xl p-8">
              {currentBlog.id === 1 && (
                <>
                  <p className="text-gray-700 mb-8 text-lg">
                    {currentBlog.content.intro}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {currentBlog.content.features?.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <feature.icon className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-teal-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 text-xl">{currentBlog.content.expandedContent?.title}</h3>
                    <p className="text-gray-700 mb-4">{currentBlog.content.expandedContent?.description}</p>
                    <ul className="space-y-2">
                      {currentBlog.content.expandedContent?.points.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {currentBlog.id === 2 && (
                <>
                  <p className="text-gray-700 mb-6 text-lg">
                    {currentBlog.content.intro}
                  </p>
                  <p className="text-gray-700 mb-8 text-lg">
                    {currentBlog.content.mainText}
                  </p>

                  <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-4 text-xl flex items-center">
                      <Clock className="w-6 h-6 text-red-600 mr-3" />
                      {currentBlog.content.challenges?.title}
                    </h3>
                    <p className="text-gray-700 mb-6">{currentBlog.content.challenges?.description}</p>
                    
                    <div className="bg-red-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Current Workflow Challenges:</h4>
                      <div className="space-y-4">
                        {currentBlog.content.challenges?.items.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <item.icon className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4 text-xl flex items-center">
                      <Zap className="w-6 h-6 text-teal-600 mr-3" />
                      {currentBlog.content.solution?.title}
                    </h3>
                    <p className="text-gray-700 mb-6">{currentBlog.content.solution?.description}</p>
                    
                    <h4 className="font-semibold text-gray-900 mb-4">Here's how we simplify your workflow:</h4>
                    <div className="space-y-4">
                      {currentBlog.content.solution?.items.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <item.icon className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </article>

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
        </div>
      </div>
    );
  }

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
            Blogs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, updates, and guides to help you master the tendering landscape with AI-powered intelligence.
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {blogPosts.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBlog(blog.id)}>
              <CardContent className="p-0">
                <div className={`bg-gradient-to-r ${blog.color} text-white p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-white/80 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{blog.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{blog.author}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/80" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 leading-tight">
                    {blog.title}
                  </h2>
                  <p className="text-white/90 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
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
