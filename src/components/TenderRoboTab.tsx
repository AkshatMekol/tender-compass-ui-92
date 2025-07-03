import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Download, Eye, Satellite, Settings, BarChart3, MapPin, Calendar, IndianRupee, Save, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
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
}

const TenderRoboTab: React.FC<TenderRoboTabProps> = ({ onAnalyze }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

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

      setMessages(prev => [...prev, loadingMessage]);

      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
        setMessages(prev => prev.filter(msg => !msg.loading));

        const botResponse: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: "Here are the top tenders for your query 👇",
          timestamp: new Date(),
          tenders: mockTenders,
          showTenders: false
        };

        setMessages(prev => [...prev, botResponse]);
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
        setMessages(prev => [...prev, botResponse]);
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
      content: "Downloading your Excel... 📥",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botResponse]);
  };

  const handleViewMoreTenders = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, showTenders: true } : msg
    ));
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
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tender Robo – Your AI Tender Assistant
            </h1>
            <p className="text-gray-600 mt-1">
              Ask anything about tenders, market insights, or let us fetch tenders for you!
            </p>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-6 chat-body">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Welcome to Tender Robo!
              </h3>
              <p className="text-gray-500">
                Start by asking me anything about tenders or market insights.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
                      : 'bg-white text-gray-800'
                  }`}>
                    {message.loading && (
                      <div className="flex items-center space-x-2">
                        {getLoadingIcon()}
                        <span className="text-sm">{loadingSteps[loadingStep]}</span>
                      </div>
                    )}
                    
                    {!message.loading && (
                      <>
                        <p>{message.content}</p>
                        
                        {message.tenders && (
                          <div className="mt-4">
                            {message.tenders.slice(0, 2).map((tender) => renderTenderCard(tender))}
                            
                            {!message.showTenders && (
                              <Card className="mb-4 blur-sm opacity-50">
                                <CardContent className="p-4 text-center">
                                  <div className="py-8">
                                    <h3 className="font-semibold text-gray-900 mb-2">🔒 More tenders available...</h3>
                                    <p className="text-gray-600">🕵️‍♂️ Additional opportunities await</p>
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            {message.showTenders && (
                              <div className="animate-fade-in">
                                {message.tenders.slice(2).map((tender) => renderTenderCard(tender))}
                              </div>
                            )}
                            
                            <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                              <p className="text-gray-700 mb-4 font-medium">Would you like to:</p>
                              <div className="flex space-x-3">
                                <Button
                                  onClick={handleExportToExcel}
                                  className="hover:scale-105 active:scale-95 transition-transform shadow-md hover:shadow-xl"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  ⬇️ Export to Excel
                                </Button>
                                
                                {!message.showTenders && (
                                  <Button
                                    variant="outline"
                                    onClick={() => handleViewMoreTenders(message.id)}
                                    className="hover:scale-105 active:scale-95 transition-transform shadow-md hover:shadow-xl"
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    🔓 View More Tenders
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-md">
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
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Tender Robo anything..."
                className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
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
