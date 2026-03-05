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
    Minimize2,
    Pen,
    Highlighter as HighlighterIcon,
    Pencil,
    Ruler,
    RefreshCw,
    Layers,
    Type as FontIcon
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
    const [activeAssistantTool, setActiveAssistantTool] = useState(null);
    const activeToolRef = useRef(activeAssistantTool);

    useEffect(() => {
        activeToolRef.current = activeAssistantTool;
    }, [activeAssistantTool]);

    const { markToolComplete, completedTools, updateProgress, methodology, theme, toggleTheme } = useNexus();
    const tool = toolRegistry[toolId];

    // --- FULLSCREEN LOGIC ---
    const [isFullScreen, setIsFullScreen] = useState(false);
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }, []);

    // --- ESCAPE KEY HANDLER ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setActiveAssistantTool(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // --- STICKY NOTES STATE ---
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('nexus_notes_v5');
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
        localStorage.setItem('nexus_notes_v5', JSON.stringify(updated));
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
                // eslint-disable-next-line no-eval
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

    const handleMouseMoveGlobal = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleWheelGlobal = (e) => {
        if (activeToolRef.current === 'sniper') {
            // Extended zoom range: 0.5x to 8.0x with 0.25 increments
            setLensScale(prev => Math.min(Math.max(0.5, prev + (e.deltaY > 0 ? -0.25 : 0.25)), 8));
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMoveGlobal);
        window.addEventListener('wheel', handleWheelGlobal, { passive: false });

        const handleGlobalMouseDown = (e) => {
            if (activeAssistantTool === 'draw' && e.target.closest('.shell-interactive') === null) {
                startDrawing(e);
            }
        };
        const handleGlobalMouseUp = () => stopDrawing();
        const handleGlobalMouseMove = (e) => {
            if (activeAssistantTool === 'draw') drawAction(e);
        };

        window.addEventListener('mousedown', handleGlobalMouseDown);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('mousemove', handleGlobalMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMoveGlobal);
            window.removeEventListener('wheel', handleWheelGlobal);
            window.removeEventListener('mousedown', handleGlobalMouseDown);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, [activeAssistantTool]);

    // --- DRAWING CANVAS LOGIC ---
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawMode, setDrawMode] = useState('pen');
    const [drawColor, setDrawColor] = useState("#ffff00");
    const [drawWidth, setDrawWidth] = useState(30);
    const [drawOpacity, setDrawOpacity] = useState(0.5);

    useEffect(() => {
        if (activeAssistantTool === 'draw' && canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';
        }
    }, [activeAssistantTool]);

    const startDrawing = (e) => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        ctx.globalCompositeOperation = 'source-over';
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
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
            ctx.globalAlpha = drawOpacity;
        } else {
            ctx.globalAlpha = drawMode === 'pencil' ? 0.6 : 1.0;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }

        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.globalAlpha = 1.0;
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    // --- IFRAME FOCUS FIX ---
    useEffect(() => {
        if (activeAssistantTool === 'draw') {
            // Disable text selection globally to prevent browser selection interfering with highlighter
            document.body.style.userSelect = 'none';
            if (activeIframe?.contentDocument) {
                activeIframe.contentDocument.body.style.userSelect = 'none';
            }
        } else {
            document.body.style.userSelect = 'auto';
            if (activeIframe?.contentDocument) {
                activeIframe.contentDocument.body.style.userSelect = 'auto';
            }
        }
    }, [activeAssistantTool, activeIframe]);

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
        const iframe = e.target;
        setActiveIframe(iframe);
        try {
            const doc = iframe.contentWindow.document;
            const style = doc.createElement('style');
            let cssRules = `body { padding-top: 0 !important; margin: 0 !important; width: 100vw; height: 100vh; overflow-x: hidden; }`;
            cssRules += ` .app-nav-bar, .bottom-nav, .nav-btn-back, .back-btn, .btn-back, .back-button, .sticky-export, #assistant-dock, .assistant-window, .explainer-section, .guide-column, .chart-controls, .mission-nav-bar, #mission-nav, .nav-control-group, .sticky-audit-trigger, .nav-item .nav-tooltip, .intro-card-phase, .phase-glow, div[style*="font-size:9px"][style*="color:#555"], div[style*="font-size:11px"][style*="color:var(--accent)"][style*="font-weight:bold"] { display: none !important; } `;
            if (toolId !== 'hoshin') cssRules += `footer, .footer, .bottom-bar, .bottom-nav, #footer, .site-footer, .universal-nav-bar { display: none !important; }`;
            style.textContent = cssRules;
            doc.head.appendChild(style);

            doc.addEventListener('mousemove', (me) => {
                const rect = iframe.getBoundingClientRect();
                handleMouseMoveGlobal({ clientX: me.clientX + rect.left, clientY: me.clientY + rect.top });
                if (activeAssistantTool === 'draw' && isDrawing) {
                    drawAction({ clientX: me.clientX + rect.left, clientY: me.clientY + rect.top });
                }
            });
            doc.addEventListener('mousedown', (me) => {
                if (activeAssistantTool === 'draw') {
                    const rect = iframe.getBoundingClientRect();
                    startDrawing({ clientX: me.clientX + rect.left, clientY: me.clientY + rect.top });
                }
            });
            doc.addEventListener('mouseup', () => stopDrawing());
            doc.addEventListener('wheel', (we) => {
                if (activeToolRef.current === 'sniper') {
                    we.preventDefault();
                    handleWheelGlobal(we);
                }
            }, { passive: false });

        } catch (err) { console.warn("Iframe access restricted:", err); }
    };

    return (
        <div className={`h-screen w-full flex flex-col overflow-hidden relative ${theme === 'light' ? 'bg-slate-50' : 'bg-black'}`}>

            {/* 🔝 HEADER BAR */}
            <div className={`h-16 flex items-center justify-between px-6 z-[900] absolute top-0 left-0 right-0 shell-interactive transition-all duration-300 header-3d`}>
                <div className="flex items-center gap-6 w-1/4">
                    <button onClick={() => navigate(-1)} className={`w-10 h-10 rounded-full border border-nexus-border flex items-center justify-center transition-all group ${theme === 'light' ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-800' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <div className="w-px h-6 bg-nexus-border" />
                    <div>
                        <span className="text-[10px] font-black font-orbitron text-nexus-cyan tracking-widest uppercase block mb-0.5">{tool.phase} Phase</span>
                        <h1 className={`text-lg font-black font-orbitron tracking-tight truncate max-w-[200px] ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>{tool.name}</h1>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center gap-6">
                    <div className="flex items-center gap-1">
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'notes' ? null : 'notes')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'notes' ? 'bg-pink-500/20 text-pink-400 font-bold shadow-[0_0_10px_rgba(236,72,153,0.3)]' : theme === 'light' ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}><FileText className="w-4 h-4" /></button>
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'calculator' ? null : 'calculator')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'calculator' ? 'bg-cyan-500/20 text-cyan-400 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]' : theme === 'light' ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}><Calculator className="w-4 h-4" /></button>
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'draw' ? null : 'draw')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'draw' ? 'bg-lime-500/20 text-lime-400 font-bold shadow-[0_0_10px_rgba(132,204,22,0.3)]' : theme === 'light' ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}><PenTool className="w-4 h-4" /></button>
                        <button onClick={() => setActiveAssistantTool(activeAssistantTool === 'sniper' ? null : 'sniper')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${activeAssistantTool === 'sniper' ? 'bg-violet-500/20 text-violet-400 font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)]' : theme === 'light' ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}><Search className="w-4 h-4" /></button>
                    </div>
                    <div className="w-px h-8 bg-nexus-border/50 mx-2" />
                    <div className="flex items-center gap-1">
                        <button onClick={() => handleZoom(-0.1)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500 hover:text-indigo-500' : 'hover:bg-white/5 text-slate-400 hover:text-indigo-400'}`}><Minus className="w-4 h-4" /></button>
                        <button onClick={resetZoom} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500 hover:text-orange-500' : 'hover:bg-white/5 text-slate-400 hover:text-orange-400'}`}><Home className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleZoom(0.1)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500 hover:text-emerald-500' : 'hover:bg-white/5 text-slate-400 hover:text-emerald-400'}`}><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="w-px h-8 bg-nexus-border/50 mx-2" />
                    <button onClick={toggleTheme} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                        {theme === 'dark' ? <Sun className="w-4 h-4 group-hover:text-yellow-400" /> : <Moon className="w-4 h-4 group-hover:text-sky-400" />}
                    </button>
                    <div className="w-px h-8 bg-nexus-border/50 mx-1" />
                    <button onClick={toggleFullScreen} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                        {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    <div className={`text-[10px] font-orbitron font-black ml-2 uppercase opacity-50 tracking-widest ${theme === 'light' ? 'text-slate-400' : 'text-slate-600'}`}>AST-V2</div>
                </div>

                <div className={`p-1 rounded-full border flex shadow-inner w-1/4 justify-end ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-black/60 border-white/5'}`}>
                    <button onClick={() => setViewMode('do')} className={`px-5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'do' ? 'bg-nexus-cyan text-nexus-navy shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}><Terminal className="w-3 h-3" /> DO</button>
                    <button onClick={() => setViewMode('learn')} className={`px-5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-2 text-[10px] font-black font-orbitron tracking-widest ${viewMode === 'learn' ? 'bg-nexus-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}><FileText className="w-3 h-3" /> LEARN</button>
                </div>
            </div>

            {/* 🚀 MAIN CONTENT */}
            <div className="flex-1 overflow-auto relative pt-16 px-6 pb-20 flex items-start justify-center">
                <div className={`w-full max-w-6xl h-full min-h-full overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 p-2 mx-auto ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-white/5'}`}>
                    <iframe
                        src={tool.src}
                        onLoad={handleIframeLoad}
                        title={tool.name}
                        className={`w-full h-full border-none origin-top rounded-xl ring-1 ${theme === 'light' ? 'ring-slate-200' : 'ring-white/10'}`}
                        loading="lazy"
                        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
                    />
                </div>

                <AnimatePresence>
                    {activeAssistantTool === 'notes' && (
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed top-20 right-8 w-[450px] z-[1300] drop-shadow-2xl shell-interactive">
                            <div className="bg-[#1e293b] rounded-2xl overflow-hidden flex flex-col h-[550px] border border-white/5 shadow-2xl">
                                <div className="flex h-3 w-full border-b border-black/10">
                                    {noteColors.map((c, i) => (
                                        <div key={i} onClick={() => { const updated = [...notes]; updated[activeNoteIndex].color = c.bg; saveNotes(updated); }} className={`flex-1 cursor-pointer transition-all hover:brightness-110 ${notes[activeNoteIndex].color === c.bg ? 'brightness-105 shadow-[inset_0_-3px_0_rgba(59,130,246,0.6)]' : ''}`} style={{ backgroundColor: c.bg }} />
                                    ))}
                                </div>
                                <div className="p-4 flex items-center justify-between border-b border-white/5" style={{ backgroundColor: notes[activeNoteIndex].color }}>
                                    <div className="flex items-center gap-3"><button onClick={() => setShowNotesMenu(!showNotesMenu)} className="p-1 hover:bg-black/5 rounded"><Menu className="w-4 h-4 text-black/60" /></button><span className="font-orbitron font-black text-xs tracking-[0.2em] text-black/60">NOTES</span></div>
                                    <div className="flex items-center gap-3"><button onClick={() => setActiveAssistantTool(null)} className="p-1 hover:bg-black/5 rounded text-black/40"><Minus className="w-4 h-4" /></button><button onClick={deleteNote} className="p-1 hover:bg-black/5 rounded text-black/40"><Trash2 className="w-4 h-4" /></button><button onClick={() => setActiveAssistantTool(null)} className="p-1 hover:bg-black/5 rounded text-black/60"><X className="w-4 h-4" /></button></div>
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
                                    <div className="flex items-center gap-1.5"><button onClick={() => execCommand('bold')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"><BoldIcon className="w-3.5 h-3.5" /></button><button onClick={() => execCommand('italic')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"><ItalicIcon className="w-3.5 h-3.5" /></button><button onClick={() => execCommand('underline')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"><UnderlineIcon className="w-3.5 h-3.5" /></button><div className="w-px h-5 bg-white/10 mx-1" /><button className="w-10 h-8 rounded bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center text-slate-300"><span className="text-[10px] font-bold">A—</span><div className="w-3 h-[2px] bg-blue-500 rounded-sm" /></button><div className="w-px h-5 bg-white/10 mx-1" /><button onClick={() => execCommand('fontSize', '2')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 text-[10px] font-bold">A-</button><button onClick={() => execCommand('fontSize', '4')} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 text-[11px] font-bold">A+</button></div>
                                    <div className="flex items-center gap-4"><button onClick={addNote} className="text-blue-500 text-2xl font-light">+</button><div className="bg-white/5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-500 font-orbitron">{activeNoteIndex + 1}/{notes.length}</div></div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeAssistantTool === 'calculator' && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[1300] w-72 bg-black border border-white/10 rounded-[2.5rem] p-6 shadow-2xl shell-interactive">
                            <div className="flex justify-end mb-2"><button onClick={() => setActiveAssistantTool(null)} className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"><X className="w-3 h-3" /></button></div>
                            <div className="text-right mb-6 px-2 overflow-hidden"><div className="text-slate-500 text-xs font-mono mb-1 h-4">{calcExpr}</div><div className="text-white text-5xl font-light font-sans truncate">{calcDisplay}</div></div>
                            <div className="grid grid-cols-4 gap-3">
                                {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
                                    <button key={btn} onClick={() => handleCalcInput(btn)} className={`h-12 rounded-full font-medium transition-all active:scale-90 flex items-center justify-center text-lg ${btn === '=' ? 'bg-orange-500 text-white' : ['C', '±', '%'].includes(btn) ? 'bg-slate-400 text-black' : ['÷', '×', '-', '+'].includes(btn) ? 'bg-orange-500 text-white' : 'bg-slate-800 text-white'}`}>{btn}</button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeAssistantTool === 'draw' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1500] pointer-events-auto cursor-none">
                            {/* Pointing Area Preview */}
                            <div
                                className="fixed pointer-events-none z-[2000] flex items-center justify-center overflow-hidden"
                                style={{
                                    left: mousePos.x, top: mousePos.y,
                                    width: drawMode === 'highlighter' ? drawWidth : drawWidth,
                                    height: drawMode === 'highlighter' ? drawWidth * 1.5 : drawWidth,
                                    transform: 'translate(-50%, -50%)',
                                    borderRadius: drawMode === 'highlighter' ? '2px' : '50%',
                                    backgroundColor: `${drawColor}${Math.round(drawOpacity * 255).toString(16).padStart(2, '0')}`,
                                    border: `1px solid ${drawColor}66`
                                }}
                            >
                                <div className="absolute w-full h-px bg-white/20" />
                                <div className="absolute h-full w-px bg-white/20" />
                            </div>

                            <canvas
                                ref={canvasRef}
                                className="w-full h-full cursor-none touch-none"
                                onMouseDown={startDrawing}
                                onMouseMove={(e) => {
                                    handleMouseMoveGlobal(e);
                                    drawAction(e);
                                }}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                style={{ mixBlendMode: drawMode === 'highlighter' ? (theme === 'light' ? 'multiply' : 'screen') : 'normal' }}
                            />

                            <motion.div initial={{ y: -50, x: '-50%' }} animate={{ y: 0, x: '-50%' }} className="absolute top-24 left-1/2 -translate-x-1/2 p-4 glass-panel bg-[#0f172a]/95 rounded-2xl border border-white/10 flex items-center gap-6 pointer-events-auto shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] min-w-[500px] shell-interactive">
                                {/* Tool Toggles (Ico-btns) */}
                                <div className="flex items-center gap-1.5 pr-5 border-r border-white/10">
                                    <button onClick={() => { setDrawMode('pen'); setDrawOpacity(1.0); }} className={`w-12 h-12 rounded-xl transition-all flex items-center justify-center ${drawMode === 'pen' ? 'bg-white text-slate-900 shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}><Pen className="w-6 h-6" /></button>
                                    <button onClick={() => { setDrawMode('highlighter'); setDrawWidth(40); setDrawOpacity(0.05); }} className={`w-12 h-12 rounded-xl transition-all flex items-center justify-center ${drawMode === 'highlighter' ? 'bg-[#ffff00] text-black shadow-lg border border-yellow-400' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}><HighlighterIcon className="w-6 h-6" /></button>
                                    <button onClick={() => { setDrawMode('pencil'); setDrawOpacity(0.6); }} className={`w-12 h-12 rounded-xl transition-all flex items-center justify-center ${drawMode === 'pencil' ? 'bg-white text-slate-900 shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}><Pencil className="w-6 h-6" /></button>
                                </div>

                                {/* Size and Opacity Sliders */}
                                <div className="flex flex-col justify-center gap-2 pr-5 border-r border-white/10 min-w-[140px]">
                                    {/* Thickness */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-tighter w-12">SIZE</span>
                                        <input
                                            type="range"
                                            min="5"
                                            max="80"
                                            value={drawWidth}
                                            onChange={(e) => setDrawWidth(parseInt(e.target.value))}
                                            className="w-20 h-1 bg-white/10 rounded-full appearance-none accent-blue-500 cursor-pointer"
                                        />
                                        <span className="text-[9px] text-white/50 w-6 text-right">{drawWidth}px</span>
                                    </div>

                                    {/* Opacity */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-tighter w-12">FLOW</span>
                                        <input
                                            type="range"
                                            min="2"
                                            max="20"
                                            value={Math.round(drawOpacity * 100)}
                                            onChange={(e) => setDrawOpacity(parseInt(e.target.value) / 100)}
                                            className="w-20 h-1 bg-white/10 rounded-full appearance-none accent-blue-500 cursor-pointer"
                                        />
                                        <span className="text-[9px] text-white/50 w-6 text-right">{Math.round(drawOpacity * 100)}%</span>
                                    </div>
                                </div>

                                {/* Color Palette Grid (2x5) */}
                                <div className="grid grid-cols-5 gap-1.5 pr-5 border-r border-white/10">
                                    {['#ffff00', '#ef4444', '#3b82f6', '#10b981', '#f97316', '#fbbf24', '#00ff00', '#00ffff', '#ff00ff', '#ffffff'].map(c => (
                                        <button key={c} onClick={() => setDrawColor(c)} className={`w-4 h-4 rounded-sm border transition-all ${drawColor === c ? 'scale-125 border-white shadow-sm ring-1 ring-blue-500' : 'border-white/10 hover:scale-110'}`} style={{ backgroundColor: c }} />
                                    ))}
                                </div>

                                {/* Final Actions */}
                                <div className="flex items-center gap-3">
                                    <button onClick={clearCanvas} className="bg-white text-slate-900 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black hover:bg-slate-200 transition-all shadow-lg active:scale-95"><Eraser className="w-4 h-4 text-orange-500" /> Clear</button>
                                    <button onClick={() => setActiveAssistantTool(null)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-all"><X className="w-5 h-5" /></button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {activeAssistantTool === 'sniper' && (
                        <>
                            <motion.div initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[1400] h-12 glass-panel bg-[#0f172a]/95 rounded-full border border-white/10 px-6 flex items-center gap-6 shadow-2xl shell-interactive">
                                <span className="text-[10px] font-black font-orbitron text-slate-500 tracking-widest uppercase">ZOOM MODE:</span>
                                <div className="flex bg-black/40 p-1 rounded-full gap-2">
                                    <button onClick={() => setSniperMode('lens')} className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-black font-orbitron transition-all ${sniperMode === 'lens' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-slate-500 hover:text-white'}`}><div className="w-2 h-2 rounded-full bg-white shadow-sm" /> Lens</button>
                                    <button onClick={() => setSniperMode('sniper')} className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-black font-orbitron transition-all ${sniperMode === 'sniper' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}><Crosshair className="w-3 h-3" /> Sniper</button>
                                </div>
                                <div className="w-px h-6 bg-white/10" />
                                <span className="text-[10px] text-slate-500 font-orbitron font-black uppercase tracking-widest">Scroll to Zoom</span>
                                <div className="w-px h-6 bg-white/10" />
                                <button onClick={() => setActiveAssistantTool(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 transition-all"><X className="w-3.5 h-3.5" /></button>
                            </motion.div>
                            <div className="fixed inset-0 z-[1300] pointer-events-none overflow-hidden cursor-none">
                                <motion.div
                                    className={`absolute pointer-events-none transition-transform duration-75 shadow-[0_0_0_9999px_rgba(0,0,0,0.5),0_0_40px_rgba(0,0,0,0.5)_inset] ${sniperMode === 'lens' ? 'rounded-full border-[4px] border-white' : 'rounded-lg border-[2px] border-red-500'}`}
                                    style={{
                                        left: mousePos.x, top: mousePos.y,
                                        width: 350, height: 350,
                                        transform: `translate(-50%, -50%) scale(${lensScale / 2})`,
                                        backdropFilter: 'contrast(1.2) brightness(1.1) saturate(1.2)'
                                    }}
                                >
                                    {sniperMode === 'sniper' && (<><div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/50" /><div className="absolute top-0 left-1/2 w-[1px] h-full bg-red-500/50" /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-red-500/50" /></>)}
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>

                {/* 🎮 MISSION CONTROL FOOTER */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 p-1.5 rounded-full shell-interactive transition-all duration-300 footer-3d`}>
                    <button onClick={() => navigate('/')} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all"><Home className="w-3.5 h-3.5" /></button>
                    <button onClick={() => { const prevTool = allTools[currentIndex - 1]; if (prevTool) navigate(`/workspace/${prevTool.id}`); else navigate('/journey'); }} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={() => markToolComplete(toolId)} className={`relative flex items-center justify-center gap-2 px-5 h-9 rounded-full border font-black font-orbitron text-[10px] tracking-widest transition-all duration-500 active:scale-95 ${isCompleted ? 'bg-gradient-to-r from-nexus-success to-emerald-600 border-nexus-success text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-800 border-slate-600 text-slate-200'}`}>{isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border-2 border-slate-400" />}{isCompleted ? 'SECURED' : 'MARK DONE'}</button>
                    <button onClick={handleNextStation} className="group flex items-center gap-2 pl-4 pr-3 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all"><span className="text-[10px] font-black font-orbitron tracking-widest">NEXT</span><ChevronRight className="w-3.5 h-3.5 text-nexus-cyan group-hover:translate-x-1 transition-transform" /></button>
                    <button onClick={() => { if (activeIframe?.contentWindow) activeIframe.contentWindow.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all"><ArrowUp className="w-3.5 h-3.5" /></button>
                </div>
            </div>
            {/* Global Cursor Injects for Drawing Mode */}
            {activeAssistantTool === 'draw' && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                    * { cursor: none !important; }
                    .shell-interactive, .shell-interactive * { cursor: auto !important; }
                `}} />
            )}
        </div >
    );
};

export default ToolWorkspace;
