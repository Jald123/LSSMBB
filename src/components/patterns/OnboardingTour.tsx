"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Zap, 
    ArrowRight, 
    X 
} from "lucide-react";
import { useNexus } from "@/context/NexusContext";

export function OnboardingTour() {
    const { hasSeenOnboarding, completeOnboarding } = useNexus();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!hasSeenOnboarding) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [hasSeenOnboarding]);

    if (!isVisible) return null;

    const handleBegin = () => {
        completeOnboarding();
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                {/* 🌌 Cinematic Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBegin}
                    className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
                />

                {/* ☄️ Center Glow Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* 🛡️ Nexus OS Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    className="relative w-full max-w-[580px] bg-[#0f172a] border border-white/5 rounded-[40px] shadow-[0_0_80px_rgba(34,211,238,0.1)] overflow-hidden p-12 text-center"
                >
                    {/* Interaction Shield */}
                    <div className="absolute top-0 right-0 p-8">
                        <button 
                            onClick={handleBegin}
                            className="text-white/20 hover:text-white/60 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* ⚡ Iconic Thunder Box */}
                    <div className="flex justify-center mb-10">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-orange-600 to-amber-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                            <div className="relative w-24 h-24 bg-gradient-to-tr from-orange-500 to-amber-300 rounded-3xl flex items-center justify-center shadow-2xl">
                                <Zap className="w-10 h-10 text-white fill-white animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Status Dots */}
                    <div className="flex justify-center gap-1.5 mb-8">
                        <div className="w-10 h-1 bg-orange-500 rounded-full" />
                        <div className="w-2.5 h-1 bg-white/10 rounded-full" />
                        <div className="w-2.5 h-1 bg-white/10 rounded-full" />
                        <div className="w-2.5 h-1 bg-white/10 rounded-full" />
                        <div className="w-2.5 h-1 bg-white/10 rounded-full" />
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6 mb-12">
                        <h1 className="text-4xl font-black font-orbitron tracking-tighter text-white leading-none uppercase italic">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Nexus OS</span>
                        </h1>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
                            Your high-performance gateway to Operational Excellence. A cinematic command center engineered for <span className="text-white">Lean Six Sigma precision</span> — from 3.4 DPMO accuracy to F1-speed workflow.
                        </p>
                    </div>

                    {/* Primary Action */}
                    <div className="flex flex-col items-center gap-6">
                        <button 
                            onClick={handleBegin}
                            className="group relative flex items-center justify-center gap-3 bg-white text-black font-black font-orbitron text-xs tracking-[0.2em] px-14 py-6 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                        >
                            NEXT TACTICAL BRIEF
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            {/* Reflex Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        </button>
                        
                        <span className="text-[10px] font-black font-orbitron tracking-[0.4em] text-white/20 uppercase">
                            NEXUS OS PROTOCOL V2.4
                        </span>
                    </div>

                    {/* Ambient Visuals */}
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none" />
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
