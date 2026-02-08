import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
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
    const { xp, completedTools, industry, methodology, setMethodology } = useNexus();
    const navigate = useNavigate();

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

            {/* 📚 PHASE 0: FOUNDATION STAGE (Restored) */}
            <motion.div variants={itemVariants} className="mb-12">
                <div className="flex items-center gap-4 mb-6 px-4">
                    <h3 className="text-2xl font-black text-white font-orbitron">
                        Project Workflow Guide <span className="text-nexus-gold text-xs px-2 py-1 bg-nexus-gold/10 rounded ml-2">SMART</span>
                    </h3>
                    <p className="text-slate-500 text-xs hidden sm:block">Comprehensive workflow logic with Belt Level filtering.</p>
                </div>

                <div className="p-1 rounded-[2rem] bg-gradient-to-r from-nexus-gold/20 via-transparent to-nexus-cyan/20 border border-white/5">
                    <div className="bg-[#0a0f1c] rounded-[1.8rem] p-8 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Phase 0: Foundation & Strategy</h4>
                                <p className="text-slate-400 text-sm">Master the basics before you begin.</p>
                            </div>
                            <span className="px-3 py-1 bg-nexus-gold text-nexus-navy text-[10px] font-black font-orbitron rounded uppercase">Required</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {/* LSS Fundamentals */}
                            <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-4 group hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-nexus-blue/20 rounded-lg flex items-center justify-center text-blue-400">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold text-sm">LSS Fundamentals</h5>
                                    <p className="text-xs text-slate-500 mb-2">History, Belts, Principles.</p>
                                    <button onClick={() => navigate('/workspace/fundamentals')} className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[9px] font-black font-orbitron text-slate-300">OPEN GUIDE</button>
                                </div>
                            </div>

                            {/* Mission Prep -> ARMORY LINK */}
                            <div className="bg-gradient-to-r from-nexus-cyan/10 to-transparent border border-nexus-cyan/20 p-4 rounded-xl flex items-center gap-4 group hover:border-nexus-cyan/40 transition-colors">
                                <div className="w-12 h-12 bg-nexus-cyan/20 rounded-lg flex items-center justify-center text-nexus-cyan shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-white font-bold text-sm">MISSION PREP</h5>
                                    <p className="text-xs text-slate-500 mb-2">The Essential 6 Pillars</p>
                                    <button
                                        onClick={() => navigate('/armory')}
                                        className="px-4 py-1.5 bg-nexus-cyan text-nexus-navy rounded text-[9px] font-black font-orbitron hover:scale-105 transition-transform shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                                    >
                                        ENTER ARMORY
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-nexus-gold/5 to-transparent pointer-events-none" />
                    </div>
                </div>
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

                {/* TRIAGE CARDS (METHODOLOGIES) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    {/* DMAIC Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        onClick={() => { setMethodology('DMAIC'); navigate('/journey/define'); }}
                        className={`flex-1 bg-nexus-surface/40 hover:bg-white/5 border border-nexus-border rounded-[2.5rem] p-6 flex items-center gap-6 relative group cursor-pointer transition-all ${methodology === 'DMAIC' ? 'border-nexus-cyan/50 bg-nexus-cyan/5' : ''}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-nexus-cyan/20 border border-nexus-cyan/40 flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-cyan transition-colors">
                            <Zap className="w-8 h-8 text-nexus-cyan group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-nexus-cyan font-orbitron font-black text-[9px] tracking-widest mb-1 uppercase">Standard Path</div>
                            <h4 className="text-xl font-black text-white">DMAIC Engine</h4>
                            <p className="text-[10px] text-slate-500 font-medium">Root Cause Analysis & Optimization.</p>
                        </div>
                        <ChevronRight className="ml-auto w-5 h-5 text-slate-700 group-hover:text-nexus-cyan transition-colors" />
                    </motion.div>

                    {/* DMADV Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        onClick={() => { setMethodology('DMADV'); navigate('/journey/define'); }}
                        className={`flex-1 bg-nexus-surface/40 hover:bg-white/5 border border-nexus-border rounded-[2.5rem] p-6 flex items-center gap-6 relative group cursor-pointer transition-all ${methodology === 'DMADV' ? 'border-nexus-gold/50 bg-nexus-gold/5' : ''}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-nexus-gold/20 border border-nexus-gold/40 flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-gold transition-colors">
                            <PenTool className="w-8 h-8 text-nexus-gold group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-nexus-gold font-orbitron font-black text-[9px] tracking-widest mb-1 uppercase">Design Path</div>
                            <h4 className="text-xl font-black text-white">DMADV (DFSS)</h4>
                            <p className="text-[10px] text-slate-500 font-medium">Design for Six Sigma & Innovation.</p>
                        </div>
                        <ChevronRight className="ml-auto w-5 h-5 text-slate-700 group-hover:text-nexus-gold transition-colors" />
                    </motion.div>

                    {/* KAIZEN Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        onClick={() => { setMethodology('KAIZEN'); navigate('/journey/kickoff'); }}
                        className={`flex-1 bg-nexus-surface/40 hover:bg-white/5 border border-nexus-border rounded-[2.5rem] p-6 flex items-center gap-6 relative group cursor-pointer transition-all ${methodology === 'KAIZEN' ? 'border-nexus-purple/50 bg-nexus-purple/5' : ''}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-nexus-purple/20 border border-nexus-purple/40 flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-purple transition-colors">
                            <Trophy className="w-8 h-8 text-nexus-purple group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-nexus-purple font-orbitron font-black text-[9px] tracking-widest mb-1 uppercase">Rapid Event</div>
                            <h4 className="text-xl font-black text-white">Kaizen Event</h4>
                            <p className="text-[10px] text-slate-500 font-medium">3-5 Day Rapid Improvement Blitz.</p>
                        </div>
                        <ChevronRight className="ml-auto w-5 h-5 text-slate-700 group-hover:text-nexus-purple transition-colors" />
                    </motion.div>

                    {/* FOCUS-PDCA Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        onClick={() => { setMethodology('FOCUS'); navigate('/journey/find'); }}
                        className={`flex-1 bg-nexus-surface/40 hover:bg-white/5 border border-nexus-border rounded-[2.5rem] p-6 flex items-center gap-6 relative group cursor-pointer transition-all ${methodology === 'FOCUS' ? 'border-nexus-success/50 bg-nexus-success/5' : ''}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
                            <Activity className="w-8 h-8 text-green-500 group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-green-500 font-orbitron font-black text-[9px] tracking-widest mb-1 uppercase">Continuous Imp.</div>
                            <h4 className="text-xl font-black text-white">FOCUS-PDCA</h4>
                            <p className="text-[10px] text-slate-500 font-medium">Systematic Problem Solving Cycle.</p>
                        </div>
                        <ChevronRight className="ml-auto w-5 h-5 text-slate-700 group-hover:text-green-500 transition-colors" />
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
