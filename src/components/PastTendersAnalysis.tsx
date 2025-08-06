import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, MapPin, Building, Calendar, IndianRupee, Search, Filter, BarChart3, Users } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PastTendersAnalysisProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Mock data for past tenders
const mockTenders = Array.from({ length: 75 }, (_, i) => ({
  id: `tender-${i + 1}`,
  title: `Road Construction Project ${String.fromCharCode(65 + (i % 26))}`,
  organization: ['NHAI', 'PWD', 'Municipal Corporation', 'State Highway Authority'][i % 4],
  submissionDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString().split('T')[0],
  location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'][i % 6],
  estimatedCost: (Math.random() * 500 + 50) * 1000000, // 50M to 550M
  contractValue: (Math.random() * 400 + 40) * 1000000, // 40M to 440M
  stage: ['Completed', 'Ongoing', 'Awarded', 'Under Evaluation'][i % 4],
  similarityScore: Math.floor(Math.random() * 40) + 60, // 60-100%
  winner: `Contractor ${String.fromCharCode(65 + (i % 10))} Ltd`,
  bidders: Math.floor(Math.random() * 8) + 3,
  l1BidVariation: (Math.random() - 0.5) * 40, // -20% to +20%
  year: 2020 + (i % 4),
  category: ['Highway', 'Bridge', 'Urban Road', 'Tunnel', 'Flyover'][i % 5]
}));

// Mock bidder data
const mockBidders = Array.from({ length: 20 }, (_, i) => ({
  name: `${['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Kappa', 'Lambda'][i % 10]} Construction Ltd`,
  tendersParticipated: Math.floor(Math.random() * 20) + 5,
  tendersWon: Math.floor(Math.random() * 10) + 1,
  avgBidVariation: (Math.random() - 0.5) * 30,
  recentTenders: Array.from({ length: 3 }, (_, j) => ({
    project: `Project ${String.fromCharCode(65 + j)}`,
    value: (Math.random() * 100 + 20) * 1000000,
    bidVariation: (Math.random() - 0.5) * 25,
    status: ['Won', 'Lost', 'Pending'][j % 3]
  }))
}));

