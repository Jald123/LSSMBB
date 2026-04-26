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
    dataset?: {
        briefingUrl: string;
        rawDataUrl: string;
    };
    idealSolutions?: Record<string, any>; // Keyed by toolId
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

const DMADV_PHASES: Phase[] = [
    {
        name: "Define",
        tools: [
            { toolId: "charter", toolName: "Design Charter", priority: "essential", htmlFile: "Tool_ProjectCharter_Premium.html" },
            { toolId: "voc", toolName: "VOC Analysis", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=ctq" }
        ]
    },
    {
        name: "Measure",
        tools: [
            { toolId: "kano", toolName: "Kano Model", priority: "essential", htmlFile: "Tool_KanoModel.html" },
            { toolId: "qfd", toolName: "QFD House of Quality", priority: "essential", htmlFile: "Tool_QFD_HouseOfQuality.html" }
        ]
    },
    {
        name: "Analyze",
        tools: [
            { toolId: "design-concepts", toolName: "Design Concepts", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=fishbone" },
            { toolId: "pugh", toolName: "Pugh Matrix", priority: "essential", htmlFile: "Tool_PughMatrix_Premium.html" }
        ]
    },
    {
        name: "Design",
        tools: [
            { toolId: "fmea", toolName: "DFMEA Analysis", priority: "essential", htmlFile: "Tool_DFMEA_Premium.html" },
            { toolId: "detailed-design", toolName: "Detailed Design", priority: "essential", htmlFile: "Tool_SOP_Premium.html" }
        ]
    },
    {
        name: "Verify",
        tools: [
            { toolId: "verification", toolName: "Verification Plan", priority: "essential", htmlFile: "Tool_RiskRegistrar_Premium.html" },
            { toolId: "results", toolName: "Validation Results", priority: "essential", htmlFile: "Calculator_ControlCharts.html" }
        ]
    }
];

const KAIZEN_PHASES: Phase[] = [
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
            { toolId: "pareto", toolName: "Value Stream/Waste ID", priority: "essential", htmlFile: "Tool_ParetoAnalysis.html" },
            { toolId: "fishbone", toolName: "Root Cause Scan", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=fishbone" }
        ]
    },
    {
        name: "Improve",
        tools: [
            { toolId: "kaizen-event", toolName: "Blitz Implementation", priority: "essential", htmlFile: "Tool_KaizenPrioritization_Premium.html" }
        ]
    },
    {
        name: "Standardize",
        tools: [
            { toolId: "control-plan", toolName: "Standard Work", priority: "essential", htmlFile: "Tool_RiskRegistrar_Premium.html" }
        ]
    }
];

const FOCUS_PDCA_PHASES: Phase[] = [
    {
        name: "FOCUS",
        tools: [
            { toolId: "charter", toolName: "Find/Organize/Clarify", priority: "essential", htmlFile: "Tool_ProjectCharter_Premium.html" },
            { toolId: "clarify", toolName: "Understand/Select", priority: "essential", htmlFile: "Tool_LeanWorkshop.html?tool=5whys" }
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
            { toolId: "standardize", toolName: "Standardize/Act", priority: "essential", htmlFile: "Tool_RiskRegistrar_Premium.html" }
        ]
    }
];

export const CASE_STUDIES: CaseStudy[] = [
    // --- HEALTHCARE DMAIC (5) ---
    {
        id: "er-wait-times",
        title: "ER Wait Times Optimization",
        category: "medical",
        description: "Analyze patient flow in a busy urban emergency room to reduce door-to-provider time using DMAIC.",
        difficulty: 4,
        estimatedHours: 12,
        framework: "DMAIC",
        phases: DMAIC_PHASES,
        dataset: {
            briefingUrl: "/datasets/ER_Wait_Time_Briefing.pdf",
            rawDataUrl: "/datasets/ER_Wait_Time_Data.csv"
        }
    },
    {
        id: "medication-errors",
        title: "Medication Error Reduction",
        category: "medical",
        description: "Identify root causes of dispensing errors and implement standard work for high-alert medications.",
        difficulty: 5,
        estimatedHours: 15,
        framework: "DMAIC",
        phases: DMAIC_PHASES,
        dataset: {
            briefingUrl: "/datasets/Med_Error_Briefing.pdf",
            rawDataUrl: "/datasets/Med_Error_Data.csv"
        }
    },
    {
        id: "patient-transfer",
        title: "Patient Safe-Transfer Protocol",
        category: "medical",
        description: "Standardize handoff protocols between ICU and general wards to ensure patient safety.",
        difficulty: 3,
        estimatedHours: 8,
        framework: "DMAIC",
        phases: DMAIC_PHASES,
        dataset: {
            briefingUrl: "/datasets/Patient_Transfer_Briefing.pdf",
            rawDataUrl: "/datasets/Patient_Transfer_Data.csv"
        }
    },
    {
        id: "surgical-optimization",
        title: "Surgical Path Optimization",
        category: "medical",
        description: "Minimize delays in operating room turnover using Lean techniques and standard work.",
        difficulty: 4,
        estimatedHours: 10,
        framework: "DMAIC",
        phases: DMAIC_PHASES,
        dataset: {
            briefingUrl: "/datasets/Surgical_Optimization_Briefing.pdf",
            rawDataUrl: "/datasets/Surgical_Optimization_Data.csv"
        }
    },
    {
        id: "lab-tat",
        title: "Lab Results Turnaround Time",
        category: "medical",
        description: "Reduce the time from specimen collection to result availability for urgent lab tests.",
        difficulty: 3,
        estimatedHours: 7,
        framework: "DMAIC",
        phases: DMAIC_PHASES,
        dataset: {
            briefingUrl: "/datasets/Lab_TAT_Briefing.pdf",
            rawDataUrl: "/datasets/Lab_TAT_Data.csv"
        }
    },

    // --- HEALTHCARE DMADV (2) ---
    {
        id: "hospital-wing-design",
        title: "Hospital Wing Design",
        category: "medical",
        description: "Design a new patient-centric wing optimized for flow and safety using the DMADV framework.",
        difficulty: 5,
        estimatedHours: 20,
        framework: "DMADV",
        phases: DMADV_PHASES,
        dataset: {
            briefingUrl: "/datasets/Hospital_Wing_Briefing.pdf",
            rawDataUrl: "/datasets/Hospital_Wing_Data.csv"
        }
    },
    {
        id: "telehealth-exp",
        title: "Telehealth Experience Design",
        category: "medical",
        description: "Engineer a seamless virtual visit portal for senior patients using Design for Six Sigma.",
        difficulty: 4,
        estimatedHours: 14,
        framework: "DMADV",
        phases: DMADV_PHASES,
        dataset: {
            briefingUrl: "/datasets/Telehealth_Briefing.pdf",
            rawDataUrl: "/datasets/Telehealth_Data.csv"
        }
    },

    // --- HEALTHCARE KAIZEN (3) ---
    {
        id: "discharge-blitz",
        title: "Discharge Process Blitz",
        category: "medical",
        description: "3-day rapid improvement event to streamline the patient discharge administrative flow.",
        difficulty: 2,
        estimatedHours: 6,
        framework: "Kaizen",
        phases: KAIZEN_PHASES,
        dataset: {
            briefingUrl: "/datasets/Discharge_Blitz_Briefing.pdf",
            rawDataUrl: "/datasets/Discharge_Blitz_Data.csv"
        }
    },
    {
        id: "supply-room-5s",
        title: "Supply Room 5S Blitz",
        category: "medical",
        description: "Organize the surgical supply room to eliminate search time waste and inventory bloat.",
        difficulty: 1,
        estimatedHours: 4,
        framework: "Kaizen",
        phases: KAIZEN_PHASES,
        dataset: {
            briefingUrl: "/datasets/Supply_Room_5S_Briefing.pdf",
            rawDataUrl: "/datasets/Supply_Room_5S_Data.csv"
        }
    },
    {
        id: "pharmacy-workflow",
        title: "Pharmacy Workflow Blitz",
        category: "medical",
        description: "Rapidly reorganize the inpatient pharmacy layout to reduce travel distance for technicians.",
        difficulty: 3,
        estimatedHours: 9,
        framework: "Kaizen",
        phases: KAIZEN_PHASES,
        dataset: {
            briefingUrl: "/datasets/Pharmacy_Workflow_Briefing.pdf",
            rawDataUrl: "/datasets/Pharmacy_Workflow_Data.csv"
        }
    },

    // --- HEALTHCARE FOCUS-PDCA (2) ---
    {
        id: "satisfaction-focus",
        title: "Patient Satisfaction Cycle",
        category: "medical",
        description: "Systematically address declining HCAHPS scores in the outpatient clinic.",
        difficulty: 2,
        estimatedHours: 8,
        framework: "FOCUS-PDCA",
        phases: FOCUS_PDCA_PHASES,
        dataset: {
            briefingUrl: "/datasets/Satisfaction_PDCA_Briefing.pdf",
            rawDataUrl: "/datasets/Satisfaction_PDCA_Data.csv"
        }
    },
    {
        id: "infection-rate",
        title: "Infection Rate Reduction",
        category: "medical",
        description: "Apply the FOCUS-PDCA cycle to reduce catheter-associated infections in the surgical ward.",
        difficulty: 4,
        estimatedHours: 12,
        framework: "FOCUS-PDCA",
        phases: FOCUS_PDCA_PHASES,
        dataset: {
            briefingUrl: "/datasets/Infection_PDCA_Briefing.pdf",
            rawDataUrl: "/datasets/Infection_PDCA_Data.csv"
        }
    },

    // --- DAILY LIFE (2 per framework = 8 total) ---
    {
        id: "smart-grocery",
        title: "Smart Grocery Shopping",
        category: "daily-life",
        description: "Optimize your weekly grocery routing and budgeting using DMAIC principles.",
        difficulty: 1,
        estimatedHours: 3,
        framework: "DMAIC",
        phases: DMAIC_PHASES,
        dataset: {
            briefingUrl: "/datasets/Grocery_Briefing.pdf",
            rawDataUrl: "/datasets/Grocery_Data.csv"
        }
    },
    {
        id: "commute-optimization",
        title: "Commute Time Optimization",
        category: "daily-life",
        description: "Analyze and reduce your daily commute variation using DMAIC and data collection.",
        difficulty: 2,
        estimatedHours: 5,
        framework: "DMAIC",
        phases: DMAIC_PHASES,
        dataset: {
            briefingUrl: "/datasets/Commute_Briefing.pdf",
            rawDataUrl: "/datasets/Commute_Data.csv"
        }
    },
    {
        id: "morning-routine-kaizen",
        title: "Morning Routine Streamline",
        category: "daily-life",
        description: "A rapid personal kaizen event to shave 15 minutes off your morning prep time.",
        difficulty: 2,
        estimatedHours: 4,
        framework: "Kaizen",
        phases: KAIZEN_PHASES,
        dataset: {
            briefingUrl: "/datasets/Morning_Kaizen_Briefing.pdf",
            rawDataUrl: "/datasets/Morning_Kaizen_Data.csv"
        }
    },
    {
        id: "closet-5s",
        title: "Closet Organization (5S)",
        category: "daily-life",
        description: "Apply the 5S methodology to organize your wardrobe for maximum efficiency.",
        difficulty: 1,
        estimatedHours: 3,
        framework: "Kaizen",
        phases: KAIZEN_PHASES,
        dataset: {
            briefingUrl: "/datasets/Closet_5S_Briefing.pdf",
            rawDataUrl: "/datasets/Closet_5S_Data.csv"
        }
    },
    {
        id: "home-office-design",
        title: "Home Office Design",
        category: "daily-life",
        description: "Design an ergonomic and high-productivity workspace using DMADV.",
        difficulty: 3,
        estimatedHours: 6,
        framework: "DMADV",
        phases: DMADV_PHASES,
        dataset: {
            briefingUrl: "/datasets/Office_DMADV_Briefing.pdf",
            rawDataUrl: "/datasets/Office_DMADV_Data.csv"
        }
    },
    {
        id: "personal-wedding-planner",
        title: "Event Planning Excellence",
        category: "daily-life",
        description: "Design a flawless family event or wedding protocol using DMADV principles.",
        difficulty: 4,
        estimatedHours: 10,
        framework: "DMADV",
        phases: DMADV_PHASES,
        dataset: {
            briefingUrl: "/datasets/Wedding_DMADV_Briefing.pdf",
            rawDataUrl: "/datasets/Wedding_DMADV_Data.csv"
        }
    },
    {
        id: "personal-budget-pdca",
        title: "Personal Budget Tracking",
        category: "daily-life",
        description: "Stabilize your personal savings rate using the FOCUS-PDCA cycle.",
        difficulty: 2,
        estimatedHours: 5,
        framework: "FOCUS-PDCA",
        phases: FOCUS_PDCA_PHASES,
        dataset: {
            briefingUrl: "/datasets/Budget_PDCA_Briefing.pdf",
            rawDataUrl: "/datasets/Budget_PDCA_Data.csv"
        }
    },
    {
        id: "health-habit-tracker",
        title: "Habit Formation Cycle",
        category: "daily-life",
        description: "Apply FOCUS-PDCA to build and sustain a new health or fitness habit.",
        difficulty: 1,
        estimatedHours: 4,
        framework: "FOCUS-PDCA",
        phases: FOCUS_PDCA_PHASES,
        dataset: {
            briefingUrl: "/datasets/Health_Habit_Briefing.pdf",
            rawDataUrl: "/datasets/Health_Habit_Data.csv"
        }
    }
];

export const getCustomTemplate = (framework: Framework): CaseStudy => {
    let phases = DMAIC_PHASES;
    
    if (framework === 'Kaizen') {
        phases = KAIZEN_PHASES;
    } else if (framework === 'FOCUS-PDCA') {
        phases = FOCUS_PDCA_PHASES;
    } else if (framework === 'DMADV') {
        phases = DMADV_PHASES;
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

