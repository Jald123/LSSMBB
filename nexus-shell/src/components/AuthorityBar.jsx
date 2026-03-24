import React from 'react';

const AuthorityBar = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-10 z-[1000]">
            <div className="flex items-center gap-6">
                <span className="text-[10px] font-black font-orbitron text-slate-500 cursor-pointer hover:text-white transition-colors uppercase tracking-widest">Home</span>
                <span className="text-[10px] font-black font-orbitron text-slate-500 cursor-pointer hover:text-white transition-colors uppercase tracking-widest">Support</span>
                <span className="text-[10px] font-black font-orbitron text-nexus-cyan cursor-pointer hover:brightness-125 transition-all uppercase tracking-widest">Ask AI Sensei</span>
            </div>

            <div className="flex items-center gap-4 font-black font-orbitron text-sm">
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

            {/* Branding removed per user request */}
            <div className="flex-1"></div>
        </footer>
    );
};

export default AuthorityBar;
