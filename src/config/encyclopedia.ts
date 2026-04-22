export interface EncyclopediaEntry {
    id: string;
    title: string;
    category: 'STATISTICS' | 'METHODOLOGY' | 'TACTICAL' | 'LEADERSHIP';
    description: string;
    definitions: {
        term: string;
        explanation: string;
    }[];
    formula?: string;
    rules_of_thumb: string[];
    common_pitfalls: string[];
    related_tools: string[];
}

export const ENCYCLOPEDIA: EncyclopediaEntry[] = [
    {
        id: 'anova',
        title: 'Analysis of Variance (ANOVA)',
        category: 'STATISTICS',
        description: 'A statistical method used to compare the means of three or more groups to determine if at least one group mean is significantly different from the others.',
        definitions: [
            { term: 'F-Statistic', explanation: 'The ratio of variance between groups to the variance within groups.' },
            { term: 'P-Value', explanation: 'The probability that the observed differences occurred by chance. Threshold typically < 0.05.' }
        ],
        formula: 'F = (Variance between groups) / (Variance within groups)',
        rules_of_thumb: [
            'Use One-Way ANOVA when you have one independent variable.',
            'Use Two-Way ANOVA when you have two independent variables.'
        ],
        common_pitfalls: [
            'Assuming normality without testing (use Shapiro-Wilk).',
            'Ignoring equal variance assumption (Homoscedasticity).'
        ],
        related_tools: ['t-test', 'box-plot', 'regression']
    },
    {
        id: 'poka-yoke',
        title: 'Poka-Yoke (Error Proofing)',
        category: 'METHODOLOGY',
        description: 'A Japanese term that means "mistake-proofing" or "inadvertent error prevention". A mechanism that helps an equipment operator avoid (yokeru) mistakes (poka).',
        definitions: [
            { term: 'Prevention Device', explanation: 'A mechanism that makes it impossible for an error to occur.' },
            { term: 'Detection Device', explanation: 'A mechanism that signals an error has occurred or prevents the defective part from moving forward.' }
        ],
        rules_of_thumb: [
            'Simplicity is key: the best Poka-Yokes are inexpensive and robust.',
            'Focus on the source of the error, not just the result.'
        ],
        common_pitfalls: [
            'Over-complicating the solution with expensive sensors.',
            'Relying on human memory instead of physical constraints.'
        ],
        related_tools: ['fmea', 'control-plan', 'root-cause-analysis']
    },
    {
        id: 'fmea',
        title: 'Failure Mode and Effects Analysis (FMEA)',
        category: 'METHODOLOGY',
        description: 'A step-by-step approach for identifying all possible failures in a design, a manufacturing or assembly process, or a product or service.',
        definitions: [
            { term: 'RPN (Risk Priority Number)', explanation: 'Severity x Occurrence x Detection. Used to prioritize risks.' },
            { term: 'Severity', explanation: 'How serious the effect of the failure is on the customer.' }
        ],
        formula: 'RPN = S × O × D',
        rules_of_thumb: [
            'Focus on items with Severity 9 or 10 regardless of RPN.',
            'Revise FMEA whenever the process changes significantly.'
        ],
        common_pitfalls: [
            'Treating RPN as a mathematical absolute instead of a prioritization guide.',
            'Failing to implement recommended actions.'
        ],
        related_tools: ['poka-yoke', 'control-plan', 'fishbone-diagram']
    }
];
