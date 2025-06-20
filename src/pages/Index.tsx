import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";
// import Dashboard from "../components/Dashboard";
import SmartSearchTab from "../components/SmartSearchTab";
import InsightsTab from "../components/InsightsTab";
import MyTendersTab from "../components/MyTendersTab";
import CompanyProfileTab from "../components/CompanyProfileTab";
import CompareTendersTab from "../components/CompareTendersTab";
import FeedbackTab from "../components/FeedbackTab";
import LanguageNotificationsTab from "../components/LanguageNotificationsTab";
import ChatWidget from "../components/ChatWidget";
import { useUser } from "@/context/userContext";
import { useCompanyProfile } from "@/context/companyProfileContext";
import { Tender } from "@/context/tenderContext";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("smart-search");
  const { updateProfile, profile } = useCompanyProfile();

  const { logout } = useUser();

  const handleAnalyze = (id: string) => {
    navigate(`/analysis/${id}`);
  };

  const handleSaveTender = async (tenderId: string) => {
    const updatedSavedTenders = [...profile.savedTenders, tenderId];

    try {
      await updateProfile({ savedTenders: updatedSavedTenders });
      toast({
        title: "Tender Saved",
        description: "Your tender has been saved successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description:
          error?.message ||
          "There was an error saving your tender. Please try again.",
      });
    }
  };

  const handleRemoveTender = async (tenderId: string) => {
    const updatedSavedTenders = profile.savedTenders.filter(
      (id) => id !== tenderId
    );

    try {
      await updateProfile({ savedTenders: updatedSavedTenders });
      toast({
        title: "Tender Removed",
        description: "The tender has been removed from your saved list.",
      });
    } catch (error) {
      console.error("Error removing tender:", error);
      toast({
        variant: "destructive",
        title: "Remove Failed",
        description:
          error?.message ||
          "There was an error removing the tender. Please try again.",
      });
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      // case "dashboard":
      // return <Dashboard />;
      case "smart-search":
        return (
          <SmartSearchTab
            onAnalyze={handleAnalyze}
            onSaveTender={handleSaveTender}
          />
        );
      case "insights":
        return <InsightsTab />;
      case "my-tenders":
        return (
          <MyTendersTab
            onAnalyze={handleAnalyze}
            onRemoveTender={handleRemoveTender}
          />
        );
      case "company-profile":
        return <CompanyProfileTab />;
      case "compare-tenders":
        return <CompareTendersTab />;
      case "feedback":
        return <FeedbackTab />;
      case "language":
      case "notifications":
      case "settings":
        return <LanguageNotificationsTab />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Fixed Sidebar - spans entire page height */}
      <div className="fixed left-0 top-0 bottom-0 h-screen z-10">
        <AppSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={logout}
        />
      </div>

      {/* Main Content with left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64">
        <div className="h-screen overflow-y-auto">{renderActiveTab()}</div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
