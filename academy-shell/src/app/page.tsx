"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { CaseDetailModal } from "@/components/modals/CaseDetailModal";
import { CustomProjectModal } from "@/components/modals/CustomProjectModal";
import { useAppMode } from "@/context/AppModeContext";
import { useToast } from "@/components/ui/Toast";
import { CASE_STUDIES } from "@/config/caseStudies";
import { Skeleton, CaseSkeleton, ProjectSkeleton } from "@/components/ui/Skeleton";
import { Star, Clock, ChevronRight, Plus, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Home() {
    const { mode } = useAppMode();
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
        // Duplicate Prevention
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
                showToast('SUCCESS', "Project created! Loading your Sprint Board...");
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

    const userRole = user?.role || 'STUDENT';

    if (isLoading) {
        return (
            <div className="flex h-screen bg-[#e8f9fd] overflow-hidden">
                <Sidebar userRole="STUDENT" />
                <div className="flex-1 flex flex-col">
                    <TopBar />
                    <main className="flex-1 overflow-y-auto p-12">
                        <div className="max-w-[1200px] mx-auto space-y-12">
                            <section className="space-y-6">
                                <Skeleton className="h-4 w-48" />
                                <div className="flex gap-6 overflow-hidden">
                                    {[...Array(3)].map((_, i) => <div key={i} className="min-w-[280px]"><ProjectSkeleton /></div>)}
                                </div>
                            </section>
                            <section className="space-y-6">
                                <Skeleton className="h-4 w-32" />
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {[...Array(6)].map((_, i) => <CaseSkeleton key={i} />)}
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#e8f9fd] overflow-hidden text-[#1a1a2e]">
            <TopBar />
            <Sidebar userRole={userRole} />

            <main className="flex-1 overflow-y-auto pt-16 h-full">
                {mode === 'LEARN' ? (
                    <div className="p-12 max-w-7xl mx-auto space-y-12">
                        {/* LEARN content - kept for brevity */}
                        <section className="space-y-4">
                            <h1 className="text-4xl font-display font-black tracking-tight uppercase">Learning Journey Masterclass</h1>
                            <p className="text-[#4b5563] text-lg max-w-3xl">Access the world-class curriculum of Lean Six Sigma.</p>
                        </section>
                    </div>
                ) : (
                    <div className="max-w-[1200px] mx-auto px-8 py-6 space-y-12">
                        <header className="space-y-1">
                            <h1 className="text-[28px] font-bold text-[#1a1a2e]">
                                Welcome back, {user?.name?.split(' ')[0] || 'Student'}
                            </h1>
                            <p className="text-[#4b5563] text-base">
                                Select a case to start executing, or bring your own problem
                            </p>
                        </header>

                        {/* Active Projects Row */}
                        {projects.length > 0 ? (
                            <section className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#ff1e00]" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-[#1a1a2e]">Your Active Projects</h2>
                                </div>
                                <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            onClick={() => router.push(`/do/project/${project.id}/board`)}
                                            className="min-w-[280px] p-5 bg-white rounded-xl border border-[#e5e7eb] shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="font-bold text-[#1a1a2e] group-hover:text-[#ff1e00] transition-colors line-clamp-1">
                                                    {project.title}
                                                </h3>
                                                <span className="px-2 py-0.5 bg-[#e8f9fd] text-[#1a1a2e] text-[10px] font-black rounded-md capitalize">
                                                    {project.framework}
                                                </span>
                                            </div>
                                            <div className="space-y-2 mb-4">
                                                <div className="flex justify-between text-[10px] font-black text-[#4b5563]">
                                                    <span>PROGRESS</span>
                                                    <span>{project.progressPercentage}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-[#e5e7eb] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${project.progressPercentage < 20 ? 'bg-[#ff1e00]' : 'bg-[#59ce8f]'}`}
                                                        style={{ width: `${project.progressPercentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-[10px] text-[#4b5563] font-medium italic">
                                                Phase: {project.currentPhase}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ) : (
                            <section className="flex flex-col items-center justify-center py-12 bg-white/50 rounded-3xl border border-dashed border-[#d1d5db]">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                                    <Plus className="w-8 h-8 text-[#ff1e00]" />
                                </div>
                                <h2 className="text-lg font-bold text-[#1a1a2e]">Ready to put your skills to work?</h2>
                                <p className="text-[#4b5563] mt-1">Pick a case study below to start your first project.</p>
                            </section>
                        )}

                        {/* Case Studies Grid */}
                        <section className="space-y-8">
                            <h2 className="text-xl font-black uppercase tracking-tight text-[#1a1a2e]">Start a New Project</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {CASE_STUDIES.map((caseItem, index) => {
                                    const hasProject = projects.some(p => p.caseId === caseItem.id);
                                    return (
                                        <div
                                            key={caseItem.id}
                                            onClick={() => handleCaseClick(caseItem)}
                                            className={cn(
                                                "relative p-6 bg-white rounded-xl border border-[#e5e7eb] shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-l-[6px] transition-all cursor-pointer group flex flex-col justify-between min-h-[220px]",
                                                caseItem.category === 'medical' ? 'border-l-4 border-l-[#fbe3e8]' :
                                                    caseItem.category === 'investment' ? 'border-l-4 border-l-[#59ce8f]' :
                                                        'border-l-4 border-l-[#1a1a2e]'
                                            )}
                                        >
                                            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#e8f9fd] flex items-center justify-center text-[10px] font-black text-[#1a1a2e]">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-[#1a1a2e] mb-1 group-hover:text-[#ff1e00] transition-colors line-clamp-2">
                                                    {caseItem.title}
                                                </h3>
                                                <div className="inline-block px-2 py-0.5 bg-[#f3f4f6] text-[#4b5563] text-[9px] font-black uppercase rounded-md mb-4">
                                                    {caseItem.category.replace('-', ' ')}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star
                                                                key={s}
                                                                className={`w-3 h-3 ${s <= caseItem.difficulty ? 'fill-[#ff1e00] text-[#ff1e00]' : 'text-[#e5e7eb]'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center pt-4 border-t border-[#e5e7eb]/50">
                                                    <span className="text-[10px] font-black text-[#4b5563] uppercase tracking-widest">
                                                        {hasProject ? "CONTINUE PROJECT" : caseItem.framework}
                                                    </span>
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center transition-all",
                                                        hasProject ? "bg-[#59ce8f] text-white" : "group-hover:bg-[#ff1e00] group-hover:text-white"
                                                    )}>
                                                        {hasProject ? <CheckCircle2 className="w-5 h-5" /> : <ChevronRight className="w-4 h-4" />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Special Card: Solve Your Own Problem */}
                                <div
                                    onClick={() => setIsCustomModalOpen(true)}
                                    className="p-6 bg-[#fbe3e8]/30 rounded-xl border-2 border-dashed border-[#ff1e00] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-4 min-h-[220px] group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6 text-[#ff1e00]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg text-[#1a1a2e]">Solve Your Own Problem</h3>
                                        <p className="text-sm text-[#4b5563] max-w-[200px]">Apply what you've learned to a real problem you're facing</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
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
