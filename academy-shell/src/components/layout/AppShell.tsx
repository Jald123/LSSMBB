"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useNexus } from "@/context/NexusContext";
import { OnboardingTour } from "../patterns/OnboardingTour";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isSidebarCollapsed, toggleSidebar } = useNexus();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Routes that should NOT have the standard TopBar/Sidebar
    const isLogin = pathname === "/login";
    const isWorkspace = pathname?.startsWith("/workspace") || 
                       pathname?.includes("/tool/") || 
                       pathname?.includes("/tools/") ||
                       pathname?.includes("/04-STATISTICS-TOOLS/");

    if (isLogin || isWorkspace) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
            <TopBar onMenuClick={() => setIsMobileSidebarOpen(true)} />
            <OnboardingTour />
            
            <div className="flex flex-1 pt-14 md:pt-16 h-screen">
                <Sidebar 
                    isCollapsed={isSidebarCollapsed} 
                    onToggle={toggleSidebar}
                    isOpen={isMobileSidebarOpen}
                    setIsOpen={setIsMobileSidebarOpen}
                />
                
                <main className="flex-1 relative w-full h-full overflow-y-auto overflow-x-hidden">
                    <div className="container mx-auto p-4 md:p-6 lg:p-8 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
