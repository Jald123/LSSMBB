'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
import { methodologyData } from '@/data/journeyData';
import { useNexus } from '@/context/NexusContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, React.ElementType> = {
    'define': Target,
    'measure': BarChart2,
    'analyze': Zap,
    'improve': Settings2,
    'control': ShieldCheck,
    'design': Hammer,
    'verify': ClipboardCheck,
    'kickoff': Flame,
    'implement': Play,
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

const COLOR_MAP: Record<string, string> = {
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

const JourneyLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { methodology } = useNexus();

    const activeMethodology = methodology?.split(' ')[0].toUpperCase() || 'DMAIC';
    const activeSet = methodologyData[activeMethodology] || methodologyData['DMAIC'];

    const firstPhaseKey = Object.keys(activeSet)[0];

    // Redirect if at root /journey
    React.useEffect(() => {
        if (pathname === '/journey' || pathname === '/journey/') {
            router.replace(`/journey/${firstPhaseKey}`);
        }
    }, [pathname, firstPhaseKey, router]);

    const phaseNav = Object.entries(activeSet).map(([id, data]) => {
        const phaseData = data as { title: string };
        return {
            id,
            label: phaseData.title.charAt(0).toUpperCase(),
            full: phaseData.title,
            icon: ICON_MAP[id] || Rocket,
            color: COLOR_MAP[id] || 'text-slate-400'
        };
    });

    return (
        <div className="flex-1 flex flex-col h-full relative">
            <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default JourneyLayout;
