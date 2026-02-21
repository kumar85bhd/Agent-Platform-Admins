
# Agentic Platform Admin

A high-performance, real-time observability dashboard for managing agentic infrastructure and distributed services.

## Features

- **Dynamic Health Summary**: A collapsible, color-coded overview that automatically reflects the aggregate state of the platform (Healthy, Warning, or Critical).
- **Real-time Monitoring**: Simulated live metrics for CPU and Memory with automatic status transitions based on operational thresholds.
- **Sticky Controls**: Persistent filter and search bars ensure operators can navigate large service grids without losing context.
- **Contextual UI**: Automatic icon assignment based on service types (Databases, AI Agents, Caches, etc.) and relative "Time Since Update" indicators.
- **Responsive Design**: Optimized for both desktop mission control views and mobile quick-checks.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS.
- **Backend**: Express (Node.js) with Vite integration.
- **Icons**: Lucide React.
- **Animations**: Framer Motion.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Documentation

For detailed instructions on how to add new services or modify monitoring thresholds, please refer to the [Operations & Configuration Guide](./GUIDE.md).
