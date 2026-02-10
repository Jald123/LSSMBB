export type Category = 'medical' | 'daily-life' | 'investment';
export type Priority = 'essential' | 'recommended' | 'optional';
export type Framework = 'DMAIC' | 'DMADV';

export interface ToolMapping {
    toolId: string;
    toolName: string;
    priority: Priority;
    htmlFile: string;
}

export interface Phase {
    name: string;
    tools: ToolMapping[];
}

export interface CaseStudy {
    id: string;
    title: string;
    category: Category;
    description: string;
    difficulty: number;
    estimatedHours: number;
    framework: Framework;
    phases: Phase[];
}

export const CASE_STUDIES: CaseStudy[] = [
    {
        id: "er-wait-times",
        title: "ER Wait Times Optimization",
        category: "medical",
        description: "Analyze patient flow in a busy urban emergency room to reduce door-to-provider time.",
        difficulty: 4,
        estimatedHours: 12,
        framework: "DMAIC",
        phases: [
            { name: "Define", tools: [{ toolId: "charter", toolName: "Project Charter", priority: "essential", htmlFile: "Tool_ProjectCharter.html" }] }
        ]
    },
    {
        id: "medication-errors",
        title: "Medication Error Reduction",
        category: "medical",
        description: "Identify root causes of dispensing errors and implement standard work for high-alert medications.",
        difficulty: 5,
        estimatedHours: 15,
        framework: "DMAIC",
        phases: []
    },
    {
        id: "patient-transfer",
        title: "Patient Safe-Transfer Protocol",
        category: "medical",
        description: "Standardize handoff protocols between ICU and general wards to ensure patient safety.",
        difficulty: 3,
        estimatedHours: 8,
        framework: "DMAIC",
        phases: []
    },
    {
        id: "surgical-optimization",
        title: "Surgical Path Optimization",
        category: "medical",
        description: "Minimize delays in operating room turnover using Lean techniques and standard work.",
        difficulty: 4,
        estimatedHours: 10,
        framework: "DMAIC",
        phases: []
    },
    {
        id: "lab-tat",
        title: "Lab Results Turnaround Time",
        category: "medical",
        description: "Reduce the time from specimen collection to result availability for urgent lab tests.",
        difficulty: 3,
        estimatedHours: 7,
        framework: "DMAIC",
        phases: []
    },
    {
        id: "smart-grocery",
        title: "Smart Grocery Shopping",
        category: "daily-life",
        description: "Optimize your weekly grocery routing and budgeting using Kaizen principles.",
        difficulty: 1,
        estimatedHours: 3,
        framework: "DMAIC",
        phases: []
    },
    {
        id: "morning-routine",
        title: "Morning Routine Lean",
        category: "daily-life",
        description: "Shave 15 minutes off your morning prep time using 5S and movement mapping.",
        difficulty: 2,
        estimatedHours: 4,
        framework: "DMAIC",
        phases: []
    },
    {
        id: "portfolio-rebalance",
        title: "Portfolio Rebalancing Engine",
        category: "investment",
        description: "Apply DMAIC to your personal investment strategy to minimize risk and maximize CAGR.",
        difficulty: 4,
        estimatedHours: 9,
        framework: "DMAIC",
        phases: []
    },
    {
        id: "risk-mitigation",
        title: "Risk Mitigation Strategy",
        category: "investment",
        description: "Develop a robust framework for assessing and mitigating volatility in volatile markets.",
        difficulty: 5,
        estimatedHours: 14,
        framework: "DMADV",
        phases: []
    },
    {
        id: "property-yield",
        title: "Property Yield Analysis",
        category: "investment",
        description: "Optimize rental property returns through strategic maintenance and tenant screening.",
        difficulty: 4,
        estimatedHours: 11,
        framework: "DMAIC",
        phases: []
    }
];
