import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ArrowRight,
  Building2,
  Calendar as CalendarIcon,
  IndianRupee,
  Layers3,
  LineChart,
  MapPin,
  Search,
  Trophy,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts";
import { Card as ShadCard } from "@/components/ui/card";

// Mock dataset for companies and tenders
interface CompanyTender {
  id: string;
  name: string; // tender description
  organisation: string;
  state: string;
  year: number;
  city: string;
  location: string;
  bidAmount: number; // participated bid amount (Cr)
  won: boolean;
  winner?: string;
  marginalDiff: number; // -100 .. 100
  cost: number; // cost on x-axis (Cr)
}

interface CompanyData {
  company: string;
  tenders: CompanyTender[];
}

const COMPANIES: CompanyData[] = [
  {
    company: "L&T Construction",
    tenders: [
      { id: "t1", name: "Delhi-Gurgaon 4-lane upgrade", organisation: "NHAI", state: "Delhi", year: 2023, city: "Delhi", location: "Delhi-Gurgaon", bidAmount: 830, won: true, winner: "L&T Construction", marginalDiff: -3.5, cost: 850.5 },
      { id: "t2", name: "Pune Smart City Phase 2", organisation: "PSCDC", state: "Maharashtra", year: 2024, city: "Pune", location: "Pune", bidAmount: 640, won: true, winner: "L&T Construction", marginalDiff: -2.1, cost: 650.8 },
      { id: "t3", name: "DMRC Underground Extension", organisation: "DMRC", state: "Delhi", year: 2024, city: "Delhi", location: "New Delhi", bidAmount: 1190, won: false, marginalDiff: 0.8, cost: 1250.75 },
      { id: "t4", name: "JNPT Port Modernization", organisation: "JNPT", state: "Maharashtra", year: 2023, city: "Mumbai", location: "Mumbai", bidAmount: 950, won: false, marginalDiff: 1.2, cost: 980.25 },
      { id: "t5", name: "Coastal Road Anti‑Erosion", organisation: "Maharashtra PWD", state: "Maharashtra", year: 2025, city: "Mumbai", location: "Mumbai", bidAmount: 1520, won: false, marginalDiff: 2.0, cost: 1560 },
    ],
  },
  {
    company: "Tata Projects",
    tenders: [
      { id: "t6", name: "Railway Station Upgradation", organisation: "Indian Railways", state: "Maharashtra", year: 2024, city: "Mumbai", location: "Mumbai Central", bidAmount: 435.2, won: false, marginalDiff: -1.8, cost: 425.3 },
      { id: "t7", name: "Urban Ropeway Phase 2", organisation: "HP PWD", state: "Himachal Pradesh", year: 2025, city: "Shimla", location: "Shimla", bidAmount: 3480, won: false, marginalDiff: 0.9, cost: 3500 },
      { id: "t8", name: "Digital Infra for Govt", organisation: "NIC", state: "Gujarat", year: 2025, city: "Ahmedabad", location: "Ahmedabad", bidAmount: 345, won: true, winner: "Tata Projects", marginalDiff: -2.9, cost: 340 },
    ],
  },
];

const years = [2023, 2024, 2025];

const currency = (v: number) => `₹${v.toFixed(2)} Cr`;

