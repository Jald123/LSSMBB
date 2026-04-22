"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    CheckCircle2,
    Save,
    Loader2,
    Check,
    Cpu,
    Database,
    ShieldCheck,
    AlertCircle,
    ChevronRight,
    Zap,
    Download,
    Lightbulb
} from "lucide-react";
import { CASE_STUDIES, CaseStudy, ToolMapping } from "@/config/caseStudies";
import { useToast } from "@/components/ui/Toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { IntelligencePanel } from "@/components/panels/IntelligencePanel";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ToolExecutionView() {
    const params = useParams();
    const router = useRouter();
    const { showToast } = useToast();
    const projectId = params.projectId as string;
    const toolId = params.toolId as string;

    const [project, setProject] = useState<any>(null);
    const [caseData, setCaseData] = useState<CaseStudy | null>(null);
    const [toolData, setToolData] = useState<ToolMapping | null>(null);
    const [phaseName, setPhaseName] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [iframeLoading, setIframeLoading] = useState(true);
    const [status, setStatus] = useState<'not-started' | 'in-progress' | 'complete'>('not-started');
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    const [lastServerSync, setLastServerSync] = useState<number>(0);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(false);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // Fetch project and tool setup
        fetch(`/api/projects/${projectId}`)
            .then(res => res.json())
            .then(data => {
                if (data.project) {
                    setProject(data.project);
                    const foundCase = CASE_STUDIES.find(c => c.id === data.project.caseId) || CASE_STUDIES[0];
                    setCaseData(foundCase);

                    let foundTool: ToolMapping | null = null;
                    let foundPhase: string = "";
                    for (const phase of foundCase.phases) {
                        const t = phase.tools.find(t => t.toolId === toolId);
                        if (t) {
                            foundTool = t;
                            foundPhase = phase.name;
                            break;
                        }
                    }
                    setToolData(foundTool);
                    setPhaseName(foundPhase);

                    fetch(`/api/projects/${projectId}/deliverables/${toolId}`)
                        .then(res => res.json())
                        .then(dData => {
                            if (dData.deliverable) {
                                setStatus(dData.deliverable.status || 'not-started');
                                if (dData.deliverable.updatedAt) {
                                    setLastSaved(new Date(dData.deliverable.updatedAt).toLocaleTimeString());
                                }
                            }
                        })
                        .catch(() => console.log("No existing data found"));
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [projectId, toolId]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const { type, data } = event.data;
            if (type === 'SAVE_DELIVERABLE' || type === 'SAVE_DRAFT') {
                saveData(data, false);
            } else if (type === 'MARK_COMPLETE') {
                saveData(data, true);
            } else if (type === 'FORM_CHANGED') {
                setHasUnsavedChanges(true);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [phaseName]);

    const saveData = async (data: any, isComplete: boolean) => {
        try {
            const checkRes = await fetch(`/api/projects/${projectId}/deliverables/${toolId}`);
            const checkData = await checkRes.json();
            if (checkData.deliverable && new Date(checkData.deliverable.updatedAt).getTime() > lastServerSync && lastServerSync !== 0) {
                if (!confirm("Data Sync Conflict: Newer data exists on server. Overwrite?")) return;
            }

            const endpoint = isComplete
                ? `/api/projects/${projectId}/deliverables/${toolId}/complete`
                : `/api/projects/${projectId}/deliverables/${toolId}`;

            const response = await fetch(endpoint, {
                method: isComplete ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phase: phaseName,
                    data,
                    timestamp: new Date().toISOString()
                })
            });

            if (response.ok) {
                setHasUnsavedChanges(false);
                setLastSaved(new Date().toLocaleTimeString());
                setLastServerSync(Date.now());
                if (status === 'not-started' && !isComplete) setStatus('in-progress');
                if (isComplete) setStatus('complete');
                showToast(isComplete ? 'SUCCESS' : 'INFO', isComplete ? "Mission deliverable verified." : "Data synchronized with terminal.");
                if (isComplete) setTimeout(() => router.push(`/do/project/${projectId}/board`), 2000);
            }
        } catch (err) {
            showToast('ERROR', "Uplink failed. Check connection.");
        }
    };

    const handleIframeLoad = () => {
        setIframeLoading(false);
        fetch(`/api/projects/${projectId}/deliverables/${toolId}`)
            .then(res => res.json())
            .then(dData => {
                if (dData.deliverable?.data) {
                    setLastServerSync(new Date(dData.deliverable.updatedAt).getTime());
                    iframeRef.current?.contentWindow?.postMessage({
                        type: 'LOAD_SAVED_DATA',
                        data: dData.deliverable.data
                    }, '*');
                }
            });
    };

    if (loading || !toolData || !caseData) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-background space-y-6">
                <div className="relative">
                    <div className="w-20 h-20 rounded-2xl border-2 border-primary/20 animate-spin transition-all duration-1000" />
                    <Cpu className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                </div>
                <div className="text-center space-y-1">
                    <p className="text-[10px] font-black tracking-[0.4em] text-white uppercase opacity-70">Establishing Operation Stream</p>
                    <div className="flex justify-center gap-1.5 pt-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const toolUrl = toolData.htmlFile.includes('/') 
        ? `/${toolData.htmlFile}${toolData.htmlFile.includes('?') ? '&' : '?'}mode=do&projectId=${projectId}&toolId=${toolId}`
        : `/04-STATISTICS-TOOLS/${toolData.htmlFile}?mode=do&projectId=${projectId}&toolId=${toolId}`;

    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden selection:bg-primary/30">
            {/* High-Fidelity Tactical Header */}
            <header className="h-16 bg-card/60 backdrop-blur-xl border-b border-border px-6 flex items-center justify-between z-50 shadow-nexus-glow">
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => router.push(`/do/project/${projectId}/board`)}
                        className="p-2 hover:bg-surface rounded-xl border border-white/5 text-slate-400 hover:text-white transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="h-8 w-px bg-white/5" />
                    
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <span>{phaseName} Sector</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-slate-300">{toolData.toolName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-sm font-bold text-white tracking-tight">{caseData.title}</h1>
                            {hasUnsavedChanges && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Status Readout */}
                    <div className="hidden lg:flex items-center gap-6 pr-6 border-r border-white/5">
                        <div className="space-y-0.5 text-right">
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">Uplink Status</p>
                            <p className={cn(
                                "text-[10px] font-bold uppercase tracking-wider",
                                status === 'complete' ? "text-emerald-500" : "text-primary"
                            )}>
                                {status === 'complete' ? "MISSION VERIFIED" : "ONLINE / SYNCED"}
                            </p>
                        </div>
                        <div className="space-y-0.5 text-right">
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">Last Save</p>
                            <p className="text-[10px] font-bold text-slate-400">{lastSaved || "Standby"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button 
                            id="intel-panel"
                            variant="nexus" 
                            size="sm" 
                            className="flex sm:flex border-white/5 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                            onClick={() => setIsIntelligenceOpen(!isIntelligenceOpen)}
                        >
                            <Zap className="w-3.5 h-3.5 sm:mr-2" />
                            <span className="hidden sm:inline">Sensei</span>
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="hidden sm:flex border-white/5 hover:bg-surface"
                            onClick={() => iframeRef.current?.contentWindow?.postMessage({ type: 'TRIGGER_SAVE' }, '*')}
                        >
                            <Save className={cn("w-3.5 h-3.5 mr-2", hasUnsavedChanges ? "text-primary animate-pulse" : "")} />
                            Manual Sync
                        </Button>
                        <Button 
                            variant="nexus" 
                            size="sm" 
                            onClick={() => {
                                if (confirm("Mark this deliverable as complete? Final data will be synchronized.")) {
                                    iframeRef.current?.contentWindow?.postMessage({ type: 'TRIGGER_COMPLETE' }, '*');
                                }
                            }}
                            disabled={status === 'complete'}
                        >
                            Mark Complete
                        </Button>
                    </div>
                </div>
            </header>

            {/* Operations Viewport */}
            <div className="relative flex-1 bg-[#020617]">
                <AnimatePresence>
                    {iframeLoading && (
                        <motion.div 
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-background z-40"
                        >
                            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <div className="space-y-2 text-center">
                                <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase animate-pulse">Initializing Neural Link</span>
                                <div className="h-1 w-48 bg-surface rounded-full overflow-hidden border border-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <iframe
                    ref={iframeRef}
                    src={toolUrl}
                    className={cn(
                        "w-full h-full border-none transition-all duration-700",
                        iframeLoading ? "blur-md scale-95 opacity-0" : "blur-0 scale-100 opacity-100"
                    )}
                    onLoad={handleIframeLoad}
                />
            </div>

            {/* Tactical Footer / Metadata */}
            <footer className="h-8 bg-black/40 border-t border-white/5 px-6 flex items-center justify-between text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] relative z-50">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-primary" /> End-to-End Encrypted</span>
                    <span className="flex items-center gap-1.5"><Database className="w-3 h-3 text-primary" /> SQL Local Cache Active</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>Protocol v4.21 ALPHA</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
            </footer>

            <IntelligencePanel 
                isOpen={isIntelligenceOpen} 
                onClose={() => setIsIntelligenceOpen(false)}
                toolName={toolData?.toolName || "Unknown Tool"}
                phase={phaseName}
            />
        </div>
    );
}
