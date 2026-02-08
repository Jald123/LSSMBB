import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Target, BarChart3, Zap, Settings2, ShieldCheck, ChevronRight } from 'lucide-react';

const JourneyEngine = () => {
    const location = useLocation();

    // If at /journey exactly, redirect to /journey/define
    if (location.pathname === '/journey' || location.pathname === '/journey/') {
        return <Navigate to="/journey/define" replace />;
    }

    const phaseNav = [
        { id: 'define', label: 'D', full: 'Define', icon: Target, color: 'text-nexus-cyan' },
        { id: 'measure', label: 'M', full: 'Measure', icon: BarChart3, color: 'text-nexus-gold' },
        { id: 'analyze', label: 'A', full: 'Analyze', icon: Zap, color: 'text-nexus-purple' },
        { id: 'improve', label: 'I', full: 'Improve', icon: Settings2, color: 'text-green-400' },
        { id: 'control', label: 'C', full: 'Control', icon: ShieldCheck, color: 'text-blue-500' },
    ];

    return (
        <div className="min-h-screen pt-16 flex flex-col">
            {/* 🚀 JOURNEY NAVIGATION BAR */}
            <nav className="fixed top-16 left-0 right-0 h-20 glass-panel bg-black/60 border-b border-nexus-border z-[800] px-10 flex items-center justify-center transition-all duration-300 lg:pl-[240px] group-has-[[data-collapsed=true]]:lg:pl-[80px]">
                <div className="flex items-center gap-2 max-w-4xl w-full">
                    {phaseNav.map((phase, idx) => (
                        <React.Fragment key={phase.id}>
                            <NavLink
                                to={`/journey/${phase.id}`}
                                className={({ isActive }) => `
                  group relative flex items-center gap-3 px-6 py-2.5 rounded-2xl transition-all duration-500 border border-transparent
                  ${isActive
                                        ? 'bg-white/10 text-white border-white/10 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}
                `}
                            >
                                <div className={`p-1.5 rounded-lg bg-black/40 border border-white/5 ${phase.color}`}>
                                    <phase.icon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[10px] font-black font-orbitron tracking-tight text-slate-500">{phase.label}</span>
                                    <span className="text-xs font-black font-orbitron tracking-widest">{phase.full.toUpperCase()}</span>
                                </div>

                                {/* Active Indicator Underline */}
                                <NavLink to={`/journey/${phase.id}`}>
                                    {({ isActive }) => isActive && (
                                        <motion.div
                                            layoutId="journey-indicator"
                                            className="absolute -bottom-1 left-4 right-4 h-1 bg-nexus-cyan rounded-full shadow-[0_0_10px_#22d3ee]"
                                        />
                                    )}
                                </NavLink>
                            </NavLink>

                            {idx < phaseNav.length - 1 && (
                                <ChevronRight className="w-4 h-4 text-slate-700 opacity-50" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </nav>

            {/* 🌌 CONTENT AREA */}
            <div className="flex-1 mt-20 p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default JourneyEngine;
