# The Investment Committee

A structured AI research workflow where opposing perspectives challenge a thesis before a final verdict.

## Overview

This repository contains the premium frontend homepage implementation for the Acdyon Technologies Frontend Challenge (Part 2 — The Premium Home Page). It visually demonstrates "The Investment Committee" product concept: an AI-assisted investment research environment that prioritizes structured debate and scrutiny over one-shot answers.

## Product Concept

The product is built around a rigorous, multi-stage conceptual analytical pipeline:

Research → Bull / Bear → Debate → Risk Officer → CIO Synthesis → Final Verdict

*Note: This is a product concept demonstrated exclusively through the homepage UI. There is no live investment-analysis backend, LLM integration, or market data pipeline in this repository.*

## Homepage Experience

The homepage provides a comprehensive narrative of the product. The implemented sections include:

- Hero
- Committee Introduction
- Committee Pipeline
- Product Showcase
- Devil's Advocate
- Synthesis
- CTA
- Footer

The homepage also contains a subtle, discoverable Easter egg for those who pay close attention.

## Key Interaction

The **Devil's Advocate** section features the primary interactive demonstration. When a user interacts with the challenge button:
- An initial "Bull" thesis is presented.
- The challenge interaction visually strikes through and dims the thesis.
- A "Devil's Advocate" counterargument is revealed.

This interaction demonstrates the product's central idea: introducing friction and opposing scrutiny to stress-test an investment thesis.

## Easter Egg

The homepage contains a subtle, discoverable Easter egg. Its exact trigger and implementation are intentionally undocumented to preserve the discovery aspect.

## Design Direction

The project relies on a bespoke, premium editorial aesthetic:
- A dark editorial aesthetic with a restrained charcoal, ivory, and amber palette.
- High-contrast typography pairing *Iowan Old Style* (serif display) with *Inter* (sans-serif interface).
- A restrained, analytical visual language.
- A deliberate avoidance of generic glowing "AI SaaS" visual patterns.

## Technology & Implementation State

### Currently Implemented (Sprint 3 — Delivery Automation)
- **CI/CD Delivery Pipeline**: GitHub Actions workflow (`.github/workflows/ci.yml`) enforcing automated quality gates, container build validation, and Amazon ECR publishing.
- **Frontend Quality Gates**: Node.js 22 environment executing `npm ci`, ESLint (`npm run lint`), TypeScript validation (`npm run typecheck`), and production build (`npm run build`).
- **Backend Quality Gates**: Node.js 22 environment executing `npm ci`, Vitest automated API integration suite (`npm test`), ESLint (`npm run lint`), TypeScript validation (`npm run typecheck`), and JavaScript compilation (`npm run build`).
- **Container Build & Tagging**: Production multi-stage Docker build tagged with the exact immutable commit SHA (`${{ github.sha }}`) for deterministic provenance and traceability.
- **Amazon ECR Publishing**: Automated publication to Amazon ECR on trusted pushes to `main` with AWS OIDC federation (`id-token: write`).
- **PR Security Isolation**: Pull requests trigger full frontend/backend quality gates and local Docker validation builds while completely isolating cloud credentials and preventing untrusted artifact publication.
- **Containerization (Sprint 2 Baseline)**: Multi-stage Dockerfiles for unprivileged Nginx frontend (port 8080) and Node.js backend (port 3000), orchestrated via Docker Compose with health-checked dependencies.

### Planned Architecture (Subsequent Sprints)
- **Sprint 4**: AWS Infrastructure provisioning via Terraform.
- **Sprint 5**: Kubernetes & Amazon EKS orchestration.
- **Sprint 6**: Prometheus server scraping & Grafana monitoring dashboards.
- **Sprint 7**: Reliability, failure drills, and security hardening.

*Notice: This repository does NOT yet contain Terraform configurations, Kubernetes manifests, Amazon EKS deployment controllers, or Prometheus scraping servers. Those belong to future planned sprints.*

