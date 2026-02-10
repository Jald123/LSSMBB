"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useAppMode } from "@/context/AppModeContext";

export function TopBar() {
    const { theme, setTheme } = useTheme();
    const { mode, setMode } = useAppMode();

    return (
        <header className="h-16 fixed top-0 inset-x-0 border-b border-border bg-white z-50 px-6">
            <div className="grid grid-cols-3 items-center h-full">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rotate-45" />
                    </div>
                    <span className="font-display font-black tracking-tight text-xl text-[#1a1a2e]">NEXUS ACADEMY</span>
                </div>

                {/* Center: Segmented Toggle */}
                <div className="flex justify-center">
                    <div className="inline-flex bg-[#f3f4f6] p-1 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative">
                        <button
                            onClick={() => setMode('LEARN')}
                            className={`relative z-10 px-8 py-2 rounded-full text-xs font-black tracking-widest transition-all duration-200 ease-in-out ${mode === 'LEARN'
                                ? 'bg-[#ff1e00] text-white shadow-sm'
                                : 'text-[#6b7280] hover:text-[#1a1a2e]'
                                }`}
                        >
                            LEARN
                        </button>
                        <button
                            onClick={() => setMode('DO')}
                            className={`relative z-10 px-8 py-2 rounded-full text-xs font-black tracking-widest transition-all duration-200 ease-in-out ${mode === 'DO'
                                ? 'bg-[#ff1e00] text-white shadow-sm'
                                : 'text-[#6b7280] hover:text-[#1a1a2e]'
                                }`}
                        >
                            DO
                        </button>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center bg-[#f3f4f6] p-1 rounded-lg">
                        <button
                            onClick={() => setTheme('light')}
                            className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white text-[#1a1a2e] shadow-sm' : 'text-[#6b7280]'}`}
                        >
                            <Sun className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-white text-[#1a1a2e] shadow-sm' : 'text-[#6b7280]'}`}
                        >
                            <Moon className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#ff1e00]/10 border border-[#ff1e00]/20 flex items-center justify-center text-[#ff1e00] font-black text-xs">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
}
