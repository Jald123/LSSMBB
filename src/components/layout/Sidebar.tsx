"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Map,
    BookOpen,
    Zap,
    Shield,
    Award,
    Settings,
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
    Calculator,
    Target,
    FileText,
    Library,
    Plus,
    X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const PRIMARY_NAV = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Nexus Academy', icon: BookOpen, path: '/academy' },
    { name: 'Mission Selection Library', icon: Library, path: '/library' },
    { name: 'Armory', icon: Shield, path: '/armory', isStandard: true },
    { name: 'Certificate', icon: FileText, path: '/certificate', isStandard: true },
    { name: 'Achievements', icon: Award, path: '/achievements', isStandard: true },
    { name: 'Control Center', icon: Map, path: '/admin', roles: ['ADMIN'], isStandard: true },
];

import { useNexus } from "@/context/NexusContext";
import { toolRegistry } from "@/data/toolRegistry";

const GLOBAL_AESTHETICS = [
    { id: 'slate', color: '#111318', label: 'Classic Slate' },
    { id: 'obsidian', color: '#050505', label: 'Glasscope' },
    { id: 'ocean', color: '#002B36', label: 'Titanium' },
    { id: 'ether', color: '#0F172A', label: 'Ether (Modern)' },
    { id: 'aurora', color: '#1E1B4B', label: 'Aurora (Vibrant)' },
    { id: 'zenith', color: '#FFFFFF', label: 'Zenith (Pure)' },
] as const;

