"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Map, Compass, MonitorPlay, ChevronRight, LayoutDashboard, Search, FileBarChart, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const WALKTHROUGH_STEPS = [
    {
        id: "fundamentals",
        title: "PHASE 0: TACTICAL BASELINE",
        subtitle: "LSS FUNDAMENTALS",
        icon: <LayoutDashboard className="w-5 h-5" />,
        color: "#c2983d",
        content: "Before diving into complex methodologies, start here. This phase establishes the theoretical foundation of Lean Six Sigma.",
        lookFor: ["Specialized Foundation Banner at the top", "Progress tracking rings", "Core concept modules"],
        action: "Click on any 'Start Learning' module inside the golden banner to begin.",
        wireframe: (isPlaying: boolean) => (
            <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-white/10 p-4 flex flex-col gap-3 relative overflow-hidden">
                <div className="w-full h-12 rounded-lg border border-[#c2983d]/50 bg-[#c2983d]/10 flex items-center px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c2983d]/20 to-transparent animate-[shimmer_2s_infinite]" />
                    <div className="w-8 h-8 rounded bg-[#c2983d]/20 flex items-center justify-center mr-3"><span className="text-[#c2983d] text-xs">P0</span></div>
                    <div className="h-3 w-32 bg-white/20 rounded" />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3 relative">
                    <div className={cn(
                        "bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col gap-2 transition-all duration-500",
                        isPlaying ? "border-[#c2983d]/80 bg-[#c2983d]/20 scale-105" : ""
                    )}>
                        <div className="h-2 w-16 bg-white/20 rounded" />
                        <div className="h-2 w-full bg-white/10 rounded mt-auto" />
                    </div>
                    <div className="bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col gap-2">
                        <div className="h-2 w-16 bg-white/20 rounded" />
                        <div className="h-2 w-full bg-white/10 rounded mt-auto" />
                    </div>
                    
                    {/* Animated Cursor */}
                    {isPlaying && (
                        <motion.div 
                            initial={{ x: 150, y: 100, opacity: 0 }}
                            animate={{ x: 40, y: 40, opacity: 1, scale: [1, 1, 0.9, 1] }}
                            transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.8, 0.9, 1] }}
                            className="absolute z-20"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.79 6.75 21.36L11.44 17.15C11.66 16.95 11.95 16.84 12.25 16.84H18.5C19.16 16.84 19.5 16.05 19.04 15.59L6.54 3.09C6.07 2.62 5.5 2.96 5.5 3.21Z" fill="white" stroke="black" strokeWidth="1.5"/>
                            </svg>
                            {/* Ripple */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: [0, 1, 0], scale: [0, 2, 3] }}
                                transition={{ delay: 1.3, duration: 0.6 }}
                                className="absolute -top-3 -left-3 w-6 h-6 rounded-full border-2 border-white/50"
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        )
    },
    {
        id: "triage",
        title: "PROJECT TRIAGE & SCOPING",
        subtitle: "ASSESS PROJECT VIABILITY",
        icon: <Search className="w-5 h-5" />,
        color: "#22c55e",
        content: "Evaluate your operational challenges before assigning them a framework. Ensure your project has strategic alignment.",
        lookFor: ["Triage Command Center", "Complexity assessment matrix", "Strategic alignment scoring"],
        action: "Use the Triage Tool to input your problem statement and get a recommended methodology.",
        wireframe: (isPlaying: boolean) => (
            <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-white/10 p-4 flex flex-col gap-3 relative overflow-hidden">
                <div className="w-full flex gap-2">
                    <div className="flex-1 h-8 rounded border border-green-500/30 bg-green-500/10" />
                    <div className="flex-1 h-8 rounded border border-white/10 bg-white/5" />
                    <div className="flex-1 h-8 rounded border border-white/10 bg-white/5" />
                </div>
                <div className="flex-1 bg-white/5 rounded-lg border border-white/5 p-3 flex gap-3">
                    <div className="w-1/3 h-full border-r border-white/10 flex flex-col gap-2 pr-3">
                        <motion.div 
                            className="h-3 w-full bg-green-500/50 rounded"
                            animate={isPlaying ? { backgroundColor: ["rgba(34,197,94,0.1)", "rgba(34,197,94,0.5)"] } : {}}
                            transition={{ duration: 1 }}
                        />
                        <div className="h-3 w-3/4 bg-white/10 rounded" />
                        <div className="h-3 w-5/6 bg-white/10 rounded" />
                        
                        {/* Animated Cursor */}
                        {isPlaying && (
                            <motion.div 
                                initial={{ x: 100, y: 100, opacity: 0 }}
                                animate={{ x: 20, y: -20, opacity: 1, scale: [1, 1, 0.9, 1] }}
                                transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.8, 0.9, 1] }}
                                className="absolute z-20"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.79 6.75 21.36L11.44 17.15C11.66 16.95 11.95 16.84 12.25 16.84H18.5C19.16 16.84 19.5 16.05 19.04 15.59L6.54 3.09C6.07 2.62 5.5 2.96 5.5 3.21Z" fill="white" stroke="black" strokeWidth="1.5"/>
                                </svg>
                            </motion.div>
                        )}
                    </div>
                    <div className="flex-1 flex items-center justify-center relative">
                        <div className="w-20 h-20 rounded-full border-4 border-white/10 flex items-center justify-center relative">
                            {/* Animated progress ring */}
                            {isPlaying && (
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <motion.circle
                                        cx="50%" cy="50%" r="38"
                                        fill="none" stroke="#22c55e" strokeWidth="4"
                                        strokeDasharray="238"
                                        initial={{ strokeDashoffset: 238 }}
                                        animate={{ strokeDashoffset: 14 }}
                                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                    />
                                </svg>
                            )}
                            <motion.span 
                                className="text-green-500 font-bold text-xl"
                                initial={{ opacity: 0.5 }}
                                animate={isPlaying ? { opacity: 1, scale: [1, 1.2, 1] } : {}}
                                transition={{ delay: 2, duration: 0.5 }}
                            >
                                {isPlaying ? "94%" : "0%"}
                            </motion.span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "roadmaps",
        title: "METHODOLOGY SELECTION",
        subtitle: "DMAIC, DMADV, KAIZEN...",
        icon: <Map className="w-5 h-5" />,
        color: "#3b82f6",
        content: "Once triaged, navigate to the specific framework tab. Each methodology has its own dedicated operational roadmap and tools.",
        lookFor: ["Segmented Control Tabs (DMAIC, DMADV...)", "Explore Roadmap Button", "Pathway Checkpoints"],
        action: "Click 'Explore Roadmap' to view the full panorama, then select a Pathway node to enter.",
        wireframe: (isPlaying: boolean) => (
            <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-white/10 p-4 flex flex-col gap-3 relative overflow-hidden">
                <div className="flex w-full gap-1 p-1 bg-white/5 rounded-lg">
                    <div className="flex-1 h-6 bg-[#3b82f6] rounded flex items-center justify-center"><div className="h-1.5 w-8 bg-white/50 rounded" /></div>
                    <div className="flex-1 h-6 bg-transparent flex items-center justify-center"><div className="h-1.5 w-8 bg-white/20 rounded" /></div>
                    <div className="flex-1 h-6 bg-transparent flex items-center justify-center"><div className="h-1.5 w-8 bg-white/20 rounded" /></div>
                </div>
                <motion.div 
                    className="h-10 w-full rounded border border-[#3b82f6]/50 bg-[#3b82f6]/10 flex items-center justify-center gap-2 relative overflow-hidden"
                    animate={isPlaying ? { scale: [1, 1.02, 1], backgroundColor: ["rgba(59,130,246,0.1)", "rgba(59,130,246,0.3)", "rgba(59,130,246,0.1)"] } : {}}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <Compass className="w-4 h-4 text-[#3b82f6]" />
                    <div className="h-2 w-24 bg-[#3b82f6]/80 rounded" />
                </motion.div>
                <div className="flex-1 flex gap-2 overflow-hidden">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-16 h-full rounded border border-white/10 bg-white/5 flex flex-col items-center p-2 gap-2">
                            <div className="w-6 h-6 rounded-full border-2 border-white/20" />
                            <div className="h-1 w-full bg-white/20 rounded" />
                        </div>
                    ))}
                </div>
                
                {/* Animated Cursor */}
                {isPlaying && (
                    <motion.div 
                        initial={{ x: 150, y: 150, opacity: 0 }}
                        animate={{ x: 120, y: 40, opacity: 1, scale: [1, 1, 0.9, 1] }}
                        transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.8, 0.9, 1] }}
                        className="absolute z-20"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.79 6.75 21.36L11.44 17.15C11.66 16.95 11.95 16.84 12.25 16.84H18.5C19.16 16.84 19.5 16.05 19.04 15.59L6.54 3.09C6.07 2.62 5.5 2.96 5.5 3.21Z" fill="white" stroke="black" strokeWidth="1.5"/>
                        </svg>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 2, 3] }}
                            transition={{ delay: 1.3, duration: 0.6 }}
                            className="absolute -top-3 -left-3 w-6 h-6 rounded-full border-2 border-white/50"
                        />
                    </motion.div>
                )}
            </div>
        )
    },
    {
        id: "tool_interface",
        title: "ANALYTICAL WORKSPACE",
        subtitle: "INSIDE THE TOOLS",
        icon: <FileBarChart className="w-5 h-5" />,
        color: "#f97316",
        content: "The Workspace is where execution happens. Every tool features an interactive dashboard, command hub, and Sensei MBB guidance.",
        lookFor: ["Sensei Floating Action Button", "Left Sidebar Nav", "Main Canvas Area", "Footer Home Button"],
        action: "Interact with the canvas. Click the Sensei icon for AI assistance. Click Home to return here.",
        wireframe: (isPlaying: boolean) => (
            <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden flex relative">
                <div className="w-12 h-full bg-black/40 border-r border-white/10 flex flex-col items-center py-4 gap-4">
                    <div className="w-6 h-6 rounded bg-white/20" />
                    <div className="w-6 h-6 rounded bg-white/10" />
                    <div className="w-6 h-6 rounded bg-white/10" />
                </div>
                <div className="flex-1 h-full p-4 flex flex-col gap-3 relative overflow-hidden">
                    <div className="h-4 w-32 bg-white/20 rounded" />
                    <div className="flex-1 rounded border border-[#f97316]/30 bg-[#f97316]/5 flex items-end p-2 gap-2">
                        <motion.div className="flex-1 bg-[#f97316]/40 rounded-t" animate={isPlaying ? { height: ["40%", "60%", "40%"] } : { height: "40%" }} transition={{ duration: 2, repeat: Infinity }} />
                        <motion.div className="flex-1 bg-[#f97316]/60 rounded-t" animate={isPlaying ? { height: ["70%", "50%", "70%"] } : { height: "70%" }} transition={{ duration: 2, delay: 0.2, repeat: Infinity }} />
                        <motion.div className="flex-1 bg-[#f97316] rounded-t" animate={isPlaying ? { height: ["90%", "100%", "90%"] } : { height: "90%" }} transition={{ duration: 2, delay: 0.4, repeat: Infinity }} />
                        <motion.div className="flex-1 bg-[#f97316]/50 rounded-t" animate={isPlaying ? { height: ["50%", "80%", "50%"] } : { height: "50%" }} transition={{ duration: 2, delay: 0.6, repeat: Infinity }} />
                    </div>
                    
                    {/* Sensei FAB */}
                    <motion.div 
                        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center z-10"
                        animate={isPlaying ? { scale: [1, 1.2, 1], boxShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 20px rgba(59,130,246,0.8)", "0 0 0px rgba(59,130,246,0)"] } : {}}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        
                        {/* Fake Chat Popup */}
                        <AnimatePresence>
                            {isPlaying && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 1.5, duration: 0.3 }}
                                    className="absolute bottom-10 right-0 w-32 h-16 bg-slate-900 border border-blue-500/30 rounded-lg p-2 flex flex-col gap-1"
                                >
                                    <div className="h-1.5 w-16 bg-blue-400/50 rounded" />
                                    <div className="h-1.5 w-full bg-white/20 rounded" />
                                    <div className="h-1.5 w-3/4 bg-white/20 rounded" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Animated Cursor */}
                {isPlaying && (
                    <motion.div 
                        initial={{ x: -20, y: -20, opacity: 0 }}
                        animate={{ x: 250, y: 120, opacity: 1, scale: [1, 1, 0.9, 1] }}
                        transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.8, 0.9, 1] }}
                        className="absolute z-20"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.79 6.75 21.36L11.44 17.15C11.66 16.95 11.95 16.84 12.25 16.84H18.5C19.16 16.84 19.5 16.05 19.04 15.59L6.54 3.09C6.07 2.62 5.5 2.96 5.5 3.21Z" fill="white" stroke="black" strokeWidth="1.5"/>
                        </svg>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 2, 3] }}
                            transition={{ delay: 1.3, duration: 0.6 }}
                            className="absolute -top-3 -left-3 w-6 h-6 rounded-full border-2 border-white/50"
                        />
                    </motion.div>
                )}
            </div>
        )
    }
];

