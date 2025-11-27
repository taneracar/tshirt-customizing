"use client";

import { useEffect, useRef, useState } from "react";

type ColorPart = "shirt" | "collar" | "placket" | "cuff";

export default function DesignerV5RealisticTexture() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);

  const [colors, setColors] = useState<Record<ColorPart, string>>({
    shirt: "#e5e5e5",
    collar: "#ffffff",
    placket: "#ffffff",
    cuff: "#ffffff",
  });

  const handleColorChange = (part: ColorPart, color: string) => {
    setColors((prev) => ({ ...prev, [part]: color }));
  };

  // ===== KUMAŞ DOKUSU OLUŞTUR =====
  const createFabricPattern = (ctx: CanvasRenderingContext2D) => {
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 20;
    patternCanvas.height = 20;
    const pCtx = patternCanvas.getContext("2d")!;
    pCtx.fillStyle = "rgba(255,255,255,0.05)";
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 20;
      const y = Math.random() * 20;
      const size = Math.random() * 2;
      pCtx.fillRect(x, y, size, size);
    }
    return ctx.createPattern(patternCanvas, "repeat")!;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 450;
    canvas.height = 550;

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ===== BACKGROUND =====
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== SHIRT BODY =====
      const bodyGrad = ctx.createLinearGradient(0, 100, 0, 500);
      bodyGrad.addColorStop(0, colors.shirt);
      bodyGrad.addColorStop(1, "#d0d0d0");
      ctx.fillStyle = bodyGrad;

      ctx.beginPath();
      ctx.moveTo(120, 120);
      // Hafif dalgalı kıvrım animasyonu
      const fold = Math.sin(time / 50) * 5;
      ctx.bezierCurveTo(150 + fold, 90, 300 - fold, 90, 330, 120);
      ctx.lineTo(360, 500);
      ctx.bezierCurveTo(230, 520, 120, 520, 90, 500);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#999";
      ctx.lineWidth = 2;
      ctx.stroke();

      // ===== FABRIC TEXTURE =====
      ctx.fillStyle = createFabricPattern(ctx);
      ctx.fill();

      // ===== COLLAR =====
      ctx.fillStyle = colors.collar;
      ctx.beginPath();
      ctx.moveTo(130, 120);
      ctx.lineTo(220, 80);
      ctx.lineTo(310, 120);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // ===== PLACKET =====
      ctx.fillStyle = colors.placket;
      ctx.fillRect(210, 120, 40, 380);
      ctx.strokeRect(210, 120, 40, 380);

      // ===== CUFFS =====
      ctx.fillStyle = colors.cuff;
      ctx.fillRect(60, 450, 80, 50);
      ctx.fillRect(310, 450, 80, 50);
      ctx.strokeRect(60, 450, 80, 50);
      ctx.strokeRect(310, 450, 80, 50);

      // ===== Dikiş Detayları =====
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(120, 120);
      ctx.lineTo(90, 500);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(330, 120);
      ctx.lineTo(360, 500);
      ctx.stroke();

      // Placket dikiş
      ctx.beginPath();
      for (let y = 150; y < 500; y += 30) {
        ctx.moveTo(210, y);
        ctx.lineTo(250, y);
      }
      ctx.stroke();

      // ===== BUTTONS =====
      ctx.fillStyle = "#888";
      for (let y = 140; y < 500; y += 40) {
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
  }, [colors]);

  return (
    <div className="w-full h-screen flex items-start justify-center gap-10 p-10 bg-black">
      {/* LEFT — Canvas */}
      <div className="border bg-white p-4 shadow-lg rounded-lg">
        <canvas ref={canvasRef}></canvas>
      </div>

      {/* RIGHT — Control Panel */}
      <div className="w-[350px] bg-white p-6 shadow-xl rounded-xl text-black">
        <h2 className="text-2xl font-semibold mb-6">Customize Your Shirt</h2>
        <div className="space-y-5">
          {(["shirt", "collar", "placket", "cuff"] as ColorPart[]).map((part) => (
            <div key={part}>
              <p className="font-medium mb-1">{part.charAt(0).toUpperCase() + part.slice(1)}</p>
              <input
                type="color"
                value={colors[part]}
                className="w-12 h-10 cursor-pointer"
                onChange={(e) => handleColorChange(part, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
