"use client";

import * as THREE from "three";
import React, { useRef, JSX } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Grid(props: JSX.IntrinsicElements["group"]) {
  const size = 10;
  const divisions = 10;
  const helper = new THREE.GridHelper( size, divisions );

  return (
    <group {...props} dispose={null}>
      <primitive object={helper} />
    </group>
  );
}

export function CubeWithGrids(props: JSX.IntrinsicElements["group"]) {
  const size = 10;
  const divisions = 8;

  return (
    <group {...props}>

      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial 
          color="lightblue" 
          transparent={false}  
          side={THREE.FrontSide}
        />
      </mesh>
      
      {/* Top face (Y+) */}
      <primitive object={new THREE.GridHelper(size, divisions)} position={[0, size/2, 0]} />
      
      {/* Bottom face (Y-) */}
      <primitive object={new THREE.GridHelper(size, divisions)} position={[0, -size/2, 0]} />
      
      {/* Front face (Z+) */}
      <primitive object={new THREE.GridHelper(size, divisions)} position={[0, 0, size/2]} rotation={[Math.PI/2, 0, 0]} />
      
      {/* Back face (Z-) */}
      <primitive object={new THREE.GridHelper(size, divisions)} position={[0, 0, -size/2]} rotation={[Math.PI/2, 0, 0]} />
      
      {/* Right face (X+) */}
      <primitive object={new THREE.GridHelper(size, divisions)} position={[size/2, 0, 0]} rotation={[0, 0, Math.PI/2]} />
      
      {/* Left face (X-) */}
      <primitive object={new THREE.GridHelper(size, divisions)} position={[-size/2, 0, 0]} rotation={[0, 0, Math.PI/2]} />
    </group>
  );
}