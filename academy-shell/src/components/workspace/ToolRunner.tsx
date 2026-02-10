"use client";

import { motion } from "framer-motion";
import {
    Save,
    History,
    FileUp,
    CheckCircle,
    MessageSquare,
    ChevronLeft,
    Info
} from "lucide-react";
import { useState, useEffect } from "react";

export function ToolRunner({ toolName, projectTitle }: { toolName: string, projectTitle: string }) {
    const [data, setData] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Simulated Autosave
    useEffect(() => {
        const timer = setTimeout(() => {
            if (data) {
                setIsSaving(true);
                setTimeout(() => {
                    setIsSaving(false);
                    setLastSaved(new Date());
                }, 800);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [data]);

    return (
        <div className="flex h-full bg-background relative">
            {/* 📜 Story Panel (Left) */}
            <aside className="w-80 border-r border-border p-8 bg-card flex flex-col gap-8">
                <div className="space-y-2">
                    <button className="text-[9px] font-black tracking-widest text-muted hover:text-foreground flex items-center gap-2 mb-6 uppercase">
                        <ChevronLeft className="w-3 h-3" /> Back to Board
                    </button>
                    <h2 className="text-2xl font-black uppercase tracking-tight leading-none">{projectTitle}</h2>
                    <div className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Current Phase: Define</div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted">
                        <Info className="w-3 h-3" /> Mission Context
                    </div>
                    <p className="text-xs leading-relaxed text-muted font-medium">
                        St. Jude Hospital is experiencing a bottleneck in the Emergency Room. Admission data indicates that the average patient stays in the 'waiting' state for 42 minutes before triage.
                    </p>
                    <p className="text-xs leading-relaxed text-muted font-medium">
                        Your goal for the **{toolName}** is to map out the current state and identify immediate waste.
                    </p>
                </div>

                <div className="mt-auto space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-4 border-b border-border pb-2">Required Evidence</div>
                    {['Patient Log Export (CSV)', 'Floor Layout Photo'].map(v => (
                        <div key={v} className="flex items-center gap-3 text-[10px] font-bold">
                            <div className="w-2 h-2 rounded-full border border-border" />
                            <span>{v}</span>
                        </div>
                    ))}
                </div>
            </aside>

            {/* 🛠️ Editor Area (Center) */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 px-10 border-b border-border flex items-center justify-between bg-card">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-black uppercase tracking-tight">{toolName}</h3>
                        <div className="w-1 h-1 rounded-full bg-border" />
                        <span className="text-[10px] text-muted font-bold">WORKING DRAFT V.1</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {isSaving ? (
                            <span className="text-[10px] font-black text-primary animate-pulse flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" /> AUTOSAVING...
                            </span>
                        ) : lastSaved && (
                            <span className="text-[10px] font-black text-muted uppercase">Last backup: {lastSaved.toLocaleTimeString()}</span>
                        )}
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-surface rounded-lg transition-colors text-muted hover:text-foreground"><History className="w-4 h-4" /></button>
                            <button className="p-2 hover:bg-surface rounded-lg transition-colors text-muted hover:text-foreground"><MessageSquare className="w-4 h-4" /></button>
                            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg text-xs font-black tracking-widest uppercase hover:opacity-90 transition-opacity">
                                <CheckCircle className="w-3 h-3" /> Mark Complete
                            </button>
                        </div>
                    </div>
                </header>

                <section className="flex-1 p-16 overflow-y-auto custom-scrollbar bg-surface/10">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="bg-card border border-border rounded-[2.5rem] p-12 shadow-sm space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black tracking-widest text-muted uppercase">01. Deliverable Objective</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Reduce ER admission variation by focus on Triage 2"
                                    className="w-full bg-surface border border-border p-6 rounded-2xl font-black text-xl outline-none focus:border-primary/50 transition-all"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black tracking-widest text-muted uppercase">02. Qualitative Analysis</label>
                                <textarea
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    placeholder="Enter the findings from your observations..."
                                    className="w-full bg-surface border border-border p-8 rounded-[2rem] h-64 font-medium text-sm leading-relaxed outline-none focus:border-primary/50 transition-all resize-none"
                                />
                            </div>

                            <div className="pt-8 border-t border-border flex justify-between items-center">
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-[10px] font-black uppercase hover:bg-card transition-colors">
                                        <FileUp className="w-3 h-3" /> Attach Evidence
                                    </button>
                                </div>
                                <p className="text-[9px] text-muted italic">All changes are synchronized with central hive.</p>
                            </div>
                        </div>

                        {/* Tool specific interactive area placeholder */}
                        <div className="h-64 rounded-[3rem] border border-dashed border-border flex flex-col items-center justify-center text-center gap-4 text-muted">
                            <Save className="w-8 h-8 opacity-20" />
                            <p className="text-xs tracking-widest font-black uppercase opacity-20">Interactive Tool Module Active</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
