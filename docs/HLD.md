
# High-Level Design (HLD) - Agentic Platform Admin

## 1. Executive Summary
The Agentic Platform Admin is an internal health monitoring system designed to provide real-time visibility into infrastructure, AI agent layers, and database performance.

## 2. Architecture Overview
The system follows a decoupled Client-Server architecture:
- **Frontend**: A React-based SPA (Single Page Application) built with TypeScript and Tailwind CSS.
- **Backend**: A FastAPI (Python) server providing data aggregation and authentication services.
- **Configuration**: A dynamic `config.json` that drives the UI layout and service monitoring.

## 3. Tech Stack
- **Frontend**: React 19, Tailwind CSS, TypeScript.
- **Backend**: Python 3.9+, FastAPI, PyJWT.
- **Design**: Component-based architecture with Atomic Design principles.

## 4. Key Workflows
- **Authentication**: Users must authenticate via JWT (JSON Web Token) to access health data.
- **Monitoring**: The frontend polls the backend `/health` endpoint at configurable intervals.
- **Dynamic Scaling**: Adding new services only requires updates to the `config.json` and backend logic, with zero UI code changes.

## 5. Security
- JWT-based authorization for all protected API endpoints.
- Secure storage of tokens in `localStorage`.
- Environment-based configuration for keys and endpoints.
