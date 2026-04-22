"use client";

import React from "react";
import { CheckCircle2, Trophy, Zap, ChevronRight, Binary } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/primitives/Button";

interface CelebrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    phaseName: string;
    nextPhaseName: string | null;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
    isOpen,
    onClose,
    phaseName,
    nextPhaseName
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
                    {/* Immersive Dark Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
                    />

                    {/* Celebration Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="relative w-full max-w-[480px] bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(34,211,238,0.1)] p-10 text-center overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-b from-primary/10 via-transparent to-transparent -z-10" />
                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />

                        {/* Animated Trophy Icon */}
                        <div className="flex justify-center mb-10">
                            <motion.div
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl relative z-10 rotate-12">
                                    <Trophy className="w-12 h-12 text-[#020617]" />
                                </div>
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-4 border border-dashed border-primary/30 rounded-full"
                                />
                            </motion.div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                <Binary className="w-3 h-3 text-primary" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">PHASE_TRANSITION_COMPLETE</span>
                            </div>
                            <h2 className="text-4xl font-bold font-display tracking-tight text-white italic">
                                {phaseName} <span className="text-primary">Concluded</span>
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-[320px] mx-auto">
                                Protocol parameters verified. {nextPhaseName ? `Sequential uplink for ${nextPhaseName} is now active.` : "All project objectives have been successfully captured."}
                            </p>
                        </div>

                        {/* Reward Visual */}
                        {nextPhaseName && (
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 mb-10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-nexus-gold/10 flex items-center justify-center text-nexus-gold">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rewards Unlocked</p>
                                        <p className="text-sm font-bold text-white">+500 Mastery XP</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Multiplier</p>
                                    <p className="text-sm font-bold text-primary">x1.2</p>
                                </div>
                            </div>
                        )}

                        <Button
                            variant="nexus"
                            size="lg"
                            className="w-full py-8 font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                            onClick={onClose}
                        >
                            {nextPhaseName ? "Open Next Sector" : "Finalize Mission"}
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>

                        {/* Cyber Confetti */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{
                                    x: (Math.random() - 0.5) * 400,
                                    y: (Math.random() - 0.5) * 400 - 100,
                                    opacity: 0,
                                    scale: 0,
                                    rotate: Math.random() * 360
                                }}
                                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                className={`absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full ${['bg-primary', 'bg-accent', 'bg-white', 'bg-slate-500'][i % 4]}`}
                            />
                        ))}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
