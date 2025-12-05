import {
  ContactShadows,
  DragControls,
  Environment,
  Html,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { PcStatic } from "./PcStatic";
import PcLights from "../pc/PcLights";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface PcSceneProps {
  scale?: number;
  isTablet?: boolean;
  isMobile?: boolean;
}

const PcStaticScene: React.FC<PcSceneProps> = ({ 
  scale = 1, 
  isTablet = false, 
  isMobile = false 
}) => {
  const { camera } = useThree();
  const orbitRef = useRef<OrbitControlsImpl>(null);

  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress.toFixed(0)}% loaded</Html>;
  }

  return (
    <Suspense fallback={<Loader />}>
      {/* <color attach="background" args={["transparent"]} /> */}
      
      <PcLights />

      {/* Controls */}
      {/* <OrbitControls
        ref={orbitRef}
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={30}
        minDistance={5}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      /> */}

      {/* Scene */}
      <group
        scale={isMobile ? 0.7 * scale : scale}
        position={[0, 0, 0]}
      >
        <PcStatic position={[0, 0, 0]} />
      </group>

      {/* Shadows */}
      <ContactShadows
        opacity={0.5}
        scale={10}
        blur={2}
        far={10}
        resolution={256}
        color="#000000"
      />
    </Suspense>
  );
};

export default PcStaticScene;