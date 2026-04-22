# Golden Rules for Lean Six Sigma Tools

To ensure a premium, expert-level user experience, all tools within the Lean Six Sigma Interactive Platform must adhere to the following standardization rules.

## 1. Three Sector Scenarios
Every tool must include pre-defined examples for three distinct sectors to demonstrate versatility.
*   **Healthcare (`health`)**: e.g., ER Triage, Patient Flow, Medication Safety.
*   **Manufacturing (`mfg`)**: e.g., Assembly Line, Quality Control, Supply Chain.
*   **Service (`service`)**: e.g., Banking, IT Support, HR Processes.

**Implementation Format:**
```javascript
scenarios: {
    'health': { desc: "Title", data: { ... } },
    'mfg': { desc: "Title", data: { ... } },
    'service': { desc: "Title", data: { ... } }
}
```

## 2. No Undefined Content (Expert Metadata)
All tools must provide comprehensive educational context. No field should be left undefined.
*   **`history`**: Origin of the tool (Who, When, Where).
*   **`what`**: Concise definition.
*   **`why`**: The business value or problem it solves.
*   **`when`**: Appropriate phase or situation to use it.
*   **`standard`**: ISO, ASQ, or industry standard reference (if applicable).
*   **`interp`**: How to interpret the results (Expert Tip).
*   **`ref`**: seminal book or paper.
*   **`preReqs`**: What data/team is needed before starting.
*   **`strictRoles`**: Boolean (true if specific roles like 'Process Owner' are standard).

## 3. Accurate, Expert-Level Content
Content must be academically and professionally accurate, reflecting Six Sigma Black Belt curriculum standards. Avoid generic "filler" text.

## 4. Rich Hover-Over Tooltips
All main input categories (top-level inputs) must provide rich tooltips to guide the user.
*   **`definition`**: What is this input?
*   **`example`**: A concrete example value.
*   **`tip`**: Best practice advice.

**Implementation Format:**
```javascript
inputs: [
    {
        id: 'some_input',
        label: 'Input Label',
        definition: "The specific metric...",
        example: "e.g. 50 kg, 10 mins",
        tip: "Ensure data is normal."
    }
]
```
