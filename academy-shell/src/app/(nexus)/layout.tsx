"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function NexusLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isImmersive = pathname?.startsWith('/workspace') || pathname?.includes('/tool/');

    if (isImmersive) {
        return <>{children}</>;
    }

    return (
        <div className="relative w-full h-full min-h-screen text-slate-100">
            {/* 🌌 Atmospheric Layers tailored for Nexus Routes */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
