"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Map,
    Layout as LayoutIcon,
    Shield,
    Award,
    Lock,
    ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { name: 'Hangar', icon: Home, path: '/hangar' },
    { name: 'Journey', icon: Map, path: '/journey' },
    { name: 'Workspace', icon: LayoutIcon, path: '/workspace' },
    { name: 'Armory', icon: Shield, path: '/armory' },
    { name: 'Certification', icon: Award, path: '/certification' },
    { name: 'Admin', icon: Lock, path: '/admin', adminOnly: true },
];

export function Sidebar({ userRole }: { userRole: string }) {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen border-r border-border bg-card flex flex-col pt-20">
            <nav className="flex-1 px-4 space-y-2">
                {navItems.filter(item => !item.adminOnly || userRole === 'ADMIN').map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted hover:bg-surface hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            <span className="flex-1">{item.name}</span>
                            {isActive && <ChevronRight className="w-3 h-3" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 px-3 py-2 bg-surface rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                        {userRole[0]}
          }</div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold truncate">Nexus Academic</p>
                        <p className="text-[10px] text-muted truncate">{userRole} Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
