"use client";

import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ProgressRingProps {
    value: number; // 0 to 100
    size?: number;
    strokeWidth?: number;
    className?: string;
    showValue?: boolean;
}

export function ProgressRing({ 
    value, 
    size = 120, 
    strokeWidth = 10, 
    className,
    showValue = true
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                {/* Background Track */}
                <circle
                    className="text-surface"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress Overlay */}
                <circle
                    className="text-primary transition-all duration-1000 ease-out"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            {showValue && (
                <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-bold font-display tracking-tight">{value}%</span>
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Mastery</span>
                </div>
            )}
        </div>
    );
}
