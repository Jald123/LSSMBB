"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Mail, ChevronRight, Terminal, Zap, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/primitives/Button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            window.location.href = "/";
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-[#f8fafc] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* 🌌 Cybernetic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#22d3ee]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#a855f7]/10 rounded-full blur-[100px]" />
                
                {/* Visual Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                
                {/* Moving Scanline Animation Overlay (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22d3ee]/5 to-transparent h-[200%] w-full animate-[scanline_8s_linear_infinite]" style={{ backgroundSize: '100% 50%' }} />
            </div>

            {/* Glassmorphic Login Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[460px] bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-10 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.15)] relative z-10"
            >
                {/* Top Branding */}
                <div className="text-center space-y-4 mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#22d3ee] to-[#3b82f6] shadow-[0_0_20px_rgba(34,211,238,0.4)] mb-2 group">
                        <Terminal className="w-10 h-10 text-[#020617] group-hover:scale-110 transition-transform" />
                    </div>
                    
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold font-display tracking-[0.1em] text-white">
                            NEXUS <span className="text-[#22d3ee]">OS</span>
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Lean Six Sigma Executive Terminal
                        </p>
                    </div>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-medium text-red-400 text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Access Identifier</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#22d3ee] transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="name@nexus.academy"
                                className="w-full bg-[#1e293b]/50 border border-white/10 pl-11 pr-4 py-4 rounded-xl text-sm transition-all outline-none focus:border-[#22d3ee]/50 focus:ring-1 focus:ring-[#22d3ee]/20 placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Security Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#22d3ee] transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full bg-[#1e293b]/50 border border-white/10 pl-11 pr-4 py-4 rounded-xl text-sm transition-all outline-none focus:border-[#22d3ee]/50 focus:ring-1 focus:ring-[#22d3ee]/20 placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        variant="nexus"
                        className="w-full py-7 uppercase tracking-[0.1em] font-bold text-sm shadow-[0_4px_15px_rgba(34,211,238,0.2)]"
                    >
                        Establish Uplink <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                </form>

                {/* Footer Meta */}
                <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-2 gap-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3 text-[#22d3ee]" />
                        <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <Globe className="w-3 h-3 text-[#22d3ee]" />
                        <span>Global Access</span>
                    </div>
                </div>
            </motion.div>

            {/* Bottom System Status */}
            <div className="mt-8 relative z-10 pointer-events-none opacity-40">
                <div className="flex flex-col items-center gap-2 text-[9px] font-bold uppercase tracking-[0.4em]">
                    <span className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        System Status: Operational
                    </span>
                    <span className="text-slate-600">Protocol Release v4.0.1 ALPHA</span>
                </div>
            </div>
            
            <style jsx global>{`
                @keyframes scanline {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0%); }
                }
            `}</style>
        </div>
    );
}
