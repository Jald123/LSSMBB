"use client";

import React, { useState } from "react";
import { 
    Trophy, 
    ShieldCheck, 
    Download, 
    Share2, 
    Copy, 
    Linkedin, 
    ExternalLink, 
    ChevronLeft, 
    CheckCircle2,
    Award,
    Binary,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function CertificationCeremony() {
    const [copied, setCopied] = useState(false);

    const certData = {
        recipient: "OPERATOR_0x77",
        title: "Lean Six Sigma Master Black Belt",
        date: "April 2026",
        credentialId: "NEX-MBB-2026-X77",
        verificationLink: "https://nexus-os.io/verify/NEX-MBB-2026-X77"
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(certData.verificationLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20 font-sans">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    
                    <PageHeader 
                        title="Certification Ledger" 
                        description="Verification of global operational mastery and structural intelligence."
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Certificate Interactive Preview */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="aspect-[1.414/1] bg-card border border-primary/20 rounded-[3rem] relative overflow-hidden group shadow-[0_0_80px_rgba(34,211,238,0.1)] p-12 flex flex-col items-center justify-between text-center"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                                
                                {/* Certificate Content */}
                                <div className="z-10 w-full space-y-10">
                                    <div className="flex justify-between items-start w-full opacity-60">
                                        <div className="flex items-center gap-2 border border-white/10 px-3 py-1 rounded-full">
                                            <Binary className="w-3 h-3 text-primary" />
                                            <span className="text-[8px] font-black uppercase tracking-widest leading-none">Nexus Protocol v4.2</span>
                                        </div>
                                        <ShieldCheck className="w-8 h-8 text-primary/40" />
                                    </div>

                                    <div className="space-y-6">
                                        <div className="inline-flex flex-col items-center gap-2">
                                            <div className="w-16 h-0.5 bg-primary/40 rounded-full" />
                                            <h4 className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Official Verification</h4>
                                            <div className="w-16 h-0.5 bg-primary/40 rounded-full" />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <h2 className="text-4xl font-black font-display tracking-tight text-white italic">{certData.recipient}</h2>
                                            <p className="text-sm font-medium text-slate-400 capitalize">HAS ACHIEVED THE STATUS OF</p>
                                            <h3 className="text-2xl font-black text-primary uppercase tracking-wider">{certData.title}</h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5 opacity-60">
                                        <div className="text-left space-y-1">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Global Date</p>
                                            <p className="text-[10px] font-bold text-white">{certData.date}</p>
                                        </div>
                                        <div className="text-center space-y-1">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Level</p>
                                            <p className="text-[10px] font-bold text-white uppercase italic">Master Black Belt</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Credential ID</p>
                                            <p className="text-[10px] font-bold text-primary font-mono">{certData.credentialId}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Prestige Watermark */}
                                <div className="absolute -bottom-20 -right-20 w-80 h-80 border-[32px] border-primary/5 rounded-full" />
                            </motion.div>
                        </div>

                        {/* Metadata & Social Operations */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="bg-card border border-border p-10 rounded-[2.5rem] space-y-8 shadow-2xl">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-nexus-gold/10 flex items-center justify-center text-nexus-gold border border-nexus-gold/20 shadow-lg shadow-nexus-gold/5">
                                        <Trophy className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Elite Operational Status</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Verification Confirmed</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Competency Multiplier</span>
                                        <Badge variant="nexus" className="font-bold">x1.5 XP</Badge>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Protocol Tier</span>
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">Level 5 (Zenith)</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button 
                                        variant="outline" 
                                        onClick={handleCopyLink}
                                        className="h-16 flex flex-col gap-1 border-white/10 hover:bg-surface"
                                    >
                                        {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
                                        <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'COPIED' : 'COPY ID'}</span>
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        className="h-16 flex flex-col gap-1 bg-[#0077b5]/5 border-[#0077b5]/20 hover:bg-[#0077b5]/10 text-[#0077b5]"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">SHARE</span>
                                    </Button>
                                </div>

                                <Button variant="nexus" size="lg" className="w-full py-8 font-bold uppercase tracking-[0.3em] shadow-lg shadow-primary/10">
                                    <Download className="w-5 h-5 mr-3" />
                                    Download High-Res PDF
                                </Button>
                            </div>

                            {/* Recognition Banner */}
                            <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-[2rem] flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Your certificates are <b>globally verifiable</b> via the Nexus OS Ledger. Share your success in the Command Hub to inspire your fleet.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
