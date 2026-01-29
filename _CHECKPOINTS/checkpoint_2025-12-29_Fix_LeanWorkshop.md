# Checkpoint: QFD Tool Refinement (Guidelines & Steps)

**Date:** 2025-12-29
**Time:** 12:55 PM

## 1. Guideline Integration
- **Context**: User provided detailed text describing Steps 1-6 for the House of Quality, using a "Car" example.
- **Action**: Updated the `steps` array in the `qfd` tool within `Tool_LeanWorkshop.html` to perfectly match these 6 steps (Customer Reqs, Technical Measures, Correlation/Roof, Relationships, Importance Rating, Competitive Evaluation).

## 2. "Easier Filling" & User Experience
- **Step 3 (Roof)**: The user requested "Roof / Correlation Matrix" integration.
- **Implementation**: 
    - Added a new input field `roof` specifically for "Technical Correlations".
    - Updated the `render` function to display this correlation data clearly above the matrix if provided. This is an easier alternative to filling a complex triangular grid manually.
    - The "Direction of Improvement" (Up/Down arrows) is already handled visually in the table header.

## 3. Scenarios
- Confirmed presence of 3 robust scenarios:
    1. **Healthcare (ER Flow)** - Matches the user's specific request for a healthcare example.
    2. **Car (Vehicle Design)** - Matches the user's detailed text example and image.
    3. **App (Mobile Banking)** - Matches the "App" requirement request often seen in these contexts.

## 4. Status
- The QFD tool is now a comprehensive "Advanced" version.
- It supports CSV-style inputs for rapid data entry.
- It visualizes the matrix with symbols (●, ○, ▽) and colors.
- It calculates Absolute Weights, Relative Importance %, and Technical Importance Ratings automatically.
