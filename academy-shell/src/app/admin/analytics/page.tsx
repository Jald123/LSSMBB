"use client";

import React, { useState } from "react";
import { 
    BarChart3, 
    TrendingUp, 
    Users, 
    Zap, 
    ChevronRight, 
    Target, 
    ShieldCheck, 
    Cpu,
    ArrowUpRight,
    Search,
    Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/primitives/Button";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function MasteryAnalyticsPanel() {
    const [timeframe, setTimeframe] = useState('Quarterly');

    const METRICS = [
        { label: 'Fleet Velocity', value: '4.8x', trend: '+12%', icon: Zap, color: 'text-primary' },
        { label: 'Mastery Yield', value: '94.2%', trend: '+3.1%', icon: ShieldCheck, color: 'text-emerald-500' },
        { label: 'DMAIC Efficiency', value: '89.0', trend: '-2.4%', icon: Target, color: 'text-nexus-gold' },
        { label: 'Active Operators', value: '1,280', trend: '+45', icon: Users, color: 'text-blue-500' },
    ];

    return (
        <div className="min-h-screen bg-background p-8 lg:p-12 space-y-12 selection:bg-primary/30 font-sans">
            {/* Tactical Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                        <Cpu className="w-4 h-4" />
                        Aries Fleet Intelligence
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter italic">
                        Mastery <span className="text-slate-500">Analytics</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
                        Deep-space telemetry of organizational capability. Real-time performance auditing across the DMAIC spectrum.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-surface/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
                    {['Daily', 'Monthly', 'Quarterly', 'Total'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                timeframe === t ? "bg-primary text-black shadow-lg shadow-primary/20" : "text-slate-500 hover:text-white"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {METRICS.map((m, i) => (
                    <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group p-8 bg-card border border-border rounded-[2rem] relative overflow-hidden hover:border-primary/50 transition-all duration-500"
                    >
                        <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                            <div className="flex items-center justify-between">
                                <div className={cn("p-3 rounded-2xl bg-white/[0.03]", m.color)}>
                                    <m.icon className="w-6 h-6" />
                                </div>
                                <span className={cn(
                                    "text-[10px] font-black px-2 py-1 rounded-lg border",
                                    m.trend.startsWith('+') ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" : "border-rose-500/20 text-rose-500 bg-rose-500/5"
                                )}>
                                    {m.trend}
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{m.label}</p>
                                <h3 className="text-4xl font-bold text-white tracking-tight">{m.value}</h3>
                            </div>
                        </div>
                        {/* Interactive Sparkline Mockup */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10 group-hover:opacity-30 transition-opacity">
                            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                                <path 
                                    d="M0,80 Q50,40 100,70 T200,30 T300,60 T400,20 V100 H0 Z" 
                                    className="fill-primary"
                                />
                            </svg>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Performance Correlation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Distribution Chart */}
                <div className="lg:col-span-2 bg-card border border-border rounded-[2.5rem] p-10 space-y-8 relative overflow-hidden outline outline-1 outline-white/5">
                    <div className="flex items-center justify-between relative z-10">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white italic tracking-tight">Certification Distribution</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Belt Population</p>
                        </div>
                        <BarChart3 className="w-6 h-6 text-slate-700" />
                    </div>

                    <div className="h-80 flex items-end justify-between gap-4 pt-4 relative z-10">
                        {[
                            { belt: 'White', val: 40, color: 'bg-slate-200' },
                            { belt: 'Yellow', val: 75, color: 'bg-yellow-400' },
                            { belt: 'Green', val: 60, color: 'bg-emerald-500' },
                            { belt: 'Black', val: 35, color: 'bg-slate-800 border border-white/20' },
                            { belt: 'Master', val: 15, color: 'bg-nexus-gold' },
                        ].map((b, i) => (
                            <div key={b.belt} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className="w-full relative flex flex-col justify-end h-full">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${b.val}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        className={cn("w-full rounded-t-2xl relative transition-all duration-300 group-hover:brightness-125", b.color)}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border border-white/10 rounded-lg px-2 py-1 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            {b.val}%
                                        </div>
                                    </motion.div>
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{b.belt}</span>
                            </div>
                        ))}
                    </div>

                    {/* Cybernetic Grid Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                </div>

                {/* Efficiency Index */}
                <div className="bg-card border border-border rounded-[2.5rem] p-10 space-y-8 relative overflow-hidden flex flex-col">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white italic tracking-tight">Phase Latency</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Time-to-Verification</p>
                    </div>

                    <div className="flex-1 space-y-6">
                        {['Define', 'Measure', 'Analyze', 'Improve', 'Control'].map((phase, i) => (
                            <div key={phase} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">{phase}</span>
                                    <span className="text-white">{(12 - i * 1.5).toFixed(1)} Days</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${85 - (i * 10)}%` }}
                                        transition={{ duration: 1.5, delay: 1 + (i * 0.1) }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="w-full rounded-2xl border-white/5 py-6">
                        Audit Critical Path
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>

            {/* Tactical Feed */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <TrendingUp className="w-4 h-4" />
                        Live Verification Stream
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { op: 'ALPHA-7', belt: 'Black', status: 'Verified', tool: 'ANOVA Matrix', time: '2m ago' },
                        { op: 'NERO-4', belt: 'Green', status: 'In Review', tool: 'FMEA Audit', time: '14m ago' },
                        { op: 'SARK-1', belt: 'Yellow', status: 'Verified', tool: 'Pareto Map', time: '28m ago' },
                    ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-surface/30 border border-white/5 rounded-2xl hover:bg-surface/50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                                    <Users className="w-4 h-4 text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white uppercase">{row.op}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{row.tool}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn(
                                    "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border mb-1",
                                    row.status === 'Verified' ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" : "border-nexus-gold/20 text-nexus-gold bg-nexus-gold/5"
                                )}>
                                    {row.status}
                                </p>
                                <p className="text-[9px] text-slate-600 font-bold">{row.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
