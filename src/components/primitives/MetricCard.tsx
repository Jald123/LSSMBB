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
}

export function MetricCard({ 
    title, 
    value, 
    description, 
    trend, 
    trendValue, 
    icon,
    className,
    hasLaser
}: MetricCardProps) {
    return (
        <div className={cn(
            "p-[1.5px] rounded-2xl overflow-hidden relative group",
            hasLaser ? "bg-transparent" : "bg-card border border-border shadow-sm",
            className
        )}>
            {/* Animated Laser Border */}
            {hasLaser && (
                <div 
                    className="absolute inset-0 z-0 animate-[laser-sweep_8s_linear_infinite]"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent 60%, #c2983d 80%, #ffd700 90%, #c2983d 100%)',
                        margin: '-100%'
                    }}
                />
            )}

            <div className={cn(
                "p-6 rounded-2xl bg-card flex flex-col justify-between relative z-10 h-full",
                hasLaser ? "bg-[#0a0a0a]" : ""
            )}>
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors" />
                
                <div className="flex justify-between items-start mb-4">
                    <p className={cn(
                        "text-xs font-bold uppercase tracking-widest",
                        hasLaser ? "text-white/50" : "text-muted-foreground"
                    )}>{title}</p>
                    {icon && <div className={cn(
                        hasLaser ? "text-white/30" : "text-muted-foreground opacity-50"
                    )}>{icon}</div>}
                </div>
                
                <div className="space-y-1">
                    <h3 className={cn(
                        "text-3xl font-bold font-display tracking-tight",
                        hasLaser ? "text-white" : "text-foreground"
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
                                    "text-xs truncate",
                                    hasLaser ? "text-white/40 font-medium" : "text-muted-foreground"
                                )}>{description}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
