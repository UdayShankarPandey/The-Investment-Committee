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

## Technology

The repository is a lightweight, performant frontend built with:
- React
- TypeScript
- Vite
- Vanilla CSS

*Explicit Notice: This repository contains the frontend product experience only. It does not contain a live LLM backend, LangGraph, databases, SSE streaming, or active market-data integrations from the conceptual product.*

## Project Structure

```text
src/
├── components/
│   ├── layout/       
│   ├── sections/     
│   └── ui/           
├── styles/
│   └── globals.css   
├── App.tsx           
└── main.tsx          
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

To run the project locally, use the following scripts defined in `package.json`:

- `npm install` — Installs project dependencies.
- `npm run dev` — Starts the Vite development server.
- `npm run typecheck` — Runs TypeScript type-checking (`tsc`) without emitting files.
- `npm run lint` — Runs ESLint to verify code quality.
- `npm run build` — Runs the typechecker and creates a production build.

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
- `npm run lint` (PASS)
- `npm run typecheck` (PASS)
- `npm run build` (PASS)
- Manual responsive and cross-viewport verification across mobile and desktop.

## Submission

*(Repository currently pending final deployment configuration).*

---
*Illustrative research workflow. Not investment advice.*
