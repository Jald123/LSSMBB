import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Flame,
    ChevronRight,
    Activity,
    Zap,
    Layers,
    PenTool,
    Target,
    Trophy,
    ArrowRight
} from 'lucide-react';

import { useNexus } from '../context/NexusContext';

const HangarHome = () => {
    const { xp, completedTools, industry } = useNexus();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 50, damping: 15 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pt-32 pb-24 px-10 max-w-[1440px] mx-auto min-h-screen"
        >
            {/* 🚀 HERO SECTION */}
            <motion.div variants={itemVariants} className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nexus-cyan/5 rounded-full blur-[100px] -z-10" />
                <div className="inline-flex items-center gap-2 bg-nexus-cyan/10 border border-nexus-cyan/30 px-5 py-2 rounded-full mb-6">
                    <Activity className="w-4 h-4 text-nexus-cyan" />
                    <span className="text-[10px] font-black font-orbitron text-nexus-cyan tracking-[0.2em] uppercase">
                        System Online: {industry.toUpperCase()} ENV
                    </span>
                </div>
                <h1 className="text-7xl font-black font-orbitron leading-[1.1] mb-6 tracking-tight">
                    <span className="text-white">COMMAND YOUR</span><br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-cyan via-nexus-gold to-nexus-purple bg-[length:200%_auto] animate-gradient-flow">
                        LEAN LEGACY.
                    </span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium italic">
                    "The biggest room in the world is the room for improvement." <br />
                    <span className="text-nexus-cyan/60 font-orbitron text-xs mt-2 block tracking-widest">— NEXUS OS JOURNEY ENGINE</span>
                </p>
            </motion.div>

            {/* 🛠️ MISSION DASHBOARD GRID */}
            <div className="grid grid-cols-12 gap-8 mb-16 px-4">

                {/* BIG RESUME CARD (PROMPT 2) */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                    className="col-span-12 lg:col-span-8 group relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-nexus-cyan/10 to-transparent rounded-[3rem] -z-10 opacity-50 border border-nexus-cyan/20" />
                    <div className="h-full bg-nexus-surface/40 backdrop-blur-2xl border border-nexus-border rounded-[3rem] p-12 overflow-hidden relative">

                        {/* Holographic Watermark */}
                        <Layers className="absolute -top-10 -right-10 w-64 h-64 text-white/[0.02] -rotate-12" />

                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-nexus-cyan rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
                                    <span className="text-nexus-cyan font-orbitron font-black text-xs tracking-widest uppercase">Active Mission</span>
                                </div>
                                <h2 className="text-5xl font-black text-white font-orbitron mb-2">ER Wait Time Reduction</h2>
                                <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                                    <Target className="w-4 h-4" /> Hospital System-Wide Optimization
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <div className="flex items-center gap-2 bg-nexus-gold/10 text-nexus-gold px-5 py-2 rounded-full border border-nexus-gold/30 text-xs font-black font-orbitron shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                    <Flame className="w-4 h-4 fill-nexus-gold" /> 12 DAY STREAK
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Current Belt</div>
                                    <div className="text-lg font-black text-white font-orbitron">BLACK BELT <span className="text-nexus-gold text-xs">V</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-10 mb-12 bg-black/30 p-8 rounded-[2rem] border border-nexus-border/50 shadow-inner">
                            <div>
                                <div className="text-[10px] text-slate-500 font-black tracking-widest mb-2 uppercase">LSS Phase</div>
                                <div className="text-2xl font-black text-white font-orbitron flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-nexus-cyan/20 flex items-center justify-center border border-nexus-cyan/30">
                                        <span className="text-nexus-cyan text-sm">A</span>
                                    </div>
                                    ANALYZE
                                </div>
                            </div>
                            <div className="border-x border-nexus-border/50 px-10">
                                <div className="text-[10px] text-slate-500 font-black tracking-widest mb-2 uppercase">Objective</div>
                                <div className="text-xl font-bold text-white flex items-center gap-2">
                                    Identify Root Causes <ArrowRight className="w-4 h-4 text-nexus-cyan" />
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 font-black tracking-widest mb-2 uppercase">Completion</div>
                                <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 mt-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '64%' }}
                                        transition={{ duration: 1.5, ease: 'easeOut' }}
                                        className="absolute h-full bg-gradient-to-r from-nexus-cyan to-white shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                    />
                                </div>
                                <div className="text-[10px] text-right mt-2 font-black text-nexus-cyan">64% TOTAL SCORE</div>
                            </div>
                        </div>

                        <Link
                            to="/workspace/charter"
                            className="group/btn relative inline-flex items-center gap-6 bg-white text-nexus-navy px-12 py-6 rounded-full font-orbitron font-black text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                        >
                            RESUME MISSION
                            <ChevronRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-2" />
                            <div className="absolute inset-0 rounded-full border-2 border-white group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        </Link>
                    </div>
                </motion.div>

                {/* TRIAGE CARDS (PROMPT 2) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="flex-1 bg-nexus-surface/40 hover:bg-white/5 border border-nexus-border rounded-[2.5rem] p-8 flex items-center gap-6 relative group cursor-pointer"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-nexus-cyan/20 border border-nexus-cyan/40 flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-cyan transition-colors">
                            <Zap className="w-10 h-10 text-nexus-cyan group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-nexus-cyan font-orbitron font-black text-[10px] tracking-widest mb-1 uppercase">DMAIC Path</div>
                            <h4 className="text-2xl font-black text-white">Engine Tuning</h4>
                            <p className="text-xs text-slate-500 font-medium">Optimize existing performance.</p>
                        </div>
                        <ChevronRight className="ml-auto w-6 h-6 text-slate-700 group-hover:text-nexus-cyan transition-colors" />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="flex-1 bg-nexus-surface/40 hover:bg-white/5 border border-nexus-border rounded-[2.5rem] p-8 flex items-center gap-6 relative group cursor-pointer"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-nexus-gold/20 border border-nexus-gold/40 flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-gold transition-colors">
                            <PenTool className="w-10 h-10 text-nexus-gold group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-nexus-gold font-orbitron font-black text-[10px] tracking-widest mb-1 uppercase">DMADV Path</div>
                            <h4 className="text-2xl font-black text-white">Blueprint Mode</h4>
                            <p className="text-xs text-slate-500 font-medium">Design new world-class workflows.</p>
                        </div>
                        <ChevronRight className="ml-auto w-6 h-6 text-slate-700 group-hover:text-nexus-gold transition-colors" />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="flex-1 bg-nexus-surface/40 hover:bg-white/5 border border-nexus-border rounded-[2.5rem] p-8 flex items-center gap-6 relative group cursor-pointer"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-nexus-purple/20 border border-nexus-purple/40 flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-purple transition-colors">
                            <Trophy className="w-10 h-10 text-nexus-purple group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-nexus-purple font-orbitron font-black text-[10px] tracking-widest mb-1 uppercase">Rapid Event</div>
                            <h4 className="text-2xl font-black text-white">Kaizen Gemba</h4>
                            <p className="text-xs text-slate-500 font-medium">3-day rapid impact blitz.</p>
                        </div>
                        <ChevronRight className="ml-auto w-6 h-6 text-slate-700 group-hover:text-nexus-purple transition-colors" />
                    </motion.div>
                </div>
            </div>

            {/* 📊 GLOBAL STATS BAR */}
            <motion.div
                variants={itemVariants}
                className="flex items-center justify-between bg-black/40 border border-nexus-border/50 p-6 rounded-[2rem] backdrop-blur-md px-12"
            >
                <div className="flex items-center gap-16">
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-black font-orbitron text-white italic">{completedTools.length}</div>
                        <div className="text-[10px] font-black font-orbitron text-slate-500 vertical-text border-l border-nexus-border pl-4 h-8 flex items-center uppercase tracking-widest">Tools Mastered</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-black font-orbitron text-white italic">03</div>
                        <div className="text-[10px] font-black font-orbitron text-slate-500 vertical-text border-l border-nexus-border pl-4 h-8 flex items-center uppercase tracking-widest">Projects Won</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-black font-orbitron text-white italic text-nexus-gold">92%</div>
                        <div className="text-[10px] font-black font-orbitron text-slate-500 vertical-text border-l border-nexus-border pl-4 h-8 flex items-center uppercase tracking-widest">Consistency</div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase mb-1">XP to Master</div>
                        <div className="text-xs font-black text-white px-3 py-1 bg-white/5 rounded-md border border-white/10">{xp} / 5,000</div>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-nexus-border p-1">
                        <div className="w-full h-full rounded-full border-4 border-nexus-cyan flex items-center justify-center font-orbitron text-[10px] font-black">
                            74
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default HangarHome;
