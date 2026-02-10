"use client";

import { ToolRunner } from "@/components/workspace/ToolRunner";
import { SprintBoard } from "@/components/kanban/SprintBoard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function WorkspacePage() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId");
    const [projectData, setProjectData] = useState<any>(null);
    const [activeTool, setActiveTool] = useState<any>(null);

    useEffect(() => {
        if (projectId) {
            fetch(`/api/projects/${projectId}`)
                .then(res => res.json())
                .then(data => setProjectData(data));
        }
    }, [projectId]);

    if (!projectData) return (
        <div className="h-screen flex items-center justify-center bg-background">
            <div className="text-[10px] font-black tracking-[0.4em] text-primary animate-pulse uppercase">Initializing Workspace...</div>
        </div>
    );

    return (
        <div className="h-screen pt-16 flex flex-col">
            {activeTool ? (
                <ToolRunner
                    toolId={activeTool.id}
                    toolName={activeTool.name}
                    projectTitle={projectData.project.title}
                    onBack={() => setActiveTool(null)}
                />
            ) : (
                <div className="flex-1 p-12 overflow-hidden flex flex-col gap-12">
                    <header className="flex justify-between items-end">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-display font-black tracking-tight uppercase leading-none">{projectData.project.title}</h1>
                            <p className="text-muted text-lg">Operational Sprint: DMAIC Governance</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-right">
                                <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Project Health</div>
                                <div className="h-1.5 w-32 bg-surface rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: '65%' }} />
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 min-h-0">
                        <SprintBoard
                            columns={projectData.columns}
                            onToolClick={(tool: any) => setActiveTool(tool)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
