
import React from 'react';
import { useLocation } from 'react-router-dom';
import EPCAnalysis from '@/components/analysis/EPCAnalysis';
import HAMAnalysis from '@/components/analysis/HAMAnalysis';
import ItemRateAnalysis from '@/components/analysis/ItemRateAnalysis';
import BOTAnalysis from '@/components/analysis/BOTAnalysis';
import OthersAnalysis from '@/components/analysis/OthersAnalysis';

const Analysis = () => {
  const location = useLocation();
  
  // Get tender type from URL params or default to EPC
  const searchParams = new URLSearchParams(location.search);
  const tenderType = searchParams.get('type') || 'EPC';

  // Mock tender data - in real app this would come from API/props
  const tenderData = {
    brief: "Upgradation of Package 12: Ujjain – Maksi Road in the state of Madhya Pradesh on Engineering, Procurement & Construction (EPC) Mode under proposed NDB Loan",
    location: "Ujjain, Madhya Pradesh",
    estimatedCost: "273.45 Cr.",
    emd: "2.73 Cr.",
    length: "38.95 km",
    type: tenderType,
    downloadDocuments: "http://mptenders.gov.in",
    organisation: "M.P. State Highway Authority",
    organisationId: "12513/664",
    website: "http://mptenders.gov.in",
    submissionDeadline: "4 March 2025",
    compatibilityScore: 77
  };

  // Render appropriate analysis component based on tender type
  const renderAnalysisComponent = () => {
    switch (tenderType.toUpperCase()) {
      case 'EPC':
        return <EPCAnalysis tenderData={tenderData} />;
      case 'HAM':
        return <HAMAnalysis tenderData={tenderData} />;
      case 'ITEM-RATE':
        return <ItemRateAnalysis tenderData={tenderData} />;
      case 'BOT':
        return <BOTAnalysis tenderData={tenderData} />;
      case 'OTHERS':
        return <OthersAnalysis tenderData={tenderData} />;
      default:
        return <EPCAnalysis tenderData={tenderData} />;
    }
  };

  return renderAnalysisComponent();
};

export default Analysis;
