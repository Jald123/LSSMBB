"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Mode = "LEARN" | "DO";

interface AppModeContextType {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export function AppModeProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Default state: LEARN
    const [mode, setModeState] = useState<Mode>("LEARN");

    // Sync state with URL on mount and whenever URL changes
    useEffect(() => {
        const urlMode = searchParams.get("mode")?.toUpperCase();
        if (urlMode === "LEARN" || urlMode === "DO") {
            setModeState(urlMode as Mode);
        }
    }, [searchParams]);

    const setMode = (newMode: Mode) => {
        setModeState(newMode);

        // Update URL query parameter
        const params = new URLSearchParams(searchParams.toString());
        params.set("mode", newMode.toLowerCase());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <AppModeContext.Provider value={{ mode, setMode }}>
            {children}
        </AppModeContext.Provider>
    );
}

export function useAppMode() {
    const context = useContext(AppModeContext);
    if (context === undefined) {
        throw new Error("useAppMode must be used within an AppModeProvider");
    }
    return context;
}
