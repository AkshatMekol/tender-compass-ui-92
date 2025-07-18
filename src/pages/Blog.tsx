
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, CheckCircle, Target, BarChart3, MessageSquare, Bell, Link, FileText, Dice6 } from 'lucide-react';

const Blog = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get('id') || 'ai-powered-tendering';

  const blogContent = {
    'ai-powered-tendering': {
      title: 'TenderBharat: Your AI-Powered Tendering Intelligence Platform',
      subtitle: 'TenderBharat isn\'t just another tender discovery tool—it\'s a full-stack intelligence platform that automates the entire tendering process, from discovery to deep analysis, delivering high-fit tenders tailored to your strengths.',
      date: 'January 15, 2025',
      author: 'TenderBharat Team',
      content: (
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
        </div>
      )
    },
    'hidden-cost-manual-discovery': {
      title: 'The Hidden Cost of Manual Tender Discovery (and the Smart Way Out)',
      subtitle: 'In today\'s high-speed infrastructure race, winning tenders isn\'t just about finding opportunities — it\'s about finding the right ones, fast. Yet most contractors are still stuck in outdated, manual workflows that lead to missed bids, margin erosion, and planning chaos.',
      date: 'January 20, 2025',
      author: 'TenderBharat Team',
      content: (
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            This is the invisible cost most firms don't talk about — but it's silently draining millions from their bottom line every year.
          </p>

          {/* Problem 1 - Portal Fatigue */}
          <Card className="mb-8 border-l-4 border-l-red-600">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Link className="w-6 h-6 text-red-600 mr-2" />
                1. The Portal Fatigue Problem
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You log in, scan the CPWD portal, jump to NHAI, try a captcha — and repeat it 11 more times. By the time you're done, it's noon. And you've likely still missed a high-fit tender that could've changed your Q4.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Contractors routinely monitor over 12+ government portals — from NHAI to CPWD to state-level sites — all with different logins, interfaces, and update mechanisms.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>No centralized tracking</li>
                <li>CAPTCHA overload</li>
                <li>Critical updates buried inside bulky PDFs</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold">
                  Result: 68% of relevant tenders are still missed by top-tier firms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Problem 2 - Document Black Box */}
          <Card className="mb-8 border-l-4 border-l-yellow-600">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 text-yellow-600 mr-2" />
                2. The Document Black Box
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Once the tender is found, the real bottleneck begins:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Handwritten BOQs slow down quantification</li>
                <li>Conflicting clauses waste analyst time</li>
                <li>Work breakdowns need manual rebuilding</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 font-semibold">
                  57% of bid teams waste 30+ hours/week just decoding documents.
                </p>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Even worse: Teams spend most of their time rejecting tenders, not pursuing them. In the average contractor's scope, 471 tenders may be published monthly — but analyzing even a fraction is nearly impossible for one person. Valuable time is lost waiting for documents, scanning 100+ pages just to realize the tender is not a fit due to scope or payment plans buried deep inside.
              </p>
              <p className="text-lg font-semibold text-gray-800 italic text-center mb-6">
                The jewel is lost amidst the noise.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <img 
                    src="/lovable-uploads/1c245bcc-a836-4ccf-9a57-97d14031df77.png" 
                    alt="Overwhelming nature of traditional tender documents"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center italic">
                    Traditional: Overwhelming document chaos
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <img 
                    src="/lovable-uploads/25ac090c-ecfe-4c65-a387-993b2dbb403d.png" 
                    alt="TenderBharat structured data presentation"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center italic">
                    TenderBharat: Clean, structured insights
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problem 3 - Guesswork Gamble */}
          <Card className="mb-8 border-l-4 border-l-orange-600">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Dice6 className="w-6 h-6 text-orange-600 mr-2" />
                3. The Guesswork Gamble
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Without data-led tools:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">42%</div>
                  <div className="text-sm text-red-700">of bids fail on technical grounds</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">31%</div>
                  <div className="text-sm text-yellow-700">of wins end up eroding margin</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">28%</div>
                  <div className="text-sm text-orange-700">of capacity stays idle</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-100 to-orange-100 border border-red-300 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-red-700 mb-2">₹9.8 Cr/year</div>
                <div className="text-red-600 font-medium">Average loss due to manual tender workflows</div>
              </div>
            </CardContent>
          </Card>

          {/* Solution */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What TenderBharat Does Differently</h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Unlike legacy platforms, TenderBharat automates every step — from discovery to decision.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-lg">
                  Matches tenders to your past work and current capacity
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-lg">
                  Highlights tenders you can realistically win
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-lg">
                  Visualizes scope, eligibility, and BOQs in seconds
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-xl font-bold text-teal-800">
                No missed opportunities. No blind bets. Just precision-built tendering for modern contractors.
              </p>
            </div>
          </div>
        </div>
      )
    },
    'revolutionising-tender-management': {
      title: 'Revolutionising Tender Management for Infrastructure Success',
      subtitle: 'A comprehensive presentation on how TenderBharat transforms the tendering landscape for modern contractors.',
      date: 'January 22, 2025',
      author: 'TenderBharat Team',
      content: (
        <div className="prose prose-lg max-w-none">
          {/* Slide 1 - Hero Slide */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white rounded-xl p-12 mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionising Tender Management for Infrastructure Success
            </h2>
            <div className="flex justify-center items-center mt-8">
              <img 
                src="/lovable-uploads/95c62349-563f-430e-b186-974a1ead51d0.png" 
                alt="Professional handshake with city skyline representing infrastructure success"
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>

          {/* Slide 2 - The Problem */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              The Tendering Chaos: Missed Opportunities and Manual Mayhem
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
              The infrastructure race demands speed and intelligence in tendering, yet contractors are mired in outdated, manual workflows. This inefficiency leads to significant missed opportunities and wasted time.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Disjointed Portals</h3>
                  <p className="text-red-700">Over 12 different portals, each with unique interfaces.</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">No Centralised Tracking</h3>
                  <p className="text-yellow-700">Impossible to track all tenders efficiently across various sources.</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">CAPTCHA Overload</h3>
                  <p className="text-orange-700">Excessive CAPTCHA challenges hinder swift access to information.</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Buried Updates</h3>
                  <p className="text-purple-700">Critical updates hidden within bulky, unsearchable PDFs.</p>
                </div>
              </div>
              <div className="text-center">
                <img 
                  src="/lovable-uploads/0203eee6-cea4-4ace-a7be-576b016bf25d.png" 
                  alt="Visual representation of manual tender search chaos"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="text-center p-6 bg-red-50 rounded-lg">
                <div className="text-4xl font-bold text-red-600 mb-2">68%</div>
                <div className="text-red-700 font-medium">Tenders Missed</div>
                <p className="text-sm text-red-600 mt-2">An alarming percentage of relevant tenders are overlooked.</p>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">57%</div>
                <div className="text-orange-700 font-medium">Time Wasted</div>
                <p className="text-sm text-orange-600 mt-2">Teams spend 30+ hours weekly just decoding documents.</p>
              </div>
            </div>
          </div>

          {/* Slide 3 - The 4-Step Pain Loop */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              The 4-Step Pain Loop: Why Tendering Is Broken
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
              The current tendering process traps teams in a repetitive loop of inefficiency, consuming valuable time on rejection rather than strategic bidding.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Scan Portals & Filter</h3>
                    <p className="text-gray-700">Manually sifting through countless portals and downloading filtered tenders.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Track Incomplete Tenders</h3>
                    <p className="text-gray-700">Constantly checking back for updates on partially completed tenders.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manually Read PDFs</h3>
                    <p className="text-gray-700">Teams spend hours poring over bulky, dense PDF documents.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manual Shortlisting</h3>
                    <p className="text-gray-700">Painstakingly shortlisting tenders without automated assistance.</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <img 
                  src="/lovable-uploads/e4352a3c-ac4f-41ad-9a2f-535d0199487a.png" 
                  alt="The 4-step pain loop illustration"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8 text-center">
              <p className="text-red-800 font-medium">
                On average, contractors encounter 471 tenders per month, yet they can't analyse even a fraction due to these bottlenecks. 
                Over 100 pages are often scanned just to reject a tender based on scope or payment terms, highlighting the critical need for automation.
              </p>
            </div>
          </div>

          {/* Slide 4 - The Solution */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Tender Bharat Automates It All
            </h2>
            <p className="text-lg text-center mb-8 leading-relaxed text-teal-100">
              We go beyond simple discovery. Tender Bharat leverages advanced AI to analyse, score, and surface tenders perfectly tailored to your strengths, providing a full understanding at a glance.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-teal-200" />
                    <h3 className="font-semibold text-white">Smart Compatibility Match</h3>
                  </div>
                  <p className="text-teal-100">Precision matching to tenders aligned with your capabilities.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Target className="w-6 h-6 text-teal-200" />
                    <h3 className="font-semibold text-white">Work & Location Breakdown</h3>
                  </div>
                  <p className="text-teal-100">Detailed insights into project scope and geographical relevance.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Bell className="w-6 h-6 text-teal-200" />
                    <h3 className="font-semibold text-white">Smart Notifications</h3>
                  </div>
                  <p className="text-teal-100">Timely alerts for critical updates and new opportunities.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <MessageSquare className="w-6 h-6 text-teal-200" />
                    <h3 className="font-semibold text-white">Tender Robo Assistant</h3>
                  </div>
                  <p className="text-teal-100">AI-powered assistant for streamlined tender analysis and support.</p>
                </div>
              </div>
              <div className="text-center">
                <img 
                  src="/lovable-uploads/7e946969-c907-4519-b594-8f17e6b25dd4.png" 
                  alt="Tender Bharat automation features"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8 text-center">
              <p className="text-xl font-bold text-white">
                No document reading. No guesswork. No missed matches.
              </p>
            </div>
          </div>

          {/* Slide 5 - Product Features & CTA */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Built for Contractors Who Want to Win More, Waste Less
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">Special Offer!</div>
                  <p className="text-green-700 font-medium">First 20 Alpha users get ₹9,999/month + free 1-year upgrades</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 text-teal-600 mr-2" />
                    Alpha (Now Live)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Tender Search</li>
                    <li>• Smart Compatibility</li>
                    <li>• Key Work Details</li>
                    <li>• Location Insights</li>
                    <li>• Tender Robo Assistant</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                    Beta (Coming Soon)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Full BOQ</li>
                    <li>• Interactive Cost Analysis</li>
                    <li>• Past Bid Context</li>
                  </ul>
                </div>

                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 mb-2">Alpha: ₹14,999/month</div>
                    <div className="text-lg font-bold text-gray-900">Beta: ₹39,999/month</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <img 
                  src="/lovable-uploads/9161d5e6-32da-4d07-943c-4be79f5e4efb.png" 
                  alt="Professional contractor using tablet with building plans"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const currentBlog = blogContent[blogId as keyof typeof blogContent] || blogContent['ai-powered-tendering'];

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
                onClick={() => navigate('/blogs')}
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

      {/* Blog Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Article Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white p-8">
            <div className="flex items-center space-x-4 text-teal-100 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{currentBlog.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{currentBlog.author}</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {currentBlog.title}
            </h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              {currentBlog.subtitle}
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {currentBlog.content}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-xl p-8 text-center text-white">
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
        </article>
      </main>

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
