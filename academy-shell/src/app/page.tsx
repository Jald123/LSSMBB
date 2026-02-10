"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { WizardModal } from "@/components/modals/WizardModal";
import { useAppMode } from "@/context/AppModeContext";
import { CASE_STUDIES } from "@/config/caseStudies";
import { Star, Clock, ChevronRight, Plus } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Home() {
    const { mode } = useAppMode();
    const [user, setUser] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                    // Fetch real projects
                    fetch(`/api/projects/user/${data.user.id}`)
                        .then(res => res.json())
                        .then(pData => setProjects(pData.projects || []));
                }
            });
    }, []);

    const userRole = user?.role || 'STUDENT';

    return (
        <div className="flex h-screen bg-[#e8f9fd] overflow-hidden text-[#1a1a2e]">
            <TopBar />
            <Sidebar userRole={userRole} />

            <main className="flex-1 overflow-y-auto pt-16 h-full">
                {mode === 'LEARN' ? (
                    <div className="p-12 max-w-7xl mx-auto space-y-12">
                        <section className="space-y-4">
                            <h1 className="text-4xl font-display font-black tracking-tight uppercase">Learning Journey Masterclass</h1>
                            <p className="text-[#6b7280] text-lg max-w-3xl">Access the world-class curriculum of Lean Six Sigma. From fundamentals to advanced statistical tools.</p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {['Fundamentals', 'Define Phase', 'Measure Phase', 'Analyze Phase', 'Improve Phase', 'Control Phase'].map((module, i) => (
                                <div key={module} className="group p-8 rounded-3xl bg-white border border-[#e5e7eb] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ff1e00]/10 text-[#ff1e00] flex items-center justify-center mb-6 font-black text-xl font-orbitron">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{module}</h3>
                                    <p className="text-sm text-[#6b7280] mb-6">Master the core concepts and required tools for this milestone.</p>
                                    <div className="h-1.5 w-full bg-[#f3f4f6] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#ff1e00]" style={{ width: `${(i + 1) * 15}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-[1200px] mx-auto px-8 py-6 space-y-12">
                        {/* Header Section */}
                        <header className="space-y-1">
                            <h1 className="text-[28px] font-bold text-[#1a1a2e]">
                                Welcome back, {user?.name?.split(' ')[0] || 'Student'}
                            </h1>
                            <p className="text-[#6b7280] text-base">
                                Select a case to start executing, or bring your own problem
                            </p>
                        </header>

                        {/* Active Projects Row */}
                        {projects.length > 0 && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#ff1e00]" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-[#1a1a2e]">
                                        Your Active Projects
                                    </h2>
                                </div>
                                <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
                                    {projects.map((project) => {
                                        const progress = 35; // Placeholder
                                        return (
                                            <div
                                                key={project.id}
                                                onClick={() => window.location.href = `/workspace?projectId=${project.id}`}
                                                className="min-w-[280px] p-5 bg-white rounded-xl border border-[#e5e7eb] shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer group"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="font-bold text-[#1a1a2e] group-hover:text-[#ff1e00] transition-colors line-clamp-1">
                                                        {project.title}
                                                    </h3>
                                                    <span className="px-2 py-0.5 bg-[#e8f9fd] text-[#1a1a2e] text-[10px] font-black rounded-md">
                                                        {project.framework?.name || 'DMAIC'}
                                                    </span>
                                                </div>
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex justify-between text-[10px] font-black text-[#6b7280]">
                                                        <span>PROGRESS</span>
                                                        <span>{progress}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-[#e5e7eb] rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full transition-all duration-1000 ${progress < 20 ? 'bg-[#ff1e00]' : 'bg-[#59ce8f]'}`}
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-[10px] text-[#6b7280] font-medium italic">
                                                    Last active: 2h ago
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Case Studies Grid */}
                        <section className="space-y-8">
                            <h2 className="text-xl font-black uppercase tracking-tight text-[#1a1a2e]">Start a New Project</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {CASE_STUDIES.map((caseItem, index) => (
                                    <div
                                        key={caseItem.id}
                                        onClick={() => setIsWizardOpen(true)}
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
                                            <h3 className="font-bold text-lg text-[#1a1a2e] mb-1 group-hover:text-[#ff1e00] transition-colors">{caseItem.title}</h3>
                                            <div className="inline-block px-2 py-0.5 bg-[#f3f4f6] text-[#6b7280] text-[9px] font-black uppercase rounded-md mb-4">
                                                {caseItem.category.replace('-', ' ')}
                                            </div>
                                            <p className="text-sm text-[#6b7280] line-clamp-2 mb-4 leading-snug">
                                                {caseItem.description}
                                            </p>
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
                                                <div className="flex items-center gap-1.5 text-[#6b7280] text-[11px] font-bold">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    ~{caseItem.estimatedHours} HOURS
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center pt-4 border-t border-[#e5e7eb]/50">
                                                <span className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest">{caseItem.framework}</span>
                                                <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center group-hover:bg-[#ff1e00] group-hover:text-white transition-all">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Special Card: Solve Your Own Problem */}
                                <div
                                    onClick={() => setIsWizardOpen(true)}
                                    className="p-6 bg-[#fbe3e8]/30 rounded-xl border-2 border-dashed border-[#ff1e00] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-4 min-h-[220px] group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6 text-[#ff1e00]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg text-[#1a1a2e]">Solve Your Own Problem</h3>
                                        <p className="text-sm text-[#6b7280] max-w-[200px]">Apply what you've learned to a real problem you're facing</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </main>

            {/* Wizard Modal */}
            <WizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
        </div>
    );
}
