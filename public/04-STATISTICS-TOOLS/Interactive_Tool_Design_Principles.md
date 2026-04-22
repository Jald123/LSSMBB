# Interactive Statistical Tool Design Principles & Standards

This document outlines the UX/UI standards and pedagogical principles established for the "Black Belt Studio" interactive tools.

## 1. Core Philosophy: "Context over Calculation"
The primary goal is to bridge the gap between abstract statistical output and practical business decision-making. Users should never be left staring at a number wondering, "So what?".
*   **Principle**: Every result must be accompanied by an explanation.
*   **Goal**: Answer three user questions immediately:
    1.  "What is this term?" (Definition)
    2.  "What does it mean here?" (Context)
    3.  "Why is it saying that?" (Evidence/Reasoning)

---

## 2. Universal UI Features

### A. The "Click-to-Explain" Pattern
*   **Requirement**: All statistical headers (e.g., P-Value, RPN, Severity) and major chart elements must be interactive.
*   **Visual Cues**:
    *   Append a `(?)` icon to headers.
    *   Use a dotted underline (`border-bottom: 1px dotted`) to indicate interactability.
    *   Cursor must change to `help` or `pointer` on hover.
*   **Interaction**: specific clicks trigger a centralized `explain(key)` function that opens a modal.

### B. Scenario-Based Learning
*   **Requirement**: Never use generic "Data Set 1" or "Group A" by default.
*   **Implementation**:
    *   **Industry Dropdown**: Allow users to toggle between **Manufacturing**, **Healthcare**, and **Service**.
    *   **Dynamic Labels**: The UI must update meaningful labels (e.g., changing "Factor A" to "Furnace Temp" or "Wait Time").
    *   **Data Toggles**: Provide "Normal/Standard" vs. "Skewed/Critical" buttons to demonstrate how the tool reacts to different data qualities (e.g., outliers, high variation).

### C. Visual Enhancements (NEW)
*   **Magnifier**: All graphs, charts, and complex equations must have a "Magnify" or "Zoom" capability for detailed inspection.
*   **Download capability**: All charts and graphs must include a "Download as PNG" button or context action.
*   **Glowing Phase Badge**: The project phase indicator (e.g., "DEFINE PHASE") must be visually distinct, using a glowing effect and a unique color palette to signal its importance in the DMAIC lifecycle.

---

## 3. The "Contextual Reasoning" Engine
The explanation modal is not a static dictionary. It is a dynamic "Reasoning Engine" structured in three layers:

1.  **Static Definition**: The textbook definition (Universal).
    *   *Example*: "Severity measures the impact of a failure."
2.  **Scenario Context**: Industry-specific qualitative context (Dynamic).
    *   *Example*: "In this Healthcare triage scenario, a 'Missed Diagnosis' is a life-threatening event."
3.  **"Based On" Evidence**: Quantitative reasoning derived from the specific dataset (Data-Driven).
    *   *Example*: "**Based On:** The Detection score is 9, meaning current controls are completely blind to this defect."

---

## 4. Visualizations & Result Displays

### A. Charting Standards
*   **Pareto Charts**: Must be "Proper Paretos" (Dual Axis: Bars + Cumulative Line).
*   **Heatmaps**: Clearly define zones (Red/Critical, Yellow/Warning, Green/Safe).
*   **Required Visualizations**:
    *   **Gauge Charts**: For single-metric KPIs (e.g., Cpk, Yield).
    *   **Trendlines & Forecasts**: For Regression and Time Series.
    *   **Scatter Plots**: For Correlation/Regression.
    *   **Box-and-Whisker**: For Descriptive Stats (Spread analysis).
    *   **Histograms**: For Frequency distribution.
    *   **Gantt Charts**: For Project Management (Project Charter).
    *   **Moving Averages**: For Control Charts and Trending.

### B. Automatic Auto-Summaries
*   **Requirement**: The tool must calculate and display a plain-English summary immediately after running.
*   **Format**: "Key Findings" box features:
    *   Identifying the #1 Driver / Root Cause.
    *   Providing a specific recommendation (e.g., "Set Factor A to HIGH (+).").
    *   Highlighting Interactions or Anomalies.
    *   **Statistical Metrics**: Auto-calculate Standard Deviation, Variance, F-Test results, and Correlation Coefficients where applicable.

---

## 5. Layout & Space Management
*   **Input Fields**: Ensure inputs (especially in tables like FMEA) have sufficient width (`min-width: 50px` or `8%` column width) so numbers are never cut off.
*   **Legends**: Explicitly define shorthand symbols.
    *   *Example*: "🔴 Low (-) matches Baseline, 🟢 High (+) matches New Setting."


## 6. Code Structure (Best Practices)
*   **`scenarios` Object**: A central JSON-like object stores all data, labels, context strings, and reasoning logic.
*   **`explain(key)` Function**: Handles glossary lookup, scenario state check, and modal assembly.
*   **`init()` / `loadScenario()`**: Functions to pre-load tools with educational data.
