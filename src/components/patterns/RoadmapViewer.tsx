"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ZoomIn,
    ZoomOut,
    Maximize2,
    Move,
    History,
    Target,
    Lightbulb,
    TrendingUp,
    Users,
    Award,
    Factory,
    Stethoscope,
    Rocket,
    Compass,
    BarChart3,
    Cog,
    Shield,
    Sparkles,
    ChevronDown,
} from "lucide-react";
import { methodologyData } from "@/data/journeyData";

/* ─────────────────────── types ─────────────────────── */
interface MethodologyInfo {
    id: string;
    label: string;
    tagline: string;
    image: string;
    accentColor: string;
    accentGlow: string;
    origin: { year: string; source: string; story: string };
    whenToUse: string[];
    keyFacts: { icon: React.ReactNode; label: string; value: string }[];
    quote: { text: string; author: string };
}

/* ─────────── methodology content database ─────────── */
export const METHODOLOGY_INFO: Record<string, MethodologyInfo> = {
    dmaic: {
        id: "dmaic",
        label: "DMAIC",
        tagline: "Improve an existing process",
        image: "/images/roadmaps/dmaic-roadmap.png",
        accentColor: "#22d3ee",
        accentGlow: "rgba(34,211,238,0.15)",
        origin: {
            year: "1986",
            source: "Motorola → GE",
            story: "Born at Motorola by engineer Bill Smith, then scaled by Jack Welch at GE in the 1990s — saving over $12 billion in 5 years. DMAIC became the gold standard for data-driven process improvement worldwide.",
        },
        whenToUse: [
            "An existing process is producing defects or variation",
            "Customer complaints or quality issues are rising",
            "You need data to prove the root cause before investing in a fix",
            "Management requires a structured, evidence-based approach",
            "The problem is complex and requires statistical analysis",
        ],
        keyFacts: [
            { icon: <Factory className="w-5 h-5" />, label: "Origin", value: "Motorola, 1986" },
            { icon: <TrendingUp className="w-5 h-5" />, label: "GE Savings", value: "$12B in 5 yrs" },
            { icon: <BarChart3 className="w-5 h-5" />, label: "Phases", value: "5 (D-M-A-I-C)" },
            { icon: <Award className="w-5 h-5" />, label: "Sigma Goal", value: "3.4 DPMO" },
        ],
        quote: {
            text: "Without data, you're just another person with an opinion.",
            author: "W. Edwards Deming",
        },
    },
    dmadv: {
        id: "dmadv",
        label: "DMADV",
        tagline: "Design a new, right-first-time process",
        image: "/images/roadmaps/dmadv-roadmap.png",
        accentColor: "#a78bfa",
        accentGlow: "rgba(167,139,250,0.15)",
        origin: {
            year: "1990s",
            source: "Design for Six Sigma (DFSS)",
            story: "Evolved from DMAIC when engineers realized that improving a broken process is costlier than designing it right the first time. DFSS principles were pioneered at GE and Honeywell, embedding quality into the DNA of new products and services.",
        },
        whenToUse: [
            "Launching a brand-new product, service, or process",
            "The current process cannot be improved enough — needs full redesign",
            "Customer requirements are not yet defined or are evolving",
            "You need to prevent defects from day one, not fix them later",
            "A competitive gap demands innovative, not incremental, solutions",
        ],
        keyFacts: [
            { icon: <Rocket className="w-5 h-5" />, label: "Approach", value: "Design for Six Sigma" },
            { icon: <Target className="w-5 h-5" />, label: "Focus", value: "Prevention > Detection" },
            { icon: <Compass className="w-5 h-5" />, label: "Phases", value: "5 (D-M-A-D-V)" },
            { icon: <Shield className="w-5 h-5" />, label: "Risk Tool", value: "DFMEA + DOE" },
        ],
        quote: {
            text: "Quality is designed in, not inspected in.",
            author: "Joseph M. Juran",
        },
    },
    kaizen: {
        id: "kaizen",
        label: "KAIZEN",
        tagline: "Continuous, everyday small improvements",
        image: "/images/roadmaps/kaizen-roadmap.png",
        accentColor: "#f97316",
        accentGlow: "rgba(249,115,22,0.15)",
        origin: {
            year: "1950s",
            source: "Toyota Production System",
            story: "Kaizen (改善) means 'change for the better' in Japanese. Born from post-WWII Japan when Toyota workers were empowered to stop the production line and suggest improvements. Taiichi Ohno and Shigeo Shingo built the Toyota Production System on this philosophy — proving that many small improvements compound into extraordinary results.",
        },
        whenToUse: [
            "You need quick wins within 3–5 days (Kaizen Event)",
            "A specific area has visible waste (motion, waiting, overproduction)",
            "The team on the floor knows the problem but needs structure to solve it",
            "Building a culture of continuous improvement from the ground up",
            "Budget is limited but the problem is contained and actionable",
        ],
        keyFacts: [
            { icon: <Users className="w-5 h-5" />, label: "Origin", value: "Toyota, Japan" },
            { icon: <Cog className="w-5 h-5" />, label: "Duration", value: "3–5 Day Event" },
            { icon: <Lightbulb className="w-5 h-5" />, label: "Philosophy", value: "改善 (Improve)" },
            { icon: <Sparkles className="w-5 h-5" />, label: "Focus", value: "Eliminate Waste" },
        ],
        quote: {
            text: "The key to the Toyota Way is not any individual element... it is having all the elements together as a system.",
            author: "Taiichi Ohno",
        },
    },
    focus: {
        id: "focus",
        label: "FOCUS-PDCA",
        tagline: "Structured, step-by-step improvement cycle",
        image: "/images/roadmaps/focus-pdca-roadmap.png",
        accentColor: "#10b981",
        accentGlow: "rgba(16,185,129,0.15)",
        origin: {
            year: "1980s",
            source: "Hospital Corporation of America (HCA)",
            story: "Developed by the Hospital Corporation of America (HCA) to bridge Deming's PDCA cycle with a structured 'front-end' discovery phase (FOCUS). It became the go-to quality improvement framework in healthcare, social services, and government — designed for frontline teams who need a clear, step-by-step path from problem identification to sustainable results.",
        },
        whenToUse: [
            "Working in healthcare, clinical, or service improvement settings",
            "The team is new to quality improvement and needs a guided framework",
            "The problem is process-based and benefits from systematic mapping",
            "You want a clear, repeatable 9-step recipe from problem to sustain",
            "Regulatory or accreditation bodies require structured QI evidence",
        ],
        keyFacts: [
            { icon: <Stethoscope className="w-5 h-5" />, label: "Origin", value: "HCA Healthcare" },
            { icon: <History className="w-5 h-5" />, label: "Based On", value: "Deming's PDCA" },
            { icon: <BarChart3 className="w-5 h-5" />, label: "Steps", value: "9 (F-O-C-U-S + PDCA)" },
            { icon: <Shield className="w-5 h-5" />, label: "Sector", value: "Healthcare QI" },
        ],
        quote: {
            text: "It is not necessary to change. Survival is not mandatory.",
            author: "W. Edwards Deming",
        },
    },
};

