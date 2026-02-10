"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState } from "react";

export function TopBar({ mode, setMode }: { mode: 'LEARN' | 'DO', setMode: (m: 'LEARN' | 'DO') => void }) {
    const { theme, setTheme } = useTheme();

    return (
        <header className="h-16 fixed top-0 inset-x-0 border-b border-border bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rotate-45" />
                    </div>
                    <span className="font-display font-black tracking-tight text-xl">NEXUS ACADEMY</span>
                </div>

                {/* 🕹️ Learn/Do Toggle */}
                <div className="bg-surface p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => setMode('LEARN')}
                        className={`px-6 py-1.5 rounded-lg text-xs font-black tracking-widest transition-all ${mode === 'LEARN'
                                ? 'bg-card shadow-sm text-foreground'
                                : 'text-muted hover:text-foreground'
                            }`}
                    >
                        LEARN
                    </button>
                    <button
                        onClick={() => setMode('DO')}
                        className={`px-6 py-1.5 rounded-lg text-xs font-black tracking-widest transition-all ${mode === 'DO'
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                : 'text-muted hover:text-foreground'
                            }`}
                    >
                        DO
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <div className="flex items-center bg-surface p-1 rounded-lg">
                    <button
                        onClick={() => setTheme('light')}
                        className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-card text-foreground shadow-sm' : 'text-muted'}`}
                    >
                        <Sun className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-card text-foreground shadow-sm' : 'text-muted'}`}
                    >
                        <Moon className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setTheme('system')}
                        className={`p-1.5 rounded-md transition-colors ${theme === 'system' ? 'bg-card text-foreground shadow-sm' : 'text-muted'}`}
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
