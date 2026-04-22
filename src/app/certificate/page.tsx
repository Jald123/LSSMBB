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
} from "lucide-react";
import { CertificateDocument, type CertificateData } from "@/components/patterns/CertificateDocument";

// Dynamic import of PDFDownloadLink (client-only, no SSR)
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    { ssr: false, loading: () => <span className="text-sm text-muted-foreground">Loading PDF engine...</span> }
);

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false, loading: () => <div className="w-full h-96 bg-surface rounded-2xl animate-pulse" /> }
);

const BELT_OPTIONS: CertificateData["beltLevel"][] = [
    "White",
    "Yellow",
    "Green",
    "Black",
    "Master Black",
];

const BELT_STYLES: Record<string, string> = {
    White: "from-gray-200 to-gray-400 text-gray-900",
    Yellow: "from-yellow-300 to-yellow-500 text-yellow-900",
    Green: "from-emerald-400 to-emerald-600 text-white",
    Black: "from-gray-800 to-gray-950 text-white",
    "Master Black": "from-violet-500 to-purple-700 text-white",
};

export default function CertificatePage() {
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState<CertificateData>({
        recipientName: "",
        beltLevel: "Green",
        completionDate: new Date().toISOString().split("T")[0],
        projectTitle: "",
        overallScore: 92,
        instructorName: "",
        certificateId: "",
    });

    const isValid = formData.recipientName.trim().length > 0;

    const certificateData = useMemo<CertificateData>(
        () => ({
            ...formData,
            completionDate: new Date(formData.completionDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            certificateId: formData.certificateId || `NXS-${Date.now().toString(36).toUpperCase()}`,
        }),
        [formData]
    );

    const updateField = <K extends keyof CertificateData>(key: K, value: CertificateData[K]) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                        <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Certification Engine
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Generate high-fidelity Lean Six Sigma belt certificates
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* ─── Form Panel ─────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="p-6 bg-card border border-border rounded-2xl space-y-5">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-primary" />
                            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
                                Certificate Data
                            </h2>
                        </div>

                        {/* Recipient Name */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                <User className="w-3.5 h-3.5" /> Recipient Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter full name..."
                                value={formData.recipientName}
                                onChange={(e) => updateField("recipientName", e.target.value)}
                                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                            />
                        </div>

                        {/* Belt Level */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                <Shield className="w-3.5 h-3.5" /> Belt Level
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.beltLevel}
                                    onChange={(e) =>
                                        updateField("beltLevel", e.target.value as CertificateData["beltLevel"])
                                    }
                                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground appearance-none cursor-pointer focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                                >
                                    {BELT_OPTIONS.map((b) => (
                                        <option key={b} value={b}>
                                            {b} Belt
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                            {/* Belt preview pill */}
                            <div
                                className={`inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${BELT_STYLES[formData.beltLevel]}`}
                            >
                                <Sparkles className="w-3 h-3" />
                                {formData.beltLevel} Belt
                            </div>
                        </div>

                        {/* Completion Date */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                <Calendar className="w-3.5 h-3.5" /> Completion Date
                            </label>
                            <input
                                type="date"
                                value={formData.completionDate}
                                onChange={(e) => updateField("completionDate", e.target.value)}
                                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                            />
                        </div>

                        {/* Project Title */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                <Target className="w-3.5 h-3.5" /> Capstone Project{" "}
                                <span className="text-muted-foreground/40 font-normal">(optional)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. ER Wait Time Reduction"
                                value={formData.projectTitle || ""}
                                onChange={(e) => updateField("projectTitle", e.target.value)}
                                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                            />
                        </div>

                        {/* Score */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" /> Mastery Score (%)
                            </label>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={formData.overallScore || ""}
                                onChange={(e) =>
                                    updateField("overallScore", parseInt(e.target.value) || undefined)
                                }
                                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                            />
                        </div>

                        {/* Certificate ID */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                <Hash className="w-3.5 h-3.5" /> Certificate ID{" "}
                                <span className="text-muted-foreground/40 font-normal">(auto-generated)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="NXS-XXXXXXXX"
                                value={formData.certificateId || ""}
                                onChange={(e) => updateField("certificateId", e.target.value)}
                                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-colors font-mono"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            disabled={!isValid}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-surface border border-border rounded-xl text-sm font-semibold hover:bg-surface/80 hover:border-primary/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Eye className="w-4 h-4" />
                            {showPreview ? "Hide Preview" : "Preview Certificate"}
                        </button>

                        {isValid && (
                            <PDFDownloadLink
                                document={<CertificateDocument data={certificateData} />}
                                fileName={`Nexus_${formData.beltLevel}_Belt_${formData.recipientName.replace(/\s+/g, "_")}.pdf`}
                            >
                                {({ loading }) => (
                                    <button
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-60"
                                    >
                                        <Download className="w-4 h-4" />
                                        {loading ? "Generating PDF..." : "Download Certificate PDF"}
                                    </button>
                                )}
                            </PDFDownloadLink>
                        )}
                    </div>
                </motion.div>

                {/* ─── Preview Panel ─────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-3"
                >
                    {showPreview && isValid ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-primary" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
                                    Live Preview
                                </h2>
                            </div>
                            <div className="bg-card border border-border rounded-2xl overflow-hidden" style={{ height: "600px" }}>
                                <PDFViewer width="100%" height="100%" showToolbar={false}>
                                    <CertificateDocument data={certificateData} />
                                </PDFViewer>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-card/50 border border-dashed border-border rounded-2xl">
                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-6">
                                <Award className="w-12 h-12 text-primary/30" />
                            </div>
                            <p className="text-lg font-semibold text-muted-foreground mb-2">
                                Certificate Preview
                            </p>
                            <p className="text-sm text-muted-foreground/60 text-center max-w-sm">
                                Enter a recipient name and click &quot;Preview Certificate&quot; to see a live PDF
                                render of the certification document.
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
