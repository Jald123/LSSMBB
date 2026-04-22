"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Target, Layers, Play } from 'lucide-react';

const DockingGame = () => {
    return (
        <div className="flex flex-col items-center justify-center p-20 text-center min-h-[60vh]">
            <motion.div
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 rounded-[2.5rem] bg-nexus-cyan/10 border border-nexus-cyan/30 flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(34,211,238,0.1)]"
            >
                <Cpu className="w-16 h-16 text-nexus-cyan" />
            </motion.div>

            <h2 className="text-4xl font-black font-orbitron text-white mb-4 uppercase tracking-tighter">Docking Sequence</h2>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed mb-12">
                A high-precision timing simulation. calibrate the system by docking the data modules
                within the target tolerance window. Perfect for training Lean flow synchronization.
            </p>

            <button className="group relative flex items-center gap-3 bg-white text-nexus-navy px-12 py-5 rounded-full font-orbitron font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <Play className="w-4 h-4 fill-nexus-navy" /> COMMENCE DOCKING
            </button>

            <div className="mt-16 flex gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-12 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-end pb-2">
                        <div className={`w-3 h-3 rounded-full ${i < 3 ? 'bg-nexus-cyan shadow-[0_0_10px_#22d3ee]' : 'bg-white/10'}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DockingGame;
