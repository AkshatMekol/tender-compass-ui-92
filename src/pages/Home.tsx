
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Search, BarChart3, Shield, Users, CheckCircle, ArrowRight, Star, Globe, Award } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const painPoints = [
    {
      icon: "📈",
      title: "Idle Machinery",
      description: "Not bagging a new tender ahead of time, cause expensive assets to sit unused"
    },
    {
      icon: "💰",
      title: "Cash Crunches",
      description: "Nightmares like bounced EMIs and delayed salaries become reality"
    },
    {
      icon: "⚡",
      title: "Panic Bidding",
      description: "Desperate need for work forces contractors to bid at extremely low rates"
    },
    {
      icon: "🌙",
      title: "All other work sidelined",
      description: "Tenders consume focus, slowing down everything else"
    }
  ];

  const features = [
    {
      title: "Preparing shortlists",
      description: "Identify the right opportunities before the race even begins."
    },
    {
      title: "Complete past result context",
      description: "Get insights from previous bids to guide smarter decisions."
    },
    {
      title: "Estimating BOQs",
      description: "Deep AI assistance in quantity generations"
    },
    {
      title: "Filling tender documents",
      description: "Auto-fill forms with precision quickly"
    }
  ];

  const testimonials = [
    {
      name: "Mr. Pranav Singh Chaudhri",
      company: "New India Contractors & Developers",
      designation: "Managing Director",
      text: "Tender Bharat has drastically improved the speed and clarity of our tendering process. It's streamlined our workflow and has the potential to become an industry benchmark",
      rating: 5
    },
    {
      name: "Mr. Hardik Goyal",
      company: "Hardik Construction Company",
      designation: "Managing Director",
      text: "I've always preferred reviewing tenders myself. With Tender Bharat, I can now go deep into 10x more tenders, without depending on my team. It's a game-changer for decision-makers like me",
      rating: 5
    },
    {
      name: "Mr. Prince Garg",
      company: "DK Infra",
      designation: "Managing Partner",
      text: "With Tender Bharat, we always feel in control of relevant tenders. It removes the stress of tracking corrigendums or missing critical updates—letting us stay focused on project execution",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                TenderBharat
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/blogs')}
                className="text-gray-600 hover:text-teal-600"
              >
                Blogs
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-teal-600"
              >
                Sign In
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
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Redefining{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tender Management
            </span>
            <br />
            with AI
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Let AI Handle the Hard Work, So Your Team Can Focus on What Matters
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                console.log('Schedule Demo clicked');
              }}
              className="px-10 py-4 text-lg border-2 hover:bg-gray-50 bg-white"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-4">Ever found out a tender result... and thought... 🤔</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              "When did this even get published?"
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Now imagine how many high-value tenders your team never even knew existed.
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-lg text-gray-600 mb-4">Pain points 😰</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              When Tender Planning Fails,{' '}
              <span className="text-red-600">the Fallout Is Brutal</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <Card key={index} className="p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{point.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h4>
                    <p className="text-gray-600">{point.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-lg text-blue-600 mb-4">Our Vision 🔥</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Let AI Handle the Hard Work,{' '}
              <span className="text-blue-600">So Your Team Can Focus on What Matters</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Because your team should be solving problems not juggling with tasks
            </p>
          </div>
          
          {/* How We Help */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                  {feature.title.includes("BOQs") || feature.title.includes("documents") ? (
                    <span className="inline-block mt-2 text-xs text-blue-600 font-medium">(Under Development)</span>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What our clients say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white p-8">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{testimonial.company}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.designation}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-700 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
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
              className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                // You can add schedule demo functionality here
                console.log('Schedule Demo clicked');
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TenderBharat</span>
              </div>
              <p className="text-gray-400 mb-4">
                India's leading tender discovery platform, powered by AI.
              </p>
              <div className="flex space-x-4">
                <Globe className="w-5 h-5 text-gray-400" />
                <Award className="w-5 h-5 text-gray-400" />
                <Shield className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
                <li>Enterprise</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Status</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TenderBharat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
