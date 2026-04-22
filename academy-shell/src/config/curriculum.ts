export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;
    status: "locked" | "available" | "completed" | "in-progress";
    toolUrl?: string;
    type: "video" | "tool" | "reading";
}

export interface Phase {
    id: string;
    title: string;
    description: string;
    progress: number;
    lessons: Lesson[];
}

// PHASE 0 is constant across all frameworks
const PHASE_0: Phase = {
    id: "foundation",
    title: "Phase 0: Foundation & Strategy",
    description: "Master the essential Lean Six Sigma principles and set your tactical baseline.",
    progress: 0,
    lessons: [
        {
            id: "fnd-001",
            title: "LSS Fundamentals",
            description: "History, Belts, and the core 6 Pillars of Excellence.",
            duration: "30 min",
            status: "available",
            type: "reading",
            toolUrl: "/04-STATISTICS-TOOLS/Tool_LSS_Fundamentals.html"
        },
        {
            id: "fnd-002",
            title: "Mission Prep Armory",
            description: "Access the essential tactical toolkit for rapid deployment.",
            duration: "20 min",
            status: "available",
            type: "tool",
            toolUrl: "/04-STATISTICS-TOOLS/Tool_WorkflowHub.html"
        }
    ]
};

export const FRAMEWORKS: Record<string, Phase[]> = {
    dmaic: [
        PHASE_0,
        {
            id: "define",
            title: "1. DEFINE",
            description: "Charter, Scope, VOC, Teams",
            progress: 100,
            lessons: [
                {
                    id: "def-001",
                    title: "Project Charter (Premium)",
                    description: "Define scope/team. The project contract.",
                    duration: "45 min",
                    status: "completed",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ProjectCharter_Premium.html"
                },
                {
                    id: "def-002",
                    title: "Stakeholder Matrix",
                    description: "Who cares? Manage influence & interest.",
                    duration: "30 min",
                    status: "completed",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_StakeholderAnalysis.html"
                },
                {
                    id: "def-003",
                    title: "Project Triage & Scoping",
                    description: "Is this project viable? Validate problem statement.",
                    duration: "20 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ProjectTriage.html"
                },
                {
                    id: "def-004",
                    title: "Hoshin Kanri X-Matrix",
                    description: "Strategic Alignment. Align Vision -> Goals -> Metrics.",
                    duration: "35 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanStrategyHub.html?tool=hoshin"
                },
                {
                    id: "def-005",
                    title: "SIPOC Diagram",
                    description: "High-level map (Supplier->Customer).",
                    duration: "25 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=sipoc"
                },
                {
                    id: "def-006",
                    title: "QFD House of Quality",
                    description: "Translate Customer Voice (VOC) to Specs.",
                    duration: "60 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_QFD_HouseOfQuality.html"
                },
                {
                    id: "def-007",
                    title: "Advanced Swimlane Architect",
                    description: "Premium Process Mapping. Visualize handoffs & cycle time.",
                    duration: "40 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_Swimlane_Advanced.html"
                },
                {
                    id: "def-008",
                    title: "Affinity Diagram",
                    description: "Organize chaotic brainstorming ideas.",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=affinity"
                },
                {
                    id: "def-009",
                    title: "Project Timelines (Gantt)",
                    description: "Schedule milestones & dependencies.",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_GanttChart.html"
                },
                {
                    id: "def-010",
                    title: "Leadership & Management",
                    description: "Change Management (ADKAR).",
                    duration: "25 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ChangeMgmt_ADKAR.html"
                }
            ]
        },
        {
            id: "measure",
            title: "2. MEASURE",
            description: "MSA, Capability, Statistics",
            progress: 40,
            lessons: [
                {
                    id: "mea-001",
                    title: "MSA (Gage R&R) Premium",
                    description: "Is your data trustworthy? Validate your measurement system.",
                    duration: "60 min",
                    status: "in-progress",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_MSA_Premium.html"
                },
                {
                    id: "mea-002",
                    title: "Descriptive Stats",
                    description: "The heartbeat of your process (Mean, Median, Mode, StDev).",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_DescriptiveStats.html"
                },
                {
                    id: "mea-003",
                    title: "Process Capability (Cp/Cpk)",
                    description: "Can you meet customer specs? The ultimate baseline metrics.",
                    duration: "45 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_ProcessCapability.html"
                },
                {
                    id: "mea-004",
                    title: "Competitive Benchmarking",
                    description: "Gap Analysis vs. World Class standards.",
                    duration: "40 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_Benchmarking.html"
                },
                {
                    id: "mea-005",
                    title: "Distribution Lab",
                    description: "Test for Normality. Is your data skewed?",
                    duration: "35 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_DistributionPowerLab.html"
                },
                {
                    id: "mea-006",
                    title: "Sigma Level Calculator",
                    description: "DPMO, Z-Score, Yield.",
                    duration: "20 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_SigmaLevel.html"
                },
                {
                    id: "mea-007",
                    title: "Histogram Tool",
                    description: "Visual distribution check.",
                    duration: "25 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_Histogram.html"
                },
                {
                    id: "mea-008",
                    title: "Box & Whisker Plot",
                    description: "Visual spread & outliers.",
                    duration: "25 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_BoxPlot.html"
                },
                {
                    id: "mea-009",
                    title: "Value Stream Map (VSM)",
                    description: "See the flow. Visualize Value vs. Waste in the total line.",
                    duration: "90 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_VSM.html"
                },
                {
                    id: "mea-010",
                    title: "Modern RACI Matrix",
                    description: "Define clear Governance & Accountability.",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_RACI_Premium.html"
                },
                {
                    id: "mea-011",
                    title: "CTQ Tree",
                    description: "Critical to Quality drivers.",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=ctq"
                },
                {
                    id: "mea-012",
                    title: "Spaghetti Diagram",
                    description: "Motion waste analysis. Trace the path.",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=spaghetti"
                }
            ]
        },
        {
            id: "analyze",
            title: "3. ANALYZE",
            description: "Root Cause, Hypothesis, FMEA",
            progress: 0,
            lessons: [
                {
                    id: "ana-001",
                    title: "Hypothesis Wizard (Premium)",
                    description: "Choose right test & p-value.",
                    duration: "45 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_HypothesisWizard_Premium.html"
                },
                {
                    id: "ana-002",
                    title: "DFMEA Risk Manager",
                    description: "Failure Mode Effects Analysis.",
                    duration: "60 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_DFMEA_Premium.html"
                },
                {
                    id: "ana-003",
                    title: "Pareto Analysis (80/20)",
                    description: "Focus on vital few.",
                    duration: "25 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ParetoAnalysis.html"
                },
                {
                    id: "ana-004",
                    title: "Fishbone Diagram",
                    description: "Brainstorm causes (Man, Machine, Material, Method).",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=fishbone"
                },
                {
                    id: "ana-005",
                    title: "5 Whys Analysis",
                    description: "Drill down past symptoms to the true root cause.",
                    duration: "20 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=5whys"
                },
                {
                    id: "ana-006",
                    title: "t-Test Analysis",
                    description: "Compare 2 groups.",
                    duration: "45 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_tTest.html"
                },
                {
                    id: "ana-007",
                    title: "ANOVA / F-Test",
                    description: "Compare 3+ groups/var.",
                    duration: "50 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_ANOVA.html"
                },
                {
                    id: "ana-008",
                    title: "Chi-Square Test",
                    description: "Categorical data test.",
                    duration: "40 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_ChiSquare.html"
                },
                {
                    id: "ana-009",
                    title: "Regression & Trends",
                    description: "Correlation & Scatter.",
                    duration: "45 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_Regression.html"
                },
                {
                    id: "ana-010",
                    title: "Advanced Analytics (MVA)",
                    description: "Clustering/Deep stats.",
                    duration: "60 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_AdvancedAnalytics.html"
                },
                {
                    id: "ana-011",
                    title: "Swimlane Diagram",
                    description: "Cross-functional flow.",
                    duration: "35 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_Swimlane_Advanced.html"
                },
                {
                    id: "ana-012",
                    title: "SWOT Analysis",
                    description: "Strategic assessment.",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=swot"
                }
            ]
        },
        {
            id: "improve",
            title: "4. IMPROVE",
            description: "Solutions, DOE, Implementation",
            progress: 0,
            lessons: [
                {
                    id: "imp-001",
                    title: "Brainstorming Board",
                    description: "Divergent thinking. Generate 50+ ideas.",
                    duration: "40 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=affinity"
                },
                {
                    id: "imp-002",
                    title: "Cost Benefit Analysis",
                    description: "Does the ROI justify the cost?",
                    duration: "35 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_Financials_ROI.html"
                },
                {
                    id: "imp-003",
                    title: "Poka-Yoke Architect",
                    description: "Mistake-proofing the new design. Zero defect focus.",
                    duration: "45 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_PokaYoke_Premium.html"
                },
                {
                    id: "imp-004",
                    title: "DOE Optimizer",
                    description: "Design of Experiments. Find perfect settings mathematically.",
                    duration: "75 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_DOE_Premium.html"
                },
                {
                    id: "imp-005",
                    title: "Forecast & Trend",
                    description: "Predict future states.",
                    duration: "40 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_Forecast.html"
                },
                {
                    id: "imp-006",
                    title: "Sample Size Calculator",
                    description: "Validation sizing.",
                    duration: "25 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_SampleSize.html"
                },
                {
                    id: "imp-007",
                    title: "MoSCoW Rules",
                    description: "Prioritization (Must, Should, Could, Won't).",
                    duration: "20 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=moscow"
                },
                {
                    id: "imp-008",
                    title: "5S Checklist",
                    description: "Workplace organization.",
                    duration: "45 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=5s"
                }
            ]
        },
        {
            id: "control",
            title: "5. CONTROL",
            description: "SPC, Control Plans, Sustaining",
            progress: 0,
            lessons: [
                {
                    id: "con-001",
                    title: "Control Charts (SPC)",
                    description: "Is the improved process stable? Monitor with Xbar-R / I-MR lines.",
                    duration: "50 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_ControlCharts.html"
                },
                {
                    id: "con-002",
                    title: "Modern Risk Registrar",
                    description: "Proactive threat tracking and mitigation management.",
                    duration: "40 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_RiskRegistrar_Premium.html"
                },
                {
                    id: "con-003",
                    title: "Professional SOP Engine",
                    description: "Standardizing the 'New Way' for sustainable quality.",
                    duration: "40 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_SOP_Premium.html"
                },
                {
                    id: "con-004",
                    title: "A3 Problem Solving",
                    description: "Final project summary on one page.",
                    duration: "35 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=a3"
                },
                {
                    id: "con-005",
                    title: "Project Certification",
                    description: "Generate transcript & sign-off.",
                    duration: "20 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ExamEngine.html"
                }
            ]
        }
    ],
    dmadv: [
        PHASE_0,
        {
            id: "define-dmadv",
            title: "1. DEFINE",
            description: "Charter, VOC, and Market Segmentation. (2-3 Weeks)",
            progress: 0,
            lessons: [
                {
                    id: "dd-001",
                    title: "Project Charter & Scope",
                    description: "Define problem, scope, and goals. (YB)",
                    duration: "45 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ProjectCharter_Premium.html"
                },
                {
                    id: "dd-002",
                    title: "Stakeholder Map & RACI",
                    description: "Identify who is impacted and responsible. (YB)",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_RACI_Premium.html"
                },
                {
                    id: "dd-003",
                    title: "SIPOC Diagram",
                    description: "High-level process boundary. (GB)",
                    duration: "25 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=sipoc"
                },
                {
                    id: "dd-004",
                    title: "VOC Plan & Themes (VOC Tree)",
                    description: "Gather and organize customer needs using a visual tree. (GB)",
                    duration: "40 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=ctq"
                },
                {
                    id: "dd-005",
                    title: "Competitive Benchmarking",
                    description: "Voice of Business & Market approach. GAP analysis. (BB)",
                    duration: "45 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_Benchmarking.html"
                }
            ]
        },
        {
            id: "measure-dmadv",
            title: "2. MEASURE",
            description: "CTQ Flowdown, Kano, and QFD. (2-3 Weeks)",
            progress: 0,
            lessons: [
                {
                    id: "dm-001",
                    title: "CTQ Tree (Advanced)",
                    description: "Translate needs to measurable CTQs. (YB)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=ctq"
                },
                {
                    id: "dm-002",
                    title: "Kano Model",
                    description: "Classify features: Must-have vs Delighters. (GB)",
                    duration: "45 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_KanoModel.html"
                },
                {
                    id: "dm-003",
                    title: "Design Scorecard (QFD)",
                    description: "Weighted CTQs and targets strategy. (BB)",
                    duration: "60 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_QFD_HouseOfQuality.html"
                }
            ]
        },
        {
            id: "analyze-dmadv",
            title: "3. ANALYZE",
            description: "Brainstorming, Pugh Matrix, and TRIZ. (3-4 Weeks)",
            progress: 0,
            lessons: [
                {
                    id: "da-001",
                    title: "Concept Brainstorming",
                    description: "Generate 3-5 design concepts. (YB)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=affinity"
                },
                {
                    id: "da-002",
                    title: "Pugh Matrix Selection",
                    description: "Score concepts against a baseline design. (GB)",
                    duration: "35 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_PughMatrix_Premium.html"
                },
                {
                    id: "da-003",
                    title: "Risk Scan (Mini-FMEA)",
                    description: "Early identification of failure modes. (GB)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_MiniFMEA_Premium.html"
                },
                {
                    id: "da-004",
                    title: "TRIZ / Trade-offs",
                    description: "Innovative complex problem solving using 40 principles. (BB)",
                    duration: "60 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_SpecializedEngineering.html"
                }
            ]
        },
        {
            id: "design-dmadv",
            title: "4. DESIGN",
            description: "DFMEA and Robust Parameter Design. (4-6 Weeks)",
            progress: 0,
            lessons: [
                {
                    id: "dg-001",
                    title: "Visual Blueprint (Flowchart)",
                    description: "Review detailed process/service map. (YB)",
                    duration: "35 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_Swimlane_Advanced.html"
                },
                {
                    id: "dg-002",
                    title: "Prototype Plan (Gantt)",
                    description: "Plan for building and testing prototypes. (YB)",
                    duration: "40 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_GanttChart.html"
                },
                {
                    id: "dg-003",
                    title: "DFMEA Premium (Detailed)",
                    description: "Detailed design failure risk assessment. (GB)",
                    duration: "60 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_DFMEA_Premium.html"
                },
                {
                    id: "dg-004",
                    title: "Design Specs",
                    description: "Detailed specifications tied to CTQs. (GB)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_SOP_Premium.html"
                },
                {
                    id: "dg-005",
                    title: "DOE Optimizer (Robust Design)",
                    description: "Optimize parameters for reduced variation. (BB)",
                    duration: "75 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_DOE_Premium.html"
                }
            ]
        },
        {
            id: "verify-dmadv",
            title: "5. VERIFY",
            description: "DVP&R and Validation Pilots. (3-4 Weeks)",
            progress: 0,
            lessons: [
                {
                    id: "dv-001",
                    title: "Control Plan",
                    description: "Basic control & monitoring plan. (YB)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_RiskRegistrar_Premium.html"
                },
                {
                    id: "dv-002",
                    title: "Before/After Verification",
                    description: "Review pilot execution metrics. (YB)",
                    duration: "35 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_BeforeAfter_Premium.html"
                },
                {
                    id: "dv-003",
                    title: "DVP&R / Pilot Report",
                    description: "Design Verification Plan & Report. (GB)",
                    duration: "45 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_DVPR_Premium.html"
                },
                {
                    id: "dv-004",
                    title: "Reliability Testing (Monte Carlo)",
                    description: "Stress tests and scale-up planning via simulation. (BB)",
                    duration: "60 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_AdvancedAnalytics.html"
                }
            ]
        }
    ],
    kaizen: [
        PHASE_0,
        {
            id: "kaizen-kickoff",
            title: "1. KICKOFF & CURRENT STATE",
            description: "Charter, Gemba, Waste ID (Day 1). Map the Process & Identify Waste.",
            progress: 0,
            lessons: [
                {
                    id: "kz-001",
                    title: "Kickoff: Event Charter",
                    description: "Roles, Goals & Scope (2 hrs). (YB)",
                    duration: "2 hrs",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ProjectCharter_Premium.html"
                },
                {
                    id: "kz-002",
                    title: "SIPOC & Process Map",
                    description: "Define boundaries (2 hrs). (YB)",
                    duration: "2 hrs",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=sipoc"
                },
                {
                    id: "kz-003",
                    title: "Gemba Walk: Waste ID",
                    description: "Observe DOWNTIME (2 hrs). (YB)",
                    duration: "2 hrs",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_KaizenGemba_Premium.html"
                }
            ]
        },
        {
            id: "kaizen-analyze",
            title: "2. ANALYZE & BRAINSTORM",
            description: "Root Cause, 5 Whys, and Solutions.",
            progress: 0,
            lessons: [
                {
                    id: "kz-004",
                    title: "Fishbone (Root Cause)",
                    description: "Find root causes (2 hrs). (YB)",
                    duration: "2 hrs",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=fishbone"
                },
                {
                    id: "kz-005",
                    title: "Brainstorming Solutions",
                    description: "Generate potential intervention options (2 hrs). (YB)",
                    duration: "2 hrs",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=affinity"
                },
                {
                    id: "kz-006",
                    title: "Prioritization Matrix",
                    description: "Impact vs Effort (1 hr). (GB)",
                    duration: "1 hr",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_KaizenPrioritization_Premium.html"
                }
            ]
        },
        {
            id: "kaizen-implement",
            title: "3. IMPLEMENT (Act)",
            description: "Execute, 5S, and Standard Work.",
            progress: 0,
            lessons: [
                {
                    id: "kz-007",
                    title: "5S Event (Audit)",
                    description: "Sort, Set, Shine (Workspace). (YB)",
                    duration: "4 hrs",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=5s"
                },
                {
                    id: "kz-008",
                    title: "New Standard Work",
                    description: "Document the new process. (YB)",
                    duration: "2 hrs",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_SOP_Premium.html"
                }
            ]
        },
        {
            id: "kaizen-verify",
            title: "4. VERIFY & CLOSE",
            description: "Results, Celebration, and Handover.",
            progress: 0,
            lessons: [
                {
                    id: "kz-009",
                    title: "Verify: Metrics",
                    description: "Time study & Defect counts. (YB)",
                    duration: "1 hr",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_KaizenVerify_Premium.html"
                },
                {
                    id: "kz-010",
                    title: "A3 Report Out",
                    description: "Summarize and celebrate celebrate. (GB)",
                    duration: "1 hr",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=a3"
                }
            ]
        }
    ],
    focus: [
        PHASE_0,
        {
            id: "focus-f",
            title: "1. FIND (F)",
            description: "Identify process, Problem Statement, and Baseline.",
            progress: 0,
            lessons: [
                {
                    id: "f-001",
                    title: "Problem Statement & Aim",
                    description: "Define impact/goal (SMART). (STEP 1)",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ProjectTriage.html"
                },
                {
                    id: "f-002",
                    title: "Pareto Analysis (80/20)",
                    description: "Select 'vital few' opportunities. (STEP 1)",
                    duration: "25 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ParetoAnalysis.html"
                },
                {
                    id: "f-003",
                    title: "Baseline KPI List (CTQ)",
                    description: "Define Y metric baseline. (STEP 1)",
                    duration: "30 min",
                    status: "available",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=ctq"
                }
            ]
        },
        {
            id: "focus-o",
            title: "2. ORGANIZE (O)",
            description: "Team, Roles, and Stakeholders.",
            progress: 0,
            lessons: [
                {
                    id: "o-001",
                    title: "Team Charter (RACI)",
                    description: "Assign roles & cadence. (STEP 2)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_RACI_Premium.html"
                },
                {
                    id: "o-002",
                    title: "Stakeholder Map",
                    description: "Communication plan. (STEP 2)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_StakeholderAnalysis.html"
                }
            ]
        },
        {
            id: "focus-c",
            title: "3. CLARIFY (C)",
            description: "Process Map, Current State, and Data Plan.",
            progress: 0,
            lessons: [
                {
                    id: "c-001",
                    title: "SIPOC / Process Map",
                    description: "Map workflow & handoffs. (STEP 3)",
                    duration: "40 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=sipoc"
                },
                {
                    id: "c-002",
                    title: "Swimlane Map",
                    description: "Clarify roles & handoffs. (STEP 3)",
                    duration: "45 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_Swimlane_Advanced.html"
                }
            ]
        },
        {
            id: "focus-u",
            title: "4. UNDERSTAND (U)",
            description: "Root Cause, Variation, and Stratification.",
            progress: 0,
            lessons: [
                {
                    id: "u-001",
                    title: "Fishbone Diagram",
                    description: "Identify potential causes. (STEP 4)",
                    duration: "35 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=fishbone"
                },
                {
                    id: "u-002",
                    title: "5 Whys Analysis",
                    description: "Drill to root cause. (STEP 4)",
                    duration: "20 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=5whys"
                }
            ]
        },
        {
            id: "focus-s",
            title: "5. SELECT (S)",
            description: "Intervention, Prioritization, and Risk.",
            progress: 0,
            lessons: [
                {
                    id: "s-001",
                    title: "Solution Prioritization",
                    description: "PICK Matrix (Impact vs Effort). (STEP 5)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_KaizenPrioritization_Premium.html"
                },
                {
                    id: "s-002",
                    title: "Risk Review (Mini-FMEA)",
                    description: "Assess risk of intervention. (STEP 5)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_MiniFMEA_Premium.html"
                }
            ]
        },
        {
            id: "focus-p",
            title: "6. PLAN (P)",
            description: "Pilot Plan, Measures, and Tasks.",
            progress: 0,
            lessons: [
                {
                    id: "p-001",
                    title: "Implementation Plan",
                    description: "Tasks, Owners, Dates. (STEP 6)",
                    duration: "40 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_ImplementationPlan_Premium.html"
                }
            ]
        },
        {
            id: "focus-do",
            title: "7. DO (D)",
            description: "Execute Pilot and Capture Data.",
            progress: 0,
            lessons: [
                {
                    id: "do-001",
                    title: "Pilot Execution (Train & Run)",
                    description: "Train staff & log pilot results. (STEP 7)",
                    duration: "60 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_PilotExecution_Premium.html"
                },
                {
                    id: "do-002",
                    title: "Draft Standard Work",
                    description: "Initial SOP draft. (STEP 7)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_SOP_Premium.html"
                }
            ]
        },
        {
            id: "focus-check",
            title: "8. CHECK (C)",
            description: "Compare Results and Run Charts.",
            progress: 0,
            lessons: [
                {
                    id: "k-001",
                    title: "Run Chart / Control Chart",
                    description: "Check trend & stability. (STEP 8)",
                    duration: "45 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Calculator_ControlCharts.html"
                },
                {
                    id: "k-002",
                    title: "Before / After Analysis",
                    description: "Verify KPI improvement. (STEP 8)",
                    duration: "30 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_BeforeAfter_Premium.html"
                }
            ]
        },
        {
            id: "focus-act",
            title: "9. ACT (A)",
            description: "Standardize, Sustain, and Scale.",
            progress: 0,
            lessons: [
                {
                    id: "a-001",
                    title: "Control Plan",
                    description: "Reaction plan & monitoring. (STEP 9)",
                    duration: "40 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_RiskRegistrar_Premium.html"
                },
                {
                    id: "a-002",
                    title: "Audit Checklist",
                    description: "Verify sustainability. (STEP 9)",
                    duration: "20 min",
                    status: "locked",
                    type: "tool",
                    toolUrl: "/04-STATISTICS-TOOLS/Tool_KaizenVerify_Premium.html"
                }
            ]
        }
    ]
};

export const CURRICULUM = FRAMEWORKS.dmaic;
