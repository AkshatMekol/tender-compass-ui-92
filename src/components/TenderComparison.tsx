import React from 'react';
import { Tender } from '../types/tender';

interface TenderComparisonProps {
  tenders: Tender[];
}

const TenderComparison: React.FC<TenderComparisonProps> = ({ tenders }) => {
  const getSampleSummary = (tender: Tender) => {
    return [
      { sno: 1, description: "Major Bridges", qty: "5", remarks: [`Km 0+396: 5x8m, Stream`, `Km 18+806: 4x(18+24+18)m, River`, `Km 26+955: 15m+2x22m+15m, Stream`, `Km 43+322: 15m+2x22m+15m, River`, `Km 46+282: 16.20+37.485+16.20m, LC no. 19`] },
      { sno: 2, description: "Minor Bridges", qty: "31", remarks: [`Km 0+451: 2x4m, Stream`, `Km 1+768: 4x4m, Stream`, `Km 5+065: 2x8m, Stream`, `Km 5+360: 2x5m, Stream`, `Km 5+825: 3x8m, Stream`, `... and so on`] },
      { sno: 3, description: "ROB", qty: "3", remarks: [`Km 46+282: 16.20+37.485+16.20m, LC no. 19`, `Km 58+622: 16.20+37.485+16.20m, In Realignment`, `Km 60+265: 15.0+72.0+15.0m, LC No. 45`] },
      { sno: 4, description: "RUB", qty: "1", remarks: [`Km 27+257: 2x10.0m`] },
      { sno: 5, description: "VUP", qty: "3", remarks: [] },
      { sno: 6, description: "LVUP", qty: "11", remarks: [] },
      { sno: 7, description: "Box Culverts", qty: "45", remarks: ["New & Reconstruction"] },
      { sno: 8, description: "Pipe Culverts", qty: "39", remarks: ["New & Widening"] },
      { sno: 9, description: "Cross road Box Culverts", qty: "20", remarks: [] },
      { sno: 10, description: "Slab Culverts", qty: "2", remarks: ["Widened"] },
      { sno: 11, description: "Flexible Pavement – Total Length", qty: "62.822 Km", remarks: ["Two lanes with paved shoulder"] },
      { sno: 12, description: "Rigid Pavement – Total Length", qty: "As per toll plaza locations", remarks: ["For toll plaza locations"] },
      { sno: 13, description: "Total road width (Two Lane with Paved shoulders)", qty: "10m", remarks: ["Includes paved shoulder"] },
      { sno: 14, description: "Total road width (Semi-Urban sections)", qty: "12m", remarks: ["Includes paved shoulder and kerb shyness/edge strip"] },
      { sno: 15, description: "Total Bypasses", qty: "1 No / 15.380 Km", remarks: ["From project start to end", "Surendranagar bypass: 16+900 to 32+280, 15.380 Km"] },
      { sno: 16, description: "Total Realignments", qty: "3 Nos / 6.700 Km", remarks: ["From project start to end", "Ankevaliya realignment: 4+960 to 6+300, 1.340 Km", "Rajsitapur realignment: 41+740 to 45+500, 3.760 Km", "Dharangadhra realignment: 58+300 to 59+900, 1.600 Km"] }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tender Comparison</h1>
          <p className="text-gray-600">Comparing {tenders.length} tender summaries</p>
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${Math.min(tenders.length, 3)}, 1fr)` }}>
          {tenders.map((tender, index) => (
            <div key={tender.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h2 className="text-xl font-bold mb-2">{tender.name}</h2>
                <div className="space-y-2 text-sm">
                  <p><strong>Organisation:</strong> {tender.organisation}</p>
                  <p><strong>Amount:</strong> ₹{tender.amount} Cr.</p>
                  <p><strong>Location:</strong> {tender.location}</p>
                  <p><strong>Deadline:</strong> {tender.deadline}</p>
                  <p><strong>Score:</strong> {tender.compatibilityScore}%</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-xs">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left font-semibold">S. No.</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">Description</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">Qty.</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSampleSummary(tender).map((row, idx) => (
                        <React.Fragment key={idx}>
                          <tr>
                            <td className="border border-gray-300 p-2 align-top">{row.sno}</td>
                            <td className="border border-gray-300 p-2 align-top font-medium">{row.description}</td>
                            <td className="border border-gray-300 p-2 align-top">{row.qty}</td>
                            <td className="border border-gray-300 p-2 align-top">
                              {row.remarks.length > 0 && (
                                <div className="space-y-1">
                                  {row.remarks.map((remark, remarkIdx) => (
                                    <div key={remarkIdx}>{remark}</div>
                                  ))}
                                </div>
                              )}
                            </td>
                          </tr>
                          {row.remarks.map((remark, remarkIdx) => (
                            row.sno <= 3 && remarkIdx > 0 ? (
                              <tr key={`${idx}-${remarkIdx}`}>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2"></td>
                                <td className="border border-gray-300 p-2">{remark}</td>
                              </tr>
                            ) : null
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenderComparison;