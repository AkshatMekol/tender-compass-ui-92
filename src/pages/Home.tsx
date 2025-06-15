
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Search, BarChart3, Shield, Users, CheckCircle, ArrowRight, Star, Globe, Award } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: "Smart Tender Search",
      description: "AI-powered search to find the most relevant tenders for your business"
    },
    {
      icon: BarChart3,
      title: "Tender Compatibility",
      description: "Get the compatibility between your company and tender"
    },
    {
      icon: Shield,
      title: "Deep Tender Insights and Knowledge",
      description: "Stay updated with regulatory requirements and deadlines"
    },
    {
      icon: Users,
      title: "Tender Tracking",
      description: "Shortlist and win your favourite tenders"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Active Tenders" },
    { value: "500+", label: "Partner Organizations" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "Support Available" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Tech Solutions Pvt Ltd",
      text: "TenderBharat transformed our tender process. We've won 3x more contracts since using their platform.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      company: "Infrastructure Corp",
      text: "The AI-powered matching is incredible. We only see tenders that are perfect for our business.",
      rating: 5
    },
    {
      name: "Amit Patel",
      company: "Digital Services Ltd",
      text: "Best tender platform in India. Their analytics helped us understand the market better.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-teal-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                TenderBharat
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-gray-700 hover:text-teal-600 hover:bg-white/20 backdrop-blur-sm"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-teal-500/90 to-blue-600/90 hover:from-teal-600/90 hover:to-blue-700/90 text-white backdrop-blur-sm border border-white/20"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Tender
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            India's most advanced tender discovery platform. Use AI to find, analyze, and win government and private sector tenders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-teal-500/90 to-blue-600/90 hover:from-teal-600/90 hover:to-blue-700/90 text-white px-8 py-4 text-lg backdrop-blur-sm border border-white/20"
            >
              Start Finding Tenders
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                console.log('Schedule Demo clicked');
              }}
              className="px-8 py-4 text-lg border-2 border-white/30 hover:bg-white/20 bg-white/10 backdrop-blur-sm text-gray-800"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TenderBharat?
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with deep market insights to give you a competitive edge.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500/90 to-blue-600/90 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-700">
              Get started in minutes and start winning tenders
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500/90 to-red-600/90 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Sign Up & Set Preferences</h3>
              <p className="text-gray-700">
                Create your account and tell us about your business interests and capabilities.
              </p>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500/90 to-blue-600/90 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">AI Matches Relevant Tenders</h3>
              <p className="text-gray-700">
                Our AI analyzes thousands of tenders and shows you only the most relevant opportunities.
              </p>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/90 to-pink-600/90 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Apply & Win</h3>
              <p className="text-gray-700">
                Use our tools to prepare winning proposals and track your applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Companies
            </h2>
            <p className="text-xl text-gray-700">
              See what our customers say about TenderBharat
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-r from-teal-600/90 to-blue-700/90 rounded-3xl backdrop-blur-md border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Tender Process?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of companies already using TenderBharat to win more contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-white/90 text-teal-600 hover:bg-white px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                console.log('Schedule Demo clicked');
              }}
              className="border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg bg-transparent backdrop-blur-sm"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/10 backdrop-blur-md border-t border-white/20 text-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TenderBharat</span>
              </div>
              <p className="text-gray-600 mb-4">
                India's leading tender discovery platform, powered by AI.
              </p>
              <div className="flex space-x-4">
                <Globe className="w-5 h-5 text-gray-600" />
                <Award className="w-5 h-5 text-gray-600" />
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
                <li>Enterprise</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Status</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300/20 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 TenderBharat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
