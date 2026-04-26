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
                        title={`MISSION SELECTION LIBRARY`} 
                        description={`Authenticated as Operator: ${user?.name || 'Unknown'}. Select a tactical scenario to begin your professional mastery sequence.`}
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

                    {/* Mission Selection Library Only */}
                    <section id="cases-section" className="space-y-8 pt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-6">
                            <h2 className="text-3xl font-black font-orbitron tracking-tighter text-primary flex items-center gap-4 italic uppercase whitespace-nowrap">
                                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                    <BookOpen className="w-6 h-6 shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
                                </div>
                                Mission Selection Library
                            </h2>

                            <div className="flex-1 flex flex-col sm:flex-row gap-4 items-center justify-end w-full">
                                {/* Search Bar */}
                                <div className="relative w-full max-w-xs group">
                                    <SniperIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <input 
                                        type="text" 
                                        placeholder="Search missions..." 
                                        className="w-full bg-surface/50 border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Category Filters */}
                                <div className="flex gap-1.5 p-1 bg-surface/30 border border-border rounded-[14px] overflow-x-auto no-scrollbar max-w-full">
                                    {["All", "medical", "daily-life"].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={cn(
                                                "px-4 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                                activeCategory === cat ? "bg-primary text-black shadow-lg shadow-primary/20" : "text-slate-500 hover:text-white"
                                            )}
                                        >
                                            {cat === "All" ? "ALL SECTORS" : cat.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>

                                {/* Framework Filters */}
                                <div className="flex gap-1.5 p-1 bg-surface/30 border border-border rounded-[14px] overflow-x-auto no-scrollbar max-w-full">
                                    {["All", "DMAIC", "DMADV", "Kaizen", "FOCUS-PDCA"].map((fw) => (
                                        <button
                                            key={fw}
                                            onClick={() => setActiveFramework(fw)}
                                            className={cn(
                                                "px-4 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                                activeFramework === fw ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" : "text-slate-500 hover:text-white"
                                            )}
                                        >
                                            {fw === "All" ? "ALL CORE" : fw}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {CASE_STUDIES.filter(c => {
                                const matchesCat = activeCategory === "All" || c.category === activeCategory;
                                const matchesFW = activeFramework === "All" || c.framework === activeFramework;
                                const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                       c.description.toLowerCase().includes(searchQuery.toLowerCase());
                                return matchesCat && matchesFW && matchesSearch;
                            }).map((caseItem, index) => {
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
                                                <Badge variant="outline" className="bg-slate-950 text-white uppercase tracking-widest text-[10px] py-1 border-white/10 px-2">{caseItem.category.replace('-', ' ')}</Badge>
                                                <span className="text-slate-400 font-mono text-[10px] opacity-60 select-none">ID-{String(index + 1).padStart(3, '0')}</span>
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight tracking-tight">
                                                {caseItem.title}
                                            </h3>
                                            <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-1 group-hover:text-slate-700 transition-colors">
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
                                            <div className="flex justify-between items-center pt-5 border-t border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
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
                                    <p className="text-xs text-muted-foreground max-w-[220px] font-medium leading-relaxed">Initialize a new operations parameter with external dataset injection & 4-attempt mastery protocol.</p>
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
