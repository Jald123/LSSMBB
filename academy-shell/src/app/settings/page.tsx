"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { 
    User, 
    Shield, 
    Bell, 
    Moon, 
    Globe, 
    Database, 
    Trash2, 
    ChevronRight, 
    ExternalLink,
    Terminal,
    Eye,
    Monitor
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function SettingsHub() {
    const [activeSection, setActiveSection] = useState('profile');

    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20 font-sans">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    
                    <PageHeader 
                        title="Configuration" 
                        description="Personalize your Nexus environment and manage security protocols."
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        
                        {/* Settings Navigation */}
                        <div className="lg:col-span-3 space-y-2">
                            {[
                                { id: 'profile', label: 'Operator Profile', icon: User },
                                { id: 'security', label: 'Security & Access', icon: Shield },
                                { id: 'interface', label: 'Interface & UI', icon: Monitor },
                                { id: 'data', label: 'Data Management', icon: Database },
                                { id: 'notifications', label: 'Comm-Link Alerts', icon: Bell },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all group",
                                        activeSection === item.id 
                                            ? "bg-primary text-black font-bold shadow-lg shadow-primary/20" 
                                            : "hover:bg-surface text-slate-400"
                                    )}
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm tracking-wide">{item.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Settings Content Area */}
                        <div className="lg:col-span-9">
                            <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 space-y-12 shadow-2xl">
                                
                                {activeSection === 'profile' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                                        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-white/5 pb-10">
                                            <div className="relative group">
                                                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-accent overflow-hidden">
                                                    <div className="w-full h-full flex items-center justify-center text-black text-3xl font-black">OP</div>
                                                </div>
                                                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all">
                                                    <Terminal className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="text-center md:text-left space-y-2">
                                                <h3 className="text-2xl font-bold font-display tracking-tight text-white">Operator Identifier</h3>
                                                <p className="text-sm text-slate-500 uppercase font-black tracking-widest">Global UID: 786-CC8F2-7E11</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Codename</label>
                                                <input type="text" placeholder="Nexus Architect" className="w-full bg-surface border border-border px-5 py-4 rounded-2xl text-sm font-medium focus:border-primary/50 transition-all outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Network Address</label>
                                                <input type="email" placeholder="architect@nexus.academy" className="w-full bg-surface border border-border px-5 py-4 rounded-2xl text-sm font-medium focus:border-primary/50 transition-all outline-none opacity-60 cursor-not-allowed" disabled />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'interface' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold font-display tracking-tight text-white">Visual Protocol</h3>
                                            <p className="text-sm text-slate-500">Customize how the Nexus terminal appears across your fleet.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-6 bg-surface border border-border rounded-2xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                        <Moon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-sm">Always Dark Mode</p>
                                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Optimized for high-focus operations</p>
                                                    </div>
                                                </div>
                                                <div className="w-12 h-6 bg-primary rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-6 bg-surface border border-border rounded-2xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                                                        <Terminal className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-sm">Immersive SFX</p>
                                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Auditory feedback on terminal actions</p>
                                                    </div>
                                                </div>
                                                <div className="w-12 h-6 bg-surface border border-white/10 rounded-full relative">
                                                    <div className="absolute left-1 top-1 w-4 h-4 bg-slate-700 rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'data' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                                        <div className="space-y-6">
                                            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-start gap-4">
                                                <Trash2 className="w-5 h-5 text-red-500 mt-1" />
                                                <div className="space-y-1">
                                                    <p className="font-bold text-red-400">Hazardous Operations</p>
                                                    <p className="text-xs text-slate-500 leading-relaxed">
                                                        Total mission archival and factory resets cannot be undone. All project datasets, certificates, and XP progress will be permanently detached.
                                                    </p>
                                                    <Button variant="outline" size="sm" className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10">
                                                        System Factory Reset
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-10 border-t border-white/5 flex justify-end gap-3">
                                    <Button variant="outline">Reset Defaults</Button>
                                    <Button variant="nexus" className="px-8 font-black uppercase tracking-widest">Synchronize Settings</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
