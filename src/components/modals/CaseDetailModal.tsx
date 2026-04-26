"use client";

import React, { useEffect, useState } from "react";
import { Star, Clock, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    caseStudy: any;
    onStartProject: (caseId: string, framework: string) => void;
    isCreating: boolean;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
    isOpen,
    onClose,
    caseStudy,
    onStartProject,
    isCreating
}) => {
    if (!caseStudy) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#1a1a2e]/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 pb-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">{caseStudy.title}</h2>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-0.5 bg-[#fbe3e8] text-[#ff1e00] text-[10px] font-black uppercase rounded">
                                            {caseStudy.category}
                                        </span>
                                        <span className="px-2 py-0.5 bg-[#e8f9fd] text-[#1a1a2e] text-[10px] font-black uppercase rounded">
                                            {caseStudy.framework}
                                        </span>
                                    </div>
                                </div>
                                <button onClick={onClose} className="p-1 hover:bg-[#f3f4f6] rounded-lg transition-colors">
                                    <X className="w-6 h-6 text-[#6b7280]" />
                                </button>
                            </div>

                            <p className="text-[#6b7280] leading-relaxed mb-6">
                                {caseStudy.description}
                            </p>
                        </div>

                        {/* Deliverables Section */}
                        <div className="px-8 py-6 bg-[#f8fafc] border-y border-[#e5e7eb]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-[#1a1a2e] mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#ff1e00]" />
                                What you'll deliver:
                            </h3>
                            <div className="grid grid-cols-2 gap-y-3">
                                {caseStudy.phases?.flatMap((p: any) => p.tools).filter((t: any) => t.priority === 'essential').map((tool: any) => (
                                    <div key={tool.toolId} className="flex items-center gap-2 text-sm text-[#4b5563] font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-[#59ce8f]" />
                                        {tool.toolName}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 pt-6">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            className={`w-4 h-4 ${s <= caseStudy.difficulty ? 'fill-[#ff1e00] text-[#ff1e00]' : 'text-[#e5e7eb]'}`}
                                        />
                                    ))}
                                    <span className="ml-2 text-xs font-bold text-[#6b7280]">Difficulty</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#6b7280] text-sm font-bold">
                                    <Clock className="w-5 h-5" />
                                    ~{caseStudy.estimatedHours} HOURS
                                </div>
                            </div>

                            {caseStudy.dataset?.briefingUrl && (
                                <a 
                                    href={caseStudy.dataset.briefingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full h-11 mb-3 border-2 border-[#ff1e00]/20 text-[#ff1e00] font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#ff1e00]/5 transition-all outline-none flex items-center justify-center gap-2"
                                >
                                    <Clock className="w-4 h-4" />
                                    Download Mission Briefing
                                </a>
                            )}
                            <button
                                onClick={() => onStartProject(caseStudy.id, caseStudy.framework)}
                                disabled={isCreating}
                                className="w-full h-12 bg-[#ff1e00] text-white font-bold rounded-xl shadow-lg shadow-[#ff1e00]/20 hover:bg-[#e61b00] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isCreating ? "Creating project..." : "Start Project"}
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full mt-4 text-sm font-bold text-[#6b7280] hover:text-[#1a1a2e] transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