## Project Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── middleware/       # 404 & centralized error handlers
│   │   ├── routes/           # /health, /api/status, /metrics
│   │   ├── app.ts            # Express application composition
│   │   ├── metrics.ts        # Prometheus metrics registry & instrumentation
│   │   └── server.ts         # Server entrypoint with graceful shutdown
│   ├── tests/                # Automated API integration tests (Vitest + Supertest)
│   ├── .dockerignore         # Docker context exclusions for backend
│   ├── Dockerfile            # Multi-stage Dockerfile for Node.js backend
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── src/
│   ├── components/
│   │   ├── layout/       
│   │   ├── sections/     
│   │   └── ui/           
│   ├── styles/
│   │   └── globals.css   
│   ├── App.tsx           
│   └── main.tsx          
├── .dockerignore             # Docker context exclusions for frontend
├── .env.example              # Non-secret environment variable template
├── Dockerfile                # Multi-stage Dockerfile for React/Vite/Nginx frontend
├── docker-compose.yml        # Docker Compose service orchestration
├── nginx.conf                # Nginx SPA fallback and API reverse proxy config
├── eslint.config.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Accessibility & Responsive Design

The implementation adheres to rigorous accessibility and responsive standards:
- Responsive behavior verified at 390px (mobile) and 1440px (desktop) viewports.
- Zero horizontal overflow.
- Semantic HTML structures (`main`, `section`, `nav`, etc.).
- Explicit ARIA attributes used where semantic HTML is insufficient.
- Clear `focus-visible` states for keyboard navigation.
- Native support for `prefers-reduced-motion: reduce`.

## Development

### Frontend (Root)

Run the frontend development server and verification gates:

- `npm install` — Installs root frontend dependencies.
- `npm run dev` — Starts the Vite development server (default: `http://localhost:5173`).
- `npm run typecheck` — Runs TypeScript type-checking (`tsc`) for frontend without emitting files.
- `npm run lint` — Runs ESLint to verify code quality.
- `npm run build` — Runs the typechecker and generates a production bundle.

### Backend Service Layer (`backend/`)

Run the Node.js + Express API service layer, tests, and build:

- `cd backend && npm install` — Installs backend dependencies.
- `npm run dev` — Runs the Express API with `tsx watch` (hot-reloading, default: `http://localhost:3000`).
- `npm test` — Executes automated API integration tests via Vitest.
- `npm run typecheck` — Runs TypeScript type-checking for backend services.
- `npm run lint` — Runs ESLint across backend source and test files.
- `npm run build` — Compiles TypeScript into production JavaScript in `backend/dist`.
- `npm start` — Runs the compiled production server (`node dist/server.js`).

### Backend API Endpoints

| Endpoint | Method | Response Format | Purpose |
|---|---|---|---|
| `/health` | `GET` | `application/json` | Liveness & readiness probe for container orchestration (`{"status":"ok"}`) |
| `/api/status` | `GET` | `application/json` | Service runtime metadata and version information |
| `/metrics` | `GET` | `text/plain` | Prometheus exposition format metrics (process & HTTP duration/counts) |

## Docker & Containerization

The project provides production-grade multi-stage Dockerfiles and Docker Compose orchestration for local development and container verification.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine (v24.0+)
- Docker Compose (v2.20+)

### Image Architecture

- **Frontend Image** (`Dockerfile`):
  - **Build Stage**: `node:22-alpine` runs `npm ci` and `npm run build` to generate compiled static assets.
  - **Runtime Stage**: `nginx:1.27-alpine` configured for unprivileged execution (`USER nginx`), serves static assets, enforces SPA routing fallback, and reverse-proxies `/api/`, `/health`, and `/metrics` requests to the backend container over Docker's internal network.
  - **Exposed Port**: `8080` (unprivileged container port, mapped to host port `80`)
- **Backend Image** (`backend/Dockerfile`):
  - **Build Stage**: `node:22-alpine` runs `npm ci` and compiles TypeScript to `backend/dist`.
  - **Runtime Stage**: `node:22-alpine` with `NODE_ENV=production`, installs production-only dependencies (`npm ci --omit=dev`), runs under unprivileged user `node` (`USER node`), and executes `node dist/server.js`.
  - **Exposed Port**: `3000`

### Building Images Locally

```bash
# Build frontend image independently
docker build -t investment-committee-frontend:latest .

# Build backend image independently
docker build -t investment-committee-backend:latest ./backend
```

### Running with Docker Compose

To start both services orchestrated on the internal bridge network (`app-network`):

```bash
# Build and start all services in detached mode
docker compose up -d --build

# Check status and health of containers
docker compose ps

# View unified or service logs
docker compose logs -f
docker compose logs backend
docker compose logs frontend

# Stop and remove containers and network
docker compose down
```

### Local Access & Port Mappings

| Service | Container Port | Host Port | URL | Health Check |
|---|---|---|---|---|
| **Frontend** | `8080` | `80` | `http://localhost/` | `wget http://127.0.0.1:8080/` |
| **Backend** | `3000` | `3000` | `http://localhost:3000/` | `node fetch('http://127.0.0.1:3000/health')` |

