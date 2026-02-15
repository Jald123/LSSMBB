"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react';

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

    const showToast = useCallback((type: ToastType, message: string, duration = 4000) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev.slice(-2), { id, type, message, duration }]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
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
    const getStyles = () => {
        switch (toast.type) {
            case 'SUCCESS': return 'border-l-[#59ce8f] bg-white';
            case 'INFO': return 'border-l-[#3b82f6] bg-[#e8f9fd]';
            case 'WARNING': return 'border-l-[#ff1e00] bg-white';
            case 'ERROR': return 'bg-[#ff1e00] text-white border-transparent';
            default: return 'bg-white';
        }
    };

    const getIcon = () => {
        switch (toast.type) {
            case 'SUCCESS': return <CheckCircle className="w-5 h-5 text-[#59ce8f]" />;
            case 'INFO': return <Info className="w-5 h-5 text-[#3b82f6]" />;
            case 'WARNING': return <AlertTriangle className="w-5 h-5 text-[#ff1e00]" />;
            case 'ERROR': return <AlertCircle className="w-5 h-5 text-white" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl border-l-[6px] shadow-lg min-w-[300px] max-w-[400px] ${getStyles()}`}
        >
            <div className="flex-shrink-0">{getIcon()}</div>
            <div className={`flex-1 text-sm font-bold ${toast.type === 'ERROR' ? 'text-white' : 'text-[#1a1a2e]'}`}>
                {toast.message}
            </div>
            <button
                onClick={() => onClose(toast.id)}
                className={`p-1 hover:bg-black/5 rounded-md transition-colors ${toast.type === 'ERROR' ? 'text-white' : 'text-[#6b7280]'}`}
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};
