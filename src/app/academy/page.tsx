"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/primitives/MetricCard";
import { FRAMEWORKS, type Phase, type Lesson } from "@/config/curriculum";
import { toolRegistry } from "@/data/toolRegistry";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { ProgressRing } from "@/components/primitives/ProgressRing";
import RoadmapViewer, { METHODOLOGY_INFO } from "@/components/patterns/RoadmapViewer";
import { FieldGuideModal } from "@/components/modals/FieldGuideModal";
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
    ShieldCheck,
    Map,
    Sparkles,
    BarChart3,
    Settings2,
    Layout,
    ShieldAlert,
    Target,
    Users,
    MessageSquare,
    Cpu,
    Hammer,
    ClipboardList,
    Network,
    Scale,
    Microscope,
    History,
    LineChart,
    PieChart,
    Binary,
    Calendar,
    Users2,
    TrendingUp,
    Info
} from "lucide-react";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const glowKeyframes = `
@keyframes glow-pulse {
    0% { filter: drop-shadow(0 0 1px var(--glow-color)); opacity: 0.6; }
    50% { filter: drop-shadow(0 0 3px var(--glow-color)); opacity: 1; }
    100% { filter: drop-shadow(0 0 1px var(--glow-color)); opacity: 0.6; }
}

@keyframes laser-sweep {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

export default function LearnHub() {
    const [activeFramework, setActiveFramework] = useState('dmaic');
    const [selectedPhase, setSelectedPhase] = useState<Phase>(FRAMEWORKS.dmaic[1]); // Default to Phase 1 to avoid Phase 0 banner duplication
    const [roadmapOpen, setRoadmapOpen] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const router = useRouter();
    const currentMethodologyInfo = METHODOLOGY_INFO[activeFramework];

    const frameworks = [
        { id: 'dmaic', label: 'DMAIC (Improve)' },
        { id: 'dmadv', label: 'DMADV (Design)' },
        { id: 'kaizen', label: 'Kaizen (Event)' },
        { id: 'focus', label: 'FOCUS PDCA (Quality)' },
    ];

    const handleLessonClick = (lesson: Lesson) => {
        if (lesson.status === "locked") return;
        if (lesson.toolUrl) {
            // Convert raw HTML path to workspace route
            // Look up the tool registry key by matching the src URL
            const registryEntry = Object.entries(toolRegistry).find(([_, entry]) =>
                lesson.toolUrl!.toLowerCase().includes(entry.src.toLowerCase().split('?')[0].split('/').pop()!.replace('.html', ''))
            );
            if (registryEntry) {
                router.push(`/workspace/${registryEntry[0]}`);
            } else {
                // Fallback: extract filename and use as workspace ID
                const filename = lesson.toolUrl.split('/').pop()?.replace('.html', '') || '';
                router.push(`/workspace/${filename}`);
            }
        }
    };

    const currentCurriculum = FRAMEWORKS[activeFramework] || FRAMEWORKS.dmaic;

    const handleFrameworkChange = (id: string) => {
        setActiveFramework(id);
        const nextCurriculum = FRAMEWORKS[id] || FRAMEWORKS.dmaic;
        setSelectedPhase(nextCurriculum[1]); // Default to Phase 1
    };

    const renderLessonIcon = (lesson: Lesson) => {
        const title = lesson.title.toLowerCase();
        
        if (lesson.type === "video") return <Video className="w-6 h-6" />;
        if (lesson.type === "reading") return <FileText className="w-6 h-6" />;
        
        // Mapping tool titles to specific icons
        if (title.includes("charter") || title.includes("scoping") || title.includes("raci")) return <ClipboardList className="w-6 h-6" />;
        if (title.includes("matrix") || title.includes("diagram") || title.includes("map") || title.includes("sipoc") || title.includes("vsm") || title.includes("swimlane") || title.includes("blueprint")) return <Layout className="w-6 h-6" />;
        if (title.includes("stat") || title.includes("calculator") || title.includes("analysis") || title.includes("regression") || title.includes("anova") || title.includes("t-test") || title.includes("pareto") || title.includes("benchmarking")) return <BarChart3 className="w-6 h-6" />;
        if (title.includes("risk") || title.includes("fmea") || title.includes("threat") || title.includes("fail")) return <ShieldAlert className="w-6 h-6" />;
        if (title.includes("strategy") || title.includes("hoshin") || title.includes("target")) return <Target className="w-6 h-6" />;
        if (title.includes("customer") || title.includes("voc") || title.includes("kano") || title.includes("stakeholder") || title.includes("leadership") || title.includes("management")) return <Users className="w-6 h-6" />;
        if (title.includes("poka-yoke") || title.includes("architect") || title.includes("prototype") || title.includes("doe") || title.includes("optimizer")) return <Cpu className="w-6 h-6" />;
        if (title.includes("lab") || title.includes("wizard") || title.includes("analytics") || title.includes("engine") || title.includes("triage")) return <Microscope className="w-6 h-6" />;
        if (title.includes("fundamentals") || title.includes("history")) return <History className="w-6 h-6" />;
        if (title.includes("control") || title.includes("chart") || title.includes("spc") || title.includes("trend") || title.includes("forecast")) return <TrendingUp className="w-6 h-6" />;
        if (title.includes("checklist") || title.includes("sop") || title.includes("standards") || title.includes("rules")) return <ShieldCheck className="w-6 h-6" />;
        if (title.includes("timeline") || title.includes("gantt") || title.includes("schedule")) return <Calendar className="w-6 h-6" />;
        if (title.includes("leadership") || title.includes("management") || title.includes("team") || title.includes("stakeholder")) return <Users2 className="w-6 h-6" />;
        
        return <Wrench className="w-6 h-6" />;
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    <style>{glowKeyframes}</style>
                    
                    <PageHeader 
                        title="The Academy" 
                        description={`Master the science of Operational Excellence through our structured ${activeFramework.toUpperCase()} curriculum.`}
                        actions={
                            <div className="flex gap-4 items-center">
                                {/* Field Guide Alert Button */}
                                <motion.button 
                                    onClick={() => setIsGuideOpen(true)}
                                    animate={{ 
                                        y: [0, -4, 0],
                                        boxShadow: ["0 0 0px rgba(34,211,238,0)", "0 0 20px rgba(34,211,238,0.3)", "0 0 0px rgba(34,211,238,0)"]
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                    className="group flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#7dd3fc] border border-sky-400/30 hover:bg-white transition-all shadow-lg"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center border border-black/10 group-hover:scale-110 transition-transform text-lg">
                                        ⚡
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 block leading-none">Nexus Protocol</span>
                                        <span className="text-[11px] font-black uppercase tracking-[0.1em] text-black transition-colors">Operational Intel</span>
                                    </div>
                                </motion.button>

                                <div className="h-10 w-[1px] bg-white/10 mx-1" />
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

                    <FieldGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard 
                            title="Overall Progress" 
                            value="32%" 
                            description="5/24 Modules Completed"
                            hasLaser={true}
                            icon={<ProgressRing value={32} size={40} strokeWidth={4} showValue={false} />}
                        />
                        <MetricCard 
                            title="Learning Hours" 
                            value="14.5" 
                            trend="up"
                            trendValue="+2.1h"
                            description="Total seat time this week"
                            hasLaser={true}
                            icon={<Clock className="w-5 h-5" />}
                        />
                        <MetricCard 
                            title="Certificates" 
                            value="0" 
                            description="Next: White Belt (Pending)"
                            hasLaser={true}
                            icon={<BookOpen className="w-5 h-5 text-nexus-gold" />}
                        />
                    </div>

                    {/* Specialized Foundation Banner (Phase 0) */}
                    <div className="relative group p-[3px] rounded-[2rem] overflow-hidden">
                        {/* Animated Laser Border */}
                        <div 
                            className="absolute inset-0 z-0 animate-[laser-sweep_8s_linear_infinite]"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 60%, #c2983d 80%, #ffd700 90%, #c2983d 100%)',
                                margin: '-100%'
                            }}
                        />
                        
                        <div className="relative z-10 bg-[#0a0a0a] rounded-[2rem] p-10 overflow-hidden shadow-2xl">
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
                                    {currentCurriculum[0].lessons.map((lesson, idx) => (
                                        <div 
                                            key={lesson.id}
                                            className="relative group/laser p-[2px] rounded-[1.5rem] overflow-hidden flex-1"
                                        >
                                            {/* Individual Card Laser */}
                                            <div 
                                                className="absolute inset-0 z-0 animate-[laser-sweep_12s_linear_infinite]"
                                                style={{
                                                    background: idx === 0 
                                                        ? 'conic-gradient(from 0deg, transparent 60%, #22d3ee 80%, #ffffff 90%, #22d3ee 100%)'
                                                        : 'conic-gradient(from 0deg, transparent 60%, #10b981 80%, #ffffff 90%, #10b981 100%)',
                                                    margin: '-100%'
                                                }}
                                            />
                                            
                                            <div 
                                                onClick={() => handleLessonClick(lesson)}
                                                className="relative z-10 h-full bg-[#0a0a0a] border border-white/5 p-6 rounded-[1.5rem] flex flex-col justify-between group/lesson transition-all duration-300 cursor-pointer hover:bg-white/[0.05]"
                                            >
                                                <div className="space-y-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center text-white group-hover/lesson:scale-110 transition-transform">
                                                        {lesson.id === 'fnd-001' ? <BookOpen className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="font-black text-white group-hover/lesson:text-primary transition-colors uppercase text-sm tracking-widest">{lesson.title}</h4>
                                                        <p className="text-[11px] text-slate-500 font-medium leading-tight">{lesson.description}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-8 flex items-center justify-between">
                                                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Protocol Enabled</span>
                                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/lesson:bg-primary group-hover:text-black transition-all">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>





                    {/* Roadmap Modal */}
                    <RoadmapViewer
                        methodologyId={activeFramework}
                        isOpen={roadmapOpen}
                        onClose={() => setRoadmapOpen(false)}
                    />

                    {/* Curriculum Interface */}
                    <div className="relative min-h-[400px]">
                        <div className={cn(
                            "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-all duration-500",
                            "opacity-100 blur-0 scale-100"
                        )}>
                            
                            {/* Phase Navigation List */}
                            <div className="lg:col-span-3 space-y-4">
                                {/* ── Roadmap Explore Button ── */}
                                {currentMethodologyInfo && (
                                    <button
                                        onClick={() => setRoadmapOpen(true)}
                                        className="w-full group relative flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-500 hover:scale-[1.02] active:scale-95 overflow-hidden shadow-2xl"
                                        style={{
                                            borderColor: `${currentMethodologyInfo.accentColor}40`,
                                            background: `linear-gradient(135deg, ${currentMethodologyInfo.accentColor}, ${currentMethodologyInfo.accentColor}dd)`,
                                            boxShadow: `0 0 20px ${currentMethodologyInfo.accentColor}40, inset 0 0 10px rgba(255,255,255,0.3)`,
                                        }}
                                    >
                                        {/* Pulsing Glow Animation */}
                                        <div className="absolute inset-0 animate-pulse opacity-50" style={{ boxShadow: `0 0 35px ${currentMethodologyInfo.accentColor}` }} />
                                        
                                        <div className="flex items-center justify-between w-full relative z-10">
                                            <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center text-black">
                                                <Map className="w-5 h-5" />
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-black/40 group-hover:translate-x-1 transition-transform" />
                                        </div>

                                        <div className="text-left relative z-10">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black uppercase tracking-widest text-black">
                                                    Explore {currentMethodologyInfo.label} Roadmap
                                                </span>
                                                <Sparkles className="w-3.5 h-3.5 text-black/60" />
                                            </div>
                                            <span className="text-[10px] text-black/50 font-bold block mt-1 leading-tight">
                                                Interactive Panorama & History
                                            </span>
                                        </div>
                                    </button>
                                )}

                                <div className="space-y-2 bg-card/30 p-2 rounded-2xl border-2 transition-all duration-500"
                                    style={{ 
                                        borderColor: `${currentMethodologyInfo.accentColor}80`,
                                        boxShadow: `0 0 8px ${currentMethodologyInfo.accentColor}15`,
                                        ['--glow-color' as any]: currentMethodologyInfo.accentColor
                                    }}>
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
                                                ? "text-black font-bold shadow-lg"
                                                : "hover:bg-surface text-slate-400"
                                        )}
                                        style={selectedPhase.id === phase.id ? {
                                            background: `linear-gradient(135deg, ${currentMethodologyInfo.accentColor}, ${currentMethodologyInfo.accentColor}ee)`,
                                            boxShadow: `0 0 12px ${currentMethodologyInfo.accentColor}20`,
                                        } : {}}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                phase.progress === 100 ? "bg-emerald-500" :
                                                phase.progress > 0 ? "bg-white animate-pulse" :
                                                "bg-slate-700"
                                            )} />
                                            <span className="text-sm tracking-wide">{phase.title}</span>
                                        </div>
                                        <span className="text-[10px] opacity-70 font-black">{phase.progress}%</span>
                                    </button>
                                ))}
                            </div>
                            </div>

                             <div className="lg:col-span-9 space-y-8">
                                {/* Premium Segmented Control Tabs */}
                                <div className="flex bg-white/[0.02] backdrop-blur-3xl p-1.5 rounded-2xl border border-white/[0.08] w-full shadow-2xl overflow-x-auto gap-2">
                                    {frameworks.map((tab) => {
                                        const tabInfo = METHODOLOGY_INFO[tab.id];
                                        const isActive = tab.id === activeFramework;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => handleFrameworkChange(tab.id)}
                                                className={cn(
                                                    "flex-1 px-6 py-4 text-[12px] font-black uppercase tracking-[0.2em] whitespace-nowrap rounded-xl transition-all duration-500 ease-out",
                                                    isActive 
                                                        ? "text-black shadow-[0_0_40px_rgba(255,255,255,0.2)]" 
                                                        : "bg-transparent text-slate-400 hover:text-white hover:bg-white/[0.05]"
                                                )}
                                                style={isActive ? {
                                                    background: `linear-gradient(135deg, ${tabInfo.accentColor}, #ffffff)`,
                                                    boxShadow: `inset 0 2px 4px rgba(255,255,255,0.4), 0 10px 30px ${tabInfo.accentColor}40`,
                                                } : {}}
                                            >
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="bg-card p-8 rounded-2xl border-[1px] transition-all duration-500 relative overflow-hidden"
                                    style={{ 
                                        borderColor: `${currentMethodologyInfo.accentColor}40`,
                                        boxShadow: `0 0 2px ${currentMethodologyInfo.accentColor}20`,
                                        animation: 'glow-pulse 2s infinite ease-in-out',
                                        ['--glow-color' as any]: currentMethodologyInfo.accentColor
                                    }}>
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
                                                        lesson.status === "in-progress" ? "text-black animate-pulse" :
                                                        lesson.status === "locked" ? "bg-slate-800 text-slate-600" : "bg-white/5"
                                                    )}
                                                    style={lesson.status === "in-progress" ? { background: currentMethodologyInfo.accentColor } : (lesson.status === "available" ? { color: currentMethodologyInfo.accentColor } : {})}
                                                    >
                                                        {renderLessonIcon(lesson)}
                                                    </div>
                                                    
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-bold text-lg text-foreground transition-colors group-hover:text-primary"
                                                                style={{ color: lesson.status === "in-progress" ? currentMethodologyInfo.accentColor : "inherit" }}>{lesson.title}</h4>
                                                            {lesson.status === "completed" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                                            {lesson.status === "locked" && <Lock className="w-4 h-4 text-slate-600" />}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground max-w-lg line-clamp-1">{lesson.description}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm"
                                                        style={{ 
                                                            background: currentMethodologyInfo.accentColor, 
                                                            borderColor: `${currentMethodologyInfo.accentColor}dd` 
                                                        }}>
                                                        <Clock className="w-3 h-3 text-white" />
                                                        <span className="text-[10px] font-black text-white">{lesson.duration}</span>
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
                                <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl flex items-center gap-6 relative overflow-hidden group/tip">
                                    <div className="absolute inset-0 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-700"
                                        style={{ background: `radial-gradient(circle at 0% 50%, ${currentMethodologyInfo.accentColor}10, transparent 70%)` }} />
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                                        style={{ background: `${currentMethodologyInfo.accentColor}20`, color: currentMethodologyInfo.accentColor }}>
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div className="relative z-10">
                                        <h5 className="font-bold tracking-tight text-white">Pro-Protocol Recommendation</h5>
                                        <p className="text-sm text-slate-400">Complete the <b>Measure Phase Tool Set</b> to unlock the Advanced Analytics badge and 500 bonus XP.</p>
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
