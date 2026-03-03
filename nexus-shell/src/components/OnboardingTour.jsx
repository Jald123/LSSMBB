import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
    X,
    ChevronRight,
    LayoutDashboard,
    Rocket,
    Terminal,
    Bot,
    Zap
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';

const steps = [
    {
        title: "WELCOME TO NEXUS OS",
        desc: "Your high-performance gateway to Operational Excellence. A cinematic command center engineered for Lean Six Sigma precision — from 3.4 DPMO accuracy to F1-speed workflow.",
        icon: Zap,
        accentColor: "#f59e0b",
        glowColor: "rgba(245, 158, 11, 0.4)",
        gradientFrom: "#f59e0b",
        gradientTo: "#ea580c"
    },
    {
        title: "THE MISSION HANGAR",
        desc: "Your strategic dashboard for active projects. Resume critical missions with one click, track Belt progression, and monitor real-time KPIs across all DMAIC phases.",
        icon: LayoutDashboard,
        accentColor: "#22d3ee",
        glowColor: "rgba(34, 211, 238, 0.4)",
        gradientFrom: "#22d3ee",
        gradientTo: "#0891b2"
    },
    {
        title: "THE PHASE ORBIT",
        desc: "Navigate the Lean Six Sigma universe. Every tool is mapped to its DMAIC phase — ensuring surgical precision at every stage of your improvement journey.",
        icon: Rocket,
        accentColor: "#a855f7",
        glowColor: "rgba(168, 85, 247, 0.4)",
        gradientFrom: "#a855f7",
        gradientTo: "#7c3aed"
    },
    {
        title: "PRECISION WORKSPACE",
        desc: "Execute tools in the immersive 'Do' space or explore JCI-aligned academic rationales in 'Learn' mode. Absolute focus. Zero clutter. Maximum output.",
        icon: Terminal,
        accentColor: "#22d3ee",
        glowColor: "rgba(34, 211, 238, 0.4)",
        gradientFrom: "#22d3ee",
        gradientTo: "#06b6d4"
    },
    {
        title: "TACTICAL ASSISTANT",
        desc: "Your AI Sensei, phase checklists, and artifact repository — all in an intelligent context panel. It's the shared brain that accelerates every project to completion.",
        icon: Bot,
        accentColor: "#f59e0b",
        glowColor: "rgba(245, 158, 11, 0.4)",
        gradientFrom: "#f59e0b",
        gradientTo: "#d97706"
    }
];

