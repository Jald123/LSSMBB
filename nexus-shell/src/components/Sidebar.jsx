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

const Sidebar = ({ isCollapsed, setIsCollapsed, isOpen, setIsOpen }) => {
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Hangar' },
        { to: '/journey', icon: Rocket, label: 'Journey' },
        { to: '/armory', icon: FlaskConical, label: 'Armory' },
        { to: '/certification', icon: Trophy, label: 'Rewards' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    const sidebarVariants = {
        expanded: { width: '240px' },
        collapsed: { width: '80px' }
    };

    const NavItem = ({ item }) => (
        <NavLink
            to={item.to}
            className={({ isActive }) => `
        group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 mx-3
        ${isActive ? 'bg-nexus-cyan/10 text-nexus-cyan' : 'text-slate-400 hover:text-white hover:bg-white/5'}
      `}
        >
            <div className="flex-shrink-0">
                <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`} />
            </div>

            {!isCollapsed && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs font-black font-orbitron tracking-widest whitespace-nowrap"
                >
                    {item.label.toUpperCase()}
                </motion.span>
            )}

            {/* Tooltip for collapsed mode */}
            {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-1 bg-black border border-nexus-border rounded-md text-[10px] font-black font-orbitron text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl ring-1 ring-white/5">
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
          flex flex-col py-6 transition-all duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Navigation Items */}
                <div className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <NavItem key={item.to} item={item} />
                    ))}
                </div>

                {/* Footer Area */}
                <div className="px-3 border-t border-nexus-border pt-6 pb-2 space-y-2">
                    <div className={`flex items-center gap-4 px-4 py-2 ${isCollapsed ? 'justify-center' : ''}`}>
                        <Monitor className="w-4 h-4 text-slate-500" />
                        {!isCollapsed && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">v1.6 Stable</span>}
                    </div>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`
              w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all
              ${isCollapsed ? 'justify-center' : ''}
            `}
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : (
                            <>
                                <ChevronLeft className="w-5 h-5" />
                                <span className="text-[10px] font-black font-orbitron tracking-widest uppercase">Collapse</span>
                            </>
                        )}
                    </button>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
