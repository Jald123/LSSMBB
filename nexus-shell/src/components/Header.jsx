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
    ChevronRight,
    Target,
    BarChart2,
    Sliders,
    ShieldCheck,
    Sun,
    Moon
} from 'lucide-react';
import { toolRegistry } from '../data/toolRegistry';
import { methodologyData } from '../data/journeyData';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexus } from '../context/NexusContext';
import { useLocation } from 'react-router-dom';

const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Search Indexing
    const searchItems = [
        ...Object.entries(methodologyData).flatMap(([mName, mPhases]) =>
            Object.entries(mPhases).map(([id, data]) => ({
                id: `${mName}-${id}`,
                type: 'phase',
                name: `${mName}: ${data.title}`,
                desc: data.subtitle,
                target: `/journey/${id}`
            }))
        ),
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-text-secondary group-hover:text-nexus-cyan transition-colors" />
                <div className="bg-nexus-card border border-nexus-border rounded-xl py-1.5 pl-10 pr-12 text-[10px] font-medium text-nexus-text-secondary w-32 group-hover:w-48 transition-all flex items-center">
                    Search...
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1 bg-nexus-text-primary/10 border border-nexus-border rounded text-[8px] font-bold text-nexus-text-secondary">
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
                                    className="flex-1 bg-transparent border-none outline-none text-nexus-text-primary font-orbitron font-bold text-sm placeholder:text-nexus-text-secondary"
                                />
                                <button onClick={() => setIsOpen(false)} className="text-nexus-text-secondary hover:text-nexus-text-primary transition-colors">
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
                                                className="w-full flex items-center gap-4 p-4 hover:bg-nexus-surface/50 rounded-2xl border border-transparent hover:border-nexus-cyan/20 transition-all group text-left"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-nexus-cyan/10 flex items-center justify-center text-nexus-cyan group-hover:bg-nexus-cyan group-hover:text-nexus-navy transition-colors">
                                                    {result.type === 'phase' ? <Rocket className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <div className="text-[9px] font-black font-orbitron text-nexus-text-secondary uppercase tracking-widest">{result.type}</div>
                                                    <h4 className="text-nexus-text-primary font-bold">{result.name}</h4>
                                                    <p className="text-[10px] text-nexus-text-secondary font-medium">{result.desc}</p>
                                                </div>
                                                <ChevronRight className="ml-auto w-4 h-4 text-slate-700 group-hover:text-nexus-cyan transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                ) : query.trim() !== '' ? (
                                    <div className="py-12 text-center">
                                        <Activity className="w-12 h-12 text-nexus-text-secondary mx-auto mb-4" />
                                        <p className="text-nexus-text-secondary font-orbitron text-xs font-black tracking-widest uppercase">No navigation targets found</p>
                                    </div>
                                ) : (
                                    <div className="py-8 px-4">
                                        <p className="text-[10px] font-black font-orbitron text-nexus-text-secondary uppercase tracking-widest mb-4 italic">Common Destinations</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['charter', 'triage', 'journey', 'armory'].map(target => (
                                                <div key={target} className="p-4 bg-nexus-card border border-nexus-border rounded-2xl text-[10px] font-bold text-nexus-text-secondary capitalize">
                                                    {target}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-nexus-card border-t border-nexus-border flex items-center justify-between">
                                <div className="flex items-center gap-4 text-[9px] font-bold text-nexus-text-secondary">
                                    <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-nexus-text-primary/10 border border-nexus-border rounded">↑↓</span> to navigate</span>
                                    <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-nexus-text-primary/10 border border-nexus-border rounded">Enter</span> to select</span>
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
    // Phase Tracker Logic
    const { methodology, theme, toggleTheme } = useNexus();
    const location = useLocation();

    // Normalize methodology key (e.g., FOCUS PDCA -> FOCUS)
    const activeMethodologyKey = methodology ? methodology.split(' ')[0].toUpperCase() : null;

    const currentPath = location.pathname.split('/').pop(); // e.g., 'define' based on /journey/define
    const activePhase = Object.keys(methodologyData[activeMethodologyKey] || {}).includes(currentPath) ? currentPath : 'define';

    const phases = Object.entries(methodologyData[activeMethodologyKey] || {}).map(([key, data]) => ({
        id: key,
        label: data.title,
        icon: key === 'define' || key === 'find' ? Target
            : key === 'measure' || key === 'organize' ? BarChart2
                : key === 'analyze' || key === 'clarify' || key === 'understand' ? Zap
                    : key === 'improve' || key === 'design' || key === 'select' || key === 'plan' || key === 'do' ? Sliders
                        : key === 'control' || key === 'verify' || key === 'check' || key === 'act' ? ShieldCheck
                            : Activity // Fallback
    }));

    return (
        <header className="fixed top-0 left-0 w-full h-16 glass-panel border-b border-nexus-border flex items-center justify-between px-6 z-[1000]">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-nexus-surface/50 rounded-lg transition-colors"
                >
                    <Menu className="w-5 h-5 text-nexus-text-secondary" />
                </button>
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-nexus-gold rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform">
                        <Zap className="w-5 h-5 text-nexus-navy fill-nexus-navy" />
                    </div>
                    <span className="text-nexus-text-primary font-black font-orbitron tracking-widest text-lg hidden sm:block">
                        NEXUS<span className="text-nexus-gold">OS</span>
                    </span>
                </Link>
            </div>

            {/* PHASE TRACKER (Center) */}
            <div className="hidden xl:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                {phases.map((phase, idx) => {
                    const isActive = phase.id === activePhase;
                    const Icon = phase.icon;

                    return (
                        <React.Fragment key={phase.id}>
                            <Link to={`/journey/${phase.id}`}>
                                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 border ${isActive
                                    ? 'bg-nexus-surface border-nexus-cyan/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] translate-y-[-1px]'
                                    : 'border-transparent opacity-50 hover:opacity-100 hover:bg-nexus-surface/30'
                                    }`}>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-nexus-cyan' : 'text-nexus-text-secondary'}`} />
                                    <span className={`text-[11px] font-black font-orbitron tracking-widest ${isActive ? 'text-nexus-text-primary' : 'text-nexus-text-secondary'}`}>
                                        <span className="mr-1 opacity-50">{phase.label.charAt(0)}</span>
                                        {phase.label.toUpperCase()}
                                    </span>
                                </div>
                            </Link>
                            {idx < phases.length - 1 && (
                                <ChevronRight className="w-3 h-3 text-nexus-border" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Quick Actions & User */}
            <div className="flex items-center gap-3 ml-auto">
                <GlobalSearch />

                <div className="flex items-center gap-1 border-r border-nexus-border pr-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-surface/50 rounded-lg transition-all"
                        title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-sky-400" />
                        )}
                    </button>
                    <button className="p-2 text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-surface/50 rounded-lg transition-all" title="Help">
                        <HelpCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-surface/50 rounded-lg transition-all relative" title="Notifications">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-nexus-error rounded-full border-2 border-nexus-navy" />
                    </button>
                </div>

                <button className="flex items-center gap-3 pl-2 group">
                    <div className="text-right hidden lg:block">
                        <div className="text-[10px] font-black text-nexus-text-primary group-hover:text-nexus-cyan transition-colors">HA.LSSMBB</div>
                        <div className="text-[9px] text-nexus-text-secondary font-bold uppercase tracking-tighter">Pilot Account</div>
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
