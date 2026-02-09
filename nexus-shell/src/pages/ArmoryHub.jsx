import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Map, Scale, Activity, ListFilter, Bone } from 'lucide-react';

const ArmoryHub = () => {
    const navigate = useNavigate();

    const missions = [
        {
            id: 'charter',
            name: 'THE CONTRACT',
            tag: 'Project Charter',
            desc: 'Define project scope, objectives, and team boundaries.',
            icon: Shield,
            color: 'from-blue-500 to-cyan-500',
            glow: 'rgba(59, 130, 246, 0.5)',
            path: '/workspace/charter'
        },
        {
            id: 'sipoc',
            name: 'THE MAP',
            tag: 'SIPOC Diagram',
            desc: 'Map high-level process flow: Suppliers to Customers.',
            icon: Map,
            color: 'from-emerald-500 to-teal-500',
            glow: 'rgba(16, 185, 129, 0.5)',
            path: '/workspace/sipoc'
        },
        {
            id: 'msa',
            name: 'THE TRUST',
            tag: 'MSA / Gage R&R',
            desc: 'Validate measurement precision and gauge reliability.',
            icon: Scale,
            color: 'from-amber-500 to-orange-500',
            glow: 'rgba(245, 158, 11, 0.5)',
            path: '/workspace/msa'
        },
        {
            id: 'stats',
            name: 'THE DOCKING SEQUENCE',
            tag: 'Process Capability',
            desc: 'Optimize Cp and Cpk to dock the cargo drone safely through the tunnel.',
            icon: Activity,
            color: 'from-cyan-500 to-blue-500',
            glow: 'rgba(6, 182, 212, 0.5)',
            path: '/armory/docking-game'
        },
        {
            id: 'pareto',
            name: 'THE FOCUS',
            tag: 'Pareto Analysis',
            desc: 'Identify the vital few issues causing 80% of pain.',
            icon: ListFilter,
            color: 'from-purple-500 to-pink-500',
            glow: 'rgba(168, 85, 247, 0.5)',
            path: '/workspace/pareto'
        },
        {
            id: 'fishbone',
            name: 'THE ANATOMY',
            tag: 'Fishbone Diagram',
            desc: 'Trace potential root causes across the 6M categories.',
            icon: Bone,
            color: 'from-rose-500 to-red-500',
            glow: 'rgba(225, 29, 72, 0.5)',
            path: '/workspace/fishbone'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-black font-orbitron text-white mb-4 tracking-tight">
                    MISSION PREP: <span className="text-nexus-cyan">THE ESSENTIAL 6</span>
                </h2>
                <p className="text-slate-400 font-medium max-w-2xl mx-auto">
                    Select a station to calibrate your core skills. Master these, or fail the project.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {missions.map((mission, index) => (
                    <motion.div
                        key={mission.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        onClick={() => mission.path.startsWith('http') ? window.location.href = mission.path : navigate(mission.path)}
                        className="group relative h-[400px] cursor-pointer"
                    >
                        {/* 💎 Glass Background */}
                        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-white/30 shadow-2xl">
                            {/* 🌌 Ambient Glow */}
                            <div
                                className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                                style={{ background: mission.glow }}
                            />

                            {/* Card Content */}
                            <div className="relative h-full flex flex-col items-center justify-between p-10 text-center">
                                {/* 🛠️ Icon Hub */}
                                <div className="relative mb-8">
                                    <div className={`absolute inset-0 blur-[20px] opacity-30 bg-gradient-to-br ${mission.color}`} />
                                    <div className={`w-24 h-24 rounded-full bg-slate-950 border-2 border-white/10 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:border-white/30`}>
                                        <mission.icon className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                {/* 📝 Info */}
                                <div className="space-y-3">
                                    <h4 className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">{mission.tag}</h4>
                                    <h3 className="text-xl font-black font-orbitron text-white leading-tight transition-colors group-hover:text-nexus-cyan">{mission.name}</h3>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed px-4">{mission.desc}</p>
                                </div>

                                {/* 🚀 Action Button */}
                                <div className="mt-8 w-full">
                                    <div className="relative inline-flex group/btn w-full">
                                        <div className={`absolute -inset-px rounded-xl blur-[10px] opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-r ${mission.color}`} />
                                        <button className="relative w-full px-8 py-3 bg-slate-950 border border-white/10 rounded-xl text-[10px] font-black font-orbitron text-white tracking-widest hover:border-white/30 transition-all duration-300 uppercase">
                                            Solve Mission
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ArmoryHub;
