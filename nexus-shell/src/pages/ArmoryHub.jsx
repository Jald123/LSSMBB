import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, X } from 'lucide-react';

const ArmoryHub = () => {
    const navigate = useNavigate();

    const missions = [
        {
            id: 'charter',
            name: 'THE CONTRACT',
            tag: 'PROJECT CHARTER',
            desc: 'Define project scope, objectives, and team boundaries.',
            img: '/04-STATISTICS-TOOLS/images/armory/station_charter.png',
            glow: 'rgba(59, 130, 246, 0.5)',
            path: '/armory/mission/charter'
        },
        {
            id: 'sipoc',
            name: 'THE MAP',
            tag: 'SIPOC DIAGRAM',
            desc: 'Map high-level process flow: Suppliers to Customers.',
            img: '/04-STATISTICS-TOOLS/images/armory/station_sipoc.png',
            glow: 'rgba(16, 185, 129, 0.5)',
            path: '/armory/mission/sipoc'
        },
        {
            id: 'msa',
            name: 'THE TRUST',
            tag: 'MSA / GAGE R&R',
            desc: 'Validate measurement precision and gauge reliability.',
            img: '/04-STATISTICS-TOOLS/images/armory/station_msa.png',
            glow: 'rgba(245, 158, 11, 0.5)',
            path: '/armory/mission/msa'
        },
        {
            id: 'stats',
            name: 'THE DOCKING SEQUENCE',
            tag: 'PROCESS CAPABILITY',
            desc: 'Optimize Cp and Cpk to dock the cargo drone safely through the tunnel.',
            img: '/04-STATISTICS-TOOLS/images/armory/station_docking.png',
            glow: 'rgba(6, 182, 212, 0.5)',
            path: '/armory/mission/stats'
        },
        {
            id: 'pareto',
            name: 'THE FOCUS',
            tag: 'PARETO ANALYSIS',
            desc: 'Identify the vital few issues causing 80% of pain.',
            img: '/04-STATISTICS-TOOLS/images/armory/station_pareto.png',
            glow: 'rgba(168, 85, 247, 0.5)',
            path: '/armory/mission/pareto'
        },
        {
            id: 'fishbone',
            name: 'THE ANATOMY',
            tag: 'FISHBONE DIAGRAM',
            desc: 'Trace potential root causes across the 6M categories.',
            img: '/04-STATISTICS-TOOLS/images/armory/station_fishbone.png',
            glow: 'rgba(225, 29, 72, 0.5)',
            path: '/armory/mission/fishbone'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* 🛡️ Modal-Style Frame */}
            <div className="bg-[#0f172a]/95 border border-cyan-500/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.1)]">

                {/* 🏷️ Header Bar */}
                <div className="bg-black/40 border-b border-cyan-500/20 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-cyan-500/10 rounded flex items-center justify-center border border-cyan-500/30">
                            <Shield className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <h1 className="text-xs font-black font-orbitron tracking-[0.2em] text-cyan-400">THE ANALYST'S ARMORY</h1>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-nexus-text-secondary hover:text-nexus-text-primary hover:border-white/30 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-12">
                    {/* 🎯 Mission Title */}
                    <div className="text-center mb-16 space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-black font-orbitron text-white tracking-widest"
                        >
                            MISSION PREP: <span className="text-nexus-cyan">THE ESSENTIAL 6</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-nexus-text-secondary text-sm font-medium tracking-wide"
                        >
                            Select a station to calibrate your core skills. Master these, or fail the project.
                        </motion.p>
                    </div>

                    {/* 🏗️ Mission Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
                        {missions.map((mission, index) => (
                            <motion.div
                                key={mission.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                                className="group relative"
                            >
                                <div className="h-full bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/5">

                                    {/* 📀 Circular Hologram Image */}
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 rounded-full blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-40"
                                            style={{ background: mission.glow }} />
                                        <div className="w-32 h-32 rounded-full border-2 border-cyan-500/20 p-1 bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                                            <img
                                                src={mission.img}
                                                alt={mission.name}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                            />
                                        </div>
                                    </div>

                                    {/* 📝 Labels */}
                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <h3 className="text-lg font-black font-orbitron text-white tracking-wider group-hover:text-cyan-400 transition-colors uppercase">
                                                {mission.name}
                                            </h3>
                                            <p className="text-[10px] font-black text-nexus-text-secondary/60 tracking-[0.2em] uppercase mt-1">
                                                {mission.tag}
                                            </p>
                                        </div>
                                        <p className="text-xs text-nexus-text-secondary font-medium leading-relaxed">
                                            {mission.desc}
                                        </p>
                                    </div>

                                    {/* 🚀 Button */}
                                    <button
                                        onClick={() => navigate(mission.path)}
                                        className="mt-8 w-full py-4 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-xs font-black font-orbitron text-cyan-400 tracking-[0.3em] uppercase transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                    >
                                        SOLVE MISSION
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* 🛠️ Footer Bar */}
                    <div className="bg-black/40 border-t border-cyan-500/20 px-8 py-3 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                            <span className="text-[10px] font-black font-orbitron text-cyan-400/60 uppercase tracking-widest">Mission Status: Optimal</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-4 h-1 bg-cyan-500/20 rounded-full" />
                                ))}
                            </div>
                            <span className="text-[9px] font-black font-orbitron text-nexus-text-secondary/40 uppercase tracking-widest">Nexus OS / Armory v2.1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArmoryHub;
