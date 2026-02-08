import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
    X,
    ChevronRight,
    LayoutDashboard,
    Rocket,
    Terminal,
    Bot,
    Sparkles,
    Zap
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';

const steps = [
    {
        title: "Welcome to Nexus OS",
        desc: "Your high-performance gateway to Operational Excellence. Let's take a quick tactical tour of your new command center.",
        icon: Zap,
        color: "text-nexus-gold"
    },
    {
        title: "The Mission Hangar",
        desc: "Your dashboard for active projects. Resume your most critical missions with one click and track your Belt level progression.",
        icon: LayoutDashboard,
        color: "text-nexus-cyan"
    },
    {
        title: "The Phase Orbit",
        desc: "Explore the Lean Six Sigma journey. Tools are organized by DMAIC phase, ensuring you always use the right instrument at the right time.",
        icon: Rocket,
        color: "text-nexus-purple"
    },
    {
        title: "Precision Workspace",
        desc: "Execute your tools in the 'Do' space or explore JCI-aligned academic rationales in 'Learn' mode. Absolute focus, zero clutter.",
        icon: Terminal,
        color: "text-nexus-cyan"
    },
    {
        title: "Tactical Assistant",
        desc: "The context panel houses your AI Sensei, phase checklists, and artifact repository. It's your shared brain for every project.",
        icon: Bot,
        color: "text-nexus-gold"
    }
];

const OnboardingTour = () => {
    const { hasSeenOnboarding, completeOnboarding } = useNexus();
    const [currentStep, setCurrentStep] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    if (hasSeenOnboarding) return null;

    const next = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            completeOnboarding();
        }
    };

    const StepIcon = steps[currentStep].icon;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="max-w-xl w-full glass-panel bg-nexus-surface border-nexus-border/50 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
                >
                    {/* Decorative background */}
                    <div className={`absolute top-0 right-0 w-64 h-64 ${steps[currentStep].color.replace('text-', 'bg-')}/5 rounded-full blur-[100px] -z-10`} />

                    <button
                        onClick={completeOnboarding}
                        className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className={`w-20 h-20 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center mb-8 ${steps[currentStep].color}`}>
                            <StepIcon className="w-10 h-10" />
                        </div>

                        <div className="mb-4 flex gap-1.5">
                            {steps.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-nexus-cyan' : 'w-2 bg-white/10'}`}
                                />
                            ))}
                        </div>

                        <h2 className="text-3xl font-black font-orbitron text-white mb-4 uppercase tracking-tighter">
                            {steps[currentStep].title}
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-10 min-h-[60px]">
                            {steps[currentStep].desc}
                        </p>

                        <button
                            onClick={next}
                            className="group relative flex items-center gap-3 bg-white text-nexus-navy px-10 py-4 rounded-full font-orbitron font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            {currentStep === steps.length - 1 ? 'LAUNCH OPERATING SYSTEM' : 'NEXT TACTICAL BRIEF'}
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                        <div className="text-[10px] font-black font-orbitron text-slate-600 tracking-[0.3em] uppercase">
                            Nexus OS Protocol v1.6
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default OnboardingTour;
