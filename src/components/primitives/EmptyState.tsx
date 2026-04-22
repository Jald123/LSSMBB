"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/primitives/Button";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    imageSrc?: string;
    className?: string;
}

export function EmptyState({ 
    title, 
    description, 
    actionLabel, 
    onAction, 
    imageSrc = "/images/empty-projects.png",
    className 
}: EmptyStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-3xl bg-card/30 border-2 border-dashed border-white/5",
            className
        )}>
            <div className="relative w-full max-w-[320px] aspect-square mb-8 animate-in fade-in zoom-in-90 duration-700">
                <Image 
                    src={imageSrc} 
                    alt="Empty State Illustration" 
                    fill 
                    className="object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                />
            </div>
            
            <div className="space-y-3 max-w-sm mb-8">
                <h3 className="text-2xl font-bold font-display tracking-tight text-white">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {description}
                </p>
            </div>
            
            {actionLabel && onAction && (
                <Button variant="nexus" size="lg" onClick={onAction} className="px-8 font-bold uppercase tracking-widest">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
