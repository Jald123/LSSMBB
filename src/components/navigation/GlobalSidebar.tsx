"use client";

import React, { useState } from "react";
import { 
    LayoutDashboard, 
    Library, 
    BookOpen, 
    BarChart3, 
    Settings, 
    ChevronLeft, 
    ChevronRight,
    Zap,
    Target,
    Activity,
    ShieldCheck,
    LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SidebarItemProps {
    icon: any;
    label: string;
    isActive: boolean;
    onClick: () => void;
    collapsed: boolean;
    badge?: string;
    variant?: 'default' | 'active-mission';
}

const SidebarItem = ({ icon: Icon, label, isActive, onClick, collapsed, badge, variant = 'default' }: SidebarItemProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "group relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 mb-1 w-full overflow-hidden",
                isActive 
                    ? (variant === 'active-mission' ? "bg-primary text-black" : "bg-white/10 text-white shadow-lg") 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
        >
            <Icon className={cn("w-5 h-5 shrink-0 transition-transform duration-300", !isActive && "group-hover:scale-110")} />
            
            <AnimatePresence>
                {!collapsed && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={cn("text-sm font-bold whitespace-nowrap tracking-tight", isActive ? "font-black" : "font-semibold")}
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>

            {badge && !collapsed && (
                <div className="ml-auto px-1.5 py-0.5 rounded-md bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">
                    {badge}
                </div>
            )}

            {isActive && (
                <motion.div 
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                />
            )}
        </button>
    );
};

export const GlobalSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    // Dynamic extraction of active mission from path
    const isProjectView = pathname.includes("/do/project/");
    const projectId = isProjectView ? pathname.split("/")[3] : null;

    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Command Hub', path: '/' },
        { id: 'library', icon: Library, label: 'Mission Registry', path: '/library' },
        { id: 'encyclopedia', icon: BookOpen, label: 'Encyclopedia', path: '/encyclopedia' },
        { id: 'analytics', icon: BarChart3, label: 'Mastery Stats', path: '/analytics' },
    ];

    return (
        <div 
            className={cn(
                "h-screen sticky top-0 bg-[#020617] border-r border-white/5 flex flex-col transition-all duration-500 z-[100] group/sidebar shadow-2xl",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header: Logo */}
            <div className="h-20 flex items-center px-6 mb-4 shrink-0 overflow-hidden">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <Zap className="w-5 h-5 text-black" />
                    </div>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col"
                        >
                            <span className="text-sm font-black text-white tracking-widest leading-none">LEXIS NUX</span>
                            <span className="text-[8px] font-black text-primary tracking-[0.2em] uppercase mt-1">Sensei.AI v1.5</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Collapse Toggle */}
            <button 
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-24 w-6 h-6 bg-[#020617] border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-xl z-50 hover:scale-110"
            >
                {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>

            {/* Navigation Section */}
            <div className="flex-1 px-4 space-y-8 overflow-y-auto no-scrollbar">
                <div>
                    {!collapsed && (
                        <div className="px-2 mb-4">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Navigation</span>
                        </div>
                    )}
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            isActive={pathname === item.path || (item.id === 'dashboard' && pathname === '/')}
                            onClick={() => router.push(item.path)}
                            collapsed={collapsed}
                        />
                    ))}
                </div>

                {/* Active Mission Quick Access */}
                {projectId && (
                    <div className="pt-4 border-t border-white/5">
                        {!collapsed && (
                            <div className="px-2 mb-4">
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Active Deployment</span>
                            </div>
                        )}
                        <SidebarItem
                            icon={ShieldCheck}
                            label="Board: Current"
                            isActive={pathname.includes("/board")}
                            onClick={() => router.push(`/do/project/${projectId}/board`)}
                            collapsed={collapsed}
                            variant="active-mission"
                            badge="LIVE"
                        />
                    </div>
                )}
            </div>

            {/* Footer Section */}
            <div className="p-4 border-t border-white/5 bg-black/20 shrink-0">
                <div className={cn(
                    "flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group/user",
                    collapsed && "justify-center"
                )}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-xs font-black text-white shrink-0 border border-white/10 group-hover/user:border-primary/50 transition-all">
                        JD
                    </div>
                    {!collapsed && (
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">Jaldhaher</p>
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest truncate">Master Black Belt</p>
                        </div>
                    )}
                    {!collapsed && <LogOut className="w-4 h-4 text-slate-500 hover:text-red-500 transition-colors" />}
                </div>
            </div>
        </div>
    );
};