/* ─────────── PanoramaViewer (drag-to-pan) ─────────── */
function PanoramaViewer({ src, accent }: { src: string; accent: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }, [position]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - startPos.x,
            y: e.clientY - startPos.y,
        });
    }, [isDragging, startPos]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        setIsDragging(true);
        setStartPos({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }, [position]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        setPosition({
            x: touch.clientX - startPos.x,
            y: touch.clientY - startPos.y,
        });
    }, [isDragging, startPos]);

    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        setScale((prev) => Math.min(3, Math.max(0.5, prev - e.deltaY * 0.001)));
    }, []);

    const resetView = () => { setPosition({ x: 0, y: 0 }); setScale(1); };

    return (
        <div className="relative w-full h-full overflow-hidden bg-black/90 rounded-xl">
            {/* Panorama controls */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button onClick={() => setScale((s) => Math.min(3, s + 0.3))}
                    className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button onClick={() => setScale((s) => Math.max(0.5, s - 0.3))}
                    className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                    <ZoomOut className="w-4 h-4" />
                </button>
                <button onClick={resetView}
                    className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                    <Maximize2 className="w-4 h-4" />
                </button>
            </div>

            {/* Drag hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/60 text-xs pointer-events-none">
                <Move className="w-3.5 h-3.5" />
                <span>Drag to explore · Scroll to zoom</span>
            </div>

            {/* Panorama image */}
            <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                onWheel={handleWheel}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                className="w-full h-full flex items-center justify-center select-none"
            >
                <img
                    src={src}
                    alt="Methodology Roadmap"
                    draggable={false}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: isDragging ? "none" : "transform 0.3s ease-out",
                        maxHeight: "100%",
                        objectFit: "contain",
                    }}
                    className="pointer-events-none"
                />
            </div>

            {/* Accent glow border */}
            <div className="absolute inset-0 pointer-events-none rounded-xl"
                style={{ boxShadow: `inset 0 0 60px ${accent}20, 0 0 30px ${accent}10` }} />
        </div>
    );
}