export function Sidebar({ 
    isCollapsed, 
    onToggle, 
    isOpen, 
    setIsOpen 
}: { 
    isCollapsed: boolean; 
    onToggle: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}) {
    const pathname = usePathname();
    const { 
        appAesthetic, 
        setAppAesthetic, 
        quickTools, 
        addQuickTool, 
        removeQuickTool 
    } = useNexus();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const getSidebarStyles = () => {
        if (!mounted) return {
            background: 'linear-gradient(to bottom, #111318, #0f1115)',
            isLight: false,
            overlay: <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        };

        switch(appAesthetic) {
            case 'obsidian':
                return {
                    background: 'rgba(10, 10, 10, 0.8)',
                    isLight: false,
                    overlay: (
                        <>
                            <div className="absolute inset-0 backdrop-blur-xl pointer-events-none" />
                            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute bottom-[20%] left-[-20%] w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
                            <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
                                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                            />
                        </>
                    )
                };
            case 'ocean': // Titanium
                return {
                    background: '#0a0d12',
                    isLight: false,
                    overlay: (
                        <>
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                                style={{ backgroundImage: 'linear-gradient(90deg, #334155 1px, transparent 1px), linear-gradient(#334155 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/50 via-transparent to-amber-500/5" />
                        </>
                    )
                };
            case 'ether': // Modern
                return {
                    background: '#020617',
                    isLight: false,
                    overlay: (
                        <>
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_10px_#22d3ee] animate-pulse" />
                            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        </>
                    )
                };
            case 'aurora': // Eye-catching
                return {
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                    isLight: false,
                    overlay: (
                        <>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1)_0%,transparent_50%)] animate-pulse" />
                            <div className="absolute top-[-20%] left-[-20%] w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-[120px] animate-pulse" />
                        </>
                    )
                };
            case 'zenith': // Light/Simplified
                return {
                    background: '#f8fafc',
                    isLight: true,
                    overlay: <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
                };
            default: // slate
                return {
                    background: 'linear-gradient(to bottom, #111318, #0f1115)',
                    isLight: false,
                    overlay: <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                };
        }
    };

    const currentStyles = getSidebarStyles();
    const [isAddingTool, setIsAddingTool] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const availableTools = Object.entries(toolRegistry)
        .filter(([id, tool]) => 
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
            !quickTools.includes(id)
        );

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}



            <aside 
                id="sidebar-anchor"
                className={cn(
                "fixed lg:sticky top-0 lg:top-[64px] inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 transition-all duration-300 ease-in-out h-full lg:h-[calc(100vh-64px)] relative",
                isCollapsed ? "w-20" : "w-64",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                {/* Background & Patterns Wrapper */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ background: currentStyles.background }}>
                    {currentStyles.overlay}
                </div>



                {/* Collapse Toggle (Desktop only) */}
                <button 
                    onClick={onToggle}
                    className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-primary text-black rounded-full items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-110 transition-all z-50"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-10 no-scrollbar">
                    {/* Primary Nav */}
                    <div className="space-y-2">
                        {!isCollapsed && <p className={cn("px-4 text-[10px] font-black tracking-[0.2em] mb-4 uppercase", currentStyles.isLight ? "text-slate-400" : "text-slate-500")}>Primary Systems</p>}
                        {PRIMARY_NAV.map((item) => {
                            const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group relative overflow-hidden",
                                        isActive
                                            ? (currentStyles.isLight ? "text-primary bg-primary/5" : "text-white bg-white/[0.03]")
                                            : (currentStyles.isLight ? "text-slate-600 hover:text-primary hover:bg-slate-50" : "text-slate-400 hover:text-white hover:bg-white/[0.02]")
                                    )}
                                    title={isCollapsed ? item.name : undefined}
                                >
                                    {/* Active Indicator Bar */}
                                    {isActive && (
                                        <div className={cn(
                                            "absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-primary rounded-r-full",
                                            !item.isStandard && "shadow-[0_0_10px_#22d3ee]"
                                        )} />
                                    )}
                                    
                                    <item.icon className={cn(
                                        "w-5 h-5 transition-all duration-300",
                                        isActive 
                                            ? cn("text-primary scale-110", !item.isStandard && "drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]")
                                            : (currentStyles.isLight ? "text-slate-400 group-hover:text-primary group-hover:scale-110" : "text-slate-500 group-hover:text-white group-hover:scale-110")
                                    )} />
                                    {!isCollapsed && <span className="flex-1 tracking-tight">{item.name}</span>}
                                    
                                    {/* Subtle Glass Glow on Active */}
                                    {isActive && !currentStyles.isLight && !item.isStandard && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Tactical Tools (Managed List) */}
                    <div className="space-y-4 relative flex-1 flex flex-col min-h-0">
                        {!isCollapsed && (
                            <div className="px-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className={cn("text-[10px] font-black tracking-[0.2em] uppercase", currentStyles.isLight ? "text-slate-400" : "text-slate-500")}>Tactical Tools</p>
                                    <button 
                                        onClick={() => setIsAddingTool(!isAddingTool)}
                                        className={cn(
                                            "flex items-center gap-1.5 px-2 py-1 rounded-md transition-all text-[9px] font-bold",
                                            isAddingTool 
                                                ? "bg-primary text-black" 
                                                : (currentStyles.isLight ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-white/5 text-slate-400 hover:bg-white/10")
                                        )}
                                    >
                                        Manage
                                        <ChevronLeft className={cn("w-3 h-3 transition-transform", isAddingTool ? "-rotate-90" : "rotate-0")} />
                                    </button>
                                </div>

                                {/* Multi-Select Dropdown Content */}
                                {isAddingTool && (
                                    <div className={cn(
                                        "border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[300px] animate-in slide-in-from-top-2 duration-200 z-[60]",
                                        currentStyles.isLight ? "bg-white border-slate-200" : "bg-[#1a1d23] border-white/10"
                                    )}>
                                        <div className={cn("p-2 border-b", currentStyles.isLight ? "bg-slate-50 border-slate-100" : "bg-black/20 border-white/5")}>
                                            <input 
                                                autoFocus
                                                type="text"
                                                placeholder="Filter catalog..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className={cn(
                                                    "w-full border rounded-lg px-3 py-1.5 text-[10px] outline-none transition-all",
                                                    currentStyles.isLight 
                                                        ? "bg-white border-slate-200 text-slate-900 focus:border-primary" 
                                                        : "bg-white/5 border-white/10 text-white focus:border-primary/50"
                                                )}
                                            />
                                        </div>
                                        <div className="overflow-y-auto no-scrollbar p-1">
                                            {Object.entries(toolRegistry)
                                                .filter(([_, tool]) => tool.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .map(([id, tool]) => {
                                                    const isSelected = quickTools.includes(id);
                                                    return (
                                                        <button
                                                            key={id}
                                                            onClick={() => isSelected ? removeQuickTool(id) : addQuickTool(id)}
                                                            className={cn(
                                                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left group transition-all",
                                                                isSelected 
                                                                    ? (currentStyles.isLight ? "bg-primary/5" : "bg-primary/10")
                                                                    : (currentStyles.isLight ? "hover:bg-slate-50" : "hover:bg-white/5")
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "w-4 h-4 rounded border flex items-center justify-center transition-all",
                                                                isSelected ? "bg-primary border-primary text-black" : "border-white/20"
                                                            )}>
                                                                {isSelected && <Zap className="w-2.5 h-2.5 fill-current" />}
                                                            </div>
                                                            <div className="flex-1 overflow-hidden">
                                                                <p className={cn("text-[10px] font-bold truncate", isSelected ? "text-primary" : (currentStyles.isLight ? "text-slate-900" : "text-white"))}>
                                                                    {tool.name}
                                                                </p>
                                                                <p className="text-[8px] text-slate-500">{tool.phase}</p>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* Display Grid of Selected Tools */}
                        <div className={cn(
                            "grid gap-2 px-4 overflow-y-auto no-scrollbar pb-4",
                            isCollapsed ? "grid-cols-1 px-2" : "grid-cols-2"
                        )}>
                            {mounted && quickTools.map((toolId) => {
                                const tool = toolRegistry[toolId];
                                if (!tool) return null;
                                const isActive = pathname.includes(toolId);
                                
                                // Map category to icon
                                const CATEGORY_ICONS: Record<string, any> = {
                                    'PROJ. MGMT': FileText,
                                    'LEAN': Zap,
                                    'STRATEGY': Target,
                                    'SIX SIGMA': Calculator,
                                    'VOC': Library,
                                    'STATISTICS': Calculator
                                };
                                const Icon = CATEGORY_ICONS[tool.category] || Zap;
                                
                                return (
                                    <Link
                                        key={toolId}
                                        href={`/workspace/${toolId}`}
                                        className={cn(
                                            "flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all h-16 border group relative",
                                            isActive 
                                                ? (currentStyles.isLight ? "bg-primary/5 border-primary/20 text-primary" : "bg-primary/10 border-primary/20 text-primary")
                                                : (currentStyles.isLight ? "bg-slate-50 border-slate-100 text-slate-600 hover:border-primary/30" : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04] hover:border-white/10")
                                        )}
                                        title={tool.name}
                                    >
                                        <Icon className={cn("w-3.5 h-3.5 mb-1.5 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-slate-500")} />
                                        <span className="text-[8px] font-black uppercase leading-none tracking-tighter truncate w-full px-1">
                                            {tool.name.split(' ')[0]}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>

                <div className={cn("p-4 border-t space-y-4 mt-auto", currentStyles.isLight ? "border-slate-100 bg-slate-50/50" : "border-white/5 bg-black/40 backdrop-blur-md")}>
                    {/* Theme Selector */}
                    {!isCollapsed && (
                        <div className="px-2 pb-2">
                            <p className={cn("text-[9px] font-black tracking-widest mb-3 uppercase", currentStyles.isLight ? "text-slate-400" : "text-slate-500")}>UI Aesthetics</p>
                            <div className="flex items-center gap-2">
                                {GLOBAL_AESTHETICS.map((t) => {
                                    const isSelected = mounted && appAesthetic === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setAppAesthetic(t.id);
                                            }}
                                            className={cn(
                                                "w-7 h-7 rounded-full border-2 transition-all cursor-pointer relative z-50",
                                                isSelected ? "border-primary scale-110 shadow-[0_0_15px_rgba(34,211,238,0.5)]" : "border-white/10 hover:border-white/30"
                                            )}
                                            style={{ backgroundColor: t.color }}
                                            title={t.label}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <Link
                            href="/settings"
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all group",
                                pathname?.startsWith('/settings') 
                                    ? (currentStyles.isLight ? "text-primary bg-primary/10" : "text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]") 
                                    : (currentStyles.isLight ? "text-slate-600 hover:text-primary hover:bg-slate-50" : "text-white hover:bg-white/5")
                            )}
                            title={isCollapsed ? "Settings" : undefined}
                        >
                            <Settings className={cn(
                                "w-5 h-5 transition-all duration-500",
                                currentStyles.isLight ? "text-slate-400 group-hover:text-primary" : "text-white group-hover:rotate-90"
                            )} />
                            {!isCollapsed && <span className="tracking-tight">Settings</span>}
                        </Link>
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await fetch('/api/auth/logout', { method: 'POST' });
                                window.location.href = '/login';
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all group",
                                currentStyles.isLight 
                                    ? "text-slate-500 hover:text-red-600 hover:bg-red-50" 
                                    : "text-white hover:text-red-400 hover:bg-red-400/10"
                            )}
                            title={isCollapsed ? "Sign Out" : undefined}
                        >
                            <LogOut className={cn(
                                "w-5 h-5 transition-all",
                                currentStyles.isLight ? "text-slate-400 group-hover:text-red-600" : "text-white group-hover:-translate-x-1"
                            )} />
                            {!isCollapsed && <span className="tracking-tight">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
