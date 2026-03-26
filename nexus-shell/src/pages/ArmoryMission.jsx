import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';

const ArmoryMission = () => {
    const { missionId } = useParams();
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [hoverText, setHoverText] = useState(null);

    // Mission Details
    const missionData = {
        charter: {
            title: "THE CONTRACT (PROJECT CHARTER)",
            subtitle: "The Charter is your authority. It defines the 'Scope' and the 'Team'. Without it, you are just a person with an opinion.",
            goal: "IDENTIFY 3 HARD FACTS. ELIMINATE THE NOISE.",
            type: 'scope_creep'
        },
        sipoc: {
            title: "THE MAP (SIPOC)",
            subtitle: "Before you dive deep, map the flow from Supplier to Customer. Identify the boundaries so you don't boil the ocean.",
            goal: "MAP THE FLOW: SUPPLIER TO CUSTOMER.",
            type: 'sipoc_drag'
        },
        msa: {
            title: "THE TRUST (MSA PREMIUM)",
            subtitle: "Garbage In, Garbage Out. You must prove your Measurement System is reliable (Gage R&R) before you trust the data.",
            goal: "CALIBRATE THE SYSTEM. REDUCE VARIATION.",
            type: 'sniper_cal'
        },
        stats: {
            title: "THE DOCKING SEQUENCE (CAPABILITY)",
            subtitle: "The tunnel represents the customer's limits. Your process must fit inside perfectly to avoid a crash.",
            goal: "ALIGN CENTER (CPK) AND REDUCE SPREAD (CP).",
            type: 'docking_sim'
        },
        pareto: {
            title: "THE FOCUS (PARETO)",
            subtitle: "Identify the vital few issues causing 80% of pain. Don't waste time on trivial many.",
            goal: "ISOLATE THE VITAL FEW.",
            type: 'triage_shot'
        },
        fishbone: {
            title: "THE ANATOMY (FISHBONE)",
            subtitle: "Trace potential root causes across the 6M categories: Man, Machine, Material, Method, Mother Nature, Measurement.",
            goal: "TRACE ROOT CAUSES.",
            help: "The Fishbone (Ishikawa) diagram is used to brainstorm all possible sources of variation. In this challenge, look for the 'Vital Clue' and categorize it correctly under the primary source (6M).",
            type: 'detective_board'
        }
    };

    missionData.charter.help = "A Project Charter must be objective. Subjective noise like 'I feel' or 'People are lazy' are bias-Solution jumps. Your goal is to only capture hard facts and measurable data points.";
    missionData.sipoc.help = "SIPOC stands for Supplier, Input, Process, Output, Customer. Drag specific items to their logical category. Suppliers provide Inputs, the Process transforms them into Outputs for the Customer.";
    missionData.msa.help = "Measurement System Analysis (MSA) ensures that the variation we see comes from the process, not the gauge. Use the slider to 'tighten the sensor' and eliminate measurement variation.";
    missionData.stats.help = "Capability analysis (Cp/Cpk) measures how well your process fits within customer limits. Use PRECISION to shrink the spread (Cp) and STEERING to align the center (Cpk). Aim for > 1.33.";
    missionData.pareto.help = "The Pareto principle states that 80% of consequences come from 20% of causes. Identify the 'Vital Few' bars that represent the majority of the problem value.";

    const currentMission = missionData[missionId];

    if (!currentMission) return <div className="p-20 text-white font-orbitron">SYSTEM ERROR: MISSION NOT FOUND</div>;

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 py-6 min-h-[calc(100vh-40px)] flex flex-col">
            <div className="bg-[#0f172a]/95 border border-cyan-500/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.1)] flex-1 flex flex-col">

                {/* 🏷️ Header Bar */}
                <div className="bg-black/40 border-b border-cyan-500/20 px-8 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-cyan-500/10 rounded flex items-center justify-center border border-cyan-500/30">
                            <Shield className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <h1 className="text-xs font-black font-orbitron tracking-[0.2em] text-cyan-400 uppercase">The Analyst's Armory</h1>
                    </div>
                    <button
                        onClick={() => navigate('/armory')}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* 🎮 Mission Header */}
                <div className="bg-slate-900/50 border-b border-white/5 px-10 py-8 flex items-start justify-between shrink-0">
                    <div className="flex gap-6">
                        <button
                            onClick={() => navigate('/armory')}
                            className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-[10px] font-black font-orbitron text-slate-400 hover:text-white transition-colors h-10"
                        >
                            ← BACK TO HUB
                        </button>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black font-orbitron text-white tracking-widest leading-none">{currentMission.title}</h2>
                            <p className="text-slate-500 text-[11px] font-medium max-w-2xl leading-relaxed">{currentMission.subtitle}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-nexus-cyan font-black font-orbitron text-3xl tracking-tighter">SCORE: {score}</div>
                        <button
                            onClick={() => setShowHelp(true)}
                            className="bg-cyan-500/20 border border-cyan-500/40 px-3 py-1 rounded-md text-[9px] font-black font-orbitron text-cyan-400 mt-2 uppercase hover:bg-cyan-400 hover:text-black transition-all"
                        >
                            Mission Help
                        </button>
                    </div>
                </div>

                {/* 🏷️ Tooltip Hud */}
                <div className="h-6 bg-cyan-500/5 border-b border-cyan-500/10 flex items-center px-10 gap-2 overflow-hidden shrink-0">
                    <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={hoverText}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-[8px] font-black font-orbitron text-cyan-400/60 uppercase tracking-[0.2em]"
                        >
                            {hoverText || "Ready for Calibration..."}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* 🕹️ Game Surface */}
                <div className="flex-1 relative overflow-y-auto custom-scrollbar flex flex-col items-center p-10 pt-24">
                    {!isComplete && (
                        <div className="absolute top-8 text-center z-10">
                            <div className="text-cyan-400 font-black font-orbitron text-sm tracking-widest mb-1">ROUND {round} OF {currentMission.type === 'triage_shot' ? 1 : (currentMission.type === 'detective_board' ? 4 : 5)}</div>
                            <div className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase">{currentMission.goal}</div>
                        </div>
                    )}

                    <div className="flex-1 w-full flex flex-col items-center justify-center">
                        <GameRenderer
                            type={currentMission.type}
                            round={round}
                            setRound={setRound}
                            setScore={setScore}
                            setIsComplete={setIsComplete}
                            setHoverText={setHoverText}
                        />
                    </div>

                    {/* Completion Screen */}
                    <AnimatePresence>
                        {isComplete && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center text-center p-10"
                            >
                                <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                                    <Shield className="w-12 h-12 text-green-500" />
                                </div>
                                <h3 className="text-4xl font-black font-orbitron text-white mb-2 uppercase tracking-tighter">Mission Success!</h3>
                                <p className="text-slate-400 max-w-md mx-auto mb-8 font-medium">You have successfully calibrated your skills in this station. The core competency badge has been locked into your profile.</p>
                                <button
                                    onClick={() => navigate('/armory')}
                                    className="bg-white text-nexus-navy px-12 py-4 rounded-xl font-black font-orbitron text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-widest"
                                >
                                    Return to Command Center
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mission Help Modal */}
                    <AnimatePresence>
                        {showHelp && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-10"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="bg-slate-900 border border-cyan-500/40 p-10 rounded-[2rem] max-w-xl shadow-2xl relative"
                                >
                                    <button
                                        onClick={() => setShowHelp(false)}
                                        className="absolute top-6 right-6 text-slate-500 hover:text-white"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                    <h4 className="text-cyan-400 font-black font-orbitron text-xl mb-4 tracking-widest">MISSION BRIEFING</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-8 font-medium">
                                        {currentMission.help}
                                    </p>
                                    <button
                                        onClick={() => setShowHelp(false)}
                                        className="w-full py-4 bg-cyan-500 text-black font-black font-orbitron text-xs tracking-[0.2em] rounded-xl uppercase hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        Understood
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 🛠️ Footer Bar */}
                <div className="bg-black/40 border-t border-cyan-500/20 px-8 py-3 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                        <span className="text-[10px] font-black font-orbitron text-cyan-400/60 uppercase tracking-widest">Mission Status: Tactical</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-4 h-1 bg-cyan-500/20 rounded-full" />
                            ))}
                        </div>
                        <span className="text-[9px] font-black font-orbitron text-slate-600 uppercase tracking-widest">Nexus OS / Armory v2.1</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------------
