"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Layout as LayoutIcon } from "lucide-react";

export default function Home() {
    const [mode, setMode] = useState<'LEARN' | 'DO'>('LEARN');
    const [userRole] = useState('STUDENT'); // This would come from session

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <TopBar mode={mode} setMode={setMode} />
            <Sidebar userRole={userRole} />

            <main className="flex-1 overflow-y-auto pt-16 h-full bg-surface/30">
                {mode === 'LEARN' ? (
                    <div className="p-12 max-w-7xl mx-auto space-y-12">
                        <section className="space-y-4">
                            <h1 className="text-4xl font-display font-black tracking-tight uppercase">Learning Journey</h1>
                            <p className="text-muted text-lg max-w-3xl">Access the world-class curriculum of Lean Six Sigma. From fundamentals to advanced statistical tools.</p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {['Fundamentals', 'Define Phase', 'Measure Phase', 'Analyze Phase', 'Improve Phase', 'Control Phase'].map((module, i) => (
                                <div key={module} className="group p-8 rounded-3xl bg-card border border-border hover:shadow-apple transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 font-black text-xl">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-xl font-black mb-2">{module}</h3>
                                    <p className="text-sm text-muted mb-6">Master the core concepts and required tools for this milestone.</p>
                                    <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${Math.random() * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col p-12 max-w-[1600px] mx-auto space-y-12">
                        <section className="flex justify-between items-end">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-display font-black tracking-tight uppercase">Project execution (DO)</h1>
                                <p className="text-muted text-lg">Select a framework to begin or continue your project sprint.</p>
                            </div>

                            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-black text-sm tracking-widest shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                                NEW PROJECT WIZARD
                            </button>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-[2.5rem] bg-card border border-border shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-black tracking-widest uppercase self-start mb-6 inline-block">FIXED CASE STUDY</div>
                                    <h2 className="text-3xl font-black mb-4">ER Waiting Time Reduction</h2>
                                    <p className="text-muted mb-8 leading-relaxed">Join St. Jude Hospital to identify waste in patient admission workflows. Use DMAIC to hit a 30% reduction goal.</p>
                                </div>
                                <div className="flex items-center justify-between border-t border-border pt-8">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(u => <div key={u} className="w-10 h-10 rounded-full border-4 border-card bg-surface" />)}
                                    </div>
                                    <button className="text-sm font-black text-primary hover:translate-x-1 transition-transform">RESUME SPRINT →</button>
                                </div>
                            </div>

                            <div className="p-10 rounded-[2.5rem] bg-card/40 border border-dashed border-border flex flex-col items-center justify-center text-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-muted">
                                    <LayoutIcon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black mb-2">Custom Project</h3>
                                    <p className="text-sm text-muted">Solve your own real-world problem using Nexus frameworks.</p>
                                </div>
                                <button className="text-xs font-black tracking-widest uppercase underline underline-offset-8 decoration-primary decoration-4">Start Intake</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
