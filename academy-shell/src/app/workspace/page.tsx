"use client";

import { ToolRunner } from "@/components/workspace/ToolRunner";

export default function WorkspacePage() {
    return (
        <div className="h-screen pt-16">
            <ToolRunner
                toolName="Project Charter"
                projectTitle="ER Waiting Time Reduction"
            />
        </div>
    );
}
