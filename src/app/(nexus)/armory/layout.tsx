'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FlaskConical, Cpu, Activity, Terminal, Shield } from 'lucide-react';

const AnalystArmoryLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const stations = [
        { to: '/armory/mission/charter', icon: Terminal, label: 'The Contract', color: 'text-nexus-gold', status: 'Active' },
        { to: '/armory/mission/sipoc', icon: Cpu, label: 'The Map', color: 'text-nexus-cyan', status: 'Online' },
        { to: '/armory/mission/msa', icon: FlaskConical, label: 'The Trust', color: 'text-nexus-purple', status: 'Online' },
        { to: '/armory/mission/stats', icon: Activity, label: 'Docking Seq', color: 'text-nexus-success', status: 'Active' },
        { to: '/armory/mission/pareto', icon: Terminal, label: 'Pareto Hub', color: 'text-slate-500', status: 'Online' },
        { to: '/armory/mission/fishbone', icon: FlaskConical, label: 'Anatomy Lab', color: 'text-nexus-gold', status: 'Online' },
    ];

    const isHub = pathname === '/armory' || pathname === '/armory/';

    return (
        <div className="min-h-screen pt-16 flex flex-col">
            {/* 🛠️ ARMORY SUB-HEADER */}
            {!isHub && (
                <nav className="fixed top-16 left-0 right-0 h-20 glass-panel bg-black/60 border-b border-nexus-border z-[800] px-10 flex items-center justify-center transition-all duration-300 lg:pl-[240px] group-has-[[data-collapsed=true]]:lg:pl-[80px]">
                    <div className="flex items-center gap-6 max-w-6xl w-full overflow-x-auto no-scrollbar py-4">
                        <div className="flex items-center gap-2 mr-6 border-r border-nexus-border pr-8 flex-shrink-0">
                            <Activity className="w-5 h-5 text-primary" />
                            <span className="text-[10px] font-black font-orbitron text-foreground tracking-widest uppercase">Armory Stations</span>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            {stations.map((station) => {
                                const isActive = pathname === station.to;
                                return (
                                    <Link
                                        key={station.to}
                                        href={station.to}
                                        className={`
                                            group relative flex items-center gap-3 px-6 py-2.5 rounded-2xl transition-all duration-500 border border-transparent flex-shrink-0
                                            ${isActive
                                                ? 'bg-primary/10 text-foreground border-primary/20 shadow-[0_0_20px_rgba(34,211,238,0.05)]'
                                                : 'text-slate-500 hover:text-foreground hover:bg-white/5'}
                                        `}
                                    >
                                        <station.icon className={`w-4 h-4 ${station.color}`} />
                                        <span className="text-[11px] font-black font-orbitron tracking-widest uppercase">{station.label}</span>

                                        {isActive && (
                                            <motion.div
                                                layoutId="armory-indicator"
                                                className="absolute -bottom-1 left-4 right-4 h-1 bg-nexus-gold rounded-full shadow-[0_0_10px_#f59e0b]"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            )}

            {/* 🌌 STATION CANVAS */}
            <div className={`flex-1 ${!isHub ? 'mt-20' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default AnalystArmoryLayout;
