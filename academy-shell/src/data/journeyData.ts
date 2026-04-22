interface PhaseTool {
    id: string;
    name: string;
    category: string;
    priority: string;
    belt: string;
}

interface Phase {
    title: string;
    subtitle: string;
    description: string;
    skills: string[];
    tools: PhaseTool[];
}

type Methodology = Record<string, Phase>;

export const methodologyData: Record<string, Methodology> = {
    'DMAIC': {
        'define': {
            title: 'Define',
            subtitle: 'Problem Scoping',
            description: 'Clarify the problem, identify stakeholders, and set the scope.',
            skills: ['Problem Scoping', 'Stakeholder Management', 'Process Mapping', 'Voice of Customer (VOC)'],
            tools: [
                { id: 'charter', name: 'Project Charter', category: 'PROJ. MGMT', priority: '1', belt: 'YB' },
                { id: 'stakeholders', name: 'Stakeholder Matrix', category: 'PROJ. MGMT', priority: '2', belt: 'GB' },
                { id: 'triage', name: 'Project Triage', category: 'PROJ. MGMT', priority: '3', belt: 'BB' },
                { id: 'hoshin', name: 'Hoshin Kanri X-Matrix', category: 'STRATEGY', priority: '1', belt: 'BB' },
                { id: 'sipoc', name: 'SIPOC Diagram', category: 'SIX SIGMA', priority: '1', belt: 'YB' },
                { id: 'qfd', name: 'QFD House of Quality', category: 'SIX SIGMA', priority: '2', belt: 'GB' },
                { id: 'swimlane-adv', name: 'Advanced Swimlane', category: 'LEAN', priority: '3', belt: 'GB' },
                { id: 'affinity', name: 'Affinity Diagram', category: 'LEAN', priority: 'REC.', belt: 'YB' },
                { id: 'gantt', name: 'Project Timelines', category: 'PROJ. MGMT', priority: 'REC.', belt: 'GB' },
                { id: 'leadership', name: 'Leadership & ADKAR', category: 'CHANGE MGMT', priority: 'OPT.', belt: 'BB' },
            ]
        },
        'measure': {
            title: 'Measure',
            subtitle: 'Data Collection',
            description: 'Validate measurement systems and establish current state performance.',
            skills: ['Data Collection', 'Measurement Reliability', 'Baseline Performance', 'Basic Statistics'],
            tools: [
                { id: 'msa', name: 'MSA (Gage R&R)', category: 'SIX SIGMA', priority: '1', belt: 'GB' },
                { id: 'desc-stats', name: 'Descriptive Stats', category: 'SIX SIGMA', priority: '2', belt: 'YB' },
                { id: 'capability', name: 'Process Capability', category: 'SIX SIGMA', priority: '3', belt: 'GB' },
                { id: 'benchmarking', name: 'Benchmarking', category: 'STRATEGY', priority: 'REC.', belt: 'BB' },
                { id: 'dist-lab', name: 'Distribution Lab', category: 'SIX SIGMA', priority: 'REC.', belt: 'GB' },
                { id: 'sigma-calc', name: 'Sigma Level Calc', category: 'SIX SIGMA', priority: 'OPT.', belt: 'YB' },
                { id: 'histogram', name: 'Histogram Tool', category: 'SIX SIGMA', priority: 'OPT.', belt: 'YB' },
                { id: 'boxplot', name: 'Box & Whisker', category: 'SIX SIGMA', priority: 'OPT.', belt: 'GB' },
                { id: 'vsm', name: 'Value Stream Map', category: 'LEAN', priority: '2', belt: 'BB' },
                { id: 'raci', name: 'Modern RACI', category: 'PROJ. MGMT', priority: '2', belt: 'YB' },
                { id: 'ctq', name: 'CTQ Tree', category: 'SIX SIGMA', priority: 'REC.', belt: 'GB' },
                { id: 'spaghetti', name: 'Spaghetti Diagram', category: 'LEAN', priority: 'REC.', belt: 'YB' },
            ]
        },
        'analyze': {
            title: 'Analyze',
            subtitle: 'Root Cause Discovery',
            description: 'Use statistical rigor to confirm the vital few root causes.',
            skills: ['Root Cause Analysis', 'Hypothesis Testing', 'Risk Management', 'Data Interpretation'],
            tools: [
                { id: 'hypothesis', name: 'Hypothesis Wizard', category: 'SIX SIGMA', priority: '1', belt: 'GB' },
                { id: 'fmea', name: 'DFMEA Risk Manager', category: 'SIX SIGMA', priority: '2', belt: 'GB' },
                { id: 'pareto', name: 'Pareto (80/20)', category: 'SIX SIGMA', priority: '3', belt: 'YB' },
                { id: 'fishbone', name: 'Fishbone Diagram', category: 'ROOT CAUSE', priority: '1', belt: 'YB' },
                { id: '5whys', name: '5 Whys Analysis', category: 'ROOT CAUSE', priority: '2', belt: 'YB' },
                { id: 'ttest', name: 't-Test Analysis', category: 'SIX SIGMA', priority: 'REC.', belt: 'GB' },
                { id: 'anova', name: 'ANOVA / F-Test', category: 'SIX SIGMA', priority: 'REC.', belt: 'BB' },
                { id: 'chisquare', name: 'Chi-Square Test', category: 'SIX SIGMA', priority: 'REC.', belt: 'GB' },
                { id: 'regression', name: 'Regression Engine', category: 'SIX SIGMA', priority: 'REC.', belt: 'BB' },
                { id: 'adv-analytics', name: 'Advanced Analytics', category: 'SIX SIGMA', priority: 'OPT.', belt: 'BB' },
                { id: 'swot', name: 'SWOT Analysis', category: 'STRATEGY', priority: 'OPT.', belt: 'YB' },
            ]
        },
        'improve': {
            title: 'Improve',
            subtitle: 'Experimental Design',
            description: 'Pilot solutions and design out defects.',
            skills: ['Experimental Design', 'Solution Selection', 'Financial Analysis', 'Implementation Planning'],
            tools: [
                { id: 'brainstorm', name: 'Brainstorming Board', category: 'IDEATION', priority: '1', belt: 'YB' },
                { id: 'cba', name: 'Cost Benefit Analysis', category: 'FINANCE', priority: '2', belt: 'GB' },
                { id: 'poka-yoke', name: 'Poka-Yoke Architect', category: 'LEAN', priority: '1', belt: 'YB' },
                { id: 'doe', name: 'DOE Optimizer', category: 'SIX SIGMA', priority: '2', belt: 'BB' },
                { id: 'forecast', name: 'Forecast & Trend', category: 'SIX SIGMA', priority: 'OPT.', belt: 'GB' },
                { id: 'samplesize', name: 'Sample Size Calc', category: 'SIX SIGMA', priority: 'REC.', belt: 'GB' },
                { id: 'moscow', name: 'MoSCoW Rules', category: 'PRIORITIZ.', priority: 'REC.', belt: 'YB' },
                { id: '5s', name: '5S Checklist', category: 'LEAN', priority: 'REC.', belt: 'YB' },
            ]
        },
        'control': {
            title: 'Control',
            subtitle: 'Process Control',
            description: 'Ensure the new process stays stable and sustained.',
            skills: ['Process Control', 'Standardization', 'Risk Monitoring', 'Sustainability'],
            tools: [
                { id: 'control-charts', name: 'Control Charts', category: 'SIX SIGMA', priority: '1', belt: 'GB' },
                { id: 'risk-registrar', name: 'Risk Monitor', category: 'SIX SIGMA', priority: '2', belt: 'YB' },
                { id: 'sop', name: 'Professional SOP', category: 'LEAN', priority: '1', belt: 'YB' },
                { id: 'a3', name: 'A3 Report Out', category: 'LEAN', priority: 'REC.', belt: 'YB' },
            ]
        }
    },
    'DMADV': {
        'define': {
            title: 'Define',
            subtitle: 'Design Strategy',
            description: 'Define problem, scope, and goals for a new design.',
            skills: ['Concept Planning', 'Market Segmentation', 'Requirement Capture'],
            tools: [
                { id: 'charter', name: 'Project Charter & Scope', category: 'DFSS', priority: '1', belt: 'YB' },
                { id: 'stakeholders', name: 'Stakeholder Map & RACI', category: 'DFSS', priority: '2', belt: 'YB' },
                { id: 'sipoc', name: 'SIPOC Diagram', category: 'DFSS', priority: '1', belt: 'GB' },
                { id: 'voc-tree', name: 'VOC Plan & Themes', category: 'DFSS', priority: '1', belt: 'GB' },
                { id: 'benchmarking', name: 'Competitive Benchmarking', category: 'DFSS', priority: 'REC.', belt: 'BB' },
            ]
        },
        'measure': {
            title: 'Measure',
            subtitle: 'CTQ Flowdown',
            description: 'Translate needs into measurable design characteristics.',
            skills: ['Quality Flowdown', 'Customer Prioritization', 'Target Setting'],
            tools: [
                { id: 'ctq', name: 'CTQ Tree (Advanced)', category: 'DFSS', priority: '1', belt: 'YB' },
                { id: 'kano', name: 'Kano Model', category: 'DFSS', priority: '2', belt: 'GB' },
                { id: 'qfd', name: 'Design Scorecard (QFD)', category: 'DFSS', priority: '3', belt: 'BB' },
            ]
        },
        'analyze': {
            title: 'Analyze',
            subtitle: 'Concept Selection',
            description: 'Evaluate design alternatives against baseline goals.',
            skills: ['innovation', 'Trade-off Analysis', 'Risk Shielding'],
            tools: [
                { id: 'brainstorm', name: 'Concept Brainstorming', category: 'DFSS', priority: '1', belt: 'YB' },
                { id: 'pugh', name: 'Pugh Matrix', category: 'DFSS', priority: '2', belt: 'GB' },
                { id: 'mini-fmea', name: 'Risk Scan (Mini-FMEA)', category: 'DFSS', priority: '2', belt: 'GB' },
                { id: 'triz', name: 'TRIZ / Trade-offs', category: 'DFSS', priority: '3', belt: 'BB' },
            ]
        },
        'design': {
            title: 'Design',
            subtitle: 'Detailed Engineering',
            description: 'Create detailed specifications and robust parameters.',
            skills: ['Robust Design', 'Tolerance Analysis', 'Blueprint Architect'],
            tools: [
                { id: 'sipoc', name: 'Visual Blueprint', category: 'DFSS', priority: '1', belt: 'YB' },
                { id: 'gantt', name: 'Prototype Plan', category: 'DFSS', priority: 'REC.', belt: 'YB' },
                { id: 'fmea', name: 'DFMEA (Detailed)', category: 'DFSS', priority: '1', belt: 'GB' },
                { id: 'ctq', name: 'Design Specs', category: 'DFSS', priority: '2', belt: 'GB' },
                { id: 'doe', name: 'DOE (Robust Design)', category: 'DFSS', priority: '3', belt: 'BB' },
            ]
        },
        'verify': {
            title: 'Verify',
            subtitle: 'Validation & Hand-off',
            description: 'Test the design under real-world conditions.',
            skills: ['Simulation', 'Hand-off Integrity', 'Result Verification'],
            tools: [
                { id: 'control-charts', name: 'Control Plan', category: 'DFSS', priority: '1', belt: 'YB' },
                { id: 'before-after', name: 'Before/After Verification', category: 'DFSS', priority: '2', belt: 'YB' },
                { id: 'dvpr', name: 'DVP&R / Pilot Report', category: 'DFSS', priority: '1', belt: 'GB' },
                { id: 'simulation', name: 'Reliability (Monte Carlo)', category: 'DFSS', priority: '3', belt: 'BB' },
            ]
        }
    },
    'KAIZEN': {
        'kickoff': {
            title: 'Kickoff & Current State',
            subtitle: 'Map the Process',
            description: 'Rapid alignment and identifying waste on the floor.',
            skills: ['Gemba Observation', 'Waste Identification', 'Team Alignment'],
            tools: [
                { id: 'event-charter', name: 'Event Charter', category: 'LEAN', priority: '1', belt: 'YB' },
                { id: 'sipoc', name: 'SIPOC & Process Map', category: 'LEAN', priority: '1', belt: 'YB' },
                { id: 'gemba', name: 'Gemba Walk: Waste ID', category: 'LEAN', priority: '1', belt: 'YB' },
            ]
        },
        'analyze': {
            title: 'Analyze & Brainstorm',
            subtitle: 'Root Cause & Solutions',
            description: 'Drill down to root causes and generate impactful fixes.',
            skills: ['Speed-to-Solution', 'Impact Prioritization'],
            tools: [
                { id: 'fishbone', name: 'Fishbone (Root Cause)', category: 'LEAN', priority: '1', belt: 'YB' },
                { id: 'brainstorm', name: 'Brainstorming Solutions', category: 'LEAN', priority: '1', belt: 'YB' },
                { id: 'moscow', name: 'Prioritization Matrix', category: 'LEAN', priority: '1', belt: 'GB' },
            ]
        },
        'implement': {
            title: 'Implement (Act)',
            subtitle: 'Execute & Standardize',
            description: 'Execute the changes and ensure workspace organization.',
            skills: ['Workplace Discipline', 'Standardization'],
            tools: [
                { id: '5s', name: '5S Event (Audit)', category: 'LEAN', priority: '1', belt: 'YB' },
                { id: 'sop', name: 'New Standard Work', category: 'LEAN', priority: '1', belt: 'YB' },
            ]
        },
        'verify': {
            title: 'Verify & Close',
            subtitle: 'Results & Celebration',
            description: 'Close the loop and hand over the optimized process.',
            skills: ['Metric Verification', 'Closing PDCA'],
            tools: [
                { id: 'before-after', name: 'Verify: Metrics', category: 'LEAN', priority: '1', belt: 'YB' },
                { id: 'a3', name: 'A3 Report Out', category: 'LEAN', priority: '1', belt: 'GB' },
            ]
        }
    },
    'FOCUS': {
        'find': {
            title: 'Find (F)',
            subtitle: 'Process Identification',
            description: 'Select the process and define the problem baseline.',
            skills: ['Baseline Discovery', 'Priority Selection'],
            tools: [
                { id: 'charter', name: 'Problem Statement & Aim', category: 'FOCUS', priority: 'STEP 1', belt: 'LAUNCH' },
                { id: 'pareto', name: 'Pareto Analysis (80/20)', category: 'FOCUS', priority: 'STEP 1', belt: 'LAUNCH' },
                { id: 'desc-stats', name: 'Baseline KPI List (CTQ)', category: 'FOCUS', priority: 'STEP 1', belt: 'LAUNCH' },
            ]
        },
        'organize': {
            title: 'Organize (O)',
            subtitle: 'Team Governance',
            description: 'Assemble the team and define roles.',
            skills: ['Team Assembly', 'Cadence Planning'],
            tools: [
                { id: 'raci', name: 'Team Charter (RACI)', category: 'FOCUS', priority: 'STEP 2', belt: 'LAUNCH' },
                { id: 'stakeholders', name: 'Stakeholder Map', category: 'FOCUS', priority: 'STEP 2', belt: 'LAUNCH' },
            ]
        },
        'clarify': {
            title: 'Clarify (C)',
            subtitle: 'Process Mapping',
            description: 'Clarify current state knowledge of the process.',
            skills: ['Boundary Definition'],
            tools: [
                { id: 'sipoc', name: 'SIPOC / Process Map', category: 'FOCUS', priority: 'STEP 3', belt: 'LAUNCH' },
                { id: 'swimlane-adv', name: 'Swimlane Map', category: 'FOCUS', priority: 'STEP 3', belt: 'LAUNCH' },
            ]
        },
        'understand': {
            title: 'Understand (U)',
            subtitle: 'Identify Variation',
            description: 'Understand the root causes of variation.',
            skills: ['Variation Drilling'],
            tools: [
                { id: 'fishbone', name: 'Fishbone Diagram', category: 'FOCUS', priority: 'STEP 4', belt: 'LAUNCH' },
                { id: '5whys', name: '5 Whys Analysis', category: 'FOCUS', priority: 'STEP 4', belt: 'LAUNCH' },
            ]
        },
        'select': {
            title: 'Select (S)',
            subtitle: 'Intervention Choice',
            description: 'Select an intervention to improve the process.',
            skills: ['Option Selection', 'Risk Scanning'],
            tools: [
                { id: 'moscow', name: 'Solution Prioritization', category: 'FOCUS', priority: 'STEP 5', belt: 'LAUNCH' },
                { id: 'mini-fmea', name: 'Risk Review (Mini-FMEA)', category: 'FOCUS', priority: 'STEP 5', belt: 'LAUNCH' },
            ]
        },
        'plan': {
            title: 'Plan (P)',
            subtitle: 'Pilot Scoping',
            description: 'Plan the pilot and metrics.',
            skills: ['Execution Mapping'],
            tools: [
                { id: 'implementation-plan', name: 'Implementation Plan', category: 'PDCA', priority: 'STEP 6', belt: 'LAUNCH' },
            ]
        },
        'do': {
            title: 'Do (D)',
            subtitle: 'Execute Pilot',
            description: 'Implement the intervention and collect data.',
            skills: ['Staff Training', 'Data Capture'],
            tools: [
                { id: 'dvpr', name: 'Pilot Execution', category: 'PDCA', priority: 'STEP 7', belt: 'LAUNCH' },
                { id: 'sop', name: 'Draft Standard Work', category: 'PDCA', priority: 'STEP 7', belt: 'LAUNCH' },
            ]
        },
        'check': {
            title: 'Check (C)',
            subtitle: 'Compare Results',
            description: 'Check results and analyze stability.',
            skills: ['Trend Analysis'],
            tools: [
                { id: 'control-charts', name: 'Run Chart / Control Chart', category: 'PDCA', priority: 'STEP 8', belt: 'LAUNCH' },
                { id: 'before-after', name: 'Before / After Analysis', category: 'PDCA', priority: 'STEP 8', belt: 'LAUNCH' },
            ]
        },
        'act': {
            title: 'Act (A)',
            subtitle: 'Standardize & Sustain',
            description: 'Act on findings to sustain improvements.',
            skills: ['Sustainability Audit'],
            tools: [
                { id: 'sop', name: 'Control Plan', category: 'PDCA', priority: 'STEP 9', belt: 'LAUNCH' },
                { id: '5s', name: 'Audit Checklist', category: 'PDCA', priority: 'STEP 9', belt: 'LAUNCH' },
            ]
        }
    }
};