// GAME RENDERER DISPATCHER
// ----------------------------------------------------------------------------

const GameRenderer = ({ type, round, setRound, setScore, setIsComplete, setHoverText }) => {
    switch (type) {
        case 'scope_creep': return <CharterGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} setHoverText={setHoverText} />;
        case 'sipoc_drag': return <SipocGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} setHoverText={setHoverText} />;
        case 'sniper_cal': return <MsaGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} setHoverText={setHoverText} />;
        case 'docking_sim': return <CapabilityGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} setHoverText={setHoverText} />;
        case 'triage_shot': return <ParetoGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} setHoverText={setHoverText} />;
        case 'detective_board': return <FishboneGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} setHoverText={setHoverText} />;
        default: return <div className="text-slate-700 font-black font-orbitron">SYSTEM INITIALIZING...</div>;
    }
};

// ----------------------------------------------------------------------------
// 1. CHARTER GAME (SCOPE CREEP DEFENDER)
// ----------------------------------------------------------------------------

const CharterGame = ({ round, setRound, setScore, setIsComplete, setHoverText }) => {
    const rawRounds = [
        { 
            scenario: "The Coffee Shop", 
            items: [
                { t: "Wait time: 4m", v: true },
                { t: "Barista is slow", v: false },
                { t: "Temp: 185°F", v: true },
                { t: "Milk is bad", v: false },
                { t: "Revenue: $450", v: true },
                { t: "Rude customers", v: false }
            ]
        },
        { 
            scenario: "IT Support Desk", 
            items: [
                { t: "Ping: 42ms", v: true },
                { t: "Users are late", v: false },
                { t: "Tickets: 120", v: true },
                { t: "Legacy crap", v: false },
                { t: "Uptime: 99.9%", v: true },
                { t: "Lazy night shift", v: false }
            ]
        }
    ];

    const currentData = rawRounds[Math.min(round - 1, 1)];
    const [items, setItems] = useState(currentData.items);
    const [sortedCount, setSortedCount] = useState(0);

    const handleSort = (type, item) => {
        const isSignal = item.v;
        const isCorrectTarget = (type === 'file' && isSignal) || (type === 'garbage' && !isSignal);

        if (isCorrectTarget) {
            setScore(s => s + 20);
            setHoverText(`VALIDATED: ${item.t} correctly classified.`);
        } else {
            setScore(s => Math.max(0, s - 10));
            setHoverText(`REJECTED: ${item.t} is ${isSignal ? 'a valid signal' : 'subjective noise'}.`);
        }

        setItems(prev => prev.filter(i => i.t !== item.t));
        setSortedCount(prev => prev + 1);

        if (sortedCount + 1 >= 6) {
            if (round < 2) {
                setTimeout(() => {
                    setRound(r => r + 1);
                    setSortedCount(0);
                    setItems(rawRounds[1].items);
                    setHoverText(null);
                }, 1000);
            } else {
                setTimeout(() => setIsComplete(true), 1000);
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="text-center font-black font-orbitron text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-10">
                SCENARIO: {currentData.scenario}
            </div>

            <div className="w-full flex justify-between items-stretch px-10 gap-10">
                <div 
                    onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
                    onDrop={(e) => {
                        try {
                            const data = JSON.parse(e.dataTransfer.getData("application/json"));
                            handleSort('garbage', data);
                        } catch(err) {}
                    }}
                    className="w-48 min-h-[400px] border-2 border-dashed border-red-500/30 bg-red-500/5 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all hover:border-red-500 hover:bg-red-500/10 shrink-0"
                >
                    <i className="fas fa-trash-alt text-4xl text-red-500 opacity-40"></i>
                    <span className="text-[10px] font-black font-orbitron text-red-500/60 uppercase tracking-widest text-center px-4">Garbage Bin:<br/>Subjective Noise</span>
                </div>

                <div className="flex-1 flex flex-wrap justify-center content-center gap-6 min-h-[400px] bg-black/20 rounded-[3rem] border border-white/5 p-10">
                    <AnimatePresence>
                        {items.map((it, idx) => (
                            <SortingItem key={it.t + idx} item={it} setHoverText={setHoverText} />
                        ))}
                    </AnimatePresence>
                </div>

                <div 
                    onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
                    onDrop={(e) => {
                        try {
                            const data = JSON.parse(e.dataTransfer.getData("application/json"));
                            handleSort('file', data);
                        } catch(err) {}
                    }}
                    className="w-48 min-h-[400px] border-2 border-dashed border-cyan-500/30 bg-cyan-500/5 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all hover:border-cyan-500 hover:bg-cyan-500/10 shrink-0"
                >
                    <i className="fas fa-file-invoice text-4xl text-cyan-400 opacity-40"></i>
                    <span className="text-[10px] font-black font-orbitron text-cyan-400/60 uppercase tracking-widest text-center px-4">Project File:<br/>Objective Signal</span>
                </div>
            </div>
            <div className="text-[10px] font-bold font-orbitron text-slate-600 uppercase tracking-[0.2em] mt-10 italic opacity-50">Drag items to classification targets</div>
        </div>
    );
};

const SortingItem = ({ item, setHoverText }) => {
    return (
        <motion.div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("application/json", JSON.stringify(item));
                e.dataTransfer.effectAllowed = "move";
            }}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            onMouseEnter={() => setHoverText(`CLASSIFY: ${item.t}`)}
            onMouseLeave={() => setHoverText(null)}
            className={`px-6 py-4 rounded-xl border-2 cursor-grab active:cursor-grabbing shadow-xl font-bold font-orbitron text-[10px] tracking-widest text-center
                ${item.v 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 rounded-tr-[40px]' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400 rounded-bl-[40px]'
                }
            `}
        >
            {item.t}
        </motion.div>
    );
};

