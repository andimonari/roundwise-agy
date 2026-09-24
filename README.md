# RoundWise — Independent UK Medical Specialty Interview Preparation Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node: >=22](https://img.shields.io/badge/Node-%3E%3D22-brightgreen.svg)](https://nodejs.org/)
[![React: 18](https://img.shields.io/badge/React-18-cyan.svg)](https://react.dev/)
[![TailwindCSS: v3/v4](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Fastify: v5](https://img.shields.io/badge/Fastify-v5-black.svg)](https://fastify.dev/)
[![Prisma: v6](https://img.shields.io/badge/Prisma-v6-2D3748.svg)](https://prisma.io/)

**RoundWise** is an independent, high-fidelity AI-powered simulation and interview preparation platform specifically engineered for doctors applying for UK medical specialty training programmes (including **Internal Medicine Training [IMT]**, **Core Surgical Training [CST]**, **General Practice [GPST]**, **ACCS Emergency Medicine / Anaesthetics**, **Paediatrics**, and **Clinical Radiology**).

---

> [!IMPORTANT]
> ### Statutory Disclaimer & Independent Status Notice
> **RoundWise** is an independent preparation service operated by **RoundWise Technologies Ltd**.
> This service is **NOT affiliated with, endorsed by, approved by, or operated by the National Health Service (NHS)**, NHS England, NHS Education England (Workforce, Training and Education), the General Medical Council (GMC), any Royal Medical College (including RCP, RCS, RCGP, RCoA, RCR, RCPath, RCPCH), or any official national recruitment office (such as Oriel, PSRO, ANRO, or GPNRO).
> Use of this platform does not guarantee interview shortlisting, appointment, or national ranking.

---

## 🌟 Key Architecture & Features

### 1. Dual Design System Architecture
RoundWise features an in-app design switcher and side-by-side comparison board supporting two distinct aesthetics:
- **Design A (Modern Healthcare Classic)**: Polished, clinical, human-centric aesthetic with deep healthcare teals (`#0f766e`), soft slates, and subtle drop shadows.
- **Design B (Industry Technical Blueprint)**: Technical, high-precision instrument aesthetic derived from handoff wireframes (`#f2f2f3` ground, `#5980a6` steel blue accent, square corners, hairline borders, and `+` corner registration marks).

### 2. 16 Complete View Modes & Candidate Journey
1. **Desktop Landing Page**: Value proposition, 3-step simulation cycle, multi-member panel architecture.
2. **Mobile Landing View**: Responsive drawer navigation, touch-optimized cards (WCAG 2.2 AA).
3. **Pricing & Access Passes**: Transparent pay-per-mock (£25 single station) vs unlimited pass (£40 full cycle).
4. **Checkout & Auth**: Payment flow with Caldicott and UK GDPR statutory consent agreements.
5. **Specialty Setup & Level Selector**: Selection of ST1/CT1/ST3 pathways across 6 major UK specialties.
6. **CV Upload Screen**: Drag-and-drop ingestion with PII and Caldicott redaction warnings.
7. **Interactive CV Fact Review**: 10-category extraction matrix (Qualifications, Audits & QIPs, Teaching, Leadership, Procedures, etc.) with explicit candidate confirmation gates.
8. **Audio & Device Check**: Web Audio API VU meter and speaker test tone playback.
9. **Virtual Waiting Room**: Candidate countdown, station briefing, panel member introductions.
10. **Live Voice Interview Room**: 12-state server-authoritative turn loop (`panel`, `candidate`, `processing`, `silence`, `repeat`, `warn`, `expired`, `network`, `mic`, `paused`, `completed`).
11. **Results & Performance Overview**: Overall station scores and GMC Good Medical Practice domain benchmarks.
12. **Detailed Question Review**: Line-by-line strengths, missed clinical points, and exact verbatim transcript citations.
13. **Candidate Dashboard**: Simulation history, specialty progress trajectory, and self-serve PII purge tools.
14. **Admin Question Bank CMS**: Versioned question creation, scoring anchor editor, follow-up probe branching.
15. **Design System Explorer**: Token viewer, color swatches, button states, and regulatory microcopy catalog.
16. **Side-by-Side Design Comparison Board**: Instant token and layout inspection.

### 3. Realtime Voice Turn Engine & Latency Budget (< 1200 ms)
- **Deepgram Streaming STT**: Sub-300ms endpointing and voice activity detection.
- **Claude Haiku Streaming LLM**: Rapid conversational panelist turns grounded strictly in verified CV facts.
- **ElevenLabs Streaming TTS**: Low-latency `SentenceChunker` streaming PCM audio before full sentence completion.
- **Immutable `session_events` Log**: Every state transition, transcript delta, and audio key is appended to an immutable event log for 100% reproducible offline re-scoring.
- **Offline Rubric Scorer**: Asynchronous post-interview evaluation powered by Claude Sonnet, producing objective marks with exact verbatim transcript citations.

---

## 🗄️ Database Architecture (8 Core PostgreSQL Tables)

Defined in [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma):
- **`users`**: Identity mirror with statutory consent flags (GDPR, Audio, Model, Caldicott).
- **`cv_documents`**: Upload storage keys, parse status, and retention expiries.
- **`cv_facts`**: 10-category claims matrix (`proposed`, `confirmed`, `removed`).
- **`question_banks`**: Versioned specialty questions and clinical probe triggers.
- **`sessions`**: Active interview state, timing configurations, and deadlines.
- **`session_events`**: Append-only immutable audit log for reproducible evaluation.
- **`scores`**: Objective domain scores with verbatim transcript evidence spans.
- **`entitlements`**: Access credits derived from Stripe webhooks.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 22
- npm or pnpm

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/andimonari/roundwise-agy.git
cd roundwise-agy

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Environment Configuration (Optional)
Copy the example environment file in `backend/`:
```bash
cp backend/.env.example backend/.env
```
*(The backend includes a high-fidelity in-memory simulator, allowing complete local development and testing even without cloud API keys).*

### 3. Run the Development Servers
```bash
# Start the frontend preview server (Port 5173)
npm run preview -- --port 5173 --host 0.0.0.0

# Start the Fastify backend & WebSocket turn engine (Port 3001)
cd backend && npm run dev
```

- **Frontend**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API**: [http://localhost:3001/v1/health](http://localhost:3001/v1/health)
- **WebSocket Engine**: `ws://localhost:3001/v1/session`

---

## ⚖️ License
Licensed under the [MIT License](LICENSE).
Operated independently by **RoundWise Technologies Ltd**.
