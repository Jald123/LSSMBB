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
                    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#121212]">
                        {/* Flutter Glassmorphism Golden/Orange Spheres */}
                        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[80px] animate-[prism-float_15s_ease-in-out_infinite]" />
                        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-yellow-600/15 rounded-full blur-[100px] animate-[prism-float_18s_ease-in-out_infinite_reverse]" />
                        <div className="absolute top-[50%] left-[20%] w-[250px] h-[250px] bg-orange-500/15 rounded-full blur-[60px] animate-[prism-float_12s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />
                        <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] bg-amber-400/10 rounded-full blur-[70px] animate-[prism-float_20s_ease-in-out_infinite_reverse]" style={{ animationDelay: '1s' }} />
                        
                        {/* Fine noise overlay */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
                    </div>
                );
            case 'aurora':
                return (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/40" />
                        
                        {/* LSS Memphis/Geometric Pattern Overlay */}
                        <div className="absolute inset-0 opacity-[0.25]" style={{ 
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.8'%3E%3Cpath d='M40 30h4v-4h2v4h4v2h-4v4h-2v-4h-4z' fill='%23fbbf24'/%3E%3Cpolygon points='120,40 130,20 140,40' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle cx='160' cy='80' r='3' fill='%23a855f7'/%3E%3Crect x='20' y='120' width='12' height='2' fill='%2338bdf8' transform='rotate(-30 26 121)'/%3E%3Cpath d='M80 150a10 10 0 0 1 20 0' fill='none' stroke='%23fbbf24' stroke-width='2'/%3E%3Cpath d='M140 140l10 10m0-10l-10 10' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle cx='100' cy='100' r='2' fill='%23ffffff'/%3E%3Cpolyline points='10,180 15,175 20,180 25,175 30,180' fill='none' stroke='%23a855f7' stroke-width='2'/%3E%3Cpath d='M180 180h4v-4h2v4h4v2h-4v4h-2v-4h-4z' fill='%23ffffff'/%3E%3Cpolygon points='60,180 65,170 70,180' fill='none' stroke='%2338bdf8' stroke-width='2'/%3E%3Ccircle cx='180' cy='30' r='2' fill='%23fbbf24'/%3E%3Crect x='70' y='60' width='10' height='2' fill='%23ffffff' transform='rotate(45 75 61)'/%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '200px 200px'
                        }} />
                        
                        <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
                        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
                        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>
                );
            case 'zenith':
                return <div className="absolute inset-0 bg-[#f8fafc]" />;
            case 'prism':
                return (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#f8fafc]">
                        {/* Cross-stitch diamond dot grid pattern */}
                        <div className="absolute inset-0 opacity-[0.35]" style={{ 
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 1l2 2-2 2-2-2zm6 0l2 2-2 2-2-2z' fill='%23cbd5e1' fill-opacity='0.5' fill-rule='evenodd'/%3E%3Cpath d='M5 7l2 2-2 2-2-2zm6 0l2 2-2 2-2-2z' fill='%23cbd5e1' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                            backgroundSize: '12px 12px'
                        }} />
                        
                        {/* Fluttering / Floating distinct geometric shapes behind the glass */}
                        <div className="absolute top-[15%] left-[15%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] animate-[prism-float_12s_ease-in-out_infinite]" />
                        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[90px] animate-[prism-float_15s_ease-in-out_infinite_reverse]" />
                        <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-cyan-400/15 rounded-full blur-[70px] animate-[prism-float_10s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
                        
                        {/* Geometric "Flutter" shapes for distinct glassmorphism contrast */}
                        <div className="absolute top-[20%] right-[20%] w-[200px] h-[200px] bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-3xl blur-[20px] animate-[prism-spin_20s_linear_infinite]" style={{ transform: 'rotate(45deg)' }} />
                        <div className="absolute bottom-[30%] left-[20%] w-[250px] h-[250px] bg-gradient-to-bl from-blue-400/20 to-cyan-400/20 rounded-[40px] blur-[25px] animate-[prism-spin_25s_linear_infinite_reverse]" />
                        
                        {/* Laser Beams in the background */}
                        <div className="absolute top-[30%] left-[-10%] right-[-10%] h-[1px] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent blur-[1px] animate-[prism-laser_8s_linear_infinite]" />
                        <div className="absolute bottom-[40%] left-[-10%] right-[-10%] h-[2px] bg-gradient-to-r from-transparent via-pink-400/20 to-transparent blur-[2px] animate-[prism-laser_12s_linear_infinite_reverse]" />
                    </div>
                );
            case 'netscape':
                return <div className="absolute inset-0 bg-[#c0c0c0]" />;
            case 'vintage':
                return (
                    <div className="absolute inset-0 bg-[#f5f0e1] overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
                    </div>
                );
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
