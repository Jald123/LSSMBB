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
            "suppliers": {
                "target": "EMS, Walk-in Patients, Referrals",
                "vitals": ["EMS", "Walk-in", "Referrals"],
                "keywords": ["Source", "Entry"]
            },
            "inputs": {
                "target": "Patient Info, Symptoms, Vitals",
                "vitals": ["Symptoms", "Vitals"],
                "keywords": ["Data", "Condition"]
            },
            "process": {
                "target": "Arrive -> Triage -> Register -> Wait -> Treat -> Discharge/Admit",
                "vitals": ["Triage", "Register", "Treat", "Discharge", "Wait"],
                "keywords": ["Value Stream", "Flow", "Bottleneck"]
            },
            "outputs": {
                "target": "Stabilized Patient, Medical Records, Treatment Plan",
                "vitals": ["Stabilized", "Records", "Plan"],
                "keywords": ["Result", "Exit"]
            },
            "customers": {
                "target": "Patients, Families, Admitting Wards",
                "vitals": ["Patients", "Families", "Wards"],
                "keywords": ["Stakeholder", "End User"]
            }
        },
        "msa": {
            "gageRR": {
                "target": "Total Gage R&R Variation < 10% (Ideally < 1%) with process variation in wait-time measurements.",
                "vitals": ["Wait-time", "Door-to-Provider", "timestamp"],
                "keywords": ["repeatability", "reproducibility", "variance"]
            },
            "interpretation": {
                "target": "The measurement system is capable if R&R is less than 10%.",
                "vitals": ["< 10%", "Capable"],
                "keywords": ["precision", "accuracy"]
            }
        },
        "capability": {
            "cpk": {
                "target": "Current Cpk is 0.42, far below the LSS target of 1.33 for medical safety standards.",
                "vitals": ["0.42", "1.33"],
                "keywords": ["Sigma", "Capability", "Standard Deviation"]
            }
        }
    },
    "medication-errors": {
        "charter": {
            "problemStatement": {
                "target": "High-alert medication dispensing errors have spiked by 25% over the last quarter, resulting in 3 'Near Miss' events per month in the ICU.",
                "vitals": ["25%", "3", "Near Miss", "ICU"],
                "keywords": ["spike", "alert", "error"]
            },
            "goalStatement": {
                "target": "Achieve 0 near-miss events and reduce dispensing errors to <0.01% through standardized verification protocols.",
                "vitals": ["0", "<0.01%"],
                "keywords": ["zero", "reduction", "verification"]
            }
        }
    },
    "patient-transfer": {
        "charter": {
            "problemStatement": {
                "target": "Handoff delays between ICU and general wards average 140 minutes, with a 12% rate of missing clinical information during transfer.",
                "vitals": ["140", "12%", "ICU"],
                "keywords": ["handoff", "missing", "delay"]
            }
        }
    },
    "surgical-optimization": {
        "charter": {
            "problemStatement": {
                "target": "Operating room turnover time averages 55 minutes, causing a backlog of 4 elective surgeries per day.",
                "vitals": ["55", "4"],
                "keywords": ["turnover", "elective", "backlog"]
            }
        },
        "sipoc": {
            "process": {
                "target": "Patient Prep -> Aresthesia -> Surgery -> Recovery -> Room Sterilization",
                "vitals": ["Sterilization", "Surgery", "Recovery"],
                "keywords": ["turnover", "flow", "cycle"]
            }
        }
    },
    "lab-tat": {
        "charter": {
            "problemStatement": {
                "target": "Urgent lab turnaround time (TAT) is currently 3.5 hours, missing the 1-hour critical threshold in 40% of cases.",
                "vitals": ["3.5", "1-hour", "40%"],
                "keywords": ["TAT", "urgent", "threshold"]
            }
        },
        "sipoc": {
            "process": {
                "target": "Order -> Collection -> Transport -> Accession -> Prep -> Analysis -> Result",
                "vitals": ["Accession", "Prep", "Analysis", "Result"],
                "keywords": ["TAT", "Specimen", "Transport"]
            }
        }
    },
    "hospital-wing-design": {
        "charter": {
            "problemStatement": {
                "target": "Existing ward layout requires nurses to walk 4.2 miles per shift, with patient satisfaction scores at an all-time low (45%).",
                "vitals": ["4.2", "45%"],
                "keywords": ["layout", "ergonomics", "walking"]
            }
        },
        "kano": {
            "features": {
                "target": "Must-haves: Bedside Oxygen, Call Button. Performance: TV size, Food variety. Delight: Smart Lighting, View.",
                "vitals": ["Oxygen", "Call", "Lighting"],
                "keywords": ["delighter", "dissatisfier", "must-have"]
            }
        }
    },
    "telehealth-exp": {
        "charter": {
            "problemStatement": {
                "target": "Senior patients experience a 35% dropout rate during telemedicine check-ins due to UI complexity and connection failures.",
                "vitals": ["35%", "Senior"],
                "keywords": ["telehealth", "complexity", "dropout"]
            }
        }
    },
    "discharge-blitz": {
        "charter": {
            "problemStatement": {
                "target": "Discharge administrative wait time is 4.5 hours post-physician approval, delaying 5 beds per day.",
                "vitals": ["4.5", "5"],
                "keywords": ["discharge", "approval", "administrative"]
            }
        }
    },
    "supply-room-5s": {
        "charter": {
            "problemStatement": {
                "target": "Nurses spend 12 minutes per shift searching for PPE and high-use items due to unorganized supply room layout.",
                "vitals": ["12 minutes", "PPE"],
                "keywords": ["5S", "sorting", "searching"]
            }
        }
    },
    "pharmacy-workflow": {
        "charter": {
            "problemStatement": {
                "target": "Pharmacy tech travel distance is 3.2 km per day, causing a 45-minute delay in stat medication delivery.",
                "vitals": ["3.2", "45-minute"],
                "keywords": ["spaghetti", "motion", "stat"]
            }
        }
    },
    "satisfaction-focus": {
        "charter": {
            "problemStatement": {
                "target": "Outpatient clinic HCAHPS scores have dropped from 82% to 65% over the last 6 months.",
                "vitals": ["82%", "65%", "6 months"],
                "keywords": ["HCAHPS", "satisfaction", "outpatient"]
            }
        }
    },
    "infection-rate": {
        "charter": {
            "problemStatement": {
                "target": "Catheter-associated urinary tract infections (CAUTI) have increased to 4.5 per 1000 device days in the surgical ward.",
                "vitals": ["CAUTI", "4.5", "1000"],
                "keywords": ["infection", "protocol", "surgical"]
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
    if (!gold) return 0; // STRICTURE: If no standard exists, score is 0.

    let totalScore = 0;
    let fieldCount = 0;

    for (const key of Object.keys(gold)) {
        const standard = gold[key];
        const rawUserValue = String(userData[key] || "");
        const userValue = rawUserValue.toLowerCase();
        
        if (!rawUserValue.trim()) {
            fieldCount++;
            continue; // 0 for this field
        }

        let fieldScore = 0;
        fieldCount++;

        // Tier 1: Vitals (60%) - MUST HAVE specific data or terms
        const vitalMatches = (standard.vitals || []).filter((v: string) => userValue.includes(v.toLowerCase())).length;
        // CRITICAL: If vitals exist but ZERO are matched, score for this field is 0! (Anti-irrelevance)
        if (standard.vitals?.length > 0 && vitalMatches === 0) {
            continue; 
        }
        const vitalScoreValue = standard.vitals?.length ? (vitalMatches / standard.vitals.length) * 60 : 60;

        // Tier 2: Keywords (40%) - Technical terminology
        const keywordMatches = (standard.keywords || []).filter((k: string) => userValue.includes(k.toLowerCase())).length;
        const keywordScoreValue = standard.keywords?.length ? (keywordMatches / standard.keywords.length) * 40 : 40;

        // Depth/Irrelevance filter: If it's just long text with no keywords, it shouldn't get points.
        // We removed DepthScore to prevent "length hacking"
        
        fieldScore = vitalScoreValue + keywordScoreValue;
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
