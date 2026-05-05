"use client";

import { useState, useEffect } from "react";
import { CaseDetailModal } from "@/components/modals/CaseDetailModal";
import { CustomProjectModal } from "@/components/modals/CustomProjectModal";
import { useToast } from "@/components/ui/Toast";
import { CASE_STUDIES } from "@/config/caseStudies";
import { Skeleton, CaseSkeleton, ProjectSkeleton } from "@/components/ui/Skeleton";
import { Star, ChevronRight, Plus, CheckCircle2, Play, Trophy, Activity, Zap, Target, BookOpen, Search as SniperIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { MetricCard } from "@/components/primitives/MetricCard";
import { ProgressRing } from "@/components/primitives/ProgressRing";
import { StepIndicator } from "@/components/primitives/StepIndicator";
import { EmptyState } from "@/components/primitives/EmptyState";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Dashboard() {
    const { showToast } = useToast();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Modal states
    const [selectedCase, setSelectedCase] = useState<any>(null);
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    // Filtering states
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [activeFramework, setActiveFramework] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Fetch user and projects in parallel to reduce load time
                const [userRes, projectsRes] = await Promise.all([
                    fetch("/api/auth/me"),
                    fetch("/api/projects?status=active")
                ]);

                const userData = await userRes.json();
                const projectsData = await projectsRes.json();

                if (userData.user) {
                    setUser(userData.user);
                    setProjects(projectsData.projects || []);
                }
            } catch (error) {
                console.error("Initialization error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const handleCaseClick = (caseItem: any) => {
        const existingProject = projects.find(p => p.caseId === caseItem.id);
        if (existingProject) {
            router.push(`/do/project/${existingProject.id}/board`);
            return;
        }
        setSelectedCase(caseItem);
    };

    const startProject = async (caseId: string, framework: string, customData?: any) => {
        try {
            setIsCreating(true);
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    caseId,
                    framework,
                    title: customData?.title,
                    description: customData?.description
                })
            });

            const data = await res.json();
            if (data.project) {
                showToast('SUCCESS', "Project created! Loading Sprint Board...");
                router.push(`/do/project/${data.project.id}/board`);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            showToast('ERROR', "Failed to create project. Please try again.");
        } finally {
            setIsCreating(false);
            setSelectedCase(null);
            setIsCustomModalOpen(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col h-full bg-background">
                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <Skeleton className="h-10 w-64 bg-slate-200 dark:bg-slate-800" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800" />)}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Skeleton className="h-[300px] lg:col-span-2 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                            <Skeleton className="h-[300px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const latestProject = projects.length > 0 ? projects[0] : null;
    const currentFrameworkInfo = latestProject ? (latestProject.framework === 'DMAIC' ? { color: '#3b82f6' } : { color: '#c2983d' }) : { color: '#c2983d' };

    // Hardcoded DMAIC steps for the visualization
    const dmaicSteps = [
        { id: "define", label: "Define", status: latestProject?.progressPercentage >= 20 ? "complete" : "current" as any },
        { id: "measure", label: "Measure", status: latestProject?.progressPercentage >= 40 ? "complete" : (latestProject?.progressPercentage >= 20 ? "current" : "upcoming") as any },
        { id: "analyze", label: "Analyze", status: latestProject?.progressPercentage >= 60 ? "complete" : (latestProject?.progressPercentage >= 40 ? "current" : "upcoming") as any },
        { id: "improve", label: "Improve", status: latestProject?.progressPercentage >= 80 ? "complete" : (latestProject?.progressPercentage >= 60 ? "current" : "upcoming") as any },
        { id: "control", label: "Control", status: latestProject?.progressPercentage >= 100 ? "complete" : (latestProject?.progressPercentage >= 80 ? "current" : "upcoming") as any },
    ];

    const laserKeyframes = `
    @keyframes laser-sweep {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    `;

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <style>{laserKeyframes}</style>
            <main className="flex-1 h-full p-4 lg:p-6 pt-2 lg:pt-3 pb-0 lg:pb-0 overflow-hidden">
                <div className="max-w-[1600px] mx-auto h-fit flex flex-col space-y-3 lg:space-y-5 mb-0">
                    
                    <div className="pt-1 space-y-0.5">
                        <p className="text-[var(--nexus-text)] text-base lg:text-xl font-black uppercase tracking-tight">
                            Welcome to the Nexus Academy Command Terminal.
                        </p>
                        <p className="text-[var(--nexus-text-muted)] text-[10px] lg:text-xs font-medium tracking-widest uppercase">
                            Authenticated as Operator: <span className="text-primary font-black">{user?.name || 'Unknown'}</span>
                        </p>
                    </div>

                    {/* Quick Stats Row - Compact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard 
                            title="Active Projects" 
                            value={projects.length} 
                            description="Live DMAIC Missions"
                            hasLaser={true}
                            icon={<Activity className="w-5 h-5 text-sky-400" />}
                        />
                        <MetricCard 
                            title="LSS Level" 
                            value="Green Belt" 
                            trend="up" 
                            trendValue="+12%"
                            description="Rank: Specialist"
                            hasLaser={true}
                            icon={<Zap className="w-5 h-5 text-nexus-gold" />}
                        />
                        <MetricCard 
                            title="Total XP" 
                            value="4,820" 
                            description="Next: 5,000"
                            hasLaser={true}
                            icon={<Trophy className="w-5 h-5 text-primary" />}
                        />
                        <MetricCard 
                            title="Mastery Index" 
                            value="78%" 
                            trend="up"
                            trendValue="3.2%"
                            description="Cumulative Accuracy"
                            hasLaser={true}
                            icon={<Target className="w-5 h-5 text-emerald-400" />}
                        />
                    </div>

                    {/* Dashboard Primary Grid - Viewport Locked */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                        
                        {/* 1. Unified Hero Mission Card */}
                        <div className="lg:col-span-2 flex flex-col space-y-4 lg:space-y-6 min-h-0">
                            {latestProject ? (
                                <div className="relative group p-[2px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-fit flex flex-col">
                                    {/* Animated Laser Border */}
                                    <div 
                                        className="absolute inset-0 z-0 animate-[laser-sweep_10s_linear_infinite]"
                                        style={{
                                            background: `conic-gradient(from 0deg, transparent 60%, ${currentFrameworkInfo.color} 80%, #ffffff 90%, ${currentFrameworkInfo.color} 100%)`,
                                            margin: '-100%'
                                        }}
                                    />

                                    <div className="relative z-10 nexus-card p-4 lg:p-5 space-y-3 lg:space-y-4 rounded-[calc(1.5rem-2px)] overflow-hidden flex flex-col justify-start">
                                        {/* Decorative Background */}
                                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none" />
                                        
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 relative z-10">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-primary/20 text-primary text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-primary/20">Active Protocol</span>
                                                    <span className="text-[var(--nexus-text-muted)] text-[9px] font-black uppercase tracking-[0.2em] opacity-60">System Node: Alpha-7</span>
                                                </div>
                                                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-[var(--nexus-text)] leading-none">
                                                    {latestProject.title.split(' ').map((word: string, i: number) => (
                                                        <span key={i} className={i === 0 ? "text-[var(--nexus-text)]" : "text-primary/90"}>{word} </span>
                                                    ))}
                                                </h2>
                                                <p className="text-[var(--nexus-text-muted)] text-xs font-medium max-w-md">
                                                    {latestProject.framework} Framework Deployment <span className="mx-2 opacity-20">|</span> 
                                                    Status: <span className="text-primary font-bold uppercase tracking-widest">{latestProject.currentPhase}</span>
                                                </p>
                                            </div>
                                            <div className="relative shrink-0">
                                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                                <div className="relative flex items-center justify-center">
                                                    <ProgressRing value={latestProject.progressPercentage} size={70} strokeWidth={7} showValue={false} />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                        <span className="text-xl font-black text-white leading-none">{latestProject.progressPercentage}%</span>
                                                        <span className="text-[7px] font-black uppercase tracking-widest text-primary/80">Mastery</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-1 relative z-10 bg-white/[0.02] p-3 lg:p-4 rounded-xl border border-white/5 backdrop-blur-sm [&_.step-label]:text-white/60 [&_.step-label-active]:text-white [&_.step-label-complete]:text-primary/90">
                                            <StepIndicator steps={dmaicSteps} />
                                        </div>

                                        <div className="pt-1 flex flex-col sm:flex-row gap-2 relative z-10">
                                            <Button variant="nexus" size="lg" className="flex-1 font-black tracking-widest uppercase py-4 text-[10px] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all" onClick={() => router.push(`/do/project/${latestProject.id}/board`)}>
                                                Resume Mission <Play className="ml-2 w-3 h-3 fill-current" />
                                            </Button>
                                            <Button variant="outline" size="lg" className="flex-1 font-black tracking-widest uppercase py-4 text-[10px] border-white/10 hover:bg-white hover:text-black transition-all" onClick={() => router.push('/library')}>
                                                Launch New Mission
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <EmptyState 
                                    title="No Active Operations"
                                    description="The command terminal is currently idle. Select a protocol from the MISSION SELECTION LIBRARY to begin your journey."
                                    actionLabel="Browse Missions"
                                    onAction={() => router.push('/library')}
                                    className="h-full nexus-card"
                                />
                            )}

                        </div>

                        {/* 2. Side Panel: News & Progress */}
                        <div className="flex flex-col min-h-0 h-fit space-y-4 lg:space-y-6">
                            <div className="nexus-card p-4 lg:p-5 space-y-3 flex-1 flex flex-col justify-start shadow-2xl relative overflow-hidden group min-h-0 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
                                
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--nexus-text-muted)]">Daily Objectives</h3>
                                    <Zap className="w-4 h-4 text-nexus-gold animate-pulse" />
                                </div>

                                <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1 py-2">
                                    {[
                                        { t: "Complete MSA Module", xp: 150, done: true },
                                        { t: "Submit Process Map", xp: 200, done: false },
                                        { t: "Review Sigma Level", xp: 100, done: false },
                                    ].map((obj, i) => (
                                        <div key={i} className="flex items-center justify-between group/obj">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-5 h-5 rounded-lg border flex items-center justify-center transition-all duration-300 shrink-0",
                                                    obj.done ? "bg-emerald-500 border-emerald-500 text-black" : "border-white/20 group-hover/obj:border-primary/50 group-hover/obj:bg-white/10"
                                                )}>
                                                    {obj.done && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                                                </div>
                                                <span className={cn("text-xs transition-colors", obj.done ? "text-white/30 line-through" : "text-white/80 font-bold group-hover/obj:text-white")}>{obj.t}</span>
                                            </div>
                                            <span className="text-[9px] font-black text-primary group-hover/obj:text-sky-300 transition-colors shrink-0">+{obj.xp} XP</span>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" className="w-full text-[9px] font-black uppercase tracking-[0.2em] py-3 border border-white/10 hover:bg-white hover:text-black transition-all text-[var(--nexus-text-muted)]">View All Quests</Button>
                            </div>

                            {/* Global Rank Card - Moved to Sidebar */}
                            <div className="nexus-card p-4 lg:p-6 text-center space-y-3 relative overflow-hidden group shadow-2xl shrink-0 w-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="space-y-1 relative z-10">
                                    <p className="text-[10px] font-black text-[var(--nexus-text-muted)] uppercase tracking-[0.25em]">Global Rank</p>
                                    <p className="text-4xl font-black font-display text-[var(--nexus-text)] tracking-tighter leading-none">#242</p>
                                </div>
                                <p className="text-[10px] text-[var(--nexus-text-muted)] font-medium relative z-10">Top 4% of Operators Worldwide</p>
                                <div className="pt-1 relative z-10">
                                    <Button variant="outline" size="sm" className="w-full font-black uppercase tracking-widest text-[9px] border-white/10 hover:border-primary/50 transition-all py-4" onClick={() => router.push('/leaderboard')}>Leaderboard</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


