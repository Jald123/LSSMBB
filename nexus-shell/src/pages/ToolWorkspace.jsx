import React, { useState, useEffect, useRef } from 'react';
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
    CheckCircle2,
    Home,
    ArrowUp,
    Sun,
    Moon,
    Calculator,
    PenTool,
    Search,
    Minus,
    Plus,
    RotateCcw,
    Trash2,
    PlusCircle,
    Type,
    Bold,
    Italic,
    Underline,
    Eraser,
    Crosshair,
    ZoomIn
} from 'lucide-react';
import { toolRegistry } from '../data/toolRegistry';
import { methodologyData } from '../data/journeyData';
import { useNexus } from '../context/NexusContext';

const ToolWorkspace = () => {
    const { toolId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [viewMode, setViewMode] = useState(location.state?.mode || 'do');
    const [activeIframe, setActiveIframe] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [activeAssistantTool, setActiveAssistantTool] = useState(null); // 'notes', 'calculator', 'draw', 'search'

    const { markToolComplete, completedTools, updateProgress, methodology, theme, toggleTheme } = useNexus();
    const tool = toolRegistry[toolId];

    // --- STICKY NOTES STATE ---
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('nexus_notes');
        return saved ? JSON.parse(saved) : [{ id: 1, content: "Capture your tactical analysis here...", color: "#fef3c7" }];
    });
    const [activeNoteIndex, setActiveNoteIndex] = useState(0);

    const saveNotes = (updated) => {
        setNotes(updated);
        localStorage.setItem('nexus_notes', JSON.stringify(updated));
    };

    const addNote = () => {
        const newNote = { id: Date.now(), content: "New tactical note...", color: "#fef3c7" };
        const updated = [...notes, newNote];
        saveNotes(updated);
        setActiveNoteIndex(updated.length - 1);
    };

    const deleteNote = (index) => {
        if (notes.length === 1) return;
        const updated = notes.filter((_, i) => i !== index);
        saveNotes(updated);
        setActiveNoteIndex(Math.max(0, index - 1));
    };

    // --- CALCULATOR STATE ---
    const [calcDisplay, setCalcDisplay] = useState("0");
    const [calcExpr, setCalcExpr] = useState("");

    const handleCalcInput = (val) => {
        if (val === 'C') {
            setCalcDisplay("0");
            setCalcExpr("");
        } else if (val === '=') {
            try {
                // eslint-disable-next-line no-eval
                const result = eval(calcExpr || calcDisplay);
                setCalcDisplay(String(result));
                setCalcExpr("");
            } catch (e) {
                setCalcDisplay("Error");
            }
        } else {
            const nextDisplay = calcDisplay === "0" || calcDisplay === "Error" ? val : calcDisplay + val;
            setCalcDisplay(nextDisplay);
            setCalcExpr(calcExpr + (val === '×' ? '*' : val === '÷' ? '/' : val));
        }
    };

    // --- DRAWING CANVAS LOGIC ---
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawColor, setDrawColor] = useState("#fbbf24");
    const [drawWidth, setDrawWidth] = useState(5);

    useEffect(() => {
        if (activeAssistantTool === 'draw' && canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }, [activeAssistantTool]);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = drawWidth;
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    // Identify Next Station Logic
    const activeMethodology = methodology?.split(' ')[0].toUpperCase() || 'DMAIC';
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

    // Zoom Handling
    const handleZoom = (delta) => {
        setZoomLevel(prev => Math.min(Math.max(0.5, prev + delta), 2));
    };
    const resetZoom = () => setZoomLevel(1);

    // Update last visited tool in persistent state
    useEffect(() => {
        if (toolId) {
            updateProgress('lastToolId', toolId);
        }
    }, [toolId]);

    // Apply Zoom to Iframe
    useEffect(() => {
        if (activeIframe) {
            try {
                activeIframe.style.transform = `scale(${zoomLevel})`;
                activeIframe.style.transformOrigin = 'top center';
            } catch (e) {
                console.warn("Zoom error", e);
            }
        }
    }, [zoomLevel, activeIframe]);


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
                        <button onClick={() => navigate('/')} className="w-full bg-white text-nexus-navy py-4 rounded-xl font-orbitron font-black text-xs hover:scale-105 transition-all">RETURN TO HANGAR</button>
                        <button onClick={() => navigate('/journey')} className="w-full bg-white/5 border border-white/10 py-4 rounded-xl font-orbitron font-black text-xs text-slate-400 hover:text-white transition-all">VIEW MISSION MAP</button>
                    </div>
                </div>
            </motion.div>
        );
    }

    const handleIframeLoad = (e) => {
        try {
            const iframe = e.target;
            setActiveIframe(iframe);
            const doc = iframe.contentWindow.document;
            const style = doc.createElement('style');
            let cssRules = `body { padding-top: 0 !important; margin: 0 !important; width: 100vw; height: 100vh; overflow-x: hidden; }`;
            if (toolId !== 'hoshin') {
                cssRules += `footer, .footer, .bottom-bar, .bottom-nav, #footer, .site-footer, .tool-nav-bottom, .navigation-bottom, .universal-nav-bar { display: none !important; }`;
            }
            style.textContent = cssRules;
            doc.head.appendChild(style);
        } catch (err) {
            console.warn("Could not inject styles into iframe (CORS limitation or other error):", err);
        }
    };

    return (
        <div className={`h-screen w-full flex flex-col overflow-hidden relative ${theme === 'light' ? 'bg-slate-50' : 'bg-black'}`}>

            {/* 🔝 HEADER BAR */}
            <div className="h-16 glass-panel border-b border-nexus-border flex items-center justify-between px-6 z-[900] bg-black/40 backdrop-blur-3xl absolute top-0 left-0 right-0">
                <div className="flex items-center gap-6 w-1/4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full border border-nexus-border flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all group">
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <div className="w-px h-6 bg-nexus-border" />
                    <div>
                        <span className="text-[10px] font-black font-orbitron text-nexus-cyan tracking-widest uppercase block mb-0.5">{tool.phase} Phase</span>
                        <h1 className="text-lg font-black text-white font-orbitron tracking-tight truncate max-w-[200px]">{tool.name}</h1>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center gap-6">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setActiveAssistantTool(activeAssistantTool === 'notes' ? null : 'notes')}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'notes' ? 'bg-pink-500/20 text-pink-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                        >
                            <FileText className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveAssistantTool(activeAssistantTool === 'calculator' ? null : 'calculator')}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'calculator' ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                        >
                            <Calculator className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveAssistantTool(activeAssistantTool === 'draw' ? null : 'draw')}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'draw' ? 'bg-lime-500/20 text-lime-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                        >
                            <PenTool className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveAssistantTool(activeAssistantTool === 'search' ? null : 'search')}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'search' ? 'bg-violet-500/20 text-violet-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="w-px h-8 bg-nexus-border/50 mx-2" />
                    <div className="flex items-center gap-1">
                        <button onClick={() => handleZoom(-0.1)} className="w-8 h-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-indigo-400 flex items-center justify-center transition-all"><Minus className="w-4 h-4" /></button>
                        <button onClick={resetZoom} className="w-8 h-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-orange-400 flex items-center justify-center transition-all"><Home className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleZoom(0.1)} className="w-8 h-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="w-px h-8 bg-nexus-border/50 mx-2" />
                    <button onClick={toggleTheme} className="w-10 h-10 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-all group">
                        {theme === 'dark' ? <Sun className="w-4 h-4 group-hover:text-yellow-400" /> : <Moon className="w-4 h-4 group-hover:text-sky-400" />}
                    </button>
                </div>

                <div className="bg-black/60 p-1 rounded-full border border-white/5 flex shadow-inner w-1/4 justify-end">
                    <button onClick={() => setViewMode('do')} className={`px-5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'do' ? 'bg-nexus-cyan text-nexus-navy shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}><Terminal className="w-3 h-3" /> DO</button>
                    <button onClick={() => setViewMode('learn')} className={`px-5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'learn' ? 'bg-nexus-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}><FileText className="w-3 h-3" /> LEARN</button>
                </div>
            </div>

            {/* 🚀 MAIN CONTENT */}
            <div className="flex-1 flex overflow-hidden relative pt-16">
                <AnimatePresence mode="wait">
                    {viewMode === 'do' ? (
                        <motion.div key="do" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full pb-14">
                            <iframe src={tool.src} onLoad={handleIframeLoad} title={`Nexus Workspace - ${tool.name}`} className="w-full h-full border-none bg-slate-900 origin-top" loading="lazy" sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals" />
                        </motion.div>
                    ) : (
                        <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full bg-[#0a0f1c] flex flex-col items-center justify-center p-20 text-center pb-32">
                            <div className="w-24 h-24 rounded-3xl bg-nexus-purple/10 border border-nexus-purple/30 flex items-center justify-center mb-8"><FileText className="w-12 h-12 text-nexus-purple" /></div>
                            <h2 className="text-4xl font-black font-orbitron mb-4">Educational Rationale</h2>
                            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed mb-10 italic">"Knowledge is the precursor to precision." <br /> This module contains the academic foundation, JCI compliance standards, and benchmarking data for the {tool.name}.</p>
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

                {/* 🛠️ ASSISTANT OVERLAYS */}
                <AnimatePresence>
                    {activeAssistantTool === 'notes' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed top-20 right-8 w-96 z-[1000] drop-shadow-2xl">
                            <div className="glass-panel bg-[#1e293b] border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[500px]">
                                <div className="p-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400"><FileText className="w-4 h-4" /></div>
                                        <span className="font-orbitron font-black text-xs tracking-widest text-white">TACTICAL NOTES</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={addNote} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"><PlusCircle className="w-4 h-4" /></button>
                                        <button onClick={() => setActiveAssistantTool(null)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"><RotateCcw className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6">
                                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                                        {notes.map((note, idx) => (
                                            <button
                                                key={note.id}
                                                onClick={() => setActiveNoteIndex(idx)}
                                                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all ${activeNoteIndex === idx ? 'border-pink-500 scale-110 shadow-lg' : 'border-transparent opacity-50'}`}
                                                style={{ backgroundColor: note.color || '#fef3c7' }}
                                            />
                                        ))}
                                    </div>
                                    <div
                                        contentEditable
                                        className="w-full h-[300px] bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-pink-500/50 transition-all font-sans leading-relaxed"
                                        onBlur={(e) => {
                                            const updated = [...notes];
                                            updated[activeNoteIndex].content = e.target.innerHTML;
                                            saveNotes(updated);
                                        }}
                                        dangerouslySetInnerHTML={{ __html: notes[activeNoteIndex].content }}
                                    />
                                </div>
                                <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {['#fef3c7', '#dbeafe', '#dcfce7', '#f3e8ff', '#fce7f3'].map(c => (
                                            <button
                                                key={c}
                                                onClick={() => {
                                                    const updated = [...notes];
                                                    updated[activeNoteIndex].color = c;
                                                    saveNotes(updated);
                                                }}
                                                className="w-5 h-5 rounded-sm border border-black/20"
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                    <button onClick={() => deleteNote(activeNoteIndex)} className="text-pink-500/60 hover:text-pink-500 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeAssistantTool === 'calculator' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed top-20 right-8 w-72 z-[1000] drop-shadow-2xl">
                            <div className="glass-panel bg-black/90 border border-white/10 rounded-[2.5rem] overflow-hidden p-6">
                                <div className="text-right mb-6">
                                    <div className="text-slate-500 text-xs font-mono mb-1 h-4">{calcExpr}</div>
                                    <div className="text-white text-4xl font-light font-sans truncate">{calcDisplay}</div>
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
                                        <button
                                            key={btn}
                                            onClick={() => handleCalcInput(btn)}
                                            className={`h-12 rounded-full font-medium transition-all active:scale-95 flex items-center justify-center
                                                ${btn === '=' ? 'bg-orange-500 text-white col-span-1' :
                                                    ['C', '±', '%'].includes(btn) ? 'bg-slate-400 text-black' :
                                                        ['÷', '×', '-', '+'].includes(btn) ? 'bg-orange-500 text-white' :
                                                            btn === '0' ? 'bg-slate-700 text-white col-span-1' :
                                                                'bg-slate-700 text-white'}`}
                                        >
                                            {btn}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeAssistantTool === 'draw' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1500] pointer-events-none">
                            <canvas
                                ref={canvasRef}
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                className="w-full h-full pointer-events-auto cursor-crosshair"
                            />
                            <div className="absolute top-20 left-1/2 -translate-x-1/2 p-2 glass-panel bg-white/90 rounded-2xl border border-nexus-border flex items-center gap-4 pointer-events-auto shadow-2xl">
                                <div className="flex gap-2 pl-2">
                                    {['#000000', '#ef4444', '#3b82f6', '#10b981', '#fbbf24'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setDrawColor(c)}
                                            className={`w-6 h-6 rounded-full border-2 transition-all ${drawColor === c ? 'border-indigo-500 scale-110' : 'border-transparent'}`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                                <div className="w-px h-6 bg-slate-300" />
                                <div className="flex items-center gap-3">
                                    <PenTool className="w-4 h-4 text-slate-600" />
                                    <input type="range" min="1" max="20" value={drawWidth} onChange={(e) => setDrawWidth(parseInt(e.target.value))} className="w-24 accent-indigo-500" />
                                </div>
                                <div className="w-px h-6 bg-slate-300" />
                                <button onClick={clearCanvas} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="Clear Canvas"><Eraser className="w-4 h-4" /></button>
                                <button onClick={() => setActiveAssistantTool(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"><RotateCcw className="w-4 h-4" /></button>
                            </div>
                        </motion.div>
                    )}

                    {activeAssistantTool === 'search' && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-[1500] pointer-events-none flex items-center justify-center">
                            {/* Sniper Zoom Overlay Logic */}
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto" onClick={() => setActiveAssistantTool(null)} />
                            <div className="w-[300px] h-[300px] rounded-full border-[3px] border-nexus-cyan/50 shadow-[0_0_100px_rgba(34,211,238,0.3),inset_0_0_50px_rgba(0,0,0,0.8)] relative z-10 pointer-events-none overflow-hidden bg-transparent backdrop-contrast-150 backdrop-brightness-125 backdrop-saturate-150">
                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-nexus-cyan/30" />
                                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-nexus-cyan/30" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-nexus-cyan/20" />
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black font-orbitron text-nexus-cyan tracking-[0.3em] uppercase opacity-60">SNIPER LENS</div>
                            </div>
                            <div className="absolute top-24 left-1/2 -translate-x-1/2 px-6 py-3 glass-panel bg-black/80 rounded-full border border-nexus-cyan/30 flex items-center gap-4 text-white z-20 pointer-events-auto font-orbitron text-[10px] tracking-widest font-black uppercase">
                                <Crosshair className="w-4 h-4 text-nexus-cyan animate-pulse" />
                                ACTIVATE PRECISION SCAN
                                <div className="w-px h-4 bg-white/20" />
                                <button onClick={() => setActiveAssistantTool(null)} className="text-slate-400 hover:text-white transition-colors">EXIT</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 🎮 FOOTER NAVIGATOR */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 p-1.5 rounded-full bg-[#0f172a] border border-slate-600/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <button onClick={() => navigate('/')} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all active:scale-95 group" title="Home"><Home className="w-3.5 h-3.5" /></button>
                <button onClick={() => { const prevTool = allTools[currentIndex - 1]; if (prevTool) navigate(`/workspace/${prevTool.id}`); else navigate('/journey'); }} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all active:scale-95 group" title="Previous"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => markToolComplete(toolId)} className={`relative flex items-center justify-center gap-2 px-5 h-9 rounded-full border font-black font-orbitron text-[10px] tracking-widest transition-all duration-500 shadow-lg active:scale-95 ${isCompleted ? 'bg-gradient-to-r from-nexus-success to-emerald-600 border-nexus-success text-white' : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'}`}>
                    {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border-2 border-slate-400" />}
                    {isCompleted ? 'SECURED' : 'MARK DONE'}
                    {isCompleted && <motion.div layoutId="glow" className="absolute inset-0 bg-white/20 blur-xl rounded-full" />}
                </button>
                <button onClick={handleNextStation} className="group flex items-center gap-2 pl-4 pr-3 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all active:scale-95"><span className="text-[10px] font-black font-orbitron tracking-widest">NEXT</span><ChevronRight className="w-3.5 h-3.5 text-nexus-cyan group-hover:translate-x-1 transition-transform" /></button>
                <button onClick={() => { if (activeIframe?.contentWindow) activeIframe.contentWindow.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all active:scale-95 group" title="Scroll Top"><ArrowUp className="w-3.5 h-3.5" /></button>
            </div>
        </div>
    );
};

export default ToolWorkspace;