// ----------------------------------------------------------------------------
// 2. SIPOC GAME (THE MAP)
// ----------------------------------------------------------------------------

const SipocGame = ({ round, setRound, setScore, setIsComplete }) => {
    const scenarios = [
        { scenario: "Pizza Delivery", mapping: { "Grocery": "S", "Dough": "I", "Baking": "P", "Boxed Pizza": "O", "Hungry Person": "C" } },
        { scenario: "Bank Loan", mapping: { "Federal Res": "S", "Applicant Info": "I", "Appraisal": "P", "Approved Loan": "O", "Home Buyer": "C" } },
        { scenario: "Software Dev", mapping: { "Cloud Provider": "S", "User Stories": "I", "Coding": "P", "Release": "O", "End User": "C" } },
        { scenario: "Car Assembly", mapping: { "Steel Mill": "S", "Components": "I", "Chassis Weld": "P", "Vehicle": "O", "Dealership": "C" } },
        { scenario: "Restaurant", mapping: { "Farm Store": "S", "Ingredients": "I", "Cooking": "P", "Meal": "O", "Diner": "C" } }
    ];

    const currentScenario = scenarios[round - 1];
    const [placed, setPlaced] = useState({});
    const [items, setItems] = useState(Object.keys(currentScenario.mapping));

    const handleDrop = (bucket, item) => {
        if (currentScenario.mapping[item] === bucket) {
            setScore(s => s + 25);
            setHoverText(`VALID MAPPING: ${item} is a ${bucket}`);
            const newPlaced = { ...placed, [bucket]: item };
            setPlaced(newPlaced);
            setItems(it => it.filter(i => i !== item));

            if (Object.keys(newPlaced).length >= 5) {
                if (round < 5) {
                    setTimeout(() => {
                        setRound(r => r + 1);
                        setPlaced({});
                        setItems(Object.keys(scenarios[round].mapping));
                        setHoverText(null);
                    }, 1000);
                } else {
                    setTimeout(() => setIsComplete(true), 1000);
                }
            }
        } else {
            setScore(s => Math.max(0, s - 10));
            setHoverText(`CONFLICT: ${item} does not belong in ${bucket}`);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-10">
            <div className="text-center font-black font-orbitron text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-4">
                SCENARIO: {currentScenario.scenario}
            </div>

            <div className="flex flex-wrap justify-center gap-6 min-h-[100px]">
                {items.map(item => (
                    <DraggableItem
                        key={item}
                        name={item}
                        onMouseEnter={() => setHoverText(`ORBITING OBJECT: ${item}`)}
                        onMouseLeave={() => setHoverText(null)}
                    />
                ))}
            </div>

            <div className="grid grid-cols-5 gap-6 w-full max-w-6xl px-10">
                {['S', 'I', 'P', 'O', 'C'].map(bucket => (
                    <Bucket
                        key={bucket}
                        label={bucket}
                        content={placed[bucket]}
                        onDrop={(item) => handleDrop(bucket, item)}
                    />
                ))}
            </div>
        </div>
    );
};

const DraggableItem = ({ name, onMouseEnter, onMouseLeave }) => {
    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", name);
                e.dataTransfer.effectAllowed = "move";
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="px-6 py-3 bg-nexus-surface border border-nexus-border rounded-xl text-nexus-text-primary font-black font-orbitron text-[10px] tracking-widest cursor-grab active:cursor-grabbing shadow-xl hover:border-cyan-400/50 transition-colors"
        >
            {name}
        </div>
    );
};

