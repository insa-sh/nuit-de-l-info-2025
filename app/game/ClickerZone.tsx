"use client";

import React from "react";
import Button from "@/components/Button";
import { clickHandler } from "./Click";
import { useGame } from "./GameProvider";
import { Canvas } from "@react-three/fiber";
import PcScene from "@/components/pc/PcScene";

export default function ClickerZone() {
  const { updateCurrency } = useGame();

  const handleClick = async () => {
    await clickHandler();
    await updateCurrency();
  };

  return (
    <div className="flex justify-center items-center bg-background-raised w-full h-full rounded-2xl">
      <Canvas
        onClick={handleClick}
        style={{ width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true }}
      >
        <PcScene />
      </Canvas>
    </div>
  );
}
