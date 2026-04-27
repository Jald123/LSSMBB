// @ts-nocheck
"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
    Award,
    Download,
    Eye,
    Sparkles,
    Shield,
    ChevronDown,
    FileText,
    User,
    Calendar,
    Target,
    Hash,
    Briefcase
} from "lucide-react";
import { CertificateDocument, type CertificateData, type CredentialType } from "@/components/patterns/CertificateDocument";

// @ts-ignore
const PDFDownloadLink = dynamic<any>(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    { ssr: false, loading: () => <span className="text-sm text-muted-foreground">Loading PDF engine...</span> }
) as any;

// @ts-ignore
const PDFViewer = dynamic<any>(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false, loading: () => <div className="w-full h-[600px] bg-slate-950/50 rounded-3xl animate-pulse border border-white/5" /> }
) as any;

const LSS_OPTIONS: CredentialType[] = [
    "White Belt",
    "Yellow Belt",
    "Green Belt",
    "Black Belt",
    "Master Black Belt",
];

const SPECIALTY_OPTIONS: CredentialType[] = [
    "DMADV (DESIGN)",
    "KAIZEN (EVENT)",
    "FOCUS PDCA (QUALITY)"
];

const CREDENTIAL_STYLES: Record<string, string> = {
    "White Belt": "from-slate-100 to-slate-200 text-slate-900 border-slate-300",
    "Yellow Belt": "from-amber-300 to-amber-500 text-amber-950 border-amber-400",
    "Green Belt": "from-emerald-400 to-emerald-600 text-emerald-950 border-emerald-500",
    "Black Belt": "from-slate-700 to-slate-900 text-white border-slate-600",
    "Master Black Belt": "from-yellow-400 to-yellow-600 text-yellow-950 border-yellow-500 ring-2 ring-yellow-400/30",
    "DMADV (DESIGN)": "from-cyan-400 to-cyan-600 text-cyan-950 border-cyan-500",
    "KAIZEN (EVENT)": "from-orange-400 to-orange-600 text-white border-orange-500",
    "FOCUS PDCA (QUALITY)": "from-fuchsia-400 to-fuchsia-600 text-white border-fuchsia-500",
};

