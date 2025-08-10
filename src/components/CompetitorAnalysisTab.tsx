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
  IndianRupee,
  Layers3,
  LineChart,
  MapPin,
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

  // Combined tabs: organisation | state | year
  const [dimension, setDimension] = useState<"organisation" | "state" | "year">("organisation");
  const [dimensionValue, setDimensionValue] = useState<string>("all");

  const companyOptions = COMPANIES.map((c) => c.company);

  const activeData = useMemo(() => {
    const comp = COMPANIES.find((c) => c.company === selectedCompany);
    if (!comp) return [] as CompanyTender[];

    return comp.tenders.filter((t) => {
      if (dimensionValue === "all") return true;
      if (dimension === "organisation") return t.organisation === dimensionValue;
      if (dimension === "state") return t.state === dimensionValue;
      if (dimension === "year") return String(t.year) === dimensionValue;
      return true;
    });
  }, [selectedCompany, dimension, dimensionValue]);

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

  // Dimension value options
  const dimensionOptions = useMemo(() => {
    const comp = COMPANIES.find((c) => c.company === selectedCompany);
    if (!comp) return ["all"];
    const set = new Set<string>();
    comp.tenders.forEach((t) => {
      if (dimension === "organisation") set.add(t.organisation);
      if (dimension === "state") set.add(t.state);
      if (dimension === "year") set.add(String(t.year));
    });
    return ["all", ...Array.from(set)];
  }, [selectedCompany, dimension]);

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
        <Card className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Company</label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Choose a company" />
                </SelectTrigger>
                <SelectContent>
                  {companyOptions.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Or type a company</label>
              <Input value={companyQuery} onChange={(e) => setCompanyQuery(e.target.value)} placeholder="Type company name..." className="rounded-lg" />
            </div>
            <div className="md:col-span-1">
              <Button
                onClick={() => setSelectedCompany(companyQuery || selectedCompany)}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
              >
                Load Company <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Combined dimension tabs */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dimension</label>
              <div className="grid grid-cols-3 bg-gray-100 p-1 rounded-lg">
                {(["organisation", "state", "year"] as const).map((d) => (
                  <Button
                    key={d}
                    variant="ghost"
                    onClick={() => setDimension(d)}
                    className={`rounded-md ${
                      dimension === d
                        ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
              <Select value={dimensionValue} onValueChange={setDimensionValue}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dimensionOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt === "all" ? "All" : opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      {/* Content sections */}
      <div className="flex-1 p-6 space-y-6">
        {/* Section 1: KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-700 flex items-center gap-2"><Users className="w-4 h-4 text-blue-600"/>Participated Tenders</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">{kpis.participated.count} <span className="text-sm font-medium text-gray-500">tenders</span></div>
              <div className="text-gray-600"><span className="font-medium">Amount:</span> {currency(kpis.participated.amount)}</div>
              <div className="text-gray-600"><span className="font-medium">Bid range:</span> {kpis.participated.range}</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-700 flex items-center gap-2"><Trophy className="w-4 h-4 text-green-600"/>Won Tenders</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">{kpis.won.count} <span className="text-sm font-medium text-gray-500">tenders</span></div>
              <div className="text-gray-600"><span className="font-medium">Amount:</span> {currency(kpis.won.amount)}</div>
              <div className="text-gray-600"><span className="font-medium">Bid range:</span> {kpis.won.range}</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-700 flex items-center gap-2"><Layers3 className="w-4 h-4 text-red-600"/>Lost Tenders</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">{kpis.lost.count} <span className="text-sm font-medium text-gray-500">tenders</span></div>
              <div className="text-gray-600"><span className="font-medium">Amount:</span> {currency(kpis.lost.amount)}</div>
              <div className="text-gray-600"><span className="font-medium">Bid range:</span> {kpis.lost.range}</div>
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Strengths */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="text-sm font-semibold text-gray-700 mb-3">Top States</div>
                <div className="space-y-3">
                  {strengths.state.map((s) => (
                    <div key={s.key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">{s.key}</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">P:</span> {s.participated} · <span className="font-semibold">W:</span> {s.won} · <span className="font-semibold">Amt:</span> {currency(s.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="text-sm font-semibold text-gray-700 mb-3">Top Organisations</div>
                <div className="space-y-3">
                  {strengths.organisation.map((s) => (
                    <div key={s.key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-900">{s.key}</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">P:</span> {s.participated} · <span className="font-semibold">W:</span> {s.won} · <span className="font-semibold">Amt:</span> {currency(s.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Scatter chart */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2"><LineChart className="w-5 h-5 text-teal-600"/>Bid Margins vs Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                participated: { label: "Participated", color: "hsl(var(--primary))" },
                won: { label: "Won", color: "#16a34a" },
              }}
              className="w-full h-[360px]"
            >
              <ScatterChart margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Cost" unit=" Cr" tickFormatter={(v) => `${v}`} />
                <YAxis type="number" dataKey="y" name="Margin" unit=" %" domain={[-100, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
                <Scatter name="Participated" data={scatterData.filter(d => !d.won)} fill="hsl(var(--primary))" />
                <Scatter name="Won" data={scatterData.filter(d => d.won)} fill="#16a34a" />
                <ChartLegend content={<ChartLegendContent />} />
              </ScatterChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Section 5: YoY bar chart */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Year‑on‑Year Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ participated: { label: "Participated", color: "#38bdf8" }, won: { label: "Won", color: "#10b981" } }}
              className="w-full h-[360px]"
            >
              <BarChart data={yoyData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `₹${v}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="participatedAmount" stackId="a" fill="#38bdf8" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="participatedCount" position="insideTop" className="fill-white" />
                </Bar>
                <Bar dataKey="wonAmount" stackId="a" fill="#10b981" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="wonCount" position="insideTop" className="fill-white" />
                </Bar>
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Section 6: Past tenders for the company */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Past Tenders for this Company</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[520px] overflow-y-auto space-y-4 pr-1">
              {activeData.map((t) => (
                <ShadCard key={t.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500 mb-1">{t.id.toUpperCase()}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">{t.name}</h3>
                        <p className="text-gray-600 mb-4">{t.organisation}</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center text-sm"><IndianRupee className="w-4 h-4 text-green-600 mr-1"/><span className="text-gray-600">Tender:</span><span className="font-medium ml-1">{currency(t.cost)}</span></div>
                          <div className="flex items-center text-sm"><MapPin className="w-4 h-4 text-blue-600 mr-1"/><span className="text-gray-600">Location:</span><span className="font-medium ml-1">{t.location}</span></div>
                          <div className="flex items-center text-sm"><span className="text-gray-600">Year:</span><span className="font-medium ml-1">{t.year}</span></div>
                          <div className="flex items-center text-sm"><span className="text-gray-600">City:</span><span className="font-medium ml-1">{t.city}</span></div>
                        </div>
                      </div>
                      <div className="ml-6 text-right">
                        <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-lg">
                          <div className="text-xs font-medium opacity-90">Contract Stage</div>
                          <div className="text-sm font-bold">{t.won ? "Awarded" : "Lost"}</div>
                          <div className="text-xs font-medium opacity-90 mt-1">Bid Value</div>
                          <div className="text-sm font-bold">{currency(t.bidAmount)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </ShadCard>
              ))}
              {activeData.length === 0 && (
                <div className="text-center text-gray-500 py-8">Select a company to view past tenders.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Rival bidders table */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Rival Bidders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="text-left p-3 font-semibold">Bidder</th>
                    <th className="text-left p-3 font-semibold">Strengths</th>
                    <th className="text-left p-3 font-semibold">Tenders Participated</th>
                    <th className="text-left p-3 font-semibold">Tenders Won</th>
                  </tr>
                </thead>
                <tbody>
                  {activeData.length > 0 ? (
                    ["Tata Projects", "Adani Infrastructure", "Shapoorji Pallonji", "HCC Limited"].map((b, i) => {
                      const participated = activeData.filter((t) => t.winner !== b).length; // placeholder
                      const won = activeData.filter((t) => t.winner === b).length;
                      return (
                        <tr key={b} className="hover:bg-gray-50">
                          <td className="p-3 font-medium text-gray-900">{b}</td>
                          <td className="p-3 text-gray-700">Strong presence in metro, highways and urban infra</td>
                          <td className="p-3">{participated}</td>
                          <td className="p-3">{won}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-gray-500">Select a company to see rival bidders.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompetitorAnalysisTab;
