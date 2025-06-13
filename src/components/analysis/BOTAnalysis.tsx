import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const BOTAnalysis = ({ tenderData }: { tenderData: any }) => {
  const navigate = useNavigate();

  // Calculate days left
  const submissionDate = new Date('2025-03-04');
  const today = new Date();
  const timeDiff = submissionDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const siteImages = [
    { id: '1', src: 'https://worldtiles1.waze.com/tiles/17/93135/56855.png?highres=true', title: 'BOT Project Site', location: 'Project Area', date: '2024-03-15' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)} 
              className="mr-4 rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              BOT Tender Analysis Report
            </h1>
          </div>

          {/* Tender Bio & Compatibility Score Unavailable */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3 shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">Tender Biography</CardTitle>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${daysLeft > 30 ? 'text-green-600' : daysLeft > 7 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                    </div>
                    <div className="text-sm text-gray-500">to submit</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">{tenderData.brief}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Submission Date</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderData.submissionDeadline}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Estimated Cost</p>
                    <p className="font-semibold text-teal-700 text-sm">₹{tenderData.estimatedCost}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">EMD</p>
                    <p className="font-medium text-gray-700 text-sm">₹{tenderData.emd}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Length</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderData.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Type</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Download Documents</p>
                    <a 
                      href={tenderData.downloadDocuments} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Download <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link w-3 h-3 ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Organisation</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderData.organisation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Organisation ID</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderData.organisationId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Website</p>
                    <a 
                      href={tenderData.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Visit Website <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link w-3 h-3 ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compatibility Score Unavailable */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Compatibility Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <div className="flex flex-col items-center justify-center h-32">
                  <AlertTriangle className="w-8 h-8 text-gray-400 mb-2" />
                  <div className="text-lg font-semibold text-gray-600 mb-1">
                    Score Unavailable
                  </div>
                  <div className="text-xs text-gray-500">
                    BOT project analysis not available
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Limited Information Notice */}
          <Card className="shadow-lg border-0 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <p className="text-gray-800 font-medium text-sm">
                  <span className="font-semibold text-yellow-700">BOT Project Notice:</span> Build-Operate-Transfer project with limited analysis features available.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Site Images Gallery */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Site Images Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {siteImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-medium text-xs truncate">{image.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BOTAnalysis;
