import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, ShieldAlert, Lock, Zap } from 'lucide-react';

const ScopeSniper = () => {
    return (
        <div className="flex flex-col items-center justify-center p-20 text-center min-h-[60vh] relative">
            {/* Locked Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-nexus-error/10 border border-nexus-error/30 flex items-center justify-center mb-6 text-nexus-error">
                    <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black font-orbitron text-white mb-2 uppercase tracking-widest">ACCESS RESTRICTED</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Requires Green Belt Certification</p>
            </div>

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-48 h-48 rounded-full border-2 border-dashed border-red-500/20 flex items-center justify-center mb-10"
            >
                <Crosshair className="w-24 h-24 text-red-500/20" />
            </motion.div>

            <h2 className="text-4xl font-black font-orbitron text-white/20 mb-4 uppercase tracking-tighter">Scope Sniper</h2>
            <p className="text-slate-700 max-w-xl mx-auto leading-relaxed mb-12">
                Target and isolate project scope creep with extreme prejudice.
                Identify non-value-added activities and eliminate waste from the value stream.
            </p>
        </div>
    );
};

export default ScopeSniper;
