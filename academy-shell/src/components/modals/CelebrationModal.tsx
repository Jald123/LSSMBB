"use client";

import React, { useState } from "react";
import { X, Trophy, FileText, LayoutDashboard, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface CelebrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    phaseName: string;
    nextPhaseName: string | null;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
    isOpen,
    onClose,
    phaseName,
    nextPhaseName
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#1a1a2e]/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-8 text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                                className="w-20 h-20 bg-[#59ce8f]/10 rounded-full flex items-center justify-center"
                            >
                                <CheckCircle2 className="w-12 h-12 text-[#59ce8f]" />
                            </motion.div>
                        </div>

                        <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">{phaseName} Phase Complete!</h2>
                        <p className="text-[#6b7280] mb-8">
                            {nextPhaseName
                                ? `${nextPhaseName} phase is now unlocked and ready for execution.`
                                : "You've completed all phases in this project!"}
                        </p>

                        <button
                            onClick={onClose}
                            className="w-full h-12 bg-[#ff1e00] text-white font-bold rounded-xl shadow-lg shadow-[#ff1e00]/20 hover:bg-[#e61b00] transition-all"
                        >
                            {nextPhaseName ? "Continue to Next Phase" : "View Final Results"}
                        </button>

                        {/* Confetti particles - simplified for CSS-only/motion */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                    x: (Math.random() - 0.5) * 200,
                                    y: (Math.random() - 0.5) * 200,
                                    opacity: 0,
                                    rotate: Math.random() * 360
                                }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className={`absolute left-1/2 top-1/2 w-2 h-2 rounded-sm ${['bg-[#ff1e00]', 'bg-[#59ce8f]', 'bg-[#e8f9fd]', 'bg-[#fbe3e8]'][i % 4]
                                    }`}
                            />
                        ))}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
