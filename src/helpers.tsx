// export function toCamelCase(str: string): string {
//   // Handle empty or invalid strings
//   if (!str || typeof str !== "string") {
//     return str;
//   }

//   return (
//     str
//       // First, trim whitespace and normalize the string
//       .trim()
//       // Replace spaces, underscores, hyphens, and dots followed by a character
//       .replace(/[\s_\-\.]+(\w)/g, (_, letter) => letter.toUpperCase())
//       // Handle the first character - make it lowercase
//       .replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase())
//       // Remove any remaining non-alphanumeric characters
//       .replace(/[^a-zA-Z0-9]/g, "")
//   );
// }

export function toCamelCase(str: string): string {
  // Handle empty or invalid strings
  if (!str || typeof str !== "string") {
    return str;
  }

  // Check if string starts with underscore
  const startsWithUnderscore = str.startsWith("_");

  // Remove leading underscore for processing if it exists
  const processStr = startsWithUnderscore ? str.slice(1) : str;

  const camelCased = processStr
    // First, trim whitespace and normalize the string
    .trim()
    // Replace spaces, underscores, hyphens, and dots followed by a character
    .replace(/[\s_\-\.]+(\w)/g, (_, letter) => letter.toUpperCase())
    // Handle the first character - make it lowercase
    .replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase())
    // Remove any remaining non-alphanumeric characters
    .replace(/[^a-zA-Z0-9]/g, "");

  // Add back the leading underscore if it was there originally
  return startsWithUnderscore ? "_" + camelCased : camelCased;
}

export function normalizeAmount(input: string) {
  const match = input.match(/[\d,.]+(?:\.\d+)?\s*Cr/i);
  return match ? match[0].replace(",", "").trim() : "";
}

export const isObjEmpty = (val) =>
  val === undefined ||
  val === null ||
  (typeof val === "string" && val.trim() === "") ||
  (Array.isArray(val) && val.length === 0) ||
  (typeof val === "object" &&
    !Array.isArray(val) &&
    Object.keys(val).length === 0);

export function calcDaysLeft(submissionDate: string | null) {
  let daysLeft = null;

  if (submissionDate) {
    const [day, month, year] = submissionDate.split("-");
    const date = new Date(+year, +month - 1, +day);
    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
  }
  return daysLeft;
}

const FILTERS_KEY = "tenderFilters";

// helpers.ts

export function getFiltersFromStorage(namespace: string) {
  try {
    const data = localStorage.getItem(`filters-${namespace}`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Failed to parse filters from localStorage:", e);
    return null;
  }
}

export function saveFiltersToStorage(namespace: string, filters: any) {
  try {
    localStorage.setItem(`filters-${namespace}`, JSON.stringify(filters));
  } catch (e) {
    console.error("Failed to save filters to localStorage:", e);
  }
}
