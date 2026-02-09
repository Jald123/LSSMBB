import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Backpack,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Info,
    Layout,
    Maximize2,
    RefreshCcw,
    Terminal,
    AlertTriangle,
    FileText,
    Rocket,
    CheckCircle2
} from 'lucide-react';
import { toolRegistry } from '../data/toolRegistry';
import { methodologyData } from '../data/journeyData';
import { useNexus } from '../context/NexusContext';

const ToolWorkspace = () => {
    const { toolId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [viewMode, setViewMode] = useState(location.state?.mode || 'do');

    const { markToolComplete, completedTools, updateProgress, methodology } = useNexus();
    const tool = toolRegistry[toolId];

    // Identify Next Station Logic
    const activeMethodology = methodology.split(' ')[0].toUpperCase();
    const activePhases = methodologyData[activeMethodology] || methodologyData['DMAIC'];

    // Flatten tools list for navigation
    const allTools = Object.values(activePhases).flatMap(p => p.tools);
    const currentIndex = allTools.findIndex(t => t.id === toolId);
    const nextTool = allTools[currentIndex + 1];

    const handleNextStation = () => {
        if (nextTool) {
            navigate(`/workspace/${nextTool.id}`);
        } else {
            navigate('/journey');
        }
    };
    const isCompleted = completedTools.includes(toolId);

    // Update last visited tool in persistent state
    useEffect(() => {
        if (toolId) {
            updateProgress('lastToolId', toolId);
        }
    }, [toolId]);

    // --- Fallback Error State ---
    if (!tool) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-screen pt-16 flex items-center justify-center p-10"
            >
                <div className="max-w-md w-full glass-panel bg-nexus-error/10 border-nexus-error/30 p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-error/5 rounded-full blur-3xl -z-10" />
                    <AlertTriangle className="w-16 h-16 text-nexus-error mx-auto mb-6" />
                    <h2 className="text-3xl font-black font-orbitron text-white mb-4 uppercase tracking-tighter">Station Offline</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        The requested module identifier <code className="text-nexus-error font-mono px-2 py-0.5 bg-black/40 rounded">{toolId}</code> has not been registered in the Nexus database.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-white text-nexus-navy py-4 rounded-xl font-orbitron font-black text-xs hover:scale-105 transition-all"
                        >
                            RETURN TO HANGAR
                        </button>
                        <button
                            onClick={() => navigate('/journey')}
                            className="w-full bg-white/5 border border-white/10 py-4 rounded-xl font-orbitron font-black text-xs text-slate-400 hover:text-white transition-all"
                        >
                            VIEW MISSION MAP
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    // --- Iframe Injection to Hide Legacy Navs ---
    const handleIframeLoad = (e) => {
        try {
            const iframe = e.target;
            const doc = iframe.contentWindow.document;
            const style = doc.createElement('style');
            let cssRules = `
                /* Layout Reset */
                body { padding-top: 0 !important; margin: 0 !important; width: 100vw; height: 100vh; overflow-x: hidden; }
            `;

            if (toolId !== 'hoshin') {
                // For all tools EXCEPT Hoshin: Hide ONLY the legacy bottom navigation/footer
                // We keep the top headers visible as requested.
                cssRules += `
                    footer, .footer, .bottom-bar, .bottom-nav, #footer, .site-footer, .tool-nav-bottom, .navigation-bottom { display: none !important; }
                `;
            }
            // For Hoshin (toolId === 'hoshin'), we add NO extra hiding rules, 
            // so both its Header and Bottom Nav remain visible.

            style.textContent = cssRules;
            doc.head.appendChild(style);
        } catch (err) {
            console.warn("Could not inject styles into iframe (CORS limitation or other error):", err);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col bg-nexus-navy overflow-hidden relative">

            {/* 🔝 MINIMAL TOP BAR */}
            <div className="h-16 glass-panel border-b border-nexus-border flex items-center justify-between px-6 z-[900] bg-black/40 backdrop-blur-3xl absolute top-0 left-0 right-0">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full border border-nexus-border flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all group"
                        title="Back to Journey"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <div className="w-px h-6 bg-nexus-border" />
                    <div>
                        <span className="text-[10px] font-black font-orbitron text-nexus-cyan tracking-widest uppercase block mb-0.5">{tool.phase} Phase</span>
                        <h1 className="text-lg font-black text-white font-orbitron tracking-tight truncate max-w-[300px]">{tool.name}</h1>
                    </div>
                </div>

                {/* Mode Switcher */}
                <div className="bg-black/60 p-1 rounded-full border border-white/5 flex shadow-inner">
                    <button
                        onClick={() => setViewMode('do')}
                        className={`px-6 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'do'
                            ? 'bg-nexus-cyan text-nexus-navy shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        <Terminal className="w-3 h-3" /> DO
                    </button>
                    <button
                        onClick={() => setViewMode('learn')}
                        className={`px-6 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'learn'
                            ? 'bg-nexus-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        <FileText className="w-3 h-3" /> LEARN
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href={tool.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        title="Open in new window"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* 🚀 MAIN CONTENT */}
            <div className="flex-1 flex overflow-hidden relative pt-16">
                <AnimatePresence mode="wait">
                    {viewMode === 'do' ? (
                        <motion.div
                            key="do"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full pb-24" // Added padding-bottom for footer space
                        >
                            <iframe
                                src={tool.src}
                                onLoad={handleIframeLoad}
                                title={`Nexus Workspace - ${tool.name}`}
                                className="w-full h-full border-none bg-slate-900"
                                loading="lazy"
                                sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="learn"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full bg-[#0a0f1c] flex flex-col items-center justify-center p-20 text-center pb-32"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-nexus-purple/10 border border-nexus-purple/30 flex items-center justify-center mb-8">
                                <FileText className="w-12 h-12 text-nexus-purple" />
                            </div>
                            <h2 className="text-4xl font-black font-orbitron mb-4">Educational Rationale</h2>
                            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed mb-10 italic">
                                "Knowledge is the precursor to precision." <br />
                                This module contains the academic foundation, JCI compliance standards,
                                and benchmarking data for the {tool.name}.
                            </p>
                            <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
                                <div className="p-8 glass-panel border-nexus-purple/20 text-left">
                                    <div className="text-nexus-purple font-black font-orbitron text-[10px] tracking-widest mb-2 uppercase">Background</div>
                                    <h4 className="text-white font-bold mb-2">History & Origin</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">Understanding the evolution of {tool.name} in high-reliability organizations.</p>
                                </div>
                                <div className="p-8 glass-panel border-nexus-purple/20 text-left">
                                    <div className="text-nexus-purple font-black font-orbitron text-[10px] tracking-widest mb-2 uppercase">Compliance</div>
                                    <h4 className="text-white font-bold mb-2">Standards & JCI</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">How this tool satisfies international healthcare quality requirements.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 🎮 MISSION CONTROL FOOTER (Floating) */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-4">
                {/* Previous Component */}
                <button
                    onClick={() => {
                        const prevTool = allTools[currentIndex - 1];
                        if (prevTool) navigate(`/workspace/${prevTool.id}`);
                        else navigate('/journey');
                    }}
                    className="w-12 h-12 rounded-full glass-panel border border-nexus-border flex items-center justify-center text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-text-primary/5 transition-all shadow-lg active:scale-95 group"
                    title="Previous Station"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Central Command */}
                <motion.div
                    className="glass-panel border border-nexus-border/50 bg-nexus-surface/80 backdrop-blur-xl rounded-full px-2 py-2 flex items-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                >
                    <button
                        onClick={() => markToolComplete(toolId)}
                        className={`
                            relative flex items-center justify-center gap-3 px-8 py-3 rounded-full font-black font-orbitron text-xs tracking-widest transition-all duration-500
                            ${isCompleted
                                ? 'bg-gradient-to-r from-nexus-success to-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                                : 'bg-nexus-text-primary/5 hover:bg-nexus-text-primary/10 text-nexus-text-primary border border-nexus-border hover:border-nexus-cyan/30'
                            }
                        `}
                    >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-500" />}
                        {isCompleted ? 'COMPONENT SECURED' : 'MARK AS DONE'}

                        {/* Completion Particle Effect (Hidden by default, could be added) */}
                        {isCompleted && <motion.div layoutId="glow" className="absolute inset-0 bg-white/20 blur-xl rounded-full" />}
                    </button>
                </motion.div>

                {/* Next Component */}
                <button
                    onClick={handleNextStation}
                    className="group flex items-center gap-3 pl-5 pr-4 py-3 h-12 rounded-full glass-panel border border-nexus-border text-nexus-text-primary hover:bg-nexus-cyan/10 hover:border-nexus-cyan/30 transition-all shadow-lg active:scale-95"
                >
                    <span className="text-xs font-black font-orbitron tracking-widest">NEXT STATION</span>
                    <ChevronRight className="w-5 h-5 text-nexus-cyan group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </div>
    );
};

export default ToolWorkspace;
