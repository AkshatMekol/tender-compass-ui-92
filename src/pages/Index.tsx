
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar';
import SmartSearchTab from '../components/SmartSearchTab';
import TenderRoboTab from '../components/TenderRoboTab';
import InsightsTab from '../components/InsightsTab';
import MyTendersTab from '../components/MyTendersTab';
import PastTendersTab from '../components/PastTendersTab';
import CompanyProfileTab from '../components/CompanyProfileTab';
import FeedbackTab from '../components/FeedbackTab';
import LanguageNotificationsTab from '../components/LanguageNotificationsTab';
import ChatWidget from '../components/ChatWidget';
import CompetitorAnalysisTab from '../components/CompetitorAnalysisTab';
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

const Index = () => {
  const navigate = useNavigate();
  // Set default to smart-search instead of dashboard since dashboard is removed
  const [activeTab, setActiveTab] = useState('smart-search');
  const [savedTenders, setSavedTenders] = useState<Tender[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [tenderRoboMessages, setTenderRoboMessages] = useState<Message[]>([]);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (!authStatus) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleAnalyze = () => {
    navigate('/analysis');
  };

  const handleSaveTender = (tender: Tender) => {
    setSavedTenders(prev => {
      const exists = prev.find(t => t.id === tender.id);
      if (!exists) {
        return [...prev, tender];
      }
      return prev;
    });
  };

  const handleRemoveTender = (tenderId: string) => {
    setSavedTenders(prev => prev.filter(t => t.id !== tenderId));
  };

  const renderActiveTab = () => {
    console.log('Current active tab:', activeTab); // Debug log
    
    switch (activeTab) {
      case 'smart-search':
        return <SmartSearchTab onAnalyze={handleAnalyze} onSaveTender={handleSaveTender} />;
      case 'tender-robo':
        return (
          <TenderRoboTab 
            onAnalyze={handleAnalyze} 
            messages={tenderRoboMessages}
            onMessagesChange={setTenderRoboMessages}
          />
        );
      case 'insights':
        return <InsightsTab />;
      case 'my-tenders':
        return <MyTendersTab savedTenders={savedTenders} onAnalyze={handleAnalyze} onRemoveTender={handleRemoveTender} />;
      case 'past-tenders':
        return <PastTendersTab />;
      case 'competitor-analysis':
        return <CompetitorAnalysisTab />;
      case 'company-profile':
        return <CompanyProfileTab />;
      case 'feedback':
        return <FeedbackTab />;
      case 'language':
      case 'notifications':
      case 'settings':
        return <LanguageNotificationsTab />;
      default:
        console.log('Default case triggered, showing Smart Search');
        return <SmartSearchTab onAnalyze={handleAnalyze} onSaveTender={handleSaveTender} />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 h-screen z-10">
        <AppSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout} 
        />
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="h-screen overflow-y-auto">
          {renderActiveTab()}
        </div>
      </div>
      <ChatWidget />
    </div>
  );
};

export default Index;
