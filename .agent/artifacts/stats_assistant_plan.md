# Implementation Plan: LSS Master Black Belt Statistical Assistant

This document outlines the architecture and execution strategy for building the **Advanced Lean Six Sigma Master Black Belt Statistical Assistant**.

## 1. Technology Stack
- **Framework**: React 18 (Vite-powered)
- **Language**: TypeScript (for robust data models and validation)
- **Styling**: Tailwind CSS (modern, professional UI with glassmorphism)
- **Charting**: Chart.js + React-Chartjs-2 (high performance for statistical plots)
- **Icons**: Lucide-React
- **State Management**: React Context API (lightweight persistence across modules)
- **PDF Export**: Browser-based print formatting + `html2canvas`/`jsPDF` (if needed for direct download)

## 2. Project Structure
```text
statistical-assistant/
├── src/
│   ├── calculations/      # Pure math functions for stats, p-values, sigma
│   ├── components/        # Reusable UI: StatCard, DataInput, ChartContainer
│   ├── modules/           # Feature-specific workflows
│   │   ├── Descriptive/
│   │   ├── Distributions/
│   │   ├── Hypothesis/
│   │   ├── Modeling/
│   │   └── SPC/
│   ├── store/             # Global state (Report Builder data)
│   ├── App.tsx            # Main layout and routing
│   └── main.tsx           # Entry point
```

## 3. Implementation Roadmap

### Phase 1: Foundation & Core Engine
- Initialize Vite + Tailwind project.
- Implement the `calculations/` engine:
  - Normal, T, F, Chi-Square distribution functions.
  - Descriptive stats (skewness, kurtosis).
  - Hypothesis test logic (independent of UI).

### Phase 2: Modular Calculator Suite
- **Descriptive & Metrics**: Data grid input, Histogram/Boxplot rendering.
- **Distributions**: Interactive probability calculators.
- **Hypothesis Testing**: Guided wizard for test selection.
- **Modeling & Capability**: Regression engine + Cp/Cpk visualizers.
- **SPC & MSA**: Control chart logic with rule violation flagging (Western Electric rules).

### Phase 3: Report Builder & Visualization
- Create "Send to Report" bridge.
- Develop the **Report Canvas**: A consolidated, editable view of all calculations performed in the session.
- Optimize print CSS for high-fidelity PDF generation.

### Phase 4: Integration with Main Platform
- Link the "Biostats" button in the floating assistant to launch this suite in a dedicated, high-performance modal/window.

## 4. Design Aesthetics
- **Color Palette**: Twilight Horizon (Slate-900 backgrounds, Blue-500 accents, Green-500 success highlights).
- **Typography**: Inter (UI), JetBrains Mono (Statistical outputs).
- **UX**: Sidebar navigation with collapsible modules. Empty states for charts until data is entered.

## 5. Success Criteria
- Validated math: P-values match standard statistical tables (Minitab/SigmaXL standard).
- Interactive charts: Hover tooltips show Z-scores and defect rates.
- Responsive design: Functional on tablets for floor audits.
