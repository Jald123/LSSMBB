export interface SearchItem {
    id: string;
    title: string;
    category: "TOOL" | "MISSION" | "ACTION" | "PAGE";
    description: string;
    url: string;
    keywords: string[];
}

export const TOOLS_INDEX: SearchItem[] = [
    // Core Layout Pages
    {
        id: "dash-001",
        title: "Command Center",
        category: "PAGE",
        description: "Your primary operations dashboard and project overview.",
        url: "/",
        keywords: ["home", "dashboard", "main", "start"]
    },
    {
        id: "armory-001",
        title: "The Armory",
        category: "PAGE",
        description: "Review your badges, achievements, and mastery ranking.",
        url: "/armory",
        keywords: ["badges", "achievements", "rewards", "profile"]
    },
    
    // Modern Statistics & Lean Tools (Major ones indexed for Phase 2)
    {
        id: "tool-stats-anova",
        title: "ANOVA Calculator",
        category: "TOOL",
        description: "Analysis of Variance for multiple groups.",
        url: "/04-STATISTICS-TOOLS/Calculator_ANOVA.html",
        keywords: ["stats", "variance", "calculator", "analyze"]
    },
    {
        id: "tool-stats-cap",
        title: "Process Capability (Cp/Cpk)",
        category: "TOOL",
        description: "Statistical measure of process performance.",
        url: "/04-STATISTICS-TOOLS/Calculator_ProcessCapability.html",
        keywords: ["capability", "cp", "cpk", "sigma", "measure"]
    },
    {
        id: "tool-lean-8wastes",
        title: "8 Wastes (DOWNTIME)",
        category: "TOOL",
        description: "Identify and eliminate Muda (waste) in processes.",
        url: "/04-STATISTICS-TOOLS/Tool_8Wastes_DOWNTIME.html",
        keywords: ["lean", "waste", "downtime", "muda", "improve"]
    },
    {
        id: "tool-charter",
        title: "Project Charter Master",
        category: "TOOL",
        description: "Initialize and define your DMAIC mission goals.",
        url: "/04-STATISTICS-TOOLS/Tool_ProjectCharter_Premium.html",
        keywords: ["define", "charter", "setup", "project"]
    },
    {
        id: "tool-sipoc",
        title: "SIPOC / Process Map",
        category: "TOOL",
        description: "High-level process visualization with Premium Workshop architecture.",
        url: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=sipoc",
        keywords: ["sipoc", "map", "flow", "define"]
    },
    {
        id: "tool-fmea",
        title: "FMEA Manager",
        category: "TOOL",
        description: "Failure Mode and Effects Analysis for risk mitigation.",
        url: "/04-STATISTICS-TOOLS/Tool_DFMEA_Premium.html",
        keywords: ["risk", "fmea", "failure", "analyze"]
    },
    {
        id: "tool-vsm",
        title: "Value Stream Mapping",
        category: "TOOL",
        description: "Detailed visualization of material and information flow.",
        url: "/04-STATISTICS-TOOLS/Tool_VSM.html",
        keywords: ["vsm", "process", "flow", "lean"]
    },
    {
        id: "tool-hypothesis",
        title: "Hypothesis Wizard",
        category: "TOOL",
        description: "Select the right statistical test for your data.",
        url: "/04-STATISTICS-TOOLS/Tool_HypothesisWizard_Premium.html",
        keywords: ["test", "hypothesis", "stats", "analyze"]
    },
    {
        id: "tool-roi",
        title: "ROI & Financials",
        category: "TOOL",
        description: "Calculate project financial impact and return on investment.",
        url: "/04-STATISTICS-TOOLS/Tool_Financials_ROI.html",
        keywords: ["money", "roi", "savings", "finance", "control"]
    }
];