export function AcademyWalkthroughModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Reset playing state when step changes
    useEffect(() => {
        setIsPlaying(false);
    }, [currentStep]);

    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0);
            setIsPlaying(false);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    const step = WALKTHROUGH_STEPS[currentStep];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="w-full max-w-5xl h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex shadow-2xl relative"
                >
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Left Panel: Navigation & Context */}
                    <div className="w-[40%] h-full bg-black/40 border-r border-white/5 p-10 flex flex-col">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                <Compass className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-white font-black tracking-widest uppercase">Academy Walkthrough</h2>
                                <p className="text-xs text-slate-500">Nexus Navigation Protocol</p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-2 relative">
                            {/* Vertical connecting line */}
                            <div className="absolute left-6 top-10 bottom-10 w-[2px] bg-white/5 rounded-full" />
                            
                            {WALKTHROUGH_STEPS.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick={() => setCurrentStep(i)}
                                    className={cn(
                                        "relative flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 group",
                                        currentStep === i ? "bg-white/10" : "hover:bg-white/5"
                                    )}
                                >
                                    <div 
                                        className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center relative z-10 transition-all duration-500",
                                            currentStep === i ? "scale-110 shadow-lg" : "scale-100 grayscale opacity-50"
                                        )}
                                        style={{ 
                                            backgroundColor: currentStep === i ? `${s.color}20` : 'rgba(255,255,255,0.05)',
                                            borderColor: currentStep === i ? `${s.color}50` : 'rgba(255,255,255,0.1)',
                                            borderWidth: '1px',
                                            color: currentStep === i ? s.color : '#888'
                                        }}
                                    >
                                        {s.icon}
                                    </div>
                                    <div>
                                        <p className={cn(
                                            "text-[10px] font-black uppercase tracking-widest transition-colors",
                                            currentStep === i ? "text-white" : "text-slate-500"
                                        )}>{s.title}</p>
                                        <p className={cn(
                                            "text-xs transition-colors",
                                            currentStep === i ? "text-slate-300" : "text-slate-600"
                                        )}>{s.subtitle}</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Progress Indicators */}
                        <div className="mt-10 flex items-center gap-2">
                            {WALKTHROUGH_STEPS.map((_, i) => (
                                <div 
                                    key={i} 
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-500",
                                        currentStep === i ? "w-8 bg-white" : "w-2 bg-white/20"
                                    )} 
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Dynamic Content & Visuals */}
                    <div className="w-[60%] h-full relative overflow-hidden flex flex-col bg-black/20">
                        {/* Background Glow */}
                        <div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] opacity-20 transition-all duration-1000"
                            style={{ backgroundColor: step.color }}
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="flex-1 flex flex-col p-12 relative z-10"
                            >
                                {/* Header */}
                                <div className="mb-10 border-l-4 pl-6" style={{ borderColor: step.color }}>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400 text-lg">{step.content}</p>
                                </div>

                                {/* Visual Wireframe Area */}
                                <div className="flex-1 w-full relative mb-10 group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 rounded-2xl pointer-events-none" />
                                    
                                    {/* The interactive structural mockup */}
                                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group-hover:border-white/30 transition-colors duration-500 bg-[#050505]">
                                        {/* @ts-ignore - passing isPlaying to the wireframe function */}
                                        {typeof step.wireframe === 'function' ? step.wireframe(isPlaying) : step.wireframe}
                                    </div>

                                    {/* Play Overlay */}
                                    {!isPlaying && (
                                        <div 
                                            className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer bg-black/20 backdrop-blur-[2px] rounded-2xl"
                                            onClick={() => setIsPlaying(true)}
                                        >
                                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                                                <Play className="w-6 h-6 text-white ml-1" />
                                            </div>
                                            <span className="absolute bottom-6 font-black uppercase tracking-widest text-[10px] text-white/70">Click to Play Demo</span>
                                        </div>
                                    )}
                                </div>

                                {/* Instructional Footer */}
                                <div className="grid grid-cols-2 gap-6 bg-white/[0.03] border border-white/10 p-6 rounded-2xl">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block">What to Look For</span>
                                        <ul className="space-y-2">
                                            {step.lookFor.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: step.color }} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block">Direct Action</span>
                                        <div className="flex gap-3 text-sm text-white font-medium bg-white/5 p-4 rounded-xl border border-white/5">
                                            <MonitorPlay className="w-5 h-5 shrink-0" style={{ color: step.color }} />
                                            {step.action}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <div className="absolute bottom-12 right-12 flex gap-3 z-50">
                            <button 
                                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                disabled={currentStep === 0}
                                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center disabled:opacity-30 disabled:hover:bg-white/5 transition-all"
                            >
                                <ChevronRight className="w-5 h-5 text-white rotate-180" />
                            </button>
                            <button 
                                onClick={() => {
                                    if (currentStep < WALKTHROUGH_STEPS.length - 1) {
                                        setCurrentStep(currentStep + 1);
                                    } else {
                                        onClose();
                                    }
                                }}
                                className="px-6 h-12 rounded-full text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105"
                                style={{ backgroundColor: step.color, color: '#000' }}
                            >
                                {currentStep === WALKTHROUGH_STEPS.length - 1 ? 'Finish' : 'Next'}
                                {currentStep !== WALKTHROUGH_STEPS.length - 1 && <ChevronRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
