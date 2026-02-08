import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    ClipboardCheck,
    Link2,
    ChevronRight,
    ChevronLeft,
    MessageSquare,
    Sparkles,
    ExternalLink,
    History
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useNexus } from '../context/NexusContext';
import { methodologyData } from '../data/journeyData';

const RightPanel = () => {
    const [isVisible, setIsVisible] = useState(false); // Default hidden to save space
    const [activeTab, setActiveTab] = useState('assistant');

    const location = useLocation();
    const { methodology } = useNexus();

    // 🧠 Context Intelligence Logic
    const isJourney = location.pathname.includes('/journey/');
    const currentPhaseId = isJourney ? location.pathname.split('/').pop() : null;
    const activeMethodologyKey = methodology?.split(' ')[0].toUpperCase() || 'DMAIC';
    const activeSet = methodologyData[activeMethodologyKey] || methodologyData['DMAIC'];
    const phaseData = currentPhaseId ? activeSet[currentPhaseId] : null;

    const sections = [
        { id: 'assistant', icon: Bot, label: 'Assistant', color: 'text-nexus-cyan' },
        { id: 'checklist', icon: ClipboardCheck, label: 'Checklist', color: 'text-nexus-gold' },
        { id: 'artifacts', icon: Link2, label: 'Artifacts', color: 'text-nexus-purple' },
    ];

    return (
        <>
            {/* 🔮 AI SENSEI ORB (Floating Trigger) */}
            <AnimatePresence>
                {!isVisible && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsVisible(true)}
                        className="fixed bottom-32 right-8 w-14 h-14 rounded-full bg-black/80 backdrop-blur-xl border border-nexus-cyan/50 shadow-[0_0_30px_rgba(34,211,238,0.3)] z-[2000] flex items-center justify-center group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-nexus-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Bot className="w-6 h-6 text-nexus-cyan relative z-10" />
                        <div className="absolute -bottom-1 w-full text-[8px] font-black font-orbitron text-center text-nexus-cyan/80 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pb-2">AI</div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* 🎛️ SLIDE-OUT PANEL */}
            <AnimatePresence>
                {isVisible && (
                    <motion.aside
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-20 right-4 bottom-24 w-80 glass-panel border border-nexus-border z-[1900] flex flex-col rounded-3xl shadow-2xl overflow-hidden bg-black/90 backdrop-blur-2xl"
                    >
                        {/* Header & Close */}
                        <div className="p-4 border-b border-nexus-border flex items-center justify-between bg-black/40">
                            <div className="flex items-center gap-2">
                                <Bot className="w-4 h-4 text-nexus-cyan" />
                                <span className="text-[10px] font-black font-orbitron text-white tracking-widest">NEXUS INTELLIGENCE</span>
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center p-2 gap-1 border-b border-nexus-border/50 bg-white/5">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveTab(section.id)}
                                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === section.id ? 'bg-black/60 shadow-inner' : 'hover:bg-white/5'}`}
                                >
                                    <section.icon className={`w-4 h-4 ${activeTab === section.id ? section.color : 'text-slate-500'}`} />
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-1 flex flex-col overflow-hidden"
                        >
                            <div className="flex-1 overflow-y-auto p-5 space-y-5">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'assistant' && (
                                        <motion.div
                                            key="assistant"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-6"
                                        >
                                            {/* 🛰️ DYNAMIC PHASE INTEL */}
                                            {phaseData ? (
                                                <div className="bg-nexus-card/50 border border-nexus-cyan/20 p-5 rounded-2xl relative overflow-hidden group">
                                                    {/* Header */}
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-nexus-cyan animate-pulse" />
                                                        <span className="text-[10px] font-black font-orbitron text-nexus-cyan tracking-widest uppercase">
                                                            PHASE: {phaseData.title}
                                                        </span>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-xs text-nexus-text-secondary leading-relaxed font-medium mb-4 border-l-2 border-nexus-border pl-3">
                                                        {phaseData.description}
                                                    </p>

                                                    {/* Progress Mini-Bar */}
                                                    <div className="space-y-1.5">
                                                        <div className="flex justify-between text-[9px] font-black font-orbitron text-slate-500 uppercase">
                                                            <span>Completeness</span>
                                                            <span className="text-nexus-cyan">45%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                                            <div className="h-full w-[45%] bg-nexus-cyan rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-nexus-cyan/5 border border-nexus-cyan/20 p-4 rounded-2xl relative overflow-hidden group">
                                                    <div className="flex items-center gap-2 text-nexus-cyan mb-2">
                                                        <Sparkles className="w-4 h-4" />
                                                        <span className="text-[10px] font-black font-orbitron uppercase tracking-widest">System Idle</span>
                                                    </div>
                                                    <p className="text-xs text-nexus-text-secondary leading-relaxed font-medium">
                                                        Select a phase to activate intelligence.
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-2">
                                                <button className="flex items-center gap-3 w-full bg-nexus-text-primary/5 hover:bg-nexus-text-primary/10 p-3 rounded-xl border border-nexus-text-primary/5 text-[10px] font-bold text-nexus-text-secondary transition-all group">
                                                    <MessageSquare className="w-4 h-4 group-hover:text-nexus-cyan transition-colors" />
                                                    <span>Ask AI Sensei</span>
                                                </button>
                                                <button className="flex items-center gap-3 w-full bg-nexus-text-primary/5 hover:bg-nexus-text-primary/10 p-3 rounded-xl border border-nexus-text-primary/5 text-[10px] font-bold text-nexus-text-secondary transition-all group">
                                                    <History className="w-4 h-4 group-hover:text-nexus-gold transition-colors" />
                                                    <span>Mission Log</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'checklist' && (
                                        <motion.div key="checklist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                            {[
                                                { label: 'Define Business Case', checked: true },
                                                { label: 'Identify Stakeholders', checked: true },
                                                { label: 'Draft SIPOC Map', checked: false },
                                                { label: 'Obtain VOC Data', checked: false },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 bg-nexus-card p-4 rounded-xl border border-nexus-border hover:border-nexus-gold/30 transition-all cursor-pointer">
                                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${item.checked ? 'bg-nexus-gold border-nexus-gold text-nexus-navy' : 'border-slate-700'}`}>
                                                        {item.checked && <ClipboardCheck className="w-3.5 h-3.5 font-bold" />}
                                                    </div>
                                                    <span className={`text-[11px] font-bold ${item.checked ? 'text-nexus-text-primary' : 'text-nexus-text-secondary'}`}>{item.label}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}

                                    {activeTab === 'artifacts' && (
                                        <motion.div key="artifacts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                            {[
                                                'Project_Charter_v1.pdf',
                                                'Observation_Log_02.csv',
                                                'Stakeholder_Matrix.xlsx',
                                            ].map((file, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-nexus-card rounded-xl border border-nexus-border hover:bg-nexus-text-primary/5 transition-all cursor-pointer">
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <Link2 className="w-4 h-4 text-nexus-purple flex-shrink-0" />
                                                        <span className="text-[11px] font-bold text-nexus-text-primary truncate">{file}</span>
                                                    </div>
                                                    <ExternalLink className="w-3 h-3 text-nexus-text-secondary" />
                                                </div>
                                            ))}
                                            <button className="w-full border border-nexus-purple/30 text-nexus-purple text-[10px] font-black font-orbitron py-3 rounded-xl bg-nexus-purple/5 hover:bg-nexus-purple/10 transition-all mt-4">
                                                BROWSE REPOSITORY
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default RightPanel;
