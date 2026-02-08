import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    Terminal,
    BookOpen,
    Activity,
    Layers,
    Cpu,
    AlertCircle
} from 'lucide-react';
import { phasesData } from '../data/journeyData';

const PhaseOrbitView = () => {
    const { phaseId } = useParams();
    const phase = phasesData[phaseId?.toLowerCase()] || phasesData['define'];

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
            className="max-w-6xl mx-auto"
        >
            {/* 📡 PHASE HEADER */}
            <motion.div variants={nodeVariants} className="mb-12 flex items-end justify-between border-b border-nexus-border pb-10">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-nexus-cyan/10 border border-nexus-cyan/30 flex items-center justify-center text-nexus-cyan">
                            <Activity className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <span className="text-nexus-cyan font-orbitron font-black text-xs tracking-widest uppercase">Target Phase</span>
                            <h1 className="text-5xl font-black font-orbitron text-white leading-none">{phase.title}</h1>
                        </div>
                    </div>
                    <p className="text-slate-400 text-lg font-medium italic max-w-2xl leading-relaxed">
                        "{phase.description}"
                    </p>
                </div>

                <div className="text-right flex flex-col items-end gap-3">
                    <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Phase Completion</div>
                    <div className="w-48 h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '45%' }}
                            className="absolute h-full bg-nexus-cyan shadow-[0_0_10px_#22d3ee]"
                        />
                    </div>
                    <span className="text-nexus-cyan font-orbitron font-black text-xs">45% READY</span>
                </div>
            </motion.div>

            {/* 🛠️ TOOL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {phase.tools.map((tool) => (
                    <motion.div
                        key={tool.id}
                        variants={nodeVariants}
                        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                        className={`
              group relative bg-nexus-surface/40 backdrop-blur-xl border border-nexus-border rounded-[2.5rem] p-8 flex flex-col transition-all duration-300
              ${tool.placeholder ? 'opacity-60 grayscale' : 'hover:border-nexus-cyan/50'}
            `}
                    >
                        {/* Tool Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-2xl bg-black/40 border border-white/10 group-hover:border-nexus-cyan/30 transition-colors`}>
                                <Cpu className={`w-5 h-5 ${tool.placeholder ? 'text-slate-600' : 'text-nexus-cyan'}`} />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-black font-orbitron text-slate-500 tracking-tighter uppercase mb-1">Station ID</span>
                                <span className="text-[10px] text-white font-bold">{tool.id.toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 mb-8">
                            <div className="text-[10px] text-nexus-gold font-orbitron font-black tracking-widest uppercase mb-1">{tool.type}</div>
                            <h3 className="text-2xl font-black text-white group-hover:text-nexus-cyan transition-colors mb-3 leading-tight">{tool.name}</h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                High-precision instrument for {tool.type.toLowerCase()} operations within {phase.title} phase.
                            </p>
                        </div>

                        {/* Complexity & Footprints */}
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-nexus-border/50">
                            <div className="flex gap-1.5">
                                <div className={`w-1.5 h-4 rounded-full ${tool.complexity === 'Elite' ? 'bg-nexus-purple' : 'bg-nexus-cyan'}`} />
                                <div className={`w-1.5 h-4 rounded-full ${tool.complexity === 'Medium' || tool.complexity === 'High' || tool.complexity === 'Elite' ? (tool.complexity === 'Elite' ? 'bg-nexus-purple' : 'bg-nexus-cyan') : 'bg-white/10'}`} />
                                <div className={`w-1.5 h-4 rounded-full ${tool.complexity === 'High' || tool.complexity === 'Elite' ? (tool.complexity === 'Elite' ? 'bg-nexus-purple' : 'bg-nexus-cyan') : 'bg-white/10'}`} />
                            </div>
                            <div className="text-[9px] font-black font-orbitron text-slate-500 tracking-widest">{tool.complexity.toUpperCase()}</div>
                        </div>

                        {/* Desktop Action Overlay */}
                        {!tool.placeholder ? (
                            <div className="absolute inset-0 bg-nexus-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] pointer-events-none" />
                        ) : (
                            <div className="absolute top-4 right-4 text-nexus-warn animate-pulse">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                        )}

                        {/* Links */}
                        <div className="mt-8 flex gap-4 relative z-10">
                            <Link
                                to={tool.placeholder ? '#' : `/workspace/${tool.id}`}
                                className={`
                    flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-orbitron font-black text-[10px] tracking-widest transition-all
                    ${tool.placeholder
                                        ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                                        : 'bg-white text-nexus-navy hover:scale-105 active:scale-95 shadow-xl'}
                  `}
                            >
                                <Terminal className="w-3.5 h-3.5" /> {tool.placeholder ? 'STATION LOCKED' : 'EXECUTE'}
                            </Link>

                            <button className="w-12 h-12 rounded-xl bg-black/40 border border-nexus-border flex items-center justify-center group/btn hover:border-nexus-purple transition-all">
                                <BookOpen className="w-4 h-4 text-slate-500 group-hover/btn:text-nexus-purple transition-colors" />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {/* 📚 ADD LEARNING CARD STUB */}
                <motion.div
                    variants={nodeVariants}
                    className="bg-black/20 border border-dashed border-nexus-border rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-all cursor-pointer group"
                >
                    <Layers className="w-10 h-10 text-slate-600 mb-4 group-hover:text-nexus-cyan group-hover:scale-110 transition-all" />
                    <div className="text-[10px] font-black font-orbitron text-slate-500 tracking-widest uppercase">Deep Learning</div>
                    <h4 className="text-white font-bold mt-1">Research Archives</h4>
                    <ArrowUpRight className="w-4 h-4 text-nexus-cyan mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PhaseOrbitView;
