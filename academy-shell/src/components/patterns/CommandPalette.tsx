"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X, Command, Rocket, Cpu, Binary, Layout, ChevronRight, FileCode, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { TOOLS_INDEX, type SearchItem } from "@/config/toolsIndex";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);

    const TACTICAL_ACTIONS: SearchItem[] = [
        { id: 'act_save', title: 'Save Operational Progress', description: 'Synchronize current tool state with central ledger.', url: 'CMD_SAVE', category: 'ACTION', keywords: ['save', 'sync', 'upload'] },
        { id: 'act_complete', title: 'Mark Mission Complete', description: 'Finalize deliverable and return to board.', url: 'CMD_COMPLETE', category: 'ACTION', keywords: ['complete', 'finish', 'done'] }
    ];

    const filteredItems = query.trim() === "" 
        ? [...TACTICAL_ACTIONS, ...TOOLS_INDEX.slice(0, 4)] 
        : [...TACTICAL_ACTIONS, ...TOOLS_INDEX].filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            item.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
          );

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    handleSelect(filteredItems[selectedIndex]);
                }
            } else if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, filteredItems, selectedIndex]);

    const handleSelect = (item: SearchItem) => {
        if (item.url.startsWith('CMD_')) {
            const command = item.url === 'CMD_SAVE' ? 'TRIGGER_SAVE' : 'TRIGGER_COMPLETE';
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                iframe.contentWindow?.postMessage({ type: command }, '*');
            });
            onClose();
            return;
        }
        router.push(item.url);
        onClose();
    };

    if (!isOpen) return null;

    const getIcon = (category: string) => {
        switch (category) {
            case "TOOL": return <Cpu className="w-4 h-4" />;
            case "MISSION": return <Rocket className="w-4 h-4" />;
            case "PAGE": return <Layout className="w-4 h-4" />;
            case "ACTION": return <Zap className="w-4 h-4" />;
            default: return <Command className="w-4 h-4" />;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 font-sans">
            <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md" onClick={onClose} />
            
            <div className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.5),0_0_40px_rgba(34,211,238,0.1)] overflow-hidden flex flex-col max-h-[65vh] animate-in fade-in zoom-in-95 duration-200">
                
                {/* Search Bar Header */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                    <Search className="w-5 h-5 text-primary animate-pulse" />
                    <input 
                        className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-600 font-medium"
                        placeholder="Search protocols, algorithms, and academy sectors..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <div className="flex items-center gap-2">
                        <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-[10px] font-bold text-slate-400">
                            ESC
                        </kbd>
                    </div>
                </div>
                
                {/* Results Section */}
                <div ref={scrollRef} className="overflow-y-auto p-3 no-scrollbar space-y-1">
                    {filteredItems.length > 0 ? (
                        <>
                            <div className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Binary className="w-3 h-3" />
                                {query.trim() === "" ? "System Recommendations" : `Search Results (${filteredItems.length})`}
                            </div>
                            
                            {filteredItems.map((item, idx) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSelect(item)}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-150 group",
                                        selectedIndex === idx ? "bg-primary text-black shadow-lg shadow-primary/20 scale-[1.01]" : "text-slate-300 hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-4 text-left">
                                        <div className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center border transition-colors",
                                            selectedIndex === idx ? "bg-black/10 border-black/10 text-black" : "bg-white/5 border-white/5 text-slate-500"
                                        )}>
                                            {getIcon(item.category)}
                                        </div>
                                        <div>
                                            <div className="font-bold flex items-center gap-2">
                                                {item.title}
                                                <span className={cn(
                                                    "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border",
                                                    selectedIndex === idx ? "border-black/20 text-black/60" : "border-white/10 text-slate-500"
                                                )}>
                                                    {item.category}
                                                </span>
                                            </div>
                                            <p className={cn(
                                                "text-xs mt-0.5 line-clamp-1 opacity-70",
                                                selectedIndex === idx ? "text-black/80" : "text-slate-400"
                                            )}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <ChevronRight className={cn(
                                        "w-4 h-4 transition-transform",
                                        selectedIndex === idx ? "translate-x-1" : "opacity-0"
                                    )} />
                                </button>
                            ))}
                        </>
                    ) : (
                        <div className="px-6 py-20 text-center space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-slate-600 mb-2">
                                <X className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-white font-bold text-lg italic">Negative Match</p>
                                <p className="text-slate-500 text-sm max-w-xs mx-auto">No protocols found matching the identifier "{query}". Verify sequence and retry.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Meta */}
                <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1.5"><ArrowUpDownIcon className="w-3 h-3" /> Navigate</span>
                        <span className="flex items-center gap-1.5"><EnterIcon className="w-3 h-3" /> Select</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FileCode className="w-3 h-3" />
                        v4.0 Ready
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowUpDownIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
    )
}

function EnterIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
    )
}
