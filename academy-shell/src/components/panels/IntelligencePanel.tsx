"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Cpu, 
    X, 
    Lightbulb, 
    ChevronLeft, 
    Terminal, 
    BookOpen,
    Binary,
    Zap,
    ChevronRight,
    Search,
    Info,
    ArrowLeft
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ENCYCLOPEDIA, EncyclopediaEntry } from "@/config/encyclopedia";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface IntelligencePanelProps {
    isOpen: boolean;
    onClose: () => void;
    toolName: string;
    phase: string;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
    isOpen,
    onClose,
    toolName,
    phase
}) => {
    const [activeTab, setActiveTab] = useState<'GUIDANCE' | 'ENCYCLOPEDIA'>('GUIDANCE');
    const [selectedEntry, setSelectedEntry] = useState<EncyclopediaEntry | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEncyclopedia = ENCYCLOPEDIA.filter(e => 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const relatedEntries = ENCYCLOPEDIA.filter(e => 
        e.related_tools.some(rt => toolName.toLowerCase().includes(rt.toLowerCase())) ||
        e.title.toLowerCase().includes(toolName.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] lg:hidden"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-card/60 backdrop-blur-3xl border-l border-white/10 z-[200] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="h-16 md:h-20 border-b border-white/10 px-4 md:px-8 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="p-1.5 md:p-2 bg-primary/20 rounded-xl">
                                    <Cpu className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xs md:text-sm font-bold text-white tracking-tight">Sensei.AI</h3>
                                    <div className="flex items-center gap-1 text-[8px] md:text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                        Operational Intelligence
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-surface rounded-xl transition-all">
                                <X className="w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex px-2 md:px-6 border-b border-white/5 bg-black/20">
                            {[
                                { id: 'GUIDANCE', label: 'Tactical', icon: Zap },
                                { id: 'ENCYCLOPEDIA', label: 'Knowledge', icon: BookOpen }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id as any);
                                        setSelectedEntry(null);
                                    }}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-3 md:py-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all relative border-b-2",
                                        activeTab === tab.id 
                                            ? "text-primary border-primary bg-primary/5" 
                                            : "text-slate-500 border-transparent hover:text-slate-300"
                                    )}
                                >
                                    <tab.icon className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                    <span className="hidden xs:inline">{tab.label}</span>
                                    {tab.id === 'GUIDANCE' && <span className="xs:hidden">Tactical</span>}
                                    {tab.id === 'ENCYCLOPEDIA' && <span className="xs:hidden">Knowledge</span>}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {selectedEntry ? (
                                    <motion.div
                                        key="entry-detail"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="p-4 md:p-8 space-y-6 md:space-y-8"
                                    >
                                        <button 
                                            onClick={() => setSelectedEntry(null)}
                                            className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform"
                                        >
                                            <ArrowLeft className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                            Back to Knowledge Base
                                        </button>

                                        <div className="space-y-2">
                                            <Badge variant="outline" className="text-[9px] md:text-[10px] border-primary/20 text-primary">
                                                {selectedEntry.category}
                                            </Badge>
                                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{selectedEntry.title}</h2>
                                            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{selectedEntry.description}</p>
                                        </div>

                                        {selectedEntry.formula && (
                                            <div className="p-4 md:p-6 bg-black/40 border border-white/10 rounded-2xl space-y-2 md:space-y-3">
                                                <div className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Mathematical Relation</div>
                                                <div className="text-base md:text-lg font-mono text-primary flex justify-center py-2">
                                                    {selectedEntry.formula}
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            <div className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Definitions</div>
                                            <div className="space-y-3">
                                                {selectedEntry.definitions.map((def, i) => (
                                                    <div key={i} className="p-3 md:p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                                        <p className="text-[10px] md:text-xs font-bold text-white uppercase italic">{def.term}</p>
                                                        <p className="text-[10px] md:text-xs text-slate-400 mt-1">{def.explanation}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Rules of Thumb</div>
                                                <div className="space-y-2">
                                                    {selectedEntry.rules_of_thumb.map((rule, i) => (
                                                        <div key={i} className="text-[10px] text-slate-400 leading-tight">
                                                            • {rule}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Pitfalls</div>
                                                <div className="space-y-2">
                                                    {selectedEntry.common_pitfalls.map((pit, i) => (
                                                        <div key={i} className="text-[10px] text-slate-500 leading-tight italic">
                                                            ! {pit}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : activeTab === 'GUIDANCE' ? (
                                    <motion.div
                                        key="guidance-tab"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 md:p-8 space-y-8 md:space-y-10"
                                    >
                                        {/* Context Card */}
                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                <Terminal className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                                Active Session Context
                                            </div>
                                            <div className="p-4 md:p-6 bg-surface border border-border rounded-xl md:rounded-2xl space-y-3 md:space-y-4">
                                                <div className="space-y-1">
                                                    <p className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest">Target Objective</p>
                                                    <h4 className="text-base md:text-lg font-bold text-white">{toolName}</h4>
                                                </div>
                                                <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">
                                                    Verified for <span className="text-white font-bold">{phase}</span> execution. Sensei.AI is monitoring data inputs for statistical patterns.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Related Encyclopedia Entry */}
                                        {relatedEntries.length > 0 && (
                                            <div className="space-y-3 md:space-y-4">
                                                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    <Info className="w-3 md:w-3.5 h-3 md:h-3.5 text-nexus-gold" />
                                                    Suggested Reference
                                                </div>
                                                {relatedEntries.slice(0, 1).map(entry => (
                                                    <button 
                                                        key={entry.id}
                                                        onClick={() => setSelectedEntry(entry)}
                                                        className="w-full p-3 md:p-4 bg-nexus-gold/5 border border-nexus-gold/20 rounded-xl hover:bg-nexus-gold/10 transition-all text-left group"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-[10px] md:text-xs font-bold text-nexus-gold uppercase tracking-tight">{entry.title}</p>
                                                            <ChevronRight className="w-3.5 md:w-4 h-3.5 md:h-4 text-nexus-gold group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                        <p className="text-[9px] md:text-[10px] text-slate-500 mt-1 line-clamp-2 italic">{entry.description}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Tactical Guidance */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
                                                Operational Pro-Tips
                                            </div>
                                            <div className="space-y-4">
                                                {[
                                                    "Ensure all process inputs are mapped before initializing calculations.",
                                                    "The 80/20 rule should guide your Pareto threshold selection.",
                                                    "Synchronize local datasets with the central ledger before phase completion."
                                                ].map((tip, i) => (
                                                    <div key={i} className="flex gap-4 items-start group">
                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 group-hover:scale-150 transition-all" />
                                                        <p className="text-xs text-slate-400 leading-relaxed group-hover:text-white transition-colors">{tip}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="encyclopedia-tab"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 md:p-6 space-y-4 md:space-y-6"
                                    >
                                        {/* Search Box */}
                                        <div className="relative">
                                            <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-500" />
                                            <input 
                                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-2 md:py-2.5 pl-9 md:pl-10 pr-4 text-[10px] md:text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all font-medium"
                                                placeholder="Scan methodology database..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2 md:space-y-3">
                                            {filteredEncyclopedia.map(entry => (
                                                <button 
                                                    key={entry.id}
                                                    onClick={() => setSelectedEntry(entry)}
                                                    className="w-full flex items-center justify-between p-3 md:p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-primary/40 hover:bg-white/[0.04] transition-all group text-left"
                                                >
                                                    <div className="space-y-0.5">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[10px] md:text-[11px] font-bold text-white uppercase tracking-tight">{entry.title}</p>
                                                            <Badge variant="outline" className="text-[7px] md:text-[8px] py-0 border-white/10 text-slate-500 h-3.5 md:h-4">
                                                                {entry.category}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-[9px] md:text-[10px] text-slate-500 line-clamp-1 italic">{entry.description}</p>
                                                    </div>
                                                    <ChevronRight className="w-3.5 md:w-4 h-3.5 md:h-4 text-slate-600 group-hover:text-primary transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer Status */}
                        <div className="p-4 md:p-8 border-t border-white/10 bg-black/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-nexus-gold/10 flex items-center justify-center text-nexus-gold">
                                        <Zap className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest">Latency</p>
                                        <p className="text-[10px] md:text-xs font-bold text-white">42ms [Sub-Zero]</p>
                                    </div>
                                </div>
                                <div className="text-[8px] md:text-[10px] font-black text-slate-500 border border-white/10 rounded-lg px-2 py-1">v1.5.0 NEXUS</div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'nexus';
}

function Badge({ children, className, variant = 'default' }: BadgeProps) {
    return (
        <div className={cn(
            "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
            variant === 'default' && "bg-primary/20 text-primary",
            variant === 'outline' && "border border-border text-slate-400",
            variant === 'nexus' && "bg-nexus-gold/20 text-nexus-gold border border-nexus-gold/20",
            className
        )}>
            {children}
        </div>
    );
}
