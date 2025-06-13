
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Truck, Calculator, Building, Package } from 'lucide-react';

const TenderTypeDemo = () => {
  const navigate = useNavigate();

  const tenderTypes = [
    {
      type: 'EPC',
      title: 'Engineering, Procurement & Construction',
      description: 'Complete project delivery with full nature of work, payment weightage, and compatibility analysis',
      icon: Building,
      features: ['7 Nature of Work Categories', 'Payment Weightage Analysis', 'Compatibility Score', 'Site Information']
    },
    {
      type: 'HAM',
      title: 'Hybrid Annuity Model',
      description: 'Long-term project with maintenance responsibilities, no payment weightage analysis',
      icon: Package,
      features: ['7 Nature of Work Categories', 'No Payment Weightage', 'Compatibility Score', 'Site Information']
    },
    {
      type: 'Item-Rate',
      title: 'Item Rate Contract',
      description: 'Traditional contracting with BOQ instead of payment weightage',
      icon: Calculator,
      features: ['3 Nature of Work Categories', 'BOQ Analysis', 'Compatibility Score', 'Site Information']
    },
    {
      type: 'BOT',
      title: 'Build-Operate-Transfer',
      description: 'Private sector led project with limited analysis features',
      icon: Truck,
      features: ['No Nature of Work', 'No Payment Weightage', 'Score Unavailable', 'No Site Information']
    },
    {
      type: 'Others',
      title: 'Other Tender Types',
      description: 'Miscellaneous tender categories with minimal analysis',
      icon: FileText,
      features: ['No Nature of Work', 'No Payment Weightage', 'Score Unavailable', 'No Site Information']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Tender Analysis by Type
          </h1>
          <p className="text-gray-600 text-lg">
            Experience different analysis views based on tender types
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenderTypes.map((tender, index) => {
            const Icon = tender.icon;
            return (
              <Card key={tender.type} className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{tender.title}</CardTitle>
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 rounded-full text-sm font-medium">
                    {tender.type}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tender.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">Features:</h4>
                    <ul className="space-y-1">
                      {tender.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => navigate(`/analysis?type=${tender.type}`)}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300"
                  >
                    View {tender.type} Analysis
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenderTypeDemo;
