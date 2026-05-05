"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, SkipForward, SkipBack, X, Mic2, Info, CheckCircle, Lightbulb, MonitorPlay } from "lucide-react";
import { cn } from "@/lib/utils";

const SEGMENTS = [
    { id: 1, title: "Walkthrough", icon: <MonitorPlay className="w-3 h-3" />, voice: "M" },
    { id: 2, title: "Concept Deep-Dive", icon: <Info className="w-3 h-3" />, voice: "F" },
    { id: 3, title: "Guided Execution", icon: <CheckCircle className="w-3 h-3" />, voice: "M" },
    { id: 4, title: "Results Interpretation", icon: <Volume2 className="w-3 h-3" />, voice: "F" },
    { id: 5, title: "Expert Wrap-Up", icon: <Lightbulb className="w-3 h-3" />, voice: "M" },
];

export function VoiceOverPlayer({ toolId, toolName, methodology = "DMAIC" }: { toolId: string, toolName: string, methodology?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSegment, setActiveSegment] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasRealAudio, setHasRealAudio] = useState(false);
    
    // In a real implementation, this would be an actual <audio> ref
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Dynamic path for the currently selected audio file
    const audioSrc = `/audio/voiceovers/${methodology}_${toolId}_s${activeSegment}.mp3`;

    // Simulate audio playing ONLY if real audio is missing
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && !hasRealAudio) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return p + 0.5; // simulate progress
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, hasRealAudio]);

    // Handle actual audio element interactions
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying && hasRealAudio) {
            audio.play().catch(e => {
                console.warn("Audio play failed, falling back to simulation.", e);
                setHasRealAudio(false);
            });
        } else {
            audio.pause();
        }
    }, [isPlaying, hasRealAudio, activeSegment]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (activeSegment < 5) {
            setActiveSegment(prev => prev + 1);
            setProgress(0);
            setIsPlaying(true);
        }
    };

    const handlePrev = () => {
        if (activeSegment > 1) {
            setActiveSegment(prev => prev - 1);
            setProgress(0);
            setIsPlaying(true);
        }
    };

    const selectSegment = (id: number) => {
        setActiveSegment(id);
        setProgress(0);
        setIsPlaying(true);
    };

    return (
        <div className="fixed bottom-24 right-6 z-[9000]">
            <AnimatePresence>
                {!isOpen ? (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center hover:bg-slate-800 transition-all group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Mic2 className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors relative z-10" />
                        {/* Audio Wave Ping */}
                        <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-20" />
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                    <Volume2 className="w-3 h-3 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-none">Sensei Voice</p>
                                    <p className="text-xs font-bold text-slate-200">{toolName}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Visualizer & Controls */}
                        <div className="p-6 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-black/40">
                            <div className="flex items-center justify-center gap-1 h-12 mb-6">
                                {/* Fake Audio Visualizer */}
                                {[...Array(24)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={cn(
                                            "w-1 rounded-full",
                                            isPlaying ? "bg-blue-400" : "bg-slate-700"
                                        )}
                                        animate={isPlaying ? { height: ["10%", `${Math.random() * 80 + 20}%`, "10%"] } : { height: "10%" }}
                                        transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center justify-center gap-6">
                                <button onClick={handlePrev} className="text-slate-400 hover:text-white transition-colors disabled:opacity-30" disabled={activeSegment === 1}>
                                    <SkipBack className="w-5 h-5 fill-current" />
                                </button>
                                
                                <button 
                                    onClick={handlePlayPause}
                                    className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                >
                                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                                </button>
                                
                                <button onClick={handleNext} className="text-slate-400 hover:text-white transition-colors disabled:opacity-30" disabled={activeSegment === 5}>
                                    <SkipForward className="w-5 h-5 fill-current" />
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 w-full bg-slate-800 relative">
                            <div className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }} />
                        </div>

                        {/* Segment Playlist */}
                        <div className="p-2 flex flex-col gap-1 bg-black/40">
                            {SEGMENTS.map((seg) => (
                                <button
                                    key={seg.id}
                                    onClick={() => selectSegment(seg.id)}
                                    className={cn(
                                        "flex items-center justify-between p-2 rounded-lg text-left transition-all",
                                        activeSegment === seg.id ? "bg-white/10" : "hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-6 h-6 rounded flex items-center justify-center",
                                            activeSegment === seg.id ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-slate-500"
                                        )}>
                                            {activeSegment === seg.id && isPlaying ? (
                                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                                            ) : seg.icon}
                                        </div>
                                        <div>
                                            <p className={cn(
                                                "text-xs font-bold",
                                                activeSegment === seg.id ? "text-white" : "text-slate-400"
                                            )}>0{seg.id}. {seg.title}</p>
                                        </div>
                                    </div>
                                    <div className="text-[9px] font-black text-slate-600 uppercase border border-slate-700 px-1.5 py-0.5 rounded">
                                        Voice {seg.voice}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Hidden Audio Elements (Will be connected to real files later) */}
            <audio 
                ref={audioRef} 
                src={audioSrc}
                className="hidden" 
                onTimeUpdate={(e) => {
                    const audio = e.currentTarget;
                    if (audio.duration) {
                        setProgress((audio.currentTime / audio.duration) * 100);
                    }
                }}
                onLoadedMetadata={(e) => {
                    setDuration(e.currentTarget.duration);
                    setHasRealAudio(true);
                }}
                onError={() => {
                    setHasRealAudio(false);
                }}
                onEnded={() => {
                    setIsPlaying(false);
                    setProgress(0);
                    if (activeSegment < 5) {
                        handleNext();
                    }
                }}
            />
        </div>
    );
}
