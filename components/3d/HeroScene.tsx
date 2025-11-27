import {
  ContactShadows,
  DragControls,
  Environment,
  Float,
  Html,
  KeyboardControls,
  KeyboardControlsEntry,
  OrbitControls,
  SoftShadows,
  useProgress,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, {
  Suspense,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import HeroLights from "./HeroLights";
import { Room } from "./Room";
import { Perso } from "./Perso";
import gsap from "gsap";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface HeroSceneProps {
  dezoom: boolean;
  scale: number;
  isTablet: boolean;
  isMobile: boolean;
}

export type HeroSceneRef = {
  animateCamera: () => void;
};

// Les props décomposés comme d'hab merci typescript
const HeroScene = forwardRef<HeroSceneRef, HeroSceneProps>(
  ({ dezoom, scale, isTablet, isMobile }, ref) => {
    // POUR CONTROLER LA CAMERA ; NE PEUT ETRE UTILISE QUE DANS UN CANVAS
    const { camera } = useThree();
    // pour controler l'orbitcontrols, faut utilsier ce type issu de drei
    const newRef = React.useRef<OrbitControlsImpl>(null);

    // Masi est ce que ça sert vraiment d'update caméra sachant qu'on a un orbit controls ? ET BAH NAN
    // C'est soit orbitcontrols, soit on controle full la caméra
    // Si c'est orbit control on définit une target, sinon on définit la caméra

    // Ici on pourrait faire un useEffect qui dépend de dézoom
    // Mais c'est de la MERDE car ça bouffe trop de ressources & ça se déclenche dès le démarrage
    // Expose la fonction d'animation au parent
    useImperativeHandle(ref, () => ({
      animateCamera: () => {
        gsap.to(camera.position, {
          x: 5,
          y: 5,
          z: 5,
          duration: 1,
          ease: "power1.inOut",
        });
        if (newRef.current) {
          newRef.current.target.set(0, 0, 25);
        }
      },
    }));

    function Loader() {
      const { active, progress, errors, item, loaded, total } = useProgress();
      return <Html center>{progress} % loaded</Html>;
    }

    return (
      <Suspense fallback={<Loader />}>
        // HDRI AMBIANT
        {/* <Environment preset="sunset" /> */}
        // COULEUR DU "CIEL"
        <color attach="background" args={["#87CEEB"]} /> {/* Bleu ciel */}
        <HeroLights />
        {/* <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={30}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        ref={newRef}
      /> */}
        <group
          scale={isMobile ? 0.7 * scale : scale}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        >
          {/* <Room /> */}
          <DragControls>
            <Perso />
          </DragControls>
        </group>
        // FAKE SHADOWS
        {/* <ContactShadows
          opacity={0.6}
          scale={10}
          blur={2}
          far={10}
          resolution={256}
          color="#000000"
        /> */}
        // INCROYABLE CE TRUC //
        https://codesandbox.io/p/sandbox/0n9it?file=%2Fsrc%2FApp.js%3A45%2C45 //
        https://codesandbox.io/p/sandbox/wp9mkp?file=%2Fsrc%2FApp.js%3A44%2C16
        {/* <Float floatIntensity={10} rotationIntensity={4}>
          <Html
            style={{ userSelect: "none" }}
            castShadow
            receiveShadow
            occlude="blending"
            transform
          >
            <iframe
              title="embed"
              width={700}
              height={500}
              src="https://threejs.org/"
              frameBorder={0}
            />
          </Html>
        </Float> */}
      </Suspense>
    );
  }
);

export default HeroScene;
