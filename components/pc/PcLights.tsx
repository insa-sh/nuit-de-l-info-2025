"use client";

import React from "react";
import * as THREE from "three";

const PcLights = () => {
  return (
    <>
      <ambientLight intensity={0.5} color="#1a1a40" />
      <spotLight
        position={[2, 5, 6]}
        intensity={100}
        angle={1}
        penumbra={0.2}
        color={"white"}
      />
    </>
  );
};

export default PcLights;
