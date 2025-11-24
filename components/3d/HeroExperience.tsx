"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useMediaQuery } from "react-responsive";
import HeroLights from "./HeroLights";
import { Room } from "./Room";

//fov : field of view
// POLAR ANGLE = part du haut
// savoir si on est sur tablette ou pas : npm install react-responsive, puis query
// convertir un glb en jsx : npx gltfjsx .\fichier.glb -t
// avec typsecript c'est un peu relou
// renommer le const exporté dans le fichier transformé, et les chemins vers le fichier glb original
// group pour le scale et la position

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <HeroLights />
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={30}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <group
        scale={isMobile ? 0.7 : 1}
        position={[0, -3.5, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <Room />
      </group>
    </Canvas>
  );
};

export default HeroExperience;
