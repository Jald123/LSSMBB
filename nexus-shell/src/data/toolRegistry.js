export const toolRegistry = {
    // --- DEFINE / KICKOFF ---
    'charter': {
        name: 'Project Charter (Premium)',
        src: '/04-STATISTICS-TOOLS/Tool_ProjectCharter_Premium.html',
        phase: 'Define',
        category: 'PROJ. MGMT',
        priority: 1,
        belt: 'YB'
    },
    'event-charter': {
        name: 'Event Charter',
        src: '/04-STATISTICS-TOOLS/Tool_ProjectCharter_Premium.html',
        phase: 'Kickoff',
        category: 'LEAN',
        priority: 1,
        belt: 'YB'
    },
    'stakeholders': {
        name: 'Stakeholder Matrix',
        src: '/04-STATISTICS-TOOLS/Tool_StakeholderAnalysis.html',
        phase: 'Define',
        category: 'PROJ. MGMT',
        priority: 2,
        belt: 'GB'
    },
    'triage': {
        name: 'Project Triage & Scoping',
        src: '/04-STATISTICS-TOOLS/Tool_ProjectTriage.html',
        phase: 'Define',
        category: 'PROJ. MGMT',
        priority: 3,
        belt: 'BB'
    },
    'hoshin': {
        name: 'Hoshin Kanri X-Matrix',
        src: '/04-STATISTICS-TOOLS/Tool_LeanStrategyHub.html',
        phase: 'Define',
        category: 'STRATEGY',
        priority: 1,
        belt: 'BB'
    },
    'sipoc': {
        name: 'SIPOC Diagram',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=sipoc',
        phase: 'Define',
        category: 'SIX SIGMA',
        priority: 1,
        belt: 'YB'
    },
    'qfd': {
        name: 'QFD House of Quality',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=qfd',
        phase: 'Define',
        category: 'SIX SIGMA',
        priority: 2,
        belt: 'GB'
    },
    'swimlane-adv': {
        name: 'Advanced Swimlane Architect',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=swimlane',
        phase: 'Define',
        category: 'LEAN',
        priority: 3,
        belt: 'GB'
    },
    'affinity': {
        name: 'Affinity Diagram',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=affinity',
        phase: 'Define',
        category: 'LEAN',
        priority: 'REC.',
        belt: 'YB'
    },
    'voc-tree': {
        name: 'VOC Plan & Themes',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=ctq',
        phase: 'Define',
        category: 'VOC',
        priority: 'PRIORITY 1',
        belt: 'GB'
    },
    'gantt': {
        name: 'Project Timelines (Gantt)',
        src: '/04-STATISTICS-TOOLS/Tool_GanttChart.html',
        phase: 'Define',
        category: 'PROJ. MGMT',
        priority: 'REC.',
        belt: 'GB'
    },
    'leadership': {
        name: 'Leadership & Management (ADKAR)',
        src: '/04-STATISTICS-TOOLS/Tool_ChangeMgmt_ADKAR.html',
        phase: 'Define',
        category: 'CHANGE MGMT',
        priority: 'OPT.',
        belt: 'BB'
    },

    // --- MEASURE / CURRENT STATE ---
    'msa': {
        name: 'MSA (Gage R&R) Premium',
        src: '/04-STATISTICS-TOOLS/Tool_MSA_Premium.html',
        phase: 'Measure',
        category: 'SIX SIGMA',
        priority: 1,
        belt: 'GB'
    },
    'desc-stats': {
        name: 'Descriptive Stats',
        src: '/04-STATISTICS-TOOLS/Calculator_DescriptiveStats.html',
        phase: 'Measure',
        category: 'SIX SIGMA',
        priority: 2,
        belt: 'YB'
    },
    'capability': {
        name: 'Process Capability (Cp/Cpk)',
        src: '/04-STATISTICS-TOOLS/Calculator_ProcessCapability.html',
        phase: 'Measure',
        category: 'SIX SIGMA',
        priority: 3,
        belt: 'GB'
    },
    'benchmarking': {
        name: 'Competitive Benchmarking',
        src: '/04-STATISTICS-TOOLS/Tool_Benchmarking.html',
        phase: 'Measure',
        category: 'STRATEGY',
        priority: 'REC.',
        belt: 'BB'
    },
    'dist-lab': {
        name: 'Distribution Lab',
        src: '/04-STATISTICS-TOOLS/Tool_DistributionPowerLab.html',
        phase: 'Measure',
        category: 'SIX SIGMA',
        priority: 'REC.',
        belt: 'GB'
    },
    'sigma-calc': {
        name: 'Sigma Level Calculator',
        src: '/04-STATISTICS-TOOLS/Calculator_SigmaLevel.html',
        phase: 'Measure',
        category: 'SIX SIGMA',
        priority: 'OPT.',
        belt: 'YB'
    },
    'histogram': {
        name: 'Histogram Tool',
        src: '/04-STATISTICS-TOOLS/Tool_Histogram.html',
        phase: 'Measure',
        category: 'SIX SIGMA',
        priority: 'OPT.',
        belt: 'YB'
    },
    'boxplot': {
        name: 'Box & Whisker Plot',
        src: '/04-STATISTICS-TOOLS/Tool_BoxPlot.html',
        phase: 'Measure',
        category: 'SIX SIGMA',
        priority: 'OPT.',
        belt: 'GB'
    },
    'kano': {
        name: 'Kano Model',
        src: '/04-STATISTICS-TOOLS/Tool_KanoModel.html',
        phase: 'Measure',
        category: 'VOC',
        priority: 'PRIORITY 2',
        belt: 'GB'
    },
    'vsm': {
        name: 'Value Stream Map (VSM)',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=vsm',
        phase: 'Measure',
        category: 'LEAN',
        priority: 2,
        belt: 'BB'
    },
    'raci': {
        name: 'Modern RACI Matrix',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=raci',
        phase: 'Measure',
        category: 'PROJ. MGMT',
        priority: 2,
        belt: 'YB'
    },
    'ctq': {
        name: 'CTQ Tree (Advanced)',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=ctq',
        phase: 'Measure',
        category: 'SIX SIGMA',
        priority: 'REC.',
        belt: 'GB'
    },
    'spaghetti': {
        name: 'Spaghetti Diagram',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=spaghetti',
        phase: 'Measure',
        category: 'LEAN',
        priority: 'REC.',
        belt: 'YB'
    },
    'gemba': {
        name: 'Gemba Walk: Waste ID',
        src: '/04-STATISTICS-TOOLS/Tool_8Wastes_DOWNTIME.html',
        phase: 'Current State',
        category: 'LEAN',
        priority: 'PRIORITY 1',
        belt: 'YB'
    },

    // --- ANALYZE ---
    'hypothesis': {
        name: 'Hypothesis Wizard (Premium)',
        src: '/04-STATISTICS-TOOLS/Tool_HypothesisWizard_Premium.html',
        phase: 'Analyze',
        category: 'SIX SIGMA',
        priority: 1,
        belt: 'GB'
    },
    'fmea': {
        name: 'DFMEA Risk Manager',
        src: '/04-STATISTICS-TOOLS/Tool_DFMEA_Premium.html',
        phase: 'Analyze',
        category: 'SIX SIGMA',
        priority: 2,
        belt: 'GB'
    },
    'mini-fmea': {
        name: 'Risk Scan (Mini-FMEA)',
        src: '/04-STATISTICS-TOOLS/Tool_MiniFMEA_Premium.html',
        phase: 'Analyze',
        category: 'RISK',
        priority: 'PRIORITY 2',
        belt: 'GB'
    },
    'pareto': {
        name: 'Pareto Analysis (80/20)',
        src: '/04-STATISTICS-TOOLS/Tool_ParetoAnalysis.html',
        phase: 'Analyze',
        category: 'SIX SIGMA',
        priority: 3,
        belt: 'YB'
    },
    'fishbone': {
        name: 'Fishbone Diagram',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=fishbone',
        phase: 'Analyze',
        category: 'ROOT CAUSE',
        priority: 1,
        belt: 'GB'
    },
    '5whys': {
        name: '5 Whys Analysis',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=5whys',
        phase: 'Analyze',
        category: 'ROOT CAUSE',
        priority: 2,
        belt: 'GB'
    },
    'triz': {
        name: 'TRIZ / Trade-offs',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=triz',
        phase: 'Analyze',
        category: 'INNOVATION',
        priority: 'PRIORITY 3',
        belt: 'BB'
    },
    'pugh': {
        name: 'Pugh Matrix',
        src: '/04-STATISTICS-TOOLS/Tool_PughMatrix_Premium.html',
        phase: 'Analyze',
        category: 'SELECTION',
        priority: 'PRIORITY 2',
        belt: 'GB'
    },
    'ttest': {
        name: 't-Test Analysis',
        src: '/04-STATISTICS-TOOLS/Calculator_tTest.html',
        phase: 'Analyze',
        category: 'SIX SIGMA',
        priority: 'REC.',
        belt: 'GB'
    },
    'anova': {
        name: 'ANOVA / F-Test',
        src: '/04-STATISTICS-TOOLS/Calculator_ANOVA.html',
        phase: 'Analyze',
        category: 'SIX SIGMA',
        priority: 'REC.',
        belt: 'BB'
    },
    'chisquare': {
        name: 'Chi-Square Test',
        src: '/04-STATISTICS-TOOLS/Calculator_ChiSquare.html',
        phase: 'Analyze',
        category: 'SIX SIGMA',
        priority: 'REC.',
        belt: 'GB'
    },
    'regression': {
        name: 'Regression & Trends',
        src: '/04-STATISTICS-TOOLS/Calculator_Regression.html',
        phase: 'Analyze',
        category: 'SIX SIGMA',
        priority: 'REC.',
        belt: 'BB'
    },
    'adv-analytics': {
        name: 'Advanced Analytics (MVA)',
        src: '/04-STATISTICS-TOOLS/Tool_AdvancedAnalytics.html',
        phase: 'Analyze',
        category: 'SIX SIGMA',
        priority: 'OPT.',
        belt: 'BB'
    },
    'swot': {
        name: 'SWOT Analysis',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=swot',
        phase: 'Analyze',
        category: 'STRATEGY',
        priority: 'OPT.',
        belt: 'YB'
    },

    // --- IMPROVE / DESIGN ---
    'brainstorm': {
        name: 'Brainstorming Board',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=brainstorm',
        phase: 'Improve',
        category: 'IDEATION',
        priority: 1,
        belt: 'YB'
    },
    'cba': {
        name: 'Cost Benefit Analysis',
        src: '/04-STATISTICS-TOOLS/Tool_Financials_ROI.html',
        phase: 'Improve',
        category: 'FINANCE',
        priority: 2,
        belt: 'GB'
    },
    'poka-yoke': {
        name: 'Poka-Yoke Architect',
        src: '/04-STATISTICS-TOOLS/Tool_PokaYoke_Premium.html',
        phase: 'Improve',
        category: 'LEAN',
        priority: 1,
        belt: 'YB'
    },
    'doe': {
        name: 'DOE Optimizer',
        src: '/04-STATISTICS-TOOLS/Tool_DOE_Premium.html',
        phase: 'Improve',
        category: 'SIX SIGMA',
        priority: 2,
        belt: 'BB'
    },
    'forecast': {
        name: 'Forecast & Trend',
        src: '/04-STATISTICS-TOOLS/Tool_Forecast.html',
        phase: 'Improve',
        category: 'SIX SIGMA',
        priority: 'OPT.',
        belt: 'GB'
    },
    'samplesize': {
        name: 'Sample Size Calculator',
        src: '/04-STATISTICS-TOOLS/Calculator_SampleSize.html',
        phase: 'Improve',
        category: 'SIX SIGMA',
        priority: 'REC.',
        belt: 'GB'
    },
    'moscow': {
        name: 'MoSCoW Rules',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=moscow',
        phase: 'Improve',
        category: 'PRIORITIZ.',
        priority: 'REC.',
        belt: 'YB'
    },
    '5s': {
        name: '5S Checklist',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=5s',
        phase: 'Improve',
        category: 'LEAN',
        priority: 'REC.',
        belt: 'YB'
    },
    'implementation-plan': {
        name: 'Implementation Plan',
        src: '/04-STATISTICS-TOOLS/Tool_ImplementationPlan_Premium.html',
        phase: 'Improve',
        category: 'PLANNING',
        priority: 'PRIORITY 2',
        belt: 'YB'
    },

    // --- CONTROL / VERIFY ---
    'control-charts': {
        name: 'Control Charts (SPC)',
        src: '/04-STATISTICS-TOOLS/Calculator_ControlCharts.html',
        phase: 'Control',
        category: 'SIX SIGMA',
        priority: 1,
        belt: 'GB'
    },
    'risk-registrar': {
        name: 'Modern Risk Registrar',
        src: '/04-STATISTICS-TOOLS/Tool_RiskRegistrar_Premium.html',
        phase: 'Control',
        category: 'SIX SIGMA',
        priority: 2,
        belt: 'YB'
    },
    'sop': {
        name: "Professional SOP Engine",
        src: '/04-STATISTICS-TOOLS/Tool_SOP_Premium.html',
        phase: 'Control',
        category: 'LEAN',
        priority: 1,
        belt: 'YB'
    },
    'a3': {
        name: 'A3 Report Out',
        src: '/04-STATISTICS-TOOLS/Tool_LeanWorkshop.html?tool=a3',
        phase: 'Control',
        category: 'LEAN',
        priority: 'REC.',
        belt: 'YB'
    },
    'dvpr': {
        name: 'DVP&R / Pilot Report',
        src: '/04-STATISTICS-TOOLS/Tool_DVPR_Premium.html',
        phase: 'Verify',
        category: 'DFSS',
        priority: 'PRIORITY 1',
        belt: 'GB'
    },
    'before-after': {
        name: 'Before/After Verification',
        src: '/04-STATISTICS-TOOLS/Tool_BeforeAfter_Premium.html',
        phase: 'Verify',
        category: 'RESULTS',
        priority: 'PRIORITY 1',
        belt: 'YB'
    },
    'simulation': {
        name: 'Monte Carlo Simulation',
        src: '/04-STATISTICS-TOOLS/Tool_AdvancedAnalytics.html',
        phase: 'Verify',
        category: 'STATS',
        priority: 'PRIORITY 3',
        belt: 'BB'
    },
    'fundamentals': {
        name: 'LSS Fundamentals',
        src: '/04-STATISTICS-TOOLS/Tool_LSS_Fundamentals.html',
        phase: 'Foundation',
        category: 'BASICS',
        priority: 1,
        belt: 'WB'
    },
    'exam-engine': {
        name: 'Certification Exam Engine',
        src: '/04-STATISTICS-TOOLS/Tool_ExamEngine.html',
        phase: 'Armory',
        category: 'TESTING',
        priority: 1,
        belt: 'BB'
    },
    // Alias for 'adv-analytics' to support legacy links
    'advanced-analytics': {
        name: 'Advanced Analytics (MVA)',
        src: '/04-STATISTICS-TOOLS/Tool_AdvancedAnalytics.html',
        phase: 'Analyze',
        category: 'SIX SIGMA',
        priority: 'OPT.',
        belt: 'BB'
    }
};