// Floating particle component
const FloatingParticle = ({ delay, size, x, y, color }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [y, y - 80, y - 160],
            x: [x, x + (Math.random() - 0.5) * 60, x + (Math.random() - 0.5) * 120]
        }}
        transition={{
            duration: 4 + Math.random() * 3,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        style={{
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            borderRadius: '50%',
            background: color,
            filter: `blur(${size > 4 ? 2 : 0}px)`,
            pointerEvents: 'none'
        }}
    />
);

const OnboardingTour = () => {
    const { hasSeenOnboarding, completeOnboarding } = useNexus();
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    if (hasSeenOnboarding) return null;

    const next = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            completeOnboarding();
        }
    };

    const step = steps[currentStep];
    const StepIcon = step.icon;
    const isLast = currentStep === steps.length - 1;

    // Generate particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        size: 2 + Math.random() * 5,
        x: Math.random() * 100 - 50,
        y: Math.random() * 400,
        color: i % 3 === 0 ? step.accentColor : i % 3 === 1 ? 'rgba(255,255,255,0.3)' : step.glowColor
    }));

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 5000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                background: 'rgba(2, 6, 23, 0.95)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)'
            }}>
                {/* Animated background orbs */}
                <motion.div
                    animate={{
                        background: [
                            `radial-gradient(circle at 30% 20%, ${step.glowColor} 0%, transparent 50%)`,
                            `radial-gradient(circle at 70% 80%, ${step.glowColor} 0%, transparent 50%)`,
                            `radial-gradient(circle at 30% 20%, ${step.glowColor} 0%, transparent 50%)`
                        ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.4,
                        pointerEvents: 'none'
                    }}
                />

                {/* Secondary subtle glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${step.glowColor} 0%, transparent 70%)`,
                    opacity: 0.15,
                    filter: 'blur(80px)',
                    pointerEvents: 'none'
                }} />

                {/* Main card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 30 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                        maxWidth: '520px',
                        width: '100%',
                        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))',
                        border: `1px solid rgba(255, 255, 255, 0.08)`,
                        borderRadius: '2.5rem',
                        padding: '50px 40px 40px',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: `0 40px 80px rgba(0, 0, 0, 0.6), 0 0 60px ${step.glowColor}`
                    }}
                >
                    {/* Top accent line */}
                    <motion.div
                        animate={{
                            background: `linear-gradient(90deg, transparent, ${step.gradientFrom}, ${step.gradientTo}, transparent)`
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '10%',
                            right: '10%',
                            height: '2px',
                            borderRadius: '0 0 4px 4px',
                            filter: `drop-shadow(0 0 8px ${step.glowColor})`
                        }}
                    />

                    {/* Floating particles */}
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                        {particles.map(p => (
                            <FloatingParticle key={p.id} {...p} />
                        ))}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={completeOnboarding}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '24px',
                            color: 'rgba(148, 163, 184, 0.5)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            transition: 'all 0.3s',
                            zIndex: 10
                        }}
                        onMouseOver={e => { e.target.style.color = '#fff'; e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                        onMouseOut={e => { e.target.style.color = 'rgba(148, 163, 184, 0.5)'; e.target.style.background = 'none'; }}
                    >
                        <X style={{ width: 20, height: 20 }} />
                    </button>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -30, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                position: 'relative',
                                zIndex: 2
                            }}
                        >
                            {/* Icon with glow */}
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        `0 0 20px ${step.glowColor}, inset 0 0 20px rgba(0,0,0,0.3)`,
                                        `0 0 40px ${step.glowColor}, inset 0 0 20px rgba(0,0,0,0.3)`,
                                        `0 0 20px ${step.glowColor}, inset 0 0 20px rgba(0,0,0,0.3)`
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '20px',
                                    background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '30px',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    transform: 'rotate(-5deg)'
                                }}
                            >
                                <StepIcon style={{ width: 36, height: 36, color: '#fff' }} />
                            </motion.div>

                            {/* Progress dots */}
                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                marginBottom: '24px',
                                alignItems: 'center'
                            }}>
                                {steps.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            width: i === currentStep ? '32px' : '8px',
                                            background: i === currentStep ? step.accentColor : 'rgba(255,255,255,0.1)',
                                            boxShadow: i === currentStep ? `0 0 10px ${step.glowColor}` : 'none'
                                        }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        style={{
                                            height: '4px',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => setCurrentStep(i)}
                                    />
                                ))}
                            </div>

                            {/* Title */}
                            <h2 style={{
                                fontFamily: "'Orbitron', sans-serif",
                                fontSize: '26px',
                                fontWeight: 900,
                                color: '#ffffff',
                                marginBottom: '16px',
                                letterSpacing: '-0.5px',
                                lineHeight: 1.2,
                                textTransform: 'uppercase'
                            }}>
                                {step.title}
                            </h2>

                            {/* Description */}
                            <p style={{
                                color: '#94a3b8',
                                fontSize: '14px',
                                lineHeight: 1.7,
                                marginBottom: '36px',
                                minHeight: '65px',
                                maxWidth: '380px'
                            }}>
                                {step.desc}
                            </p>

                            {/* CTA Button */}
                            <motion.button
                                onClick={next}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: isLast
                                        ? `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`
                                        : 'rgba(255, 255, 255, 0.95)',
                                    color: isLast ? '#fff' : '#020617',
                                    padding: '14px 36px',
                                    borderRadius: '50px',
                                    border: 'none',
                                    fontFamily: "'Orbitron', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '11px',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                    boxShadow: isLast
                                        ? `0 0 30px ${step.glowColor}, 0 10px 30px rgba(0,0,0,0.3)`
                                        : '0 8px 25px rgba(255,255,255,0.15), 0 0 0 1px rgba(255,255,255,0.1)',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {isLast ? '⚡ LAUNCH NEXUS OS' : 'NEXT TACTICAL BRIEF'}
                                <ChevronRight style={{ width: 16, height: 16 }} />
                            </motion.button>
                        </motion.div>
                    </AnimatePresence>

                    {/* Protocol version */}
                    <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: 0,
                        right: 0,
                        textAlign: 'center'
                    }}>
                        <span style={{
                            fontFamily: "'Orbitron', sans-serif",
                            fontSize: '9px',
                            fontWeight: 800,
                            color: 'rgba(100, 116, 139, 0.4)',
                            letterSpacing: '4px',
                            textTransform: 'uppercase'
                        }}>
                            NEXUS OS PROTOCOL V2.4
                        </span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default OnboardingTour;
