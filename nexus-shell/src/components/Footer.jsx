import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info } from 'lucide-react';

const Footer = () => {
    const phases = ['D', 'M', 'A', 'I', 'C'];
    const activePhase = 'A';

    return (
        <footer className="fixed bottom-0 left-0 w-full h-16 glass-blur border-t border-nexus-border flex items-center justify-between px-10 z-[1000] backdrop-blur-3xl">
            <div className="flex gap-8 text-[11px] font-bold text-slate-400 font-orbitron tracking-widest">
                <Link to="/" className="hover:text-nexus-cyan transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-nexus-cyan rounded-full group-hover:animate-ping" /> HOME
                </Link>
                <span className="hover:text-white cursor-pointer transition-colors">SUPPORT</span>
                <span className="text-nexus-cyan cursor-pointer flex items-center gap-1.5 hover:brightness-125 transition-all">
                    <ShieldCheck className="w-3.5 h-3.5" /> AI SENSEI
                </span>
            </div>

            <div className="flex items-center gap-6 font-orbitron">
                <div className="flex items-center gap-4 text-xs font-black">
                    {phases.map((p, idx) => (
                        <React.Fragment key={p}>
                            <div className="flex flex-col items-center">
                                <span className={`transition-all duration-500 ${p === activePhase
                                        ? 'text-nexus-cyan scale-125 drop-shadow-[0_0_10px_#22d3ee]'
                                        : 'text-slate-600 opacity-50'
                                    }`}>
                                    {p}
                                </span>
                                {p === activePhase && (
                                    <div className="w-1 h-1 bg-nexus-cyan rounded-full mt-0.5 animate-pulse" />
                                )}
                            </div>
                            {idx < phases.length - 1 && <span className="text-slate-800 font-normal">/</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="h-8 w-px bg-nexus-border" />
                <div className="text-right">
                    <div className="text-[10px] font-black font-orbitron tracking-tight leading-none mb-1">
                        <span className="text-slate-500">ENGINEERED BY </span>
                        <span className="text-transparent bg-clip-text bg-nexus-gold">HOSSAM ALDHAHER</span>
                        <span className="text-slate-600 ml-2">LSSMBB</span>
                    </div>
                    <div className="text-[8px] text-nexus-cyan/70 font-bold uppercase tracking-widest flex items-center justify-end gap-1">
                        <Info className="w-2.5 h-2.5" /> High Quality Leaders System
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
