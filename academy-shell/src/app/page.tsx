"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Layout as LayoutIcon } from "lucide-react";
import { WizardModal } from "@/components/modals/WizardModal";

export default function Home() {
    const [mode, setMode] = useState<'LEARN' | 'DO'>('LEARN');
    const [user, setUser] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                    // Fetch real projects
                    fetch(`/api/projects/user/${data.user.id}`)
                        .then(res => res.json())
                        .then(pData => setProjects(pData.projects || []));
                }
            });
    }, []);

    const userRole = user?.role || 'STUDENT';

    const [isWizardOpen, setIsWizardOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background overflow-hidden text-foreground">
            <TopBar mode={mode} setMode={setMode} />
            <Sidebar userRole={userRole} />

            <main className="flex-1 overflow-y-auto pt-16 h-full bg-surface/30">
                {mode === 'LEARN' ? (
                    <div className="p-12 max-w-7xl mx-auto space-y-12">
                        <section className="space-y-4">
                            <h1 className="text-4xl font-display font-black tracking-tight uppercase">Learning Journey Masterclass</h1>
                            <p className="text-muted text-lg max-w-3xl">Access the world-class curriculum of Lean Six Sigma. From fundamentals to advanced statistical tools.</p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {['Fundamentals', 'Define Phase', 'Measure Phase', 'Analyze Phase', 'Improve Phase', 'Control Phase'].map((module, i) => (
                                <div key={module} className="group p-8 rounded-3xl bg-card border border-border hover:shadow-apple transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 font-black text-xl font-orbitron">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{module}</h3>
                                    <p className="text-sm text-muted mb-6">Master the core concepts and required tools for this milestone.</p>
                                    <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${(i + 1) * 15}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col p-12 max-w-[1600px] mx-auto space-y-12">
                        <section className="flex justify-between items-end">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-display font-black tracking-tight uppercase leading-none">Operational Missions (DO)</h1>
                                <p className="text-muted text-lg">Select a framework to begin or continue your project sprint.</p>
                            </div>

                            <button
                                onClick={() => setIsWizardOpen(true)}
                                className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black text-xs tracking-[0.2em] shadow-xl shadow-primary/30 hover:scale-105 transition-all uppercase"
                            >
                                NEW PROJECT WIZARD
                            </button>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.length > 0 ? projects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => window.location.href = `/workspace?projectId=${project.id}`}
                                    className="p-10 rounded-[3rem] bg-card border border-border shadow-sm flex flex-col justify-between group cursor-pointer hover:border-primary/50 transition-all"
                                >
                                    <div>
                                        <div className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase mb-6 inline-block font-orbitron">
                                            {project.framework?.name} OPERATION
                                        </div>
                                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h2>
                                        <p className="text-muted mb-8 leading-relaxed text-sm font-medium">
                                            Project initiated {new Date(project.updatedAt).toLocaleDateString()}. Current status: {project.status}.
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-border pt-8">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(u => <div key={u} className="w-10 h-10 rounded-full border-4 border-card bg-surface" />)}
                                        </div>
                                        <button className="text-[10px] font-black text-primary hover:translate-x-1 transition-transform tracking-widest uppercase">RESUME MISSION →</button>
                                    </div>
                                </div>
                            )) : (
                                <div className="md:col-span-2 p-20 rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center justify-center text-center gap-6 bg-surface/20">
                                    <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center">
                                        <LayoutIcon className="w-10 h-10 text-muted" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black uppercase tracking-tight">No Active Missions</h3>
                                        <p className="text-muted max-w-sm">Use the wizard to initialize your first professional LSS operational environment.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsWizardOpen(true)}
                                        className="text-[10px] font-black text-primary tracking-[0.3em] uppercase underline underline-offset-8 decoration-4"
                                    >
                                        Initialize Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Wizard Modal */}
            <WizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
        </div>
    );
}
