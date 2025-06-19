import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { toCamelCase } from "@/helpers";
import { useUser } from "./userContext";

export type Tender = {
  _id: string;
  bio: string;
  location: string;
  submissionDate: string;
  emd: string;
  organization: string;
  organizationTenderId: string;
  website: string;
  downloadDocuments: string;
  length: string;
  type: string;
  zipFileId: string;
  metadata: Record<string, string | null>;
  compatibilityScore: number;
  compatibilityAnalysis: string | null;
  estimatedCost: string | null;
};

type TenderContextType = {
  tenders: Tender[];
  loading: boolean;
  error: string | null;
};

function normalizeKeys(
  obj: Record<string | null, string | null> | Tender
): Record<string, string | null> {
  const result: Record<string, string | null> = {};
  for (const key in obj) {
    if (!key) continue;
    const newKey = toCamelCase(key);
    result[newKey] = obj[key];
  }
  return result;
}

const defaultTender = {
  _id: null,
  id: null,
  zipFileId: null,
  organization: "",
  organizationTenderId: "",
  estimatedCost: "",
  emd: "",
  bio: "",
  submissionDate: "",
  website: "",
  location: "",
  compatibilityScore: null,
  compatibilityAnalysis: null,

  metadata: {
    length: "",
    type: "",
    terrain: "",
    climate: "",
    logistics: "",
    safety: "",
    soilType: "",
    materialAvailability: "",
    currentSite: "",
    roadsideDrainage: "",
    structuresWork: "",
    protectionWork: "",
    roadComposition: "",
    paymentWeightage: "",
    locationImages: [],
    gradeSeperators: "",
    drainage: "",
    structures: "",
    facilities: "",
    protection: "",
    otherWorks: "",
  },
};

const TenderContext = createContext<TenderContextType | undefined>(undefined);

function normalizeCompatibilityScore(s: number, min: number, max: number) {
  console.log("Min/Max Scores:", min, max);
  const percentage = ((s - min) / (max - min)) * 100;
  console.log("Normalized Score:", percentage);
  return Math.round(percentage * 100) / 100;
}

function getMinMaxScores(tenders: Tender[]) {
  const scores = tenders
    .map((tender) => tender.compatibilityScore)
    .filter((score) => score !== null);

  if (scores.length === 0) return { min: 0, max: 100 };

  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  return {
    min: minScore,
    max: maxScore,
  };
}

export const TenderProvider = ({ children }: { children: ReactNode }) => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [tendersRes, scoresRes] = await Promise.all([
          fetch("http://localhost:8000/api/tenders", {
            credentials: "include",
          }),
          fetch("http://localhost:8000/api/compatibility/user", {
            credentials: "include",
          }),
        ]);

        if (!tendersRes.ok || !scoresRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [tendersData, scoresData] = await Promise.all([
          tendersRes.json(),
          scoresRes.json(),
        ]);

        const enrichedTenders = tendersData.map((tender: Tender) => {
          const scoreObj = scoresData.find(
            (score) => score.tender_id === tender._id
          );

          const normalizedTender = {
            ...normalizeKeys(tender),
            metadata: normalizeKeys(tender.metadata),
            compatibilityScore: scoreObj?.compatibility_score ?? null,
            compatibilityAnalysis: scoreObj?.compatibility_analysis ?? null,
          };

          return {
            ...defaultTender,
            ...normalizedTender,
            metadata: {
              ...defaultTender.metadata,
              ...(normalizedTender.metadata || {}),
            },
          };
        });

        const { min, max } = getMinMaxScores(enrichedTenders);
        enrichedTenders.forEach((tender: Tender) => {
          if (tender.compatibilityScore !== null) {
            tender.compatibilityScore = normalizeCompatibilityScore(
              tender.compatibilityScore,
              min,
              max
            );
          }
        });

        setTenders(enrichedTenders);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <TenderContext.Provider value={{ tenders, loading, error }}>
      {children}
    </TenderContext.Provider>
  );
};

export const useTenderContext = () => {
  const context = useContext(TenderContext);
  if (!context) {
    throw new Error("useTenderContext must be used within a TenderProvider");
  }
  return context;
};
