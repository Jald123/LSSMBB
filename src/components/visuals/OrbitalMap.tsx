"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Target, Shield, Trophy, Activity, Binary } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    size: number;
    color: string;
    icon: any;
    status: 'locked' | 'active' | 'completed';
}

export const OrbitalMap: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<Node[]>([
        { id: '1', label: 'Define', x: 50, y: 15, size: 80, color: 'primary', icon: Target, status: 'completed' },
        { id: '2', label: 'Measure', x: 80, y: 35, size: 80, color: 'primary', icon: Activity, status: 'active' },
        { id: '3', label: 'Analyze', x: 70, y: 75, size: 70, color: 'slate-700', icon: Binary, status: 'locked' },
        { id: '4', label: 'Improve', x: 30, y: 75, size: 70, color: 'slate-700', icon: Zap, status: 'locked' },
        { id: '5', label: 'Control', x: 20, y: 35, size: 80, color: 'slate-700', icon: Shield, status: 'locked' },
        { id: '6', label: 'Zenith', x: 50, y: 50, size: 120, color: 'nexus-gold', icon: Trophy, status: 'locked' },
    ]);

    return (
        <div 
            ref={containerRef}
            className="w-full aspect-square md:aspect-video lg:aspect-[21/9] bg-[#020617] rounded-[3rem] border border-white/5 relative overflow-hidden group shadow-2xl"
        >
            {/* Grid Visualization */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Neural Connections (SVG Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                        <stop offset="50%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Connection paths between nodes based on coordinates */}
                <line x1="50%" y1="15%" x2="80%" y2="35%" stroke="url(#lineGrad)" strokeWidth="1" />
                <line x1="80%" y1="35%" x2="70%" y2="75%" stroke="#1e293b" strokeWidth="1" />
                <line x1="70%" y1="75%" x2="30%" y2="75%" stroke="#1e293b" strokeWidth="1" />
                <line x1="30%" y1="75%" x2="20%" y2="35%" stroke="#1e293b" strokeWidth="1" />
                <line x1="20%" y1="35%" x2="50%" y2="15%" stroke="#1e293b" strokeWidth="1" />
            </svg>

            {/* Interactive Nodes */}
            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute cursor-pointer flex flex-col items-center gap-3 transition-all active:scale-95"
                    style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                    <div className={cn(
                        "rounded-[2rem] border-2 transition-all duration-500 shadow-2xl flex items-center justify-center relative",
                        node.status === 'completed' ? "bg-primary border-primary/20 text-black shadow-primary/20" :
                        node.status === 'active' ? "bg-surface border-primary/50 text-primary animate-pulse shadow-primary/10" :
                        "bg-card border-white/5 text-slate-700"
                    )}
                    style={{ width: node.size, height: node.size }}
                    >
                        {node.status === 'active' && (
                            <div className="absolute -inset-2 border border-primary/20 rounded-full animate-ping" />
                        )}
                        <node.icon className={cn(node.size > 100 ? "w-12 h-12" : "w-8 h-8")} />
                    </div>
                    <div className="text-center">
                        <p className={cn(
                            "text-[10px] font-black uppercase tracking-[0.2em]",
                            node.status === 'completed' ? "text-emerald-500" :
                            node.status === 'active' ? "text-primary" : "text-slate-600"
                        )}>{node.label}</p>
                    </div>
                </motion.div>
            ))}

            {/* Tactical Legend */}
            <div className="absolute bottom-6 left-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Current Phase</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Verified Sector</span>
                </div>
            </div>

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-6 right-6 flex gap-2">
                <div className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-primary">
                    Protocol Map v4.2
                </div>
            </div>
        </div>
    );
};
