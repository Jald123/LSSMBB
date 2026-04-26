/**
 * GOLD STANDARDS REGISTRY
 * 
 * This file contains the 'ideal' submissions for each tool in each case study.
 * The system uses these to calculate a mastery score (0-100%).
 */

export const GOLD_STANDARDS: Record<string, Record<string, any>> = {
    "er-wait-times": {
        "charter": {
            "problemStatement": {
                "target": "ER door-to-provider wait times have increased to 85 minutes (avg), exceeding the 30-minute benchmark and causing a 15% Left-Without-Being-Seen (LWBS) rate.",
                "vitals": ["85 minutes", "15%", "30-minute", "LWBS"],
                "keywords": ["benchmark", "congestion", "door-to-provider"]
            },
            "goalStatement": {
                "target": "Reduce average wait times from 85 to 25 minutes and decrease LWBS rate to <2% within 4 months.",
                "vitals": ["25 minutes", "<2%", "4 months"],
                "keywords": ["reduction", "target", "timeline"]
            },
            "metrics": {
                "target": "Door-to-Provider Time, LWBS %, Patient Satisfaction Score",
                "vitals": ["Door-to-Provider", "LWBS", "Satisfaction"],
                "keywords": ["KPI", "CTQ", "Metric"]
            }
        },
        "sipoc": {
            "process": {
                "target": "Arrive -> Triage -> Register -> Wait -> Treat -> Discharge/Admit",
                "vitals": ["Triage", "Register", "Treat", "Discharge"],
                "keywords": ["Value Stream", "Flow", "Bottleneck"]
            }
        }
    },
    "medication-errors": {
        "charter": {
            "problemStatement": {
                "target": "High-alert medication dispensing errors have spiked by 25% over the last quarter, resulting in 3 'Near Miss' events per month in the ICU.",
                "vitals": ["25%", "Near Miss", "ICU"],
                "keywords": ["spike", "frequency", "safety"]
            }
        }
    }
};

/**
 * Calculates a score by comparing user input to gold standard.
 * Logic: Simple keyword matching and field presence for now.
 * MBB Note: In a production environment, this would use an LLM-based semantic comparison.
 */
export function calculateMasteryScore(caseId: string, toolId: string, userData: any): number {
    const gold = GOLD_STANDARDS[caseId]?.[toolId];
    if (!gold) return 100;

    let totalScore = 0;
    let fieldCount = 0;

    for (const key of Object.keys(gold)) {
        const standard = gold[key];
        const userValue = String(userData[key] || " ").toLowerCase();
        
        let fieldScore = 0;
        fieldCount++;

        // Tier 1: Vitals (50%) - Exact matches for critical metrics
        const vitalMatches = (standard.vitals || []).filter((v: string) => userValue.includes(v.toLowerCase())).length;
        const vitalScore = standard.vitals?.length ? (vitalMatches / standard.vitals.length) * 50 : 50;

        // Tier 2: Keywords (30%) - Technical terminology
        const keywordMatches = (standard.keywords || []).filter((k: string) => userValue.includes(k.toLowerCase())).length;
        const keywordScore = standard.keywords?.length ? (keywordMatches / standard.keywords.length) * 30 : 30;

        // Tier 3: Length/Depth (20%) - Penalty for lazy answers
        const depthScore = Math.min((userValue.length / 50) * 20, 20);

        fieldScore = vitalScore + keywordScore + depthScore;
        totalScore += fieldScore;
    }

    return Math.round(totalScore / fieldCount);
}

export function generateCritique(caseId: string, toolId: string, userData: any): string {
    const gold = GOLD_STANDARDS[caseId]?.[toolId];
    if (!gold) return "ELITE EXECUTION: System standards met in this sector.";

    const gaps: string[] = [];
    const recommendations: string[] = [];
    
    for (const key of Object.keys(gold)) {
        const standard = gold[key];
        const userValue = String(userData[key] || "").toLowerCase();
        
        const missingVitals = (standard.vitals || []).filter((v: string) => !userValue.includes(v.toLowerCase()));
        const missingKeywords = (standard.keywords || []).filter((k: string) => !userValue.includes(k.toLowerCase()));

        if (missingVitals.length > 0) {
            gaps.push(`${key}: Missing critical metrics [${missingVitals.join(', ')}]`);
        }
        if (missingKeywords.length > 0) {
            recommendations.push(`Refine ${key} with technical terms like: ${missingKeywords.slice(0, 2).join(', ')}`);
        }
    }

    const score = calculateMasteryScore(caseId, toolId, userData);
    const isPassed = score >= 70;

    let report = "";
    if (gaps.length > 0) {
        report += `CAPABILITY GAPS DETECTED:\n${gaps.map(g => `• ${g}`).join('\n')}\n\n`;
    }

    if (recommendations.length > 0) {
        report += `TECHNICAL RECOMMENDATIONS:\n${recommendations.map(r => `• ${r}`).join('\n')}\n\n`;
    }

    if (!isPassed) {
        report += `PATH TO MASTERY:\nTo bridge the ${70 - score}% gap, revisit the Mission Briefing. Ensure your ${Object.keys(gold)[0]} specifically quantifies the pain point using the exact baseline metrics provided in the intelligence dataset.`;
    } else {
        report += `SENSEI VERDICT: Professional standard achieved. Your quantification and terminology align with Black Belt requirements.`;
    }

    return report;
}