export default function CertificatePage() {
    const [isGenerated, setIsGenerated] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState<CertificateData>({
        recipientName: "Hussam Aldhaher",
        credentialType: "Green Belt",
        completionDate: new Date().toISOString().split("T")[0],
        projectTitle: "Operational Excellence Protocol",
        overallScore: 94,
        instructorName: "Sarah Chen",
        certificateId: "",
    });

    const isValid = formData.recipientName.trim().length > 0 && formData.projectTitle.trim().length > 0;

    const certificateData = useMemo<CertificateData>(
        () => ({
            ...formData,
            completionDate: new Date(formData.completionDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            certificateId: formData.certificateId || `NXS-${formData.credentialType.substring(0, 2).toUpperCase()}-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        }),
        [formData]
    );

    const handleGenerate = () => {
        if (!isValid) return;
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerated(true);
            setIsGenerating(false);
        }, 1500);
    };

    const updateField = <K extends keyof CertificateData>(key: K, value: CertificateData[K]) => {
        setIsGenerated(false);
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-full space-y-10 pb-20">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5"
            >
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                        <Award className="w-3 h-3" />
                        Credentials Engine
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight font-orbitron">
                            GENERATE <span className="text-primary italic">CERTIFICATE</span>
                        </h1>
                        <p className="text-slate-500 max-w-xl text-sm font-medium mt-2">
                            Produce world-class, high-fidelity Lean Six Sigma credentials with precision-engineered typography and LSS visual benchmarks.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    {isGenerated && (
                        <PDFDownloadLink
                            document={<CertificateDocument data={certificateData} />}
                            fileName={`Nexus_${formData.credentialType.replace(/\s+/g, "_")}_${formData.recipientName.replace(/\s+/g, "_")}.pdf`}
                        >
                            {({ loading }: { loading: boolean }) => (
                                <button
                                    disabled={loading}
                                    className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-60"
                                >
                                    <Download className="w-4 h-4" />
                                    {loading ? "Finalizing..." : "Download Export"}
                                </button>
                            )}
                        </PDFDownloadLink>
                    )}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* ─── Form Panel ─────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="xl:col-span-4 space-y-8"
                >
                    <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] transition-opacity group-hover:opacity-[0.05]">
                            <Award className="w-32 h-32" />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">
                                Credential Metadata
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {/* Recipient */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" /> Learner Identity
                                </label>
                                <input
                                    type="text"
                                    value={formData.recipientName}
                                    onChange={(e) => updateField("recipientName", e.target.value)}
                                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-sm text-white placeholder:text-slate-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all font-medium"
                                />
                            </div>

                            {/* Path Selection */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Shield className="w-3.5 h-3.5" /> Core LSS Belts (Classic Gold Theme)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {LSS_OPTIONS.map((b) => (
                                        <button
                                            key={b}
                                            onClick={() => updateField("credentialType", b)}
                                            className={`px-4 py-3 rounded-xl text-[10px] font-bold border transition-all ${
                                                formData.credentialType === b
                                                    ? `bg-gradient-to-br ${CREDENTIAL_STYLES[b]} shadow-lg`
                                                    : "bg-black/20 border-white/5 text-slate-500 hover:border-white/20"
                                            }`}
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                                
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                                    <Sparkles className="w-3.5 h-3.5" /> Advanced Methodologies (Executive Glass Theme)
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    {SPECIALTY_OPTIONS.map((b) => (
                                        <button
                                            key={b}
                                            onClick={() => updateField("credentialType", b)}
                                            className={`px-4 py-3 rounded-xl text-[10px] font-bold border transition-all ${
                                                formData.credentialType === b
                                                    ? `bg-gradient-to-br ${CREDENTIAL_STYLES[b]} shadow-lg`
                                                    : "bg-black/20 border-white/5 text-slate-500 hover:border-white/20"
                                            }`}
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Date */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" /> Completion
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.completionDate}
                                        onChange={(e) => updateField("completionDate", e.target.value)}
                                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                                {/* Score */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Sparkles className="w-3.5 h-3.5" /> Mastery (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.overallScore}
                                        onChange={(e) => updateField("overallScore", parseInt(e.target.value) || 0)}
                                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all font-bold"
                                    />
                                </div>
                            </div>

                            {/* Project */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Target className="w-3.5 h-3.5" /> Capstone Focus
                                </label>
                                <input
                                    type="text"
                                    value={formData.projectTitle}
                                    onChange={(e) => updateField("projectTitle", e.target.value)}
                                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all font-medium"
                                />
                            </div>

                            {/* Program Lead */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Briefcase className="w-3.5 h-3.5" /> Program Director
                                </label>
                                <input
                                    type="text"
                                    value={formData.instructorName}
                                    onChange={(e) => updateField("instructorName", e.target.value)}
                                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-sm text-white"
                                />
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <button
                                    onClick={handleGenerate}
                                    disabled={!isValid || isGenerating}
                                    className="w-full py-5 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all disabled:opacity-20 flex items-center justify-center gap-3 group"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Encrypting Nodes...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                                            Commit & Generate
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ─── Preview Panel ─────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="xl:col-span-8 h-full"
                >
                    <div className="h-full flex flex-col space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                    <Eye className="w-4 h-4 text-emerald-500" />
                                </div>
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">
                                    High-Fidelity Preview
                                </h2>
                            </div>
                            
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-400">Live Render Active</span>
                            </div>
                        </div>

                        <div className="relative flex-1 bg-slate-950 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl p-1 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
                            {!isGenerated ? (
                                <div className="text-center space-y-6 p-10 max-w-sm">
                                    <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-3xl flex items-center justify-center mx-auto animate-bounce">
                                        <Shield className="w-10 h-10 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-white font-black text-[10px] uppercase tracking-widest">Awaiting Verification</h3>
                                        <p className="text-slate-500 text-[10px] font-medium leading-relaxed">
                                            Please finalize the credential metadata and click <b>Commit & Generate</b> to fire the high-fidelity PDF engine.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full rounded-[2.3rem] overflow-hidden">
                                    <PDFViewer width="100%" height="800px" showToolbar={false}>
                                        <CertificateDocument data={certificateData} />
                                    </PDFViewer>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const LSS_LOGO = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
