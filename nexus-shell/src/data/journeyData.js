export const phasesData = {
    'define': {
        title: 'Define',
        subtitle: 'Setting Tactical Boundaries',
        description: 'The phase where we clarify the problem, identify stakeholders, and set the scope.',
        skills: ['Problem Scoping', 'Stakeholder Management', 'Process Mapping', 'Voice of Customer (VOC)'],
        tools: [
            { id: 'charter', name: 'Project Charter', category: 'PROJ. MGMT', priority: '1', belt: 'YB' },
            { id: 'stakeholders', name: 'Stakeholder Matrix', category: 'PROJ. MGMT', priority: '2', belt: 'GB' },
            { id: 'triage', name: 'Project Triage & Scoping', category: 'PROJ. MGMT', priority: '3', belt: 'BB' },
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
        subtitle: 'Quantifying the Baseline',
        description: 'Validate your measurement systems and establish the current state performance.',
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
        subtitle: 'Isolating Root Causes',
        description: 'Use statistical rigor to confirm the vital few root causes of variation.',
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
            { id: 'swimlane', name: 'Swimlane Diagram', category: 'FLOW', priority: 'REC.', belt: 'GB' },
            { id: 'swot', name: 'SWOT Analysis', category: 'STRATEGY', priority: 'OPT.', belt: 'YB' },
        ]
    },
    'improve': {
        title: 'Improve',
        subtitle: 'Optimizing the System',
        description: 'Pilot solutions and design out defects for long-term sustainability.',
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
        subtitle: 'Locking in the Gains',
        description: 'Ensure the new process stays stable and the benefits are sustained.',
        skills: ['Process Control', 'Standardization', 'Risk Monitoring', 'Long-term Sustainability'],
        tools: [
            { id: 'control-charts', name: 'Control Charts', category: 'SIX SIGMA', priority: '1', belt: 'GB' },
            { id: 'risk-registrar', name: 'Risk Monitor', category: 'SIX SIGMA', priority: '2', belt: 'YB' },
            { id: 'sop', name: 'Professional SOP', category: 'LEAN', priority: '1', belt: 'YB' },
            { id: 'a3', name: 'A3 Problem Solving', category: 'LEAN', priority: 'REC.', belt: 'YB' },
        ]
    }
};
