"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, Info, AlertTriangle, AlertCircle, Bell, Zap } from 'lucide-react';

type ToastType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextType {
    showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, message: string, duration = 5000) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev.slice(-4), { id, type, message, duration }]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <ToastItem key={toast.id} toast={toast} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

const ToastItem: React.FC<{ toast: Toast, onClose: (id: string) => void }> = ({ toast, onClose }) => {
    const getTheme = () => {
        switch (toast.type) {
            case 'SUCCESS': return {
                bg: 'bg-[#0f172a]/90',
                border: 'border-emerald-500/50',
                text: 'text-emerald-400',
                icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
                glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]'
            };
            case 'INFO': return {
                bg: 'bg-[#0f172a]/90',
                border: 'border-[#22d3ee]/50',
                text: 'text-[#22d3ee]',
                icon: <Info className="w-5 h-5 text-[#22d3ee]" />,
                glow: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]'
            };
            case 'WARNING': return {
                bg: 'bg-[#0f172a]/90',
                border: 'border-amber-500/50',
                text: 'text-amber-400',
                icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
                glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]'
            };
            case 'ERROR': return {
                bg: 'bg-[#0f172a]/90',
                border: 'border-red-500/50',
                text: 'text-red-400',
                icon: <AlertCircle className="w-5 h-5 text-red-500" />,
                glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]'
            };
        }
    };

    const theme = getTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            layout
            className={`pointer-events-auto relative group flex items-start gap-3 p-4 rounded-xl border-l-4 backdrop-blur-md shadow-2xl min-w-[320px] max-w-[420px] ${theme.bg} ${theme.border} ${theme.glow}`}
        >
            <div className="flex-shrink-0 mt-0.5">{theme.icon}</div>
            
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${theme.text}`}>
                        {toast.type} ⚡ PROTOCOL
                    </span>
                    <button
                        onClick={() => onClose(toast.id)}
                        className="p-1 hover:bg-white/5 rounded-md transition-colors text-slate-500 hover:text-white"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="text-sm font-medium text-slate-200 leading-snug">
                    {toast.message}
                </div>
            </div>

            {/* Subtle Progress Bar for duration */}
            {toast.duration && toast.duration > 0 && (
                <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full overflow-hidden rounded-b-xl">
                    <motion.div 
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: toast.duration / 1000, ease: "linear" }}
                        className={`h-full ${theme.text === 'text-[#22d3ee]' ? 'bg-[#22d3ee]' : theme.text.replace('text-', 'bg-')}`}
                    />
                </div>
            )}
        </motion.div>
    );
};
