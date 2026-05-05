"use client";

import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ACHIEVEMENTS, type Achievement, type AchievementCategory, type AchievementType } from "@/config/badges";
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
    CheckCircle2,
    Medal,
    Users,
    Search,
    BarChart,
    Calculator,
    FlaskConical,
    Activity,
    Settings,
    ShieldAlert,
    Box,
    Cpu,
    CheckCircle,
    FileText,
    Heart,
    RefreshCw,
    PieChart,
    Trash2,
    Presentation,
    Map
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ICON_MAP: Record<string, any> = {
    Shield, Database, Trophy, Rocket, Zap, Medal, Award, Target, 
    Users, Search, BarChart, Calculator, FlaskConical, Activity, 
    Settings, ShieldAlert, Box, Cpu, CheckCircle, FileText, 
    Heart, RefreshCw, PieChart, Trash2, Presentation, Map
};

const CATEGORIES: { id: AchievementCategory | "ALL"; label: string; icon: any }[] = [
    { id: "ALL", label: "All Skills", icon: Star },
    { id: "BELTS", label: "Belt Pathway", icon: Medal },
    { id: "PM", label: "Project Mgmt", icon: Target },
    { id: "LEADERSHIP", label: "Leadership", icon: Users },
    { id: "ANALYTICS", label: "Analytics", icon: BarChart },
    { id: "OPS", label: "Ops Excellence", icon: Settings },
    { id: "DFSS", label: "DFSS & Design", icon: FlaskConical },
    { id: "KAIZEN", label: "Kaizen", icon: Award },
    { id: "PDCA", label: "PDCA / Control", icon: RefreshCw },
];

