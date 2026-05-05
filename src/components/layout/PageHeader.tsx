import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface PageHeaderProps {
    title: string;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
    titleClassName?: string;
}

export function PageHeader({ title, description, actions, className, titleClassName }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8", className)}>
            <div className="space-y-1.5 flex-1">
                <h1 className={cn("text-3xl font-display font-bold tracking-tight text-[var(--nexus-text)] flex items-center gap-3", titleClassName)}>
                    {title}
                </h1>
                {description && (
                    <div className="text-[var(--nexus-text-muted)] max-w-2xl text-sm md:text-base">
                        {description}
                    </div>
                )}
            </div>
            {actions && (
                <div className="flex items-center gap-3 shrink-0">
                    {actions}
                </div>
            )}
        </div>
    );
}
