"use client";

import { motion } from "framer-motion";
import {
    ClipboardCheck,
    Clock,
    CheckCircle2,
    AlertCircle,
    MoreHorizontal,
    Plus
} from "lucide-react";

interface Task {
    id: string;
    name: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE';
    toolId: string;
}

interface Column {
    id: string;
    name: string;
    tasks: Task[];
}

export function SprintBoard({ columns }: { columns: Column[] }) {
    return (
        <div className="flex gap-6 overflow-x-auto pb-8 h-full min-h-[600px] scroll-smooth custom-scrollbar">
            {columns.map((column) => (
                <div key={column.id} className="kanban-column">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[10px] font-black font-orbitron tracking-[0.2em] uppercase text-muted truncate">
                                {column.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-surface text-[9px] font-black text-muted">
                                {column.tasks.length}
                            </span>
                        </div>
                        <button className="p-1 hover:bg-surface rounded-md text-muted transition-colors">
                            <MoreHorizontal className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="flex-1 space-y-3 bg-surface/50 rounded-2xl p-3 border border-border/10">
                        {column.tasks.map((task) => (
                            <ProjectCard key={task.id} task={task} />
                        ))}

                        <button className="w-full py-3 border border-dashed border-border rounded-xl text-[9px] font-black text-muted hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 group">
                            <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                            ADD DELIVERABLE
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ProjectCard({ task }: { task: Task }) {
    const getStatusInfo = (status: Task['status']) => {
        switch (status) {
            case 'COMPLETE': return { color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle2, label: 'COMPLETED' };
            case 'IN_PROGRESS': return { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Clock, label: 'IN PROGRESS' };
            default: return { color: 'text-muted', bg: 'bg-surface', icon: ClipboardCheck, label: 'NOT STARTED' };
        }
    }

    const info = getStatusInfo(task.status);

    return (
        <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            className="kanban-card group"
        >
            <div className="flex justify-between items-start mb-3">
                <div className={cn("px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest uppercase", info.bg, info.color)}>
                    {info.label}
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-3 h-3 text-muted" />
                </button>
            </div>

            <h4 className="text-sm font-bold mb-4 line-clamp-2 leading-tight uppercase tracking-tight">
                {task.name}
            </h4>

            <div className="flex items-center justify-between border-t border-border/5 pt-3 mt-auto">
                <div className="flex items-center gap-1.5">
                    <info.icon className={cn("w-3 h-3", info.color)} />
                    <span className="text-[9px] font-black text-muted uppercase tracking-tighter">Deliverable ID: {task.id.slice(0, 6)}</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-surface border border-border" />
            </div>
        </motion.div>
    );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
