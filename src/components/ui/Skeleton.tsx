"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn("skeleton rounded-md", className)}
            {...props}
        />
    );
}

export function ProjectSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5e7eb] animate-pulse">
            <Skeleton className="h-4 w-1/3 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-6" />
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <Skeleton className="h-2 w-20" />
                    <Skeleton className="h-1.5 w-32" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </div>
    );
}

export function CaseSkeleton() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e5e7eb]">
            <Skeleton className="h-40 w-full rounded-2xl mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    );
}
