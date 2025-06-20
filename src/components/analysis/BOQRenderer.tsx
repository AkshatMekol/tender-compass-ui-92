import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownRenderer from "./MarkdownRenderer";

type BOQItem = {
  "Serial Number": number;
  "Item Description": string;
  Quantity: number | null;
  Units: string;
  "Estimated Rate": number | null;
  "Total Amount (Rs.)": number | null;
};

type Props = {
  categories: Record<string, BOQItem[]>;
};

const generateBOQMarkdown = (categories: Record<string, BOQItem[]>): string => {
  let output = "";

  for (const [category, items] of Object.entries(categories)) {
    output += `### ${category}\n\n`;
    output += `| S. No. | Description | Quantity | Units | Rate (₹) | Amount (₹) |\n`;
    output += `|--------|-------------|----------|--------|----------|-------------|\n`;

    for (const item of items) {
      const description = item["Item Description"]
        .split("\n")
        .map((line, i) =>
          i === 0 ? `**${line.trim()}**` : `<br />${line.trim()}`
        )
        .join("");

      output += `| ${item["Serial Number"] ?? "-"} | ${description} | ${
        item.Quantity ?? "-"
      } | ${item.Units || "-"} | ${
        item["Estimated Rate"]?.toLocaleString("en-IN") ?? "-"
      } | ${
        item["Total Amount (Rs.)"]
          ? `₹${item["Total Amount (Rs.)"].toLocaleString("en-IN")}`
          : "-"
      } |\n`;
    }

    output += `\n`;
  }

  return output.trim();
};

const BOQRenderer: React.FC<Props> = ({ categories }) => {
  const keys = Object.keys(categories);

  if (keys.length === 0) return null;

  return (
    <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
      <CardContent>
        <Tabs defaultValue={keys[0]}>
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6 bg-gray-100 rounded-xl p-1">
            {keys.map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="rounded-lg text-xs text-center"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>

          {keys.map((key) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <ScrollArea className="h-96 p-6">
                  <MarkdownRenderer
                    content={generateBOQMarkdown({ [key]: categories[key] })}
                  />
                </ScrollArea>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BOQRenderer;
