"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";
import {
    ArrowLeft,
    CheckCircle2,
    Lock,
    Unlock,
    Clock,
    ChevronRight,
    Circle,
    Loader2,
    CheckCircle,
    ArrowRight,
    Search,
    Filter,
    Activity,
    Target,
    Zap,
    Trophy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CASE_STUDIES, CaseStudy } from "@/config/caseStudies";
import { CelebrationModal } from "@/components/modals/CelebrationModal";
import { useToast } from "@/components/ui/Toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { ProgressRing } from "@/components/primitives/ProgressRing";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function SprintBoard() {
    const params = useParams();
    const router = useRouter();
    const { showToast } = useToast();
    const projectId = params.projectId as string;

    const [project, setProject] = useState<any>(null);
    const [caseData, setCaseData] = useState<CaseStudy | null>(null);
    const [loading, setLoading] = useState(true);
    const [deliverables, setDeliverables] = useState<any[]>([]);
    const [phaseGates, setPhaseGates] = useState<any[]>([]);

    const [activeTab, setActiveTab] = useState<string>("");

    // Celebration state
    const [showCelebration, setShowCelebration] = useState(false);
    const [completedPhaseName, setCompletedPhaseName] = useState("");
    const [nextPhaseName, setNextPhaseName] = useState<string | null>(null);

    useEffect(() => {
        fetchProjectData();
    }, [projectId]);

    const fetchProjectData = async () => {
        try {
            const res = await fetch(`/api/projects/${projectId}`);
            const data = await res.json();
            if (data.project) {
                const prevPhase = project?.currentPhase;

                setProject(data.project);
                setDeliverables(data.project.deliverables || []);
                setPhaseGates(data.project.phaseGates || []);

                const foundCase = CASE_STUDIES.find(c => c.id === data.project.caseId) || CASE_STUDIES[0];
                setCaseData(foundCase);
                
                if (!activeTab) setActiveTab(data.project.currentPhase);

                if (prevPhase && data.project.currentPhase !== prevPhase) {
                    const phases = foundCase.phases;
                    const prevPhaseIdx = phases.findIndex(p => p.name === prevPhase);
                    const nextPhase = phases[prevPhaseIdx + 1]?.name || null;

                    setCompletedPhaseName(prevPhase);
                    setNextPhaseName(nextPhase);
                    setShowCelebration(true);
                }
            }
        } catch (error) {
            showToast('ERROR', "Failed up uplink with command server.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-background p-10 space-y-8">
            <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-64 bg-slate-800" />
                <Skeleton className="h-10 w-32 bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 bg-slate-800 rounded-xl" />)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 bg-slate-800 rounded-2xl" />)}
            </div>
        </div>
    );

    if (!project || !caseData) return <div className="p-20 text-center">Project data corrupted or missing.</div>;

    const overallProgress = project.progressPercentage || 0;

    const getDeliverableStatus = (toolId: string) => {
        const d = deliverables.find(del => del.toolId === toolId);
        return d?.status || 'not-started';
    };

    const isPhaseUnlocked = (phaseName: string) => {
        const gate = phaseGates.find(g => g.phase === phaseName);
        return gate ? gate.status !== 'locked' : true;
    };

    const isPhaseComplete = (phaseName: string) => {
        const gate = phaseGates.find(g => g.phase === phaseName);
        return gate ? gate.status === 'completed' : false;
    };

    const activePhase = caseData.phases.find(p => p.name === activeTab) || caseData.phases[0];

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans text-foreground pb-20">
            <CelebrationModal
                isOpen={showCelebration}
                onClose={() => setShowCelebration(false)}
                phaseName={completedPhaseName}
                nextPhaseName={nextPhaseName}
            />

            {/* Header: Mission Control */}
            <header className="sticky top-0 z-50 h-20 bg-background/80 backdrop-blur-md border-b border-border px-8 flex items-center justify-between shadow-nexus-glow">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.push('/execute')}
                        className="p-2 hover:bg-surface rounded-xl border border-white/5 transition-all text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">MISSION: CRITICAL</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <h1 className="text-xl font-bold font-display tracking-tight text-white leading-none">
                            {caseData.title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    <div className="hidden md:flex flex-col items-end gap-1.5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Global Trajectory</span>
                        <div className="flex items-center gap-3">
                            <div className="w-48 h-1.5 bg-surface border border-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${overallProgress}%` }}
                                    className="h-full bg-gradient-to-r from-primary to-accent"
                                />
                            </div>
                            <span className="text-sm font-black text-white">{overallProgress}%</span>
                        </div>
                    </div>
                    
                    <ProgressRing value={overallProgress} size={54} strokeWidth={6} showValue={false} className="hidden sm:inline-flex" />

                    <Button variant="outline" size="sm" className="hidden lg:flex" onClick={() => router.push('/')}>
                        Command Hub
                    </Button>
                </div>
            </header>

            {/* Phase Navigation Tabs */}
            <div className="px-8 mt-10">
                <div className="flex flex-wrap gap-2 p-1.5 bg-card/50 border border-border rounded-2xl w-full lg:w-max">
                    {caseData.phases.map((phase: any) => {
                        const unlocked = isPhaseUnlocked(phase.name);
                        const completed = isPhaseComplete(phase.name);
                        const isCurrent = activeTab === phase.name;
                        const isSystemCurrent = project.currentPhase === phase.name;

                        return (
                            <button
                                key={phase.name}
                                onClick={() => unlocked && setActiveTab(phase.name)}
                                className={cn(
                                    "flex items-center gap-3 px-6 py-3 rounded-xl transition-all relative group overflow-hidden",
                                    isCurrent ? "bg-primary text-black font-bold shadow-lg shadow-primary/20" : 
                                    unlocked ? "text-slate-400 hover:bg-surface hover:text-white" : "text-slate-700 cursor-not-allowed"
                                )}
                            >
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    completed ? "bg-emerald-500" : (isSystemCurrent ? "bg-yellow-500 animate-pulse" : "bg-slate-700")
                                )} />
                                <span className="text-sm uppercase tracking-widest font-black leading-none">{phase.name}</span>
                                {!unlocked && <Lock className="w-3 h-3 ml-1" />}
                                
                                {isSystemCurrent && !isCurrent && (
                                    <div className="absolute top-0 right-0 p-1">
                                        <div className="w-1 h-1 bg-primary rounded-full" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tool Grid */}
            <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {activePhase.tools.map((tool: any, idx: number) => {
                            const status = getDeliverableStatus(tool.toolId);
                            const d = deliverables.find(del => del.toolId === tool.toolId);
                            const score = d?.score;
                            
                            return (
                                <div
                                    key={tool.toolId}
                                    className={cn(
                                        "group bg-card border border-border rounded-2xl p-6 transition-all flex flex-col relative overflow-hidden",
                                        status === 'complete' ? "opacity-70 border-emerald-500/20" : 
                                        status === 'in-progress' ? "border-primary/40 shadow-nexus-glow" : "hover:border-primary/30"
                                    )}
                                >
                                    {/* Action Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center border transition-all",
                                            status === 'complete' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                                            status === 'in-progress' ? "bg-primary/20 border-primary/40 text-primary" : "bg-surface border-border text-slate-500 group-hover:text-primary"
                                        )}>
                                            {status === 'complete' ? <CheckCircle2 className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            {tool.priority === 'essential' && <Badge variant="destructive" className="text-[8px] uppercase tracking-tighter shadow-sm shadow-red-500/10">Essential</Badge>}
                                            {d && (
                                                <div className={cn(
                                                    "px-2 py-0.5 rounded text-[9px] font-black tracking-tighter border",
                                                    (d.attempts + 1) >= 3 ? "bg-red-500/20 border-red-500/50 text-red-500" :
                                                    (d.attempts + 1) === 2 ? "bg-amber-500/20 border-amber-500/50 text-amber-500" :
                                                    "bg-slate-800 border-white/10 text-slate-400"
                                                )}>
                                                    ATTEMPT {d.attempts + 1} / 3
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tool Info */}
                                    <div className="flex-1 space-y-2 mb-8">
                                        <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors leading-tight">{tool.toolName}</h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">System-assigned protocol for {activeTab} stage implementation.</p>
                                    </div>

                                    {/* Footer Section */}
                                    <div className="pt-6 border-t border-white/5 space-y-4">
                                        <div className="flex items-center justify-between">
                                            {status === 'complete' ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Protocol Verified</span>
                                                    {score !== null && <span className={cn("text-xs font-black", score >= 70 ? "text-emerald-400" : "text-primary")}>{score}%</span>}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{status === 'in-progress' ? 'Establishing Link' : 'Standby Mode'}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button 
                                                variant={status === 'complete' ? "outline" : "nexus"} 
                                                size="sm" 
                                                className="flex-1 py-5 uppercase font-bold tracking-widest text-[10px]"
                                                onClick={() => status !== 'complete' && router.push(`/do/project/${projectId}/tool/${tool.toolId}`)}
                                                disabled={status === 'complete'}
                                            >
                                                {status === 'complete' ? "LOCKED" : status === 'in-progress' ? "RESUME" : "INITIALIZE"}
                                            </Button>
                                            
                                            {status === 'complete' && (
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="px-3 border-emerald-500/20 hover:border-primary group/retry"
                                                    onClick={async () => {
                                                        if (confirm("Initiate retry protocol? 1 attempt will be consumed.")) {
                                                            const res = await fetch(`/api/projects/${projectId}/deliverables/${tool.toolId}/retry`, { method: 'POST' });
                                                            if (res.ok) router.push(`/do/project/${projectId}/tool/${tool.toolId}`);
                                                        }
                                                    }}
                                                >
                                                    <Zap className="w-4 h-4 text-primary group-hover/retry:scale-125 transition-transform" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
