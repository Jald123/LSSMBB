"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    ChevronRight,
    Terminal,
    FileText,
    CheckCircle2,
    Home,
    ArrowUp,
    ArrowRight,
    Library,
    Link,
    Sun,
    Moon,
    Calculator,
    Search,
    Minus,
    Plus,
    X,
    Eraser,
    Crosshair,
    Maximize2,
    Minimize2,
    Pen,
    Highlighter as HighlighterIcon,
    Pencil,
    Shield,
    ShieldAlert,
    Clock,
    Zap,
    Menu,
    Trash2,
    Bold as BoldIcon,
    Italic as ItalicIcon,
    Underline as UnderlineIcon
} from "lucide-react";
import { CASE_STUDIES, CaseStudy, ToolMapping } from "@/config/caseStudies";
import { useToast } from "@/components/ui/Toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { IntelligencePanel } from "@/components/panels/IntelligencePanel";
import { useNexus } from "@/context/NexusContext";

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

    // --- NEXUS OS UPGRADES ---
    const { theme, toggleTheme } = useNexus();
    const [isExecutionMode, setIsExecutionMode] = useState(false);
    const [activeAssistantTool, setActiveAssistantTool] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);
    
    // --- ATTEMPT MASTER SYSTEM ---
    const [attempts, setAttempts] = useState(1);
    const [maxAttempts] = useState(3);
    const [startTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState('00:00');

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const activeToolRef = useRef(activeAssistantTool);

    useEffect(() => {
        activeToolRef.current = activeAssistantTool;
    }, [activeAssistantTool]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            const diff = Math.floor((now - startTime) / 1000);
            const mins = Math.floor(diff / 60).toString().padStart(2, '0');
            const secs = (diff % 60).toString().padStart(2, '0');
            setElapsedTime(`${mins}:${secs}`);
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({ type: 'toggle-execution-mode', enabled: isExecutionMode }, '*');
        }
    }, [isExecutionMode]);

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
                                if (dData.deliverable.attempts) setAttempts(dData.deliverable.attempts);
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

    const handleNextStation = () => {
        if (!caseData || !toolData) return;
        const allTools = caseData.phases.flatMap(p => p.tools);
        const idx = allTools.findIndex(t => t.toolId === toolId);
        const next = allTools[idx + 1];
        if (next) router.push(`/do/project/${projectId}/tool/${next.toolId}`);
        else router.push(`/do/project/${projectId}/board`);
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFS = () => setIsFullScreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFS);
        return () => document.removeEventListener('fullscreenchange', handleFS);
    }, []);

    if (loading || !toolData || !caseData) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-background space-y-6">
                <div className="w-20 h-20 rounded-2xl border-2 border-primary/20 animate-spin" />
                <p className="text-[10px] font-black tracking-[0.4em] text-white uppercase opacity-70">Establishing Operation Stream</p>
            </div>
        );
    }

    const toolUrl = toolData.htmlFile.includes('/') 
        ? `/${toolData.htmlFile}${toolData.htmlFile.includes('?') ? '&' : '?'}mode=do&projectId=${projectId}&toolId=${toolId}`
        : `/04-STATISTICS-TOOLS/${toolData.htmlFile}?mode=do&projectId=${projectId}&toolId=${toolId}`;

    return (
        <div className={cn(
            "h-screen w-full flex flex-col overflow-hidden relative",
            theme === 'light' ? 'bg-slate-50' : 'bg-black'
        )}>
            {/* 🔝 NEXUS OS HEADER */}
            <div className={`h-16 flex items-center justify-between px-6 z-[900] absolute top-0 left-0 right-0 shell-interactive transition-all duration-300 header-3d`}>
                <div className="flex items-center gap-6 w-1/4">
                    <button onClick={() => router.push(`/do/project/${projectId}/board`)} className={`w-10 h-10 rounded-full border border-nexus-border flex items-center justify-center transition-all group ${theme === 'light' ? 'text-nexus-text-secondary hover:bg-slate-100 hover:text-nexus-text-primary' : 'text-nexus-text-secondary hover:bg-white/5 hover:text-nexus-text-primary'}`}>
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <div className="w-px h-6 bg-nexus-border" />
                    <div>
                        <span className="text-[10px] font-black font-orbitron text-nexus-cyan tracking-widest uppercase block mb-0.5">{phaseName} Phase</span>
                        <h1 className={`text-lg font-black font-orbitron tracking-tight truncate max-w-[200px] ${theme === 'light' ? 'text-nexus-text-primary' : 'text-white'}`}>{toolData.toolName}</h1>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center gap-6">
                    <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-xl border border-white/5 mx-2">
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'notes' ? null : 'notes')} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${activeAssistantTool === 'notes' ? 'bg-pink-500/20 text-pink-400 font-bold' : 'text-nexus-text-secondary hover:text-white'}`}><FileText className="w-4 h-4" /></button>
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'library' ? null : 'library')} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${activeAssistantTool === 'library' ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-nexus-text-secondary hover:text-white'}`}><Library className="w-4 h-4" /></button>
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'calculator' ? null : 'calculator')} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${activeAssistantTool === 'calculator' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-nexus-text-secondary hover:text-white'}`}><Terminal className="w-4 h-4" /></button>
                        <button onClick={() => setIsIntelligenceOpen(!isIntelligenceOpen)} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${isIntelligenceOpen ? 'bg-nexus-cyan/20 text-nexus-cyan font-bold' : 'text-nexus-text-secondary hover:text-white'}`}><Zap className="w-4 h-4" /></button>
                    </div>
                    
                    <div className="w-px h-8 bg-nexus-border/50 mx-2" />
                    
                    <div className="flex items-center gap-1">
                        <button onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all"><Minus className="w-4 h-4" /></button>
                        <button onClick={() => setZoomLevel(1)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all"><Home className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.1))} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all"><Plus className="w-4 h-4" /></button>
                    </div>

                    <div className="w-px h-8 bg-nexus-border/50 mx-2" />

                    <button onClick={toggleTheme} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all">
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                    <button onClick={toggleFullScreen} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all">
                        {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                </div>

                <div className={`p-1 rounded-full border flex shadow-inner overflow-hidden ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-black/60 border-white/5'}`}>
                    <button 
                        onClick={() => setIsExecutionMode(false)} 
                        className={`px-5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${!isExecutionMode ? 'bg-nexus-cyan text-nexus-navy shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Terminal className="w-3 h-3" /> TRAINING
                    </button>
                    <button 
                        onClick={() => setIsExecutionMode(true)} 
                        className={`px-5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${isExecutionMode ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <ShieldAlert className="w-3 h-3" /> EXECUTION
                    </button>
                </div>
            </div>

            {/* 🚀 MAIN CONTENT */}
            <div className="flex-1 flex overflow-hidden relative pt-16 p-4 pb-20">
                {/* Attempt Info Overlay */}
                <div className="absolute top-20 left-10 z-[800] flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/5">
                        <Clock className="w-3.5 h-3.5 text-nexus-cyan" />
                        <span className="text-xs font-black font-orbitron text-white">{elapsedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                        <Zap className="w-3.5 h-3.5 text-nexus-gold" />
                        <span className="text-xs font-black font-orbitron text-white tracking-widest uppercase">{attempts}/{maxAttempts} ATTEMPTS</span>
                    </div>
                </div>

                <div className={cn(
                    "w-full h-full overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 p-1.5",
                    theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-white/5'
                )}>
                    <iframe
                        ref={iframeRef}
                        src={toolUrl}
                        className={cn(
                            "w-full h-full border-none origin-top rounded-xl transition-all duration-700",
                            isExecutionMode ? "filtering-edu-content" : "",
                            iframeLoading ? "blur-md opacity-0" : "blur-0 opacity-100"
                        )}
                        onLoad={handleIframeLoad}
                        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                    />
                </div>
            </div>

            {/* 🎮 MISSION CONTROL FOOTER */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-6 p-2 rounded-[2.5rem] bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] shell-interactive transition-all duration-300`}>
                <div className="flex items-center gap-2 px-4 border-r border-white/5">
                    <button onClick={() => router.push('/')} className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"><Home className="w-4 h-4" /></button>
                </div>

                <button 
                    onClick={() => {
                        if (confirm("Mark this deliverable as complete? Final data will be synchronized.")) {
                            iframeRef.current?.contentWindow?.postMessage({ type: 'TRIGGER_COMPLETE' }, '*');
                        }
                    }}
                    disabled={status === 'complete'}
                    className={cn(
                        "relative flex items-center justify-center gap-3 px-12 h-12 rounded-[2rem] font-black font-orbitron text-[11px] tracking-[0.2em] transition-all duration-500 active:scale-95 group overflow-hidden",
                        status === 'complete' 
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-400 text-white shadow-[0_0_40px_rgba(16,185,129,0.6)]' 
                        : 'bg-primary text-black shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:bg-nexus-cyan hover:shadow-[0_0_50px_rgba(34,211,238,0.7)] hover:scale-105'
                    )}
                >
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
                    {status === 'complete' ? <CheckCircle2 className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    {status === 'complete' ? 'PROTOCOL SECURED' : 'MARK COMPLETE'}
                </button>

                <div className="flex items-center gap-2 px-4 border-l border-white/5">
                    <button onClick={handleNextStation} className="w-16 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-nexus-cyan transition-all group/next"><ChevronRight className="w-5 h-5 group-hover/next:translate-x-1" /></button>
                    <button onClick={() => { if (iframeRef.current?.contentWindow) iframeRef.current.contentWindow.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"><ArrowUp className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Execution mode style override */}
            {isExecutionMode && (
                <style dangerouslySetInnerHTML={{ __html: `
                    iframe.filtering-edu-content { filter: brightness(1.05) contrast(1.1); pointer-events: auto !important; }
                `}} />
            )}

            <IntelligencePanel 
                isOpen={isIntelligenceOpen} 
                onClose={() => setIsIntelligenceOpen(false)}
                toolName={toolData?.toolName || "Unknown Tool"}
                phase={phaseName}
            />
        </div>
    );
}
