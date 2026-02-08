import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="fixed bottom-4 right-4 z-[1000]">
            <div className="glass-panel bg-nexus-card/80 border border-nexus-border/50 rounded-full px-6 py-2.5 flex items-center gap-6 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
                {/* Navigation Links */}
                <div className="flex items-center gap-4 text-[10px] font-bold font-orbitron tracking-widest">
                    <Link to="/" className="text-nexus-text-secondary hover:text-nexus-cyan transition-colors">HOME</Link>
                    <Link to="/support" className="text-nexus-text-secondary hover:text-nexus-cyan transition-colors">SUPPORT</Link>
                    <span className="text-nexus-cyan hover:brightness-125 cursor-pointer transition-colors shadow-none">AI SENSEI</span>
                </div>

                {/* Divider */}
                <div className="w-px h-3 bg-nexus-border" />

                {/* Engineering Credit */}
                <div className="flex items-center gap-3 text-[9px] font-orbitron tracking-tight">
                    <span className="text-nexus-text-secondary">
                        ENGINEERED BY <span className="text-nexus-gold font-black">HOSSAM ALDHAHER</span> LSSMBB
                    </span>
                    <span className="flex items-center gap-1.5 text-nexus-cyan/70 font-bold bg-nexus-cyan/5 px-2 py-0.5 rounded-full border border-nexus-cyan/10">
                        <Info className="w-2.5 h-2.5" />
                        <span className="tracking-widest">HIGH QUALITY LEADERS SYSTEM</span>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
