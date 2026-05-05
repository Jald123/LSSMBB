"use client";

import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MetricCardProps {
    title: string;
    value: string | number;
    description?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    icon?: React.ReactNode;
    className?: string;
    hasLaser?: boolean;
    isStandard?: boolean;
}

export function MetricCard({ 
    title, 
    value, 
    description, 
    trend, 
    trendValue, 
    icon,
    className,
    hasLaser,
    isStandard
}: MetricCardProps) {
    return (
        <div className={cn(
            "p-[1.5px] rounded-2xl overflow-hidden relative group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
            !isStandard && "nexus-card",
            className
        )}>
            <div className={cn(
                "p-6 rounded-2xl flex flex-col justify-between relative z-10 h-full transition-colors duration-500 group-hover:bg-white/[0.02]",
                isStandard ? "bg-card border border-border" : "bg-[var(--nexus-card)]"
            )}>
                {/* Background Accent */}
                {!isStandard && <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors" />}
                
                <div className="flex justify-between items-start mb-4">
                    <p className={cn(
                        "text-xs font-bold uppercase tracking-widest",
                        isStandard ? "text-sky-500" : "text-[var(--nexus-text-muted)]"
                    )}>{title}</p>
                    {icon && <div className={cn(isStandard ? "text-sky-400" : "text-[var(--nexus-text-muted)] opacity-50")}>{icon}</div>}
                </div>
                
                <div className="space-y-1">
                    <h3 className={cn(
                        "text-3xl font-bold tracking-tight",
                        !isStandard ? "font-display text-[var(--nexus-text)]" : "text-blue-900"
                    )}>{value}</h3>
                    
                    {(trend || description) && (
                        <div className="flex items-center gap-2 mt-1">
                            {trend && (
                                <span className={cn(
                                    "flex items-center text-[10px] font-black px-1.5 py-0.5 rounded-md",
                                    trend === "up" ? "bg-emerald-500/20 text-emerald-400" : 
                                    trend === "down" ? "bg-red-500/20 text-red-400" : 
                                    "bg-white/10 text-white/60"
                                )}>
                                    {trend === "up" && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                                    {trend === "down" && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                    {trendValue}
                                </span>
                            )}
                            {description && (
                                <p className={cn(
                                    "text-xs truncate font-medium",
                                    isStandard ? "text-sky-500/80" : "text-[var(--nexus-text-muted)]"
                                )}>{description}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
