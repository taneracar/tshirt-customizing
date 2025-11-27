"use client";

import { useEffect, useRef, useState } from "react";

type ColorPart = "shirt" | "collar" | "placket" | "cuff";

export default function DesignerV4Realistic() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [colors, setColors] = useState<Record<ColorPart, string>>({
    shirt: "#e5e5e5",
    collar: "#ffffff",
    placket: "#ffffff",
    cuff: "#ffffff",
  });

  const handleColorChange = (part: ColorPart, color: string) => {
    setColors((prev) => ({ ...prev, [part]: color }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 450;
    canvas.height = 550;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ===== BACKGROUND =====
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ===== SHIRT BODY (yumuşak kıvrım) =====
    ctx.fillStyle = colors.shirt;
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(120, 120);
    ctx.bezierCurveTo(150, 100, 300, 100, 330, 120);
    ctx.lineTo(360, 500);
    ctx.lineTo(90, 500);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // ===== COLLAR (hafif yamuk) =====
    ctx.fillStyle = colors.collar;
    ctx.beginPath();
    ctx.moveTo(130, 120);
    ctx.lineTo(220, 85);
    ctx.lineTo(310, 120);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // ===== PLACKET (basit renk) =====
    ctx.fillStyle = colors.placket;
    ctx.fillRect(210, 120, 40, 380);
    ctx.strokeRect(210, 120, 40, 380);

    // ===== CUFFS =====
    ctx.fillStyle = colors.cuff;
    ctx.fillRect(60, 450, 80, 50);
    ctx.fillRect(310, 450, 80, 50);
    ctx.strokeRect(60, 450, 80, 50);
    ctx.strokeRect(310, 450, 80, 50);
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
          {( ["shirt", "collar", "placket", "cuff"] as ColorPart[] ).map((part) => (
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