const Bucket = ({ label, content, onDrop }) => {
    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            }}
            onDrop={(e) => {
                e.preventDefault();
                const data = e.dataTransfer.getData("text/plain");
                onDrop(data);
            }}
            className={`flex-1 min-h-[140px] rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-300
                ${content ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'border-nexus-border bg-nexus-surface/10 hover:border-white/20'}
            `}
        >
            <div className="text-3xl font-black font-orbitron text-nexus-text-primary opacity-5 absolute top-2 left-4 pointer-events-none">{label}</div>
            {content && (
                <div className="text-[10px] font-black font-orbitron text-cyan-400 text-center px-2 animate-in fade-in zoom-in duration-300 pointer-events-none">
                    {content}
                </div>
            )}
        </div>
    );
};

// ----------------------------------------------------------------------------
// 3. MSA GAME (THE TRUST)
// ----------------------------------------------------------------------------

const MsaGame = ({ round, setRound, setScore, setIsComplete, setHoverText }) => {
    const scenarios = [
        { scenario: "Coffee Bean Weight", target: "18.0g", prompt: "Variation in weight is causing bad brews. Minimize the drift." },
        { scenario: "Steel Bolt Diameter", target: "10.0mm", prompt: "The thread counts are off. Tighten the calibration ring." },
        { scenario: "Syringe Dosage", target: "5.0ml", prompt: "Dosage precision is life-critical. Stabilize the sensor." },
        { scenario: "Wafer Thickness", target: "0.2mm", prompt: "Nanometer variance is causing shorts. Lock the focal lens." },
        { scenario: "Fuel Pressure", target: "42 PSI", prompt: "Engine sputter detected. Calibrate the pressure gauge." }
    ];

    const [variation, setVariation] = useState(50);
    const [sliderVal, setSliderVal] = useState(0);
    const [wobble, setWobble] = useState({ x: 0, y: 0 });
    const [isStabilized, setIsStabilized] = useState(false);
    const currentScenario = scenarios[round - 1];

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isStabilized) {
                setWobble({
                    x: (Math.random() - 0.5) * variation,
                    y: (Math.random() - 0.5) * variation
                });
            }
        }, 50);
        return () => clearInterval(interval);
    }, [variation, isStabilized]);

    const handleCalibrate = (val) => {
        setSliderVal(val);
        setVariation(50 - (val / 2));
        if (val >= 98) {
            setIsStabilized(true);
            setHoverText("SYSTEM STABILIZED. ROUND COMPLETE.");
        } else {
            setHoverText("ADJUSTING CALIBRATION...");
        }
    };

    const nextRound = () => {
        setScore(s => s + 30);
        if (round < 5) {
            setRound(r => r + 1);
            setVariation(50);
            setSliderVal(0);
            setIsStabilized(false);
            setHoverText(null);
        } else {
            setIsComplete(true);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="text-center font-black font-orbitron text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-8">
                SCENARIO: {currentScenario.scenario}
            </div>

            <div
                onMouseEnter={() => setHoverText(currentScenario.prompt)}
                onMouseLeave={() => setHoverText(null)}
                className="w-64 h-64 rounded-full border-4 border-white/10 relative overflow-hidden bg-radial-at-center from-cyan-950/20 to-black shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-full h-px bg-cyan-500/50" />
                    <div className="h-full w-px bg-cyan-500/50 absolute" />
                </div>

                <div className="absolute inset-0 border-[20px] border-cyan-500/5 rounded-full" />

                <motion.div
                    animate={{
                        x: isStabilized ? 0 : wobble.x,
                        y: isStabilized ? 0 : wobble.y,
                        scale: isStabilized ? [1, 1.5, 1] : 1
                    }}
                    className={`w-4 h-4 rounded-full absolute top-1/2 left-1/2 -ml-2 -mt-2 shadow-[0_0_20px_#22d3ee]
                        ${isStabilized ? 'bg-green-400' : 'bg-cyan-400'}
                    `}
                />
            </div>

            <div className="mt-12 w-full max-w-md space-y-4">
                <div className="flex justify-between items-end">
                    <div className="text-[10px] font-black font-orbitron text-slate-500 uppercase tracking-widest">Variation Control</div>
                    <div className="text-[10px] font-black font-orbitron text-cyan-400 uppercase tracking-widest">Target: {currentScenario.target}</div>
                </div>
                <input
                    type="range"
                    min="0" max="100"
                    value={sliderVal}
                    disabled={isStabilized}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    onChange={(e) => handleCalibrate(parseInt(e.target.value))}
                />

                <div className="h-10 flex items-center justify-center">
                    {isStabilized ? (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={nextRound}
                            className="bg-cyan-500 text-black px-8 py-2 rounded-lg font-black font-orbitron text-[10px] tracking-widest uppercase"
                        >
                            Next Calibration Item
                        </motion.button>
                    ) : (
                        <div className="text-center italic text-slate-600 text-[10px] font-orbitron font-bold tracking-tighter uppercase">
                            {variation > 5 ? 'System Unstable: Calibration Required' : 'System Stable: Gage R&R Verified'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------------
// 4. CAPABILITY GAME (THE DOCKING SEQUENCE)
// ----------------------------------------------------------------------------

const CapabilityGame = ({ round, setRound, setScore, setIsComplete, setHoverText }) => {
    const scenarios = [
        { name: "The Garage", usl: 130, lsl: 20, desc: "Process Mean must be 75. Variation must be < 15." },
        { name: "MRI Window", usl: 140, lsl: 10, desc: "Wide specs but shifting mean. Align the scanner center." },
        { name: "The Commute", usl: 120, lsl: 30, desc: "Narrow tunnel detected. Drastic variance reduction required." },
        { name: "Cargo Box", usl: 110, lsl: 40, desc: "High precision required. The drone is barely smaller than the gate." },
        { name: "Alpha Gate", usl: 105, lsl: 45, desc: "The Ultimate Test. 6 Sigma precision required (Cpk > 2.0)." }
    ];

    const scenario = scenarios[round - 1];
    const [precision, setPrecision] = useState(25);
    const [steering, setSteering] = useState(80);
    const [isDocked, setIsDocked] = useState(false);

    const usl = scenario.usl;
    const lsl = scenario.lsl;
    const cp = (usl - lsl) / (6 * precision);
    const cpu = (usl - steering) / (3 * precision);
    const cpl = (steering - lsl) / (3 * precision);
    const cpk = Math.max(0, Math.min(cpu, cpl));

    const handleDock = () => {
        if (cpk >= 1.33) {
            setIsDocked(true);
            setHoverText("STABLE DOCKING ACHIEVED. READY FOR NEXT MISSION.");
        } else {
            setHoverText("CRASH IMMINENT: Cpk IS BELOW THRESHOLD. CENTER THE MEAN.");
        }
    };

    const nextMission = () => {
        setScore(s => s + 100);
        if (round < 5) {
            setRound(r => r + 1);
            setPrecision(25);
            setSteering(80);
            setIsDocked(false);
            setHoverText(null);
        } else {
            setIsComplete(true);
        }
    };

    const generateBellPathUnified = (visualSteering, visualPrecision, w = 600, h = 240) => {
        const sigma = visualPrecision;
        const mean = visualSteering;

        const scaleX = w / 160;

        let path = "M ";
        for (let i = 0; i < w; i++) {
            const xVal = i / scaleX;
            const y = Math.exp(-0.5 * Math.pow((xVal - mean) / sigma, 2));
            const xPos = i;
            const yPos = h - (y * h);
            path += `${xPos},${yPos} `;
        }
        return path;
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="text-center font-black font-orbitron text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-8">
                MISSION: {scenario.name}
            </div>

            {/* 🛰️ Unified Interactive Graph */}
            <div
                onMouseEnter={() => setHoverText("UNIFIED CAPABILITY VIEW: The dashed cyan curve shows your Potential (Cp) if perfectly centered. The solid curve shows your Reality (Cpk).")}
                onMouseLeave={() => setHoverText(null)}
                className="w-full max-w-5xl mb-12 space-y-4"
            >
                <div className="flex justify-between items-center px-6">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-0.5 bg-cyan-400 border border-cyan-400 border-dashed" />
                            <span className="text-[10px] font-black font-orbitron text-cyan-400 tracking-[0.2em] uppercase">Potential (Cp: {cp.toFixed(2)})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-0.5 ${cpk >= 1.33 ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className={`text-[10px] font-black font-orbitron tracking-[0.2em] uppercase ${cpk >= 1.33 ? 'text-green-500' : 'text-red-500'}`}>Reality (Cpk: {cpk.toFixed(2)})</span>
                        </div>
                    </div>
                    <span className="text-[10px] font-black font-orbitron text-slate-500 tracking-[0.2em] uppercase">Unified Process Analysis</span>
                </div>

                <div className="relative h-[320px] bg-slate-900/40 rounded-[3rem] border border-white/5 flex items-center justify-center overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]">
                    {/* 🧱 Spec Walls */}
                    <div className="absolute inset-0 flex flex-col justify-center">
                        <div style={{ height: (usl - lsl) * 1.5 }} className="w-full bg-cyan-500/5 border-y border-white/10" />
                    </div>

                    {/* 📏 Spec Labels */}
                    <div className="absolute inset-x-10 h-full pointer-events-none flex flex-col justify-center">
                        <div style={{ transform: `translateY(${-((usl - lsl) * 0.75)}px)` }} className="flex justify-between">
                            <span className="text-[8px] font-black font-orbitron text-orange-400/40 uppercase">LSL: {lsl}</span>
                            <div className="h-px bg-orange-400/10 flex-1 mx-4 self-center" />
                        </div>
                        <div style={{ transform: `translateY(${((usl - lsl) * 0.75)}px)` }} className="flex justify-between">
                            <span className="text-[8px] font-black font-orbitron text-orange-400/40 uppercase">USL: {usl}</span>
                            <div className="h-px bg-orange-400/10 flex-1 mx-4 self-center" />
                        </div>
                    </div>

                    {/* 🎞️ Dual Bell Curves */}
                    <div className="relative w-[600px] h-[240px]">
                        <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="potentialGlow" x1="0" y1="0" x2="0" y2="100%">
                                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="realityGlow" x1="0" y1="0" x2="0" y2="100%">
                                    <stop offset="0%" stopColor={cpk >= 1.33 ? "#22c55e" : "#ef4444"} stopOpacity="0.2" />
                                    <stop offset="100%" stopColor={cpk >= 1.33 ? "#22c55e" : "#ef4444"} stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Center Line (Target) */}
                            <line x1="300" y1="0" x2="300" y2="240" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" strokeDasharray="4 4" />

                            {/* Curve 1: Potential (Cp) - Dashed Cyan, Fixed at 80 (center) */}
                            <path
                                d={generateBellPathUnified(80, precision, 600, 240)}
                                fill="url(#potentialGlow)"
                                stroke="#22d3ee"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                className="opacity-40 transition-all duration-500"
                            />

                            {/* Curve 2: Reality (Cpk) - Solid Green/Red, follows Steering */}
                            <path
                                d={generateBellPathUnified(steering, precision, 600, 240)}
                                fill="url(#realityGlow)"
                                stroke={cpk >= 1.33 ? "#22c55e" : "#ef4444"}
                                strokeWidth="4"
                                className="transition-all duration-300"
                                style={{ filter: `drop-shadow(0 0 10px ${cpk >= 1.33 ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.2)'})` }}
                            />

                            {/* Real-time Mean line */}
                            <line
                                x1={steering * (600 / 160)} y1="0"
                                x2={steering * (600 / 160)} y2="240"
                                stroke={cpk >= 1.33 ? "#22c55e" : "#ef4444"}
                                strokeWidth="1"
                                strokeDasharray="2 2"
                                opacity="0.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* ⌨️ Control Interface */}
            <div className="w-full max-w-4xl bg-black/20 p-10 rounded-[2.5rem] border border-white/5 space-y-10 mb-12 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-black font-orbitron text-slate-500 uppercase tracking-widest">
                            <span>Precision (Variation)</span>
                            <span className="text-cyan-400">Sigma Scale: ±{precision.toFixed(1)}</span>
                        </div>
                        <input
                            type="range" min="5" max="40" step="0.5"
                            value={precision} disabled={isDocked}
                            onMouseEnter={() => setHoverText("PRECISION CONTROL: Shrink the spread (standard deviation). A tighter curve increases both Cp and Cpk.")}
                            onMouseLeave={() => setHoverText(null)}
                            onChange={(e) => setPrecision(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <p className="text-[8px] text-slate-600 font-bold uppercase tracking-tighter">Affects Cp and Cpk equally.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-black font-orbitron text-slate-500 uppercase tracking-widest">
                            <span>Steering (Mean)</span>
                            <span className="text-nexus-purple">Position: {steering}</span>
                        </div>
                        <input
                            type="range" min="0" max="160" step="1"
                            value={steering} disabled={isDocked}
                            onMouseEnter={() => setHoverText("STEERING CONTROL: Align the process mean with the center. Vital for Cpk (Reality) but has zero effect on Cp (Potential).")}
                            onMouseLeave={() => setHoverText(null)}
                            onChange={(e) => setSteering(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-nexus-purple"
                        />
                        <p className="text-[8px] text-slate-600 font-bold uppercase tracking-tighter">Only affects Cpk (Reality).</p>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col items-center gap-6">
                    <div className="flex gap-4">
                        <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 ${cp >= 1.33 ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400' : 'border-slate-800 bg-slate-900 text-slate-600'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${cp >= 1.33 ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-slate-700'}`} />
                            <span className="text-[9px] font-black font-orbitron uppercase tracking-widest">Potential Locked</span>
                        </div>
                        <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 ${cpk >= 1.33 ? 'border-green-500/40 bg-green-500/5 text-green-400' : 'border-slate-800 bg-slate-900 text-slate-600'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${cpk >= 1.33 ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-slate-700'}`} />
                            <span className="text-[9px] font-black font-orbitron uppercase tracking-widest">Reality Aligned</span>
                        </div>
                    </div>

                    <div className="w-full max-w-sm">
                        {isDocked ? (
                            <motion.button
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                onClick={nextMission}
                                onMouseEnter={() => setHoverText("MISSION PARAMETERS MET: Handoff data to the next simulation phase.")}
                                onMouseLeave={() => setHoverText(null)}
                                className="w-full bg-green-500 text-black py-4 rounded-xl font-black font-orbitron text-xs tracking-widest uppercase shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:brightness-110 transition-all"
                            >
                                Initiate Handoff Proceed
                            </motion.button>
                        ) : (
                            <button
                                onClick={handleDock}
                                onMouseEnter={() => setHoverText("VALIDATE VECTOR: Attempt to lock the current process parameters against customer limits.")}
                                onMouseLeave={() => setHoverText(null)}
                                className={`w-full py-4 rounded-xl font-black font-orbitron text-[10px] tracking-[0.2em] transition-all uppercase
                                    ${cpk >= 1.33 ? 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-[0.98]' : 'bg-slate-800 text-slate-600 border border-white/5'}
                                `}
                            >
                                Validate Docking Vector
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 🖱️ Indicator for scrollability */}
            <div className="flex flex-col items-center gap-2 opacity-30">
                <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
                <span className="text-[8px] font-black font-orbitron text-white uppercase tracking-widest">Vertical Alignment HUD</span>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------------
// 5. PARETO GAME (THE FOCUS)
// ----------------------------------------------------------------------------

const ParetoGame = ({ round, setRound, setScore, setIsComplete }) => {
    const [selected, setSelected] = useState([]);
    const bars = [
        { label: 'CRASHES', val: 320, vital: true },
        { label: 'LATENCY', val: 80, vital: false },
        { label: 'SECURITY', val: 280, vital: true },
        { label: 'WASTE', val: 40, vital: false },
        { label: 'WIFI', val: 20, vital: false }
    ];

    const handleBarClick = (i) => {
        if (selected.includes(i)) return;
        if (bars[i].vital) {
            setScore(s => s + 50);
            setSelected([...selected, i]);
            setHoverText(`VITAL FEW TARGET LOCKED: ${bars[i].label}`);
        } else {
            setScore(s => Math.max(0, s - 10));
            setHoverText(`TRIVIAL MANY DETECTED: Resource reallocation required.`);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex items-end gap-10 h-64 border-b-2 border-slate-800 pb-2 mb-10 px-10">
                {bars.map((bar, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ y: -5 }}
                        onClick={() => handleBarClick(i)}
                        style={{ height: bar.val / 1.5, width: 60 }}
                        className={`relative rounded-t-xl transition-all duration-500 border-2
                            ${selected.includes(i) ? 'bg-amber-500 border-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.5)]' : 'bg-slate-900 border-white/5 hover:border-white/20'}
                        `}
                    >
                        <div className="absolute -bottom-8 left-0 right-0 text-[9px] font-black font-orbitron text-slate-500 uppercase tracking-widest text-center">{bar.label}</div>
                    </motion.button>
                ))}
            </div>

            {selected.length < 2 ? (
                <div className="text-slate-600 font-orbitron text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">Identify the vital few issues causing 80% of the pain...</div>
            ) : (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setIsComplete(true)}
                    className="bg-amber-500 text-black px-16 py-4 rounded-xl font-black font-orbitron text-[11px] tracking-[0.2em] shadow-[0_0_50px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all uppercase"
                >
                    Fire 80/20 Solution Shot
                </motion.button>
            )}
        </div>
    );
};

// ----------------------------------------------------------------------------
// 6. FISHBONE GAME (THE ANATOMY)
// ----------------------------------------------------------------------------

const FishboneGame = ({ round, setRound, setScore, setIsComplete, setHoverText }) => {
    const clues = [
        { t: "Barista didn't sleep", c: "MAN" },
        { t: "Oven thermostat is broken", c: "MACHINE" },
        { t: "Coffee beans were expired", c: "MATERIAL" },
        { t: "Brewing time exceeds 10 mins", c: "METHOD" },
        { t: "Humidity affecting flour weight", c: "MOTHER NATURE" },
        { t: "Scale reading +/- 2g error", c: "MEASUREMENT" }
    ];

    const currentClue = clues[round - 1];
    const [selected, setSelected] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCategory = (cat) => {
        if (isProcessing) return;
        setSelected(cat);
        setIsProcessing(true);

        setTimeout(() => {
            if (cat === currentClue.c) {
                setScore(s => s + 25);
                setHoverText("ROOT CAUSE IDENTIFIED: VALID CATEGORY MATCH.");
                if (round < clues.length) {
                    setRound(r => r + 1);
                    setSelected(null);
                    setIsProcessing(false);
                } else {
                    setIsComplete(true);
                }
            } else {
                setScore(s => Math.max(0, s - 15));
                setHoverText(`INVESTIGATION FAILED: Evidence does not fit ${cat}.`);
                setSelected(null);
                setIsProcessing(false);
            }
        }, 800);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="bg-pink-500/5 border-2 border-pink-500/30 p-12 rounded-[2.5rem] w-full max-w-2xl text-center mb-12 shadow-[0_0_50px_rgba(236,72,153,0.1)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-[10px] font-black font-orbitron text-pink-500 uppercase tracking-[0.3em] mb-4">Evidence Analysis Board</div>
                <div className="text-3xl font-black font-orbitron text-white uppercase tracking-wider">{currentClue.t}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {[
                    { label: 'Personnel', cat: 'MAN', icon: 'fa-users' },
                    { label: 'Equipment', cat: 'MACHINE', icon: 'fa-cog' },
                    { label: 'Supplies', cat: 'MATERIAL', icon: 'fa-box-open' },
                    { label: 'Process', cat: 'METHOD', icon: 'fa-project-diagram' },
                    { label: 'Environment', cat: 'MOTHER NATURE', icon: 'fa-leaf' },
                    { label: 'Inspection', cat: 'MEASUREMENT', icon: 'fa-ruler-combined' }
                ].map(opt => (
                    <button
                        key={opt.cat}
                        onClick={() => handleCategory(opt.cat)}
                        disabled={isProcessing}
                        className={`group relative p-8 rounded-3xl font-black font-orbitron text-[10px] tracking-[0.2em] transition-all duration-300 flex flex-col items-center gap-4 border-2
                            ${selected === opt.cat 
                                ? (opt.cat === currentClue.c ? 'bg-green-500 border-green-400 text-black' : 'bg-red-500 border-red-400 text-white')
                                : 'bg-slate-900 border-white/5 text-slate-500 hover:border-pink-500/50 hover:bg-pink-500/5 hover:text-white hover:scale-105 active:scale-95'
                            }
                        `}
                    >
                        <i className={`fas ${opt.icon} text-2xl ${selected === opt.cat ? 'opacity-100' : 'opacity-20 group-hover:opacity-100 transition-opacity'}`}></i>
                        <span>{opt.label}</span>
                        <div className="text-[8px] opacity-40 uppercase tracking-tighter mt-1">({opt.cat})</div>
                    </button>
                ))}
            </div>
            <div className="text-[10px] font-bold font-orbitron text-slate-600 uppercase tracking-[0.2em] mt-12 opacity-50">Select the correct Fishbone category for the evidence</div>
        </div>
    );
};

export default ArmoryMission;
