import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar, IndianRupee, Heart, Eye } from 'lucide-react';

interface PastTender {
  id: string;
  serialNumber: string;
  description: string;
  organisation: string;
  tenderValue: number;
  location: string;
  submissionDate: string;
  contractDate: string;
  contractStage: string;
  contractValue: number;
  city: string;
  state: string;
  winner: string;
  participators: string[];
}

const PastTendersTab: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    organisation: '',
    winner: '',
    participators: '',
    stage: '',
    valueType: 'tender', // tender or contract
    sortBy: 'tenderValue'
  });

  // Mock data for past tenders
  const pastTenders: PastTender[] = [
    {
      id: 'past-1',
      serialNumber: 'PT001',
      description: 'Construction of 4-lane highway from Delhi to Gurgaon with modern infrastructure',
      organisation: 'National Highway Authority of India',
      tenderValue: 850.50,
      location: 'Delhi-Gurgaon',
      submissionDate: '15-01-2024',
      contractDate: '28-02-2024',
      contractStage: 'Completed',
      contractValue: 820.75,
      city: 'Delhi',
      state: 'Delhi',
      winner: 'L&T Construction',
      participators: ['L&T Construction', 'Tata Projects', 'Adani Infrastructure']
    },
    {
      id: 'past-2',
      serialNumber: 'PT002',
      description: 'Upgradation of Railway Station Complex with modern amenities',
      organisation: 'Indian Railways',
      tenderValue: 425.30,
      location: 'Mumbai Central',
      submissionDate: '10-03-2024',
      contractDate: '25-04-2024',
      contractStage: 'Ongoing',
      contractValue: 410.50,
      city: 'Mumbai',
      state: 'Maharashtra',
      winner: 'Shapoorji Pallonji',
      participators: ['Shapoorji Pallonji', 'HCC Limited', 'Reliance Infrastructure']
    },
    {
      id: 'past-3',
      serialNumber: 'PT003',
      description: 'Smart City Development Phase 2 with IoT integration',
      organisation: 'Pune Smart City Development Corporation',
      tenderValue: 650.80,
      location: 'Pune',
      submissionDate: '20-02-2024',
      contractDate: '15-03-2024',
      contractStage: 'Awarded',
      contractValue: 635.25,
      city: 'Pune',
      state: 'Maharashtra',
      winner: 'Infosys Limited',
      participators: ['Infosys Limited', 'TCS', 'Wipro Technologies']
    },
    {
      id: 'past-4',
      serialNumber: 'PT004',
      description: 'Metro Rail Extension Project with underground stations',
      organisation: 'Delhi Metro Rail Corporation',
      tenderValue: 1250.75,
      location: 'New Delhi',
      submissionDate: '05-12-2023',
      contractDate: '20-01-2024',
      contractStage: 'Ongoing',
      contractValue: 1180.50,
      city: 'Delhi',
      state: 'Delhi',
      winner: 'DMRC-RITES Consortium',
      participators: ['DMRC-RITES Consortium', 'Siemens India', 'Alstom Transport']
    },
    {
      id: 'past-5',
      serialNumber: 'PT005',
      description: 'Port Modernization with automated cargo handling systems',
      organisation: 'Jawaharlal Nehru Port Trust',
      tenderValue: 980.25,
      location: 'Mumbai',
      submissionDate: '18-11-2023',
      contractDate: '30-12-2023',
      contractStage: 'Completed',
      contractValue: 945.60,
      city: 'Mumbai',
      state: 'Maharashtra',
      winner: 'Adani Ports',
      participators: ['Adani Ports', 'APM Terminals', 'DP World']
    }
  ];

  const handleViewResults = (tenderId: string) => {
    navigate(`/tender-result/${tenderId}`);
  };

  const handleSaveTender = (tender: PastTender) => {
    // Implementation for saving tender
    console.log('Saving tender:', tender.id);
  };

  const filteredTenders = pastTenders.filter(tender => {
    const matchesSearch = tender.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.organisation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !filters.city || tender.city.toLowerCase().includes(filters.city.toLowerCase());
    const matchesState = !filters.state || tender.state.toLowerCase().includes(filters.state.toLowerCase());
    const matchesOrganisation = !filters.organisation || tender.organisation.toLowerCase().includes(filters.organisation.toLowerCase());
    const matchesWinner = !filters.winner || tender.winner.toLowerCase().includes(filters.winner.toLowerCase());
    const matchesParticipators = !filters.participators || tender.participators.some(p => 
      p.toLowerCase().includes(filters.participators.toLowerCase())
    );
    const matchesStage = !filters.stage || tender.contractStage.toLowerCase() === filters.stage.toLowerCase();

    return matchesSearch && matchesCity && matchesState && matchesOrganisation && 
           matchesWinner && matchesParticipators && matchesStage;
  });

  const sortedTenders = [...filteredTenders].sort((a, b) => {
    switch (filters.sortBy) {
      case 'tenderValue':
        return filters.valueType === 'tender' ? b.tenderValue - a.tenderValue : b.contractValue - a.contractValue;
      case 'submissionDate':
        return new Date(b.submissionDate.split('-').reverse().join('-')).getTime() - 
               new Date(a.submissionDate.split('-').reverse().join('-')).getTime();
      case 'contractDate':
        return new Date(b.contractDate.split('-').reverse().join('-')).getTime() - 
               new Date(a.contractDate.split('-').reverse().join('-')).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Past Tenders
          </h1>
          <p className="text-gray-600">Browse and analyze historical tender data</p>
        </div>

        {/* Filters Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tenders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* City */}
              <Input
                placeholder="City"
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
              />

              {/* State */}
              <Input
                placeholder="State"
                value={filters.state}
                onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
              />

              {/* Organisation */}
              <Input
                placeholder="Organisation"
                value={filters.organisation}
                onChange={(e) => setFilters(prev => ({ ...prev, organisation: e.target.value }))}
              />

              {/* Winner */}
              <Input
                placeholder="Winner"
                value={filters.winner}
                onChange={(e) => setFilters(prev => ({ ...prev, winner: e.target.value }))}
              />

              {/* Participators */}
              <Input
                placeholder="Participators"
                value={filters.participators}
                onChange={(e) => setFilters(prev => ({ ...prev, participators: e.target.value }))}
              />

              {/* Stage */}
              <Select value={filters.stage || 'all'} onValueChange={(value) => setFilters(prev => ({ ...prev, stage: value === 'all' ? '' : value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Contract Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="awarded">Awarded</SelectItem>
                </SelectContent>
              </Select>

              {/* Value Type */}
              <Select value={filters.valueType} onValueChange={(value) => setFilters(prev => ({ ...prev, valueType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Value Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tender">Tender Value</SelectItem>
                  <SelectItem value="contract">Contract Value</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-4">
              <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenderValue">Value (High to Low)</SelectItem>
                  <SelectItem value="submissionDate">Submission Date</SelectItem>
                  <SelectItem value="contractDate">Contract Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tender Cards */}
        <div className="grid gap-6">
          {sortedTenders.map((tender) => (
            <Card key={tender.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    {/* Serial Number */}
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      {tender.serialNumber}
                    </div>
                    
                    {/* Description */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                      {tender.description}
                    </h3>
                    
                    {/* Organisation */}
                    <p className="text-gray-600 mb-4">{tender.organisation}</p>
                    
                    {/* First Row: Tender Value, Location, Submission Date, Contract Date */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm">
                        <IndianRupee className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-gray-600">Tender:</span>
                        <span className="font-medium ml-1">₹{tender.tenderValue.toFixed(2)} Cr</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 text-blue-600 mr-1" />
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium ml-1">{tender.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 text-purple-600 mr-1" />
                        <span className="text-gray-600">Submission:</span>
                        <span className="font-medium ml-1">{tender.submissionDate}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 text-orange-600 mr-1" />
                        <span className="text-gray-600">Contract:</span>
                        <span className="font-medium ml-1">{tender.contractDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contract Stage and Value Block (replacing compatibility score) */}
                  <div className="ml-6 text-right">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-lg">
                      <div className="text-xs font-medium opacity-90">Contract Stage</div>
                      <div className="text-sm font-bold">{tender.contractStage}</div>
                      <div className="text-xs font-medium opacity-90 mt-1">Contract Value</div>
                      <div className="text-sm font-bold">₹{tender.contractValue.toFixed(2)} Cr</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSaveTender(tender)}
                    className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Save</span>
                  </Button>
                  <Button
                    onClick={() => handleViewResults(tender.id)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Results</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results message */}
        {sortedTenders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tenders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastTendersTab;