"use client";

import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ACHIEVEMENTS, type Achievement } from "@/config/badges";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { 
    Award, 
    Shield, 
    Database, 
    Rocket, 
    Zap, 
    Lock, 
    Star, 
    Trophy,
    History,
    TrendingUp,
    Target,
    CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ICON_MAP: Record<string, any> = {
    Shield,
    Database,
    Trophy,
    Rocket,
    Zap
};

export default function AchievementsWall() {
    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20 font-sans">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    
                    <PageHeader 
                        title="Hall of Mastery" 
                        description="Your permanent record of operational excellence and system breakthroughs."
                        actions={
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm">
                                    <History className="w-4 h-4 mr-2" />
                                    Timeline
                                </Button>
                                <Button variant="nexus" size="sm">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Leaderboard
                                </Button>
                            </div>
                        }
                    />

                    {/* Meta Progression */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "Completion Rate", value: "24%", icon: <TrendingUp className="w-4 h-4" /> },
                            { label: "Badges Earned", value: "2/12", icon: <Award className="w-4 h-4" /> },
                            { label: "XP Multiplier", value: "x1.2", icon: <Zap className="w-4 h-4 text-primary" /> },
                            { label: "Global Rank", value: "#242", icon: <Target className="w-4 h-4" /> },
                        ].map((stat, i) => (
                            <div key={i} className="bg-card border border-border p-6 rounded-2xl flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-slate-500 uppercase font-black text-[9px] tracking-widest">
                                    {stat.icon}
                                    {stat.label}
                                </div>
                                <div className="text-2xl font-bold font-display">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* The Wall */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3">
                                <Shield className="w-4 h-4 text-primary" />
                                Protocol Badges
                            </h3>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-black text-emerald-500">2 UNLOCKED</span>
                                <span className="text-[10px] font-black text-slate-700">/</span>
                                <span className="text-[10px] font-black text-slate-500">10 LOCKED</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {ACHIEVEMENTS.map((achievement) => {
                                const Icon = ICON_MAP[achievement.icon] || Star;
                                const isUnlocked = !!achievement.unlockedAt;
                                const progress = (achievement.currentValue / achievement.reqValue) * 100;

                                return (
                                    <motion.div
                                        key={achievement.id}
                                        whileHover={{ y: -5 }}
                                        className={cn(
                                            "group relative bg-card border rounded-[2rem] p-8 flex flex-col items-center text-center transition-all",
                                            isUnlocked ? "border-primary/20 bg-primary/[0.02]" : "border-border opacity-60"
                                        )}
                                    >
                                        {/* Rarity Tag */}
                                        <div className={cn(
                                            "absolute top-6 right-6 text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border",
                                            achievement.rarity === 'LEGENDARY' ? "border-nexus-gold/40 text-nexus-gold bg-nexus-gold/10" :
                                            achievement.rarity === 'EPIC' ? "border-primary/40 text-primary bg-primary/10" :
                                            "border-white/10 text-slate-500 bg-white/5"
                                        )}>
                                            {achievement.rarity}
                                        </div>

                                        {/* Icon Container */}
                                        <div className={cn(
                                            "w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 relative transition-transform duration-500 group-hover:rotate-12",
                                            isUnlocked ? "bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20" : "bg-surface border-2 border-dashed border-white/5 text-slate-700"
                                        )}>
                                            {isUnlocked ? <Icon className="w-10 h-10 text-black" /> : <Lock className="w-8 h-8 opacity-40" />}
                                        </div>

                                        <div className="space-y-2 flex-1">
                                            <h4 className={cn(
                                                "font-bold text-lg tracking-tight",
                                                isUnlocked ? "text-white" : "text-slate-500"
                                            )}>{achievement.title}</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed px-2">{achievement.description}</p>
                                        </div>

                                        {/* Progress Section */}
                                        <div className="mt-8 w-full space-y-3">
                                            {!isUnlocked && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                                        <span>Progress</span>
                                                        <span>{Math.round(progress)}%</span>
                                                    </div>
                                                    <div className="h-1 bg-surface border border-white/5 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress}%` }}
                                                            className="h-full bg-slate-600"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {isUnlocked && (
                                                <div className="flex items-center justify-center gap-2 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Protocol Verified</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
