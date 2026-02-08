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
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useNexus } from '../context/NexusContext';
import { methodologyData } from '../data/journeyData';

const RightPanel = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('assistant');

    const panelVariants = {
        expanded: { width: '320px' },
        collapsed: { width: '64px' }
    };

    const sections = [
        { id: 'assistant', icon: Bot, label: 'Assistant', color: 'text-nexus-cyan' },
        { id: 'checklist', icon: ClipboardCheck, label: 'Checklist', color: 'text-nexus-gold' },
        { id: 'artifacts', icon: Link2, label: 'Artifacts', color: 'text-nexus-purple' },
    ];

    const location = useLocation();
    const { methodology } = useNexus();

    // 🧠 Context Intelligence Logic
    const isJourney = location.pathname.includes('/journey/');
    const currentPhaseId = isJourney ? location.pathname.split('/').pop() : null;
    const activeMethodologyKey = methodology?.split(' ')[0].toUpperCase() || 'DMAIC';
    const activeSet = methodologyData[activeMethodologyKey] || methodologyData['DMAIC'];
    const phaseData = currentPhaseId ? activeSet[currentPhaseId] : null;

    return (
        <motion.aside
            variants={panelVariants}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            className="fixed top-16 right-0 h-[calc(100vh-64px)] glass-panel border-l border-nexus-border z-[900] flex transition-all duration-300 hidden xl:flex"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-nexus-surface border border-nexus-border flex items-center justify-center text-nexus-text-secondary hover:text-nexus-text-primary transition-all shadow-xl z-10"
            >
                {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {/* Sidebar Tabs */}
            <div className="w-16 flex flex-col items-center py-6 border-r border-nexus-border gap-6">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => {
                            setActiveTab(section.id);
                            if (isCollapsed) setIsCollapsed(false);
                        }}
                        className={`
              relative p-3 rounded-xl transition-all duration-300 group
              ${activeTab === section.id && !isCollapsed ? section.color + ' bg-nexus-text-primary/5' : 'text-nexus-text-secondary hover:text-nexus-text-primary'}
            `}
                    >
                        <section.icon className="w-5 h-5" />
                        {activeTab === section.id && !isCollapsed && (
                            <motion.div layoutId="active-tab" className={`absolute -left-[1px] top-1/2 -translate-y-1/2 w-[2px] h-6 ${section.color.replace('text-', 'bg-')}`} />
                        )}

                        {/* Tooltip */}
                        <div className="absolute right-full mr-4 px-3 py-1 bg-nexus-surface border border-nexus-border rounded-md text-[10px] font-black font-orbitron text-nexus-text-primary opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            {section.label.toUpperCase()}
                        </div>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            {!isCollapsed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col overflow-hidden"
                >
                    <div className="p-6 border-b border-nexus-border flex justify-between items-center">
                        <h3 className="text-xs font-black font-orbitron tracking-widest text-nexus-text-primary uppercase">
                            {sections.find(s => s.id === activeTab).label}
                        </h3>
                        {phaseData && <span className="text-[9px] font-black text-nexus-cyan bg-nexus-cyan/10 px-2 py-0.5 rounded border border-nexus-cyan/20">ACTIVE</span>}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
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

                                            {/* Deco Icon */}
                                            <div className="absolute -bottom-3 -right-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Bot className="w-24 h-24 rotate-12" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-nexus-cyan/5 border border-nexus-cyan/20 p-4 rounded-2xl relative overflow-hidden group">
                                            <div className="flex items-center gap-2 text-nexus-cyan mb-2">
                                                <Sparkles className="w-4 h-4" />
                                                <span className="text-[10px] font-black font-orbitron uppercase tracking-widest">System Idle</span>
                                            </div>
                                            <p className="text-xs text-nexus-text-secondary leading-relaxed font-medium">
                                                Select a phase from the Journey Engine to initiate mission analysis protocols.
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
                                <motion.div
                                    key="checklist"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
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
                                <motion.div
                                    key="artifacts"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
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

                    <div className="p-6 bg-nexus-card border-t border-nexus-border">
                        <div className="text-[9px] font-black font-orbitron text-nexus-text-secondary uppercase tracking-tighter mb-1">Station ID</div>
                        <div className="text-[10px] text-nexus-cyan font-bold tracking-widest uppercase">NEXUS-A-774</div>
                    </div>
                </motion.div>
            )}
        </motion.aside>
    );
};

export default RightPanel;
