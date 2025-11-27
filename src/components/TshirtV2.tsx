"use client";

import { useEffect, useRef } from "react";
import { Canvas, FabricImage } from "fabric";
import tshirtImg from "../../public/images/background_tshirt.png";
import bgImage1 from "../../public/images/bgImage1.jpg";
import bgImage2 from "../../public/images/bgImage2.jpg";
import bgImage3 from "../../public/images/bgImage3.jpg";
import bgImage4 from "../../public/images/bgImage4.jpg";
import bgImage5 from "../../public/images/bgImage5.jpg";
import bgImage6 from "../../public/images/bgImage6.jpg";
import bgImage7 from "../../public/images/bgImage7.jpg";
import bgImage8 from "../../public/images/bgImage9.jpg";
import CustomImage from "./customImage";
import IstcodeLogo from "./IstcodeLogo";
//import Image from "next/image";

export default function TshirtCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tshirtRef = useRef<FabricImage | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const bgImageRef = useRef<FabricImage | null>(null);

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
        scaleX: 1.11,
        scaleY: 1,
        selectable: false,
        evented: false,
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

    if (bgImageRef.current) {
      canvas.remove(bgImageRef.current);
      bgImageRef.current = null;
    }

    canvas.backgroundColor = color;
    canvas.requestRenderAll();
  };

  const changeBackgroundImage = (imageSrc: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;


    if (bgImageRef.current) {
      canvas.remove(bgImageRef.current);
    }

    canvas.backgroundColor = "";

    // Image element ile dene
    const imgEl = new Image();
    imgEl.crossOrigin = "anonymous";
    imgEl.src = imageSrc;
    
    imgEl.onload = () => {
      console.log("Görsel yüklendi!");
      
      const bgImg = new FabricImage(imgEl, {
        left: 0,
        top: 0,
        selectable: false,
        evented: false,
      });

      bgImg.scaleToWidth(canvas.width!);
      bgImg.scaleToHeight(canvas.height!);

      canvas.add(bgImg);
      canvas.sendObjectToBack(bgImg);
      bgImageRef.current = bgImg;

      if (tshirtRef.current) {
        canvas.bringObjectToFront(tshirtRef.current);
      }

      canvas.requestRenderAll();
      console.log("Canvas render edildi, obje sayısı:", canvas.getObjects().length);
    };

    imgEl.onerror = (err) => {
      console.error("Görsel yüklenemedi:", err);
    };
  };

  return (
    <div className="flex items-center flex-col lg:flex-row gap-4 w-full bg-white justify-between lg:pl-[5vw] h-fit lg:h-screen relative overflow-x-hidden">
      <div className="absolute w-full items-center h-fit top-8 left-12 hidden lg:flex"><IstcodeLogo /></div>
      <div className="w-[90vw] lg:w-[50%] h-fit lg:h-full flex items-center justify-center overflow-x-hidden max-lg:mt-[50px]">
        <canvas ref={canvasRef} width={500} height={500} className="w-full h-fit lg:h-full" />
      </div>
      <div className="flex flex-col flex-wrap gap-4 w-full lg:w-[50%] items-center justify-center bg-amber-300 h-full p-4">
        <div className="flex gap-2">
          <button onClick={() => changeColor("#f02c37")} className="px-4 py-2 bg-red-500 text-white w-[10vw] h-[10vw] rounded-4xl cursor-pointer">Red</button>
          <button onClick={() => changeColor("#4a7fff")} className="px-4 py-2 bg-blue-500 text-white w-[10vw] h-[10vw] rounded-4xl cursor-pointer">Blue</button>
          <button onClick={() => changeColor("#40c950")} className="px-4 py-2 bg-green-500 text-white w-[10vw] h-[10vw] rounded-4xl cursor-pointer">Green</button>
          <button onClick={() => changeColor("#f0b100")} className="px-4 py-2 bg-yellow-500 text-white w-[10vw] h-[10vw] rounded-4xl cursor-pointer">Yellow</button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => changeBackgroundImage(bgImage1.src)} className="w-[10vw] h-[10vw] rounded-4xl cursor-pointer"><CustomImage src={bgImage1.src} /></button>
          <button onClick={() => changeBackgroundImage(bgImage2.src)} className="w-[10vw] h-[10vw] rounded-4xl cursor-pointer"><CustomImage src={bgImage2.src}  /></button>
                    <button onClick={() => changeColor("#6e3338")} className="w-[10vw] h-[10vw] rounded-4xl cursor-pointer"><CustomImage src={bgImage3.src}  /></button>
                    <button onClick={() => changeColor("#d4c4ac")} className="w-[10vw] h-[10vw] rounded-4xl cursor-pointer"><CustomImage src={bgImage4.src}  /></button>
        </div>
                <div className="flex gap-2">
          <button onClick={() => changeBackgroundImage(bgImage5.src)} className="w-[10vw] h-[10vw] rounded-4xl cursor-pointer"><CustomImage src={bgImage5.src} /></button>
           <button onClick={() => changeBackgroundImage(bgImage6.src)} className="w-[10vw] h-[10vw] rounded-4xl cursor-pointer"><CustomImage src={bgImage6.src} /></button>
            <button onClick={() => changeBackgroundImage(bgImage7.src)} className="w-[10vw] h-[10vw] rounded-4xl cursor-pointer"><CustomImage src={bgImage7.src} /></button>
             <button onClick={() => changeBackgroundImage(bgImage8.src)} className="w-[10vw] h-[10vw] rounded-4xl cursor-pointer"><CustomImage src={bgImage8.src} /></button>
    
        </div>
      </div>
    </div>
  );
}