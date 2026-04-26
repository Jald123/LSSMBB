export type AchievementRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
export type AchievementCategory = 
    | "BELTS" 
    | "PM" 
    | "LEADERSHIP" 
    | "ANALYTICS" 
    | "OPS" 
    | "DFSS" 
    | "KAIZEN" 
    | "PDCA" 
    | "STREAK" 
    | "SOCIAL";

export type AchievementType = "CERTIFICATE" | "BADGE";

export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: AchievementCategory;
    type: AchievementType;
    icon: string;
    unlockedAt?: string;
    rarity: AchievementRarity;
    reqValue: number;
    currentValue: number;
    prerequisiteId?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
    // --- 🥋 LEAN SIX SIGMA BELT PATHWAY ---
    {
        id: "cert-lss-white",
        title: "Lean Six Sigma White Belt",
        description: "Foundational mastery of Lean Six Sigma principles and Phase 0 completion.",
        category: "BELTS",
        type: "CERTIFICATE",
        icon: "Shield",
        unlockedAt: "2024-04-10T12:00:00Z",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 1
    },
    {
        id: "cert-lss-yellow",
        title: "Lean Six Sigma Yellow Belt",
        description: "Proficiency in DMAIC Define and Measure phases.",
        category: "BELTS",
        type: "CERTIFICATE",
        icon: "Medal",
        rarity: "RARE",
        reqValue: 10,
        currentValue: 4,
        prerequisiteId: "cert-lss-white"
    },
    {
        id: "cert-lss-green",
        title: "Lean Six Sigma Green Belt",
        description: "Full mastery of the DMAIC roadmap and project leadership.",
        category: "BELTS",
        type: "CERTIFICATE",
        icon: "Award",
        rarity: "EPIC",
        reqValue: 24,
        currentValue: 5,
        prerequisiteId: "cert-lss-yellow"
    },
    {
        id: "cert-lss-black",
        title: "Lean Six Sigma Black Belt",
        description: "Expert level practitioner, statistical guru, and enterprise leader.",
        category: "BELTS",
        type: "CERTIFICATE",
        icon: "Trophy",
        rarity: "LEGENDARY",
        reqValue: 40,
        currentValue: 2,
        prerequisiteId: "cert-lss-green"
    },

    // --- 📋 PROJECT MANAGEMENT ---
    {
        id: "cert-pm-essentials",
        title: "Project Management Essentials",
        description: "Core knowledge of project structure, charters, and scoping.",
        category: "PM",
        type: "CERTIFICATE",
        icon: "Target",
        rarity: "COMMON",
        reqValue: 5,
        currentValue: 3
    },
    {
        id: "cert-capm",
        title: "CAPM",
        description: "Certified Associate in Project Management validation.",
        category: "PM",
        type: "CERTIFICATE",
        icon: "Target",
        rarity: "EPIC",
        reqValue: 10,
        currentValue: 1,
        prerequisiteId: "cert-pm-essentials"
    },
    {
        id: "cert-pmp",
        title: "PMP",
        description: "Professional Project Management certification and leadership.",
        category: "PM",
        type: "CERTIFICATE",
        icon: "Rocket",
        rarity: "LEGENDARY",
        reqValue: 20,
        currentValue: 0,
        prerequisiteId: "cert-capm"
    },
    {
        id: "cert-agile",
        title: "Agile Certificate",
        description: "Mastery of iterative delivery and Agile methodologies.",
        category: "PM",
        type: "CERTIFICATE",
        icon: "Zap",
        rarity: "RARE",
        reqValue: 8,
        currentValue: 2
    },
    {
        id: "cert-scrum",
        title: "Scrum Certificate",
        description: "Specialized knowledge of Scrum roles, events, and artifacts.",
        category: "PM",
        type: "CERTIFICATE",
        icon: "Zap",
        rarity: "RARE",
        reqValue: 8,
        currentValue: 0
    },

    // --- 🎯 LEADERSHIP & STRATEGY ---
    {
        id: "cert-change-mgmt",
        title: "Change Management Certificate",
        description: "Mastering the human side of operational transitions.",
        category: "LEADERSHIP",
        type: "CERTIFICATE",
        icon: "Users",
        rarity: "RARE",
        reqValue: 12,
        currentValue: 2
    },
    {
        id: "cert-leadership",
        title: "Leadership Certificate",
        description: "Strategic team management and vision execution.",
        category: "LEADERSHIP",
        type: "CERTIFICATE",
        icon: "Shield",
        rarity: "EPIC",
        reqValue: 15,
        currentValue: 0
    },
    {
        id: "cert-exec-leadership",
        title: "Executive Leadership Program",
        description: "Enterprise-wide strategic guidance and cultural transformation.",
        category: "LEADERSHIP",
        type: "CERTIFICATE",
        icon: "Trophy",
        rarity: "LEGENDARY",
        reqValue: 30,
        currentValue: 0,
        prerequisiteId: "cert-leadership"
    },
    {
        id: "cert-strategic-mgmt",
        title: "Strategic Management Certificate",
        description: "Long-term planning and organizational alignment.",
        category: "LEADERSHIP",
        type: "CERTIFICATE",
        icon: "Map",
        rarity: "EPIC",
        reqValue: 12,
        currentValue: 0
    },
    {
        id: "cert-coaching",
        title: "Coaching and Mentoring Certificate",
        description: "Developing peers and fostering a culture of excellence.",
        category: "LEADERSHIP",
        type: "CERTIFICATE",
        icon: "Users",
        rarity: "RARE",
        reqValue: 10,
        currentValue: 0
    },

    // --- 📊 DATA & ANALYTICS ---
    {
        id: "cert-ba",
        title: "Business Analysis Certificate",
        description: "Bridging business needs with operational capabilities.",
        category: "ANALYTICS",
        type: "CERTIFICATE",
        icon: "Search",
        rarity: "RARE",
        reqValue: 12,
        currentValue: 4
    },
    {
        id: "cert-data-analytics",
        title: "Data Analytics Certificate",
        description: "Transforming raw numbers into actionable insights.",
        category: "ANALYTICS",
        type: "CERTIFICATE",
        icon: "BarChart",
        rarity: "EPIC",
        reqValue: 15,
        currentValue: 0
    },
    {
        id: "cert-stats",
        title: "Statistics Certificate",
        description: "Mastery of descriptive and inferential statistics.",
        category: "ANALYTICS",
        type: "CERTIFICATE",
        icon: "Calculator",
        rarity: "EPIC",
        reqValue: 18,
        currentValue: 3
    },
    {
        id: "cert-adv-stats",
        title: "Advanced Statistics Certificate",
        description: "Expertise in hypothesis testing, regression, and ANOVA.",
        category: "ANALYTICS",
        type: "CERTIFICATE",
        icon: "Zap",
        rarity: "LEGENDARY",
        reqValue: 20,
        currentValue: 0,
        prerequisiteId: "cert-stats"
    },
    {
        id: "cert-doe",
        title: "DOE Certificate",
        description: "Expertise in Design of Experiments and multivariate analysis.",
        category: "ANALYTICS",
        type: "CERTIFICATE",
        icon: "FlaskConical",
        rarity: "LEGENDARY",
        reqValue: 15,
        currentValue: 0
    },
    {
        id: "cert-finance-nonfin",
        title: "Finance for Non-Financial Managers",
        description: "Understanding ROI, cost-benefit, and financial impact.",
        category: "ANALYTICS",
        type: "CERTIFICATE",
        icon: "PieChart",
        rarity: "RARE",
        reqValue: 10,
        currentValue: 0
    },

    // --- ⚙️ OPERATIONAL EXCELLENCE ---
    {
        id: "cert-lean-leadership",
        title: "Lean Leadership Certificate",
        description: "Pioneering the Lean culture and waste elimination.",
        category: "OPS",
        type: "CERTIFICATE",
        icon: "Zap",
        rarity: "EPIC",
        reqValue: 15,
        currentValue: 0
    },
    {
        id: "cert-op-ex",
        title: "Operational Excellence Certificate",
        description: "Synchronizing systems for peak performance.",
        category: "OPS",
        type: "CERTIFICATE",
        icon: "Trophy",
        rarity: "LEGENDARY",
        reqValue: 25,
        currentValue: 0
    },
    {
        id: "cert-quality-mgmt",
        title: "Quality Management Certificate",
        description: "Mastering quality systems and compliance standards.",
        category: "OPS",
        type: "CERTIFICATE",
        icon: "Shield",
        rarity: "EPIC",
        reqValue: 15,
        currentValue: 0
    },
    {
        id: "cert-product-dev",
        title: "Product Development Certificate",
        description: "Optimizing the lifecycle from concept to launch.",
        category: "OPS",
        type: "CERTIFICATE",
        icon: "Rocket",
        rarity: "RARE",
        reqValue: 10,
        currentValue: 0
    },
    {
        id: "cert-quality-eng",
        title: "Quality Engineering Certificate",
        description: "Technical validation and performance engineering.",
        category: "OPS",
        type: "CERTIFICATE",
        icon: "Settings",
        rarity: "EPIC",
        reqValue: 15,
        currentValue: 0
    },
    {
        id: "cert-risk-mgmt",
        title: "Risk Management Certificate",
        description: "Identifying, assessing, and mitigating operational risks.",
        category: "OPS",
        type: "CERTIFICATE",
        icon: "ShieldAlert",
        rarity: "RARE",
        reqValue: 10,
        currentValue: 0
    },

    // --- 🔬 DFSS & DESIGN ---
    {
        id: "cert-dfss-full",
        title: "Design for Six Sigma Certificate",
        description: "Expert level mastery of DMADV and design protocols.",
        category: "DFSS",
        type: "CERTIFICATE",
        icon: "FlaskConical",
        rarity: "LEGENDARY",
        reqValue: 30,
        currentValue: 0
    },
    {
        id: "cert-dfss-core",
        title: "DFSS Certificate",
        description: "Core proficiency in Design for Six Sigma tools.",
        category: "DFSS",
        type: "CERTIFICATE",
        icon: "FlaskConical",
        rarity: "EPIC",
        reqValue: 15,
        currentValue: 0
    },
    {
        id: "badge-dmadv",
        title: "DMADV Practitioner Badge",
        description: "Practical application of the DMADV framework.",
        category: "DFSS",
        type: "BADGE",
        icon: "Shield",
        rarity: "EPIC",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-dfss-designer",
        title: "DFSS Designer Badge",
        description: "Utilizing 3+ DFSS design tools effectively.",
        category: "DFSS",
        type: "BADGE",
        icon: "Box",
        rarity: "RARE",
        reqValue: 3,
        currentValue: 1
    },
    {
        id: "badge-process-designer",
        title: "New Process Designer Badge",
        description: "Creation of a new process from scratch in a mission.",
        category: "DFSS",
        type: "BADGE",
        icon: "Cpu",
        rarity: "RARE",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-ctq",
        title: "CTQ Analysis Badge",
        description: "Successful flowdown of Critical-to-Quality requirements.",
        category: "DFSS",
        type: "BADGE",
        icon: "Target",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-vv",
        title: "Verification and Validation Badge",
        description: "Completing V&V protocols in operational simulations.",
        category: "DFSS",
        type: "BADGE",
        icon: "CheckCircle",
        rarity: "RARE",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-pilot",
        title: "Pilot Test Completion Badge",
        description: "Successful execution of a pilot test simulation.",
        category: "DFSS",
        type: "BADGE",
        icon: "Rocket",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 0
    },

    // --- ⚡ KAIZEN & CONTINUOUS IMPROVEMENT ---
    {
        id: "cert-kaizen-leader",
        title: "Kaizen Leader Certificate",
        description: "Demonstrated excellence in leading rapid improvement events.",
        category: "KAIZEN",
        type: "CERTIFICATE",
        icon: "Award",
        rarity: "EPIC",
        reqValue: 3,
        currentValue: 1
    },
    {
        id: "cert-lean-facilitator",
        title: "Lean Facilitator Certificate",
        description: "Expert facilitator of Lean workshops and team sessions.",
        category: "KAIZEN",
        type: "CERTIFICATE",
        icon: "Users",
        rarity: "RARE",
        reqValue: 2,
        currentValue: 0
    },
    {
        id: "cert-ci",
        title: "Continuous Improvement Certificate",
        description: "Championing a culture of perpetual bettering.",
        category: "KAIZEN",
        type: "CERTIFICATE",
        icon: "TrendingUp",
        rarity: "EPIC",
        reqValue: 10,
        currentValue: 2
    },
    {
        id: "cert-fac-essentials",
        title: "Workshop Facilitation Certificate",
        description: "Core facilitation and team dynamics mastery.",
        category: "KAIZEN",
        type: "CERTIFICATE",
        icon: "Users",
        rarity: "RARE",
        reqValue: 5,
        currentValue: 0
    },
    {
        id: "cert-prob-solving",
        title: "Problem-Solving Certificate",
        description: "Mastery of root cause analysis and A3 thinking.",
        category: "KAIZEN",
        type: "CERTIFICATE",
        icon: "Zap",
        rarity: "RARE",
        reqValue: 10,
        currentValue: 3
    },
    {
        id: "cert-std-work",
        title: "Standard Work Certificate",
        description: "Optimization and documentation of process standards.",
        category: "KAIZEN",
        type: "CERTIFICATE",
        icon: "FileText",
        rarity: "COMMON",
        reqValue: 5,
        currentValue: 1
    },
    {
        id: "badge-kaizen-leader",
        title: "Kaizen Event Leader Badge",
        description: "Leading a successful Kaizen event simulation.",
        category: "KAIZEN",
        type: "BADGE",
        icon: "Trophy",
        rarity: "EPIC",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-kaizen-fac",
        title: "Kaizen Facilitator Badge",
        description: "Facilitating a large-scale Kaizen workshop.",
        category: "KAIZEN",
        type: "BADGE",
        icon: "Users",
        rarity: "RARE",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-rapid-imp",
        title: "Rapid Improvement Badge",
        description: "Completing a localized rapid improvement cycle.",
        category: "KAIZEN",
        type: "BADGE",
        icon: "Zap",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-team-imp",
        title: "Team Improvement Badge",
        description: "Leading a team through a successful 5S event.",
        category: "KAIZEN",
        type: "BADGE",
        icon: "Users",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-workshop-delivery",
        title: "Workshop Delivery Badge",
        description: "Delivering a full training session simulation.",
        category: "KAIZEN",
        type: "BADGE",
        icon: "Presentation",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-waste",
        title: "Waste Elimination Badge",
        description: "Eliminating 3+ wastes in a single mission.",
        category: "KAIZEN",
        type: "BADGE",
        icon: "Trash2",
        rarity: "COMMON",
        reqValue: 3,
        currentValue: 1
    },
    {
        id: "badge-quick-win",
        title: "Quick Win Badge",
        description: "Implementing an immediate, low-cost improvement.",
        category: "KAIZEN",
        type: "BADGE",
        icon: "Star",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 1,
        unlockedAt: "2024-04-18T15:00:00Z"
    },

    // --- 🔄 PDCA & PROCESS CONTROL ---
    {
        id: "cert-pdca-quality",
        title: "PDCA Quality Improvement Certificate",
        description: "Full mastery of the Deming Cycle and iterative quality.",
        category: "PDCA",
        type: "CERTIFICATE",
        icon: "RefreshCw",
        rarity: "EPIC",
        reqValue: 8,
        currentValue: 1
    },
    {
        id: "cert-cqi",
        title: "Continuous Quality Improvement Certificate",
        description: "Expert level CQI practitioner validation.",
        category: "PDCA",
        type: "CERTIFICATE",
        icon: "Award",
        rarity: "EPIC",
        reqValue: 10,
        currentValue: 0
    },
    {
        id: "cert-healthcare-quality",
        title: "Healthcare Quality Certificate",
        description: "Specialized application of quality tools in clinical settings.",
        category: "PDCA",
        type: "CERTIFICATE",
        icon: "Heart",
        rarity: "RARE",
        reqValue: 12,
        currentValue: 0
    },
    {
        id: "cert-rca",
        title: "Root Cause Analysis Certificate",
        description: "Expert level fishbone and 5-why analyst.",
        category: "PDCA",
        type: "CERTIFICATE",
        icon: "Search",
        rarity: "RARE",
        reqValue: 10,
        currentValue: 0
    },
    {
        id: "cert-process-control",
        title: "Process Control Certificate",
        description: "Statistical Process Control and monitoring mastery.",
        category: "PDCA",
        type: "CERTIFICATE",
        icon: "Activity",
        rarity: "EPIC",
        reqValue: 15,
        currentValue: 0
    },
    {
        id: "cert-audit-compliance",
        title: "Audit and Compliance Certificate",
        description: "Operational auditing and governance standards validation.",
        category: "PDCA",
        type: "CERTIFICATE",
        icon: "ShieldAlert",
        rarity: "RARE",
        reqValue: 10,
        currentValue: 0
    },
    {
        id: "badge-pdca-practitioner",
        title: "PDCA Practitioner Badge",
        description: "Completing a full PDCA cycle in a mission.",
        category: "PDCA",
        type: "BADGE",
        icon: "RefreshCw",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-focus-pdca",
        title: "FOCUS-PDCA Badge",
        description: "Utilizing the clinical FOCUS-PDCA framework.",
        category: "PDCA",
        type: "BADGE",
        icon: "Target",
        rarity: "RARE",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-quality-imp",
        title: "Quality Improvement Badge",
        description: "Measured improvement in a key performance metric.",
        category: "PDCA",
        type: "BADGE",
        icon: "TrendingUp",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-stabilization",
        title: "Process Stabilization Badge",
        description: "Achieving statistical stability in a process.",
        category: "PDCA",
        type: "BADGE",
        icon: "Activity",
        rarity: "RARE",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-ci-consecutive",
        title: "Continuous Improvement Badge",
        description: "3+ consecutive improvement actions without failure.",
        category: "PDCA",
        type: "BADGE",
        icon: "Zap",
        rarity: "COMMON",
        reqValue: 3,
        currentValue: 1
    },
    {
        id: "badge-corrective-action",
        title: "Corrective Action Badge",
        description: "Implementing a permanent corrective action plan.",
        category: "PDCA",
        type: "BADGE",
        icon: "CheckCircle",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 0
    },
    {
        id: "badge-standardization",
        title: "Standardization Badge",
        description: "Formal standardization of an improved process.",
        category: "PDCA",
        type: "BADGE",
        icon: "FileText",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 0
    }
];