export function PastTendersAnalysis({ isOpen, onToggle }: PastTendersAnalysisProps) {
  const [filters, setFilters] = useState({
    keyword: '',
    city: '',
    organization: '',
    year: '',
    bidder: '',
    minValue: '',
    maxValue: '',
    stage: ''
  });

  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter tenders based on current filters
  const filteredTenders = mockTenders.filter(tender => {
    return (
      (!filters.keyword || tender.title.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (!filters.city || tender.location.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.organization || tender.organization.toLowerCase().includes(filters.organization.toLowerCase())) &&
      (!filters.year || tender.year.toString() === filters.year) &&
      (!filters.bidder || tender.winner.toLowerCase().includes(filters.bidder.toLowerCase())) &&
      (!filters.minValue || tender.estimatedCost >= parseFloat(filters.minValue) * 1000000) &&
      (!filters.maxValue || tender.estimatedCost <= parseFloat(filters.maxValue) * 1000000) &&
      (!filters.stage || tender.stage === filters.stage)
    );
  }).sort((a, b) => b.similarityScore - a.similarityScore);

  // Prepare histogram data
  const histogramData = mockTenders
    .filter(tender => 
      (selectedYear === 'all' || tender.year.toString() === selectedYear) &&
      (selectedCategory === 'all' || tender.category === selectedCategory)
    )
    .map(tender => ({
      estimatedCost: tender.estimatedCost / 1000000, // Convert to millions
      l1BidVariation: tender.l1BidVariation,
      title: tender.title,
      organization: tender.organization,
      stage: tender.stage,
      contractValue: tender.contractValue / 1000000
    }));

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${(value / 1000).toFixed(1)}K`;
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full mt-4 border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          View Past Tenders Analysis
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="space-y-6 mt-4">
        {/* Section 1: Tender Cards with Filters */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">
              <Search className="w-5 h-5 mr-2" />
              Similar Past Tenders ({filteredTenders.length})
            </CardTitle>
            
            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-4">
              <Input
                placeholder="Search keyword..."
                value={filters.keyword}
                onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
                className="text-sm"
              />
              <Input
                placeholder="City"
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                className="text-sm"
              />
              <Input
                placeholder="Organization"
                value={filters.organization}
                onChange={(e) => setFilters(prev => ({ ...prev, organization: e.target.value }))}
                className="text-sm"
              />
              <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Years</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Bidder"
                value={filters.bidder}
                onChange={(e) => setFilters(prev => ({ ...prev, bidder: e.target.value }))}
                className="text-sm"
              />
              <Input
                placeholder="Min Value (Cr)"
                type="number"
                value={filters.minValue}
                onChange={(e) => setFilters(prev => ({ ...prev, minValue: e.target.value }))}
                className="text-sm"
              />
              <Input
                placeholder="Max Value (Cr)"
                type="number"
                value={filters.maxValue}
                onChange={(e) => setFilters(prev => ({ ...prev, maxValue: e.target.value }))}
                className="text-sm"
              />
              <Select value={filters.stage} onValueChange={(value) => setFilters(prev => ({ ...prev, stage: value }))}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Stages</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Awarded">Awarded</SelectItem>
                  <SelectItem value="Under Evaluation">Under Evaluation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-96">
              <div className="grid gap-4">
                {filteredTenders.map((tender) => (
                  <Card key={tender.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{tender.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Building className="w-4 h-4 mr-1" />
                          {tender.organization}
                        </div>
                      </div>
                      <Badge 
                        variant={tender.similarityScore >= 80 ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {tender.similarityScore}% Match
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{tender.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{tender.submissionDate}</span>
                      </div>
                      <div className="flex items-center">
                        <IndianRupee className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{formatCurrency(tender.estimatedCost)}</span>
                      </div>
                      <div>
                        <Badge variant={tender.stage === 'Completed' ? 'default' : 'outline'}>
                          {tender.stage}
                        </Badge>
                      </div>
                    </div>
                    
                    {tender.stage === 'Completed' && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-900">Contract Value: </span>
                            <span className="text-green-600">{formatCurrency(tender.contractValue)}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Winner: </span>
                            <span>{tender.winner}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Bidders: </span>
                            <span>{tender.bidders}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Section 2: Histogram */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">
              <BarChart3 className="w-5 h-5 mr-2" />
              L1 Bid Variation Analysis
            </CardTitle>
            <div className="flex gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Highway">Highway</SelectItem>
                  <SelectItem value="Bridge">Bridge</SelectItem>
                  <SelectItem value="Urban Road">Urban Road</SelectItem>
                  <SelectItem value="Tunnel">Tunnel</SelectItem>
                  <SelectItem value="Flyover">Flyover</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={histogramData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="estimatedCost" 
                    name="Estimated Cost (Cr)" 
                    type="number"
                    tickFormatter={(value) => `₹${value}Cr`}
                  />
                  <YAxis 
                    dataKey="l1BidVariation" 
                    name="L1 Bid Variation (%)" 
                    type="number"
                    tickFormatter={(value) => `${value.toFixed(1)}%`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'l1BidVariation' ? `${Number(value).toFixed(2)}%` : `₹${Number(value)}Cr`,
                      name === 'l1BidVariation' ? 'L1 Bid Variation' : 'Estimated Cost'
                    ]}
                    labelFormatter={() => ''}
                    content={({ active, payload }) => {
                      if (active && payload && payload[0]) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-semibold">{data.title}</p>
                            <p className="text-sm text-gray-600">{data.organization}</p>
                            <p className="text-sm">Estimated: ₹{Number(data.estimatedCost).toFixed(1)}Cr</p>
                            <p className="text-sm">Contract: ₹{Number(data.contractValue).toFixed(1)}Cr</p>
                            <p className="text-sm">L1 Variation: {Number(data.l1BidVariation).toFixed(2)}%</p>
                            <p className="text-sm">Stage: {data.stage}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter dataKey="l1BidVariation" fill="#3b82f6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Probable Bidders */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">
              <Users className="w-5 h-5 mr-2" />
              Probable Bidders Analysis
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Bidder Name</TableHead>
                    <TableHead>Tender History & Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBidders.map((bidder, index) => (
                    <TableRow key={index}>
                      <TableCell className="align-top">
                        <div>
                          <p className="font-semibold">{bidder.name}</p>
                          <div className="text-sm text-gray-600 mt-1">
                            <p>Participated: {bidder.tendersParticipated} tenders</p>
                            <p>Won: {bidder.tendersWon} tenders</p>
                            <p>Success Rate: {((bidder.tendersWon / bidder.tendersParticipated) * 100).toFixed(1)}%</p>
                            <p className={`font-medium ${bidder.avgBidVariation < 0 ? 'text-green-600' : 'text-red-600'}`}>
                              Avg Bid Variation: {bidder.avgBidVariation.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          {bidder.recentTenders.map((tender, tenderIndex) => (
                            <div key={tenderIndex} className="p-2 bg-gray-50 rounded text-sm">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{tender.project}</p>
                                  <p className="text-gray-600">{formatCurrency(tender.value)}</p>
                                </div>
                                <div className="text-right">
                                  <Badge variant={tender.status === 'Won' ? 'default' : tender.status === 'Lost' ? 'destructive' : 'secondary'}>
                                    {tender.status}
                                  </Badge>
                                  <p className={`text-sm mt-1 ${tender.bidVariation < 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {tender.bidVariation.toFixed(1)}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}