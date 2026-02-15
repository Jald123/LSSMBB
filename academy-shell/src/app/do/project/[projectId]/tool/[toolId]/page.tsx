"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    CheckCircle2,
    Save,
    Loader2,
    Check
} from "lucide-react";
import { CASE_STUDIES, CaseStudy, ToolMapping } from "@/config/caseStudies";
import { useToast } from "@/components/ui/Toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // Fetch project and tool setup
        fetch(`/api/projects/${projectId}`)
            .then(res => res.json())
            .then(data => {
                if (data.project) {
                    setProject(data.project);
                    const foundCase = CASE_STUDIES.find(c => c.id === data.project.caseStudyId) || CASE_STUDIES[0];
                    setCaseData(foundCase);

                    // Find the tool in the case phases
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

                    // Fetch existing deliverable data
                    fetch(`/api/projects/${projectId}/deliverables/${toolId}`)
                        .then(res => res.json())
                        .then(dData => {
                            if (dData.deliverable) {
                                setStatus(dData.deliverable.status || 'not-started');
                                if (dData.deliverable.updatedAt) {
                                    setLastSaved(new Date(dData.deliverable.updatedAt).toLocaleTimeString());
                                }
                                // Data will be sent to iframe once it loads
                            }
                        })
                        .catch(() => console.log("No existing data found"));
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [projectId, toolId]);

    // postMessage Listener
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const { type, data, timestamp } = event.data;

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

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                // Tell iframe to save
                iframeRef.current?.contentWindow?.postMessage({ type: 'TRIGGER_SAVE' }, '*');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Navigation Guard
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    const saveData = async (data: any, isComplete: boolean) => {
        try {
            // Conflict Resolution Check
            const checkRes = await fetch(`/api/projects/${projectId}/deliverables/${toolId}`);
            const checkData = await checkRes.json();
            if (checkData.deliverable && new Date(checkData.deliverable.updatedAt).getTime() > lastServerSync) {
                if (!confirm("Conflict detected: Someone else (or you in another tab) has saved newer data. Overwrite their changes?")) {
                    showToast('INFO', "Save cancelled to prevent data loss.");
                    return;
                }
            }

            const endpoint = isComplete
                ? `/api/projects/${projectId}/deliverables/${toolId}/complete`
                : `/api/projects/${projectId}/deliverables/${toolId}`;

            const method = isComplete ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phase: phaseName,
                    data,
                    timestamp: new Date().toISOString()
                })
            });

            if (response.status === 401) {
                // Session expired
                const backupKey = `unsaved_${projectId}_${toolId}`;
                localStorage.setItem(backupKey, JSON.stringify(data));
                showToast('WARNING', "Session expired. Saving draft locally and redirecting to login...");
                setTimeout(() => {
                    window.location.href = `/login?expired=true&returnUrl=${encodeURIComponent(window.location.pathname)}`;
                }, 2000);
                return;
            }

            if (response.ok) {
                setHasUnsavedChanges(false);
                setLastSaved(new Date().toLocaleTimeString());
                setLastServerSync(Date.now());
                if (status === 'not-started' && !isComplete) setStatus('in-progress');

                if (isComplete) {
                    setStatus('complete');
                    showToast('SUCCESS', `${toolData?.toolName || 'Tool'} marked as complete ✓`);
                } else {
                    showToast('SUCCESS', `${toolData?.toolName || 'Tool'} saved to project`);
                }

                iframeRef.current?.contentWindow?.postMessage({ type: 'SAVE_CONFIRMED' }, '*');

                if (isComplete) {
                    setTimeout(() => {
                        router.push(`/do/project/${projectId}/board`);
                    }, 1500);
                }
            } else {
                showToast('ERROR', "Failed to save. Please try again.");
                iframeRef.current?.contentWindow?.postMessage({ type: 'SAVE_ERROR', message: 'Failed to save to server' }, '*');
            }
        } catch (err) {
            showToast('ERROR', "Save failed. Check your connection.");
            iframeRef.current?.contentWindow?.postMessage({ type: 'SAVE_ERROR', message: 'Connection error' }, '*');
        }
    };

    const handleIframeLoad = () => {
        setIframeLoading(false);
        // Pre-populate data if we have it
        fetch(`/api/projects/${projectId}/deliverables/${toolId}`)
            .then(res => res.json())
            .then(dData => {
                if (dData.deliverable && dData.deliverable.data) {
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
            <div className="h-screen flex flex-col items-center justify-center bg-[#e8f9fd] space-y-4">
                <Loader2 className="w-10 h-10 text-[#ff1e00] animate-spin" />
                <div className="text-center">
                    <p className="text-[10px] font-black tracking-[0.3em] text-[#1a1a2e] uppercase">ESTABLISHING OPERATIONAL CHANNEL</p>
                    <div className="mt-2 flex justify-center gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1.5 h-1.5 bg-[#ff1e00] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const toolUrl = `/tools/${toolData.htmlFile}?mode=do&projectId=${projectId}&caseId=${caseData.id}&toolId=${toolId}&phase=${phaseName}&caseTitle=${encodeURIComponent(caseData.title)}`;

    return (
        <div className="h-screen flex flex-col bg-[#e8f9fd] overflow-hidden">
            {/* Top Bar */}
            <header className="h-[52px] bg-white border-b-2 border-[#ff1e00] px-6 flex items-center justify-between shrink-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            if (hasUnsavedChanges) {
                                if (confirm("You have unsaved changes. Save before leaving?")) {
                                    iframeRef.current?.contentWindow?.postMessage({ type: 'TRIGGER_SAVE' }, '*');
                                    return;
                                }
                            }
                            router.push(`/do/project/${projectId}/board`);
                        }}
                        className="p-1 hover:bg-[#f3f4f6] rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#1a1a2e]" />
                    </button>
                    <div className="flex items-center gap-2 text-xs font-bold tracking-tight">
                        <span className="text-[#4b5563] uppercase opacity-60">Sprint Board</span>
                        <span className="text-[#4b5563]">/</span>
                        <span className="text-[#4b5563] uppercase opacity-60">{phaseName}</span>
                        <span className="text-[#4b5563]">/</span>
                        <span className="text-[#1a1a2e] uppercase">{toolData.toolName}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-[#4b5563] uppercase tracking-widest">{caseData.title}</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        status === 'complete' ? "bg-[#59ce8f]/10 text-[#59ce8f]" :
                            status === 'in-progress' ? "bg-[#ff1e00]/10 text-[#ff1e00]" :
                                "bg-[#f3f4f6] text-[#4b5563]"
                    )}>
                        {status === 'complete' ? "MISSION COMPLETE" : status === 'in-progress' ? "IN PROGRESS" : "NOT STARTED"}
                        {status === 'complete' && <Check className="w-3 h-3" />}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", lastSaved ? "bg-[#59ce8f]" : "bg-[#d1d5db]")} />
                        <span className="text-[10px] font-bold text-[#4b5563]">
                            {lastSaved ? `Saved ${lastSaved}` : "Waiting for input"}
                        </span>
                    </div>
                </div>
            </header>

            {/* Iframe Area */}
            <div className="relative flex-1 bg-[#e8f9fd]">
                {iframeLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-[#e8f9fd] z-10 transition-opacity">
                        <Loader2 className="w-8 h-8 text-[#ff1e00] animate-spin" />
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#1a1a2e] uppercase">INITIALIZING OPERATIONAL VIEW</span>
                    </div>
                )}
                <iframe
                    ref={iframeRef}
                    src={toolUrl}
                    className={cn(
                        "w-full h-full border-none transition-opacity duration-500",
                        iframeLoading ? "opacity-0" : "opacity-100"
                    )}
                    onLoad={handleIframeLoad}
                />
            </div>

            {/* Success Overlay for Completion */}
            {status === 'complete' && (
                <div className="fixed inset-0 bg-[#e8f9fd]/60 backdrop-blur-sm z-[100] flex items-center justify-center pointer-events-none animate-in fade-in duration-500">
                    <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-[#59ce8f] flex flex-col items-center gap-6 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 rounded-full bg-[#59ce8f] flex items-center justify-center text-white shadow-lg shadow-[#59ce8f]/30">
                            <Check className="w-10 h-10 stroke-[3px]" />
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black uppercase text-[#1a1a2e]">{toolData.toolName}</h2>
                            <p className="text-[#6b7280] font-bold text-sm tracking-[0.1em] uppercase">Deliverable Captured & Synchronized</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
