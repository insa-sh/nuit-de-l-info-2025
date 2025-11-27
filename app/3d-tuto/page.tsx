"use client";

import HeroExperience, { HeroRef } from "@/components/3d/HeroExperience";
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
      <div className="h-5/6">
        <HeroExperience ref={childRef} />
      </div>
      <button
        onClick={() => handleClick()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Active
      </button>
    </div>
  );
}
