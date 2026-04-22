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
        <div className={cn("w-full py-4", className)}>
            <div className="flex items-center justify-between w-full relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface -translate-y-1/2 z-0" />
                
                {steps.map((step, idx) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center group">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                            step.status === "complete" ? "bg-primary border-primary text-primary-foreground shadow-[0_0_15px_rgba(34,211,238,0.3)]" :
                            step.status === "current" ? "bg-background border-primary text-primary shadow-[0_0_10px_rgba(34,211,238,0.2)]" :
                            "bg-surface border-border text-muted-foreground"
                        )}>
                            {step.status === "complete" ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                <span className="text-sm font-bold font-display">{idx + 1}</span>
                            )}
                        </div>
                        
                        <div className="absolute top-12 whitespace-nowrap text-center">
                            <p className={cn(
                                "text-[10px] font-black uppercase tracking-widest transition-colors",
                                step.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
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
