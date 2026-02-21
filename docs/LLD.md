
# Low-Level Design (LLD) - Agentic Platform Admin

## 1. Component Breakdown
### Frontend Layer
- **App.tsx**: Central state manager. Handles Auth guard, Config loading, and Global Polling.
- **Login.tsx**: Authentication interface with error handling and loading states.
- **HealthSummaryCard.tsx**: Computes system-wide health status and provides an AI-style text summary.
- **ServiceCard.tsx**: Individual service visualization with health indicators and sparkline trends.
- **ServiceDrawer.tsx**: Detailed metadata and historical metric view for specific nodes.

### Backend Layer
- **main.py**: FastAPI entry point. Defines endpoints for `/token` and `/health`.
- **auth.py**: Encapsulates JWT logic (HS256 algorithm).

## 2. Data Models
### Service Object
```typescript
interface Service {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  metrics: Array<{ label: string, value: any, history: number[] }>;
}
```

## 3. API Contract
### POST /token
- **Request**: `form-data` { username, password }
- **Response**: `{ access_token, token_type }`

### GET /api/v1/health
- **Auth**: Bearer Token required.
- **Response**: Map of Service IDs to Service State.

## 4. Error Handling
- **401 Unauthorized**: Redirects user back to Login and clears local tokens.
- **Network Failure**: Frontend falls back to a simulation mode to maintain UI stability.
