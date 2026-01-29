# PROMPT FOR GENERATING HIGH-END ROI & BUSINESS CASE AESTHETICS

**Context:**
You are an expert Senior UI/UX Designer specializing in "Clinical Fintech" interfaces. You combine the data-density of a Bloomberg Terminal with the clean, trust-building aesthetics of high-end medical software.

**Goal:**
Generate HTML/CSS/JS for a "Financial ROI & Business Case" module that looks extremely premium, authoritative, and interactive.

**Design System Specifications:**

### 1. Color Palette (The "CFO Approved" Theme)
- **Primary Background:** `#0f172a` (Slate 900) - Deep, professional dark mode.
- **Card Background:** `#1e293b` (Slate 800) with thin glass borders `rgba(255,255,255,0.1)`.
- **Accent - Money/Growth:** `#10b981` (Emerald 500) - Used for ROI, Hard Savings, Positive Cash Flow.
- **Accent - Risk/Cost:** `#ef4444` (Red 500) - Used for Investment Costs, Risks.
- **Accent - Efficiency:** `#3b82f6` (Blue 500) - Used for Soft Savings/Productivity.
- **Text:** `#f1f5f9` (Slate 100) for headings, `#94a3b8` (Slate 400) for labels.

### 2. Typography
- **Headings:** `Orbitron` (Google Fonts) - Futuristic, data-driven feel.
- **Body:** `Inter` (Google Fonts) - Clean, readable, highly legible numbers.

### 3. Key UI Components to Implement

**A. The "Money Wave" Hero:**
   - Use a subtle CSS gradient background that implies a "green wave" of profit.
   - `background: linear-gradient(to bottom, #ffffff, #6ee7b7); -webkit-background-clip: text;` for the main title.

**B. Interactive Value Cards:**
   - Create 3 distinct cards for "Hard Savings", "Soft Savings", and "Cost Avoidance".
   - **Hover Effect:** When hovered, the card should glow with its specific accent color (Green, Blue, Amber).
   - Use Lucide-style icons (SVG) for visual anchoring.

**C. The "CFO Verdict" Calculator:**
   - **Inputs:** Clean, dark inputs with distinct bottom borders. No heavy boxes.
   - **Outputs:** Large, neon-styled numbers for "Net Present Value (NPV)" and "ROI %".
   - **Visual Feedback:** A dynamically changing "Verdict Badge" that glows Green (APPROVED) if ROI > 20%, or Red (REJECTED) if lower.

**D. SVG Data Visualization:**
   - **Requirement:** Integrate a simple, elegant Line Chart (using `<svg>`) representing "Cash Flow Over Time".
   - **Animation:** The line should "draw" itself (using stroke-dashoffset) upon loading.
   - **Break Even Point:** Clearly mark the point where the line crosses from cost (negative) to profit (positive) as the "Payback Period".

### 4. Code Constraints
- **Language:** HTML5, CSS3, Vanilla JS (No frameworks).
- **Responsiveness:** Grid-based layout that stacks on mobile.
- **Animation:** Use `transition: all 0.3s ease` for all interactive elements to ensure a "premium feel".

---
**Example Output Structure:**
```html
<div class="roi-dashboard">
  <div class="metrics-grid">
     <!-- Metric Cards -->
  </div>
  <div class="visualization-panel">
     <!-- SVG Chart -->
  </div>
  <div class="calculator-panel">
     <!-- Inputs & Verdict -->
  </div>
</div>
```
