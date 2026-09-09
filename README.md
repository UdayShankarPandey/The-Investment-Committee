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

### Currently Implemented (Sprint 1 — Application Service Layer)
- **Frontend**: React 19, TypeScript, Vite, Vanilla CSS design system.
- **Backend Service Layer**: Node.js, Express, TypeScript (`backend/`).
- **Observability Foundation**: Prometheus-compatible metrics endpoint (`GET /metrics`) via `prom-client`.
- **Health & Probes**: Standardized liveness/readiness probe (`GET /health`) and status endpoint (`GET /api/status`).
- **Testing**: Vitest + Supertest automated API test suite.

### Planned Architecture (Subsequent Sprints)
- **Sprint 2**: Docker containerization & Docker Compose.
- **Sprint 3**: GitHub Actions CI/CD pipelines & Amazon ECR publishing.
- **Sprint 4**: AWS Infrastructure provisioning via Terraform.
- **Sprint 5**: Kubernetes & Amazon EKS orchestration.
- **Sprint 6**: Prometheus server scraping & Grafana monitoring dashboards.
- **Sprint 7**: Reliability, failure drills, and security hardening.

*Notice: This repository does NOT yet contain Dockerfiles, CI/CD pipelines, live cloud infrastructure, Prometheus scraping servers, or live financial LLM engines. Those belong to future planned sprints.*

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
