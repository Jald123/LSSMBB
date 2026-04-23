"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Zap, 
    ArrowRight, 
    ArrowLeft,
    X,
    BookOpen,
    Terminal,
    Target
} from "lucide-react";
import { useNexus } from "@/context/NexusContext";

interface Step {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    label: string;
}

const STEPS: Step[] = [
    {
        title: "Welcome to Nexus OS",
        description: "Your high-performance gateway to Operational Excellence. A cinematic command center engineered for Lean Six Sigma precision — from 3.4 DPMO accuracy to F1-speed workflow.",
        icon: <Zap className="w-10 h-10 text-white fill-white" />,
        color: "from-orange-500 to-amber-300",
        label: "INITIALIZATION"
    },
    {
        title: "The Academy Terminal",
        description: "Master the DMAIC, DMADV, and Kaizen frameworks through our high-fidelity curriculum. Every module is a direct uplink to industry-leading statistical mastery.",
        icon: <BookOpen className="w-10 h-10 text-white" />,
        color: "from-blue-600 to-cyan-400",
        label: "MISSION HUB"
    },
    {
        title: "Command Intelligence",
        description: "Access the Aries Knowledge Base and floating assistant tools anywhere. Execute with 100% accuracy using real-time AI guidance and tactical markups.",
        icon: <Terminal className="w-10 h-10 text-white" />,
        color: "from-purple-600 to-pink-400",
        label: "PROTOCOLS"
    }
];

export function OnboardingTour() {
    const { hasSeenOnboarding, completeOnboarding } = useNexus();
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (!hasSeenOnboarding) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [hasSeenOnboarding]);

    if (!isVisible) return null;

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsVisible(false);
            // Delay the completion slightly to allow exit animation to finish
            setTimeout(() => {
                completeOnboarding();
            }, 600);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const step = STEPS[currentStep];

    return (
        <AnimatePresence mode="wait">
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-hidden">
                {/* 🌌 Cinematic Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
                />

                {/* 🛡️ Nexus OS Modal */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -40, rotateX: -10 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-[620px] bg-[#0f172a] border border-white/5 rounded-[48px] shadow-[0_0_100px_rgba(34,211,238,0.15)] overflow-hidden p-12 text-center"
                    style={{ perspective: '1000px' }}
                >
                    {/* Interaction Shield */}
                    <div className="absolute top-0 right-0 p-8">
                        <button 
                            onClick={() => { 
                                setIsVisible(false);
                                setTimeout(() => completeOnboarding(), 600);
                            }}
                            className="text-white/20 hover:text-white/60 transition-all p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* ⚡ Iconic Icon Box */}
                    <div className="flex justify-center mb-10">
                        <div className="relative group">
                            <motion.div 
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className={`absolute -inset-2 bg-gradient-to-tr ${step.color} rounded-[2rem] blur-xl opacity-40`} 
                            />
                            <div className={`relative w-28 h-28 bg-gradient-to-tr ${step.color} rounded-[2rem] flex items-center justify-center shadow-2xl transition-transform duration-500 hover:scale-110`}>
                                {step.icon}
                            </div>
                        </div>
                    </div>

                    {/* Status Progress Dots */}
                    <div className="flex justify-center gap-2 mb-10">
                        {STEPS.map((_, i) => (
                            <motion.div 
                                key={i}
                                initial={false}
                                animate={{ 
                                    width: i === currentStep ? 40 : 10,
                                    backgroundColor: i === currentStep ? (currentStep === 0 ? '#f97316' : currentStep === 1 ? '#2563eb' : '#9333ea') : 'rgba(255,255,255,0.1)'
                                }}
                                className="h-1.5 rounded-full transition-colors duration-500"
                            />
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6 mb-12 min-h-[180px]">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="text-[10px] font-black font-orbitron tracking-[0.4em] text-white/40 uppercase mb-4 block">
                                {step.label}
                            </span>
                            <h1 className="text-4xl font-black font-orbitron tracking-tighter text-white leading-none uppercase italic">
                                {step.title.split(' ').map((word, i) => (
                                    <span key={i} className={i === word.length ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400'}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>
                        </motion.div>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg mx-auto"
                        >
                            {step.description}
                        </motion.p>
                    </div>

                    {/* Primary Action */}
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex items-center gap-4 w-full justify-center">
                            {currentStep > 0 && (
                                <button 
                                    onClick={handlePrev}
                                    className="flex items-center justify-center w-20 py-6 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                            )}
                            <button 
                                onClick={handleNext}
                                className="group relative flex items-center justify-center gap-4 bg-white text-black font-black font-orbitron text-xs tracking-[0.2em] px-14 py-6 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.15)] flex-1 max-w-[340px]"
                            >
                                {currentStep === STEPS.length - 1 ? "BEGIN MISSION" : "NEXT TACTICAL BRIEF"}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-3 opacity-20">
                            <div className="w-12 h-px bg-white" />
                            <span className="text-[9px] font-black font-orbitron tracking-[0.5em] text-white uppercase whitespace-nowrap">
                                NEXUS OS PROTOCOL V2.4
                            </span>
                            <div className="w-12 h-px bg-white" />
                        </div>
                    </div>

                    {/* Ambient Background Glows */}
                    <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20 bg-gradient-to-br ${step.color}`} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