const CompetitorAnalysisTab: React.FC = () => {
  const [companyQuery, setCompanyQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  // Individual filters
  const [selectedOrganisation, setSelectedOrganisation] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const companyOptions = COMPANIES.map((c) => c.company);

  const activeData = useMemo(() => {
    const comp = COMPANIES.find((c) => c.company === selectedCompany);
    if (!comp) return [] as CompanyTender[];

    return comp.tenders.filter((t) => {
      const matchesOrg = selectedOrganisation === "all" || t.organisation === selectedOrganisation;
      const matchesState = selectedState === "all" || t.state === selectedState;
      const matchesYear = selectedYear === "all" || String(t.year) === selectedYear;
      return matchesOrg && matchesState && matchesYear;
    });
  }, [selectedCompany, selectedOrganisation, selectedState, selectedYear]);

  // KPI computations
  const kpis = useMemo(() => {
    const participated = activeData;
    const won = activeData.filter((t) => t.won);
    const lost = activeData.filter((t) => !t.won);

    const sum = (arr: CompanyTender[]) => arr.reduce((s, t) => s + t.bidAmount, 0);
    const range = (arr: CompanyTender[]) => {
      if (arr.length === 0) return "-";
      const min = Math.min(...arr.map((t) => t.bidAmount));
      const max = Math.max(...arr.map((t) => t.bidAmount));
      return `${currency(min)} – ${currency(max)}`;
      };

    return {
      participated: { count: participated.length, amount: sum(participated), range: range(participated) },
      won: { count: won.length, amount: sum(won), range: range(won) },
      lost: { count: lost.length, amount: sum(lost), range: range(lost) },
    };
  }, [activeData]);

  // Strengths (top 3) by state and organisation
  const strengths = useMemo(() => {
    const by = <K extends keyof CompanyTender>(key: K) => {
      const map = new Map<string, { participated: number; won: number; amount: number }>();
      activeData.forEach((t) => {
        const k = String(t[key]);
        const curr = map.get(k) || { participated: 0, won: 0, amount: 0 };
        curr.participated += 1;
        curr.won += t.won ? 1 : 0;
        curr.amount += t.bidAmount;
        map.set(k, curr);
      });
      return Array.from(map.entries())
        .map(([k, v]) => ({ key: k, ...v }))
        .sort((a, b) => b.won - a.won || b.amount - a.amount || b.participated - a.participated)
        .slice(0, 3);
    };

    return {
      state: by("state"),
      organisation: by("organisation"),
    };
  }, [activeData]);

  // Scatter data
  const scatterData = useMemo(
    () => activeData.map((t) => ({ x: t.cost, y: t.marginalDiff, name: t.name, won: t.won })),
    [activeData]
  );

  // YoY bar chart (amount stacked; labels show counts)
  const yoyData = useMemo(() => {
    const map = new Map<number, { year: number; participatedAmount: number; wonAmount: number; participatedCount: number; wonCount: number }>();
    activeData.forEach((t) => {
      const entry = map.get(t.year) || { year: t.year, participatedAmount: 0, wonAmount: 0, participatedCount: 0, wonCount: 0 };
      entry.participatedAmount += t.bidAmount;
      entry.participatedCount += 1;
      if (t.won) {
        entry.wonAmount += t.bidAmount;
        entry.wonCount += 1;
      }
      map.set(t.year, entry);
    });
    return Array.from(map.values()).sort((a, b) => a.year - b.year);
  }, [activeData]);

  // Filter options
  const filterOptions = useMemo(() => {
    const comp = COMPANIES.find((c) => c.company === selectedCompany);
    if (!comp) return { organisations: ["all"], states: ["all"], years: ["all"] };
    
    const organisations = new Set<string>();
    const states = new Set<string>();
    const years = new Set<string>();
    
    comp.tenders.forEach((t) => {
      organisations.add(t.organisation);
      states.add(t.state);
      years.add(String(t.year));
    });
    
    return {
      organisations: ["all", ...Array.from(organisations)],
      states: ["all", ...Array.from(states)],
      years: ["all", ...Array.from(years)]
    };
  }, [selectedCompany]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Competitor Analysis</h2>
            <p className="text-gray-600">Deep‑dive into a company's performance across tenders</p>
          </div>
        </div>

        {/* Company selector */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search or type company name..."
            value={companyQuery}
            onChange={(e) => setCompanyQuery(e.target.value)}
            className="pl-10 rounded-xl border-2 border-gray-200 focus:border-teal-400"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setSelectedCompany(companyQuery);
              }
            }}
          />
          {companyQuery && companyOptions.filter(c => c.toLowerCase().includes(companyQuery.toLowerCase())).length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-48 overflow-y-auto">
              {companyOptions
                .filter(c => c.toLowerCase().includes(companyQuery.toLowerCase()))
                .map((company) => (
                  <div
                    key={company}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedCompany(company);
                      setCompanyQuery(company);
                    }}
                  >
                    {company}
                  </div>
                ))}
            </div>
          )}
        </div>

        {selectedCompany && (
          <Card className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organisation</label>
                <Select value={selectedOrganisation} onValueChange={setSelectedOrganisation}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Organisations" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.organisations.map(org => (
                      <SelectItem key={org} value={org}>{org === "all" ? "All Organisations" : org}</SelectItem>
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
                    {filterOptions.states.map(state => (
                      <SelectItem key={state} value={state}>{state === "all" ? "All States" : state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.years.map(year => (
                      <SelectItem key={year} value={year}>{year === "all" ? "All Years" : year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Content sections */}
      <div className="flex-1 p-6 space-y-6">
        {!selectedCompany && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Company Selected</h3>
            <p className="text-gray-500">Search and select a company to view detailed analysis</p>
          </div>
        )}

        {selectedCompany && (
          <>
            {/* Section 1: KPI cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-700 flex items-center gap-2 font-semibold">
                  <Users className="w-5 h-5 text-blue-600"/>
                  Participated Tenders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">{kpis.participated.count}</div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  <span className="font-medium">Total:</span> {currency(kpis.participated.amount)}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Range:</span> {kpis.participated.range}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-green-700 flex items-center gap-2 font-semibold">
                  <Trophy className="w-5 h-5 text-green-600"/>
                  Won Tenders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">{kpis.won.count}</div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  <span className="font-medium">Total:</span> {currency(kpis.won.amount)}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Range:</span> {kpis.won.range}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-l-4 border-l-red-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-red-700 flex items-center gap-2 font-semibold">
                  <Layers3 className="w-5 h-5 text-red-600"/>
                  Lost Tenders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">{kpis.lost.count}</div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  <span className="font-medium">Total:</span> {currency(kpis.lost.amount)}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Range:</span> {kpis.lost.range}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 3: Strengths */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Company Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Top Performing States</h3>
                  </div>
                  <div className="space-y-4">
                    {strengths.state.map((s, index) => {
                      const range = (() => {
                        const tenders = activeData.filter(t => t.state === s.key);
                        if (tenders.length === 0) return "-";
                        const min = Math.min(...tenders.map(t => t.bidAmount));
                        const max = Math.max(...tenders.map(t => t.bidAmount));
                        return `${currency(min)} – ${currency(max)}`;
                      })();
                      
                      return (
                        <div key={s.key} className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-gray-900">#{index + 1} {s.key}</span>
                            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {Math.round((s.won / s.participated) * 100)}% Win Rate
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Participated:</span>
                              <div className="font-semibold">{s.participated} ({currency(s.amount)})</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Won:</span>
                              <div className="font-semibold text-green-600">{s.won} ({currency(activeData.filter(t => t.state === s.key && t.won).reduce((sum, t) => sum + t.bidAmount, 0))})</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            <span className="font-medium">Range:</span> {range}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-900">Top Client Organizations</h3>
                  </div>
                  <div className="space-y-4">
                    {strengths.organisation.map((s, index) => {
                      const range = (() => {
                        const tenders = activeData.filter(t => t.organisation === s.key);
                        if (tenders.length === 0) return "-";
                        const min = Math.min(...tenders.map(t => t.bidAmount));
                        const max = Math.max(...tenders.map(t => t.bidAmount));
                        return `${currency(min)} – ${currency(max)}`;
                      })();
                      
                      return (
                        <div key={s.key} className="bg-white p-4 rounded-lg border border-purple-200 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-gray-900">#{index + 1} {s.key}</span>
                            <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {Math.round((s.won / s.participated) * 100)}% Win Rate
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Participated:</span>
                              <div className="font-semibold">{s.participated} ({currency(s.amount)})</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Won:</span>
                              <div className="font-semibold text-green-600">{s.won} ({currency(activeData.filter(t => t.organisation === s.key && t.won).reduce((sum, t) => sum + t.bidAmount, 0))})</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            <span className="font-medium">Range:</span> {range}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Scatter chart */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <LineChart className="w-6 h-6 text-teal-600"/>
                Bid Performance Analysis
              </CardTitle>
              <p className="text-gray-600 text-sm mt-2">Cost vs Marginal Difference across all tenders</p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  participated: { label: "Participated", color: "hsl(var(--primary))" },
                  won: { label: "Won", color: "#16a34a" },
                }}
                className="w-full h-[400px]"
              >
                <ScatterChart margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" dataKey="x" name="Cost" unit=" Cr" tickFormatter={(v) => `₹${v}`} />
                  <YAxis type="number" dataKey="y" name="Margin" unit="%" domain={[-100, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
                  <Scatter name="Lost Tenders" data={scatterData.filter(d => !d.won)} fill="#ef4444" />
                  <Scatter name="Won Tenders" data={scatterData.filter(d => d.won)} fill="#16a34a" />
                  <ChartLegend content={<ChartLegendContent />} />
                </ScatterChart>
              </ChartContainer>
            </CardContent>
          </Card>

            {/* Section 5: YoY bar chart */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <LineChart className="w-6 h-6 text-indigo-600"/>
                  Year-on-Year Performance
                </CardTitle>
                <p className="text-gray-600 text-sm mt-2">Annual growth in tender participation and wins</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ 
                    participatedAmount: { label: "Participated Amount", color: "#3b82f6" }, 
                    wonAmount: { label: "Won Amount", color: "#10b981" } 
                  }}
                  className="w-full h-[400px]"
                >
                  <BarChart data={yoyData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v) => `₹${v}`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="participatedAmount" fill="#3b82f6" name="Participated Amount" radius={[0, 0, 4, 4]}>
                      <LabelList dataKey="participatedCount" position="center" fontSize={12} fill="white" fontWeight="bold" />
                    </Bar>
                    <Bar dataKey="wonAmount" fill="#10b981" name="Won Amount" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="wonCount" position="center" fontSize={12} fill="white" fontWeight="bold" />
                    </Bar>
                    <ChartLegend content={<ChartLegendContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Section 6: Past tenders */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-xl">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Layers3 className="w-6 h-6 text-orange-500"/>
                  Company Tender History
                </CardTitle>
                <p className="text-gray-600 text-sm mt-2">Complete list of tenders this company has participated in</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {activeData.map((tender, index) => (
                    <div key={tender.id} className={`p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors ${index === activeData.length - 1 ? 'border-b-0' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">{tender.name}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-purple-500" />
                              <span className="text-gray-600">Org:</span>
                              <span className="font-medium">{tender.organisation}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-blue-500" />
                              <span className="text-gray-600">State:</span>
                              <span className="font-medium">{tender.state}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4 text-green-500" />
                              <span className="text-gray-600">Year:</span>
                              <span className="font-medium">{tender.year}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <IndianRupee className="w-4 h-4 text-yellow-500" />
                              <span className="text-gray-600">Bid:</span>
                              <span className="font-semibold text-lg">{currency(tender.bidAmount)}</span>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              tender.won 
                                ? "bg-green-100 text-green-700 border border-green-200" 
                                : "bg-red-100 text-red-700 border border-red-200"
                            }`}>
                              {tender.won ? "✓ Won" : "✗ Lost"}
                            </span>
                            <span className="text-xs text-gray-500">
                              Margin: {tender.marginalDiff > 0 ? '+' : ''}{tender.marginalDiff}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section 7: Rival bidders */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-xl">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-red-500"/>
                  Rival Bidders Analysis
                </CardTitle>
                <p className="text-gray-600 text-sm mt-2">Key competitors in similar tender categories</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left p-4 text-sm font-bold text-gray-800 bg-gray-50 rounded-tl-lg">Bidder Company</th>
                        <th className="text-left p-4 text-sm font-bold text-gray-800 bg-gray-50">Key Strengths</th>
                        <th className="text-left p-4 text-sm font-bold text-gray-800 bg-gray-50">Participated</th>
                        <th className="text-left p-4 text-sm font-bold text-gray-800 bg-gray-50 rounded-tr-lg">Won</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { bidder: "Reliance Infrastructure", strengths: "Gujarat, Maharashtra", participated: 45, won: 12, winRate: 27 },
                        { bidder: "Adani Construction", strengths: "Gujarat, Rajasthan", participated: 38, won: 15, winRate: 39 },
                        { bidder: "Hindustan Construction Co", strengths: "Maharashtra, Delhi", participated: 42, won: 8, winRate: 19 },
                        { bidder: "GMR Group", strengths: "Delhi, Andhra Pradesh", participated: 35, won: 11, winRate: 31 },
                      ].map((rival, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-purple-600" />
                              </div>
                              <span className="font-semibold text-gray-900">{rival.bidder}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {rival.strengths.split(', ').map((strength, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  {strength}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-lg text-gray-900">{rival.participated}</span>
                            <span className="text-gray-500 text-sm ml-1">tenders</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-lg text-green-600">{rival.won}</span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                {rival.winRate}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default CompetitorAnalysisTab;
