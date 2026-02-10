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
            type: 'detective_board'
        }
    };

    const currentMission = missionData[missionId];

    if (!currentMission) return <div className="p-20 text-white font-orbitron">SYSTEM ERROR: MISSION NOT FOUND</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 h-[calc(100vh-100px)]">
            <div className="bg-[#0f172a]/95 border border-cyan-500/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.1)] h-full flex flex-col">

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
                        <button className="bg-cyan-500/20 border border-cyan-500/40 px-3 py-1 rounded-md text-[9px] font-black font-orbitron text-cyan-400 mt-2 uppercase">Mission Help</button>
                    </div>
                </div>

                {/* 🕹️ Game Surface */}
                <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-10">
                    {!isComplete && (
                        <div className="absolute top-8 text-center z-10">
                            <div className="text-cyan-400 font-black font-orbitron text-sm tracking-widest mb-1">ROUND {round} OF {currentMission.type === 'triage_shot' ? 1 : (currentMission.type === 'detective_board' ? 4 : 5)}</div>
                            <div className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase">{currentMission.goal}</div>
                        </div>
                    )}

                    <GameRenderer
                        type={currentMission.type}
                        round={round}
                        setRound={setRound}
                        setScore={setScore}
                        setIsComplete={setIsComplete}
                    />

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

const GameRenderer = ({ type, round, setRound, setScore, setIsComplete }) => {
    switch (type) {
        case 'scope_creep': return <CharterGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} />;
        case 'sipoc_drag': return <SipocGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} />;
        case 'sniper_cal': return <MsaGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} />;
        case 'docking_sim': return <CapabilityGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} />;
        case 'triage_shot': return <ParetoGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} />;
        case 'detective_board': return <FishboneGame round={round} setRound={setRound} setScore={setScore} setIsComplete={setIsComplete} />;
        default: return <div className="text-slate-700 font-black font-orbitron">SYSTEM INITIALIZING...</div>;
    }
};

// ----------------------------------------------------------------------------
// 1. CHARTER GAME (SCOPE CREEP DEFENDER)
// ----------------------------------------------------------------------------

