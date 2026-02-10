"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { useState } from "react";
import { Users, BookOpen, Settings, BarChart3, ShieldCheck } from "lucide-react";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <TopBar mode="DO" setMode={() => { }} />
            <Sidebar userRole="ADMIN" />

            <main className="flex-1 overflow-y-auto pt-16 h-full bg-surface/30 px-12 pb-24">
                <div className="max-w-7xl mx-auto py-12 space-y-12">
                    <header className="flex justify-between items-end">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-display font-black tracking-tight uppercase">Control Center</h1>
                            <p className="text-muted text-lg">Platform management and surveillance.</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-6 py-2 rounded-lg bg-card border border-border text-xs font-black tracking-widest uppercase hover:bg-surface transition-colors">Export Logs</button>
                            <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-black tracking-widest uppercase hover:opacity-90 transition-opacity underline-offset-4 decoration-2">System Reboot</button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                            <div className="flex justify-between items-center text-muted">
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Total Citizens</span>
                                <Users className="w-4 h-4" />
                            </div>
                            <div className="text-4xl font-black">1,284</div>
                            <div className="text-[10px] text-green-500 font-bold">+12% from last cycle</div>
                        </div>
                        <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                            <div className="flex justify-between items-center text-muted">
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Active Case Runs</span>
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="text-4xl font-black">342</div>
                            <div className="text-[10px] text-primary font-bold">89% completion rate</div>
                        </div>
                        <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                            <div className="flex justify-between items-center text-muted">
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Certs Issued</span>
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div className="text-4xl font-black">45</div>
                            <div className="text-[10px] text-muted font-bold">Verified on blockchain</div>
                        </div>
                        <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                            <div className="flex justify-between items-center text-muted">
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Uptime</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            <div className="text-4xl font-black">99.9%</div>
                            <div className="text-[10px] text-muted font-bold">Global relay active</div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden">
                        <div className="border-b border-border flex">
                            {['Users', 'Cases', 'Tools', 'Permissions', 'Analytics'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`px-8 py-5 text-[10px] font-black tracking-widest uppercase transition-all border-r border-border ${activeTab === tab.toLowerCase() ? 'bg-surface text-primary' : 'text-muted hover:text-foreground'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="p-10 min-h-[400px]">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-xl font-black uppercase tracking-tight">Access Control List</h3>
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Search accounts..." className="bg-surface border border-border px-4 py-2 rounded-lg text-xs" />
                                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-black uppercase">Add User</button>
                                    </div>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="text-[10px] font-black text-muted uppercase tracking-widest border-b border-border">
                                        <tr>
                                            <th className="pb-4">IDENTIFIER</th>
                                            <th className="pb-4">ROLE</th>
                                            <th className="pb-4">STATUS</th>
                                            <th className="pb-4">PROJECTS</th>
                                            <th className="pb-4 text-right">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <tr key={i} className="border-b border-border/5 group hover:bg-surface/50 transition-colors">
                                                <td className="py-4 font-bold">citizen_00{i}@nexus.os</td>
                                                <td className="py-4"><span className="px-2 py-0.5 rounded-full bg-surface text-[10px] font-black">STUDENT</span></td>
                                                <td className="py-4"><span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500"><div className="w-1 h-1 rounded-full bg-green-500" /> ACTIVE</span></td>
                                                <td className="py-4 font-medium text-muted">0{i} Active</td>
                                                <td className="py-4 text-right">
                                                    <button className="text-[10px] font-black text-primary uppercase opacity-0 group-hover:opacity-100 transition-opacity hover:underline">Revoke Access</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
