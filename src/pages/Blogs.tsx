
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Target } from 'lucide-react';

const Blogs = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 'ai-powered-tendering',
      title: 'TenderBharat: Your AI-Powered Tendering Intelligence Platform',
      description: 'Discover how TenderBharat transforms the entire tendering process with AI-powered intelligence, from discovery to deep analysis.',
      date: 'January 15, 2025',
      author: 'TenderBharat Team',
      readTime: '5 min read',
      image: '/lovable-uploads/fe55c99d-508d-4b0c-91f1-81fc8c17f7a6.png'
    },
    {
      id: 'hidden-cost-manual-discovery',
      title: 'The Hidden Cost of Manual Tender Discovery (and the Smart Way Out)',
      description: 'Uncover the invisible costs of manual tender workflows and discover how smart automation can save millions from your bottom line.',
      date: 'January 20, 2025',
      author: 'TenderBharat Team',
      readTime: '7 min read',
      image: '/lovable-uploads/25ac090c-ecfe-4c65-a387-993b2dbb403d.png'
    },
    {
      id: 'revolutionising-tender-management',
      title: 'Revolutionising Tender Management for Infrastructure Success',
      description: 'A comprehensive presentation on how TenderBharat transforms the tendering landscape for modern contractors.',
      date: 'January 22, 2025',
      author: 'TenderBharat Team',
      readTime: '8 min read',
      image: '/lovable-uploads/95c62349-563f-430e-b186-974a1ead51d0.png'
    }
  ];

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog?id=${blogId}`);
  };

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

      {/* Blogs Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Blogs</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, updates, and expert perspectives on the future of tendering and procurement technology.
            </p>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card 
                key={post.id} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer group"
                onClick={() => handleBlogClick(post.id)}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-teal-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <div className="flex items-center text-teal-600 group-hover:text-teal-700 transition-colors">
                      <span className="text-sm font-medium mr-1">Read More</span>
                      <Target className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8 mt-16">
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

export default Blogs;
