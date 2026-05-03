"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Rocket, Layout, Wrench, Trophy, Zap, ChevronRight } from "lucide-react";
import Image from "next/image";

interface FieldGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GUIDE_SECTIONS = [
    {
        id: "uplink",
        title: "1. The Uplink (Login)",
        icon: <Rocket className="w-5 h-5" />,
        image: "/images/guide/login.png",
        description: "Experience the terminal-style boot sequence that authenticates your rank and initializes the Nexus Shell.",
        action: "Enter your Access Identifier and Security Key into the Nexus OS Terminal."
    },
    {
        id: "dashboard",
        title: "2. The Command Dashboard",
        icon: <Layout className="w-5 h-5" />,
        image: "/images/guide/dashboard.png",
        description: "View your Active Protocol, track your Mastery Index, Total XP, and Global Rank in real-time.",
        action: "Check your Daily Objectives to gain quick XP and maintain your rank."
    },
    {
        id: "academy",
        title: "3. The Academy",
        icon: <BookOpen className="w-5 h-5" />,
        image: "/images/roadmaps/dmaic-roadmap.png",
        description: "Switch between DMAIC, DMADV, KAIZEN, or FOCUS-PDCA. Click the glowing sidebar to explore the 32:9 roadmaps.",
        action: "Establish a tool-uplink by clicking any lesson in the curriculum."
    },
    {
        id: "armory",
        title: "4. The Armory",
        icon: <Wrench className="w-5 h-5" />,
        image: "/images/guide/armory.png",
        description: "Use premium statistical calculators and management templates with integrated Sensei MBB guidance.",
        action: "All tool data is automatically synced to your active mission board."
    },
    {
        id: "achievements",
        title: "5. Hall of Mastery",
        icon: <Trophy className="w-5 h-5" />,
        image: "/images/guide/achievements.png",
        description: "Visit the hub to view unlocked badges, digital certificates, and track your belt progression.",
        action: "Evolve from Yellow Belt to Master Black Belt as you earn XP."
    }
];

export const FieldGuideModal: React.FC<FieldGuideModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content - Forced Dark Theme for Tactical Look */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col text-white"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-primary/20 to-transparent">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">The Operator's Field Guide</h2>
                                    <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">Master the Nexus OS Ecosystem with Precision</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-16 custom-scrollbar bg-[#0d0d0d]">
                            <div className="max-w-3xl mx-auto text-center space-y-4">
                                <p className="text-xl text-slate-300 leading-relaxed font-medium">
                                    Welcome to <span className="text-white font-black underline decoration-primary underline-offset-4">Nexus OS</span>, the world's most advanced Lean Six Sigma Executive Terminal.
                                </p>
                            </div>

                            <div className="space-y-32">
                                {GUIDE_SECTIONS.map((section, index) => (
                                    <div key={section.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center text-left`}>
                                        <div className="flex-1 space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                                    {section.icon}
                                                </div>
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">{section.title}</h3>
                                            </div>
                                            <p className="text-lg text-slate-300 leading-relaxed font-medium">
                                                {section.description}
                                            </p>
                                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <p className="text-xs font-black text-primary uppercase tracking-[0.3em]">Operational Action</p>
                                                <p className="text-base text-white font-bold leading-tight relative z-10">{section.action}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full group">
                                            <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.03] group-hover:border-primary/40">
                                                <img 
                                                    src={section.image} 
                                                    alt={section.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pro Tips Section */}
                            <div className="pt-20 border-t border-white/10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/20 space-y-4 shadow-lg">
                                        <Zap className="w-8 h-8 text-primary" />
                                        <h4 className="text-lg font-black text-white uppercase tracking-tighter">Follow the Glow</h4>
                                        <p className="text-sm text-slate-400 font-medium">Available elements feature a methodology-specific neon glow to guide your eye.</p>
                                    </div>
                                    <div className="p-8 rounded-[2rem] bg-nexus-gold/10 border border-nexus-gold/20 space-y-4 shadow-lg">
                                        <Rocket className="w-8 h-8 text-nexus-gold" />
                                        <h4 className="text-lg font-black text-white uppercase tracking-tighter">Toggle Frameworks</h4>
                                        <p className="text-sm text-slate-400 font-medium">Switching methodologies re-skins the entire terminal instantly with unique Color DNA.</p>
                                    </div>
                                    <div className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 space-y-4 shadow-lg">
                                        <Trophy className="w-8 h-8 text-emerald-500" />
                                        <h4 className="text-lg font-black text-white uppercase tracking-tighter">Check Your XP</h4>
                                        <p className="text-sm text-slate-400 font-medium">Premium modules grant high XP multipliers to accelerate your rank evolution.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="py-20 text-center">
                                <p className="text-base font-black text-white tracking-[0.4em] uppercase italic opacity-30">Protocol Initiated. Good luck, Operator.</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/10 bg-black/60 flex justify-center">
                            <button 
                                onClick={onClose}
                                className="px-12 py-4 rounded-2xl bg-primary text-black font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] flex items-center gap-3 active:scale-95"
                            >
                                Acknowledge Protocol <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
