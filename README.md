# ProTick Academic CBT Portal (React + TypeScript + Tailwind CSS)

A high-fidelity Computer-Based Testing (CBT) portal generated from Google Stitch Project `1616506073780318223` (**ProTick CBT Student Portal**).

## Features

- **Pixel-Perfect Stitch UI Alignment**: Built using the exact design tokens, typography (`Inter` & `JetBrains Mono`), color palette (Dark Academic Navy `#0F2744`, Slate `#F8FAFC`, Emerald `#16A34A`, Purple `#7C3AED`, Crimson `#DC2626`), and layout geometry.
- **5 Complete Interactive Screen Flows**:
  1. **View 1: Login Screen**
     - Institutional branding and terminal status.
     - Seat number (USN) validation with auto-formatting and visual feedback.
     - DOB picker and offline integrity handshake indicator.
     - "Call Invigilator" modal dialog.
  2. **View 2: Instruction & Waiting Page**
     - Student credentials and passport portrait preview.
     - Live monospace countdown clock with an instant release toggle (`⚡ Release Paper Now`).
     - Standard examination rules, marking scheme (+2.0 / -0.5), and defocus anti-cheat protocols.
     - Proctor verification badge (`Prof. K. Venkatesh - INV-8820`).
  3. **View 3: Main Examination Interface**
     - Persistent HUD with active timer (< 5m warning pulse) and LAN sync indicators.
     - Tab-switch & window defocus detection banner (Incident logger: 1 of 3 allowed).
     - Full question workspace featuring Question 14 (Floyd-Warshall DP formulation) with interactive dynamic formula block and accessible radio choices.
     - Interactive 30-question matrix palette with real-time status color coding (Answered, Flagged for Review, Unanswered).
     - Responsive navigation (Previous, Mark Review, Save & Next, Emergency Final Submit).
  4. **View 4: Review & Submit Dashboard**
     - Reconciliation metric cards displaying actual counts and percentages.
     - Palette preview with question review flags (`⚑`).
     - Confirmation modal overlay with irreversible action notice and breakdown recap.
  5. **View 5: Post-Submission Screen**
     - Terminal hard-locked security badge.
     - Glowing animated success checkmark emblem with celebratory confetti.
     - Cryptographic receipt card with session audit hash (`HASH-98F2-A109-CS602-SECURE`), candidate credentials, synced counts, and timestamp.
     - Proctor directive notice and browser navigation protection.
- **Interactive Switcher Bar**: A persistent bottom dock allows the evaluator to jump directly between any of the 5 Stitch screens at will.

---

## Getting Started

### Development Server
To start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

