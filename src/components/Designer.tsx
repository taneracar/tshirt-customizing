"use client";

import { useEffect, useRef, useState } from "react";

export default function FakeShirtDesigner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [colors, setColors] = useState({
    collar: "#ff4444",
    cuff: "#448aff",
    placket: "#4caf50",
    shirt: "#e0e0e0",
  });

  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // === BASE SHIRT ===
    ctx.fillStyle = colors.shirt;
    ctx.fillRect(120, 100, 260, 350); // body
    ctx.fillRect(80, 120, 40, 250);   // left sleeve
    ctx.fillRect(380, 120, 40, 250);  // right sleeve

    // === COLLAR ===
    ctx.fillStyle = colors.collar;
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(300, 100);
    ctx.lineTo(250, 150);
    ctx.closePath();
    ctx.fill();

    // === PLACKET ===
    ctx.fillStyle = colors.placket;
    ctx.fillRect(245, 150, 10, 300);

    // === CUFFS ===
    ctx.fillStyle = colors.cuff;
    ctx.fillRect(70, 330, 50, 40);  // left cuff
    ctx.fillRect(380, 330, 50, 40); // right cuff
  }, [colors]);

  return (
    <div className="relative w-[500px] mx-auto mt-10">

      <canvas
        ref={canvasRef}
        width={500}
        height={600}
        className="border shadow-md rounded-md bg-white"
      />

      {/* HOTSPOTS */}
      <div className="absolute top-0 left-0 w-full h-full">

        {/* COLLAR */}
        <div
          onClick={() => setColors(c => ({ ...c, collar: randomColor() }))}
          className="absolute top-[90px] left-[190px] w-[120px] h-[70px] cursor-pointer bg-red-300/10"
        />

        {/* PLACKET */}
        <div
          onClick={() => setColors(c => ({ ...c, placket: randomColor() }))}
          className="absolute top-[150px] left-[240px] w-[30px] h-[300px] cursor-pointer bg-green-300/10"
        />

        {/* LEFT CUFF */}
        <div
          onClick={() => setColors(c => ({ ...c, cuff: randomColor() }))}
          className="absolute top-[330px] left-[60px] w-[70px] h-[60px] cursor-pointer bg-blue-300/10"
        />

        {/* RIGHT Cuff */}
        <div
          onClick={() => setColors(c => ({ ...c, cuff: randomColor() }))}
          className="absolute top-[330px] left-[380px] w-[70px] h-[60px] cursor-pointer bg-blue-300/10"
        />
      </div>
    </div>
  );
}
