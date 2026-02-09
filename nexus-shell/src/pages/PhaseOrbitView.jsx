import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight,
    Terminal,
    BookOpen,
    Activity,
    Layers,
    Cpu,
    AlertCircle,
    Zap,
    ShieldCheck,
    Lock
} from 'lucide-react';
import { methodologyData } from '../data/journeyData';
import { useNexus } from '../context/NexusContext';

const PhaseOrbitView = () => {
    const { phaseId } = useParams();
    const { methodology } = useNexus();
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Normalize methodology key (e.g., FOCUS PDCA -> FOCUS)
    const activeMethodology = methodology.split(' ')[0].toUpperCase();
    const activeSet = methodologyData[activeMethodology] || methodologyData['DMAIC'];

    // Find phase by ID or default to the first phase of the methodology
    const phaseKey = phaseId?.toLowerCase();
    const phase = activeSet[phaseKey] || Object.values(activeSet)[0];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const nodeVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 60, damping: 12 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto pb-20 relative"
        >
            {/* VIDEO MODAL */}
            <AnimatePresence>
                {isVideoOpen && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl aspect-video bg-black border border-nexus-border rounded-3xl overflow-hidden shadow-2xl z-10"
                        >
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={() => setIsVideoOpen(false)}
                                    className="p-2 bg-black/50 hover:bg-nexus-error text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            {/* Placeholder for Video Player */}
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white">
                                <Activity className="w-16 h-16 text-nexus-cyan animate-pulse mb-6" />
                                <h3 className="text-2xl font-black font-orbitron mb-2">TACTICAL BRIEFING // OFFLINE</h3>
                                <p className="text-slate-400 font-mono text-sm max-w-md text-center">
                                    Video feed for <span className="text-nexus-cyan">{phase.title}</span> is currently encrypted or unavailable in this sector.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 🛠️ TOOL GRID - Enhanced with Spacing */}

            {/* Minimal Title - Just to anchor the grid */}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-nexus-cyan/10 flex items-center justify-center border border-nexus-cyan/20">
                        <Activity className="w-5 h-5 text-nexus-cyan" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black font-orbitron text-nexus-text-primary tracking-wide">{phase.title} TOOLS</h2>
                        <span className="text-[10px] text-nexus-text-secondary font-mono">SELECT PROTOCOL TO INITIATE</span>
                    </div>
                </div>
            </div>


            {/* 🛠️ TOOL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {phase?.tools?.map((tool) => (
                    <motion.div
                        key={tool.id}
                        variants={nodeVariants}
                        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                        className={`
                          group relative bg-nexus-surface/40 backdrop-blur-xl border border-nexus-border rounded-[2.5rem] p-8 flex flex-col transition-all duration-300
                          hover:border-nexus-cyan/40 hover:bg-nexus-surface/60
                        `}
                    >
                        {/* Tool Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 group-hover:border-nexus-cyan/30 transition-colors">
                                <Cpu className="w-5 h-5 text-nexus-cyan" />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-black font-orbitron text-slate-600 tracking-tighter uppercase mb-1">Station ID</span>
                                <span className="text-[10px] text-nexus-text-primary font-black font-orbitron">{tool.id.toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] text-nexus-gold font-orbitron font-black tracking-[0.2em] uppercase">{tool.category}</span>
                                <div className="h-px flex-1 bg-white/5" />
                                <span className={`
                                    px-2 py-0.5 rounded text-[8px] font-black font-orbitron border
                                    ${tool.belt === 'YB' ? 'border-nexus-gold/30 text-nexus-gold bg-nexus-gold/5' :
                                        tool.belt === 'GB' ? 'border-nexus-cyan/30 text-nexus-cyan bg-nexus-cyan/5' :
                                            'border-nexus-purple/30 text-nexus-purple bg-nexus-purple/5'}
                                `}>
                                    {tool.belt}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black text-nexus-text-primary group-hover:text-nexus-cyan transition-colors mb-3 leading-tight tracking-tight">
                                {tool.name}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Heavy-duty protocol for <span className="text-slate-400">{tool.category.toLowerCase()}</span> mastery. Optimized for <span className="text-slate-400">{tool.belt}</span> level operations.
                            </p>
                        </div>

                        {/* Status / Priority Footer */}
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-nexus-border/50">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black font-orbitron text-slate-600 uppercase tracking-widest mb-1">Priority</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-nexus-cyan" />
                                    <span className="text-[10px] font-black font-orbitron text-nexus-text-primary">{tool.priority}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[8px] font-black font-orbitron text-slate-600 uppercase tracking-widest mb-1">Visual</span>
                                <div className="text-[10px] font-black font-orbitron text-nexus-cyan shadow-cyan-300">LAUNCH</div>
                            </div>
                        </div>

                        {/* Overlay Sparkle */}
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-nexus-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Links */}
                        <div className="mt-8 flex gap-4 relative z-10">
                            <Link
                                to={`/workspace/${tool.id}`}
                                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-nexus-navy font-orbitron font-black text-[10px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-nexus-cyan/20"
                            >
                                <Terminal className="w-4 h-4" /> EXECUTE
                            </Link>

                            <Link
                                to={`/workspace/${tool.id}`}
                                state={{ mode: 'learn' }}
                                className="w-14 h-14 rounded-2xl bg-black/40 border border-nexus-border flex items-center justify-center group/btn hover:border-nexus-purple hover:bg-nexus-purple/5 transition-all"
                            >
                                <BookOpen className="w-5 h-5 text-slate-600 group-hover/btn:text-nexus-purple transition-colors" />
                            </Link>
                        </div>
                    </motion.div>
                ))}

                {/* 📚 PERSISTENT LEARNING HUB STUB */}
                <motion.div
                    variants={nodeVariants}
                    className="bg-black/20 border border-dashed border-nexus-border rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-all cursor-pointer group hover:bg-white/5 hover:border-nexus-cyan/40"
                >
                    <Layers className="w-12 h-12 text-slate-600 mb-6 group-hover:text-nexus-cyan group-hover:scale-110 transition-all duration-500" />
                    <div className="text-[10px] font-black font-orbitron text-slate-500 tracking-widest uppercase mb-1">Deep Learning</div>
                    <h4 className="text-nexus-text-primary font-bold tracking-tight">Theory Archives</h4>
                    <p className="text-[10px] text-slate-600 mt-2 max-w-[150px]">Access methodology deep-dives and case studies.</p>
                    <ArrowUpRight className="w-5 h-5 text-nexus-cyan mt-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PhaseOrbitView;
