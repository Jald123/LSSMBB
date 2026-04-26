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
                                            <Button variant="outline" size="lg" className="flex-1 font-bold tracking-widest uppercase" onClick={() => router.push('/library')}>
                                                Launch New Mission
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <EmptyState 
                                    title="No Active Operations"
                                    description="The command center is currently idle. Initialize a mission from the professional library to begin your journey."
                                    actionLabel="Browse Registry"
                                    onAction={() => router.push('/library')}
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

                </div>
            </main>
        </div>
    );
}
