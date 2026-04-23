"use client";

import { useState, useEffect } from "react";
import { CaseDetailModal } from "@/components/modals/CaseDetailModal";
import { CustomProjectModal } from "@/components/modals/CustomProjectModal";
import { useToast } from "@/components/ui/Toast";
import { CASE_STUDIES } from "@/config/caseStudies";
import { Skeleton, CaseSkeleton, ProjectSkeleton } from "@/components/ui/Skeleton";
import { Star, ChevronRight, Plus, CheckCircle2, Play, Trophy, Activity, Zap, Target, BookOpen } from "lucide-react";
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

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                    fetchProjects();
                } else {
                    setIsLoading(false);
                }
            });
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects?status=active");
            const data = await res.json();
            setProjects(data.projects || []);
        } catch (error) {
            console.error("Failed to fetch projects");
        } finally {
            setIsLoading(false);
        }
    };

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
            <div className="flex-1 flex flex-col h-full bg-[#020617]">
                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <Skeleton className="h-10 w-64 bg-slate-800" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl bg-slate-800" />)}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Skeleton className="h-[300px] lg:col-span-2 rounded-2xl bg-slate-800" />
                            <Skeleton className="h-[300px] rounded-2xl bg-slate-800" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const latestProject = projects.length > 0 ? projects[0] : null;

    // Hardcoded DMAIC steps for the visualization
    const dmaicSteps = [
        { id: "define", label: "Define", status: latestProject?.progressPercentage >= 20 ? "complete" : "current" as any },
        { id: "measure", label: "Measure", status: latestProject?.progressPercentage >= 40 ? "complete" : (latestProject?.progressPercentage >= 20 ? "current" : "upcoming") as any },
        { id: "analyze", label: "Analyze", status: latestProject?.progressPercentage >= 60 ? "complete" : (latestProject?.progressPercentage >= 40 ? "current" : "upcoming") as any },
        { id: "improve", label: "Improve", status: latestProject?.progressPercentage >= 80 ? "complete" : (latestProject?.progressPercentage >= 60 ? "current" : "upcoming") as any },
        { id: "control", label: "Control", status: latestProject?.progressPercentage >= 100 ? "complete" : (latestProject?.progressPercentage >= 80 ? "current" : "upcoming") as any },
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    
                    <PageHeader 
                        title={`Command Center`} 
                        description={`Authenticated as Operator: ${user?.name || 'Unknown'}. Welcome to the Nexus Academy Terminal.`}
                        actions={
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm" onClick={() => router.push('/academy')}>
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    The Academy
                                </Button>
                                <Button variant="nexus" size="sm" onClick={() => router.push('/armory')}>
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Armory
                                </Button>
                            </div>
                        }
                    />

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard 
                            title="Active Projects" 
                            value={projects.length} 
                            description="Live DMAIC Missions"
                            icon={<Activity className="w-4 h-4" />}
                        />
                        <MetricCard 
                            title="LSS Level" 
                            value="Green Belt" 
                            trend="up" 
                            trendValue="+12%"
                            description="Rank: Specialist"
                            icon={<Zap className="w-4 h-4 text-nexus-gold" />}
                        />
                        <MetricCard 
                            title="Total XP" 
                            value="4,820" 
                            description="Next: 5,000"
                            icon={<Trophy className="w-4 h-4" />}
                        />
                        <MetricCard 
                            title="Mastery Index" 
                            value="78%" 
                            trend="up"
                            trendValue="3.2%"
                            description="Cumulative Accuracy"
                            icon={<Target className="w-4 h-4" />}
                        />
                    </div>

                    {/* Dashboard Primary Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* 1. Unified Hero Mission Card */}
                        <div className="lg:col-span-2 flex flex-col space-y-6">
                            {latestProject ? (
                                <div className="rounded-2xl border border-border bg-card p-1 shadow-nexus-glow overflow-hidden">
                                    <div className="p-8 space-y-8">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <Badge variant="nexus" className="mb-2">ACTIVE PROTOCOL</Badge>
                                                <h2 className="text-3xl font-bold font-display tracking-tight text-white">{latestProject.title}</h2>
                                                <p className="text-muted-foreground">{latestProject.framework} • Phase: <span className="text-primary font-bold uppercase">{latestProject.currentPhase}</span></p>
                                            </div>
                                            <div className="hidden sm:block">
                                                <ProgressRing value={latestProject.progressPercentage} size={90} strokeWidth={8} />
                                            </div>
                                        </div>

                                        <div className="py-4">
                                            <StepIndicator steps={dmaicSteps} />
                                        </div>

                                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                                            <Button variant="nexus" size="lg" className="flex-1 font-bold tracking-widest uppercase" onClick={() => router.push(`/do/project/${latestProject.id}/board`)}>
                                                Resume Mission <Play className="ml-2 w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="lg" className="flex-1 font-bold tracking-widest uppercase" onClick={() => router.push('/execute')}>
                                                View Portfolio
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <EmptyState 
                                    title="No Active Operations"
                                    description="The command center is currently idle. Initialize a mission from the mission database below to begin your journey."
                                    actionLabel="Browse Missions"
                                    onAction={() => document.getElementById('cases-section')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="h-full border-white/5"
                                />
                            )}
                        </div>

                        {/* 2. Side Panel: News & Progress */}
                        <div className="space-y-6">
                            <div className="rounded-2xl border border-border bg-card p-6 space-y-6 flex flex-col justify-between">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-4">Daily Objectives</h3>
                                <div className="space-y-4">
                                    {[
                                        { t: "Complete MSA Module", xp: 150, done: true },
                                        { t: "Submit Process Map", xp: 200, done: false },
                                        { t: "Review Sigma Level", xp: 100, done: false },
                                    ].map((obj, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                                                    obj.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-border group-hover:border-primary"
                                                )}>
                                                    {obj.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                </div>
                                                <span className={cn("text-sm", obj.done ? "text-muted-foreground line-through" : "text-foreground font-medium")}>{obj.t}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-primary">+{obj.xp} XP</span>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" className="w-full text-xs font-black uppercase tracking-widest">View All Quests</Button>
                            </div>

                            <div className="rounded-2xl border border-border bg-card p-6 text-center space-y-4 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Global Rank</p>
                                    <p className="text-4xl font-black font-display text-white italic tracking-tighter">#242</p>
                                </div>
                                <p className="text-xs text-muted-foreground">Top 4% of Operators Worldwide</p>
                                <div className="pt-2">
                                    <Button variant="outline" size="sm" className="w-full">Leaderboard</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Case Studies Database */}
                    <section id="cases-section" className="space-y-8 pt-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-6">
                            <h2 className="text-3xl font-black font-orbitron tracking-tighter text-primary flex items-center gap-4 italic uppercase">
                                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                    <BookOpen className="w-6 h-6 shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
                                </div>
                                Mission Selection Library
                            </h2>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="cursor-pointer hover:bg-surface">All</Badge>
                                <Badge variant="outline" className="opacity-40">Medical</Badge>
                                <Badge variant="outline" className="opacity-40">Finance</Badge>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {CASE_STUDIES.map((caseItem, index) => {
                                const hasProject = projects.some(p => p.caseId === caseItem.id);
                                return (
                                    <div
                                        key={caseItem.id}
                                        onClick={() => handleCaseClick(caseItem)}
                                        className={cn(
                                            "relative p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-primary/5 shadow-2xl transition-all cursor-pointer group flex flex-col justify-between min-h-[280px]",
                                            hasProject ? "border-primary/40 bg-surface/50" : ""
                                        )}
                                    >
                                        <div>
                                            <div className="flex items-start justify-between mb-4">
                                                <Badge variant="outline" className="bg-[#020617] uppercase tracking-widest text-[10px] py-1 border-white/10">{caseItem.category.replace('-', ' ')}</Badge>
                                                <span className="text-muted-foreground font-mono text-[10px] opacity-30 select-none">ID-{String(index + 1).padStart(3, '0')}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-1 text-white group-hover:text-primary transition-colors leading-tight">
                                                {caseItem.title}
                                            </h3>
                                            <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 group-hover:text-slate-300 transition-colors">
                                                {caseItem.description}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center gap-1.5">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star
                                                        key={s}
                                                        className={`w-4 h-4 ${s <= caseItem.difficulty ? 'fill-[#22d3ee] text-[#22d3ee]' : 'text-slate-800'}`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center pt-5 border-t border-white/5">
                                                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                                                    {hasProject ? "CONTINUE PROTOCOL" : caseItem.framework}
                                                </span>
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                                    hasProject ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-slate-400 group-hover:bg-primary group-hover:text-black"
                                                )}>
                                                    {hasProject ? <CheckCircle2 className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}                     

                            {/* Create Custom Mission Card */}
                            <div
                                onClick={() => setIsCustomModalOpen(true)}
                                className="p-8 bg-primary/[0.03] rounded-2xl border-2 border-dashed border-primary/20 hover:border-primary/50 hover:bg-primary/[0.05] transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-6 min-h-[280px] group"
                            >
                                <div className="w-16 h-16 rounded-3xl bg-[#020617] border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all">
                                    <Plus className="w-8 h-8 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-primary italic font-display uppercase tracking-wider">Deploy Custom</h3>
                                    <p className="text-xs text-muted-foreground max-w-[220px] font-medium leading-relaxed">Initialize a new operations parameter with external dataset injection.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <CaseDetailModal
                isOpen={!!selectedCase}
                onClose={() => setSelectedCase(null)}
                caseStudy={selectedCase}
                onStartProject={startProject}
                isCreating={isCreating}
            />

            <CustomProjectModal
                isOpen={isCustomModalOpen}
                onClose={() => setIsCustomModalOpen(false)}
                onStartProject={(data) => startProject('custom', data.framework, data)}
                isCreating={isCreating}
            />
        </div>
    );
}
