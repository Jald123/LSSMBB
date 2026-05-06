"use client";

import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Step {
    id: string;
    label: string;
    status: "complete" | "current" | "upcoming";
}

interface StepIndicatorProps {
    steps: Step[];
    className?: string;
}

export function StepIndicator({ steps, className }: StepIndicatorProps) {
    return (
        <div className={cn("w-full py-1", className)}>
            <div className="flex items-center justify-between w-full relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--nexus-border)] -translate-y-1/2 z-0" />
                
                {steps.map((step, idx) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center group">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                            step.status === "complete" ? "bg-primary border-primary text-[var(--nexus-bg)] shadow-[0_0_15px_rgba(34,211,238,0.4)]" :
                            step.status === "current" ? "bg-[var(--nexus-bg)] border-primary text-primary shadow-[0_0_15px_rgba(34,211,238,0.3)]" :
                            "bg-[var(--nexus-bg)] border-[var(--nexus-border)] text-[var(--nexus-text-muted)] opacity-50"
                        )}>
                            {step.status === "complete" ? (
                                <Check className="w-5 h-5 stroke-[3]" />
                            ) : (
                                <span className="text-sm font-black font-display">{idx + 1}</span>
                            )}
                        </div>
                        
                        <div className="absolute top-11 whitespace-nowrap text-center">
                            <p className={cn(
                                "text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                                step.status === "complete" ? "text-primary" :
                                step.status === "current" ? "text-[var(--nexus-text)]" :
                                "text-[var(--nexus-text-muted)] opacity-50"
                            )}>
                                {step.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
