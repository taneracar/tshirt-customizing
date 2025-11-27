"use client";

import { useEffect, useRef, useState } from "react";

export default function RealisticShirtDesigner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [colors, setColors] = useState({
    shirt: "#e5e5e5",
    collar: "#ffffff",
    placket: "#ffffff",
    cuff: "#ffffff",
  });

  const random = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ===== SHIRT BODY SHAPE =====
    const gradient = ctx.createLinearGradient(150, 0, 350, 600);
    gradient.addColorStop(0, colors.shirt);
    gradient.addColorStop(1, "#d0d0d0");

    ctx.fillStyle = gradient;
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(180, 100);
    ctx.quadraticCurveTo(250, 60, 320, 100); // shoulders
    ctx.lineTo(350, 450); // right side
    ctx.quadraticCurveTo(250, 480, 150, 450); // bottom curve
    ctx.lineTo(180, 100);
    ctx.fill();
    ctx.stroke();

    // ===== SLEEVES =====
    ctx.fillStyle = colors.shirt;
    ctx.strokeStyle = "#777";

    // Left sleeve
    ctx.beginPath();
    ctx.moveTo(180, 120);
    ctx.lineTo(110, 200);
    ctx.lineTo(130, 330);
    ctx.lineTo(180, 300);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right sleeve
    ctx.beginPath();
    ctx.moveTo(320, 120);
    ctx.lineTo(390, 200);
    ctx.lineTo(370, 330);
    ctx.lineTo(320, 300);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // ===== COLLAR =====
    ctx.fillStyle = colors.collar;
    ctx.beginPath();
    ctx.moveTo(210, 100);
    ctx.lineTo(290, 100);
    ctx.lineTo(260, 150);
    ctx.lineTo(240, 150);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // ===== PLACKET =====
    ctx.fillStyle = colors.placket;
    ctx.fillRect(248, 150, 14, 280);

    // Dikiş çizgileri
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(253, 150);
    ctx.lineTo(253, 430);
    ctx.moveTo(257, 150);
    ctx.lineTo(257, 430);
    ctx.stroke();

    // Düğmeler
    ctx.fillStyle = "#ccc";
    for (let y = 180; y <= 400; y += 50) {
      ctx.beginPath();
      ctx.arc(255, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // ===== CUFFS =====
    ctx.fillStyle = colors.cuff;

    // left cuff
    ctx.fillRect(115, 320, 45, 38);
    ctx.strokeRect(115, 320, 45, 38);

    // right cuff
    ctx.fillRect(340, 320, 45, 38);
    ctx.strokeRect(340, 320, 45, 38);

    // Stitch inside cuffs
    ctx.strokeStyle = "#bbb";
    ctx.strokeRect(120, 325, 35, 28);
    ctx.strokeRect(345, 325, 35, 28);
  }, [colors]);

  return (
    <div className="relative w-[500px] mx-auto mt-12 h-fit">

      <canvas
        ref={canvasRef}
        width={500}
        height={600}
        className="border shadow-lg rounded bg-white"
      />

      {/* HOTSPOTS */}
      <div className="absolute top-0 left-0 w-full h-full">

        {/* Collar */}
        <div
          onClick={() => setColors(c => ({ ...c, collar: random() }))}
          className="absolute top-[90px] left-[200px] w-[110px] h-[70px] cursor-pointer"
        />

        {/* Placket */}
        <div
          onClick={() => setColors(c => ({ ...c, placket: random() }))}
          className="absolute top-[150px] left-[240px] w-[40px] h-[290px] cursor-pointer"
        />

        {/* Cuffs */}
        <div
          onClick={() => setColors(c => ({ ...c, cuff: random() }))}
          className="absolute top-[320px] left-[100px] w-[80px] h-[60px] cursor-pointer"
        />
        <div
          onClick={() => setColors(c => ({ ...c, cuff: random() }))}
          className="absolute top-[320px] left-[330px] w-[80px] h-[60px] cursor-pointer"
        />
      </div>
    </div>
  );
}
