export const phasesData = {
    'define': {
        title: 'Define',
        subtitle: 'Setting Tactical Boundaries',
        description: 'The phase where we clarify the problem, identify stakeholders, and set the scope.',
        tools: [
            { id: 'charter', name: 'Project Charter', type: 'Primary', complexity: 'High' },
            { id: 'triage', name: 'Project Triage', type: 'Framework', complexity: 'Medium' },
            { id: 'stakeholders', name: 'Stakeholder Map', type: 'Input', complexity: 'Medium' },
            { id: 'workflow', name: 'SIPOC Workflow', type: 'Process', complexity: 'High' },
            { id: 'kano', name: 'Kano Model', type: 'VOC', complexity: 'Medium' },
            { id: 'fundamentals', name: 'LSS Fundamentals', type: 'Education', complexity: 'Low' },
        ]
    },
    'measure': {
        title: 'Measure',
        subtitle: 'Quantifying the Baseline',
        description: 'Validate your measurement systems and establish the current state performance.',
        tools: [
            { id: 'fmea', name: 'Process FMEA', type: 'Analysis', complexity: 'High' },
            { id: 'msa', name: 'MSA Wizard', type: 'Stats', complexity: 'High' },
            { id: 'vsm', name: 'VSM Mapper', type: 'Flow', complexity: 'Elite' },
            { id: 'desc-stats', name: 'Descriptive Stats', type: 'Stats', complexity: 'Medium' },
            { id: 'sigma-calc', name: 'Sigma Level', type: 'Metric', complexity: 'Medium' },
            { id: 'transcript', name: 'Skill Matrix', type: 'Resources', complexity: 'Medium' },
        ]
    },
    'analyze': {
        title: 'Analyze',
        subtitle: 'Isolating Root Causes',
        description: 'Use statistical rigor to confirm the vital few root causes of variation.',
        tools: [
            { id: 'fishbone', name: 'Fishbone (Ishikawa)', type: 'Logic', complexity: 'Medium' },
            { id: '5whys', name: '5-Whys Studio', type: 'Logic', complexity: 'Medium' },
            { id: 'hypothesis', name: 'Hypothesis Wizard', type: 'Stats', complexity: 'High' },
            { id: 'anova', name: 'ANOVA Engine', type: 'Stats', complexity: 'High' },
            { id: 'doe', name: 'DOE Premium', type: 'Stats', complexity: 'Elite' },
            { id: 'pareto', name: 'Pareto Analysis', type: 'Priority', complexity: 'Low' },
            { id: 'wastes', name: '8 Wastes Audit', type: 'Lean', complexity: 'Medium' },
            { id: 'dist-lab', name: 'Distribution Lab', type: 'Stats', complexity: 'Elite' },
        ]
    },
    'improve': {
        title: 'Improve',
        subtitle: 'Optimizing the System',
        description: 'Pilot solutions and design out defects for long-term sustainability.',
        tools: [
            { id: 'prioritization', name: 'Kaizen Priority', type: 'Selection', complexity: 'Medium' },
            { id: 'pugh', name: 'Pugh Matrix', type: 'Selection', complexity: 'Medium' },
            { id: 'pdca', name: 'PDCA Cycle', type: 'Execution', complexity: 'Low' },
            { id: 'pilot', name: 'Pilot Plan', type: 'Execution', complexity: 'Medium' },
            { id: 'sop', name: 'Standard Work (SOP)', type: 'Process', complexity: 'Low' },
            { id: 'poka-yoke', name: 'Mistake Proofing', type: 'Design', complexity: 'Medium' },
        ]
    },
    'control': {
        title: 'Control',
        subtitle: 'Locking in the Gains',
        description: 'Ensure the new process stays stable and the benefits are sustained.',
        tools: [
            { id: 'control-charts', name: 'Control Charts', type: 'Stats', complexity: 'High' },
            { id: 'capability', name: 'Process Capability', type: 'Stats', complexity: 'High' },
            { id: 'risk-registrar', name: 'Risk Monitor', type: 'Risk', complexity: 'Medium' },
            { id: 'gantt', name: 'Gantt Tracker', type: 'Management', complexity: 'Medium' },
            { id: 'templates-gallery', name: 'Templates Hub', type: 'Assets', complexity: 'Low' },
        ]
    }
};
