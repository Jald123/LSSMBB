"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Mail, ChevronRight, Terminal } from "lucide-react";

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
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[480px] bg-card border border-border p-12 rounded-[3rem] shadow-2xl relative z-10"
            >
                <div className="flex justify-center mb-12">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-foreground flex items-center justify-center text-background">
                        <Terminal className="w-8 h-8" />
                    </div>
                </div>

                <div className="text-center space-y-3 mb-12">
                    <h1 className="text-3xl font-display font-black tracking-tight uppercase leading-none">NEXUS ACADEMY</h1>
                    <p className="text-muted text-sm uppercase tracking-widest font-black">Authentication Protocol v.2.4</p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-black text-red-500 uppercase tracking-widest text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] px-4">Identifier</label>
                        <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="citizen@nexus.os"
                                className="w-full bg-surface border border-border pl-14 pr-6 py-5 rounded-[1.5rem] text-sm font-medium focus:border-primary/50 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] px-4">Security Phrase</label>
                        <div className="relative">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full bg-surface border border-border pl-14 pr-6 py-5 rounded-[1.5rem] text-sm font-medium focus:border-primary/50 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-primary-foreground py-5 rounded-[1.5rem] font-black text-sm tracking-[0.2em] uppercase shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                        {isLoading ? "Validating..." : (
                            <>
                                INITIALIZE ACADEMY <ChevronRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest leading-relaxed">
                        This is a high-security environment. <br /> All access attempts are logged and audited.
                    </p>
                </div>
            </motion.div>

            <div className="mt-12 flex gap-4 text-[9px] font-black text-muted uppercase tracking-[0.3em]">
                <span>System Status: Optimal</span>
                <div className="w-1 h-1 rounded-full bg-green-500 self-center" />
                <span>Uptime: 99.9%</span>
            </div>
        </div>
    );
}
