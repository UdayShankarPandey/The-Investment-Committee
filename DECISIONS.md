# Decisions

## 1. Why this approach

The premium homepage was built as a custom React + TypeScript implementation relying on a vanilla CSS design system rather than off-the-shelf UI frameworks or component libraries. This approach provides full control over the visual language while keeping the codebase lean and tailored to the product narrative.

The aesthetic direction—a dark editorial theme with a restrained charcoal/ivory/amber palette—was deliberately chosen to avoid generic "AI SaaS" patterns. It conveys authority, analytical depth, and seriousness, aligning with the concept of a rigorous investment committee. Instead of relying on fabricated marketing claims, fake testimonials, or stock imagery, the page uses illustrative product UI such as the Committee Pipeline and research workspace, along with meaningful interactions such as the Devil's Advocate confrontation and a subtle header Easter egg, to demonstrate the product concept.

## 2. Time-limit trade-off

Given the time constraints, the core trade-off was to demonstrate the product concept through carefully designed illustrative UI rather than attempting to implement a live backend, real market-data ingestion, authentication, or live LLM-driven state management.

This was an intentional scope decision: the assignment evaluates the quality of the premium homepage and product storytelling rather than a production investment platform. With additional product-development time, I would extend the illustrative workflow into a production system with authenticated research sessions, live market-data integrations, backend orchestration for committee interactions, and automated unit/integration testing.

## 3. AI usage and verification

AI coding tools were utilized during implementation to assist with project scaffolding, component development, and CSS design-system implementation.

AI-assisted output was reviewed through repeated codebase audits and manual QA. Verification included:

- Running ESLint and TypeScript typechecks to ensure code quality.
- Executing production builds to verify successful compilation and production asset generation.
- Testing responsive behavior across 390px mobile and 1440px desktop viewports.
- Verifying accessibility features, including keyboard navigation, visible focus states, and `prefers-reduced-motion` compliance.
- Confirming that product UI remains clearly illustrative and contains no fabricated statistics, testimonials, performance claims, or misleading data.
