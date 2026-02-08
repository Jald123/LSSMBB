export const phasesData = {
    'define': {
        title: 'Define',
        subtitle: 'Setting Tactical Boundaries',
        description: 'The phase where we clarify the problem, identify stakeholders, and set the scope.',
        tools: [
            { id: 'charter', name: 'Project Charter', type: 'Primary', complexity: 'High' },
            { id: 'triage', name: 'Project Triage', type: 'Framework', complexity: 'Medium' },
            { id: 'voc', name: 'VOC Collector', type: 'Input', complexity: 'Low' },
            { id: 'workflow', name: 'SIPOC Workflow', type: 'Process', complexity: 'High' },
        ]
    },
    'measure': {
        title: 'Measure',
        subtitle: 'Quantifying the Baseline',
        description: 'Validate your measurement systems and establish the current state performance.',
        tools: [
            { id: 'fmea', name: 'Process FMEA', type: 'Analysis', complexity: 'High' },
            { id: 'transcript', name: 'Skill Matrix', type: 'Resources', complexity: 'Medium' },
            { id: 'msa', name: 'MSA Wizard', type: 'Stats', complexity: 'High', placeholder: true },
        ]
    },
    'analyze': {
        title: 'Analyze',
        subtitle: 'Isolating Root Causes',
        description: 'Use statistical rigor to confirm the vital few root causes of variation.',
        tools: [
            { id: '5whys', name: '5-Whys Studio', type: 'Logic', complexity: 'Medium' },
            { id: 'hypothesis', name: 'Hypothesis Wizard', type: 'Stats', complexity: 'High' },
            { id: 'doe', name: 'DOE Premium', type: 'Stats', complexity: 'Elite' },
        ]
    },
    'improve': {
        title: 'Improve',
        subtitle: 'Optimizing the System',
        description: 'Pilot solutions and design out defects for long-term sustainability.',
        tools: [
            { id: 'implementation-plan', name: 'Pilot Plan', type: 'Execution', complexity: 'Medium' },
            { id: 'sop', name: 'Standard Work (SOP)', type: 'Process', complexity: 'Low' },
            { id: 'poka-yoke', name: 'Mistake Proofing', type: 'Design', complexity: 'Medium', placeholder: true },
        ]
    },
    'control': {
        title: 'Control',
        subtitle: 'Locking in the Gains',
        description: 'Ensure the new process stays stable and the benefits are sustained.',
        tools: [
            { id: 'control-plan', name: 'Control Plan', type: 'Governance', complexity: 'High' },
            { id: 'risk-registrar', name: 'Risk Monitor', type: 'Risk', complexity: 'Medium' },
            { id: 'dashboard', name: 'Control Chart', type: 'Visuals', complexity: 'High', placeholder: true },
        ]
    }
};
