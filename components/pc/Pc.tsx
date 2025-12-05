"use client";

import * as THREE from "three";
import React, { useRef, JSX, useState, useMemo, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";

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

// Fonction d'upgrade qui gère rotation et particules
function performUpgrade(
  ref: React.RefObject<THREE.Mesh>,
  onParticlesStart: () => void,
  onParticlesEnd: () => void
) {
  if (ref.current) {
    // Rotation sur y permanente
    gsap.to(ref.current.rotation, {
      y: `+=${2 * Math.PI * 4}`,
      duration: 3,
      ease: "power2.inOut",
    });

    // Animation du scale
    gsap.to(ref.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    });

    // Déclencher les particules pendant l'animation
    onParticlesStart();
    setTimeout(onParticlesEnd, 4000);
  }
}

// Composant pour les particules d'upgrade
function UpgradeParticles({ isActive }: { isActive: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<
    Array<{
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
      color: THREE.Color;
    }>
  >([]);
  const hasSpawnedRef = useRef(false);

  const particleCount = 100;

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  // Générer de nouvelles particules avec des couleurs variées
  const spawnParticles = (count: number) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.5;

      // Créer une couleur aléatoire
      const color = new THREE.Color();
      const hue = Math.random(); // 0 à 1 pour toute la gamme de couleurs
      color.setHSL(hue, 0.8 + Math.random() * 0.2, 0.5 + Math.random() * 0.3);

      newParticles.push({
        position: new THREE.Vector3(0, 0, -2),
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          (Math.random() - 0.5) * speed,
          Math.sin(angle) * speed
        ),
        life: 1,
        maxLife: 1,
        color: color,
      });
    }
    particlesRef.current.push(...newParticles);
  };

  useFrame(() => {
    if (!pointsRef.current || !geometry) return;

    if (isActive && !hasSpawnedRef.current) {
      spawnParticles(50);
      spawnParticles(50);
      hasSpawnedRef.current = true;
    }

    if (!isActive && hasSpawnedRef.current) {
      hasSpawnedRef.current = false;
    }

    const particles = particlesRef.current;
    const positions = geometry.attributes.position.array as Float32Array;
    const colors = geometry.attributes.color.array as Float32Array;

    let activeCount = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.life -= 0.01;

      if (p.life > 0) {
        p.position.add(p.velocity);

        const idx = activeCount * 3;
        positions[idx] = p.position.x;
        positions[idx + 1] = p.position.y;
        positions[idx + 2] = p.position.z;

        colors[idx] = p.color.r;
        colors[idx + 1] = p.color.g;
        colors[idx + 2] = p.color.b;

        activeCount++;
      }
    }

    particlesRef.current = particles.filter((p) => p.life > 0);

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    geometry.setDrawRange(0, activeCount);

    if (material instanceof THREE.PointsMaterial) {
      material.opacity = isActive ? 0.8 : Math.max(0, material.opacity - 0.02);
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// Timeline globale pour le click
let clickTimeline: gsap.core.Timeline | null = null;

function performClickAnimation(ref: React.RefObject<THREE.Mesh>) {
  if (!ref.current) return;

  // Créer la timeline une seule fois
  if (!clickTimeline) {
    clickTimeline = gsap.timeline({ paused: true });
    clickTimeline.to(ref.current.scale, {
      x: 1.05,
      y: 1.05,
      z: 1.05,
      duration: 0.1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    });
  }

  // Redémarrer la timeline depuis le début
  clickTimeline.restart();
}

export function Pc(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/old_pc.glb"
  ) as unknown as GLTFResult;

  const ref = useRef<THREE.Mesh>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const upgradeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const clickTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Appeler l'upgrade au chargement de la page
  useEffect(() => {
    const timer = setTimeout(() => {
      performUpgrade(
        ref,
        () => setIsUpgrading(true),
        () => setIsUpgrading(false)
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Créer la timeline du click (animation légère au clic)
  // useEffect(() => {
  //   if (ref.current) {
  //     clickTimelineRef.current = gsap.timeline({ paused: true });
  //     clickTimelineRef.current.to(ref.current.scale, {
  //       x: 1.05,
  //       y: 1.05,
  //       z: 1.05,
  //       duration: 0.1,
  //       ease: "power2.inOut",
  //       yoyo: true,
  //       overwrite: 'auto',
  //       repeat: 1,
  //     });
  //   }
  // }, []);

  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    // Timeline du click uniquement (animation légère)
    performClickAnimation(ref);
  };

  return (
    <>
      <UpgradeParticles isActive={isUpgrading} />
      <group
        {...props}
        ref={ref}
        dispose={null}
        position={[0, 0, -37]}
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <group
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-19.91, -10.5, 20.88]}
        >
          <group position={[0, 0, 0]}>
            <mesh
              geometry={nodes.Object_5.geometry}
              material={materials.VoxMaterial_64}
            />
            <mesh
              geometry={nodes.Object_6.geometry}
              material={materials.VoxMaterial_72}
            />
            <mesh
              geometry={nodes.Object_7.geometry}
              material={materials.VoxMaterial_86}
            />
            <mesh
              geometry={nodes.Object_8.geometry}
              material={materials.VoxMaterial_87}
            />
            <mesh
              geometry={nodes.Object_9.geometry}
              material={materials.VoxMaterial_88}
            />
            <mesh
              geometry={nodes.Object_10.geometry}
              material={materials.VoxMaterial_95}
            />
            <mesh
              geometry={nodes.Object_11.geometry}
              material={materials.VoxMaterial_96}
            />
            <mesh
              geometry={nodes.Object_12.geometry}
              material={materials.VoxMaterial_112}
            />
            <mesh
              geometry={nodes.Object_13.geometry}
              material={materials.VoxMaterial_128}
            />
            <mesh
              geometry={nodes.Object_14.geometry}
              material={materials.VoxMaterial_136}
            />
            <mesh
              geometry={nodes.Object_15.geometry}
              material={materials.VoxMaterial_160}
            />
            <mesh
              geometry={nodes.Object_16.geometry}
              material={materials.VoxMaterial_168}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/old_pc.glb");

// Exporter la fonction d'upgrade et de click pour l'utiliser ailleurs
// export { performUpgrade };
// export { performClickAnimation };
