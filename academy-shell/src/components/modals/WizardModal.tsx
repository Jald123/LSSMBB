"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, HeartPulse, ShoppingBag, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
    { id: 'MEDICAL', name: 'MEDICAL SURGERY', icon: HeartPulse, count: 5, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'DAILY_LIFE', name: 'DAILY EXCELLENCE', icon: ShoppingBag, count: 2, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'INVESTMENT', name: 'STRATEGIC FINANCE', icon: TrendingUp, count: 3, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'CUSTOM', name: 'OWN PROBLEM', icon: Sparkles, count: '∞', color: 'text-primary', bg: 'bg-primary/10' },
];

export function WizardModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState<any>(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative w-full max-w-5xl bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-surface rounded-full transition-colors z-10">
                    <X className="w-5 h-5" />
                </button>

                <div className="p-16 flex-1 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="space-y-4">
                                    <div className="text-[10px] font-black font-orbitron tracking-[0.4em] text-primary uppercase">Mission Initialization</div>
                                    <h2 className="text-5xl font-display font-black tracking-tight uppercase leading-none">Select your battlefield</h2>
                                    <p className="text-muted text-xl max-w-2xl leading-relaxed">Choose one of our 10 fixed case studies across three industries, or bring your own real-world challenge to the Nexus engine.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => { setSelection(cat); setStep(2); }}
                                            className="group p-8 rounded-[2rem] bg-surface/50 border border-border hover:border-primary/50 hover:bg-card hover:shadow-apple transition-all text-left flex flex-col justify-between aspect-square"
                                        >
                                            <div className={`w-12 h-12 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center`}>
                                                <cat.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className={`text-[10px] font-black ${cat.color} tracking-widest`}>{cat.count} PROJECTS</span>
                                                </div>
                                                <h3 className="text-xl font-black uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{cat.name}</h3>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setStep(1)} className="text-[10px] font-black tracking-widest text-muted hover:text-foreground">← BACK</button>
                                    <div className="w-1 h-1 rounded-full bg-border" />
                                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">{selection.name} OPERATIONAL AREA</span>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-5xl font-display font-black tracking-tight uppercase leading-none">Choose active case</h2>
                                    <p className="text-muted text-xl max-w-2xl">Each mission provides unique constraints and prebuilt datasets.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <button key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-surface/50 border border-border hover:border-primary/50 transition-all text-left">
                                            <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-xl font-black">0{i}</div>
                                            <div className="flex-1">
                                                <h4 className="font-black text-lg uppercase tracking-tight">Mission Example {i}</h4>
                                                <p className="text-xs text-muted">A deep dive into cross-functional optimization.</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-muted" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-10 bg-surface border-t border-border flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className={`w-12 h-1.5 rounded-full transition-all ${step === 1 ? 'bg-primary' : 'bg-muted/20'}`} />
                        <div className={`w-12 h-1.5 rounded-full transition-all ${step === 2 ? 'bg-primary' : 'bg-muted/20'}`} />
                        <div className={`w-12 h-1.5 rounded-full transition-all ${step === 3 ? 'bg-primary' : 'bg-muted/20'}`} />
                    </div>
                    <div className="text-[10px] font-black tracking-widest text-muted uppercase">V.1.0 NEXUS CORE</div>
                </div>
            </motion.div>
        </div>
    );
}
