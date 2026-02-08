import React from 'react';
import { motion } from 'framer-motion';
import { useNexus } from '../context/NexusContext';
import {
    Moon,
    Sun,
    Monitor,
    Shield,
    Smartphone,
    Bell,
    Globe,
    Lock
} from 'lucide-react';

const Settings = () => {
    const { theme, toggleTheme } = useNexus();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pt-24 px-10 max-w-4xl mx-auto h-full overflow-y-auto pb-20 scrollbar-hide"
        >
            <div className="mb-8">
                <h1 className="text-4xl font-black font-orbitron text-white mb-2">SYSTEM SETTINGS</h1>
                <p className="text-slate-400">Configure your Nexus OS environment.</p>
            </div>

            {/* 🎨 APPEARANCE */}
            <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-sm font-bold text-nexus-cyan mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Monitor className="w-4 h-4" /> Appearance
                </h2>
                <div className="bg-nexus-surface/40 border border-nexus-border rounded-2xl overflow-hidden backdrop-blur-md">
                    <div className="p-6 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-500'}`}>
                                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Interface Theme</h3>
                                <p className="text-xs text-slate-500">Toggle between dark command mode and light day mode.</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`
                                relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none
                                ${theme === 'dark' ? 'bg-slate-700' : 'bg-nexus-cyan'}
                            `}
                        >
                            <motion.div
                                layout
                                className={`
                                    absolute top-1 w-5 h-5 rounded-full bg-white shadow-md
                                    ${theme === 'dark' ? 'left-1' : 'right-1'}
                                `}
                            />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* 🔔 NOTIFICATIONS (Stub) */}
            <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Bell className="w-4 h-4" /> System Alerts
                </h2>
                <div className="bg-nexus-surface/20 border border-nexus-border/50 rounded-2xl p-6 flex flex-col gap-4 opacity-75">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm font-medium">Mission Critical Alerts</span>
                        <div className="w-10 h-5 bg-nexus-success/20 rounded-full relative cursor-not-allowed">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-nexus-success rounded-full" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm font-medium">XP Gains & Achievements</span>
                        <div className="w-10 h-5 bg-nexus-success/20 rounded-full relative cursor-not-allowed">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-nexus-success rounded-full" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 🛡️ ACCOUNT (Stub) */}
            <motion.div variants={itemVariants}>
                <h2 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Security Level
                </h2>
                <div className="bg-nexus-surface/20 border border-nexus-border/50 rounded-2xl p-6 flex items-center gap-4">
                    <Lock className="w-8 h-8 text-slate-600" />
                    <div>
                        <h3 className="text-slate-300 font-bold">Clearance Level: UNCLASSIFIED</h3>
                        <p className="text-xs text-slate-500">Local storage persistence only. No cloud sync active.</p>
                    </div>
                </div>
            </motion.div>

        </motion.div>
    );
};

export default Settings;
