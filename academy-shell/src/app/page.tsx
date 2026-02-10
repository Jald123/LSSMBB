"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { WizardModal } from "@/components/modals/WizardModal";
import { useAppMode } from "@/context/AppModeContext";

export default function Home() {
    const { mode } = useAppMode();
    const [user, setUser] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [isWizardOpen, setIsWizardOpen] = useState(false);

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

    return (
        <div className="flex h-screen bg-[#e8f9fd] overflow-hidden text-[#1a1a2e]">
            <TopBar />
            <Sidebar userRole={userRole} />

            <main className="flex-1 overflow-y-auto pt-16 h-full">
                {mode === 'LEARN' ? (
                    <div className="p-12 max-w-7xl mx-auto space-y-12">
                        <section className="space-y-4">
                            <h1 className="text-4xl font-display font-black tracking-tight uppercase">Learning Journey Masterclass</h1>
                            <p className="text-[#6b7280] text-lg max-w-3xl">Access the world-class curriculum of Lean Six Sigma. From fundamentals to advanced statistical tools.</p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {['Fundamentals', 'Define Phase', 'Measure Phase', 'Analyze Phase', 'Improve Phase', 'Control Phase'].map((module, i) => (
                                <div key={module} className="group p-8 rounded-3xl bg-white border border-[#e5e7eb] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ff1e00]/10 text-[#ff1e00] flex items-center justify-center mb-6 font-black text-xl font-orbitron">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{module}</h3>
                                    <p className="text-sm text-[#6b7280] mb-6">Master the core concepts and required tools for this milestone.</p>
                                    <div className="h-1.5 w-full bg-[#f3f4f6] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#ff1e00]" style={{ width: `${(i + 1) * 15}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <div className="text-[10px] font-black tracking-[0.4em] text-[#ff1e00] uppercase">DO Mode Initialization</div>
                            <h2 className="text-3xl font-black uppercase text-[#1a1a2e]">DO Mode Dashboard — Coming in Prompt 2</h2>
                            <p className="text-[#6b7280] max-w-md mx-auto">Prepare for production-grade project execution and real-time operational governance.</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Wizard Modal */}
            <WizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
        </div>
    );
}
