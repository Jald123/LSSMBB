"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Zap, 
    Target, 
    Shield, 
    Cpu, 
    Navigation, 
    Terminal, 
    Info, 
    ArrowRight, 
    X 
} from "lucide-react";
import { Button } from "@/components/primitives/Button";
import { useNexus } from "@/context/NexusContext";

interface TourStep {
    title: string;
    description: string;
    icon: React.ReactNode;
    anchor?: string; // CSS selector for highlighting
}

const TOUR_STEPS: TourStep[] = [
    {
        title: "Mission Calibration",
        description: "Welcome, Operator. You have arrived at the Nexus Academy—the central uplink for Operational Excellence. Prepare for initialization.",
        icon: <Cpu className="w-8 h-8 text-primary" />,
    },
    {
        title: "Tactical Sidebar",
        description: "Your primary navigation matrix. Switch between your Mission Hangar, the DMAIC Journey Engine, and the War Room portfolio.",
        icon: <Navigation className="w-8 h-8 text-cyan-400" />,
        anchor: "#sidebar-anchor"
    },
    {
        title: "Command Injection",
        description: "Initialize the global Command Palette with 'Cmd + K'. Search methodologies or inject direct 'Save' commands into any mission tool.",
        icon: <Terminal className="w-8 h-8 text-nexus-gold" />,
        anchor: "#header-search"
    },
    {
        title: "Sensei Intelligence",
        description: "Your slide-out companion provides real-time LSS analytics and access to the Aries Knowledge Base. Never engage a mission without it.",
        icon: <Zap className="w-8 h-8 text-emerald-400" />,
        anchor: "#intel-panel"
    },
    {
        title: "Full Synchronization",
        description: "System diagnostics complete. All sectors are nominal. You are cleared for project deployment. Good luck, Operator.",
        icon: <Target className="w-8 h-8 text-primary" />,
    }
];

export function OnboardingTour() {
    const { hasSeenOnboarding, completeOnboarding } = useNexus();
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!hasSeenOnboarding) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [hasSeenOnboarding]);

    if (!isVisible) return null;

    const current = TOUR_STEPS[currentStep];
    const isLast = currentStep === TOUR_STEPS.length - 1;

    const handleNext = () => {
        if (isLast) {
            completeOnboarding();
            setIsVisible(false);
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 pointer-events-none">
                {/* Backdrop Blur */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                />

                {/* Briefing Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-surface border border-primary/20 rounded-[2.5rem] shadow-2xl shadow-primary/10 overflow-hidden pointer-events-auto"
                >
                    {/* Top Glow bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 animate-pulse" />

                    <div className="p-10 space-y-8">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner">
                                {current.icon}
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">Step {currentStep + 1} of {TOUR_STEPS.length}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Uplink: Nominal</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter italic text-white">
                                {current.title}
                            </h2>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                {current.description}
                            </p>
                        </div>

                        {/* Footer / Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <button 
                                onClick={() => { completeOnboarding(); setIsVisible(false); }}
                                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                            >
                                Skip Briefing
                            </button>
                            
                            <Button 
                                variant="nexus" 
                                className="rounded-2xl px-8 py-6 group"
                                onClick={handleNext}
                            >
                                <span className="font-black uppercase tracking-widest mr-2">
                                    {isLast ? "Begin Mission" : "Next Protocol"}
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Cybernetic Grid Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