/* ─────────── Animated stat card ─────────── */
function StatCard({ icon, label, value, accent, delay }: {
    icon: React.ReactNode; label: string; value: string; accent: string; delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className="relative group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-500 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at 50% 50%, ${accent}15, transparent 70%)` }} />
            <div className="relative z-10 flex flex-col items-center text-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}20`, color: accent }}>
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                    <p className="text-sm font-black text-white">{value}</p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────── WhenToUse animated list ─────────── */
function WhenToUseList({ items, accent }: { items: string[]; accent: string }) {
    return (
        <div className="space-y-3">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 group"
                >
                    <div className="mt-1 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ background: `${accent}20`, color: accent }}>
                        <Target className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">{item}</p>
                </motion.div>
            ))}
        </div>
    );
}

/* ─────────── Phase Hover Dropdown Breakdown ─────────── */
function PhaseHoverBreakdown({ methodologyId, accent }: { methodologyId: string; accent: string }) {
    // Account for FOCUS PDCA and standard methodologies
    const fwKey = methodologyId === 'focus' ? 'FOCUS' : methodologyId.toUpperCase();
    const phasesObj = methodologyData[fwKey];
    
    // If no phases exist for this framework, don't render the section
    if (!phasesObj) return null;
    
    const phases = Object.values(phasesObj);

    return (
        <div className="w-full">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-white/20" />
                Operational Phase Intel
                <span className="flex-1 h-[1px] bg-white/20" />
            </h3>
            
            <div className={`grid grid-cols-1 gap-3 ${
                phases.length >= 5 ? "md:grid-cols-5" : 
                phases.length === 4 ? "md:grid-cols-4" : 
                phases.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}>
                {phases.map((phase, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        className="group relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/30 cursor-default"
                        style={{ '--hover-accent': accent } as any}
                    >
                        {/* Hover Gradient Background */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                            style={{ background: `linear-gradient(180deg, transparent, ${accent})` }} />
                        
                        {/* Top Accent Line */}
                        <div className="h-1 w-full opacity-20 group-hover:opacity-100 transition-opacity duration-300" 
                            style={{ background: accent }} />

                        <div className="p-5 h-full flex flex-col justify-start">
                            {/* Number & Indicator */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-black text-slate-500 group-hover:text-white transition-colors">STEP 0{i+1}</span>
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--hover-accent)] group-hover:text-black transition-all duration-300">
                                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-black transition-transform duration-500 group-hover:rotate-180" />
                                </div>
                            </div>
                            
                            <h4 className="text-xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-[var(--hover-accent)] transition-colors">
                                {phase.title}
                            </h4>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                {phase.subtitle}
                            </p>

                            {/* Hidden Drop-Down Content revealed on hover */}
                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                                <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <div className="pt-4 mt-2 border-t border-white/10 space-y-4">
                                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                            {phase.description}
                                        </p>
                                        <div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-2">Key Intelligence</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {phase.skills.slice(0,3).map((s, idx) => (
                                                    <span key={idx} className="text-[9px] px-2 py-1 rounded bg-black/50 border border-white/5 text-slate-400 font-bold">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════ MAIN EXPORTED COMPONENT ═══════════════ */
export default function RoadmapViewer({
    methodologyId,
    isOpen,
    onClose,
}: {
    methodologyId: string;
    isOpen: boolean;
    onClose: () => void;
}) {
    const info = METHODOLOGY_INFO[methodologyId];
    if (!info) return null;

    /* close on Escape */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        if (isOpen) window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    /* lock body scroll when open */
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl overflow-y-auto"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="fixed top-6 right-6 z-[10000] w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all text-white hover:scale-110"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="pt-8 pb-4 text-center"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10"
                            style={{ background: info.accentGlow }}>
                            <Compass className="w-4 h-4" style={{ color: info.accentColor }} />
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                                {info.label} Roadmap
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm mt-2 italic">{info.tagline}</p>
                    </motion.div>

                    {/* Interactive Phase Breakdown Dropdowns (MOVED TO TOP) */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mx-auto max-w-[70vw] px-4 pb-8 z-50 relative"
                    >
                        <PhaseHoverBreakdown methodologyId={methodologyId} accent={info.accentColor} />
                    </motion.div>

                    {/* ── Panorama Section ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mx-auto max-w-[70vw] px-4"
                        style={{ height: "60vh" }}
                    >
                        <PanoramaViewer src={info.image} accent={info.accentColor} />
                    </motion.div>

                    {/* ── Engaging Content Section ── */}
                    <div className="mx-auto max-w-[70vw] px-6 py-12 space-y-12">

                        {/* Key Facts Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {info.keyFacts.map((fact, i) => (
                                <StatCard
                                    key={fact.label}
                                    icon={fact.icon}
                                    label={fact.label}
                                    value={fact.value}
                                    accent={info.accentColor}
                                    delay={0.4 + i * 0.1}
                                />
                            ))}
                        </div>

                        {/* History + When to Use — Two Columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* History Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 overflow-hidden"
                            >
                                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px]"
                                    style={{ background: info.accentGlow }} />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ background: `${info.accentColor}20`, color: info.accentColor }}>
                                            <History className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-white uppercase tracking-wide">Origin Story</h3>
                                            <p className="text-xs text-slate-500">{info.origin.year} · {info.origin.source}</p>
                                        </div>
                                    </div>

                                    {/* Timeline accent line */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 rounded-full" style={{ background: info.accentColor }} />
                                            <div className="w-0.5 flex-1" style={{ background: `${info.accentColor}30` }} />
                                        </div>
                                        <p className="text-sm text-slate-300 leading-relaxed pb-6">{info.origin.story}</p>
                                    </div>

                                    {/* Quote */}
                                    <div className="mt-4 pl-6 border-l-2 py-3" style={{ borderColor: `${info.accentColor}40` }}>
                                        <p className="text-sm italic text-slate-400">&ldquo;{info.quote.text}&rdquo;</p>
                                        <p className="text-xs font-bold mt-2" style={{ color: info.accentColor }}>— {info.quote.author}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* When to Use Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 overflow-hidden"
                            >
                                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[80px]"
                                    style={{ background: info.accentGlow }} />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ background: `${info.accentColor}20`, color: info.accentColor }}>
                                            <Lightbulb className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-white uppercase tracking-wide">When to Use</h3>
                                            <p className="text-xs text-slate-500">Decision Criteria</p>
                                        </div>
                                    </div>
                                    <WhenToUseList items={info.whenToUse} accent={info.accentColor} />
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className="text-center pb-8"
                        >
                            <button
                                onClick={onClose}
                                className="px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${info.accentColor}, ${info.accentColor}cc)`,
                                    boxShadow: `0 8px 32px ${info.accentColor}40`,
                                }}
                            >
                                Start the {info.label} Journey →
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
