"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { GlobalSidebar } from "../navigation/GlobalSidebar";
import { useNexus } from "@/context/NexusContext";
import { OnboardingTour } from "../patterns/OnboardingTour";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isSidebarCollapsed, toggleSidebar } = useNexus();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Routes that should NOT have the sidebar
    const isLogin = pathname === "/login";

    if (isLogin) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-[#020617] text-foreground selection:bg-primary/30 overflow-hidden">
            <GlobalSidebar />
            <OnboardingTour />
            
            <main className="flex-1 relative h-screen overflow-y-auto no-scrollbar">
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
