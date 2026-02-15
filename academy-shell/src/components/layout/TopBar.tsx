"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useAppMode } from "@/context/AppModeContext";

export function TopBar() {
    const { theme, setTheme } = useTheme();
    const { mode, setMode } = useAppMode();

    return (
        <header className="h-16 fixed top-0 inset-x-0 border-b border-border bg-white z-50 px-4 md:px-6">
            <div className="flex items-center justify-between h-full">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rotate-45" />
                    </div>
                    <span className="font-display font-black tracking-tight text-lg text-[#1a1a2e] hidden sm:block">NEXUS ACADEMY</span>
                </div>

                {/* Center: Segmented Toggle */}
                <div className="flex justify-center" role="tablist" aria-label="Mode Selection">
                    <div className="inline-flex bg-[#f3f4f6] p-1 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative">
                        <button
                            role="tab"
                            aria-selected={mode === 'LEARN'}
                            onClick={() => setMode('LEARN')}
                            className={`relative z-10 px-4 md:px-8 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black tracking-widest transition-all duration-200 ease-in-out ${mode === 'LEARN'
                                ? 'bg-[#ff1e00] text-white shadow-sm'
                                : 'text-[#6b7280] hover:text-[#1a1a2e]'
                                }`}
                        >
                            LEARN
                        </button>
                        <button
                            role="tab"
                            aria-selected={mode === 'DO'}
                            onClick={() => setMode('DO')}
                            className={`relative z-10 px-4 md:px-8 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black tracking-widest transition-all duration-200 ease-in-out ${mode === 'DO'
                                ? 'bg-[#ff1e00] text-white shadow-sm'
                                : 'text-[#6b7280] hover:text-[#1a1a2e]'
                                }`}
                        >
                            DO
                        </button>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:flex items-center bg-[#f3f4f6] p-1 rounded-lg">
                        <button
                            aria-label="Light Theme"
                            onClick={() => setTheme('light')}
                            className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white text-[#1a1a2e] shadow-sm' : 'text-[#6b7280]'}`}
                        >
                            <Sun className="w-4 h-4" />
                        </button>
                        <button
                            aria-label="Dark Theme"
                            onClick={() => setTheme('dark')}
                            className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-white text-[#1a1a2e] shadow-sm' : 'text-[#6b7280]'}`}
                        >
                            <Moon className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#ff1e00]/10 border border-[#ff1e00]/20 flex items-center justify-center text-[#ff1e00] font-black text-xs">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
}
