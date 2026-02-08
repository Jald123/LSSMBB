import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Rocket,
    Target,
    BarChart3,
    Zap,
    Settings2,
    ShieldCheck,
    ChevronRight,
    Map,
    Users,
    Eye,
    Hammer,
    Play,
    CheckSquare,
    ClipboardCheck,
    Flame,
    Activity,
    Search,
    BookOpen
} from 'lucide-react';
import { methodologyData } from '../data/journeyData';
import { useNexus } from '../context/NexusContext';

const ICON_MAP = {
    // DMAIC/DFSS
    'define': Target,
    'measure': BarChart3,
    'analyze': Zap,
    'improve': Settings2,
    'control': ShieldCheck,
    'design': Hammer,
    'verify': ClipboardCheck,
    // Kaizen
    'kickoff': Flame,
    'implement': Play,
    // FOCUS
    'find': Search,
    'organize': Users,
    'clarify': Map,
    'understand': Eye,
    'select': Rocket,
    'plan': BookOpen,
    'do': Play,
    'check': CheckSquare,
    'act': Activity
};

const COLOR_MAP = {
    'define': 'text-nexus-cyan',
    'measure': 'text-nexus-gold',
    'analyze': 'text-nexus-purple',
    'improve': 'text-green-400',
    'control': 'text-blue-500',
    'design': 'text-nexus-gold',
    'verify': 'text-nexus-cyan',
    'kickoff': 'text-nexus-error',
    'implement': 'text-nexus-gold',
    'find': 'text-nexus-cyan',
    'organize': 'text-nexus-purple',
    'clarify': 'text-nexus-gold',
    'understand': 'text-green-400',
    'select': 'text-nexus-error',
    'plan': 'text-blue-400',
    'do': 'text-nexus-gold',
    'check': 'text-green-500',
    'act': 'text-nexus-cyan'
};

const JourneyEngine = () => {
    const location = useLocation();
    const { methodology } = useNexus();

    const activeMethodology = methodology.split(' ')[0].toUpperCase();
    const activeSet = methodologyData[activeMethodology] || methodologyData['DMAIC'];

    // Get the first phase key of the current methodology
    const firstPhaseKey = Object.keys(activeSet)[0];

    // If at /journey exactly, redirect to the first phase of current methodology
    if (location.pathname === '/journey' || location.pathname === '/journey/') {
        return <Navigate to={`/journey/${firstPhaseKey}`} replace />;
    }

    const phaseNav = Object.entries(activeSet).map(([id, data]) => ({
        id,
        label: data.title.charAt(0).toUpperCase(),
        full: data.title,
        icon: ICON_MAP[id] || Rocket,
        color: COLOR_MAP[id] || 'text-slate-400'
    }));

    return (
        <div className="min-h-screen pt-16 flex flex-col">
            {/* 🚀 JOURNEY NAVIGATION BAR */}
            <nav className="fixed top-16 left-0 right-0 h-20 glass-panel bg-black/60 border-b border-nexus-border z-[800] px-10 flex items-center justify-center transition-all duration-300 lg:pl-[240px] group-has-[[data-collapsed=true]]:lg:pl-[80px]">
                <div className="flex items-center gap-2 max-w-6xl w-full overflow-x-auto no-scrollbar scroll-smooth">
                    {phaseNav.map((phase, idx) => (
                        <React.Fragment key={phase.id}>
                            <NavLink
                                to={`/journey/${phase.id}`}
                                className={({ isActive }) => `
                                  group relative flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all duration-500 border border-transparent whitespace-nowrap
                                  ${isActive
                                        ? 'bg-white/10 text-white border-white/10 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}
                                `}
                            >
                                <div className={`p-1.5 rounded-lg bg-black/40 border border-white/5 ${phase.color}`}>
                                    <phase.icon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[9px] font-black font-orbitron tracking-tight text-slate-500">{phase.label}</span>
                                    <span className="text-[11px] font-black font-orbitron tracking-widest">{phase.full.toUpperCase()}</span>
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
                                <ChevronRight className="w-4 h-4 text-slate-700 opacity-50 flex-shrink-0" />
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
