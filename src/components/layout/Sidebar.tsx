"use client";

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
    FileText
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const PRIMARY_NAV = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Academy', icon: BookOpen, path: '/academy' },
    { name: 'Execute', icon: Zap, path: '/execute' },
    { name: 'Armory', icon: Shield, path: '/armory' },
    { name: 'Certificate', icon: FileText, path: '/certificate' },
    { name: 'Achievements', icon: Award, path: '/achievements' },
    { name: 'Control Center', icon: Map, path: '/admin', roles: ['ADMIN'] },
];

const QUICK_TOOLS = [
    { name: 'Stats Engine', icon: Calculator, path: '/workspace/desc-stats' },
    { name: 'Sigma Lab', icon: Zap, path: '/armory/sigma-lab' },
    { name: 'Scope Sniper', icon: Target, path: '/armory/scope-sniper' },
];

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

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                id="sidebar-anchor"
                className={cn(
                "fixed lg:sticky top-0 lg:top-[64px] inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out h-full lg:h-[calc(100vh-64px)]",
                isCollapsed ? "w-20" : "w-64",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                {/* Collapse Toggle (Desktop only) */}
                <button 
                    onClick={onToggle}
                    className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-primary text-primary-foreground rounded-full items-center justify-center shadow-md hover:bg-primary/90 z-50"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 no-scrollbar">
                    {/* Primary Nav */}
                    <div className="space-y-1">
                        {!isCollapsed && <p className="px-3 text-xs font-bold tracking-wider text-muted-foreground mb-3">PRIMARY NAV</p>}
                        {PRIMARY_NAV.map((item) => {
                            const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-surface hover:text-foreground"
                                    )}
                                    title={isCollapsed ? item.name : undefined}
                                >
                                    <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                    {!isCollapsed && <span className="flex-1">{item.name}</span>}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Context Panel could go here when active */}

                    {/* Quick Tools */}
                    <div className="space-y-1">
                        {!isCollapsed && <p className="px-3 text-xs font-bold tracking-wider text-muted-foreground mb-3">QUICK TOOLS</p>}
                        {QUICK_TOOLS.map((item) => {
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group text-muted-foreground hover:bg-surface hover:text-foreground"
                                    )}
                                    title={isCollapsed ? item.name : undefined}
                                >
                                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                                    {!isCollapsed && <span className="flex-1 truncate">{item.name}</span>}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className="p-3 border-t border-border space-y-1">
                    <Link
                        href="/settings"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-surface hover:text-foreground",
                            pathname?.startsWith('/settings') && "bg-primary/10 text-primary"
                        )}
                        title={isCollapsed ? "Settings" : undefined}
                    >
                        <Settings className="w-5 h-5" />
                        {!isCollapsed && <span>Settings</span>}
                    </Link>
                    <button
                        onClick={async () => {
                            await fetch('/api/auth/logout', { method: 'POST' });
                            window.location.href = '/login';
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        title={isCollapsed ? "Sign Out" : undefined}
                    >
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
