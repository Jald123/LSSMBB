import React from 'react';
import { Link } from 'react-router-dom';
import { useNexus } from '../context/NexusContext';

const Footer = () => {
    const { isSidebarCollapsed } = useNexus();

    return (
        <footer className={`fixed bottom-0 left-0 right-0 h-14 bg-[#020617]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-10 z-[1000] transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-60'}`}>
            <div className="flex items-center gap-6">
                <Link to="/" className="text-[9px] font-black font-orbitron text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Home</Link>
                <Link to="/support" className="text-[9px] font-black font-orbitron text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Support</Link>
                <span className="text-[9px] font-black font-orbitron text-nexus-cyan cursor-pointer hover:brightness-125 transition-all uppercase tracking-widest">Ask AI Sensei</span>
            </div>

            <div className="flex items-center gap-4 font-black font-orbitron text-xs">
                <span className="text-nexus-cyan shadow-[0_0_10px_rgba(34,211,238,0.3)]">D</span>
                <span className="text-slate-700">—</span>
                <span className="text-slate-700">M</span>
                <span className="text-slate-700">—</span>
                <span className="text-slate-700">A</span>
                <span className="text-slate-700">—</span>
                <span className="text-slate-700">I</span>
                <span className="text-slate-700">—</span>
                <span className="text-slate-700">C</span>
            </div>

            <div className="text-right">
                <div className="text-[9px] font-black font-orbitron text-nexus-gold uppercase tracking-tighter leading-none">
                    Hossam AlDhaher <span className="font-medium text-[7px] opacity-70">LSSMBB</span>
                </div>
                <div className="text-[8px] font-medium text-nexus-cyan opacity-80 uppercase tracking-tighter">
                    HealthQualityLeader.com LTD
                </div>
            </div>
        </footer>
    );
};

export default Footer;
