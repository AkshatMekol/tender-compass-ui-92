import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Download, Eye, Satellite, Settings, BarChart3, MapPin, Calendar, IndianRupee, Save, Check, History, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import CompatibilityScore from './CompatibilityScore';
import { Tender } from '../types/tender';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  loading?: boolean;
  tenders?: Tender[];
  showTenders?: boolean;
}

interface TenderRoboTabProps {
  onAnalyze?: (tender: any) => void;
  messages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
}

const TenderRoboTab: React.FC<TenderRoboTabProps> = ({ onAnalyze, messages: externalMessages, onMessagesChange }) => {
  const [internalMessages, setInternalMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: "👋 Hi there! Welcome to Tender Robo — your personal tender companion. You have 💬 50 queries left this month. Ask away and let's find the right tenders together! 🚀",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());
  const [queriesLeft, setQueriesLeft] = useState(50);
  const [showPastMessages, setShowPastMessages] = useState(false);
  const [pastSessions, setPastSessions] = useState<{ date: string; messages: Message[] }[]>([
    {
      date: '2025-01-10',
      messages: [
        {
          id: 'past-1',
          type: 'user',
          content: 'Show me tenders for road construction in Maharashtra',
          timestamp: new Date('2025-01-10T10:30:00')
        },
        {
          id: 'past-2',
          type: 'bot',
          content: 'I found 5 road construction tenders in Maharashtra. Here are the top matches based on your profile.',
          timestamp: new Date('2025-01-10T10:30:15')
        }
      ]
    },
    {
      date: '2025-01-09',
      messages: [
        {
          id: 'past-3',
          type: 'user',
          content: 'What are the payment terms for NHAI projects?',
          timestamp: new Date('2025-01-09T14:20:00')
        },
        {
          id: 'past-4',
          type: 'bot',
          content: 'NHAI projects typically have payment terms of 75% on running account and 25% after completion. Payment cycles are usually monthly.',
          timestamp: new Date('2025-01-09T14:20:30')
        }
      ]
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use external messages if provided, otherwise use internal state
  const messages = externalMessages || internalMessages;
  
  // Helper function to update messages properly
  const updateMessages = (updater: (prev: Message[]) => Message[]) => {
    if (onMessagesChange) {
      const newMessages = updater(messages);
      onMessagesChange(newMessages);
    } else {
      setInternalMessages(updater);
    }
  };

  const loadingSteps = [
    "Fetching the latest tenders from government portals...",
    "Analyzing tender documents with AI...",
    "Applying your filters and constraints...",
    "Summarizing key insights from each tender...",
    "Eliminating irrelevant tenders...",
    "Checking bidder eligibility criteria...",
    "Identifying high-potential opportunities...",
    "Detecting sector-specific keywords...",
    "Scanning for payment terms and deadlines...",
    "Filtering out tenders with risky clauses...",
    "Flagging tenders that match your track record...",
    "Scoring tenders on win probability...",
    "Creating your personalized tender dashboard...",
    "Tagging repeat opportunities from past wins...",
    "Auto-sorting by urgency and value..."
  ];

  const mockTenders: Tender[] = [
    {
      id: 'NH-UP-2025-01',
      name: 'NHAI Road Construction, Lucknow',
      organisation: 'NHAI',
      amount: 240,
      compatibilityScore: 95,
      location: 'Lucknow, Uttar Pradesh',
      deadline: '24-07-2025',
      category: 'Road Construction',
      workTypes: ['Road Construction', 'Highway', 'Infrastructure']
    },
    {
      id: 'NH-UP-2025-02',
      name: 'Flyover on NH-28, Gorakhpur',
      organisation: 'NHAI',
      amount: 110,
      compatibilityScore: 88,
      location: 'Gorakhpur, Uttar Pradesh',
      deadline: '20-07-2025',
      category: 'Flyover',
      workTypes: ['Flyover', 'Bridge', 'Infrastructure']
    },
    {
      id: 'NH-UP-2025-03',
      name: 'Bridge Construction, Varanasi',
      organisation: 'UP PWD',
      amount: 85,
      compatibilityScore: 82,
      location: 'Varanasi, Uttar Pradesh',
      deadline: '15-08-2025',
      category: 'Bridge',
      workTypes: ['Bridge', 'Construction', 'Infrastructure']
    }
  ];

  const formatAmount = (amount: number) => {
    if (amount >= 100) {
      return `₹${amount.toFixed(2)} Cr.`;
    } else {
      return `₹${(amount * 10).toFixed(2)} L.`;
    }
  };

  const handleSaveTender = (tender: Tender) => {
    const tenderWithSaveDate = {
      ...tender,
      savedDate: new Date().toISOString().split('T')[0]
    };
    setSavedTenders(prev => new Set([...prev, tender.id]));
    
    setTimeout(() => {
      setSavedTenders(prev => {
        const newSet = new Set(prev);
        newSet.delete(tender.id);
        return newSet;
      });
    }, 2000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Check if queries are exhausted
    if (queriesLeft === 0) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: "🚫 Your monthly queries have ended. Kindly contact help to renew. We're here to assist you! 💙",
        timestamp: new Date()
      };
      updateMessages(prev => [...prev, errorMessage]);
      setInputValue('');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    updateMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Decrease query count
    setQueriesLeft(prev => prev - 1);

    // Check if user is asking for tenders
    const isTenderQuery = inputValue.toLowerCase().includes('tender') || 
                         inputValue.toLowerCase().includes('contract') ||
                         inputValue.toLowerCase().includes('uttar pradesh') ||
                         inputValue.toLowerCase().includes('nh works');

    if (isTenderQuery) {
      // Show loading message
      const loadingMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: loadingSteps[0],
        timestamp: new Date(),
        loading: true
      };

      updateMessages(prev => [...prev, loadingMessage]);

      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
        updateMessages(prev => prev.filter(msg => !msg.loading));

        const botResponse: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: "Here are the top tenders for your query",
          timestamp: new Date(),
          tenders: mockTenders,
          showTenders: false
        };

        updateMessages(prev => [...prev, botResponse]);
      }, 8000);
    } else {
      // Regular chat response
      setTimeout(() => {
        setIsLoading(false);
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "I'm here to help you with tender-related queries! You can ask me to find specific tenders, provide market insights, or help with tender analysis. Try asking something like 'Get tenders in Uttar Pradesh for NH works' to see how I can help you find relevant opportunities.",
          timestamp: new Date()
        };
        updateMessages(prev => [...prev, botResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleExportToExcel = () => {
    // Simulate Excel download
    const botResponse: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: "Downloading your Excel...",
      timestamp: new Date()
    };
    updateMessages(prev => [...prev, botResponse]);
  };

  const handleViewMoreTenders = (messageId: string) => {
    updateMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, showTenders: true } : msg
    ));
  };

  const loadPastSession = (sessionMessages: Message[]) => {
    if (onMessagesChange) {
      onMessagesChange(sessionMessages);
    } else {
      setInternalMessages(sessionMessages);
    }
    setShowPastMessages(false);
  };

  const renderTenderCard = (tender: Tender, isBlurred = false) => (
    <Card key={tender.id} className={`group hover:shadow-lg transition-all duration-200 border-0 rounded-xl bg-white shadow-md mb-4 ${isBlurred ? 'blur-sm opacity-50' : ''}`}>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-4">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                  {tender.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{tender.organisation}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tender.workTypes.slice(0, 3).map((workType, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {workType}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <CompatibilityScore score={tender.compatibilityScore} showTooltip={false} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <IndianRupee className="w-4 h-4 mr-2" />
                <span className="font-medium">{formatAmount(tender.amount)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{tender.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Deadline: {tender.deadline}</span>
              </div>
            </div>
          </div>

          {!isBlurred && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => onAnalyze?.(tender)}
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
              >
                Analyse
              </Button>
              
              <Button
                onClick={() => handleSaveTender(tender)}
                variant="outline"
                className={`border-teal-200 rounded-lg transition-all duration-200 ${
                  savedTenders.has(tender.id) 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'text-teal-700 hover:bg-teal-50'
                }`}
              >
                {savedTenders.has(tender.id) ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const getLoadingIcon = () => {
    const icons = [Satellite, Settings, BarChart3];
    const IconComponent = icons[loadingStep % icons.length];
    return <IconComponent className="w-5 h-5 animate-spin" />;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-teal-500" />
                Tender Robo – Your AI Tender Assistant
              </h1>
              <p className="text-gray-600 mt-1">
                Ask anything about tenders, market insights, or let us fetch tenders for you!
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Past Messages Button */}
            <Button
              onClick={() => setShowPastMessages(!showPastMessages)}
              variant="outline"
              className="rounded-xl border-gray-300 hover:bg-gray-50 shadow-sm"
            >
              <History className="w-4 h-4 mr-2" />
              📜 View Past Conversations
            </Button>
            
            {/* Query Counter */}
            <div className="flex items-center">
              <Badge 
                className={`text-sm px-4 py-2 rounded-full shadow-sm ${
                  queriesLeft <= 10 
                    ? 'bg-red-50 text-red-700 border border-red-200' 
                    : queriesLeft <= 25
                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}
              >
                💬 Queries Left: <span className="font-bold ml-1">{queriesLeft}</span>
              </Badge>
              {queriesLeft === 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 p-1 ml-2"
                  title="Contact help to renew"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Past Messages Sidebar */}
      {showPastMessages && (
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-teal-600" />
              Past Conversations
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {pastSessions.map((session, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-teal-500" onClick={() => loadPastSession(session.messages)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">
                          {session.messages[0]?.content.substring(0, 50)}...
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(session.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {session.messages.length} messages
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-6 chat-body">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-r from-teal-500 to-blue-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  
                  <div className={`rounded-2xl p-4 shadow-md ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-100'
                  }`}>
                    {message.loading && (
                      <div className="flex items-center space-x-2">
                        {getLoadingIcon()}
                        <span className="text-sm">{loadingSteps[loadingStep]}</span>
                      </div>
                    )}
                    
                    {!message.loading && (
                      <>
                        <p className="leading-relaxed">{message.content}</p>
                        
                        {message.tenders && (
                          <div className="mt-4">
                            {message.tenders.slice(0, 2).map((tender) => renderTenderCard(tender))}
                            
                            {!message.showTenders && (
                              <Card className="mb-4 blur-sm opacity-50">
                                <CardContent className="p-4 text-center">
                                  <div className="py-8">
                                    <h3 className="font-semibold text-gray-900 mb-2">More tenders available...</h3>
                                    <p className="text-gray-600">Additional opportunities await</p>
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            {message.showTenders && (
                              <div className="animate-fade-in">
                                {message.tenders.slice(2).map((tender) => renderTenderCard(tender))}
                              </div>
                            )}
                            
                            <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                              <p className="text-gray-700 mb-4 font-medium">Would you like to:</p>
                              <div className="flex space-x-3">
                                <Button
                                  onClick={handleExportToExcel}
                                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Export to Excel
                                </Button>
                                
                                {!message.showTenders && (
                                  <Button
                                    onClick={() => handleViewMoreTenders(message.id)}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View More Tenders
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && messages.some(m => m.loading) && (
            <div className="flex justify-start">
              <div className="max-w-2xl">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                    <div className="flex items-center space-x-2">
                      {getLoadingIcon()}
                      <span className="text-sm text-gray-700">{loadingSteps[loadingStep]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={queriesLeft === 0 ? "🚫 Monthly queries exhausted - contact help to renew" : "Ask Tender Robo anything... 💬"}
                className={`w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm transition-all duration-200 ${
                  queriesLeft === 0 
                    ? 'border-red-300 bg-red-50 placeholder-red-400 cursor-not-allowed' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                disabled={isLoading || queriesLeft === 0}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim() || queriesLeft === 0}
              className={`px-6 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 ${
                queriesLeft === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700'
              }`}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderRoboTab;
