"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trophy, FileText, LayoutDashboard, Home, Loader2, CheckCircle2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/Toast";

export default function ProjectComplete() {
    const params = useParams();
    const router = useRouter();
    const { showToast } = useToast();
    const projectId = params.projectId as string;
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/projects/${projectId}`)
            .then(res => res.json())
            .then(data => {
                setProject(data.project);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [projectId]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#e8f9fd]">
            <Loader2 className="w-8 h-8 text-[#ff1e00] animate-spin" />
        </div>
    );

    if (!project) return <div>Project not found.</div>;

    return (
        <div className="min-h-screen bg-[#e8f9fd] flex items-center justify-center p-6 text-[#1a1a2e]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden text-center"
            >
                <div className="p-12">
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 bg-[#ff1e00]/10 rounded-full flex items-center justify-center">
                            <Trophy className="w-12 h-12 text-[#ff1e00]" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Project Complete!</h1>
                    <p className="text-[#4b5563] text-lg mb-10">{project.title}</p>

                    <div className="grid grid-cols-2 gap-4 mb-12">
                        <div className="p-4 bg-[#f8fafc] rounded-2xl border border-[#e5e7eb]">
                            <div className="text-[10px] font-black text-[#4b5563] uppercase tracking-widest mb-1">DATE COMPLETED</div>
                            <div className="font-bold">{new Date().toLocaleDateString()}</div>
                        </div>
                        <div className="p-4 bg-[#f8fafc] rounded-2xl border border-[#e5e7eb]">
                            <div className="text-[10px] font-black text-[#4b5563] uppercase tracking-widest mb-1">STATUS</div>
                            <div className="font-bold text-[#59ce8f]">Certified ✓</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => showToast('INFO', 'Generating PDF report...')}
                            className="w-full h-14 bg-[#ff1e00] text-white font-bold rounded-2xl shadow-lg shadow-[#ff1e00]/20 hover:bg-[#e61b00] transition-all flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            Export Full Report
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => router.push(`/do/project/${projectId}/board`)}
                                className="h-14 bg-white border-2 border-[#e5e7eb] text-[#1a1a2e] font-bold rounded-2xl hover:bg-[#f8fafc] transition-all flex items-center justify-center gap-2"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Sprint Board
                            </button>
                            <button
                                onClick={() => router.push('/?mode=do')}
                                className="h-14 bg-white border-2 border-[#e5e7eb] text-[#1a1a2e] font-bold rounded-2xl hover:bg-[#f8fafc] transition-all flex items-center justify-center gap-2"
                            >
                                <Home className="w-5 h-5" />
                                Dashboard
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#59ce8f] p-4 text-white text-sm font-black uppercase tracking-widest">
                    Congratulations! Certificate earned!
                </div>
            </motion.div>
        </div>
    );
}
