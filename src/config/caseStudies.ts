export type Category = 'medical' | 'daily-life' | 'investment';
export type Priority = 'essential' | 'recommended' | 'optional';
export type Framework = 'DMAIC' | 'DMADV' | 'Kaizen' | 'FOCUS-PDCA';

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

const DMAIC_PHASES: Phase[] = [
    {
        name: "Define",
        tools: [
            { toolId: "charter", toolName: "Project Charter", priority: "essential", htmlFile: "Tool_ProjectCharter_Premium.html" },
            { toolId: "sipoc", toolName: "SIPOC Map", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=sipoc" },
            { toolId: "voc", toolName: "VOC Analysis", priority: "recommended", htmlFile: "Tool_LeanWorkshop.html?tool=ctq" }
        ]
    },
    {
        name: "Measure",
        tools: [
            { toolId: "data-collection", toolName: "Data Collection Plan", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=collect" },
            { toolId: "capability", toolName: "Process Capability", priority: "essential", htmlFile: "Calculator_ProcessCapability.html" },
            { toolId: "msa", toolName: "Gage R&R (MSA)", priority: "recommended", htmlFile: "Tool_MSA_Premium.html" }
        ]
    },
    {
        name: "Analyze",
        tools: [
            { toolId: "fishbone", toolName: "Fishbone Diagram", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=fishbone" },
            { toolId: "pareto", toolName: "Pareto Analysis", priority: "essential", htmlFile: "Tool_ParetoAnalysis.html" },
            { toolId: "five-whys", toolName: "5 Whys Root Cause", priority: "recommended", htmlFile: "Tool_LeanWorkshop.html?tool=5whys" }
        ]
    },
    {
        name: "Improve",
        tools: [
            { toolId: "fmea", toolName: "FMEA Analysis", priority: "essential", htmlFile: "Tool_DFMEA_Premium.html" },
            { toolId: "kaizen-event", toolName: "Kaizen Blitz Plan", priority: "recommended", htmlFile: "Tool_KaizenPrioritization_Premium.html" }
        ]
    },
    {
        name: "Control",
        tools: [
            { toolId: "control-plan", toolName: "Control Plan", priority: "essential", htmlFile: "Tool_RiskRegistrar_Premium.html" },
            { toolId: "spc", toolName: "SPC Charts", priority: "essential", htmlFile: "Calculator_ControlCharts.html" }
        ]
    }
];

export const CASE_STUDIES: CaseStudy[] = [
    {
        id: "er-wait-times",
        title: "ER Wait Times Optimization",
        category: "medical",
        description: "Analyze patient flow in a busy urban emergency room to reduce door-to-provider time.",
        difficulty: 4,
        estimatedHours: 12,
        framework: "DMAIC",
        phases: DMAIC_PHASES
    },
    {
        id: "medication-errors",
        title: "Medication Error Reduction",
        category: "medical",
        description: "Identify root causes of dispensing errors and implement standard work for high-alert medications.",
        difficulty: 5,
        estimatedHours: 15,
        framework: "DMAIC",
        phases: DMAIC_PHASES
    },
    {
        id: "patient-transfer",
        title: "Patient Safe-Transfer Protocol",
        category: "medical",
        description: "Standardize handoff protocols between ICU and general wards to ensure patient safety.",
        difficulty: 3,
        estimatedHours: 8,
        framework: "DMAIC",
        phases: DMAIC_PHASES
    },
    {
        id: "surgical-optimization",
        title: "Surgical Path Optimization",
        category: "medical",
        description: "Minimize delays in operating room turnover using Lean techniques and standard work.",
        difficulty: 4,
        estimatedHours: 10,
        framework: "DMAIC",
        phases: DMAIC_PHASES
    },
    {
        id: "lab-tat",
        title: "Lab Results Turnaround Time",
        category: "medical",
        description: "Reduce the time from specimen collection to result availability for urgent lab tests.",
        difficulty: 3,
        estimatedHours: 7,
        framework: "DMAIC",
        phases: DMAIC_PHASES
    },
    {
        id: "smart-grocery",
        title: "Smart Grocery Shopping",
        category: "daily-life",
        description: "Optimize your weekly grocery routing and budgeting using Kaizen principles.",
        difficulty: 1,
        estimatedHours: 3,
        framework: "DMAIC",
        phases: DMAIC_PHASES
    },
    {
        id: "morning-routine",
        title: "Morning Routine Lean",
        category: "daily-life",
        description: "Shave 15 minutes off your morning prep time using 5S and movement mapping.",
        difficulty: 2,
        estimatedHours: 4,
        framework: "DMAIC",
        phases: DMAIC_PHASES
    },
    {
        id: "portfolio-rebalance",
        title: "Portfolio Rebalancing Engine",
        category: "investment",
        description: "Apply DMAIC to your personal investment strategy to minimize risk and maximize CAGR.",
        difficulty: 4,
        estimatedHours: 9,
        framework: "DMAIC",
        phases: DMAIC_PHASES
    },
    {
        id: "risk-mitigation",
        title: "Risk Mitigation Strategy",
        category: "investment",
        description: "Develop a robust framework for assessing and mitigating volatility in volatile markets.",
        difficulty: 5,
        estimatedHours: 14,
        framework: "DMADV",
        phases: DMAIC_PHASES // Placeholder: DMADV has different phases but for now we follow the pattern
    },
    {
        id: "property-yield",
        title: "Property Yield Analysis",
        category: "investment",
        description: "Optimize rental property returns through strategic maintenance and tenant screening.",
        difficulty: 4,
        estimatedHours: 11,
        framework: "DMAIC",
        phases: DMAIC_PHASES
    }
];

export const getCustomTemplate = (framework: Framework): CaseStudy => {
    let phases = DMAIC_PHASES;
    
    if (framework === 'Kaizen') {
        phases = [
            {
                name: "Identify",
                tools: [
                    { toolId: "charter", toolName: "Kaizen Charter", priority: "essential", htmlFile: "Tool_ProjectCharter_Premium.html" },
                    { toolId: "gemba", toolName: "Gemba Walk Notes", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=sipoc" }
                ]
            },
            {
                name: "Analyze",
                tools: [
                    { toolId: "pareto", toolName: "Pareto Analysis", priority: "essential", htmlFile: "Tool_ParetoAnalysis.html" },
                    { toolId: "fishbone", toolName: "Fishbone Diagram", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=fishbone" }
                ]
            },
            {
                name: "Improve",
                tools: [
                    { toolId: "kaizen-event", toolName: "Improvement Plan", priority: "essential", htmlFile: "Tool_KaizenPrioritization_Premium.html" }
                ]
            },
            {
                name: "Standardize",
                tools: [
                    { toolId: "control-plan", toolName: "Standard Work", priority: "essential", htmlFile: "Tool_RiskRegistrar_Premium.html" }
                ]
            }
        ];
    } else if (framework === 'FOCUS-PDCA') {
        phases = [
            {
                name: "FOCUS",
                tools: [
                    { toolId: "charter", toolName: "Project Focus", priority: "essential", htmlFile: "Tool_ProjectCharter_Premium.html" },
                    { toolId: "organize", toolName: "Team Organization", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=sipoc" },
                    { toolId: "clarify", toolName: "Process Clarification", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=5whys" }
                ]
            },
            {
                name: "Plan",
                tools: [
                    { toolId: "data-collection", toolName: "Data Collection", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=collect" },
                    { toolId: "plan", toolName: "Action Plan", priority: "essential", htmlFile: "Tool_ParetoAnalysis.html" }
                ]
            },
            {
                name: "Do",
                tools: [
                    { toolId: "implementation", toolName: "Trial Implementation", priority: "essential", htmlFile: "Tool_DFMEA_Premium.html" }
                ]
            },
            {
                name: "Check/Act",
                tools: [
                    { toolId: "results", toolName: "Result Analysis", priority: "essential", htmlFile: "Calculator_ControlCharts.html" },
                    { toolId: "standardize", toolName: "Standardization", priority: "essential", htmlFile: "Tool_RiskRegistrar_Premium.html" }
                ]
            }
        ];
    } else if (framework === 'DMADV') {
        phases = [
            {
                name: "Define",
                tools: [{ toolId: "charter", toolName: "Design Charter", priority: "essential", htmlFile: "Tool_ProjectCharter_Premium.html" }]
            },
            {
                name: "Measure",
                tools: [{ toolId: "voc", toolName: "Customer Needs", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=ctq" }]
            },
            {
                name: "Analyze",
                tools: [{ toolId: "design-concepts", toolName: "Design Concepts", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=fishbone" }]
            },
            {
                name: "Design",
                tools: [{ toolId: "detailed-design", toolName: "Detailed Design", priority: "essential", htmlFile: "Tool_DFMEA_Premium.html" }]
            },
            {
                name: "Verify",
                tools: [{ toolId: "verification", toolName: "Verification Plan", priority: "essential", htmlFile: "Tool_RiskRegistrar_Premium.html" }]
            }
        ];
    }

    return {
        id: 'custom',
        title: 'Custom Project',
        category: 'medical',
        description: 'User initiated custom deployment',
        difficulty: 3,
        estimatedHours: 10,
        framework: framework,
        phases: phases
    };
};
