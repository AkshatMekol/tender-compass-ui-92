
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Send, Bot, User, X, Satellite, Settings, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  loading?: boolean;
}

interface TenderRoboPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TenderRoboPopup: React.FC<TenderRoboPopupProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'How may I help you with this tender?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadingSteps = [
    "Analyzing tender document...",
    "Processing your query...",
    "Generating insights...",
    "Preparing response..."
  ];

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
      }, 1500);
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
        content: "Based on this tender analysis, I can help you understand the key aspects like payment structure, technical requirements, or compatibility factors. What specific information would you like to know about this tender?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getLoadingIcon = () => {
    const icons = [Satellite, Settings, BarChart3];
    const IconComponent = icons[loadingStep % icons.length];
    return <IconComponent className="w-5 h-5 animate-spin" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[50vw] h-[80vh] p-0 overflow-hidden">
        <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 to-blue-50">
          {/* Header */}
          <DialogHeader className="bg-white shadow-sm border-b border-gray-200 p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    Tender Robo Assistant
                  </DialogTitle>
                  <p className="text-gray-600 mt-1">
                    Ask me anything about this specific tender analysis
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
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
                        
                        {!message.loading && <p>{message.content}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && messages.some(m => m.loading) && (
                <div className="flex justify-start">
                  <div className="max-w-xl">
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
          <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
            <div className="max-w-3xl mx-auto">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about this tender..."
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TenderRoboPopup;
