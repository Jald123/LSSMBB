"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Bell, Menu, Moon, Search, Sun, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CommandPalette } from "../patterns/CommandPalette";

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsCommandOpen(open => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    // Simple breadcrumb logic
    const pathParts = pathname?.split('/').filter(Boolean) || [];
    const breadcrumbs = ['Home', ...pathParts.map(p => p.charAt(0).toUpperCase() + p.slice(1))].join(' / ');

    return (
        <>
            <header className="h-14 md:h-16 fixed top-0 inset-x-0 border-b border-border bg-card/80 backdrop-blur-md z-40 px-4">
                <div className="flex items-center justify-between h-full gap-4 max-w-[1920px] mx-auto">
                    
                    {/* Left: Hamburger & Logo & Breadcrumbs */}
                    <div className="flex items-center gap-4 flex-1">
                        <button 
                            onClick={onMenuClick}
                            className="lg:hidden p-2 text-muted-foreground hover:bg-surface rounded-md"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        
                        <Link href="/" className="flex items-center gap-2 group shrink-0">
                            <div className="w-8 h-8 flex items-center justify-center relative">
                                {/* Stylized N Node */}
                                <div className="absolute inset-x-1 top-2 bottom-1 border-x-2 border-primary rotate-12 transition-transform group-hover:rotate-0" />
                                <div className="absolute inset-1 border-y-2 border-primary -rotate-12 transition-transform group-hover:rotate-0" />
                            </div>
                            <span className="font-display font-bold text-lg hidden sm:block tracking-wide">NEXUS</span>
                        </Link>

                        <div className="hidden md:flex border-l border-border h-6 mx-2" />
                        
                        <div className="hidden md:block text-sm text-muted-foreground truncate max-w-sm">
                            {breadcrumbs}
                        </div>
                    </div>

                    {/* Center: Command Palette Trigger */}
                    <div className="flex-1 max-w-md hidden md:block">
                        <button 
                            id="header-search"
                            onClick={() => setIsCommandOpen(true)}
                            className="w-full h-9 flex items-center gap-2 px-3 text-sm text-muted-foreground bg-surface border border-border rounded-lg hover:border-primary/50 hover:bg-surface/80 transition-colors"
                        >
                            <Search className="w-4 h-4 opacity-50" />
                            <span className="flex-1 text-left">Search tools, projects...</span>
                            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </button>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
                        <button 
                            onClick={() => setIsCommandOpen(true)}
                            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-card" />
                        </button>

                        <button
                            aria-label="Toggle Theme"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-muted-foreground hover:text-primary transition-colors hidden sm:block"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs cursor-pointer hover:bg-primary/20 transition-colors">
                            <User className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </header>

            <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
        </>
    );
}
