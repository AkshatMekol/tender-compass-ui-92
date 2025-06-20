import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DualRangeSlider from "./DualSlider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Calendar,
  IndianRupee,
  Trash2,
  Heart,
} from "lucide-react";
import CompatibilityScore from "./CompatibilityScore";
import { Tender } from "@/context/tenderContext";
import {
  getFiltersFromStorage,
  saveFiltersToStorage,
  normalizeAmount,
} from "@/helpers";

interface MyTendersTabProps {
  savedTenders: Tender[];
  onAnalyze: () => void;
  onRemoveTender: (tenderId: string) => void;
}

const MyTendersTab: React.FC<MyTendersTabProps> = ({
  savedTenders,
  onAnalyze,
  onRemoveTender,
}) => {
  const initialFilters = getFiltersFromStorage() || {};

  const [searchTerm, setSearchTerm] = useState(
    () => initialFilters.searchTerm || ""
  );
  const [selectedOrganisation, setSelectedOrganisation] = useState(
    () => initialFilters.selectedOrganisation || "all"
  );
  const [selectedState, setSelectedState] = useState(
    () => initialFilters.selectedState || "all"
  );
  const [amountRange, setAmountRange] = useState<[number, number]>(
    () => initialFilters.amountRange || [10, 2000]
  );
  const [sortBy, setSortBy] = useState(() => initialFilters.sortBy || "score");
  const [showFilters, setShowFilters] = useState(false);
  const [todayTendersOnly, setTodayTendersOnly] = useState(
    () => initialFilters.todayTendersOnly || false
  );
  const [selectedWorkType, setSelectedWorkType] = useState(
    () => initialFilters.selectedWorkType || "EPC"
  );
  const [currentPage, setCurrentPage] = useState(
    () => initialFilters.currentPage || 1
  );

  const tendersPerPage = 10;

  useEffect(() => {
    saveFiltersToStorage({
      searchTerm,
      selectedOrganisation,
      selectedState,
      amountRange,
      sortBy,
      todayTendersOnly,
      selectedWorkType,
      currentPage,
    });
  }, [
    searchTerm,
    selectedOrganisation,
    selectedState,
    amountRange,
    sortBy,
    todayTendersOnly,
    selectedWorkType,
    currentPage,
  ]);

  // Place Sikkim tender first, then existing saved tenders, then additional mock tenders

  function parseEstimatedCost(costStr: string) {
    const match = costStr.match(/([\d,.]+)\s*Cr\.?/i);
    if (!match) return NaN;
    return parseFloat(match[1].replace(/,/g, ""));
  }

  const filteredAndSortedTenders = useMemo(() => {
    if (!savedTenders || savedTenders.length === 0) {
      return [];
    }

    const today = new Date().toISOString().split("T")[0];

    const filtered = savedTenders.filter((tender) => {
      const matchesSearch =
        !searchTerm ||
        searchTerm.trim() === "" ||
        tender.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesOrg =
        selectedOrganisation === "all" ||
        tender.organization === selectedOrganisation;

      let matchesAmount = false;

      if (!normalizeAmount(tender.estimatedCost)) {
        matchesAmount = true;
      } else {
        matchesAmount =
          !amountRange ||
          amountRange.length !== 2 ||
          (parseEstimatedCost(normalizeAmount(tender.estimatedCost)) >=
            amountRange[0] &&
            parseEstimatedCost(normalizeAmount(tender.estimatedCost)) <=
              amountRange[1]);
      }

      const matchesToday = !todayTendersOnly || tender.submissionDate === today;

      const matchesWorkType =
        selectedWorkType.toLowerCase() === "all" ||
        (selectedWorkType.toLowerCase() === "others" &&
          !["item-rate", "epc", "epc contract", "ham", "bot"].includes(
            tender.metadata?.type?.toLowerCase()
          )) ||
        tender.metadata?.type
          ?.toLowerCase()
          ?.includes(selectedWorkType.toLowerCase());

      return (
        matchesSearch &&
        matchesOrg &&
        matchesAmount &&
        matchesToday &&
        matchesWorkType
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.compatibilityScore - a.compatibilityScore;
        case "amount":
          if (!a.estimatedCost || !b.estimatedCost) return 0;
          return (
            parseEstimatedCost(b.estimatedCost) -
            parseEstimatedCost(a.estimatedCost)
          );
        case "date":
          return (
            new Date(a.submissionDate).getTime() -
            new Date(b.submissionDate).getTime()
          );
        default:
          return b.compatibilityScore - a.compatibilityScore;
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedOrganisation,
    amountRange,
    sortBy,
    todayTendersOnly,
    selectedWorkType,
    savedTenders,
  ]);

  const workTypes = ["Item-rate", "EPC", "HAM", "BOT", "Others"];

  const organisations = Array.from(
    new Set(savedTenders.map((t) => t.organization))
  ).filter((org) => org);

  const states = Array.from(
    new Set(
      savedTenders.map((t) => {
        const location = t.location || "";
        const parts = location.split(",");
        return parts.length === 2 ? parts[1].trim() : parts[0].trim();
      })
    )
  ).filter((state) => state);

  const totalPages = Math.ceil(
    filteredAndSortedTenders.length / tendersPerPage
  );
  const startIndex = (currentPage - 1) * tendersPerPage;
  const currentTenders = filteredAndSortedTenders.slice(
    startIndex,
    startIndex + tendersPerPage
  );

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
  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Tenders</h2>
            <p className="text-gray-600">{savedTenders.length} saved tenders</p>
          </div>
        </div>

        {/* Work Type Selection */}
        <div className="flex gap-0 p-1 bg-gray-100 rounded-lg">
          {workTypes.map((type) => (
            <Button
              key={type}
              variant="ghost"
              onClick={() => setSelectedWorkType(type)}
              className={`flex-1 rounded-md transition-all duration-200 ${
                selectedWorkType === type
                  ? "bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search saved tenders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-2 border-gray-200 focus:border-teal-400"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saved-date">Recently Saved</SelectItem>
              <SelectItem value="score">Compatibility Score</SelectItem>
              <SelectItem value="amount">Tender Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {showFilters && (
          <Card className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organisation
                </label>
                <Select
                  value={selectedOrganisation}
                  onValueChange={setSelectedOrganisation}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Organisations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organisations</SelectItem>
                    {organisations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Compatibility Score</SelectItem>
                    <SelectItem value="amount">Tender Amount</SelectItem>
                    <SelectItem value="date">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Range: ₹{amountRange[0]} Cr - ₹{amountRange[1]} Cr
                </label>
                <div className="px-2">
                  <DualRangeSlider
                    value={amountRange}
                    onValueChange={setAmountRange}
                    max={2000}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-4 pr-2">
          {filteredAndSortedTenders.map((tender) => (
            <Card
              key={tender.id}
              className="group hover:shadow-lg transition-all duration-200 border-0 rounded-xl bg-white shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                          {tender.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {tender.organisation}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tender.workTypes
                            .slice(0, 3)
                            .map((workType, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                {workType}
                              </span>
                            ))}
                        </div>
                        {tender.savedDate && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Heart className="w-3 h-3 mr-1 text-red-500" />
                            <span>
                              Saved on{" "}
                              {new Date(tender.savedDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        <CompatibilityScore
                          score={tender.compatibilityScore}
                          showTooltip={false}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <IndianRupee className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          {formatAmount(tender.amount)}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{tender.location}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Deadline: {tender.deadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      // onClick={onAnalyze}
                      className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
                    >
                      Analyse
                    </Button>

                    <Button
                      onClick={() => onRemoveTender(tender.id)}
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAndSortedTenders.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No saved tenders found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTendersTab;
