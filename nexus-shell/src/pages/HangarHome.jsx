import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    ArrowRight,
    X,
    Cpu,
    Shield,
    BookOpen,
    Rocket
} from 'lucide-react';

import { useNexus } from '../context/NexusContext';

const HangarHome = () => {
    const { xp, completedTools, industry, methodology, setMethodology } = useNexus();
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null);

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

    // 🏗️ INFO MODAL COMPONENT
    const InfoModal = ({ title, subtitle, onClose, children, action }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-nexus-card border border-nexus-border rounded-3xl p-10 max-w-4xl w-full relative overflow-hidden shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-nexus-text-secondary hover:text-nexus-text-primary"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                    <h3 className="text-2xl font-black font-orbitron text-nexus-text-primary mb-1">{title}</h3>
                    <p className="text-sm text-nexus-text-secondary font-medium tracking-wide">{subtitle}</p>
                </div>

                <div className="mb-8 text-nexus-text-secondary leading-relaxed text-sm space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {children}
                </div>

                {action && (
                    <div className="flex justify-end pt-6 border-t border-nexus-border/50">
                        {action}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pt-32 pb-24 px-10 max-w-[1440px] mx-auto min-h-screen relative"
        >
            {/* 🚀 HERO SECTION */}
            <motion.div variants={itemVariants} className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nexus-accent/5 rounded-full blur-[100px] -z-10" />
                <div className="inline-flex items-center gap-2 bg-nexus-accent/10 border border-nexus-accent/30 px-5 py-2 rounded-full mb-6">
                    <Activity className="w-4 h-4 text-nexus-accent" />
                    <span className="text-[10px] font-black font-orbitron text-nexus-accent tracking-[0.2em] uppercase">
                        System Online: {industry.toUpperCase()} DEPLOYMENT
                    </span>
                </div>
                <h1 className="text-7xl font-black font-orbitron leading-[1.1] mb-6 tracking-tight">
                    <span className="text-nexus-text-primary">COMMAND YOUR</span><br />
                    <span className="radar-sweep-text uppercase">
                        LEAN LEGACY.
                    </span>
                </h1>
                <p className="text-nexus-text-secondary max-w-2xl mx-auto text-lg leading-relaxed font-medium italic mb-8">
                    "The 6.0 Sigma Frontier waits for no one. <span className="text-nexus-accent">Calibrate your process.</span> Secure your legacy." <br />
                    <span className="text-nexus-accent/60 font-orbitron text-[10px] mt-3 block tracking-[0.3em] uppercase opacity-70">— NEXUS OS JOURNEY ENGINE | MBB ARCHITECTURE</span>
                </p>

                {/* 🎯 MISSION QUICK-START CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center"
                >
                    <Link
                        to="/journey/define"
                        className="group relative flex items-center gap-4 bg-nexus-accent/20 hover:bg-nexus-accent/30 border border-nexus-accent/40 px-10 py-5 rounded-2xl transition-all duration-500 hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-nexus-accent/5 blur-xl group-hover:blur-2xl transition-all" />
                        <Rocket className="w-5 h-5 text-nexus-accent animate-bounce" />
                        <div className="text-left">
                            <div className="text-[10px] font-black font-orbitron text-nexus-accent tracking-widest uppercase">Resume Active Operation</div>
                            <div className="text-sm font-bold text-nexus-text-primary capitalize">Project: {industry} Optimization</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-nexus-accent group-hover:translate-x-2 transition-transform" />
                    </Link>
                </motion.div>
            </motion.div>

            {/* 📚 PHASE 0: FOUNDATION STAGE */}
            <motion.div variants={itemVariants} className="mb-12">
                <div className="flex items-center gap-4 mb-6 px-4">
                    <h3 className="text-2xl font-black text-nexus-text-primary font-orbitron">
                        Project Workflow Guide <span className="text-nexus-gold text-xs px-2 py-1 bg-nexus-gold/10 rounded ml-2">SMART</span>
                    </h3>
                    <p className="text-nexus-text-secondary text-xs hidden sm:block">Comprehensive workflow logic with Belt Level filtering.</p>
                </div>

                <div className="p-1 rounded-[2rem] bg-gradient-to-r from-nexus-gold/20 via-transparent to-nexus-cyan/20 border border-nexus-border">
                    <div className="bg-nexus-surface rounded-[1.8rem] p-8 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <h4 className="text-xl font-bold text-nexus-text-primary mb-2">Phase 0: Foundation & Strategy</h4>
                                <p className="text-nexus-text-secondary text-sm">Master the basics before you begin.</p>
                            </div>
                            <span className="px-3 py-1 bg-nexus-gold text-nexus-navy text-[10px] font-black font-orbitron rounded uppercase">Required</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {/* LSS Fundamentals */}
                            <div className="bg-nexus-text-primary/5 border border-nexus-border p-4 rounded-xl flex items-center gap-4 group hover:bg-nexus-text-primary/10 transition-colors cursor-pointer" onClick={() => setActiveModal('fundamentals')}>
                                <div className="w-12 h-12 bg-nexus-cyan/20 rounded-lg flex items-center justify-center text-nexus-cyan">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-nexus-text-primary font-bold text-sm">LSS Fundamentals</h5>
                                    <p className="text-xs text-nexus-text-secondary mb-2">History, Belts, Principles.</p>
                                    <button className="px-3 py-1 bg-nexus-text-primary/5 hover:bg-nexus-text-primary/10 border border-nexus-border rounded text-[9px] font-black font-orbitron text-nexus-text-secondary">OPEN GUIDE</button>
                                </div>
                            </div>

                            {/* Mission Prep -> POPUP -> ARMORY */}
                            <div className="bg-gradient-to-r from-nexus-cyan/10 to-transparent border border-nexus-cyan/20 p-4 rounded-xl flex items-center gap-4 group hover:border-nexus-cyan/40 transition-colors cursor-pointer" onClick={() => setActiveModal('mission')}>
                                <div className="w-12 h-12 bg-nexus-cyan/20 rounded-lg flex items-center justify-center text-nexus-cyan shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-nexus-text-primary font-bold text-sm">MISSION PREP</h5>
                                    <p className="text-xs text-nexus-text-secondary mb-2">The Essential 6 Pillars</p>
                                    <button
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
                    <div className="h-full bg-nexus-card backdrop-blur-2xl border border-nexus-border rounded-[3rem] p-12 overflow-hidden relative">

                        {/* Holographic Watermark */}
                        <Layers className="absolute -top-10 -right-10 w-64 h-64 text-nexus-text-primary/[0.02] -rotate-12" />

                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-nexus-cyan rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
                                    <span className="text-nexus-cyan font-orbitron font-black text-xs tracking-widest uppercase">Active Mission</span>
                                </div>
                                <h2 className="text-5xl font-black text-nexus-text-primary font-orbitron mb-2">ER Wait Time Reduction</h2>
                                <div className="flex items-center gap-3 text-nexus-text-secondary font-bold text-sm">
                                    <Target className="w-4 h-4" /> Hospital System-Wide Optimization
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <div className="flex items-center gap-2 bg-nexus-gold/10 text-nexus-gold px-5 py-2 rounded-full border border-nexus-gold/30 text-xs font-black font-orbitron shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                    <Flame className="w-4 h-4 fill-nexus-gold" /> 12 DAY STREAK
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-nexus-text-secondary font-black tracking-widest uppercase">Current Belt</div>
                                    <div className="text-lg font-black text-nexus-text-primary font-orbitron">BLACK BELT <span className="text-nexus-gold text-xs">V</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-10 mb-12 bg-nexus-surface/50 p-8 rounded-[2rem] border border-nexus-border/50 shadow-inner">
                            <div>
                                <div className="text-[10px] text-nexus-text-secondary font-black tracking-widest mb-2 uppercase">LSS Phase</div>
                                <div className="text-2xl font-black text-nexus-text-primary font-orbitron flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-nexus-cyan/20 flex items-center justify-center border border-nexus-cyan/30">
                                        <span className="text-nexus-cyan text-sm">A</span>
                                    </div>
                                    ANALYZE
                                </div>
                            </div>
                            <div className="border-x border-nexus-border/50 px-10">
                                <div className="text-[10px] text-nexus-text-secondary font-black tracking-widest mb-2 uppercase">Objective</div>
                                <div className="text-xl font-bold text-nexus-text-primary flex items-center gap-2">
                                    Identify Root Causes <ArrowRight className="w-4 h-4 text-nexus-cyan" />
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] text-nexus-text-secondary font-black tracking-widest mb-2 uppercase">Completion</div>
                                <div className="relative w-full h-3 bg-nexus-text-primary/5 rounded-full overflow-hidden border border-nexus-border/10 mt-2">
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
                            className="group/btn relative inline-flex items-center gap-6 bg-nexus-text-primary text-nexus-bg-deep px-12 py-6 rounded-full font-orbitron font-black text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.4)]"
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
                        className={`flex-1 bg-nexus-card hover:bg-nexus-text-primary/5 border border-nexus-border rounded-[2.5rem] p-6 flex items-center gap-6 relative group cursor-pointer transition-all ${methodology === 'DMAIC' ? 'border-nexus-cyan/50 bg-nexus-cyan/5' : ''}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-nexus-cyan/20 border border-nexus-cyan/40 flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-cyan transition-colors">
                            <Zap className="w-8 h-8 text-nexus-cyan group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-nexus-cyan font-orbitron font-black text-[9px] tracking-widest mb-1 uppercase">Standard Path</div>
                            <h4 className="text-xl font-black text-nexus-text-primary">DMAIC Engine</h4>
                            <p className="text-[10px] text-nexus-text-secondary font-medium">Root Cause Analysis & Optimization.</p>
                        </div>
                        <ChevronRight className="ml-auto w-5 h-5 text-nexus-text-secondary/40 group-hover:text-nexus-cyan transition-colors" />
                    </motion.div>

                    {/* DMADV Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        onClick={() => { setMethodology('DMADV'); navigate('/journey/define'); }}
                        className={`flex-1 bg-nexus-card hover:bg-nexus-text-primary/5 border border-nexus-border rounded-[2.5rem] p-6 flex items-center gap-6 relative group cursor-pointer transition-all ${methodology === 'DMADV' ? 'border-nexus-gold/50 bg-nexus-gold/5' : ''}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-nexus-gold/20 border border-nexus-gold/40 flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-gold transition-colors">
                            <PenTool className="w-8 h-8 text-nexus-gold group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-nexus-gold font-orbitron font-black text-[9px] tracking-widest mb-1 uppercase">Design Path</div>
                            <h4 className="text-xl font-black text-nexus-text-primary">DMADV (DFSS)</h4>
                            <p className="text-[10px] text-nexus-text-secondary font-medium">Design for Six Sigma & Innovation.</p>
                        </div>
                        <ChevronRight className="ml-auto w-5 h-5 text-nexus-text-secondary/40 group-hover:text-nexus-gold transition-colors" />
                    </motion.div>

                    {/* KAIZEN Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        onClick={() => { setMethodology('KAIZEN'); navigate('/journey/kickoff'); }}
                        className={`flex-1 bg-nexus-card hover:bg-nexus-text-primary/5 border border-nexus-border rounded-[2.5rem] p-6 flex items-center gap-6 relative group cursor-pointer transition-all ${methodology === 'KAIZEN' ? 'border-nexus-purple/50 bg-nexus-purple/5' : ''}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-nexus-purple/20 border border-nexus-purple/40 flex items-center justify-center flex-shrink-0 group-hover:bg-nexus-purple transition-colors">
                            <Trophy className="w-8 h-8 text-nexus-purple group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-nexus-purple font-orbitron font-black text-[9px] tracking-widest mb-1 uppercase">Rapid Event</div>
                            <h4 className="text-xl font-black text-nexus-text-primary">Kaizen Event</h4>
                            <p className="text-[10px] text-nexus-text-secondary font-medium">3-5 Day Rapid Improvement Blitz.</p>
                        </div>
                        <ChevronRight className="ml-auto w-5 h-5 text-nexus-text-secondary/40 group-hover:text-nexus-purple transition-colors" />
                    </motion.div>

                    {/* FOCUS-PDCA Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        onClick={() => { setMethodology('FOCUS'); navigate('/journey/find'); }}
                        className={`flex-1 bg-nexus-card hover:bg-nexus-text-primary/5 border border-nexus-border rounded-[2.5rem] p-6 flex items-center gap-6 relative group cursor-pointer transition-all ${methodology === 'FOCUS' ? 'border-nexus-success/50 bg-nexus-success/5' : ''}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
                            <Activity className="w-8 h-8 text-green-500 group-hover:text-nexus-navy group-hover:fill-nexus-navy" />
                        </div>
                        <div>
                            <div className="text-green-500 font-orbitron font-black text-[9px] tracking-widest mb-1 uppercase">Continuous Imp.</div>
                            <h4 className="text-xl font-black text-nexus-text-primary">FOCUS-PDCA</h4>
                            <p className="text-[10px] text-nexus-text-secondary font-medium">Systematic Problem Solving Cycle.</p>
                        </div>
                        <ChevronRight className="ml-auto w-5 h-5 text-nexus-text-secondary/40 group-hover:text-green-500 transition-colors" />
                    </motion.div>
                </div>
            </div>

            {/* 📊 GLOBAL STATS BAR */}
            <motion.div
                variants={itemVariants}
                className="flex items-center justify-between bg-nexus-card border border-nexus-border/50 p-6 rounded-[2rem] backdrop-blur-md px-12"
            >
                <div className="flex items-center gap-16">
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-black font-orbitron text-nexus-text-primary italic">{completedTools.length}</div>
                        <div className="text-[10px] font-black font-orbitron text-nexus-text-secondary vertical-text border-l border-nexus-border pl-4 h-8 flex items-center uppercase tracking-widest">Tools Mastered</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-black font-orbitron text-nexus-text-primary italic">03</div>
                        <div className="text-[10px] font-black font-orbitron text-nexus-text-secondary vertical-text border-l border-nexus-border pl-4 h-8 flex items-center uppercase tracking-widest">Projects Won</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-black font-orbitron text-nexus-text-primary italic text-nexus-gold">92%</div>
                        <div className="text-[10px] font-black font-orbitron text-nexus-text-secondary vertical-text border-l border-nexus-border pl-4 h-8 flex items-center uppercase tracking-widest">Consistency</div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-[10px] text-nexus-text-secondary font-black tracking-widest uppercase mb-1">XP to Master</div>
                        <div className="text-xs font-black text-nexus-text-primary px-3 py-1 bg-nexus-text-primary/5 rounded-md border border-nexus-border/10">{xp} / 5,000</div>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-nexus-border p-1">
                        <div className="w-full h-full rounded-full border-4 border-nexus-cyan flex items-center justify-center font-orbitron text-[10px] font-black text-nexus-text-primary">
                            74
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 🖼️ POPUP MODALS */}
            <AnimatePresence>
                {activeModal === 'fundamentals' && (
                    <InfoModal
                        title="Lean Six Sigma Fundamentals"
                        subtitle="The Core Principles, History, and Belt Hierarchy"
                        onClose={() => setActiveModal(null)}
                        action={
                            <button
                                onClick={() => navigate('/workspace/fundamentals')}
                                className="flex items-center gap-2 px-6 py-3 bg-nexus-cyan text-nexus-navy rounded-xl font-black font-orbitron hover:scale-105 transition-transform"
                            >
                                <BookOpen className="w-4 h-4" />
                                LAUNCH FULL MODULE
                            </button>
                        }
                    >
                        <p>Welcome to the Nexus Lean Six Sigma Fundamentals module. This foundational system is designed to orient new Analysts to the core methodologies of process improvement.</p>
                        <div className="grid grid-cols-2 gap-4 my-6">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <h4 className="text-nexus-cyan font-bold font-orbitron mb-2">LEAN</h4>
                                <p className="text-xs text-nexus-text-secondary">Focuses on waste removal, flow, and creating value for the customer. Origin: Toyota Production System.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <h4 className="text-nexus-purple font-bold font-orbitron mb-2">SIX SIGMA</h4>
                                <p className="text-xs text-nexus-text-secondary">Focuses on reducing variation and defects using statistical tools. Origin: Motorola.</p>
                            </div>
                        </div>
                        <p>Completion of this module will unlock your <span className="text-nexus-gold font-bold">White Belt Certification</span>.</p>
                    </InfoModal>
                )}

                {activeModal === 'mission' && (
                    <InfoModal
                        title="Mission Prep: 6 Pillars"
                        subtitle="Essential Strategy for Project Success"
                        onClose={() => setActiveModal(null)}
                        action={
                            <button
                                onClick={() => navigate('/armory')}
                                className="flex items-center gap-2 px-6 py-3 bg-nexus-gold text-nexus-navy rounded-xl font-black font-orbitron hover:scale-105 transition-transform"
                            >
                                <Shield className="w-4 h-4" />
                                ENTER ANALYST ARMORY
                            </button>
                        }
                    >
                        <p>Before deploying to a project, every Nexus Analyst must master the 6 Strategic Pillars of high-performance execution.</p>
                        <ul className="space-y-3 my-4">
                            {[
                                { label: 'Customer First', desc: 'Always validate the Voice of the Customer (VOC).' },
                                { label: 'Data Driven', desc: 'Trust in God, all others bring data.' },
                                { label: 'Process Focus', desc: 'Bad processes beat good people.' },
                                { label: 'Root Cause', desc: 'Treat the disease, not just the symptom.' },
                                { label: 'Collaboration', desc: 'Silos destroy value; cross-functionality builds it.' },
                                { label: 'Continuous Imp.', desc: 'Better than yesterday, every day.' }
                            ].map((pillar, i) => (
                                <li key={i} className="flex items-start gap-4 p-4 bg-nexus-surface rounded-2xl border border-nexus-border/50 shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-nexus-cyan/10 flex items-center justify-center text-nexus-cyan font-black font-orbitron text-xs ring-1 ring-nexus-cyan/30 shrink-0">{i + 1}</div>
                                    <div>
                                        <span className="font-black font-orbitron text-nexus-text-primary text-sm block mb-0.5">{pillar.label}</span>
                                        <span className="text-xs text-nexus-text-secondary font-medium leading-relaxed">{pillar.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </InfoModal>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default HangarHome;
