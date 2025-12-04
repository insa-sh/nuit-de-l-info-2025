"use client";

import HeroExperience, { HeroRef } from "@/components/3d/HeroExperience";
import { Pc } from "@/components/pc/Pc";
import PcScene from "@/components/pc/PcScene";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function Page() {
  // Référence du gosse, avec le type énoncé dans le gosse
  const childRef = useRef<HeroRef>(null);

  const handleClick = () => {
    // Notre fonction qui appelle celle du gosse
    childRef.current?.triggerAnimation();
  };

  return (
    <div className="h-screen w-full">
      <div className="h-screen w-full">
        <Canvas camera={{ position: [0, 5, 10], fov: 90 }}>
          <PcScene />
        </Canvas>
      </div>
    </div>
  );
}