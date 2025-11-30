import { Canvas } from "@react-three/fiber";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
import { useMediaQuery } from "react-responsive";
import HeroScene, { HeroSceneRef } from "./HeroScene";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

// ON MET TOUS LES PROPS ICI
interface HeroExperienceProps {
  onAction?: () => void;
}

export type HeroRef = {
  triggerAnimation: () => void;
};

// Utilisation d'un forwardedRef pour permettre au parent d'accéder aux fonctions du composant
// On fait forwardref, puis le type des props, puis les props que le composant attend comme d'hab
const HeroExperience = forwardRef<HeroRef, HeroExperienceProps>(
  ({ onAction }, ref) => {
    // on décompose tous les props ici !
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [scale, setScale] = useState(1);
    const [dezoom, setDezoom] = useState(false);

    // Ref pour accéder aux méthodes de HeroScene
    const sceneRef = useRef<HeroSceneRef>(null);

    // C'EST CA QUI PERMET DE DONNER ACCES AU PARENT (la télécommande)
    useImperativeHandle(ref, () => ({
      // On met la fonction qu'on a défini dans les props et qu'on a donné au parent là
      triggerAnimation: () => {
        console.log("BOUM ! Animation déclenchée dans le Hero !");
        // Appelle directement la fonction d'animation de la scène
        sceneRef.current?.animateCamera();
      },
    }));

    return (
      <Canvas camera={{ position: [0, 1, 5], fov: 50, rotation: [0, 0, 0] }}>
        {" "}
        // FOV A 50, VUE HUMAINE
        <HeroScene
          ref={sceneRef}
          dezoom={dezoom}
          scale={scale}
          isTablet={isTablet}
          isMobile={isMobile}
        />
      </Canvas>
    );
  }
);

export default HeroExperience;
