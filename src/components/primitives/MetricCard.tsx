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
}

export function MetricCard({ 
    title, 
    value, 
    description, 
    trend, 
    trendValue, 
    icon,
    className 
}: MetricCardProps) {
    return (
        <div className={cn(
            "p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between relative overflow-hidden group",
            className
        )}>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
                {icon && <div className="text-muted-foreground opacity-50">{icon}</div>}
            </div>
            
            <div className="space-y-1">
                <h3 className="text-3xl font-bold font-display tracking-tight">{value}</h3>
                
                {(trend || description) && (
                    <div className="flex items-center gap-2 mt-1">
                        {trend && (
                            <span className={cn(
                                "flex items-center text-[10px] font-black px-1.5 py-0.5 rounded-md",
                                trend === "up" ? "bg-emerald-500/10 text-emerald-500" : 
                                trend === "down" ? "bg-red-500/10 text-red-500" : 
                                "bg-slate-500/10 text-slate-500"
                            )}>
                                {trend === "up" && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                                {trend === "down" && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                {trend === "neutral" && <Minus className="w-3 h-3 mr-0.5" />}
                                {trendValue}
                            </span>
                        )}
                        {description && <p className="text-xs text-muted-foreground truncate">{description}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
