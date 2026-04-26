"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
    Shield, 
    X, 
    Target, 
    Zap, 
    Binary, 
    ChevronRight, 
    Swords,
    Search
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/primitives/MetricCard";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const missions = [
    {
        id: 'charter',
        name: 'The Contract',
        tag: 'PROJECT CHARTER',
        desc: 'Define project scope, objectives, and team boundaries in this high-stakes scenario.',
        img: '/images/empty-state.png', // Placeholder for now
        color: 'text-primary',
        path: '/armory/mission/charter'
    },
    {
        id: 'sipoc',
        name: 'The Map',
        tag: 'SIPOC DIAGRAM',
        desc: 'Map high-level process flow: Suppliers to Customers with surgical precision.',
        img: '/images/empty-state.png',
        color: 'text-emerald-500',
        path: '/armory/mission/sipoc'
    },
    {
        id: 'msa',
        name: 'The Trust',
        tag: 'MSA / GAGE R&R',
        desc: 'Validate measurement precision and gauge reliability under pressure.',
        img: '/images/empty-state.png',
        color: 'text-yellow-500',
        path: '/armory/mission/msa'
    },
    {
        id: 'stats',
        name: 'The Docking Sequence',
        tag: 'PROCESS CAPABILITY',
        desc: 'Optimize Cp/Cpk to dock cargo safely through a narrowing tunnel.',
        img: '/images/empty-state.png',
        color: 'text-cyan-500',
        path: '/armory/mission/stats'
    },
    {
        id: 'pareto',
        name: 'The Focus',
        tag: 'PARETO ANALYSIS',
        desc: 'Identify the vital few issues causing 80% of system failures.',
        img: '/images/empty-state.png',
        color: 'text-purple-500',
        path: '/armory/mission/pareto'
    },
    {
        id: 'fishbone',
        name: 'The Anatomy',
        tag: 'FISHBONE DIAGRAM',
        desc: 'Trace potential root causes across complex system categories.',
        img: '/images/empty-state.png',
        color: 'text-red-500',
        path: '/armory/mission/fishbone'
    }
];

export default function ArmoryHub() {
    const router = useRouter();

    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20 font-sans">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    
                    <PageHeader 
                        title="Skill Armory" 
                        description="Calibrate your core DMAIC competencies through high-fidelity mission simulations."
                        actions={
                            <div className="flex gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                    <input type="text" placeholder="Filter simulations..." className="bg-surface border border-border pl-9 pr-4 py-2 rounded-xl text-xs outline-none focus:border-primary/50 transition-all font-medium" />
                                </div>
                            </div>
                        }
                    />

                    {/* Combat Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard 
                            title="Mastery Score" 
                            value="842" 
                            description="Top 5% of Operators" 
                            icon={<Swords className="w-4 h-4 text-primary" />} 
                        />
                        <MetricCard 
                            title="Missions Run" 
                            value="12" 
                            trend="up" 
                            trendValue="+3 this week" 
                            icon={<Target className="w-4 h-4 text-emerald-500" />} 
                        />
                        <MetricCard 
                            title="Tokens Collected" 
                            value="4,200" 
                            description="Ready for Exchange" 
                            icon={<Zap className="w-4 h-4 text-yellow-500" />} 
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">The Essential Suite</h3>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Critical Link Active</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {missions.map((mission, index) => (
                                <motion.div
                                    key={mission.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -8 }}
                                    className="group cursor-pointer"
                                    onClick={() => router.push(mission.path)}
                                >
                                    <div className="h-full bg-card border border-border rounded-[2.5rem] p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/40 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.05)]">
                                        
                                        <div className="relative mb-8 pt-4">
                                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all" />
                                            <div className="w-32 h-32 rounded-[2.5rem] border border-white/10 bg-surface flex items-center justify-center relative overflow-hidden group-hover:border-primary/50 transition-all">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                                                <Binary className="w-12 h-12 text-slate-700 group-hover:text-primary transition-colors" />
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-8 flex-1">
                                            <div>
                                                <Badge variant="outline" className="border-white/5 uppercase font-black text-[9px] tracking-widest text-slate-500 mb-1">Station 0{index + 1}</Badge>
                                                <h3 className="text-xl font-bold font-display tracking-tight text-foreground group-hover:text-primary transition-colors uppercase">
                                                    {mission.name}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed px-4">
                                                {mission.desc}
                                            </p>
                                        </div>

                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="w-full py-6 uppercase font-bold tracking-[0.2em] text-[10px] bg-white/[0.02] group-hover:bg-primary group-hover:text-black border-white/5 transition-all"
                                        >
                                            Initialize Protocol
                                            <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
