"use client";

import { Canvas } from '@react-three/fiber';
import { Helper, OrbitControls } from '@react-three/drei';
import { CubeWithGrids } from '@/components/test_3d/Helper';

export function HelperCanva() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 20, 30], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <CubeWithGrids />
        <OrbitControls />
      </Canvas>
    </div>
  );
}