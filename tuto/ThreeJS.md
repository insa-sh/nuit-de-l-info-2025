# Three.JS avec React

## Librairies à installer

- three (three.js)
- @react-three/fiber (threejs adapté à react)
- @react-three/drei (lumière cadrage etc simplifié pour threejs)
- @react-three/postprocessing (effets de post processing threejs)
- react-responsive (détection de la taille d'écran)

## Étapes d'intégration

1. Mettre son objet au format GLB dans ce site : https://gltf.pmnd.rs/
   Activer les types dans les options d'export (pour avoir des noms de mesh lisibles)

2. Mettre le fichier .glb dans le dossier public/models

3. Prendre le code exporté par le site et le coller dans un composant React, puis :

- Changer le nom "Model" par le nom de votre objet (ex: Room)
- Changer les chemins pour pointer vers votre fichier (ex: "/models/optimized-room.glb")
- Faire le typecasting GLTFResult (`as unknown as GLTFResult`)

4. Dans un autre fichier (ici HeroExperience.tsx), créer un <Canvas> de react-three-fiber et y insérer un <Group> (pour gérer la position, scale) avec votre composant Model à l'intérieur.
   Ce composant HeroExperience sera celui que vous utiliserez dans votre page, il doit être "use client".

5. Dans le canvas, ajouter des lumières (ici fichier séparé HeroLights.tsx), un <OrbitControls> de drei, et configurer la caméra dans le Canvas.
   Remarque : on peut faire ça dans un composant séparé (ex: HeroLights.tsx) pour garder le code propre.

6. Resize comme souhaiter le modèle 3D via la <div> qui contient le HeroExperience.

## Infos apprises

- On peut modifier les textures et matériaux dans le composant Model (Room.tsx) avant de le retourner.
  - charger une image comme texture
  - créer nouveau materiau
- fov : field of view
- POLAR ANGLE = part du haut
- Pour savoir si on est sur tablette ou pas (en code) : npm install react-responsive, puis query
- avec typsecript c'est un peu relou

## Suspense

Pour faire un suspense (chargement du modèle 3D), il faut importer Suspense de react et le mettre DANS le Canvas, autour du modèle 3D.
Il est cependant spécial : le loader doit être un composant Html spécial à importer depuis drei.
De plus on peut utiliser le hook useProgress de drei pour avoir le pourcentage de chargement.

```tsx
import { Html } from "@react-three/drei";

const HeroExperience = () => {
  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <Suspense fallback={<Loader />}>
        <Room />
      </Suspense>
    </Canvas>
  );
};
```
