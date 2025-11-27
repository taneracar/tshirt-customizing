"use client";

import { useEffect, useRef, useState } from "react";

export default function DesignerV7() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);

  const [shirtColor, setShirtColor] = useState("#dbe6f1"); // gerçekçi gömlek tonlarından biri

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 450;
    canvas.height = 550;

    // Kumaş dokusu için küçük pattern canvas
    const createFabricPattern = () => {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = 20;
      patternCanvas.height = 20;
      const pCtx = patternCanvas.getContext("2d")!;
      pCtx.fillStyle = "rgba(255,255,255,0.05)";
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * 20;
        const y = Math.random() * 20;
        const size = Math.random() * 2;
        pCtx.fillRect(x, y, size, size);
      }
      return ctx.createPattern(patternCanvas, "repeat")!;
    };

    const fabricPattern = createFabricPattern();
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ===== GÖVDE =====
      const bodyGrad = ctx.createLinearGradient(0, 100, 0, 500);
      bodyGrad.addColorStop(0, shirtColor);
      bodyGrad.addColorStop(1, "#cfdde9"); // alt kısım hafif gölge
      ctx.fillStyle = bodyGrad;

      ctx.beginPath();
      const foldOffset = Math.sin(time / 50) * 3; // hafif kıvrım animasyonu
      ctx.moveTo(120, 120);
      ctx.bezierCurveTo(150 + foldOffset, 90, 300 - foldOffset, 90, 330, 120);
      ctx.lineTo(360, 500);
      ctx.bezierCurveTo(230, 520, 120, 520, 90, 500);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#999";
      ctx.lineWidth = 2;
      ctx.stroke();

      // ===== KUMAŞ DOKUSU =====
      ctx.fillStyle = fabricPattern;
      ctx.fill();

      // ===== YAKA =====
      ctx.fillStyle = shirtColor;
      ctx.beginPath();
      ctx.moveTo(130, 120);
      ctx.lineTo(220, 80);
      ctx.lineTo(310, 120);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // ===== KOLLAR =====
      ctx.beginPath();
      ctx.moveTo(30, 120);
      ctx.lineTo(80, 450);
      ctx.lineTo(110, 450);
      ctx.lineTo(130, 120);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(320, 120);
      ctx.lineTo(300, 450);
      ctx.lineTo(330, 450);
      ctx.lineTo(360, 120);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // ===== BUTON PLACKET =====
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(210, 120, 40, 380);
      ctx.strokeRect(210, 120, 40, 380);

      // ===== BUTONLAR =====
      ctx.fillStyle = "#888";
      for (let y = 140; y < 500; y += 50) {
        ctx.beginPath();
        ctx.arc(230, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      time += 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationRef.current);
  }, [shirtColor]);

  return (
    <div className="w-full h-screen flex items-start justify-center gap-10 p-10 bg-gray-200">
      {/* LEFT: Canvas */}
      <div className="border bg-white p-4 shadow-lg rounded-lg">
        <canvas ref={canvasRef}></canvas>
      </div>

      {/* RIGHT: Kontrol Paneli */}
      <div className="w-[350px] bg-white p-6 rounded-xl shadow-xl space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Customize Your Shirt</h2>

        <div>
          <p className="font-medium mb-1">Shirt Color</p>
          <input
            type="color"
            value={shirtColor}
            className="w-16 h-10 cursor-pointer"
            onChange={(e) => setShirtColor(e.target.value)}
          />
        </div>

        <p className="text-gray-500 text-sm mt-2">
          Realistic fabric texture and fold animation included.
        </p>
      </div>
    </div>
  );
}
