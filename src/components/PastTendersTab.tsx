import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin, Calendar, IndianRupee, SlidersHorizontal, Save, Check, ChevronLeft, ChevronRight, FileSpreadsheet, Eye } from 'lucide-react';

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
  const [selectedOrganisation, setSelectedOrganisation] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWinner, setSelectedWinner] = useState('all');
  const [selectedParticipators, setSelectedParticipators] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [valueType, setValueType] = useState('tender');
  const [sortBy, setSortBy] = useState('tenderValue');
  const [showFilters, setShowFilters] = useState(false);
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const tendersPerPage = 10;
  const [isExportMode, setIsExportMode] = useState(false);
  const [selectedTenders, setSelectedTenders] = useState<Set<string>>(new Set());

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

  const organisations = Array.from(new Set(pastTenders.map(t => t.organisation)));
  const states = Array.from(new Set(pastTenders.map(t => t.state)));
  const winners = Array.from(new Set(pastTenders.map(t => t.winner)));

  const filteredAndSortedTenders = useMemo(() => {
    let filtered = pastTenders.filter(tender => {
      const matchesSearch = tender.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tender.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tender.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesOrg = selectedOrganisation === 'all' || tender.organisation === selectedOrganisation;
      const matchesState = selectedState === 'all' || tender.state === selectedState;
      const matchesCity = !selectedCity || tender.city.toLowerCase().includes(selectedCity.toLowerCase());
      const matchesWinner = selectedWinner === 'all' || tender.winner === selectedWinner;
      const matchesParticipators = !selectedParticipators || tender.participators.some(p => 
        p.toLowerCase().includes(selectedParticipators.toLowerCase())
      );
      const matchesStage = selectedStage === 'all' || tender.contractStage.toLowerCase() === selectedStage.toLowerCase();

      return matchesSearch && matchesOrg && matchesState && matchesCity && 
             matchesWinner && matchesParticipators && matchesStage;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'tenderValue':
          return valueType === 'tender' ? b.tenderValue - a.tenderValue : b.contractValue - a.contractValue;
        case 'submissionDate':
          return new Date(b.submissionDate.split('-').reverse().join('-')).getTime() - 
                 new Date(a.submissionDate.split('-').reverse().join('-')).getTime();
        case 'contractDate':
          return new Date(b.contractDate.split('-').reverse().join('-')).getTime() - 
                 new Date(a.contractDate.split('-').reverse().join('-')).getTime();
        default:
          return valueType === 'tender' ? b.tenderValue - a.tenderValue : b.contractValue - a.contractValue;
      }
    });

    return filtered;
  }, [searchTerm, selectedOrganisation, selectedState, selectedCity, selectedWinner, selectedParticipators, selectedStage, valueType, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedTenders.length / tendersPerPage);
  const startIndex = (currentPage - 1) * tendersPerPage;
  const currentTenders = filteredAndSortedTenders.slice(startIndex, startIndex + tendersPerPage);

  const handleViewResults = (tenderId: string) => {
    navigate(`/tender-result/${tenderId}`);
  };

  const handleSaveTender = (tender: PastTender) => {
    setSavedTenders(prev => new Set([...prev, tender.id]));
    
    setTimeout(() => {
      setSavedTenders(prev => {
        const newSet = new Set(prev);
        newSet.delete(tender.id);
        return newSet;
      });
    }, 2000);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const exportToExcel = (tenders: PastTender[]) => {
    const headers = ['Serial Number', 'Description', 'Organisation', 'Tender Value', 'Contract Value', 'Location', 'Submission Date', 'Contract Date', 'Winner', 'Stage'];
    const csvContent = [
      headers.join(','),
      ...tenders.map(tender => [
        `"${tender.serialNumber}"`,
        `"${tender.description.replace(/"/g, '""')}"`,
        `"${tender.organisation}"`,
        `₹${tender.tenderValue.toFixed(2)} Cr`,
        `₹${tender.contractValue.toFixed(2)} Cr`,
        `"${tender.location}"`,
        tender.submissionDate,
        tender.contractDate,
        `"${tender.winner}"`,
        `"${tender.contractStage}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `past_tenders_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportClick = () => {
    if (!isExportMode) {
      setIsExportMode(true);
      return;
    }
    
    const selectedTenderData = currentTenders.filter(tender => selectedTenders.has(tender.id));
    exportToExcel(selectedTenderData);
    setIsExportMode(false);
    setSelectedTenders(new Set());
  };

  const handleCancelExport = () => {
    setIsExportMode(false);
    setSelectedTenders(new Set());
  };

  const toggleTenderSelection = (tenderId: string) => {
    setSelectedTenders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tenderId)) {
        newSet.delete(tenderId);
      } else {
        newSet.add(tenderId);
      }
      return newSet;
    });
  };

  const selectAllTenders = () => {
    if (selectedTenders.size === currentTenders.length) {
      setSelectedTenders(new Set());
    } else {
      setSelectedTenders(new Set(currentTenders.map(t => t.id)));
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Past Tenders</h2>
            <p className="text-gray-600">Browse and analyze historical tender data</p>
          </div>
          
          <div className="flex items-center gap-3">
            {!isExportMode ? (
              <Button
                onClick={handleExportClick}
                variant="outline"
                className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Export XLS
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                {selectedTenders.size > 0 ? (
                  <Button
                    onClick={handleExportClick}
                    className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Done ({selectedTenders.size})
                  </Button>
                ) : (
                  <Button
                    onClick={handleCancelExport}
                    variant="outline"
                    className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            )}
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search past tenders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-2 border-gray-200 focus:border-teal-400"
          />
        </div>

        {showFilters && (
          <Card className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organisation</label>
                <Select value={selectedOrganisation} onValueChange={setSelectedOrganisation}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Organisations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organisations</SelectItem>
                    {organisations.map(org => (
                      <SelectItem key={org} value={org}>{org}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <Input
                  placeholder="Filter by city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Winner</label>
                <Select value={selectedWinner} onValueChange={setSelectedWinner}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Winners" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Winners</SelectItem>
                    {winners.map(winner => (
                      <SelectItem key={winner} value={winner}>{winner}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Participators</label>
                <Input
                  placeholder="Filter by participators"
                  value={selectedParticipators}
                  onChange={(e) => setSelectedParticipators(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contract Stage</label>
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Stages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="awarded">Awarded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value Type</label>
                  <Select value={valueType} onValueChange={setValueType}>
                    <SelectTrigger className="w-40 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tender">Tender Value</SelectItem>
                      <SelectItem value="contract">Contract Value</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenderValue">Value (High to Low)</SelectItem>
                      <SelectItem value="submissionDate">Submission Date</SelectItem>
                      <SelectItem value="contractDate">Contract Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="flex-1 p-6 space-y-4">
        {isExportMode && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Checkbox
              checked={selectedTenders.size === currentTenders.length && currentTenders.length > 0}
              onCheckedChange={selectAllTenders}
              className="rounded-md"
            />
            <span className="text-sm font-medium text-blue-700">
              Select All ({currentTenders.length} tenders)
            </span>
          </div>
        )}

        <div className="space-y-4">
          {currentTenders.map((tender) => (
            <Card key={tender.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {isExportMode && (
                      <Checkbox
                        checked={selectedTenders.has(tender.id)}
                        onCheckedChange={() => toggleTenderSelection(tender.id)}
                        className="mt-1 rounded-md"
                      />
                    )}
                    
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        {tender.serialNumber}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                        {tender.description}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">{tender.organisation}</p>
                      
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
                  </div>

                  <div className="ml-6 text-right">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-lg">
                      <div className="text-xs font-medium opacity-90">Contract Stage</div>
                      <div className="text-sm font-bold">{tender.contractStage}</div>
                      <div className="text-xs font-medium opacity-90 mt-1">Contract Value</div>
                      <div className="text-sm font-bold">₹{tender.contractValue.toFixed(2)} Cr</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSaveTender(tender)}
                    className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    {savedTenders.has(tender.id) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{savedTenders.has(tender.id) ? 'Saved' : 'Save'}</span>
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

        {currentTenders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tenders found matching your criteria.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} ({filteredAndSortedTenders.length} total results)
            </span>
            
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastTendersTab;