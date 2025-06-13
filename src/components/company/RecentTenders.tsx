
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, IndianRupee } from 'lucide-react';
import CompatibilityScore from '../CompatibilityScore';

interface Tender {
  id: number;
  name: string;
  score: number;
  date: string;
  organisation: string;
  amount: number;
  location: string;
  deadline: string;
  workTypes: string[];
}

interface RecentTendersProps {
  tenders: Tender[];
}

const RecentTenders: React.FC<RecentTendersProps> = ({ tenders }) => {
  const formatAmount = (amount: number) => {
    if (amount >= 100) {
      return `₹${amount.toFixed(2)} Cr.`;
    } else {
      return `₹${(amount * 10).toFixed(2)} L.`;
    }
  };

  return (
    <Card className="rounded-xl border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Last 5 Analyzed Tenders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tenders.map((tender) => (
            <Card key={tender.id} className="group hover:shadow-lg transition-all duration-200 border-0 rounded-xl bg-white shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                          {tender.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{tender.organisation}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tender.workTypes.slice(0, 3).map((workType, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {workType}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <CompatibilityScore score={tender.score} showTooltip={false} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <IndianRupee className="w-4 h-4 mr-2" />
                        <span className="font-medium">{formatAmount(tender.amount)}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{tender.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Analyzed: {new Date(tender.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="border-teal-200 rounded-lg text-teal-700 hover:bg-teal-50 transition-all duration-200"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTenders;