### Service Communication Architecture

```text
Host Browser
  │
  ├──> http://localhost:80 (Frontend UI & Nginx Reverse Proxy)
  │      │
  │      └──(Docker Network: app-network)──> http://backend:3000/api/*
  │                                      ──> http://backend:3000/health
  │                                      ──> http://backend:3000/metrics
  │
  └──> http://localhost:3000 (Direct Host Access for API & Metrics)
```

1. **Host-to-Container**: Both frontend (`http://localhost:80`) and backend (`http://localhost:3000`) publish ports to the host machine.
2. **Container-to-Container**: Frontend reverse-proxies `/api/`, `/health`, and `/metrics` to `http://backend:3000` using Docker's internal DNS resolution on `app-network`.
3. **CORS Configuration**: Backend `ALLOWED_ORIGINS` permits requests originating from browser clients at `http://localhost`, `http://localhost:80`, and `http://localhost:5173`.
4. **Health Dependencies**: Docker Compose starts the backend container first and utilizes `condition: service_healthy` before marking frontend dependencies satisfied.

## Continuous Integration & Delivery (CI/CD — Sprint 3)

The project incorporates an automated GitHub Actions delivery pipeline (`.github/workflows/ci.yml`) enforcing automated quality gates, container builds, and Amazon ECR publishing.

### Pipeline Architecture

```text
GitHub Push / Pull Request
         │
         ├──> Job: Frontend Quality Gates (npm ci, lint, typecheck, build)
         ├──> Job: Backend Quality Gates (npm ci, test, lint, typecheck, build)
         │
         ├──[IF pull_request]──> Job: Docker Build Validation (isolated, zero cloud credentials)
         │
         └──[IF push to main]──> Job: Build & Publish to Amazon ECR
                                   ├── AWS OIDC Authentication (id-token: write)
                                   ├── Amazon ECR Login
                                   ├── Production Docker Image Build
                                   ├── Tag with Exact Git SHA (${{ github.sha }})
                                   └── Push Immutable Image to ECR
```

### Key Workflow Characteristics

- **Triggers**: Automated on pushes to `main` and pull requests targeting `main`.
- **Quality Gates**: Both frontend (`npm ci`, `lint`, `typecheck`, `build`) and backend (`npm ci`, `test`, `lint`, `typecheck`, `build`) must pass before downstream container build or release jobs execute.
- **Traceability & Immutability**: Production images are tagged with the exact 40-character Git commit SHA (`${{ github.sha }}`). The immutable image tag corresponds directly to the repository commit.
- **Security & Least Privilege**:
  - Top-level workflow permissions are strictly `contents: read`.
  - Cloud token issuance (`id-token: write`) is restricted to the ECR publishing job on trusted branch pushes.
  - Pull requests run in an unprivileged context without access to AWS credentials or publishing privileges.
- **ECR Destination**: Canonical release artifacts are published to `<aws-account>.dkr.ecr.<aws-region>.amazonaws.com/<ecr-repository>:<git-commit-sha>`.
- **Planned Scope**: Deployment to Kubernetes / Amazon EKS and Terraform infrastructure provisioning are planned for subsequent sprints.

## Honesty & Disclosure

The homepage is designed to be highly transparent:
- All product interfaces shown are illustrative.
- The homepage does not claim to provide live investment advice.
- There are no fabricated testimonials, fake user counts, fake client logos, or misleading performance claims.
- Relevant disclosures (e.g., "Illustrative interface", "Not investment advice") are visible in the UI.

## Challenge Context

This project was built for the Acdyon Technologies Frontend Challenge, Part 2 — The Premium Home Page. 

Please refer to `DECISIONS.md` for the technical decisions, engineering trade-offs, and notes regarding AI usage and verification.

## Verification

The codebase has been verified against the following checks:
- Frontend: `npm run lint` (PASS)
- Frontend: `npm run typecheck` (PASS)
- Frontend: `npm run build` (PASS)
- Backend: `npm test` (PASS — 4 test suites, 5 tests passing)
- Backend: `npm run typecheck` (PASS)
- Backend: `npm run lint` (PASS)
- Backend: `npm run build` (PASS)
- Manual responsive, cross-viewport, and runtime HTTP verification across frontend and backend.

## Submission

*(Repository currently pending final deployment configuration).*

---
*Illustrative research workflow. Not investment advice.*
