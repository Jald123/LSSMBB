"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/primitives/MetricCard";
import { FRAMEWORKS, type Phase, type Lesson } from "@/config/curriculum";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { ProgressRing } from "@/components/primitives/ProgressRing";
import { 
    BookOpen, 
    Lock, 
    Play, 
    CheckCircle2, 
    Clock, 
    Video, 
    FileText, 
    Wrench,
    ChevronRight,
    Search,
    Zap,
    ShieldCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function LearnHub() {
    const [activeFramework, setActiveFramework] = useState('dmaic');
    const [selectedPhase, setSelectedPhase] = useState<Phase>(FRAMEWORKS.dmaic[1]); // Default to Phase 1 to avoid Phase 0 banner duplication
    const router = useRouter();

    const frameworks = [
        { id: 'dmaic', label: 'DMAIC (Improve)' },
        { id: 'dmadv', label: 'DMADV (Design)' },
        { id: 'kaizen', label: 'Kaizen (Event)' },
        { id: 'focus', label: 'FOCUS PDCA (Quality)' },
    ];

    const handleLessonClick = (lesson: Lesson) => {
        if (lesson.status === "locked") return;
        if (lesson.toolUrl) {
            router.push(lesson.toolUrl);
        }
    };

    const currentCurriculum = FRAMEWORKS[activeFramework] || FRAMEWORKS.dmaic;

    const handleFrameworkChange = (id: string) => {
        setActiveFramework(id);
        const nextCurriculum = FRAMEWORKS[id] || FRAMEWORKS.dmaic;
        setSelectedPhase(nextCurriculum[1]); // Default to Phase 1
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    
                    <PageHeader 
                        title="The Academy" 
                        description={`Master the science of Operational Excellence through our structured ${activeFramework.toUpperCase()} curriculum.`}
                        actions={
                            <div className="flex gap-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input 
                                        type="text" 
                                        placeholder="Search Encyclopedia..." 
                                        className="bg-surface border border-border pl-9 pr-4 py-2 rounded-lg text-xs focus:ring-1 focus:ring-primary/30 outline-none w-64 transition-all"
                                    />
                                </div>
                            </div>
                        }
                    />

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard 
                            title="Overall Progress" 
                            value="32%" 
                            description="5/24 Modules Completed"
                            icon={<ProgressRing value={32} size={40} strokeWidth={4} showValue={false} />}
                        />
                        <MetricCard 
                            title="Learning Hours" 
                            value="14.5" 
                            trend="up"
                            trendValue="+2.1h"
                            description="Total seat time this week"
                            icon={<Clock className="w-5 h-5" />}
                        />
                        <MetricCard 
                            title="Certificates" 
                            value="0" 
                            description="Next: White Belt (Pending)"
                            icon={<BookOpen className="w-5 h-5 text-nexus-gold" />}
                        />
                    </div>

                    {/* Specialized Foundation Banner (Phase 0) */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#c2983d]/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-10 overflow-hidden shadow-2xl">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c2983d]/5 to-transparent pointer-events-none"></div>
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c2983d]/10 rounded-full blur-[100px] pointer-events-none"></div>
                            
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
                                <div className="max-w-xl space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-[#c2983d] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-[#c2983d]/20">Required</span>
                                        <span className="text-[#c2983d] text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Phase 0 Foundation</span>
                                    </div>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none">
                                        Tactical <span className="text-[#c2983d]">Baseline</span> & Strategy
                                    </h2>
                                    <p className="text-slate-400 text-base leading-relaxed max-w-md">
                                        Establish your core operational lineage. Master the essential Lean Six Sigma principles before advancing to heavy statistical deployment.
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-6 lg:min-w-[500px]">
                                    {currentCurriculum[0].lessons.map((lesson) => (
                                        <div 
                                            key={lesson.id}
                                            onClick={() => handleLessonClick(lesson)}
                                            className="flex-1 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 p-6 rounded-[1.5rem] flex flex-col justify-between group/lesson transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:border-[#c2983d]/30"
                                        >
                                            <div className="space-y-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c2983d]/20 to-transparent flex items-center justify-center text-[#c2983d] group-hover/lesson:scale-110 transition-transform">
                                                    {lesson.id === 'fnd-001' ? <BookOpen className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-black text-white group-hover/lesson:text-[#c2983d] transition-colors uppercase text-sm tracking-widest">{lesson.title}</h4>
                                                    <p className="text-[11px] text-slate-500 font-medium leading-tight">{lesson.description}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8 flex items-center justify-between">
                                                <span className="text-[9px] font-black text-[#c2983d]/40 uppercase tracking-widest">Protocol Enabled</span>
                                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/lesson:bg-[#c2983d] group-hover/lesson:text-black transition-all">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Premium Segmented Control Tabs */}
                    <div className="flex bg-surface/50 p-2 rounded-2xl border border-border w-[fit-content] mx-auto shadow-inner ring-1 ring-inset ring-black/5 overflow-x-auto gap-2 mt-12">
                        {frameworks.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleFrameworkChange(tab.id)}
                                className={cn(
                                    "px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap rounded-xl transition-all duration-300 ease-in-out",
                                    tab.id === activeFramework 
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-100" 
                                        : "bg-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground scale-[0.98] opacity-80 hover:opacity-100"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Curriculum Interface */}
                    <div className="relative min-h-[400px]">
                        <div className={cn(
                            "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-all duration-500",
                            "opacity-100 blur-0 scale-100"
                        )}>
                            
                            {/* Phase Navigation List */}
                            <div className="lg:col-span-3 space-y-2 bg-card/30 p-2 rounded-2xl border border-border">
                                <p className="px-4 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border mb-2">
                                    {activeFramework.toUpperCase()} Pathway
                                </p>
                                {currentCurriculum.slice(1).map((phase) => (
                                    <button
                                        key={phase.id}
                                        onClick={() => setSelectedPhase(phase)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all group",
                                            selectedPhase.id === phase.id
                                                ? "bg-primary text-black font-bold shadow-lg shadow-primary/10"
                                                : "hover:bg-surface text-slate-400"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                phase.progress === 100 ? "bg-emerald-500" :
                                                phase.progress > 0 ? "bg-primary animate-pulse" :
                                                "bg-slate-700"
                                            )} />
                                            <span className="text-sm tracking-wide">{phase.title}</span>
                                        </div>
                                        <span className="text-[10px] opacity-70 font-black">{phase.progress}%</span>
                                    </button>
                                ))}
                            </div>

                            {/* Lessons / Content Grid */}
                            <div className="lg:col-span-9 space-y-6">
                                <div className="bg-card p-8 rounded-2xl border border-border relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
                                    
                                    <div className="space-y-2 mb-8">
                                        <h2 className="text-3xl font-bold font-display tracking-tight">{selectedPhase.title}</h2>
                                        <p className="text-muted-foreground max-w-2xl">{selectedPhase.description}</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {selectedPhase.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                onClick={() => handleLessonClick(lesson)}
                                                className={cn(
                                                    "p-5 rounded-xl border transition-all flex items-center justify-between group",
                                                    lesson.status === "locked"
                                                        ? "bg-surface/50 border-white/5 opacity-60 cursor-not-allowed"
                                                        : "bg-surface border-border hover:border-primary/40 cursor-pointer shadow-sm"
                                                )}
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                                                        lesson.status === "completed" ? "bg-emerald-500 text-white" :
                                                        lesson.status === "in-progress" ? "bg-primary text-black animate-pulse" :
                                                        lesson.status === "locked" ? "bg-slate-800 text-slate-600" : "bg-white/5 text-primary"
                                                    )}>
                                                        {lesson.type === "video" && <Video className="w-6 h-6" />}
                                                        {lesson.type === "tool" && <Wrench className="w-6 h-6" />}
                                                        {lesson.type === "reading" && <FileText className="w-6 h-6" />}
                                                    </div>
                                                    
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{lesson.title}</h4>
                                                            {lesson.status === "completed" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                                            {lesson.status === "locked" && <Lock className="w-4 h-4 text-slate-600" />}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground max-w-lg line-clamp-1">{lesson.description}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-black/20 rounded-full border border-white/5">
                                                        <Clock className="w-3 h-3 text-slate-500" />
                                                        <span className="text-[10px] font-black text-slate-400">{lesson.duration}</span>
                                                    </div>
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                                        lesson.status === "locked" ? "text-slate-700" : "bg-white/5 group-hover:bg-primary group-hover:text-black"
                                                    )}>
                                                        <ChevronRight className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Pro Tip Card */}
                                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-6 rounded-2xl flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold tracking-tight">Pro-Protocol Recommendation</h5>
                                        <p className="text-sm text-muted-foreground">Complete the <b>Measure Phase Tool Set</b> to unlock the Advanced Analytics badge and 500 bonus XP.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
