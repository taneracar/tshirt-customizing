"use client";
import { useEffect, useRef, useState } from "react";

export default function RealisticShirtDesigner3() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [colors, setColors] = useState({
    shirt: "#f5f5f5",
    collar: "#ffffff",
    placket: "#ffffff",
    cuff: "#ffffff",
  });

const random = () =>
  "#" + Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ===== GLOBAL SHADOWS =====
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 15;

    // ===== FABRIC GRADIENT =====
    const shirtGrad = ctx.createLinearGradient(0, 0, 0, 600);
    shirtGrad.addColorStop(0, colors.shirt);
    shirtGrad.addColorStop(1, "#d9d9d9");

    ctx.fillStyle = shirtGrad;
    ctx.strokeStyle = "#cfcfcf";
    ctx.lineWidth = 2;

    // ===== SHIRT BODY =====
    ctx.beginPath();
    ctx.moveTo(170, 120);
    ctx.quadraticCurveTo(250, 40, 330, 120);
    ctx.lineTo(360, 480);
    ctx.quadraticCurveTo(250, 520, 140, 480);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Turn off big shadow for inner shapes
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // ===== FABRIC TEXTURE (Light Noise Lines) =====
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.moveTo(140, 120 + i * 5);
      ctx.lineTo(360, 120 + i * 5);
      ctx.stroke();
    }

    // ===== SLEEVES =====
    ctx.fillStyle = colors.shirt;
    ctx.strokeStyle = "#cfcfcf";

    // Left sleeve
    ctx.beginPath();
    ctx.moveTo(170, 150);
    ctx.quadraticCurveTo(100, 240, 140, 350);
    ctx.lineTo(170, 320);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right sleeve
    ctx.beginPath();
    ctx.moveTo(330, 150);
    ctx.quadraticCurveTo(400, 240, 360, 350);
    ctx.lineTo(330, 320);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // ===== COLLAR (More realistic) =====
    const collarGrad = ctx.createLinearGradient(200, 100, 300, 150);
    collarGrad.addColorStop(0, colors.collar);
    collarGrad.addColorStop(1, "#e6e6e6");

    ctx.fillStyle = collarGrad;
    ctx.strokeStyle = "#cfcfcf";

    ctx.beginPath();
    ctx.moveTo(205, 120);
    ctx.lineTo(295, 120);
    ctx.lineTo(265, 160);
    ctx.lineTo(235, 160);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inner collar line
    ctx.strokeStyle = "#ddd";
    ctx.beginPath();
    ctx.moveTo(230, 140);
    ctx.lineTo(270, 140);
    ctx.stroke();

    // ===== PLACKET =====
    const placketGrad = ctx.createLinearGradient(255, 150, 255, 430);
    placketGrad.addColorStop(0, colors.placket);
    placketGrad.addColorStop(1, "#e5e5e5");

    ctx.fillStyle = placketGrad;
    ctx.fillRect(245, 160, 20, 270);
    ctx.strokeRect(245, 160, 20, 270);

    // Button line shadows
    ctx.strokeStyle = "#bdbdbd";
    ctx.beginPath();
    ctx.moveTo(250, 160);
    ctx.lineTo(250, 430);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(260, 160);
    ctx.lineTo(260, 430);
    ctx.stroke();

    // Buttons
    ctx.fillStyle = "#eeeeee";
    for (let y = 200; y <= 400; y += 50) {
      ctx.beginPath();
      ctx.arc(255, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // ===== CUFFS =====
    const cuffGrad = ctx.createLinearGradient(0, 0, 80, 0);
    cuffGrad.addColorStop(0, colors.cuff);
    cuffGrad.addColorStop(1, "#e3e3e3");

    ctx.fillStyle = cuffGrad;
    ctx.strokeStyle = "#ccc";

    // Left cuff
    ctx.fillRect(130, 320, 55, 45);
    ctx.strokeRect(130, 320, 55, 45);

    // Right cuff
    ctx.fillRect(315, 320, 55, 45);
    ctx.strokeRect(315, 320, 55, 45);
  }, [colors]);

  return (
    <div className="relative w-[500px] mx-auto mt-10">
      <canvas
        ref={canvasRef}
        width={500}
        height={600}
        className="border shadow-xl rounded bg-white"
      />

      {/* HOTSPOTS */}
      <div className="absolute top-0 left-0 w-full h-full">

        {/* COLLAR */}
        <div
          onClick={() => setColors(c => ({ ...c, collar: random() }))}
          className="absolute top-[110px] left-[200px] w-[120px] h-[60px] cursor-pointer"
        />

        {/* PLACKET */}
        <div
          onClick={() => setColors(c => ({ ...c, placket: random() }))}
          className="absolute top-[160px] left-[240px] w-[40px] h-[260px] cursor-pointer"
        />

        {/* CUFFS */}
        <div
          onClick={() => setColors(c => ({ ...c, cuff: random() }))}
          className="absolute top-[310px] left-[120px] w-[80px] h-[70px] cursor-pointer"
        />
        <div
          onClick={() => setColors(c => ({ ...c, cuff: random() }))}
          className="absolute top-[310px] left-[300px] w-[80px] h-[70px] cursor-pointer"
        />
      </div>
    </div>
  );
}
