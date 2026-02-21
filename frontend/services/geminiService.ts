
import { Service } from "../types";

export const generateHealthSummary = async (services: Service[]) => {
  console.info("AI Service call bypassed: Summary generated locally.");
  return "AI features are currently offline.";
};
