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
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { CASE_STUDIES, CaseStudy } from "@/config/caseStudies";
import { CelebrationModal } from "@/components/modals/CelebrationModal";
import { useToast } from "@/components/ui/Toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

                // Find matching case study from config
                const foundCase = CASE_STUDIES.find(c => c.id === data.project.caseId) || CASE_STUDIES[0];
                setCaseData(foundCase);

                // Handle Phase Completion Celebration
                if (prevPhase && data.project.currentPhase !== prevPhase) {
                    const phases = foundCase.phases;
                    const prevPhaseIdx = phases.findIndex(p => p.name === prevPhase);
                    const nextPhase = phases[prevPhaseIdx + 1]?.name || null;

                    setCompletedPhaseName(prevPhase);
                    setNextPhaseName(nextPhase);
                    setShowCelebration(true);
                }

                // Handle Project Completion
                if (data.project.progressPercentage === 100 && data.project.status !== 'completed') {
                    // router.push(`/do/project/${projectId}/complete`);
                }
            }
        } catch (error) {
            showToast('ERROR', "Failed to load board data.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#e8f9fd] flex flex-col">
            <header className="h-14 bg-white border-b-[3px] border-[#ff1e00] px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="space-y-1">
                        <Skeleton className="w-20 h-2" />
                        <Skeleton className="w-32 h-4" />
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <Skeleton className="w-48 h-6" />
                </div>
            </header>
            <div className="flex-1 overflow-x-auto p-6">
                <div className="flex gap-4 h-full">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-[320px] space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                                <Skeleton className="h-0.5 w-full" />
                            </div>
                            <div className="space-y-3">
                                {[...Array(4)].map((_, j) => (
                                    <div key={j} className="h-32 bg-white rounded-xl p-4 border border-[#e5e7eb]">
                                        <Skeleton className="h-4 w-3/4 mb-4" />
                                        <Skeleton className="h-10 w-full rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (!project || !caseData) return <div>Project not found.</div>;

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

    return (
        <div className="min-h-screen bg-[#e8f9fd] flex flex-col font-sans text-[#1a1a2e]">
            {/* Celebration Modal */}
            <CelebrationModal
                isOpen={showCelebration}
                onClose={() => setShowCelebration(false)}
                phaseName={completedPhaseName}
                nextPhaseName={nextPhaseName}
            />

            {/* Top Context Bar */}
            <header className="sticky top-0 z-50 h-14 bg-white border-b-[3px] border-[#ff1e00] px-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/?mode=do')}
                        className="p-1 hover:bg-[#f3f4f6] rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#1a1a2e]" />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-widest text-[#4b5563] uppercase opacity-60 leading-none">Sprint Board</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm tracking-tight">{caseData.title}</span>
                            <span className="px-1.5 py-0.5 bg-[#e8f9fd] text-[#1a1a2e] text-[9px] font-black rounded uppercase">
                                {project.framework}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-[#4b5563]">OVERALL PROGRESS</span>
                        <div className="w-32 h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${overallProgress}%` }}
                                className="h-full bg-[#59ce8f] transition-all"
                            />
                        </div>
                        <span className="text-xs font-black text-[#1a1a2e]">{overallProgress}%</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#59ce8f]" />
                        <span className="text-[10px] font-bold text-[#4b5563]">Project Active</span>
                    </div>
                </div>
            </header>

            {/* Kanban Board Container */}
            <div className="flex-1 overflow-x-auto p-6 scrollbar-hide">
                <div className="flex gap-4 h-full min-w-max">
                    {caseData.phases.map((phase: any, phaseIndex: number) => {
                        const unlocked = isPhaseUnlocked(phase.name);
                        const phaseTools = phase.tools;
                        const phaseCompleted = phaseTools.filter((t: any) => getDeliverableStatus(t.toolId) === 'complete').length;
                        const phaseStatus = isPhaseComplete(phase.name) ? 'complete' : (phaseCompleted > 0 ? 'in-progress' : 'not-started');

                        return (
                            <React.Fragment key={phase.name}>
                                {/* Column */}
                                <div className={cn("w-[320px] flex flex-col gap-6", !unlocked && "opacity-50 pointer-events-none")}>
                                    {/* Column Header */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-lg uppercase tracking-tight">{phase.name}</span>
                                                <span className="text-xs font-bold text-[#4b5563]">({phaseCompleted}/{phaseTools.length})</span>
                                            </div>
                                            <div>
                                                {phaseStatus === 'complete' ? (
                                                    <CheckCircle2 className="w-5 h-5 text-[#59ce8f]" />
                                                ) : phaseStatus === 'in-progress' ? (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff1e00] animate-pulse" />
                                                ) : (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#d1d5db]" />
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={cn(
                                                "h-0.5 w-full",
                                                phaseStatus === 'complete' ? 'bg-[#59ce8f]' : (phaseStatus === 'in-progress' ? 'bg-[#ff1e00]' : 'bg-[#d1d5db]')
                                            )}
                                        />
                                    </div>

                                    {/* Column Body - Tool Cards */}
                                    <div className="flex flex-col gap-3">
                                        {phaseTools.map((tool: any) => {
                                            const status = getDeliverableStatus(tool.toolId);
                                            return (
                                                <div
                                                    key={tool.toolId}
                                                    onClick={() => router.push(`/do/project/${projectId}/tool/${tool.toolId}`)}
                                                    className={cn(
                                                        "relative overflow-hidden bg-white rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer border-l-4 group",
                                                        status === 'complete' ? 'border-l-[#59ce8f] opacity-85' :
                                                            (status === 'in-progress' ? 'border-l-[#ff1e00]' :
                                                                (tool.priority === 'essential' ? 'border-l-[#ff1e00]' :
                                                                    (tool.priority === 'recommended' ? 'border-l-[#fbe3e8]' : 'border-l-transparent')))
                                                    )}
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h4 className="font-bold text-sm leading-tight max-w-[180px] group-hover:text-[#ff1e00] transition-colors">
                                                            {tool.toolName}
                                                        </h4>
                                                        {tool.priority === 'essential' && (
                                                            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded border border-[#ff1e00] text-[#ff1e00] bg-[#ff1e00]/5">
                                                                Essential
                                                            </span>
                                                        )}
                                                        {tool.priority === 'recommended' && (
                                                            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-[#fbe3e8] text-[#4b5563]">
                                                                Recommended
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        {status === 'complete' ? (
                                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#59ce8f] text-white text-[9px] font-black rounded uppercase">
                                                                <CheckCircle2 className="w-3 h-3" />
                                                                Complete
                                                            </div>
                                                        ) : status === 'in-progress' ? (
                                                            <div className="px-2 py-1 border border-[#ff1e00] text-[#ff1e00] text-[9px] font-black rounded uppercase">
                                                                In Progress
                                                            </div>
                                                        ) : (
                                                            <div className="px-2 py-1 border border-[#d1d5db] text-[#4b5563] text-[9px] font-black rounded uppercase">
                                                                Not Started
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {phaseIndex === 0 && phaseCompleted === 0 && (
                                            <div className="mt-2 text-[10px] font-bold text-[#ff1e00] animate-bounce flex items-center justify-center gap-1">
                                                Start here <ArrowRight className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Phase Gate Indicator */}
                                {phaseIndex < caseData.phases.length - 1 && (
                                    <div className="flex flex-col items-center justify-center px-4 self-stretch">
                                        <div className={cn(
                                            "flex-1 w-px border-l-2 border-dashed",
                                            isPhaseComplete(phase.name) ? "border-[#59ce8f]" : "border-[#d1d5db]"
                                        )} />
                                        <div className={cn(
                                            "p-1.5 rounded-full my-4 transition-all duration-700",
                                            isPhaseComplete(phase.name) ? "bg-[#59ce8f] text-white scale-110" : "bg-white border-2 border-[#d1d5db] text-[#d1d5db]"
                                        )}>
                                            {isPhaseComplete(phase.name) ? <CheckCircle className="w-3.5 h-3.5" /> : (unlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />)}
                                        </div>
                                        <div className={cn(
                                            "flex-1 w-px border-l-2 border-dashed",
                                            isPhaseComplete(phase.name) ? "border-[#59ce8f]" : "border-[#d1d5db]"
                                        )} />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
