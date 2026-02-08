import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Rocket,
    FlaskConical,
    Trophy,
    Settings,
    ChevronLeft,
    ChevronRight,
    Monitor,
    Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexus } from '../context/NexusContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isCollapsed, setIsCollapsed, isOpen, setIsOpen }) => {
    const { industry, setIndustry, methodology, setMethodology } = useNexus();
    const navigate = useNavigate();
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Hangar' },
        { to: '/journey', icon: Rocket, label: 'Journey' },
        { to: '/armory', icon: FlaskConical, label: 'Armory' },
        { to: '/certification', icon: Trophy, label: 'Rewards' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    const sidebarVariants = {
        expanded: { width: '200px' },
        collapsed: { width: '80px' }
    };

    const NavItem = ({ item }) => (
        <NavLink
            to={item.to}
            className={({ isActive }) => `
        group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 mx-3
        ${isActive ? 'bg-nexus-cyan/10 text-nexus-cyan' : 'text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-text-primary/5'}
      `}
        >
            <div className="flex-shrink-0">
                <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`} />
            </div>

            {!isCollapsed && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-black font-orbitron tracking-widest whitespace-nowrap"
                >
                    {item.label.toUpperCase()}
                </motion.span>
            )}

            {/* Tooltip for collapsed mode */}
            {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-1 bg-nexus-surface border border-nexus-border rounded-md text-[10px] font-black font-orbitron text-nexus-text-primary opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl ring-1 ring-nexus-border">
                    {item.label.toUpperCase()}
                </div>
            )}

            {/* Active Indicator */}
            <NavLink to={item.to}>
                {({ isActive }) => isActive && (
                    <motion.div
                        layoutId="active-nav"
                        className="absolute left-0 w-1 h-6 bg-nexus-cyan rounded-full shadow-[0_0_10px_#22d3ee]"
                    />
                )}
            </NavLink>
        </NavLink>
    );

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                variants={sidebarVariants}
                animate={isCollapsed ? 'collapsed' : 'expanded'}
                className={`
          fixed top-16 left-0 h-[calc(100vh-64px)] glass-panel border-r border-nexus-border z-[1200]
          flex flex-col py-4 transition-all duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Navigation Items */}
                <div className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <NavItem key={item.to} item={item} />
                    ))}

                    {/* Context Selectors - Integrated into Sidebar */}
                    {!isCollapsed && (
                        <div className="mt-6 px-4 space-y-6">
                            {/* Industry Selector */}
                            <div className="space-y-2">
                                <h3 className="text-[9px] font-black text-nexus-text-secondary/40 uppercase tracking-widest pl-2">Sector</h3>
                                <div className="flex flex-col gap-1">
                                    {['healthcare', 'business', 'life'].map((ctx) => (
                                        <button
                                            key={ctx}
                                            onClick={() => setIndustry(ctx)}
                                            className={`text-[10px] font-bold font-orbitron text-left px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center justify-between group ${industry === ctx
                                                ? 'bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20'
                                                : 'text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-text-primary/5'
                                                }`}
                                        >
                                            {ctx.toUpperCase()}
                                            {industry === ctx && <div className="w-1.5 h-1.5 rounded-full bg-nexus-cyan shadow-[0_0_5px_#22d3ee]" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Methodology Selector */}
                            <div className="space-y-2">
                                <h3 className="text-[9px] font-black text-nexus-text-secondary/40 uppercase tracking-widest pl-2">Engine</h3>
                                <div className="flex flex-col gap-1">
                                    {['DMAIC', 'DMADV', 'KAIZEN', 'FOCUS'].map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => {
                                                setMethodology(m);
                                                const target = m === 'DMAIC' || m === 'DMADV' ? 'define'
                                                    : m === 'KAIZEN' ? 'kickoff'
                                                        : 'find';
                                                navigate(`/journey/${target}`);
                                            }}
                                            className={`text-[10px] font-bold font-orbitron text-left px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center justify-between group ${methodology === m
                                                ? 'bg-nexus-text-primary text-nexus-bg-deep shadow-md'
                                                : 'text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-text-primary/5'
                                                }`}
                                        >
                                            {m === 'FOCUS' ? 'FOCUS' : m}
                                            {methodology === m && <div className="w-1.5 h-1.5 rounded-full bg-nexus-navy" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Area - REDUCED HEIGHT & UPDATED CONTENT */}
                <div className="px-3 border-t border-nexus-border pt-4 pb-2 space-y-3">
                    {!isCollapsed ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between px-2 text-[9px] font-bold text-nexus-text-secondary font-orbitron tracking-widest">
                                <button className="hover:text-nexus-cyan transition-colors">HOME</button>
                                <button className="hover:text-nexus-cyan transition-colors">SUPPORT</button>
                                <button className="hover:text-nexus-cyan transition-colors text-nexus-cyan">AI SENSEI</button>
                            </div>
                            <div className="h-px bg-nexus-text-primary/10 w-full my-1" />
                            <div className="flex flex-col gap-1 px-2">
                                <span className="text-[8px] text-nexus-text-secondary font-black uppercase tracking-tighter">ENGINEERED BY <span className="text-nexus-gold">HOSSAM ALDHAHER</span></span>
                                <span className="text-[8px] text-nexus-cyan/70 font-black uppercase tracking-widest">HIGH QUALITY LEADERS SYSTEM</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <button className="w-8 h-8 rounded-lg bg-nexus-cyan/10 flex items-center justify-center text-nexus-cyan hover:bg-nexus-cyan hover:text-nexus-navy transition-colors">
                                <Monitor className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Collapser - Minimal */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full h-6 flex items-center justify-center text-nexus-text-secondary hover:text-nexus-text-primary transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
