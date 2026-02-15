import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Terminal,
    AlertTriangle,
    FileText,
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
    Menu,
    X,
    Bold as BoldIcon,
    Italic as ItalicIcon,
    Underline as UnderlineIcon,
    Strikethrough,
    List,
    Type,
    Eraser,
    Crosshair,
    Maximize2,
    Pen,
    Highlighter as HighlighterIcon,
    Pencil,
    Ruler,
    RefreshCw,
    Layers
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
    const [activeAssistantTool, setActiveAssistantTool] = useState(null); // 'notes', 'calculator', 'draw', 'sniper'

    const { markToolComplete, completedTools, updateProgress, methodology, theme, toggleTheme } = useNexus();
    const tool = toolRegistry[toolId];

    // --- ESCAPE KEY HANDLER ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveAssistantTool(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // --- STICKY NOTES STATE ---
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('nexus_notes_v4');
        return saved ? JSON.parse(saved) : [{ id: 1, content: "Capture your tactical analysis here...", color: "#fef3c7" }];
    });
    const [activeNoteIndex, setActiveNoteIndex] = useState(0);
    const [showNotesMenu, setShowNotesMenu] = useState(false);
    const editorRef = useRef(null);

    const noteColors = [
        { bg: "#fef3c7", text: "#92400e" }, { bg: "#dcfce7", text: "#166534" },
        { bg: "#fce7f3", text: "#9d174d" }, { bg: "#f3e8ff", text: "#6b21a8" },
        { bg: "#dbeafe", text: "#1e40af" }, { bg: "#f3f4f6", text: "#475569" },
        { bg: "#1e293b", text: "#f8fafc" }
    ];

    const saveNotes = (updated) => {
        setNotes(updated);
        localStorage.setItem('nexus_notes_v4', JSON.stringify(updated));
    };

    const addNote = () => {
        const newNote = { id: Date.now(), content: "New Note Content...", color: "#fef3c7" };
        const updated = [...notes, newNote];
        saveNotes(updated);
        setActiveNoteIndex(updated.length - 1);
        setShowNotesMenu(false);
    };

    const deleteNote = () => {
        if (notes.length === 1) {
            saveNotes([{ id: Date.now(), content: "", color: "#fef3c7" }]);
            setActiveNoteIndex(0);
            return;
        }
        const updated = notes.filter((_, i) => i !== activeNoteIndex);
        saveNotes(updated);
        setActiveNoteIndex(Math.max(0, activeNoteIndex - 1));
    };

    const execCommand = (cmd, val = null) => {
        document.execCommand(cmd, false, val);
        if (editorRef.current) {
            const updated = [...notes];
            updated[activeNoteIndex].content = editorRef.current.innerHTML;
            saveNotes(updated);
        }
    };

    // --- CALCULATOR STATE ---
    const [calcDisplay, setCalcDisplay] = useState("0");
    const [calcExpr, setCalcExpr] = useState("");
    const handleCalcInput = (val) => {
        if (val === 'C') { setCalcDisplay("0"); setCalcExpr(""); }
        else if (val === '=') {
            try {
                const result = eval(calcExpr || calcDisplay);
                setCalcDisplay(String(result)); setCalcExpr("");
            } catch (e) { setCalcDisplay("Error"); }
        } else {
            const nextDisplay = calcDisplay === "0" || calcDisplay === "Error" ? val : calcDisplay + val;
            setCalcDisplay(nextDisplay);
            setCalcExpr(calcExpr + (val === '×' ? '*' : val === '÷' ? '/' : val));
        }
    };

    // --- SNIPER / LENS STATE ---
    const [sniperMode, setSniperMode] = useState('lens');
    const [lensScale, setLensScale] = useState(2);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (activeAssistantTool === 'sniper' || activeAssistantTool === 'draw') {
            setMousePos({ x: e.clientX, y: e.clientY });
        }
    };

    const handleWheel = (e) => {
        if (activeAssistantTool === 'sniper') {
            setLensScale(prev => Math.min(Math.max(1.2, prev + (e.deltaY > 0 ? -0.1 : 0.1)), 5));
        }
    };

    // --- DRAWING CANVAS LOGIC ---
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawMode, setDrawMode] = useState('pen');
    const [drawColor, setDrawColor] = useState("#000000");
    const [drawWidth, setDrawWidth] = useState(5);
    const [drawOpacity, setDrawOpacity] = useState(1.0);

    useEffect(() => {
        if (activeAssistantTool === 'draw' && canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        }
    }, [activeAssistantTool]);

    const startDrawing = (e) => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        setIsDrawing(true);
    };

    const drawAction = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        ctx.strokeStyle = drawColor;
        ctx.lineWidth = drawWidth;

        if (drawMode === 'highlighter') {
            ctx.globalAlpha = drawOpacity;
            ctx.lineCap = 'butt';
        } else {
            ctx.globalAlpha = drawMode === 'pencil' ? 0.6 : 1.0;
            ctx.lineCap = 'round';
        }

        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
    };

    const stopDrawing = () => setIsDrawing(false);
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
    const allTools = Object.values(activePhases).flatMap(p => p.tools);
    const currentIndex = allTools.findIndex(t => t.id === toolId);
    const nextTool = allTools[currentIndex + 1];

    const handleNextStation = () => { if (nextTool) navigate(`/workspace/${nextTool.id}`); else navigate('/journey'); };
    const isCompleted = completedTools.includes(toolId);

    const handleZoom = (delta) => setZoomLevel(prev => Math.min(Math.max(0.5, prev + delta), 2));
    const resetZoom = () => setZoomLevel(1);

    useEffect(() => { if (toolId) updateProgress('lastToolId', toolId); }, [toolId]);

    useEffect(() => {
        if (activeIframe) {
            activeIframe.style.transform = `scale(${zoomLevel})`;
            activeIframe.style.transformOrigin = 'top center';
        }
    }, [zoomLevel, activeIframe]);

    const handleIframeLoad = (e) => {
        setActiveIframe(e.target);
        try {
            const doc = e.target.contentWindow.document;
            const style = doc.createElement('style');
            let cssRules = `body { padding-top: 0 !important; margin: 0 !important; width: 100vw; height: 100vh; overflow-x: hidden; }`;
            if (toolId !== 'hoshin') cssRules += `footer, .footer, .bottom-bar, .bottom-nav, #footer, .site-footer, .universal-nav-bar { display: none !important; }`;
            style.textContent = cssRules;
            doc.head.appendChild(style);
        } catch (err) { console.warn("Iframe style injection error:", err); }
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
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'notes' ? null : 'notes')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'notes' ? 'bg-pink-500/20 text-pink-400 font-bold shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}><FileText className="w-4 h-4" /></button>
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'calculator' ? null : 'calculator')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'calculator' ? 'bg-cyan-500/20 text-cyan-400 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}><Calculator className="w-4 h-4" /></button>
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'draw' ? null : 'draw')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'draw' ? 'bg-lime-500/20 text-lime-400 font-bold shadow-[0_0_10px_rgba(132,204,22,0.3)]' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}><PenTool className="w-4 h-4" /></button>
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'sniper' ? null : 'sniper')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'sniper' ? 'bg-violet-500/20 text-violet-400 font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)]' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}><Search className="w-4 h-4" /></button>
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
                    <div className="text-[10px] text-slate-600 font-orbitron font-black ml-2 uppercase opacity-50 tracking-widest">AST-V2</div>
                </div>

                <div className="bg-black/60 p-1 rounded-full border border-white/5 flex shadow-inner w-1/4 justify-end">
                    <button onClick={() => setViewMode('do')} className={`px-5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'do' ? 'bg-nexus-cyan text-nexus-navy shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}><Terminal className="w-3 h-3" /> DO</button>
                    <button onClick={() => setViewMode('learn')} className={`px-5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'learn' ? 'bg-nexus-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}><FileText className="w-3 h-3" /> LEARN</button>
                </div>
            </div>

            {/* 🚀 MAIN CONTENT */}
            <div className="flex-1 flex overflow-hidden relative pt-16">

                {/* 🥷 TRANSPARENT EVENT CAPTURE LAYER */}
                {(activeAssistantTool === 'sniper' || activeAssistantTool === 'draw') && (
                    <div
                        onMouseMove={handleMouseMove}
                        onWheel={handleWheel}
                        onMouseDown={activeAssistantTool === 'draw' ? startDrawing : null}
                        onMouseMoveCapture={activeAssistantTool === 'draw' ? drawAction : null}
                        onMouseUp={activeAssistantTool === 'draw' ? stopDrawing : null}
                        className="fixed inset-0 z-[1200] bg-transparent cursor-none"
                    />
                )}

                <div className="w-full h-full pb-14 overflow-hidden">
                    <iframe src={tool.src} onLoad={handleIframeLoad} title={tool.name} className="w-full h-full border-none bg-slate-900 origin-top" loading="lazy" sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals" />
                </div>

                {/* 🛠️ ASSISTANT OVERLAYS */}
                <AnimatePresence>
                    {activeAssistantTool === 'notes' && (
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed top-20 right-8 w-[450px] z-[1300] drop-shadow-2xl">
                            <div className="bg-[#1e293b] rounded-2xl overflow-hidden flex flex-col h-[550px] border border-white/5 shadow-2xl">
                                <div className="flex h-3 w-full border-b border-black/10">
                                    {noteColors.map((c, i) => (
                                        <div key={i} onClick={() => { const updated = [...notes]; updated[activeNoteIndex].color = c.bg; saveNotes(updated); }} className={`flex-1 cursor-pointer transition-all hover:brightness-110 ${notes[activeNoteIndex].color === c.bg ? 'brightness-105 shadow-[inset_0_-3px_0_rgba(59,130,246,0.6)]' : ''}`} style={{ backgroundColor: c.bg }} />
                                    ))}
                                </div>
                                <div className="p-4 flex items-center justify-between border-b border-white/5" style={{ backgroundColor: notes[activeNoteIndex].color }}>
                                    <div className="flex items-center gap-3"><button onClick={() => setShowNotesMenu(!showNotesMenu)} className="p-1 hover:bg-black/5 rounded"><Menu className="w-4 h-4 text-black/60" /></button><span className="font-orbitron font-black text-xs tracking-[0.2em] text-black/60">NOTES</span></div>
                                    <div className="flex items-center gap-3"><button onClick={() => setActiveAssistantTool(null)} className="p-1 hover:bg-black/5 rounded text-black/40"><Minus className="w-4 h-4" /></button><button onClick={deleteNote} className="p-1 hover:bg-black/5 rounded text-black/40"><Trash2 className="w-4 h-4" /></button><button onClick={() => setActiveAssistantTool(null)} title="Close (Esc)" className="p-1 hover:bg-black/5 rounded text-black/60 transition-transform hover:rotate-90"><X className="w-4 h-4" /></button></div>
                                </div>
                                <div className="flex-1 relative flex flex-col" style={{ backgroundColor: notes[activeNoteIndex].color }}>
                                    {showNotesMenu && (
                                        <div className="absolute inset-x-0 top-0 bottom-0 bg-[#0a0f1a] z-50 overflow-y-auto p-4 scrollbar-hide">
                                            {notes.map((n, i) => (
                                                <button key={n.id} onClick={() => { setActiveNoteIndex(i); setShowNotesMenu(false); }} className={`w-full text-left p-4 rounded-xl mb-2 flex items-center gap-3 transition-colors ${i === activeNoteIndex ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5'}`}><div className="w-2 h-2 rounded-full" style={{ backgroundColor: n.color }} /><span className="text-xs text-slate-300 truncate">{n.content.replace(/<[^>]*>/g, '') || '(Empty Note)'}</span></button>
                                            ))}
                                        </div>
                                    )}
                                    <div ref={editorRef} contentEditable className="flex-1 w-full p-8 text-black/80 text-sm focus:outline-none font-sans leading-relaxed selection:bg-black/10 overflow-y-auto scrollbar-hide" onBlur={() => { const updated = [...notes]; updated[activeNoteIndex].content = editorRef.current.innerHTML; saveNotes(updated); }} dangerouslySetInnerHTML={{ __html: notes[activeNoteIndex].content }} />
                                </div>
                                <div className="p-3 bg-[#0a0f1a] border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <button onClick={() => execCommand('bold')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"><BoldIcon className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => execCommand('italic')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"><ItalicIcon className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => execCommand('underline')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"><UnderlineIcon className="w-3.5 h-3.5" /></button>
                                        <div className="w-px h-5 bg-white/10 mx-1" />
                                        <button className="w-10 h-8 rounded bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center text-slate-300"><span className="text-[10px] font-bold">A—</span><div className="w-3 h-[2px] bg-blue-500 rounded-sm" /></button>
                                        <div className="w-px h-5 bg-white/10 mx-1" />
                                        <button onClick={() => execCommand('fontSize', '2')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 text-[10px] font-bold">A-</button>
                                        <button onClick={() => execCommand('fontSize', '4')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 text-[11px] font-bold">A+</button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button onClick={addNote} className="text-blue-500 text-2xl font-light">+</button>
                                        <div className="bg-white/5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-500 font-orbitron">{activeNoteIndex + 1}/{notes.length}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeAssistantTool === 'calculator' && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[1300] w-72 bg-black border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
                            <div className="flex justify-end mb-2">
                                <button onClick={() => setActiveAssistantTool(null)} title="Close (Esc)" className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"><X className="w-3 h-3" /></button>
                            </div>
                            <div className="text-right mb-6 px-2 overflow-hidden"><div className="text-slate-500 text-xs font-mono mb-1 h-4">{calcExpr}</div><div className="text-white text-5xl font-light font-sans truncate">{calcDisplay}</div></div>
                            <div className="grid grid-cols-4 gap-3">
                                {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
                                    <button key={btn} onClick={() => handleCalcInput(btn)} className={`h-12 rounded-full font-medium transition-all active:scale-90 flex items-center justify-center text-lg ${btn === '=' ? 'bg-orange-500 text-white' : ['C', '±', '%'].includes(btn) ? 'bg-slate-400 text-black' : ['÷', '×', '-', '+'].includes(btn) ? 'bg-orange-500 text-white' : 'bg-slate-800 text-white'}`}>{btn}</button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeAssistantTool === 'draw' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1500] pointer-events-none">
                            <canvas ref={canvasRef} className="w-full h-full" />

                            <motion.div initial={{ y: -50, x: '-50%' }} animate={{ y: 0, x: '-50%' }} className="absolute top-24 left-1/2 -translate-x-1/2 p-4 glass-panel bg-white/95 rounded-2xl border border-nexus-border flex items-center gap-6 pointer-events-auto shadow-2xl min-w-[750px]">
                                <div className="flex items-center gap-1 pr-4 border-r border-slate-200">
                                    <button onClick={() => setDrawMode('pen')} className={`p-2 rounded-xl transition-all ${drawMode === 'pen' ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-slate-50'}`}><Pen className={`w-6 h-6 ${drawMode === 'pen' ? 'text-indigo-600' : 'text-slate-400'}`} /></button>
                                    <button onClick={() => { setDrawMode('highlighter'); setDrawOpacity(0.4); }} className={`p-2 rounded-xl transition-all ${drawMode === 'highlighter' ? 'bg-green-50 border border-green-200' : 'hover:bg-slate-50'}`}><HighlighterIcon className={`w-6 h-6 ${drawMode === 'highlighter' ? 'text-green-600' : 'text-slate-400'}`} /></button>
                                    <button onClick={() => setDrawMode('pencil')} className={`p-2 rounded-xl transition-all ${drawMode === 'pencil' ? 'bg-orange border border-orange-200' : 'hover:bg-slate-50'}`}><Pencil className={`w-6 h-6 ${drawMode === 'pencil' ? 'text-orange-500' : 'text-slate-400'}`} /></button>
                                </div>

                                {drawMode === 'highlighter' && (
                                    <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase">OPAQUE</span>
                                        {[0.2, 0.4, 0.7].map(op => (
                                            <button key={op} onClick={() => setDrawOpacity(op)} className={`w-8 h-8 rounded-lg border transition-all flex items-center justify-center text-[10px] font-black ${drawOpacity === op ? 'bg-blue-600 text-white border-blue-700 shadow-lg' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}>{Math.round(op * 100)}%</button>
                                        ))}
                                    </div>
                                )}

                                <div className="grid grid-cols-5 gap-1 pr-4 border-r border-slate-200">
                                    {['#000000', '#ef4444', '#3b82f6', '#10b981', '#f97316', '#fbbf24', '#dcfce7', '#dbeafe', '#f3e8ff', '#ffffff'].map(c => (
                                        <button key={c} onClick={() => setDrawColor(c)} className={`w-4 h-4 rounded-sm border ${drawColor === c ? 'border-indigo-600 scale-110 shadow-sm' : 'border-slate-300'}`} style={{ backgroundColor: c }} />
                                    ))}
                                </div>

                                <div className="flex flex-col gap-1 pr-4 border-r border-slate-200 min-w-[100px]"><span className="text-[9px] font-bold text-slate-400">THICKNESS</span><input type="range" min="1" max="50" value={drawWidth} onChange={(e) => setDrawWidth(parseInt(e.target.value))} className="w-full h-1 bg-slate-200 rounded-full appearance-none accent-blue-600" /></div>

                                <div className="flex items-center gap-3">
                                    <button onClick={clearCanvas} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all group outline-none"><Eraser className="w-4 h-4 text-orange-500 group-hover:rotate-12 transition-transform" /><span className="text-xs font-bold text-slate-600">Clear</span></button>
                                    <button onClick={() => setActiveAssistantTool(null)} title="Close (Esc)" className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all hover:rotate-90"><X className="w-5 h-5" /></button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {activeAssistantTool === 'sniper' && (
                        <>
                            <motion.div initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[1400] h-12 glass-panel bg-[#0f172a]/95 rounded-full border border-white/10 px-6 flex items-center gap-6 shadow-2xl">
                                <span className="text-[10px] font-black font-orbitron text-slate-500 tracking-widest">ZOOM MODE:</span>
                                <div className="flex bg-black/40 p-1 rounded-full gap-2">
                                    <button onClick={() => setSniperMode('lens')} className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-black font-orbitron transition-all ${sniperMode === 'lens' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-slate-500 hover:text-white'}`}><div className="w-2 h-2 rounded-full bg-white shadow-sm" /> Lens</button>
                                    <button onClick={() => setSniperMode('sniper')} className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-black font-orbitron transition-all ${sniperMode === 'sniper' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}><Crosshair className="w-3 h-3" /> Sniper</button>
                                </div>
                                <div className="w-px h-6 bg-white/10" />
                                <span className="text-[10px] text-slate-500 font-orbitron font-black tracking-widest uppercase">Scroll to Zoom</span>
                                <div className="w-px h-6 bg-white/10" />
                                <button onClick={() => setActiveAssistantTool(null)} title="Close (Esc)" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:rotate-90"><X className="w-3.5 h-3.5" /></button>
                            </motion.div>

                            <div className="fixed inset-0 z-[1300] pointer-events-none overflow-hidden cursor-none">
                                <motion.div
                                    className={`absolute transition-transform duration-75 shadow-[0_0_0_9999px_rgba(0,0,0,0.5),0_0_30px_rgba(0,0,0,0.5)_inset] ${sniperMode === 'lens' ? 'rounded-full border-[4px] border-white' : 'rounded-lg border-[2px] border-red-500'}`}
                                    style={{
                                        left: mousePos.x, top: mousePos.y,
                                        width: 320, height: 320,
                                        transform: `translate(-50%, -50%) scale(${lensScale / 2})`,
                                        backdropFilter: 'contrast(1.3) brightness(1.2) saturate(1.4)'
                                    }}
                                >
                                    {sniperMode === 'sniper' && (<><div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/50" /><div className="absolute top-0 left-1/2 w-[1px] h-full bg-red-500/50" /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.4)]" /></>)}
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* 🎮 MISSION CONTROL FOOTER */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 p-1.5 rounded-full bg-[#0f172a] border border-slate-600/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <button onClick={() => navigate('/')} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"><Home className="w-3.5 h-3.5" /></button>
                <button onClick={() => { const prevTool = allTools[currentIndex - 1]; if (prevTool) navigate(`/workspace/${prevTool.id}`); else navigate('/journey'); }} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => markToolComplete(toolId)} className={`relative flex items-center justify-center gap-2 px-5 h-9 rounded-full border font-black font-orbitron text-[10px] tracking-widest transition-all duration-500 active:scale-95 ${isCompleted ? 'bg-gradient-to-r from-nexus-success to-emerald-600 border-nexus-success text-white border shadow-lg' : 'bg-slate-800 border-slate-600 text-slate-200'}`}>{isCompleted ? <CheckCircle2 className="w-3 h-3 text-white" /> : <div className="w-3 h-3 rounded-full border-2 border-slate-400" />}{isCompleted ? 'SECURED' : 'MARK DONE'}</button>
                <button onClick={handleNextStation} className="group flex items-center gap-2 pl-4 pr-3 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all active:scale-95"><span className="text-[10px] font-black font-orbitron tracking-widest">NEXT</span><ChevronRight className="w-3.5 h-3.5 text-nexus-cyan group-hover:translate-x-1 transition-transform" /></button>
                <button onClick={() => { if (activeIframe?.contentWindow) activeIframe.contentWindow.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"><ArrowUp className="w-3.5 h-3.5" /></button>
            </div>
        </div>
    );
};

export default ToolWorkspace;
