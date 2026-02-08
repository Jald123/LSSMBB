import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Rocket,
    Target,
    BarChart2,
    Zap,
    Settings2,
    ShieldCheck,
    Hammer,
    ClipboardCheck,
    Flame,
    Play,
    Search,
    Users,
    Map,
    Eye,
    BookOpen,
    CheckSquare,
    Activity
} from 'lucide-react';
import { methodologyData } from '../data/journeyData';
import { useNexus } from '../context/NexusContext';

const ICON_MAP = {
    // DMAIC/DFSS
    'define': Target,
    'measure': BarChart2,
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
        <div className="flex-1 flex flex-col h-full relative">
            {/* 🌌 CONTENT AREA */}
            <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default JourneyEngine;
