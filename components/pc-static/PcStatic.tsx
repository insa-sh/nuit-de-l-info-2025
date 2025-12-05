import * as THREE from "three";
import React, { useRef, JSX, useState, useEffect } from "react"; 
import { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";

type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_13: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_15: THREE.Mesh;
    Object_16: THREE.Mesh;
  };
  materials: {
    VoxMaterial_64: THREE.Material;
    VoxMaterial_72: THREE.Material;
    VoxMaterial_86: THREE.Material;
    VoxMaterial_87: THREE.Material;
    VoxMaterial_88: THREE.Material;
    VoxMaterial_95: THREE.Material;
    VoxMaterial_96: THREE.Material;
    VoxMaterial_112: THREE.Material;
    VoxMaterial_128: THREE.Material;
    VoxMaterial_136: THREE.Material;
    VoxMaterial_160: THREE.Material;
    VoxMaterial_168: THREE.Material;
  };
};

export function PcStatic(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF('/models/old_pc.glb') as unknown as GLTFResult;
  const ref = useRef<THREE.Group>(null);
  const { gl } = useThree();
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotationY, setRotationY] = useState(0);
  const velocityRef = useRef(0);
  const friction = 0.9;

  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerDown = (event: PointerEvent) => {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });
      velocityRef.current = 0;
      canvas.style.cursor = 'grabbing';
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - dragStart.x;
      velocityRef.current = deltaX * 0.005;
      setRotationY(prev => prev + deltaX * 0.005);
      setDragStart({ x: event.clientX, y: event.clientY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      canvas.style.cursor = 'default';
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [isDragging, dragStart, gl]);

  // Apply inertia every frame
  useFrame(() => {
  if (!isDragging && velocityRef.current !== 0) {
    setRotationY(prev => prev + velocityRef.current);
    velocityRef.current *= friction;

    if (Math.abs(velocityRef.current) < 0.0001) velocityRef.current = 0;
  }
  
  // Auto-rotate when not dragging and no inertia
  if (!isDragging && velocityRef.current === 0) {
    setRotationY(prev => prev + 0.002);
  }
});

  return (
    <>
      <group 
        {...props} 
        ref={ref} 
        dispose={null} 
        position={[0, -10, -25]}
        rotation={[0, rotationY, 0]}
      >
        <group rotation={[-Math.PI / 2, 0, 0]} position={[-19.91, -10.50, 20.88]}>
          <group position={[0, 0, 0]}>
            <mesh geometry={nodes.Object_5.geometry} material={materials.VoxMaterial_64} />
            <mesh geometry={nodes.Object_6.geometry} material={materials.VoxMaterial_72} />
            <mesh geometry={nodes.Object_7.geometry} material={materials.VoxMaterial_86} />
            <mesh geometry={nodes.Object_8.geometry} material={materials.VoxMaterial_87} />
            <mesh geometry={nodes.Object_9.geometry} material={materials.VoxMaterial_88} />
            <mesh geometry={nodes.Object_10.geometry} material={materials.VoxMaterial_95} />
            <mesh geometry={nodes.Object_11.geometry} material={materials.VoxMaterial_96} />
            <mesh geometry={nodes.Object_12.geometry} material={materials.VoxMaterial_112} />
            <mesh geometry={nodes.Object_13.geometry} material={materials.VoxMaterial_128} />
            <mesh geometry={nodes.Object_14.geometry} material={materials.VoxMaterial_136} />
            <mesh geometry={nodes.Object_15.geometry} material={materials.VoxMaterial_160} />
            <mesh geometry={nodes.Object_16.geometry} material={materials.VoxMaterial_168} />
          </group>
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/models/old_pc.glb')