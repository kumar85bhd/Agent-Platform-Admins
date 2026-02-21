
import { HealthStatus, Service } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'redis-01',
    name: 'Redis Commander',
    category: 'Infrastructure',
    status: HealthStatus.WARNING,
    lastUpdated: new Date().toISOString(),
    metrics: [
      // Fix: added missing 'history' property required by Metric type (line 12)
      { label: 'Memory', value: '78%', history: [65, 70, 75, 72, 78] },
      // Fix: added missing 'history' property required by Metric type (line 13)
      { label: 'Clients', value: 124, history: [110, 115, 120, 118, 124] },
      // Fix: added missing 'history' property required by Metric type (line 14)
      { label: 'Hit Rate', value: '92%', history: [90, 91, 89, 93, 92] }
    ]
  },
  {
    id: 'portainer-01',
    name: 'Portainer',
    category: 'Infrastructure',
    status: HealthStatus.HEALTHY,
    lastUpdated: new Date().toISOString(),
    metrics: [
      // Fix: added missing 'history' property required by Metric type (line 24)
      { label: 'Containers', value: 42, history: [38, 40, 42, 42, 42] },
      // Fix: added missing 'history' property required by Metric type (line 25)
      { label: 'Unhealthy', value: 2, history: [0, 1, 2, 2, 2] },
      // Fix: added missing 'history' property required by Metric type (line 26)
      { label: 'CPU', value: '68%', history: [45, 50, 60, 65, 68] }
    ]
  },
  {
    id: 'litellm-01',
    name: 'LiteLLM Proxy',
    category: 'AI & Agents',
    status: HealthStatus.ACTIVE,
    lastUpdated: new Date().toISOString(),
    metrics: [
      // Fix: added missing 'history' property required by Metric type (line 36)
      { label: 'Tokens', value: '3.4M', history: [100, 200, 300, 250, 400] },
      // Fix: added missing 'history' property required by Metric type (line 37)
      { label: 'Cost', value: '$214', history: [150, 170, 190, 200, 214] },
      // Fix: added missing 'history' property required by Metric type (line 38)
      { label: 'Fallback', value: '0.3%', history: [0.1, 0.2, 0.1, 0.4, 0.3] }
    ]
  },
  {
    id: 'optimus-01',
    name: 'OptimusPrime FB',
    category: 'AI & Agents',
    status: HealthStatus.ACTIVE,
    lastUpdated: new Date().toISOString(),
    metrics: [
      // Fix: added missing 'history' property required by Metric type (line 48)
      { label: 'Convos', value: 3420, history: [3000, 3100, 3200, 3300, 3420] },
      // Fix: added missing 'history' property required by Metric type (line 49)
      { label: 'Latency', value: '1.8s', history: [1.5, 1.6, 1.9, 1.7, 1.8] },
      // Fix: added missing 'history' property required by Metric type (line 50)
      { label: 'Success', value: '97.9%', history: [98, 97.5, 98.2, 97.8, 97.9] }
    ]
  },
  {
    id: 'pg-01',
    name: 'PostgreSQL Main',
    category: 'Databases',
    status: HealthStatus.HEALTHY,
    lastUpdated: new Date().toISOString(),
    metrics: [
      // Fix: added missing 'history' property required by Metric type (line 60)
      { label: 'Connections', value: 45, history: [40, 42, 45, 44, 45] },
      // Fix: added missing 'history' property required by Metric type (line 61)
      { label: 'TPS', value: 1200, history: [1000, 1100, 1150, 1180, 1200] },
      // Fix: added missing 'history' property required by Metric type (line 62)
      { label: 'Storage', value: '42%', history: [38, 39, 40, 41, 42] }
    ]
  },
  {
    id: 'grafana-01',
    name: 'Grafana OSS',
    category: 'Monitoring',
    status: HealthStatus.HEALTHY,
    lastUpdated: new Date().toISOString(),
    metrics: [
      // Fix: added missing 'history' property required by Metric type (line 72)
      { label: 'Dashboards', value: 18, history: [15, 16, 18, 18, 18] },
      // Fix: added missing 'history' property required by Metric type (line 73)
      { label: 'Alerts', value: 3, history: [2, 4, 3, 3, 3] }
    ]
  }
];
