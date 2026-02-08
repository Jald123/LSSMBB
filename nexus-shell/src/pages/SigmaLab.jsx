import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FlaskConical, Beaker, Zap, Activity, Terminal } from 'lucide-react';

const SigmaLab = () => {
    return (
        <div className="flex flex-col items-center justify-center p-20 text-center min-h-[60vh]">
            <motion.div
                animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 rounded-[2.5rem] bg-nexus-gold/10 border border-nexus-gold/30 flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(245,158,11,0.1)]"
            >
                <FlaskConical className="w-16 h-16 text-nexus-gold" />
            </motion.div>

            <h2 className="text-4xl font-black font-orbitron text-white mb-4 uppercase tracking-tighter">Sigma Lab Explorer</h2>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed mb-12">
                Simulate variation scenarios and test statistical confidence intervals in a controlled virtual environment.
                Adjust your sigma level and witness real-time probability shifts.
            </p>

            <div className="grid grid-cols-3 gap-6 w-full max-w-3xl mb-12">
                {[
                    { label: 'Variance', value: '0.042', icon: Activity },
                    { label: 'Confidence', value: '95.4%', icon: Zap },
                    { label: 'Samples', value: '1,200', icon: Beaker },
                ].map((stat, i) => (
                    <div key={i} className="glass-panel p-6 rounded-3xl text-left border-white/5">
                        <stat.icon className="w-4 h-4 text-nexus-gold mb-3" />
                        <div className="text-[10px] font-black font-orbitron text-slate-600 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-xl font-black text-white">{stat.value}</div>
                    </div>
                ))}
            </div>

            <Link
                to="/workspace/adv-analytics"
                className="inline-flex items-center gap-4 bg-white text-nexus-navy px-12 py-5 rounded-2xl font-orbitron font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
                <Terminal className="w-5 h-5" /> INITIALIZE ANALYTICS GRID
            </Link>
        </div>
    );
};

export default SigmaLab;
