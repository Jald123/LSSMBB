import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Zap,
    Search,
    HelpCircle,
    Bell,
    User,
    Command,
    Menu,
    Rocket,
    Terminal,
    Activity,
    X,
    ChevronRight
} from 'lucide-react';
import { toolRegistry } from '../data/toolRegistry';
import { phasesData } from '../data/journeyData';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexus } from '../context/NexusContext';

const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Search Indexing
    const searchItems = [
        ...Object.entries(phasesData).map(([id, data]) => ({
            id,
            type: 'phase',
            name: data.title,
            desc: data.subtitle,
            target: `/journey/${id}`
        })),
        ...Object.entries(toolRegistry).map(([id, data]) => ({
            id,
            type: 'tool',
            name: data.name,
            desc: `${data.phase} Phase`,
            target: `/workspace/${id}`
        }))
    ];

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        const filtered = searchItems.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        setResults(filtered);
    }, [query]);

    // Keyboard shortcut (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSelect = (target) => {
        navigate(target);
        setIsOpen(false);
        setQuery('');
    };

    return (
        <>
            {/* Search Trigger */}
            <div className="hidden md:flex relative group mr-4 cursor-pointer" onClick={() => setIsOpen(true)}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-nexus-cyan transition-colors" />
                <div className="bg-black/40 border border-nexus-border rounded-xl py-1.5 pl-10 pr-12 text-[10px] font-medium text-slate-500 w-32 group-hover:w-48 transition-all flex items-center">
                    Search...
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1 bg-white/5 border border-white/10 rounded text-[8px] font-bold text-slate-600">
                    <Command className="w-2 h-2" /> K
                </div>
            </div>

            {/* Search Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[6000] flex items-start justify-center pt-24 px-6 bg-black/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="max-w-xl w-full glass-panel bg-nexus-surface border-nexus-border overflow-hidden rounded-[2rem] shadow-2xl"
                        >
                            <div className="p-6 border-b border-nexus-border flex items-center gap-4">
                                <Search className="w-5 h-5 text-nexus-cyan" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Where do you want to navigate?"
                                    className="flex-1 bg-transparent border-none outline-none text-white font-orbitron font-bold text-sm placeholder:text-slate-600"
                                />
                                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-4 max-h-[400px] overflow-y-auto">
                                {results.length > 0 ? (
                                    <div className="space-y-2">
                                        {results.map((result) => (
                                            <button
                                                key={result.id}
                                                onClick={() => handleSelect(result.target)}
                                                className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl border border-transparent hover:border-nexus-cyan/20 transition-all group text-left"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-nexus-cyan/10 flex items-center justify-center text-nexus-cyan group-hover:bg-nexus-cyan group-hover:text-nexus-navy transition-colors">
                                                    {result.type === 'phase' ? <Rocket className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <div className="text-[9px] font-black font-orbitron text-slate-500 uppercase tracking-widest">{result.type}</div>
                                                    <h4 className="text-white font-bold">{result.name}</h4>
                                                    <p className="text-[10px] text-slate-500 font-medium">{result.desc}</p>
                                                </div>
                                                <ChevronRight className="ml-auto w-4 h-4 text-slate-700 group-hover:text-nexus-cyan transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                ) : query.trim() !== '' ? (
                                    <div className="py-12 text-center">
                                        <Activity className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                        <p className="text-slate-500 font-orbitron text-xs font-black tracking-widest uppercase">No navigation targets found</p>
                                    </div>
                                ) : (
                                    <div className="py-8 px-4">
                                        <p className="text-[10px] font-black font-orbitron text-slate-600 uppercase tracking-widest mb-4 italic">Common Destinations</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['charter', 'triage', 'journey', 'armory'].map(target => (
                                                <div key={target} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-bold text-slate-400 capitalize">
                                                    {target}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-black/40 border-t border-nexus-border flex items-center justify-between">
                                <div className="flex items-center gap-4 text-[9px] font-bold text-slate-600">
                                    <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑↓</span> to navigate</span>
                                    <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">Enter</span> to select</span>
                                </div>
                                <div className="text-[9px] font-black font-orbitron text-nexus-cyan tracking-widest">GLOBAL NEXUS INDEX</div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const Header = ({ onMenuClick }) => {
    const { industry, setIndustry, methodology, setMethodology } = useNexus();

    return (
        <header className="fixed top-0 left-0 w-full h-16 glass-panel border-b border-nexus-border flex items-center justify-between px-6 z-[1000]">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                    <Menu className="w-5 h-5 text-slate-400" />
                </button>
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-nexus-gold rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform">
                        <Zap className="w-5 h-5 text-nexus-navy fill-nexus-navy" />
                    </div>
                    <span className="text-white font-black font-orbitron tracking-widest text-lg hidden sm:block">
                        NEXUS<span className="text-nexus-gold">OS</span>
                    </span>
                </Link>
            </div>

            {/* 🔮 CONTEXT SELECTORS (Engagement Center) */}
            <div className="hidden xl:flex items-center gap-6 flex-1 justify-center max-w-2xl px-10">
                <div className="flex bg-black/40 p-1.5 rounded-2xl border border-nexus-border shadow-inner">
                    {['healthcare', 'business', 'life'].map((ctx) => (
                        <button
                            key={ctx}
                            onClick={() => setIndustry(ctx)}
                            className={`px-4 py-1.5 rounded-xl text-[10px] font-black font-orbitron transition-all duration-300 ${industry === ctx
                                ? 'bg-nexus-cyan/20 text-nexus-cyan shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {ctx.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="w-px h-6 bg-nexus-border" />

                <div className="flex bg-black/40 p-1.5 rounded-full border border-nexus-border">
                    {['DMAIC', 'DMADV', 'KAIZEN'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setMethodology(m)}
                            className={`px-5 py-2 rounded-full text-[10px] font-black font-orbitron transition-all duration-300 ${methodology === m
                                ? 'bg-white text-nexus-navy shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Actions & User */}
            <div className="flex items-center gap-3 ml-auto">
                <GlobalSearch />

                <div className="flex items-center gap-1 border-r border-nexus-border pr-3">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Help">
                        <HelpCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all relative" title="Notifications">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-nexus-error rounded-full border-2 border-nexus-navy" />
                    </button>
                </div>

                <button className="flex items-center gap-3 pl-2 group">
                    <div className="text-right hidden lg:block">
                        <div className="text-[10px] font-black text-white group-hover:text-nexus-cyan transition-colors">HA.LSSMBB</div>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Pilot Account</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-nexus-border flex items-center justify-center group-hover:border-nexus-cyan transition-all overflow-hidden ring-2 ring-transparent group-hover:ring-nexus-cyan/20">
                        <User className="w-5 h-5 text-slate-400 group-hover:text-nexus-cyan translate-y-0.5" />
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Header;
