
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Edit3 } from 'lucide-react';
import CompanyEditModal from './company/CompanyEditModal';
import CompanyInformation from './company/CompanyInformation';
import RecentTenders from './company/RecentTenders';

const CompanyProfileTab: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'Infrastructure Solutions Pvt. Ltd.',
    contactPerson: 'Rajesh Kumar',
    email: 'rajesh.kumar@infrasolutions.com',
    phone: '+91 98765 43210',
    address: '123, Business Park, Sector 18, Gurgaon, Haryana - 122015',
    regionalOffices: ['Mumbai Office: 456 Business Complex, Andheri East, Mumbai - 400069'],
    previousSites: ['NH-48 Highway Project, Gujarat (2019-2021)', 'Bridge Construction, Karnataka (2020-2022)'],
    currentSites: ['Highway Extension Project, Rajasthan (2023-Present)'],
    workTypes: ['Road Construction', 'Bridge Development', 'Highway Projects', 'Infrastructure', 'Water Management'],
    description: 'Leading infrastructure development company with 15+ years of experience in road construction and bridge development projects across North India.',
    preferredAuthorities: ['NHAI', 'State PWDs'],
    tenderAmountRange: { lower: 200, upper: 600 },
    minorBridges: { comfortable: true, maxSpan: 25 },
    majorBridges: { comfortable: false, maxSpan: 150 },
    bridgeWorkIntensity: 'Medium'
  });

  const recentTenders = [
    { 
      id: 1, 
      name: 'Highway Construction Project Phase 2', 
      score: 92, 
      date: '2024-01-15',
      organisation: 'NHAI',
      amount: 850,
      location: 'Maharashtra',
      deadline: '15-06-2025',
      workTypes: ['Highway', 'Construction', 'Infrastructure']
    },
    { 
      id: 2, 
      name: 'Bridge Development Initiative', 
      score: 88, 
      date: '2024-01-12',
      organisation: 'State PWD',
      amount: 420,
      location: 'Karnataka',
      deadline: '22-07-2025',
      workTypes: ['Bridge', 'Development', 'Infrastructure']
    },
    { 
      id: 3, 
      name: 'Water Management System Upgrade', 
      score: 85, 
      date: '2024-01-10',
      organisation: 'Water Board',
      amount: 320,
      location: 'Rajasthan',
      deadline: '30-08-2025',
      workTypes: ['Water Management', 'System Upgrade', 'Infrastructure']
    },
    { 
      id: 4, 
      name: 'Smart City Infrastructure Development', 
      score: 79, 
      date: '2024-01-08',
      organisation: 'Smart City Mission',
      amount: 680,
      location: 'Gujarat',
      deadline: '10-09-2025',
      workTypes: ['Smart City', 'Infrastructure', 'Technology']
    },
    { 
      id: 5, 
      name: 'Rural Road Connectivity Project', 
      score: 91, 
      date: '2024-01-05',
      organisation: 'NRRDA',
      amount: 290,
      location: 'Odisha',
      deadline: '18-10-2025',
      workTypes: ['Rural Roads', 'Connectivity', 'Infrastructure']
    },
  ];

  const handleSaveProfile = (data: typeof companyData) => {
    setCompanyData(data);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Profile</h2>
          <p className="text-gray-600">Manage your organization's information and track performance</p>
        </div>
        
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <CompanyInformation companyData={companyData} />
        <RecentTenders tenders={recentTenders} />
      </div>

      <CompanyEditModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        companyData={companyData}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default CompanyProfileTab;
