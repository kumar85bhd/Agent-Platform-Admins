
export enum HealthStatus {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  CRITICAL = 'critical',
  MAINTENANCE = 'maintenance',
  ACTIVE = 'active'
}

export interface Metric {
  label: string;
  value: string | number;
  history: number[]; // For sparklines
}

export interface Service {
  id: string;
  name: string;
  category: string;
  status: HealthStatus;
  metrics: Metric[];
  lastUpdated: string;
  description?: string;
  version?: string;
  owner?: string;
}

export interface AppConfig {
  platformName: string;
  environment: string;
  refreshIntervals: number[];
  categories: {
    id: string;
    name: string;
    services: { id: string; name: string; type: string }[];
  }[];
}
