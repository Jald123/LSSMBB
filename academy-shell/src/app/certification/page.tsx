"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Award, ShieldCheck, Download, ExternalLink, QrCode } from "lucide-react";
import { motion } from "framer-motion";

export default function CertificationPage() {
    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <TopBar mode="DO" setMode={() => { }} />
            <Sidebar userRole="STUDENT" />

            <main className="flex-1 overflow-y-auto pt-16 h-full bg-surface/30 px-12 pb-24">
                <div className="max-w-7xl mx-auto py-12 space-y-12">
                    <header className="space-y-4">
                        <h1 className="text-4xl font-display font-black tracking-tight uppercase">Credential Vault</h1>
                        <p className="text-muted text-lg">Your verified achievements and professional standards.</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-card border border-border rounded-[2.5rem] p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                                <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                                    <div className="w-48 h-48 bg-surface rounded-full border-8 border-primary/20 flex items-center justify-center p-4">
                                        <ShieldCheck className="w-24 h-24 text-primary" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left space-y-4">
                                        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase inline-block font-orbitron">Verified Credential</div>
                                        <h2 className="text-4xl font-black leading-tight uppercase">Black Belt Practitioner</h2>
                                        <p className="text-muted leading-relaxed">Issued to clinical professionals who have mastered advanced statistical optimization and DMAIC governance.</p>
                                        <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                                            <button className="flex items-center gap-2 bg-foreground text-background px-6 py-2 rounded-lg text-xs font-black tracking-widest uppercase hover:opacity-90">
                                                <Download className="w-4 h-4" /> Download PDF
                                            </button>
                                            <button className="flex items-center gap-2 bg-surface border border-border px-6 py-2 rounded-lg text-xs font-black tracking-widest uppercase hover:bg-card">
                                                <QrCode className="w-4 h-4" /> View QR Code
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-muted underline decoration-primary decoration-4 underline-offset-8">Achievement Badges</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { name: 'Charter Master', type: 'TOOL', icon: Award },
                                        { name: 'DMAIC Define', type: 'PHASE', icon: ShieldCheck },
                                        { name: 'ER Hero', type: 'CASE', icon: Award },
                                        { name: 'Data Scientist', type: 'SKILL', icon: ShieldCheck },
                                    ].map((badge, i) => (
                                        <div key={badge.name} className="bg-card border border-border p-6 rounded-3xl flex flex-col items-center text-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-primary">
                                                <badge.icon className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-tight leading-none">{badge.name}</p>
                                                <p className="text-[8px] font-black text-muted uppercase tracking-widest">{badge.type}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <aside className="space-y-8">
                            <div className="bg-surface/50 border border-border rounded-3xl p-8 space-y-6">
                                <h4 className="font-black uppercase tracking-tight text-lg">Verification Portal</h4>
                                <p className="text-xs text-muted leading-relaxed">Third parties (Employers/Universities) can verify your credentials using your unique Nexus ID.</p>
                                <div className="space-y-2">
                                    <div className="text-[10px] font-black text-muted uppercase tracking-widest">Permanent Link</div>
                                    <div className="p-4 bg-card border border-border rounded-xl flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-muted">nexus.academy/v/283x_92</span>
                                        <button className="text-primary hover:text-foreground transition-colors"><ExternalLink className="w-3 h-3" /></button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-primary text-primary-foreground space-y-4 shadow-xl shadow-primary/20">
                                <h4 className="font-black uppercase tracking-tight text-lg">Next Milestone</h4>
                                <p className="text-xs opacity-90 leading-relaxed">Complete the **Institutional Governance** case study to unlock the **Master Black Belt** candidacy.</p>
                                <button className="w-full bg-white text-black py-3 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-lg">START MISSION NOW</button>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
