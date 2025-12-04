import * as THREE from "three";
import React, { useRef, JSX } from "react"; 
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import gsap from "gsap";
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

function upgrade(ref: React.RefObject<THREE.Mesh>) {
  if (ref.current) {
      // Rotation sur y permanente
      gsap.to(ref.current.rotation, {
        y: `+=${2 * Math.PI * 4}`,
        duration: 3,
        ease: "power2.inOut",
      });

      // Animation du scale
      gsap.to(ref.current.scale, {
        x: 1.4,
        y: 1.4,
        z: 1.4,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1, // va grandir puis revenir à la taille normale
      });
    }
}

// function click(ref: React.RefObject<THREE.Mesh>) {
//   if (ref.current) {
//       // Animation du scale
//       gsap.to(ref.current.scale, {
//         x: 1.1,
//         y: 1.1,
//         z: 1.1,
//         duration: 0.1,
//         ease: "power2.inOut",
//         yoyo: true,
//         overwrite: 'auto',
//         repeat: 1, // va grandir puis revenir à la taille normale
//       });
//     }
// }

export function Pc(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF('/models/old_pc.glb') as unknown as GLTFResult;

  const ref = useRef<THREE.Mesh>(null);

  upgrade(ref);

  let t1 = gsap.timeline({ paused: true });

  if (ref.current) {
    t1.to(ref.current.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.1,
        ease: "power2.inOut",
        yoyo: true,
        overwrite: 'auto',
        repeat: 1, // va grandir puis revenir à la taille normale
      });
  }
  

  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    t1.restart();
  };

  return (
    <group 
      {...props} 
      ref={ref} 
      dispose={null} 
      position={[0, -10, -25]}
      onClick={handleClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
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
  )
}



useGLTF.preload('/models/old_pc.glb')