"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    X, 
    Trophy, 
    AlertCircle, 
    Lightbulb, 
    Zap, 
    ChevronRight,
    Target,
    Activity,
    Award
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MasteryReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    score: number;
    feedback: string;
    toolName: string;
}

export const MasteryReportModal: React.FC<MasteryReportModalProps> = ({
    isOpen,
    onClose,
    score,
    feedback,
    toolName
}) => {
    const isPassed = score >= 70;
    const feedbackParts = feedback.split('\n\n');

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header Section */}
                        <div className="p-8 border-b border-white/5 relative overflow-hidden shrink-0">
                            <div className={cn(
                                "absolute top-0 right-0 w-64 h-64 blur-[100px] -mr-32 -mt-32 opacity-20 transition-colors",
                                isPassed ? "bg-emerald-500" : "bg-primary"
                            )} />
                            
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={cn(
                                            "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border",
                                            isPassed ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-primary/10 border-primary/20 text-primary"
                                        )}>
                                            {isPassed ? "MISSION SUCCESS" : "MISSION FAILED"}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mastery Report</div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">{toolName}</h2>
                                    <p className="text-slate-400 text-xs mt-1">Tactical analysis of your latest methodological submission.</p>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 border border-white/5 rounded-xl transition-all text-slate-500 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Score Display */}
                            <div className="mt-8 flex items-center gap-8 relative z-10">
                                <div className="relative">
                                    <svg className="w-20 h-20 rotate-[-90deg]">
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="36"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-white/5"
                                        />
                                        <motion.circle
                                            cx="40"
                                            cy="40"
                                            r="36"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            strokeDasharray={226.19}
                                            initial={{ strokeDashoffset: 226.19 }}
                                            animate={{ strokeDashoffset: 226.19 - (226.19 * score) / 100 }}
                                            fill="transparent"
                                            strokeLinecap="round"
                                            className={isPassed ? "text-emerald-500 shadow-lg" : "text-primary shadow-lg"}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black text-white leading-none">{score}</span>
                                        <span className="text-[8px] font-black text-slate-500 uppercase">Mastery</span>
                                    </div>
                                </div>

                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <Target className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">THRESHOLD</p>
                                            <p className="text-xs font-bold text-white">70% PASS</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <Award className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">SENSEI RANK</p>
                                            <p className="text-xs font-bold text-white">{isPassed ? 'Black Belt' : 'Grey Belt'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Report Content */}
                        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-4">
                            {feedbackParts.map((part, idx) => {
                                if (!part.trim()) return null;
                                
                                const isGaps = part.includes("CAPABILITY GAPS");
                                const isReco = part.includes("TECHNICAL RECOMMENDATIONS");
                                const isPath = part.includes("PATH TO MASTERY") || part.includes("SENSEI VERDICT");

                                return (
                                    <div key={idx} className={cn(
                                        "p-6 rounded-2xl border relative overflow-hidden",
                                        isGaps ? "bg-red-500/5 border-red-500/10" : 
                                        isReco ? "bg-amber-500/5 border-amber-500/10" :
                                        isPath ? (isPassed ? "bg-emerald-500/5 border-emerald-500/10" : "bg-primary/5 border-primary/10") :
                                        "bg-white/5 border-white/10"
                                    )}>
                                        <div className={cn(
                                            "absolute top-0 left-0 w-1 h-full",
                                            isGaps ? "bg-red-500" : isReco ? "bg-amber-500" : isPath ? (isPassed ? "bg-emerald-500" : "bg-primary") : "bg-slate-500"
                                        )} />
                                        <h4 className={cn(
                                            "text-[9px] font-black font-orbitron tracking-widest uppercase mb-3 flex items-center gap-2",
                                            isGaps ? "text-red-500" : isReco ? "text-amber-500" : "text-slate-400"
                                        )}>
                                            {isGaps ? <AlertCircle className="w-3 h-3" /> : isReco ? <Lightbulb className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                                            {part.split('\n')[0]}
                                        </h4>
                                        <div className="text-slate-300 text-xs leading-relaxed font-medium whitespace-pre-wrap">
                                            {part.split('\n').slice(1).join('\n')}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer Action */}
                        <div className="p-8 border-t border-white/5 bg-black/20 shrink-0">
                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                            >
                                ACKNOWLEDGE & CLOSE REPORT
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
