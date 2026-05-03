# PROJECT NEXUS: Design Handover Protocol (External Agent)

## 🎯 Objective
This document serves as the tactical brief for the design and implementation of a **New View Mode** for the Nexus OS Lean Six Sigma Platform. The goal is to extend the current "Executive Terminal" aesthetic into a new specialized viewing layer while maintaining 100% design system fidelity.

---

## 🏗️ 1. Project Context & Aesthetic DNA
Nexus OS is a **High-Fidelity Executive Terminal** for Lean Six Sigma professionals. It rejects standard "Enterprise SaaS" design in favor of a **Cyber-Tactical Glassmorphism** approach.

### **Core Aesthetic Pillars:**
*   **Surface**: Dark backgrounds with translucent glassmorphic cards (`bg-card/30`, `backdrop-blur`).
*   **Methodology DNA**: The UI must react to the active framework:
    *   **DMAIC**: Cyan Neon (`#22d3ee`)
    *   **DMADV**: Purple Neon (`#a855f7`)
    *   **KAIZEN**: Orange Neon (`#f97316`)
    *   **FOCUS-PDCA**: Emerald Neon (`#10b981`)
*   **The Glow**: Interactive elements must feature a methodology-specific neon glow (`shadow-nexus-glow`) and animated "breathing" borders for active states.
*   **Typography**: High-contrast, wide tracking headers with black-weighted subheaders.

---

## 🛠️ 2. Technical Stack & Infrastructure
*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS + Custom CSS Variables
*   **Animation**: Framer Motion + CSS Keyframes (`glow-pulse`)
*   **Iconography**: Lucide React (Context-aware mapping)
*   **Data Layer**: Prisma ORM with Supabase (PostgreSQL)

---

## 🧩 3. Key Components for Reference
When designing the new view mode, utilize or extend these existing patterns:
*   **`src/app/academy/page.tsx`**: Refer to the curriculum grid and glowing container logic.
*   **`src/components/patterns/RoadmapViewer.tsx`**: Refer to the 32:9 panoramic asset implementation.
*   **`src/components/layout/PageHeader.tsx`**: The unified header system for all missions.
*   **`src/components/primitives/`**: Atomic components like `MetricCard`, `Badge`, and `Button`.

---

## 📝 4. Tactical Requirements for the New View Mode
The external agent is tasked with creating a new layout that:
1.  **Integrates with the Nexus Shell**: Must fit within the existing `(nexus)` layout (sidebar + header).
2.  **Respects Methodology Switching**: The new view must dynamically update its accent colors and glows based on the `activeFramework` state.
3.  **Maintains "Operational" Tone**: Use tactical language (e.g., "Establish Uplink," "Protocol Active," "Data Stream Sync").
4.  **Responsive Integrity**: Must be fully optimized for both desktop executive monitors and mobile field access.

---

## 📂 5. Asset Manifest
*   **Roadmaps**: `public/images/roadmaps/` (32:9 PNGs)
*   **Guide Images**: `public/images/guide/` (Current UI references)
*   **Global CSS**: `src/app/globals.css` (Contains the `shadow-nexus-glow` and glassmorphic utility classes)
*   **Curriculum Config**: `src/config/curriculum.ts` (Source of truth for phases and lessons)

---

## 📥 6. Deliverables Expected
*   **Functional Prototype**: A new route (e.g., `src/app/(nexus)/new-view/page.tsx`).
*   **Design System Update**: Any new components must be added to `src/components/primitives/`.
*   **Visual Documentation**: Updated guide screenshots if the new view alters the primary user flow.

---

**End of Protocol.**
*Authorized by: Master Admin*
*Nexus OS V4.0.1 Alpha*
