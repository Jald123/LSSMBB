export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: "MASTERY" | "PROJECTS" | "STREAK" | "SOCIAL";
    icon: string;
    unlockedAt?: string;
    rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
    reqValue: number;
    currentValue: number;
}

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: "badge-001",
        title: "White Belt Initiate",
        description: "Complete the first module of the Define phase.",
        category: "MASTERY",
        icon: "Shield",
        unlockedAt: "2026-04-10T12:00:00Z",
        rarity: "COMMON",
        reqValue: 1,
        currentValue: 1
    },
    {
        id: "badge-002",
        title: "Data Sentinel",
        description: "Achieve 100% accuracy in a Gauge R&R simulation.",
        category: "MASTERY",
        icon: "Database",
        rarity: "RARE",
        reqValue: 100,
        currentValue: 85
    },
    {
        id: "badge-003",
        title: "Green Belt Warrior",
        description: "Complete all modules in the DMAIC curriculum.",
        category: "MASTERY",
        icon: "Trophy",
        rarity: "LEGENDARY",
        reqValue: 24,
        currentValue: 5
    },
    {
        id: "badge-004",
        title: "Mission Commander",
        description: "Successfully complete 5 different project case studies.",
        category: "PROJECTS",
        icon: "Rocket",
        rarity: "EPIC",
        reqValue: 5,
        currentValue: 2
    },
    {
        id: "badge-005",
        title: "Consistency Protocol",
        description: "Maintain a 7-day learning streak in the academy.",
        category: "STREAK",
        icon: "Zap",
        unlockedAt: "2026-04-15T09:30:00Z",
        rarity: "COMMON",
        reqValue: 7,
        currentValue: 7
    }
];
