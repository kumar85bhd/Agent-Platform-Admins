# Operations & Configuration Guide

This guide provides instructions for maintaining and extending the Agentic Platform Admin dashboard.

## 1. Adding a New Application (Service)

To add a new service to the dashboard, you need to update the `config.json` file located in the root directory.

### Steps:
1. Open `config.json`.
2. Locate the `categories` array.
3. Find the appropriate category or create a new one.
4. Add a new service object to the `services` array of that category.

**Example:**
```json
{
  "id": "new-service-id",
  "name": "My New Service",
  "type": "database"
}
```

**Supported Types for Icons:**
The dashboard automatically assigns icons based on the `type` field. Recommended types include:
- `database`, `postgres`, `sql`
- `agent`, `ai`, `bot`
- `redis`, `cache`, `kv`
- `observability`, `monitor`, `log`

## 2. Updating or Changing Metrics

Currently, metrics and health statuses are simulated in the frontend for demonstration purposes.

### Changing Metric Labels and Initial Values
To change what metrics are displayed for all services, modify the initialization logic in `src/frontend/App.tsx` inside the first `useEffect` hook:

```typescript
// src/frontend/App.tsx
initialServices.push({
  // ...
  metrics: [
    { label: 'CPU', value: '12%', history: [...] },
    { label: 'Memory', value: '150MB', history: [...] }
  ]
});
```

### Customizing Metrics per Application Type
If you want different metrics for different types of apps (e.g., "Requests/sec" for a Gateway vs "Storage" for a Database), you can add conditional logic in the same `useEffect`:

```typescript
const metrics = s.type === 'gateway' 
  ? [{ label: 'RPS', value: '1.2k', history: [...] }]
  : [{ label: 'CPU', value: '10%', history: [...] }];
```

### Updating Health Status Logic
The health status (Healthy, Warning, Critical) is calculated dynamically in the second `useEffect` hook in `src/frontend/App.tsx`. 

To change the thresholds:
1. Locate the `Dynamic status logic` comment.
2. Update the numerical comparisons:

```typescript
// Example: Change Memory Critical threshold to 500MB
if (memMetric) {
  const val = memMetric.history[memMetric.history.length - 1];
  if (val > 500) newStatus = HealthStatus.CRITICAL; // Changed from 400
  else if (val > 350) newStatus = HealthStatus.WARNING; // Changed from 300
}
```

## 3. Freezing the Application
The application is currently in a stable state with:
- Sticky navigation and filters.
- Collapsible health summary with dynamic status colors.
- Relative timestamps for updates.
- Contextual icons based on service types.
