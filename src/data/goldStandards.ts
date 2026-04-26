/**
 * GOLD STANDARDS REGISTRY
 * 
 * This file contains the 'ideal' submissions for each tool in each case study.
 * The system uses these to calculate a mastery score (0-100%).
 */

export const GOLD_STANDARDS: Record<string, Record<string, any>> = {
    "er-wait-times": {
        "charter": {
            "problemStatement": "ER door-to-provider wait times have increased to 85 minutes (avg), exceeding the 30-minute benchmark and causing a 15% Left-Without-Being-Seen (LWBS) rate.",
            "goalStatement": "Reduce average wait times from 85 to 25 minutes and decrease LWBS rate to <2% within 4 months.",
            "metrics": ["Door-to-Provider Time", "LWBS %", "Patient Satisfaction Score"],
            "scope": "In-scope: Triage process, provider scheduling, nurse-led protocols. Out-of-scope: Physical ER expansion."
        },
        "sipoc": {
            "suppliers": ["EMS", "Walk-in Patients", "Referrals"],
            "inputs": ["Patient Info", "Symptoms", "Vitals"],
            "process": ["Arrive", "Triage", "Register", "Wait", "Treat", "Discharge/Admit"],
            "outputs": ["Stabilized Patient", "Medical Records", "Treatment Plan"],
            "customers": ["Patients", "Families", "Admitting Wards"]
        }
    },
    "medication-errors": {
        "charter": {
            "problemStatement": "High-alert medication dispensing errors have spiked by 25% over the last quarter, resulting in 3 'Near Miss' events per month in the ICU.",
            "goalStatement": "Achieve 0 near-miss events and reduce dispensing errors to <0.01% through standardized verification protocols.",
            "metrics": ["Error Rate per 1000 doses", "Near Miss Count", "Verification Audit Score"],
            "scope": "In-scope: ICU dispensing, Pharmacy prep, Nurse administration. Out-of-scope: Outpatient prescriptions."
        },
        "sipoc": {
            "suppliers": ["Pharmacy", "Physicians", "Medication Vendors"],
            "inputs": ["Doctor Orders", "Patient Charts", "Unit Doses"],
            "process": ["Order Entry", "Pharmacist Review", "Dispensing", "Transport", "Nurse Verification", "Administration"],
            "outputs": ["Administered Medication", "Updated EMR", "Billing Record"],
            "customers": ["Patients", "Medical Staff", "Registry Board"]
        }
    },
    "patient-transfer": {
        "charter": {
            "problemStatement": "Handoff delays between ICU and general wards average 140 minutes, with a 12% rate of missing clinical information during transfer.",
            "goalStatement": "Reduce transfer cycle time to <60 minutes and achieve 100% information accuracy by the end of Q3.",
            "metrics": ["Transfer Cycle Time", "Handoff Accuracy %", "Patient Stability Post-Transfer"]
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
    if (!gold) return 100; // If no standard exists, give benefit of doubt or handle differently

    let matches = 0;
    let totalFields = Object.keys(gold).length;

    for (const key of Object.keys(gold)) {
        const userValue = String(userData[key] || "").toLowerCase();
        const goldValue = String(gold[key]).toLowerCase();

        // Check if user value contains key technical terms from gold standard
        const goldTerms = goldValue.split(/\s+/).filter(t => t.length > 3);
        let fieldMatches = 0;
        
        goldTerms.forEach(term => {
            if (userValue.includes(term)) fieldMatches++;
        });

        if (fieldMatches >= goldTerms.length * 0.4) { // 40% keyword match threshold per field
            matches++;
        }
    }

    const score = Math.round((matches / totalFields) * 100);
    return Math.min(score + 20, 100); // Add a 20% 'effort' buffer
}

export function generateCritique(caseId: string, toolId: string, userData: any): string {
    const gold = GOLD_STANDARDS[caseId]?.[toolId];
    if (!gold) return "Analysis complete. Your submission has been captured in the mission log.";

    const missingPoints: string[] = [];
    
    for (const key of Object.keys(gold)) {
        const userValue = String(userData[key] || "").toLowerCase();
        const goldValue = String(gold[key]).toLowerCase();
        const goldTerms = goldValue.split(/\s+/).filter(t => t.length > 5); // Focus on long technical terms

        const matchCount = goldTerms.filter(t => userValue.includes(t)).length;
        if (matchCount < goldTerms.length * 0.3) {
            missingPoints.push(key.replace(/([A-Z])/g, ' $1').toLowerCase());
        }
    }

    if (missingPoints.length === 0) {
        return "Excellent alignment with LSSMBB best practices. Your logic shows strong mastery of the tactical baseline for this case.";
    }

    return `Submission verified. To reach Black Belt level mastery, consider refining your focus on: ${missingPoints.join(', ')}. Ensure your definitions align closer to tactical benchmarks.`;
}
