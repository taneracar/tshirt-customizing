"use client";

import { useEffect, useRef } from "react";
import { FabricImage, Canvas } from "fabric";
import tshirtImg from "../../public/images/background_tshirt.png";

export default function TshirtCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tshirtRef = useRef<FabricImage | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: "#fff",
    });
    fabricCanvasRef.current = fabricCanvas;

    const imgEl = new Image();
    imgEl.src = tshirtImg.src;
    imgEl.onload = () => {
      const tshirt = new FabricImage(imgEl, {
        left: 0,
        top: 0,
        right: 0,
        scaleX: 1.11,
        scaleY: 1,
        selectable: false,
      });
      tshirtRef.current = tshirt;
      fabricCanvas.add(tshirt);

      fabricCanvas.requestRenderAll();
    };

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const changeColor = (color: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.backgroundColor = color;
    canvas.requestRenderAll();
  };

  return (
    <div className="flex items-center gap-4 w-full bg-white justify-between pl-[5vw] h-screen">
      <div className="w-[50%] h-full flex items-center justify-center">
        <canvas ref={canvasRef} width={500} height={500} className="w-full h-full" />
      </div>
      <div className="flex gap-2 w-[50%] items-center justify-center bg-amber-300 h-full">
        <button onClick={() => changeColor("red")} className="px-4 py-2 bg-red-500 text-white">Red</button>
        <button onClick={() => changeColor("blue")} className="px-4 py-2 bg-blue-500 text-white">Blue</button>
        <button onClick={() => changeColor("green")} className="px-4 py-2 bg-green-500 text-white">Green</button>
        <button onClick={() => changeColor("yellow")} className="px-4 py-2 bg-yellow-500 text-black">Yellow</button>
      </div>
    </div>
  );
}
