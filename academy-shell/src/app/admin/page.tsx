"use client";

import { useState } from "react";
import { 
    Users, 
    BookOpen, 
    Settings, 
    BarChart3, 
    ShieldCheck, 
    Search, 
    Plus, 
    MoreVertical, 
    ArrowUpRight, 
    ArrowDownRight,
    Activity,
    Database,
    Lock
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/primitives/MetricCard";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('citizens');

    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20 font-sans">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    
                    <PageHeader 
                        title="Control Center" 
                        description="Global surveillance and platform permission management."
                        actions={
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm">
                                    <Database className="w-4 h-4 mr-2" />
                                    System Logs
                                </Button>
                                <Button variant="nexus" size="sm">
                                    <Lock className="w-4 h-4 mr-2" />
                                    Global Lock
                                </Button>
                            </div>
                        }
                    />

                    {/* High-Level Fleet Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard 
                            title="Total Citizens" 
                            value="1,284" 
                            trend="up" 
                            trendValue="+12%" 
                            icon={<Users className="w-4 h-4" />} 
                        />
                        <MetricCard 
                            title="Active Missions" 
                            value="342" 
                            trend="up" 
                            trendValue="89% SR" 
                            icon={<Activity className="w-4 h-4 text-primary" />} 
                        />
                        <MetricCard 
                            title="Certs Issued" 
                            value="45" 
                            description="Batch 4 Readiness" 
                            icon={<AwardIcon className="w-4 h-4 text-nexus-gold" />} 
                        />
                        <MetricCard 
                            title="System Health" 
                            value="99.9%" 
                            description="Uptime: 45d" 
                            icon={<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />} 
                        />
                    </div>

                    {/* Fleet Management Table */}
                    <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <div className="flex p-2 bg-white/[0.02] border-b border-white/5 overflow-x-auto no-scrollbar">
                            {['Citizens', 'Operations', 'Curriculum', 'Security', 'Telemetry'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={cn(
                                        "px-8 py-4 text-[10px] font-black tracking-widest uppercase transition-all rounded-2xl",
                                        activeTab === tab.toLowerCase() ? "bg-primary text-black" : "text-slate-500 hover:text-white"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="p-8 md:p-12 space-y-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold font-display tracking-tight text-white italic">Access Control Matrix</h3>
                                    <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">Managing 1,284 active protocol identifiers</p>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                        <input type="text" placeholder="Filter by ID..." className="w-full bg-surface border border-border pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none focus:border-primary/50 transition-all font-medium" />
                                    </div>
                                    <Button size="sm" variant="nexus">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Provision
                                    </Button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                                            <th className="pb-5 pl-4">Identifier</th>
                                            <th className="pb-5">Permission Level</th>
                                            <th className="pb-5">Status</th>
                                            <th className="pb-5">Operational Load</th>
                                            <th className="pb-5 text-right pr-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[1, 2, 3, 4, 5, 6].map(i => (
                                            <tr key={i} className="group hover:bg-white/[0.02] transition-all">
                                                <td className="py-5 pl-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 font-mono text-[10px] text-slate-400 group-hover:border-primary/30 transition-colors">
                                                            {i}
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <div className="text-sm font-bold text-white leading-none">citizen_idx_{i * 142}</div>
                                                            <div className="text-[10px] font-medium text-slate-500">Joined Cycle 42.1</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-5">
                                                    <Badge variant="outline" className="border-white/10 uppercase font-black text-[9px] tracking-tighter">
                                                        {i === 1 ? 'Overseer' : 'Specialist'}
                                                    </Badge>
                                                </td>
                                                <td className="py-5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                                                    </div>
                                                </td>
                                                <td className="py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-24 h-1.5 bg-surface border border-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-primary" style={{ width: `${(i * 15) % 100}%` }} />
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-500">{(i * 15) % 100}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-5 text-right pr-4">
                                                    <button className="p-2 hover:bg-surface rounded-lg transition-colors text-slate-500 hover:text-white">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="flex justify-between items-center pt-8 border-t border-white/5">
                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Showing 6 of 1,284 Identifiers</p>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-surface text-slate-500 rounded-xl text-[10px] font-black border border-border">Prev</button>
                                    <button className="px-4 py-2 bg-surface text-white rounded-xl text-[10px] font-black border border-primary/20 shadow-lg shadow-primary/5">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function AwardIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm0 0l4 4m-4-4l-4 4" />
        </svg>
    )
}
