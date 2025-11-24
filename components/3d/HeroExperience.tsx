"use client";

import { Html, OrbitControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import HeroLights from "./HeroLights";
import { Room } from "./Room";

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <Suspense fallback={<Loader />}>
        {" "}
        // SUSPENSE DANS LE CANVA + LOADER SPECIAL
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
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
