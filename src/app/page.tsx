"use client";

import React, { useMemo, useState } from "react";

// --- Simple data model -------------------------------------------------------
export type Alignment = "hero" | "gray" | "villain";

export type Fighter = {
    id: string; // lowercase unique
    name: string; // 3-5 chars shown in grid
    fullName?: string; // optional extended name
    alignment: Alignment;
    role: string;
    specialMove: string;
    quote: string;
    img: string; // URL or /public path
};

const FIGHTERS: Fighter[] = [
    // Top row
    {
        id: "gord",
        name: "Gord",
        fullName: "Gordafarid – Cluster Sentinel",
        alignment: "hero",
        role: "Cluster Sentinel",
        specialMove: "kubectl smite – wipes malware pods in one strike",
        quote: "You shall not pass the API gateway.",
        img: "/fighters/gord.png",
    },
    {
        id: "sima",
        name: "Sima",
        alignment: "hero",
        role: "Pixel Protector",
        specialMove: "Design Shield – perfect alignment deflects exploits",
        quote: "Symmetry is security.",
        img: "/fighters/sima.png",
    },
    {
        id: "ogre",
        name: "Ogre",
        fullName: "Ogre – The Yoda Coder",
        alignment: "gray",
        role: "The Yoda Coder",
        specialMove: "PR Pushback – rejects evil commits",
        quote: "Merge, I might… or might not.",
        img: "/fighters/ogre.png",
    },
    {
        id: "cve",
        name: "CVE",
        alignment: "villain",
        role: "Shadow Hacker Ninja",
        specialMove: "Zero-Day Strike – breaches before the patch is out",
        quote: "You can’t patch what you can’t see.",
        img: "/fighters/CVE.png",
    },
    // Middle row
    {
        id: "ash",
        name: "Ash",
        alignment: "gray",
        role: "The Data Veil",
        specialMove: "Encrypted Mirage – hides anything, friend or foe",
        quote: "Visibility is optional.",
        img: "/fighters/ash.png",
    },
    {
        id: "harp",
        name: "Harp",
        alignment: "hero",
        role: "Runtime Defender",
        specialMove: "Audit Log Slam – crushes foes with forensic proof",
        quote: "Every syscall leaves a trail.",
        img: "/fighters/harp.png",
    },
    {
        id: "zoe",
        name: "Zoe",
        alignment: "hero",
        role: "Code Refiner",
        specialMove: "Lint Storm – forces enemies to refactor before attacking",
        quote: "Format this!",
        img: "/fighters/zoe.png",
    },
    {
        id: "jack",
        name: "Jack",
        alignment: "villain",
        role: "Bitcoin Miner Cowboy",
        specialMove: "Hash Lasso – hijacks CPU for mining",
        quote: "Your cluster pays my rent now.",
        img: "/fighters/jack.png",
    },
    // Bottom row
    {
        id: "hamida",
        name: "Hamida",
        alignment: "hero",
        role: "eBPF Guardian",
        specialMove: "Probe Barrage – intercepts every malicious syscall",
        quote: "Try that again, I dare you.",
        img: "/fighters/hamida.png",
    },
    {
        id: "mo",
        name: "Mo",
        alignment: "gray",
        role: "Git Sorcerer",
        specialMove: "Rebase of Doom – erases entire commit histories",
        quote: "History bends to my will.",
        img: "/fighters/mo.png",
    },
    {
        id: "valdo",
        name: "Valdo",
        alignment: "hero",
        role: "Image Builder",
        specialMove: "Multi-Stage Mayhem – builds up, tears down, repeats",
        quote: "My builds never fail… except for you.",
        img: "/fighters/valdo.png",
    },
    {
        id: "kingj",
        name: "King J",
        alignment: "hero",
        role: "Pipeline Enforcer",
        specialMove: "CI/CD Guillotine – stops malicious deploys mid-pipeline",
        quote: "No merge for you.",
        img: "/fighters/kingj.png",
    },
];

