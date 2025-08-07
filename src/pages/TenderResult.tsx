import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, MapPin, Calendar, IndianRupee, Building, Globe, Award, Users, Bookmark, FileText, ExternalLink } from 'lucide-react';

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
  const [isSaved, setIsSaved] = useState(false);

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
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Tender Result Report
              </h1>
              <p className="text-gray-600 mt-1">Detailed analysis and participator information</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-2 ${
                isSaved ? 'bg-red-50 border-red-200 text-red-600' : 'hover:bg-red-50 hover:border-red-300 hover:text-red-600'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white">
              <FileText className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Tender Summary Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <FileText className="w-5 h-5 text-teal-600" />
              Tender Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Row 1: Description + Deadline Status */}
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-6">
                <h2 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
                  {tenderData.description}
                </h2>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg border border-red-200">
                  <span className="font-medium text-sm">
                    Deadline Passed ({tenderData.deadlinePassed} days ago)
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Row 2: Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Location</p>
                  <p className="text-gray-900 font-semibold">{tenderData.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Submission Date</p>
                  <p className="text-gray-900 font-semibold">{tenderData.submissionDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Contract Date</p>
                  <p className="text-gray-900 font-semibold">{tenderData.contractDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IndianRupee className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Tender Value</p>
                  <p className="text-gray-900 font-semibold">₹{tenderData.tenderValue.toFixed(2)} Cr</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IndianRupee className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Contract Value</p>
                  <p className="text-gray-900 font-semibold">₹{tenderData.contractValue.toFixed(2)} Cr</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Row 3: Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Winner</p>
                <p className="text-gray-900 font-semibold">{tenderData.winner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Contract Stage</p>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  tenderData.stage === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : tenderData.stage === 'Ongoing' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {tenderData.stage}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Organisation</p>
                <p className="text-gray-900 font-semibold">{tenderData.organisation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Organisation ID</p>
                <p className="text-gray-900 font-semibold">{tenderData.organisationId}</p>
              </div>
            </div>

            {/* Website Section */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600 font-medium">Website:</p>
                <a 
                  href={`https://${tenderData.website}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium transition-colors"
                >
                  {tenderData.website} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participator Report Section */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Users className="w-5 h-5 text-teal-600" />
              Participator Report
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              Detailed bidding analysis and participant rankings
            </p>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Name</TableHead>
                    <TableHead className="font-semibold text-gray-900">Bid</TableHead>
                    <TableHead className="font-semibold text-gray-900">Rank</TableHead>
                    <TableHead className="font-semibold text-gray-900">Bid Variation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenderData.participators.map((participator, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          {participator.rank === 1 && <Award className="w-4 h-4 text-yellow-600" />}
                          <span>{participator.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{participator.bid.toFixed(2)} Cr
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getRankBadgeColor(participator.rank)}`}>
                          #{participator.rank}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getBidVariationColor(participator.bidVariation)}`}>
                          {participator.bidVariation > 0 ? '+' : ''}{participator.bidVariation.toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600 font-medium">Total Participants</p>
                <p className="text-2xl font-bold text-blue-900">{tenderData.participators.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-600 font-medium">Winning Bid</p>
                <p className="text-2xl font-bold text-green-900">₹{Math.min(...tenderData.participators.map(p => p.bid)).toFixed(2)} Cr</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-600 font-medium">Bid Range</p>
                <p className="text-2xl font-bold text-orange-900">
                  {((Math.max(...tenderData.participators.map(p => p.bid)) - Math.min(...tenderData.participators.map(p => p.bid))) / Math.min(...tenderData.participators.map(p => p.bid)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenderResult;