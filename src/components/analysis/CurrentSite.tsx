import { Card, CardContent } from "../ui/card";
import { Tender } from "@/context/tenderContext";

const CurrentSite = ({ tenderData }: { tenderData: Tender }) => {
  if (!tenderData?.metadata?.currentSite) return null;
  return (
    <Card className="shadow-lg border-0 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3">
          <p className="text-gray-800 font-medium text-sm">
            <span className="font-semibold text-teal-700">Current Site: </span>
            {tenderData?.metadata?.currentSite}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentSite;
