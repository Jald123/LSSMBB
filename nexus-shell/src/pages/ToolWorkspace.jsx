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

    return (
        <div className="h-screen pt-16 flex flex-col bg-nexus-navy overflow-hidden">

            {/* 🔝 WORKSPACE TOP BAR */}
            <div className="h-16 glass-panel border-b border-nexus-border flex items-center justify-between px-6 z-[900] bg-black/40 backdrop-blur-3xl">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full border border-nexus-border flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all group"
                        title="Back to Journey"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <div className="w-px h-6 bg-nexus-border" />
                    <div className="flex flex-col leading-none">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black font-orbitron text-nexus-cyan tracking-widest uppercase">{tool.phase} Phase</span>
                            <div className="w-1 h-1 bg-slate-600 rounded-full" />
                            <button
                                onClick={() => markToolComplete(toolId)}
                                className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all text-[10px] font-black font-orbitron ${isCompleted ? 'bg-nexus-success/20 text-nexus-success' : 'hover:bg-white/5 text-slate-500 hover:text-white'}`}
                            >
                                {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-slate-700" />}
                                {isCompleted ? 'MISSION COMPLETE' : 'MARK AS DONE'}
                            </button>
                        </div>
                        <h1 className="text-xl font-black text-white font-orbitron tracking-tight truncate max-w-[200px]">{tool.name}</h1>
                    </div>
                </div>

                {/* Mode Switcher */}
                <div className="bg-black/60 p-1.5 rounded-full border border-white/5 flex shadow-inner">
                    <button
                        onClick={() => setViewMode('do')}
                        className={`px-8 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'do'
                            ? 'bg-nexus-cyan text-nexus-navy shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        <Terminal className="w-3 h-3" /> DO
                    </button>
                    <button
                        onClick={() => setViewMode('learn')}
                        className={`px-8 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'learn'
                            ? 'bg-nexus-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105'
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
                    <button
                        onClick={handleNextStation}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                    >
                        <span className="text-[10px] font-black font-orbitron text-slate-400 group-hover:text-white">
                            {nextTool ? 'NEXT STATION' : 'MISSION COMPLETE'}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-nexus-cyan" />
                    </button>
                </div>
            </div>

            {/* 🚀 WORKSPACE CANVASES (Split View) */}
            <div className="flex-1 flex overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {viewMode === 'do' ? (
                        <motion.div
                            key="do"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full"
                        >
                            <iframe
                                src={tool.src}
                                title={`Nexus Workspace - ${tool.name}`}
                                className="w-full h-full border-none bg-slate-900"
                                loading="lazy"
                                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="learn"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full bg-[#0a0f1c] flex flex-col items-center justify-center p-20 text-center"
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
                            <button className="mt-12 group flex items-center gap-3 text-slate-600 hover:text-nexus-purple transition-all font-orbitron font-black text-xs">
                                <Info className="w-4 h-4" /> ACCESS VIDEO DEBRIEFING
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative Grid Overlay for premium feel */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

        </div>
    );
};

export default ToolWorkspace;
