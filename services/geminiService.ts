
import { Service } from "../types";

/**
 * AI summarization is currently disabled per configuration.
 * Local logic in HealthSummaryCard.tsx handles basic status reporting.
 */
export const generateHealthSummary = async (services: Service[]) => {
  console.info("AI Service call bypassed: Summary generated locally.");
  return "AI features are currently offline.";
};