// --- UI helpers --------------------------------------------------------------
const alignmentClasses: Record<Alignment, string> = {
    hero: "ring-2 ring-blue-400/60",
    gray: "ring-2 ring-yellow-400/60",
    villain: "ring-2 ring-red-500/60",
};

function useRandomOpponent(excludeId?: string) {
    return useMemo(() => {
        const pool = FIGHTERS.filter((f) => f.id !== excludeId);
        return () => pool[Math.floor(Math.random() * pool.length)];
    }, [excludeId]);
}

// --- Components --------------------------------------------------------------
function FighterCard({ f, onSelect }: { f: Fighter; onSelect: (f: Fighter) => void }) {
    return (
        <button
            onClick={() => onSelect(f)}
            className={`group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900/40 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-2xl ${alignmentClasses[f.alignment]}`}
        >
            <img
                src={f.img}
                alt={f.name}
                className="absolute inset-0 h-full w-full object-cover object-center transition group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-center text-sm font-semibold tracking-wide uppercase text-white">
                {f.name}
            </div>
        </button>
    );
}

function BioModal({
                      chosen,
                      vs,
                      onClose,
                  }: {
    chosen: Fighter;
    vs: Fighter;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4">
            {/* VS banner */}
            <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <img src={chosen.img} alt={chosen.name} className="h-20 w-16 rounded-lg object-cover" />
                    <span className="text-xl font-extrabold text-white">{chosen.name}</span>
                </div>
                <span className="px-3 py-1 text-2xl font-black text-white">VS</span>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-white">{vs.name}</span>
                    <img src={vs.img} alt={vs.name} className="h-20 w-16 rounded-lg object-cover" />
                </div>
            </div>

            {/* Bio card */}
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-neutral-900 text-neutral-100 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
                    <img src={chosen.img} alt={chosen.name} className="h-56 w-full object-cover md:h-full" />
                    <div className="space-y-2 p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black tracking-tight">{chosen.fullName ?? chosen.name}</h2>
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                    chosen.alignment === "hero"
                                        ? "bg-blue-500/20 text-blue-300"
                                        : chosen.alignment === "villain"
                                            ? "bg-red-500/20 text-red-300"
                                            : "bg-yellow-500/20 text-yellow-300"
                                }`}
                            >
                {chosen.alignment}
              </span>
                        </div>
                        <p className="text-sm opacity-90">{chosen.role}</p>
                        <p className="text-sm"><span className="font-semibold">Special:</span> {chosen.specialMove}</p>
                        <p className="italic text-neutral-300">“{chosen.quote}”</p>
                        <div className="pt-2">
                            <a
                                href="https://DockerSecurity.io"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
                            >
                                Read more in the book
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-white/10 p-3">
                    <button onClick={onClose} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Main exported component -------------------------------------------------
export default function FighterSelect() {
    const [chosen, setChosen] = useState<Fighter | null>(null);
    const pickOpponent = useRandomOpponent(chosen?.id);
    const [opponent, setOpponent] = useState<Fighter | null>(null);

    function onSelect(f: Fighter) {
        setChosen(f);
        setOpponent(pickOpponent());
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#0a58ff] to-[#0052cc] p-4 text-white">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-black tracking-[0.2em]">CHOOSE YOUR FIGHTER</h1>
                    <div className="text-xs opacity-80">v0.8.0 · DockerSecurity.io</div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {FIGHTERS.map((f) => (
                        <FighterCard key={f.id} f={f} onSelect={onSelect} />
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-400" /> Hero</span>
                    <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-yellow-400" /> Gray</span>
                    <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" /> Villain</span>
                </div>
            </div>

            {chosen && opponent && (
                <BioModal chosen={chosen} vs={opponent} onClose={() => { setChosen(null); setOpponent(null); }} />
            )}
        </div>
    );
}
