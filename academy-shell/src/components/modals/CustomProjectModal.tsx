"use client";

import React, { useState } from "react";
import { X, Layout, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStartProject: (data: any) => void;
    isCreating: boolean;
}

export const CustomProjectModal: React.FC<CustomProjectModalProps> = ({
    isOpen,
    onClose,
    onStartProject,
    isCreating
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [framework, setFramework] = useState("DMAIC");

    const handleSubmit = () => {
        if (!title || !description) return;
        onStartProject({
            caseId: 'custom',
            title,
            description,
            framework
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#1a1a2e]/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <h2 className="text-2xl font-bold text-[#1a1a2e]">Define Your Problem</h2>
                                <button onClick={onClose} className="p-1 hover:bg-[#f3f4f6] rounded-lg transition-colors">
                                    <X className="w-6 h-6 text-[#6b7280]" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]">Project Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., Reduce customer churn rate"
                                        className="w-full h-12 px-4 rounded-xl border border-[#e5e7eb] focus:border-[#ff1e00] focus:ring-1 focus:ring-[#ff1e00] outline-none transition-all font-medium"
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]">Brief Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe the problem you want to solve..."
                                        rows={4}
                                        className="w-full p-4 rounded-xl border border-[#e5e7eb] focus:border-[#ff1e00] focus:ring-1 focus:ring-[#ff1e00] outline-none transition-all font-medium resize-none"
                                    />
                                </div>

                                {/* Framework Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]">Framework Selector</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setFramework("DMAIC")}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-2 ${framework === "DMAIC"
                                                    ? "border-[#ff1e00] bg-[#fbe3e8]"
                                                    : "border-[#e5e7eb] hover:border-[#ff1e00] bg-white"
                                                }`}
                                        >
                                            <Layout className={`w-8 h-8 ${framework === "DMAIC" ? "text-[#ff1e00]" : "text-[#6b7280]"}`} />
                                            <div className="font-bold">DMAIC</div>
                                            <div className="text-[10px] text-[#6b7280]">Improve an existing process</div>
                                        </button>
                                        <button
                                            onClick={() => setFramework("DMADV")}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-2 ${framework === "DMADV"
                                                    ? "border-[#ff1e00] bg-[#fbe3e8]"
                                                    : "border-[#e5e7eb] hover:border-[#ff1e00] bg-white"
                                                }`}
                                        >
                                            <Lightbulb className={`w-8 h-8 ${framework === "DMADV" ? "text-[#ff1e00]" : "text-[#6b7280]"}`} />
                                            <div className="font-bold">DMADV</div>
                                            <div className="text-[10px] text-[#6b7280]">Design a new process</div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isCreating || !title || !description}
                                className="w-full h-12 mt-10 bg-[#ff1e00] text-white font-bold rounded-xl shadow-lg shadow-[#ff1e00]/20 hover:bg-[#e61b00] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isCreating ? "Creating project..." : "Create Project"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