export default function AchievementsWall() {
    const [activeTab, setActiveTab] = useState<AchievementType | "ALL">("ALL");
    const [activeCategory, setActiveCategory] = useState<AchievementCategory | "ALL">("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAchievements = useMemo(() => {
        return ACHIEVEMENTS.filter(a => {
            const matchesTab = activeTab === "ALL" || a.type === activeTab;
            const matchesCategory = activeCategory === "ALL" || a.category === activeCategory;
            const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 a.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesCategory && matchesSearch;
        });
    }, [activeTab, activeCategory, searchQuery]);

    const stats = useMemo(() => {
        const unlocked = ACHIEVEMENTS.filter(a => a.unlockedAt).length;
        const certs = ACHIEVEMENTS.filter(a => a.type === "CERTIFICATE" && a.unlockedAt).length;
        const totalCerts = ACHIEVEMENTS.filter(a => a.type === "CERTIFICATE").length;
        const badges = ACHIEVEMENTS.filter(a => a.type === "BADGE" && a.unlockedAt).length;
        const totalBadges = ACHIEVEMENTS.filter(a => a.type === "BADGE").length;
        
        return {
            completionRate: Math.round((unlocked / ACHIEVEMENTS.length) * 100),
            certsEarned: `${certs}/${totalCerts}`,
            badgesEarned: `${badges}/${totalBadges}`,
            globalRank: "#242"
        };
    }, []);

    const groupedAchievements = useMemo(() => {
        const groups: Record<AchievementCategory, Achievement[]> = {} as any;
        filteredAchievements.forEach(a => {
            if (!groups[a.category]) groups[a.category] = [];
            groups[a.category].push(a);
        });
        return groups;
    }, [filteredAchievements]);

    return (
        <div className="flex-1 flex flex-col h-full bg-background text-foreground pb-20 font-sans">
            <main className="flex-1 h-full p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    
                    <PageHeader 
                        title="Hall of Mastery" 
                        titleClassName="font-sans"
                        description="Your permanent record of operational excellence and system breakthroughs."
                        actions={
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm">
                                    <History className="w-4 h-4 mr-2" />
                                    Timeline
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Leaderboard
                                </Button>
                            </div>
                        }
                    />

                    {/* Meta Progression */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "Completion Rate", value: `${stats.completionRate}%`, icon: <TrendingUp className="w-4 h-4" /> },
                            { label: "Certs Earned", value: stats.certsEarned, icon: <Award className="w-4 h-4" /> },
                            { label: "Badges Earned", value: stats.badgesEarned, icon: <Shield className="w-4 h-4" /> },
                            { label: "Global Rank", value: stats.globalRank, icon: <Target className="w-4 h-4" /> },
                        ].map((stat, i) => (
                            <div key={i} className="bg-card border border-border p-6 rounded-2xl flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-slate-500 uppercase font-black text-[9px] tracking-widest">
                                    {stat.icon}
                                    {stat.label}
                                </div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation & Search */}
                    <div className="flex flex-col gap-6 sticky top-0 z-[100] bg-background/80 backdrop-blur-md pt-4 pb-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex bg-surface/50 p-1 rounded-xl border border-border">
                                {["ALL", "CERTIFICATE", "BADGE"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={cn(
                                            "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                            activeTab === tab 
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {tab === "ALL" ? "All Items" : tab + "s"}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input 
                                    type="text" 
                                    placeholder="Search credentials..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id as any)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold whitespace-nowrap transition-all",
                                            activeCategory === cat.id
                                                ? "bg-primary/10 border-primary/30 text-primary"
                                                : "bg-card border-border text-slate-500 hover:border-slate-400 hover:text-foreground"
                                        )}
                                    >
                                        <Icon className="w-3 h-3" />
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* The Wall */}
                    <div className="space-y-16">
                        {Object.entries(groupedAchievements).map(([catId, items]) => {
                            const category = CATEGORIES.find(c => c.id === catId);
                            return (
                                <div key={catId} className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-border/50 pb-4">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border">
                                                {category ? <category.icon className="w-4 h-4 text-primary" /> : <Star className="w-4 h-4" />}
                                            </div>
                                            {category?.label || catId}
                                        </h3>
                                        <div className="text-[10px] font-black text-slate-500">
                                            {items.filter(i => i.unlockedAt).length} / {items.length} COMPLETED
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                        {items.map((achievement) => (
                                            <AchievementCard key={achievement.id} achievement={achievement} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        
                        {filteredAchievements.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                <div className="p-6 rounded-full bg-surface border border-border">
                                    <Search className="w-10 h-10 text-slate-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-bold">No results found</p>
                                    <p className="text-sm text-slate-500">Adjust your criteria or search query.</p>
                                </div>
                                <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("ALL"); setActiveTab("ALL"); }}>
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
    const Icon = ICON_MAP[achievement.icon] || Star;
    const isUnlocked = !!achievement.unlockedAt;
    const isCertificate = achievement.type === "CERTIFICATE";
    const progress = (achievement.currentValue / achievement.reqValue) * 100;

    const rarityStyles = {
        LEGENDARY: "border-amber-500/40 text-amber-500 bg-amber-500/10",
        EPIC: "border-blue-500/40 text-blue-500 bg-blue-500/10",
        RARE: "border-purple-500/40 text-purple-400 bg-purple-500/10",
        COMMON: "border-white/10 text-slate-500 bg-white/5 shadow-none"
    };

    const unlockedShadows = {
        LEGENDARY: "shadow-lg border-amber-500/20",
        EPIC: "shadow-lg border-blue-500/20",
        RARE: "shadow-lg border-purple-500/20",
        COMMON: "shadow-md border-white/10"
    };

    return (
        <motion.div
            layout
            whileHover={{ y: -5 }}
            className={cn(
                "group relative border transition-all duration-500 overflow-hidden",
                isCertificate ? "rounded-[2.5rem] p-10 min-h-[400px]" : "rounded-[2rem] p-8 min-h-[340px]",
                isUnlocked 
                    ? cn("bg-card", unlockedShadows[achievement.rarity])
                    : "bg-card border-border opacity-60"
            )}
        >
            {/* Rarity & Type Tag */}
            <div className="absolute top-8 left-10 right-10 flex justify-between items-center z-10">
                <div className={cn(
                    "text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border",
                    rarityStyles[achievement.rarity]
                )}>
                    {achievement.rarity}
                </div>
                <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
                    {achievement.type}
                </div>
            </div>

            <div className="flex flex-col items-center text-center h-full pt-6">
                {/* Icon Container */}
                <div className={cn(
                    "relative flex items-center justify-center mb-8 transition-transform duration-700 group-hover:scale-110",
                    isCertificate ? "w-28 h-28" : "w-20 h-20"
                )}>
                    {/* Background glow for certificates */}
                    {isCertificate && isUnlocked && (
                        <div className={cn(
                            "absolute inset-0 rounded-full blur-2xl opacity-20",
                            achievement.rarity === "LEGENDARY" ? "bg-nexus-gold" : "bg-primary"
                        )} />
                    )}

                    <div className={cn(
                        "w-full h-full rounded-[2rem] flex items-center justify-center relative z-10 transition-all duration-500",
                        isUnlocked 
                            ? "bg-slate-800 border border-slate-700 shadow-xl" 
                            : "bg-surface border-2 border-dashed border-white/5 text-slate-700",
                        isCertificate && "rotate-[45deg]"
                    )}>
                        <div className={isCertificate ? "-rotate-[45deg]" : ""}>
                            {isUnlocked ? (
                                <Icon className={cn(isCertificate ? "w-12 h-12" : "w-10 h-10", "text-black")} />
                            ) : (
                                <Lock className={cn(isCertificate ? "w-10 h-10" : "w-8 h-8", "opacity-40")} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-3 flex-1">
                    <h4 className={cn(
                        "font-bold tracking-tight leading-tight",
                        isCertificate ? "text-xl" : "text-lg",
                        isUnlocked ? "text-foreground" : "text-slate-500"
                    )}>{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {achievement.description}
                    </p>
                    
                    {achievement.prerequisiteId && !isUnlocked && (
                        <div className="flex items-center justify-center gap-1.5 mt-2">
                            <ShieldAlert className="w-3 h-3 text-amber-500" />
                            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Requires {achievement.prerequisiteId.split('-').pop()?.toUpperCase()}</span>
                        </div>
                    )}
                </div>

                {/* Progress Section */}
                <div className="mt-8 w-full space-y-4">
                    {!isUnlocked ? (
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1 bg-surface border border-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className={cn(
                                        "h-full transition-all duration-1000",
                                        progress > 0 ? "bg-primary shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "bg-slate-700"
                                    )}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-center gap-2 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                    {isCertificate ? "Certified Protocol" : "Verified Badge"}
                                </span>
                            </div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                                Issued: {new Date(achievement.unlockedAt!).toLocaleDateString()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
