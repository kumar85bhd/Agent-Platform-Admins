
import { HealthStatus, Service } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'redis-01',
    name: 'Redis Commander',
    category: 'Infrastructure',
    status: HealthStatus.WARNING,
    lastUpdated: new Date().toISOString(),
    type: 'redis',
    metrics: [
      { label: 'Memory', value: '78%', history: [65, 70, 75, 72, 78] },
      { label: 'Clients', value: 124, history: [110, 115, 120, 118, 124] },
      { label: 'Hit Rate', value: '92%', history: [90, 91, 89, 93, 92] }
    ]
  },
  {
    id: 'portainer-01',
    name: 'Portainer',
    category: 'Infrastructure',
    status: HealthStatus.HEALTHY,
    lastUpdated: new Date().toISOString(),
    type: 'orchestrator',
    metrics: [
      { label: 'Containers', value: 42, history: [38, 40, 42, 42, 42] },
      { label: 'Unhealthy', value: 2, history: [0, 1, 2, 2, 2] },
      { label: 'CPU', value: '68%', history: [45, 50, 60, 65, 68] }
    ]
  }
];
