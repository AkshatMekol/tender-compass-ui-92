
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar';
import Dashboard from '../components/Dashboard';
import SmartSearchTab from '../components/SmartSearchTab';
import InsightsTab from '../components/InsightsTab';
import MyTendersTab from '../components/MyTendersTab';
import CompanyProfileTab from '../components/CompanyProfileTab';
import CompareTendersTab from '../components/CompareTendersTab';
import FeedbackTab from '../components/FeedbackTab';
import LanguageNotificationsTab from '../components/LanguageNotificationsTab';
import ChatWidget from '../components/ChatWidget';
import { Tender } from '../types/tender';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [savedTenders, setSavedTenders] = useState<Tender[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'smart-search':
        return <SmartSearchTab onAnalyze={handleAnalyze} onSaveTender={handleSaveTender} />;
      case 'insights':
        return <InsightsTab />;
      case 'my-tenders':
        return <MyTendersTab savedTenders={savedTenders} onAnalyze={handleAnalyze} onRemoveTender={handleRemoveTender} />;
      case 'company-profile':
        return <CompanyProfileTab />;
      case 'compare-tenders':
        return <CompareTendersTab />;
      case 'feedback':
        return <FeedbackTab />;
      case 'language':
      case 'notifications':
      case 'settings':
        return <LanguageNotificationsTab />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-teal-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Fixed Sidebar - spans entire page height */}
      <div className="fixed left-0 top-0 bottom-0 h-screen z-10">
        <AppSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout} 
        />
      </div>
      
      {/* Main Content with left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64">
        <div className="h-screen overflow-y-auto relative z-10">
          {renderActiveTab()}
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
