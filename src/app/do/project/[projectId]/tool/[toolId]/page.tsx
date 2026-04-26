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
    Lightbulb,
    Home,
    ChevronLeft,
    ArrowUp,
    Library,
    Link,
    Search as SniperIcon,
    Pen,
    Trophy,
    Clock,
    Star,
    X
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
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [allTools, setAllTools] = useState<ToolMapping[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

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
                    
                    const tools = foundCase.phases.flatMap(p => p.tools);
                    setAllTools(tools);
                    setCurrentIndex(tools.findIndex(t => t.toolId === toolId));

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
                const resData = await response.json();
                setHasUnsavedChanges(false);
                setLastSaved(new Date().toLocaleTimeString());
                setLastServerSync(Date.now());
                
                if (status === 'not-started' && !isComplete) setStatus('in-progress');
                
                if (isComplete) {
                    setStatus('complete');
                    const deliverable = resData.deliverable;
                    showToast('SUCCESS', `Mission Verified. Mastery Score: ${deliverable.score}%`, 8000);
                    // We'll show the critique in a more prominent way
                    setResults({ score: deliverable.score, feedback: deliverable.feedback });
                    setTimeout(() => router.push(`/do/project/${projectId}/board`), 12000); // Longer delay to read critique
                } else {
                    showToast('INFO', "Data synchronized with terminal.");
                }
            }
        } catch (err) {
            showToast('ERROR', "Uplink failed. Check connection.");
        }
    };

    const [results, setResults] = useState<{score: number, feedback: string} | null>(null);

    const ResultsOverlay = () => {
        const isPassed = (results?.score || 0) >= 70;
        const feedbackParts = (results?.feedback || "").split('\n\n');
        const critiqueText = feedbackParts[0];
        const adviceText = feedbackParts[1];

        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[2000] bg-[#020617]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="max-w-2xl w-full bg-[#0f172a] border border-white/10 rounded-[2rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
                >
                    <div className={cn(
                        "absolute top-0 right-0 px-6 py-2 font-black italic text-[10px] tracking-[0.3em] uppercase",
                        isPassed ? "bg-emerald-500 text-black" : "bg-primary text-white"
                    )}>
                        {isPassed ? "MISSION PASSED" : "MISSION FAILED"}
                    </div>

                    <div className={cn(
                        "w-20 h-20 rounded-2xl border flex items-center justify-center mx-auto mb-8 shadow-lg",
                        isPassed ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-primary/10 border-primary/30 text-primary"
                    )}>
                        {isPassed ? <Trophy className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                    </div>
                    
                    <h2 className="text-3xl font-black font-orbitron text-white mb-2 italic tracking-tight">MISSION VERDICT</h2>
                    <p className="text-slate-500 font-black tracking-[0.3em] text-[9px] mb-10 uppercase">Mastery Analytics Unit 734</p>
                    
                    <div className="flex flex-col items-center gap-6 mb-12">
                        <div className={cn(
                            "text-7xl font-black font-orbitron tracking-tighter",
                            isPassed ? "text-emerald-500" : "text-white"
                        )}>
                            {results?.score}<span className="text-slate-500 text-4xl">%</span>
                        </div>
                        <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${results?.score}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={cn("h-full", isPassed ? "bg-emerald-500" : "bg-primary")}
                            />
                        </div>
                        {!isPassed && (
                            <p className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-wider">
                                Required Mastery: 70%
                            </p>
                        )}
                    </div>

                    <div className="space-y-4 mb-10 text-left">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                            <div className={cn("absolute top-0 left-0 w-1 h-full", isPassed ? "bg-emerald-500" : "bg-primary")} />
                            <h4 className="text-[9px] font-black font-orbitron text-slate-400 tracking-widest uppercase mb-3 flex items-center gap-2">
                                <Zap className="w-3 h-3 text-primary" /> Tactical Critique
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                {critiqueText}
                            </p>
                        </div>

                        {!isPassed && adviceText && (
                            <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                                <h4 className="text-[9px] font-black font-orbitron text-amber-500 tracking-widest uppercase mb-3 flex items-center gap-2">
                                    <Lightbulb className="w-3 h-3" /> Path to Mastery
                                </h4>
                                <p className="text-amber-200/70 text-xs leading-relaxed font-medium italic">
                                    {adviceText}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        {!isPassed && (
                            <Button 
                                variant="outline" 
                                size="lg" 
                                className="flex-1 py-7 font-black font-orbitron tracking-widest text-[10px] border-white/10"
                                onClick={() => setResults(null)}
                            >
                                STUDY CASE
                            </Button>
                        )}
                        <Button 
                            variant="nexus" 
                            size="lg" 
                            className="flex-[2] py-7 font-black font-orbitron tracking-widest text-[10px]"
                            onClick={() => router.push(`/do/project/${projectId}/board`)}
                        >
                            {isPassed ? "PROCEED TO NEXT SECTOR" : "EXIT TO TERMINAL"}
                            <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                    
                    <p className="mt-8 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                        Data Synchronized • {new Date().toLocaleTimeString()}
                    </p>
                </motion.div>
            </motion.div>
        );
    };

    const toggleFocusMode = () => {
        const nextMode = !isFocusMode;
        setIsFocusMode(nextMode);
        
        // Inject style to hide educational elements
        const css = nextMode ? `
            .mbb-wisdom, .edu-resource, .tutorial-panel, .hint-box, [class*="wisdom"], [class*="education"] { 
                display: none !important; 
            }
        ` : "";

        iframeRef.current?.contentWindow?.postMessage({
            type: 'INJECT_STYLE',
            css: css
        }, '*');
        
        showToast('INFO', nextMode ? "Focus Mode: Educational overlays suppressed." : "Focus Mode: Deactivated.");
    };

    const handleNext = () => {
        if (currentIndex < allTools.length - 1) {
            router.push(`/do/project/${projectId}/tool/${allTools[currentIndex + 1].toolId}`);
        } else {
            router.push(`/do/project/${projectId}/board`);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            router.push(`/do/project/${projectId}/tool/${allTools[currentIndex - 1].toolId}`);
        } else {
            router.push(`/do/project/${projectId}/board`);
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
                        <div className="flex items-center gap-3">
                            <h1 className="text-sm font-bold text-white tracking-tight">{caseData.title}</h1>
                            <div className="h-4 w-px bg-white/10 mx-1" />
                            {caseData.dataset?.briefingUrl && (
                                <a 
                                    href={caseData.dataset.briefingUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold text-slate-400 hover:text-primary hover:border-primary/50 transition-all uppercase tracking-widest"
                                >
                                    <Clock className="w-3 h-3" />
                                    Briefing
                                </a>
                            )}
                            {caseData.dataset?.rawDataUrl && (
                                <a 
                                    href={caseData.dataset.rawDataUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold text-slate-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all uppercase tracking-widest"
                                >
                                    <Database className="w-3 h-3" />
                                    Dataset
                                </a>
                            )}
                            {hasUnsavedChanges && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse ml-1" />}
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
                            variant="nexus" 
                            size="sm" 
                            className={cn(
                                "flex sm:flex border-white/5 transition-all",
                                isFocusMode ? "bg-amber-500 text-black shadow-lg" : "bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                            )}
                            onClick={toggleFocusMode}
                        >
                            <Zap className={cn("w-3.5 h-3.5 sm:mr-2", isFocusMode ? "fill-black" : "")} />
                            <span className="hidden sm:inline">{isFocusMode ? "Live Mode" : "Focus Mode"}</span>
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="hidden sm:flex border-white/5 hover:bg-surface"
                            onClick={() => iframeRef.current?.contentWindow?.postMessage({ type: 'TRIGGER_SAVE' }, '*')}
                        >
                            <Save className={cn("w-3.5 h-3.5 mr-2", hasUnsavedChanges ? "text-primary animate-pulse" : "")} />
                            Sync
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

            {/* 🎮 MISSION CONTROL FOOTER */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 p-1.5 rounded-full shell-interactive transition-all duration-300 footer-3d bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl">
                <button onClick={() => router.push(`/do/project/${projectId}/board`)} className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg" title="Back to Board"><Home className="w-4 h-4" /></button>
                <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg" title="Previous Tool"><ChevronLeft className="w-5 h-5" /></button>
                
                <button 
                    onClick={() => {
                        if (status !== 'complete' && confirm("Mark this deliverable as complete? Final data will be synchronized. This will consume 1 attempt.")) {
                            iframeRef.current?.contentWindow?.postMessage({ type: 'TRIGGER_COMPLETE' }, '*');
                        }
                    }} 
                    className={cn(
                        "relative flex items-center justify-center gap-3 px-8 h-10 rounded-full border font-black font-orbitron text-[10px] tracking-[0.2em] transition-all duration-500 active:scale-95 shadow-xl",
                        status === 'complete' 
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-400 text-white" 
                            : "bg-slate-800 border-slate-600 text-slate-200 hover:border-primary/50 hover:text-white"
                    )}
                >
                    {status === 'complete' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                    {status === 'complete' ? 'VERIFIED' : 'MARK DONE'}
                </button>

                <button onClick={handleNext} className="group flex items-center gap-3 pl-6 pr-5 h-10 rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all shadow-lg hover:text-white" title="Next Tool">
                    <span className="text-[10px] font-black font-orbitron tracking-widest leading-none">NEXT</span>
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                    onClick={() => { iframeRef.current?.contentWindow?.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg" 
                    title="Scroll to Top"
                >
                    <ArrowUp className="w-4 h-4" />
                </button>
            </div>

            <IntelligencePanel 
                isOpen={isIntelligenceOpen} 
                onClose={() => setIsIntelligenceOpen(false)}
                toolName={toolData?.toolName || "Unknown Tool"}
                phase={phaseName}
            />

            <AnimatePresence>
                {results && <ResultsOverlay />}
            </AnimatePresence>
        </div>
    );
}
