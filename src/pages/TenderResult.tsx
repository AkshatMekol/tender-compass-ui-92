import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, MapPin, Calendar, IndianRupee, Building, Globe, Award, Users } from 'lucide-react';

interface ParticipatorData {
  name: string;
  bid: number;
  rank: number;
  bidVariation: number;
}

interface TenderResultData {
  id: string;
  description: string;
  deadlinePassed: number;
  location: string;
  submissionDate: string;
  contractDate: string;
  tenderValue: number;
  contractValue: number;
  winner: string;
  stage: string;
  organisation: string;
  organisationId: string;
  website: string;
  participators: ParticipatorData[];
}

const TenderResult: React.FC = () => {
  const { tenderId } = useParams<{ tenderId: string }>();
  const navigate = useNavigate();

  // Mock data - in real app, this would be fetched based on tenderId
  const tenderData: TenderResultData = {
    id: tenderId || 'past-1',
    description: 'Construction of 4-lane highway from Delhi to Gurgaon with modern infrastructure',
    deadlinePassed: 45,
    location: 'Delhi-Gurgaon',
    submissionDate: '15-01-2024',
    contractDate: '28-02-2024',
    tenderValue: 850.50,
    contractValue: 820.75,
    winner: 'L&T Construction',
    stage: 'Completed',
    organisation: 'National Highway Authority of India',
    organisationId: 'NHAI/2024/001',
    website: 'www.nhai.gov.in',
    participators: [
      {
        name: 'L&T Construction',
        bid: 820.75,
        rank: 1,
        bidVariation: -3.5
      },
      {
        name: 'Tata Projects',
        bid: 835.20,
        rank: 2,
        bidVariation: -1.8
      },
      {
        name: 'Adani Infrastructure',
        bid: 845.60,
        rank: 3,
        bidVariation: -0.6
      },
      {
        name: 'HCC Limited',
        bid: 865.30,
        rank: 4,
        bidVariation: 1.7
      },
      {
        name: 'Reliance Infrastructure',
        bid: 875.80,
        rank: 5,
        bidVariation: 3.0
      }
    ]
  };

  const getBidVariationColor = (variation: number) => {
    if (variation < 0) return 'text-green-600';
    if (variation > 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 2: return 'bg-gray-100 text-gray-800 border-gray-300';
      case 3: return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Past Tenders
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Tender Result Report
          </h1>
        </div>

        {/* First Section: Tender Summary */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Building className="w-5 h-5 mr-2 text-teal-600" />
              Tender Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Row 1: Description + Deadline Passed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{tenderData.description}</p>
              </div>
              <div className="flex justify-end">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg">
                  <span className="font-medium">Deadline Passed ({tenderData.deadlinePassed} days ago)</span>
                </div>
              </div>
            </div>

            {/* Row 2: Location, Dates, Values */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{tenderData.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Submission Date</p>
                  <p className="font-medium">{tenderData.submissionDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Contract Date</p>
                  <p className="font-medium">{tenderData.contractDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Tender Value</p>
                  <p className="font-medium">₹{tenderData.tenderValue.toFixed(2)} Cr</p>
                </div>
              </div>
            </div>

            {/* Row 3: Winner, Stage, Organisation, etc. */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Winner</p>
                  <p className="font-medium">{tenderData.winner}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Stage</p>
                  <p className="font-medium">{tenderData.stage}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Organisation</p>
                  <p className="font-medium">{tenderData.organisation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <p className="font-medium text-blue-600 hover:underline cursor-pointer">{tenderData.website}</p>
                </div>
              </div>
            </div>

            {/* Contract Value and Organisation ID */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Contract Value</p>
                  <p className="font-medium text-lg text-green-700">₹{tenderData.contractValue.toFixed(2)} Cr</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Organisation ID</p>
                  <p className="font-medium">{tenderData.organisationId}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Second Section: Participator Report */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-teal-600" />
              Participator Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead className="text-right">Bid (₹ Cr)</TableHead>
                    <TableHead className="text-center">Rank</TableHead>
                    <TableHead className="text-right">Bid Variation (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenderData.participators.map((participator, index) => (
                    <TableRow key={index} className={participator.rank === 1 ? 'bg-yellow-50' : ''}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          {participator.rank === 1 && <Award className="w-4 h-4 text-yellow-600" />}
                          <span>{participator.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{participator.bid.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getRankBadgeColor(participator.rank)}`}>
                          #{participator.rank}
                        </span>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${getBidVariationColor(participator.bidVariation)}`}>
                        {participator.bidVariation > 0 ? '+' : ''}{participator.bidVariation.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenderResult;