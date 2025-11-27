"use client";

import { useState } from "react";

// Tipler
type CollarType = "classic" | "buttoned" | "v-neck";
type SleeveType = "short" | "long" | "rolled";
type PocketType = "none" | "single" | "double";
type ButtonType = "standard" | "hidden" | "contrast";

export default function DesignerV6() {
  // ===== STATE =====
  const [shirtColor, setShirtColor] = useState("#e5e5e5");
  const [collarType, setCollarType] = useState<CollarType>("classic");
  const [sleeveType, setSleeveType] = useState<SleeveType>("long");
  const [pocketType, setPocketType] = useState<PocketType>("none");
  const [buttonType, setButtonType] = useState<ButtonType>("standard");

  return (
    <div className="w-full h-screen flex bg-gray-100 p-10 gap-10 text-black">
      <div className="flex-1 flex items-center justify-center">
        <svg
          width={350}
          height={500}
          viewBox="0 0 350 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* GÖVDE */}
          <path
            d="M70,50 L280,50 L320,450 L30,450 Z"
            fill={shirtColor}
            stroke="#999"
            strokeWidth={2}
          />

          {/* COLLAR */}
          {collarType === "classic" && (
            <path d="M90,50 L175,10 L260,50 Z" fill={shirtColor} stroke="#999" strokeWidth={2} />
          )}
          {collarType === "buttoned" && (
            <path d="M90,50 L175,20 L260,50 Z" fill={shirtColor} stroke="#999" strokeWidth={2} />
          )}
          {collarType === "v-neck" && (
            <path d="M90,50 L175,40 L260,50 Z" fill={shirtColor} stroke="#999" strokeWidth={2} />
          )}

          {/* SLEEVES */}
          {sleeveType === "short" && (
            <>
              <rect x={30} y={50} width={50} height={100} fill={shirtColor} stroke="#999" strokeWidth={2} />
              <rect x={270} y={50} width={50} height={100} fill={shirtColor} stroke="#999" strokeWidth={2} />
            </>
          )}
          {sleeveType === "long" && (
            <>
              <rect x={30} y={50} width={50} height={150} fill={shirtColor} stroke="#999" strokeWidth={2} />
              <rect x={270} y={50} width={50} height={150} fill={shirtColor} stroke="#999" strokeWidth={2} />
            </>
          )}
          {sleeveType === "rolled" && (
            <>
              <rect x={30} y={50} width={50} height={120} fill={shirtColor} stroke="#999" strokeWidth={2} />
              <rect x={270} y={50} width={50} height={120} fill={shirtColor} stroke="#999" strokeWidth={2} />
            </>
          )}

          {/* POCKETS */}
          {pocketType === "single" && <rect x={80} y={200} width={50} height={50} fill={shirtColor} stroke="#666" strokeWidth={1} />}
          {pocketType === "double" && (
            <>
              <rect x={60} y={200} width={50} height={50} fill={shirtColor} stroke="#666" strokeWidth={1} />
              <rect x={180} y={200} width={50} height={50} fill={shirtColor} stroke="#666" strokeWidth={1} />
            </>
          )}

          {/* BUTTONS */}
          {buttonType === "standard" &&
            Array.from({ length: 6 }).map((_, i) => (
              <circle key={i} cx={175} cy={90 + i * 50} r={5} fill="#888" stroke="#555" strokeWidth={1} />
            ))}
          {buttonType === "contrast" &&
            Array.from({ length: 6 }).map((_, i) => (
              <circle key={i} cx={175} cy={90 + i * 50} r={5} fill="#4444ff" stroke="#2222aa" strokeWidth={1} />
            ))}
          {/* hidden buttonType = hiçbir şey */}
        </svg>
      </div>

      {/* RIGHT: CONTROL PANEL */}
      <div className="w-[350px] bg-white p-6 rounded-xl shadow-xl space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Customize Your Shirt</h2>

        {/* RENK */}
        <div>
          <p className="font-medium mb-1">Shirt Color</p>
          <input
            type="color"
            value={shirtColor}
            className="w-16 h-10 cursor-pointer"
            onChange={(e) => setShirtColor(e.target.value)}
          />
        </div>

        {/* YAKA */}
        <div>
          <p className="font-medium mb-1">Collar Type</p>
          <select
            className="w-full border rounded p-2"
            value={collarType}
            onChange={(e) => setCollarType(e.target.value as CollarType)}
          >
            <option value="classic">Classic</option>
            <option value="buttoned">Buttoned</option>
            <option value="v-neck">V-Neck</option>
          </select>
        </div>

        {/* KOL */}
        <div>
          <p className="font-medium mb-1">Sleeve Type</p>
          <select
            className="w-full border rounded p-2"
            value={sleeveType}
            onChange={(e) => setSleeveType(e.target.value as SleeveType)}
          >
            <option value="short">Short</option>
            <option value="long">Long</option>
            <option value="rolled">Rolled</option>
          </select>
        </div>

        {/* CEPLER */}
        <div>
          <p className="font-medium mb-1">Pocket Type</p>
          <select
            className="w-full border rounded p-2"
            value={pocketType}
            onChange={(e) => setPocketType(e.target.value as PocketType)}
          >
            <option value="none">None</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
          </select>
        </div>

        {/* BUTON */}
        <div>
          <p className="font-medium mb-1">Button Type</p>
          <select
            className="w-full border rounded p-2"
            value={buttonType}
            onChange={(e) => setButtonType(e.target.value as ButtonType)}
          >
            <option value="standard">Standard</option>
            <option value="hidden">Hidden</option>
            <option value="contrast">Contrast</option>
          </select>
        </div>
      </div>
    </div>
  );
}
