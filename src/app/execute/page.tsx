"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/primitives/MetricCard";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { EmptyState } from "@/components/primitives/EmptyState";
import { 
    Zap, 
    Clock, 
    ArrowRight, 
    TrendingUp, 
    AlertCircle, 
    CheckCircle2, 
    Filter, 
    Plus,
    LayoutGrid,
    List,
    MoreVertical
} from "lucide-react";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ExecuteHub() {
    const router = useRouter();
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data.projects || []);
        } catch (error) {
            console.error("Failed to fetch projects");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="p-10">Loading Mission Portfolio...</div>;
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20 font-sans">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    
                    <PageHeader 
                        title="The War Room" 
                        description="Project Portfolio & Operational Health Matrix. Manage your live DMAIC missions."
                        actions={
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>
                                <Button variant="nexus" size="sm" onClick={() => router.push('/')}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Mission
                                </Button>
                            </div>
                        }
                    />

                    {/* Matrix Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <MetricCard title="Total Missions" value={projects.length} icon={<Zap className="w-4 h-4" />} />
                        <MetricCard title="Active Phases" value={projects.filter(p => p.status === 'ACTIVE').length} icon={<TrendingUp className="w-4 h-4 text-emerald-500" />} />
                        <MetricCard title="Halted / Blocked" value="0" icon={<AlertCircle className="w-4 h-4 text-red-500" />} />
                        <MetricCard title="Completed" value={projects.filter(p => p.status === 'COMPLETED').length} icon={<CheckCircle2 className="w-4 h-4 text-primary" />} />
                    </div>

                    {/* Mission Portfolio */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Portfolio Matrix</h3>
                            <div className="flex p-1 bg-surface border border-border rounded-lg">
                                <button className="p-1.5 bg-card rounded-md border border-border shadow-sm"><LayoutGrid className="w-4 h-4" /></button>
                                <button className="p-1.5 text-muted-foreground hover:text-white"><List className="w-4 h-4" /></button>
                            </div>
                        </div>

                        {projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <div 
                                        key={project.id}
                                        className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-primary/5 transition-all flex flex-col"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="space-y-1">
                                                <Badge variant="outline" className="border-white/10 text-[9px] uppercase tracking-widest">{project.framework}</Badge>
                                                <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors line-clamp-1">{project.title}</h4>
                                            </div>
                                            <button className="text-slate-600 hover:text-white transition-colors p-1"><MoreVertical className="w-4 h-4" /></button>
                                        </div>

                                        <div className="flex-1 space-y-6">
                                            {/* Progress Strip */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                    <span>Mission Velocity</span>
                                                    <span>{project.progressPercentage}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-surface border border-white/5 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                                        style={{ width: `${project.progressPercentage}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Current Sector</p>
                                                    <p className="text-xs font-bold text-slate-200 capitalize">{project.currentPhase}</p>
                                                </div>
                                                <div className="space-y-1 text-right">
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Last Uplink</p>
                                                    <p className="text-xs font-bold text-slate-400">2h ago</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
                                            <Button 
                                                variant="nexus" 
                                                size="sm" 
                                                className="flex-1 py-5 font-bold uppercase tracking-widest"
                                                onClick={() => router.push(`/do/project/${project.id}/board`)}
                                            >
                                                Command <ArrowRight className="ml-2 w-3.5 h-3.5" />
                                            </Button>
                                            <Button variant="outline" size="sm" className="px-4">
                                                Health
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState 
                                title="Mission Log Empty"
                                description="The war room is awaiting your first command injection. Deploy a new DMAIC mission to initialize the portfolio."
                                actionLabel="Deploy First Mission"
                                onAction={() => router.push('/')}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
