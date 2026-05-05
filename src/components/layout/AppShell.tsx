"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useNexus } from "@/context/NexusContext";
import { OnboardingTour } from "../patterns/OnboardingTour";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isSidebarCollapsed, toggleSidebar, appAesthetic } = useNexus();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Routes that should NOT have the standard TopBar/Sidebar
    const isLogin = pathname === "/login";
    const isWorkspace = pathname?.startsWith("/workspace") || 
                       pathname?.includes("/tool/") || 
                       pathname?.includes("/tools/") ||
                       pathname?.includes("/04-STATISTICS-TOOLS/");

    if (isLogin || isWorkspace) {
        return <>{children}</>;
    }

    const getWorkspaceAesthetic = () => {
        if (!mounted) return <div className="absolute inset-0 bg-[#020617]" />;

        switch(appAesthetic) {
            case 'obsidian':
                return (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 backdrop-blur-[100px]" />
                        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                    </div>
                );
            case 'ether':
                return (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.2)]" />
                        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    </div>
                );
            case 'aurora':
                return (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-900 to-purple-900/20" />
                        <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
                    </div>
                );
            case 'zenith':
                return <div className="absolute inset-0 bg-[#f8fafc]" />;
            default:
                return <div className="absolute inset-0 bg-[#020617]" />;
        }
    };

    const currentAesthetic = mounted ? appAesthetic : 'slate';

    return (
        <div className={`flex flex-col min-h-screen text-foreground selection:bg-primary/30 aesthetic-${currentAesthetic}`} style={{ background: 'var(--nexus-bg)' }}>
            {getWorkspaceAesthetic()}
            
            <TopBar onMenuClick={() => setIsMobileSidebarOpen(true)} />
            <OnboardingTour />
            
            <div className="flex flex-1 pt-14 md:pt-16 h-screen relative z-10">
                <Sidebar 
                    isCollapsed={isSidebarCollapsed} 
                    onToggle={toggleSidebar}
                    isOpen={isMobileSidebarOpen}
                    setIsOpen={setIsMobileSidebarOpen}
                />
                
                <main className="flex-1 relative w-full h-full overflow-y-auto overflow-x-hidden">
                    <div className="container mx-auto p-4 md:p-6 lg:p-8 min-h-full relative z-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