const CharterGame = ({ round, setRound, setScore, setIsComplete }) => {
    const scenarios = [
        { scenario: "Coffee Shop", fact: "Temp 185°F", bias: "Rude barista" },
        { scenario: "IT Support", fact: "Ping 42ms", bias: "User is annoying" },
        { scenario: "Hospital Ward", fact: "HR 72 bpm", bias: "Patient is picky" },
        { scenario: "Call Center", fact: "AHT 240 sec", bias: "Old software" },
        { scenario: "Manufacturing", fact: "Yield 92%", bias: "Night shift laziness" }
    ];

    const currentScenario = scenarios[round - 1];
    const [captured, setCaptured] = useState(0);

    const words = [
        { t: currentScenario.fact, v: true },
        { t: "Objective Data", v: true },
        { t: "Measured Value", v: true },
        { t: currentScenario.bias, v: false },
        { t: "Assumption", v: false },
        { t: "Solution Jump", v: false },
        { t: "I heard...", v: false },
        { t: "Fixed Scope", v: true },
        { t: "Root Cause?", v: false }
    ];

    const handleWordClick = (w) => {
        if (w.v) {
            setScore(s => s + 20);
            setCaptured(c => c + 1);
        } else {
            setScore(s => Math.max(0, s - 15));
        }
    };

    useEffect(() => {
        if (captured >= 3) {
            if (round < 5) {
                setTimeout(() => {
                    setRound(r => r + 1);
                    setCaptured(0);
                }, 1000);
            } else {
                setTimeout(() => setIsComplete(true), 1000);
            }
        }
    }, [captured]);

    return (
        <div className="w-full h-full relative border-2 border-cyan-500/20 rounded-[2rem] bg-black/40 overflow-hidden shadow-inner">
            <div className="absolute top-4 left-0 right-0 text-center font-black font-orbitron text-[10px] text-slate-500 tracking-widest uppercase py-4">
                SCENARIO: {currentScenario.scenario}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={round}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative"
                >
                    {words.map((w, i) => (
                        <Bubble key={i} word={w} onClick={() => handleWordClick(w)} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const Bubble = ({ word, onClick }) => {
    const [isHit, setIsHit] = useState(false);
    const [pos] = useState({
        top: Math.random() * 65 + 15 + '%',
        left: Math.random() * 75 + 10 + '%',
    });

    if (isHit) return null;

    return (
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
                setIsHit(true);
                onClick();
            }}
            style={{ top: pos.top, left: pos.left }}
            className={`absolute px-6 py-3 rounded-full border shadow-lg font-black font-orbitron text-[10px] tracking-widest transition-all duration-300
                ${word.v
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:border-cyan-400'
                    : 'bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-400 hover:text-black hover:border-red-400'
                }`}
        >
            {word.t}
        </motion.button>
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
            const newPlaced = { ...placed, [bucket]: item };
            setPlaced(newPlaced);
            setItems(it => it.filter(i => i !== item));

            if (Object.keys(newPlaced).length >= 5) {
                if (round < 5) {
                    setTimeout(() => {
                        setRound(r => r + 1);
                        setPlaced({});
                        setItems(Object.keys(scenarios[round].mapping));
                    }, 1000);
                } else {
                    setTimeout(() => setIsComplete(true), 1000);
                }
            }
        } else {
            setScore(s => Math.max(0, s - 10));
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-10">
            <div className="text-center font-black font-orbitron text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-4">
                SCENARIO: {currentScenario.scenario}
            </div>

            <div className="flex flex-wrap justify-center gap-4 min-h-[60px]">
                {items.map(item => (
                    <DraggableItem key={item} name={item} />
                ))}
            </div>

            <div className="flex gap-4 w-full px-10">
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

const DraggableItem = ({ name }) => {
    return (
        <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text", name)}
            className="px-6 py-3 bg-white border border-white/20 rounded-xl text-nexus-navy font-black font-orbitron text-[10px] tracking-widest cursor-grab active:cursor-grabbing shadow-xl"
        >
            {name}
        </div>
    );
};

const Bucket = ({ label, content, onDrop }) => {
    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e.dataTransfer.getData("text"))}
            className={`flex-1 h-32 rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-300
                ${content ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'border-white/10 bg-white/5'}
            `}
        >
            <div className="text-3xl font-black font-orbitron text-white/5 absolute top-2 left-4">{label}</div>
            {content && (
                <div className="text-[10px] font-black font-orbitron text-cyan-400 text-center px-2 animate-in fade-in zoom-in duration-300">
                    {content}
                </div>
            )}
        </div>
    );
};

// ----------------------------------------------------------------------------
// 3. MSA GAME (THE TRUST)
// ----------------------------------------------------------------------------

const MsaGame = ({ round, setRound, setScore, setIsComplete }) => {
    const scenarios = [
        { scenario: "Coffee Bean Weight", target: "18.0g" },
        { scenario: "Steel Bolt Diameter", target: "10.0mm" },
        { scenario: "Syringe Dosage", target: "5.0ml" },
        { scenario: "Wafer Thickness", target: "0.2mm" },
        { scenario: "Fuel Pressure", target: "42 PSI" }
    ];

    const [variation, setVariation] = useState(50);
    const [wobble, setWobble] = useState({ x: 0, y: 0 });
    const currentScenario = scenarios[round - 1];

    useEffect(() => {
        const interval = setInterval(() => {
            setWobble({
                x: (Math.random() - 0.5) * variation,
                y: (Math.random() - 0.5) * variation
            });
        }, 50);
        return () => clearInterval(interval);
    }, [variation]);

    const handleCalibrate = (val) => {
        setVariation(50 - (val / 2));
        if (val >= 98) {
            setScore(s => s + 30);
            if (round < 5) {
                setTimeout(() => {
                    setRound(r => r + 1);
                    setVariation(50);
                }, 1000);
            } else {
                setIsComplete(true);
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="text-center font-black font-orbitron text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-8">
                SCENARIO: {currentScenario.scenario}
            </div>

            <div className="w-64 h-64 rounded-full border-4 border-white/10 relative overflow-hidden bg-radial-at-center from-cyan-950/20 to-black shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-full h-px bg-red-500/50" />
                    <div className="h-full w-px bg-red-500/50 absolute" />
                </div>

                <motion.div
                    animate={{
                        x: wobble.x,
                        y: wobble.y
                    }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    className="w-4 h-4 rounded-full bg-cyan-400 absolute top-1/2 left-1/2 -ml-2 -mt-2 shadow-[0_0_20px_#22d3ee]"
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
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    onChange={(e) => handleCalibrate(parseInt(e.target.value))}
                />
                <div className="text-center italic text-slate-600 text-[10px] font-orbitron font-bold tracking-tighter uppercase pt-2">
                    {variation > 5 ? 'System Unstable: Calibration Required' : 'System Stable: Gage R&R Verified'}
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------------
// 4. CAPABILITY GAME (THE DOCKING SEQUENCE)
// ----------------------------------------------------------------------------

const CapabilityGame = ({ round, setRound, setScore, setIsComplete }) => {
    const scenarios = [
        { name: "The Garage", usl: 130, lsl: 20 },
        { name: "MRI Window", usl: 140, lsl: 10 },
        { name: "The Commute", usl: 120, lsl: 30 },
        { name: "Cargo Container", usl: 110, lsl: 40 },
        { name: "Alpha Gate", usl: 105, lsl: 45 }
    ];

    const scenario = scenarios[round - 1];
    const [precision, setPrecision] = useState(25);
    const [steering, setSteering] = useState(80);

    const usl = scenario.usl;
    const lsl = scenario.lsl;
    const cp = (usl - lsl) / (6 * precision);
    const cpu = (usl - steering) / (3 * precision);
    const cpl = (steering - lsl) / (3 * precision);
    const cpk = Math.max(0, Math.min(cpu, cpl));

    const handleDock = () => {
        if (cpk >= 1.33) {
            setScore(s => s + 100);
            if (round < 5) {
                setRound(r => r + 1);
            } else {
                setIsComplete(true);
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="text-center font-black font-orbitron text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-8">
                MISSION: {scenario.name}
            </div>

            <div className="relative w-full max-w-2xl h-64 bg-slate-950/50 rounded-3xl border border-white/5 overflow-hidden">
                {/* Specs */}
                <div className="absolute top-4 right-10 text-[10px] font-black font-orbitron text-orange-500 uppercase tracking-widest">USL: {usl}</div>
                <div className="absolute bottom-4 right-10 text-[10px] font-black font-orbitron text-orange-500 uppercase tracking-widest">LSL: {lsl}</div>

                {/* Tunnel */}
                <div
                    style={{ height: (usl - lsl) * 1.5, top: '50%', transform: 'translateY(-50%)' }}
                    className="absolute left-0 right-0 border-y-2 border-slate-700 bg-slate-800/20"
                />

                {/* Drone / Bell Curve */}
                <motion.div
                    animate={{ x: (steering - 80) * 2.5 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40"
                    style={{ width: (6 * precision) * 2.5 }}
                >
                    <svg className="w-full h-full" preserveAspectRatio="none">
                        <path
                            d={`M 0,160 Q ${(3 * precision * 2.5)},0 ${(6 * precision * 2.5)},160`}
                            fill="rgba(34, 211, 238, 0.2)"
                            stroke="#22d3ee"
                            strokeWidth="2"
                        />
                    </svg>
                </motion.div>
            </div>

            <div className="flex gap-10 w-full max-w-2xl mt-8">
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex-1 text-center">
                    <div className="text-[9px] font-black text-slate-500 font-orbitron mb-1 uppercase tracking-widest">Cp (Potential)</div>
                    <div className="text-xl font-black text-white font-orbitron tracking-tight">{cp.toFixed(2)}</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex-1 text-center">
                    <div className="text-[9px] font-black text-slate-500 font-orbitron mb-1 uppercase tracking-widest">Cpk (Reality)</div>
                    <div className={`text-xl font-black font-orbitron tracking-tight ${cpk >= 1.33 ? 'text-green-500' : 'text-red-500'}`}>{cpk.toFixed(2)}</div>
                </div>
            </div>

            <div className="w-full max-w-md mt-10 space-y-8">
                <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black font-orbitron text-slate-500 uppercase tracking-widest">
                        <span>Precision (Variation)</span>
                        <span className="text-cyan-400">±3 Sigma</span>
                    </div>
                    <input type="range" min="5" max="40" step="0.5" value={precision} onChange={(e) => setPrecision(parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black font-orbitron text-slate-500 uppercase tracking-widest">
                        <span>Steering (Center)</span>
                        <span className="text-cyan-400">Process Mean</span>
                    </div>
                    <input type="range" min="0" max="160" step="1" value={steering} onChange={(e) => setSteering(parseInt(e.target.value))} className="w-full accent-cyan-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>

            <button
                onClick={handleDock}
                className={`mt-12 px-16 py-4 rounded-xl font-black font-orbitron text-[11px] tracking-[0.2em] transition-all uppercase
                    ${cpk >= 1.33 ? 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
                `}
            >
                Initiate Docking Sequence
            </button>
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
        } else {
            setScore(s => Math.max(0, s - 10));
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

const FishboneGame = ({ round, setRound, setScore, setIsComplete }) => {
    const clues = [
        { t: "Barista didn't sleep", c: "MAN" },
        { t: "Oven thermostat is broken", c: "MACHINE" },
        { t: "Coffee beans were expired", c: "MATERIAL" },
        { t: "Brewing time exceeds 10 mins", c: "METHOD" }
    ];

    const currentClue = clues[round - 1];

    const handleCategory = (cat) => {
        if (cat === currentClue.c) {
            setScore(s => s + 25);
            if (round < 4) {
                setRound(r => r + 1);
            } else {
                setIsComplete(true);
            }
        } else {
            setScore(s => Math.max(0, s - 10));
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="bg-pink-500/5 border-2 border-pink-500/30 p-12 rounded-[2.5rem] w-full max-w-lg text-center mb-12 shadow-[0_0_50px_rgba(236,72,153,0.1)]">
                <div className="text-[10px] font-black font-orbitron text-pink-500 uppercase tracking-[0.3em] mb-3">Detective Evidence</div>
                <div className="text-2xl font-black font-orbitron text-white uppercase tracking-wider">{currentClue.t}</div>
            </div>

            <div className="grid grid-cols-2 gap-5 w-full max-w-lg">
                {[
                    { label: 'Personnel', cat: 'MAN' },
                    { label: 'Equipment', cat: 'MACHINE' },
                    { label: 'Supplies', cat: 'MATERIAL' },
                    { label: 'Process', cat: 'METHOD' }
                ].map(opt => (
                    <button
                        key={opt.cat}
                        onClick={() => handleCategory(opt.cat)}
                        className="bg-slate-900 border border-white/5 p-8 rounded-2xl font-black font-orbitron text-[10px] tracking-[0.2em] text-slate-500 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all uppercase"
                    >
                        {opt.label} ({opt.cat})
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ArmoryMission;
