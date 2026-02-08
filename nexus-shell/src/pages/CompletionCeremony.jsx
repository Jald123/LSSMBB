import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    Star,
    ShieldCheck,
    Download,
    Share2,
    Copy,
    Linkedin,
    ExternalLink,
    ChevronLeft,
    CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNexus } from '../context/NexusContext';

const CompletionCeremony = () => {
    const { xp, completedTools } = useNexus();
    const [copied, setCopied] = useState(false);

    const certData = {
        recipient: "Hossam ALDhaher",
        title: "Lean Six Sigma Master Black Belt (LSSMBB)",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        credentialId: "NEX-MBB-2026-X77",
        verificationLink: "https://healthqualityleader.com/verify/NEX-MBB-2026-X77"
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(certData.verificationLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLinkedInShare = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certData.verificationLink)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="pt-24 px-10 min-h-screen flex flex-col items-center justify-center bg-[#020617] relative overflow-hidden">
            {/* Celebration Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-nexus-cyan/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-nexus-gold/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-5xl w-full z-10 flex flex-col items-center"
            >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-nexus-gold/20 border border-nexus-gold/40 mb-8 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                    <Trophy className="w-12 h-12 text-nexus-gold" />
                </div>

                <h1 className="text-6xl font-black font-orbitron mb-4 text-white tracking-tight text-center">
                    MISSION <span className="text-nexus-gold">ACCOMPLISHED</span>
                </h1>
                <p className="text-slate-500 font-orbitron text-xs tracking-[0.5em] mb-12 uppercase text-center">Certificate of Global Operational Mastery</p>

                <div className="grid grid-cols-12 gap-10 w-full mb-12">
                    {/* Certificate Preview Placeholder */}
                    <div className="col-span-12 lg:col-span-7 aspect-[1.414/1] bg-white/5 border border-white/10 rounded-[2rem] relative overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-nexus-gold/10 via-transparent to-nexus-cyan/5" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                            <ShieldCheck className="w-20 h-20 text-nexus-gold/20 mb-6" />
                            <div className="w-full h-px bg-white/10 mb-8" />
                            <h4 className="text-[10px] font-black font-orbitron text-nexus-gold tracking-[0.4em] mb-4 uppercase">Verification Preview</h4>
                            <div className="space-y-2 opacity-50 blur-[2px] pointer-events-none group-hover:blur-0 transition-all duration-700">
                                <p className="text-white font-serif text-3xl">{certData.recipient}</p>
                                <p className="text-slate-400 text-sm font-orbitron font-bold uppercase tracking-widest">{certData.title}</p>
                            </div>
                            <div className="w-full h-px bg-white/10 mt-8" />
                        </div>
                        {/* Holographic Watermark */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 border-[20px] border-white/[0.03] rounded-full" />
                    </div>

                    {/* Metadata & Actions */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-nexus-surface/40 backdrop-blur-2xl border border-nexus-border p-8 rounded-[2.5rem] shadow-xl">
                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-[10px] text-slate-500 font-black font-orbitron uppercase tracking-widest mb-1">CANDIDATE</h5>
                                    <p className="text-white font-bold">{certData.recipient}</p>
                                </div>
                                <div>
                                    <h5 className="text-[10px] text-slate-500 font-black font-orbitron uppercase tracking-widest mb-1">DATE ISSUED</h5>
                                    <p className="text-slate-300 font-medium">{certData.date}</p>
                                </div>
                                <div>
                                    <h5 className="text-[10px] text-slate-500 font-black font-orbitron uppercase tracking-widest mb-1">CREDENTIAL ID</h5>
                                    <p className="text-nexus-cyan font-mono font-bold">{certData.credentialId}</p>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] text-slate-500 font-black font-orbitron uppercase tracking-widest">Mastery Status</span>
                                        <span className="text-nexus-success text-[10px] font-black font-orbitron animate-pulse">VERIFIED</span>
                                    </div>
                                    <div className="flex gap-2 text-[11px] font-bold text-slate-400">
                                        <div className="flex-1 bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                                            <div className="text-white">{completedTools.length}</div>
                                            <div className="text-[8px] uppercase mt-1">Tools</div>
                                        </div>
                                        <div className="flex-1 bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                                            <div className="text-nexus-gold">{xp}</div>
                                            <div className="text-[8px] uppercase mt-1">XP Points</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleCopyLink}
                                className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl transition-all group"
                            >
                                {copied ? <CheckCircle2 className="w-5 h-5 text-nexus-success" /> : <Copy className="w-5 h-5 text-slate-400 group-hover:text-white" />}
                                <span className="text-[10px] font-black font-orbitron text-slate-500 group-hover:text-white uppercase tracking-tighter">
                                    {copied ? 'COPIED' : 'COPY LINK'}
                                </span>
                            </button>
                            <button
                                onClick={handleLinkedInShare}
                                className="flex flex-col items-center justify-center gap-2 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 p-5 rounded-2xl transition-all group"
                            >
                                <Linkedin className="w-5 h-5 text-[#0077b5]" />
                                <span className="text-[10px] font-black font-orbitron text-[#0077b5] uppercase tracking-tighter">SHARE</span>
                            </button>
                        </div>

                        <button
                            disabled
                            className="w-full bg-slate-800/50 text-slate-600 py-5 rounded-2xl font-orbitron font-black text-xs cursor-not-allowed flex items-center justify-center gap-3 border border-white/5"
                        >
                            <Download className="w-5 h-5" /> DOWNLOAD HIGH-RES PDF
                        </button>
                    </div>
                </div>

                <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-all font-orbitron font-black text-xs tracking-widest uppercase mt-4">
                    <ChevronLeft className="w-4 h-4" /> Return to Command Center
                </Link>
            </motion.div>
        </div>
    );
};

export default CompletionCeremony;
