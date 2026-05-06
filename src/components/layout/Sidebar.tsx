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
    X,
    Moon,
    Sun
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
    { id: 'obsidian', color: '#050505', label: 'Glasscope' },
    { id: 'ocean', color: '#002B36', label: 'Titanium' },
    { id: 'ether', color: 'linear-gradient(135deg, #121212 0%, #f59e0b 100%)', label: 'Ether (Flutter Glass)' },
    { id: 'aurora', color: '#1E1B4B', label: 'Aurora (Vibrant)' },
    { id: 'zenith', color: '#FFFFFF', label: 'Zenith (Pure)' },
    { id: 'prism', color: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', label: 'Prism (Modern Light)' },
    { id: 'netscape', color: '#c0c0c0', label: 'Netscape 1995' },
    { id: 'vintage', color: '#f5f0e1', label: 'Vintage (Retro Web)' },
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
            case 'ether': // Flutter Glassmorphism Dark
                return {
                    background: 'rgba(18, 18, 18, 0.4)',
                    isLight: false,
                    overlay: (
                        <>
                            <div className="absolute inset-0 backdrop-blur-2xl" />
                            <div className="absolute -top-[10%] -left-[10%] w-48 h-48 bg-amber-500/15 rounded-full blur-[50px] animate-pulse" />
                            <div className="absolute bottom-[20%] -right-[10%] w-40 h-40 bg-orange-500/10 rounded-full blur-[40px] animate-pulse" />
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
                        </>
                    )
                };
            case 'aurora': // Eye-catching
                return {
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                    isLight: false,
                    overlay: (
                        <>
                            {/* LSS Geometric Pattern */}
                            <div className="absolute inset-0 opacity-[0.25]" style={{ 
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.8'%3E%3Cpath d='M40 30h4v-4h2v4h4v2h-4v4h-2v-4h-4z' fill='%23fbbf24'/%3E%3Cpolygon points='120,40 130,20 140,40' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle cx='160' cy='80' r='3' fill='%23a855f7'/%3E%3Crect x='20' y='120' width='12' height='2' fill='%2338bdf8' transform='rotate(-30 26 121)'/%3E%3Cpath d='M80 150a10 10 0 0 1 20 0' fill='none' stroke='%23fbbf24' stroke-width='2'/%3E%3Cpath d='M140 140l10 10m0-10l-10 10' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle cx='100' cy='100' r='2' fill='%23ffffff'/%3E%3Cpolyline points='10,180 15,175 20,180 25,175 30,180' fill='none' stroke='%23a855f7' stroke-width='2'/%3E%3Cpath d='M180 180h4v-4h2v4h4v2h-4v4h-2v-4h-4z' fill='%23ffffff'/%3E%3Cpolygon points='60,180 65,170 70,180' fill='none' stroke='%2338bdf8' stroke-width='2'/%3E%3Ccircle cx='180' cy='30' r='2' fill='%23fbbf24'/%3E%3Crect x='70' y='60' width='10' height='2' fill='%23ffffff' transform='rotate(45 75 61)'/%3E%3C/g%3E%3C/svg%3E")`,
                                backgroundSize: '200px 200px'
                            }} />
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
            case 'prism': // Modern Light
                return {
                    background: 'rgba(240, 242, 245, 0.8)',
                    isLight: true,
                    overlay: (
                        <>
                            <div className="absolute inset-0 backdrop-blur-xl" />
                            <div className="absolute -top-[10%] -left-[10%] w-40 h-40 bg-indigo-500/10 rounded-full blur-[40px] animate-pulse" />
                            <div className="absolute bottom-[20%] -right-[10%] w-32 h-32 bg-pink-500/10 rounded-full blur-[30px] animate-pulse" />
                            <div className="absolute inset-0 opacity-[0.25] pointer-events-none" 
                                style={{ 
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 1l2 2-2 2-2-2zm6 0l2 2-2 2-2-2z' fill='%23cbd5e1' fill-opacity='0.5' fill-rule='evenodd'/%3E%3Cpath d='M5 7l2 2-2 2-2-2zm6 0l2 2-2 2-2-2z' fill='%23cbd5e1' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                    backgroundSize: '12px 12px'
                                }} 
                            />
                        </>
                    )
                };
            case 'netscape':
                return {
                    background: '#c0c0c0',
                    isLight: true,
                    overlay: (
                        <div className="absolute inset-0 border-r-[3px] border-[#808080] shadow-[inset_-1px_0_0_#ffffff]" />
                    )
                };
            case 'vintage':
                return {
                    background: '#ede5d0',
                    isLight: true,
                    overlay: (
                        <>
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#006666]" />
                        </>
                    )
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

                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-10 no-scrollbar relative z-10">
                    {/* Primary Nav */}
                    <div className="space-y-2">
                        {!isCollapsed && <p className="px-4 text-[10px] font-black tracking-[0.2em] mb-4 uppercase" style={{ color: currentStyles.isLight ? '#94a3b8' : '#64748b' }}>Primary Systems</p>}
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
                                    <p className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: currentStyles.isLight ? '#94a3b8' : '#64748b' }}>Tactical Tools</p>
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

                <div 
                    className={cn("p-4 border-t space-y-4 mt-auto relative z-10", currentStyles.isLight ? "border-slate-300" : "border-white/5 bg-black/40 backdrop-blur-md")}
                    style={currentStyles.isLight ? { backgroundColor: 'rgba(255,255,255,0.7)' } : undefined}
                >
                    {/* Theme Selector - Two rows: Dark / Day */}
                    {!isCollapsed && (
                        <div className="px-2 pb-2">
                            <p className="text-[9px] font-black tracking-widest mb-3 uppercase" style={{ color: currentStyles.isLight ? '#64748b' : '#64748b' }}>UI Aesthetics</p>
                            
                            {/* Dark Modes Row */}
                            <div className="flex items-center gap-2 mb-2">
                                <Moon className="w-3.5 h-3.5 shrink-0" style={{ color: currentStyles.isLight ? '#94a3b8' : '#475569' }} />
                                <div className="flex items-center gap-1.5">
                                    {GLOBAL_AESTHETICS.filter(t => ['obsidian', 'ocean', 'ether', 'aurora'].includes(t.id)).map((t) => {
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
                                                    "w-6 h-6 rounded-full border-2 transition-all cursor-pointer relative z-50",
                                                    isSelected ? "border-primary scale-110 shadow-[0_0_15px_rgba(34,211,238,0.5)]" : "border-slate-300 hover:border-slate-500"
                                                )}
                                                style={{ background: t.color }}
                                                title={t.label}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            
                            {/* Day Modes Row */}
                            <div className="flex items-center gap-2">
                                <Sun className="w-3.5 h-3.5 shrink-0" style={{ color: currentStyles.isLight ? '#94a3b8' : '#475569' }} />
                                <div className="flex items-center gap-1.5">
                                    {GLOBAL_AESTHETICS.filter(t => ['zenith', 'prism', 'netscape', 'vintage'].includes(t.id)).map((t) => {
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
                                                    "w-6 h-6 rounded-full border-2 transition-all cursor-pointer relative z-50",
                                                    isSelected ? "border-primary scale-110 shadow-[0_0_15px_rgba(34,211,238,0.5)]" : "border-slate-300 hover:border-slate-500"
                                                )}
                                                style={{ background: t.color }}
                                                title={t.label}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all group hover:bg-primary/5"
                            style={{ color: currentStyles.isLight ? '#1e293b' : '#ffffff' }}
                            title={isCollapsed ? "Settings" : undefined}
                        >
                            <Settings className="w-5 h-5 transition-all duration-500 group-hover:text-primary" style={{ color: currentStyles.isLight ? '#475569' : '#ffffff' }} />
                            {!isCollapsed && <span className="tracking-tight">Settings</span>}
                        </Link>
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await fetch('/api/auth/logout', { method: 'POST' });
                                window.location.href = '/login';
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all group hover:bg-red-50"
                            style={{ color: currentStyles.isLight ? '#475569' : '#ffffff' }}
                            title={isCollapsed ? "Sign Out" : undefined}
                        >
                            <LogOut className="w-5 h-5 transition-all group-hover:text-red-600" style={{ color: currentStyles.isLight ? '#64748b' : '#ffffff' }} />
                            {!isCollapsed && <span className="tracking-tight">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
