# GSAP

## Librairies à installer

- gsap
- @gsap/react (gsap adapté à react)

## Étapes d'intégration

1. Installer gsap et @gsap/react via npm ou yarn.

2. Importer gsap dans le composant React où vous souhaitez utiliser les animations.
   Remarque : si c'est pour animer des objets 3D dans three.js, importer gsap dans le fichier du modèle 3D (ex: Room.tsx).

3. Utiliser les hooks et fonctions de gsap pour créer des animations.
   Par exemple, utiliser `gsap.to()` pour animer les propriétés d'un objet sur une durée définie.
   Remarque : il faut le faire dans un useGSAP pour que ça fonctionne correctement avec le cycle de vie de React.

```tsx
useGSAP(() => {
  if (ref.current) {
    // Rotation sur y permanente
    gsap.to(ref.current.rotation, {
      // scrollTrigger: {
      //   trigger: "body",
      //   start: "top top",
      //   end: "+=1500",
      //   toggleActions: "play pause resume none",
      // },
      y: "+=0.5",
      repeat: -1,
      ease: "none",
      repeatRefresh: true,
    });
  }
}, []);
```

## ScrollTrigger

Pour déclencher des animations au scroll, il faut utiliser le plugin ScrollTrigger de gsap.
Importer ScrollTrigger depuis gsap et l'enregistrer avec `gsap.registerPlugin(ScrollTrigger);`.

## Debug

Il est possible de debug les animations de GSAP individuellement en utilisant les GSAP devTools.
Pour cela on attribue un id à now tweens/timelines, puis on les associes aux devTools.

```tsx
gsap.registerPlugin(GSDevTools);

const tween = gsap.to(ref.current.rotation, {
  y: "+=0.5",
  repeat: -1,
  ease: "none",
  repeatRefresh: true,
  id: "myTween", // Attribuer un id
});

GSDevTools.create({ animation: "myTween" }); // Associer aux devTools
```

Attention ! Il faut enlever tous les ScrollTrigger avant d'utiliser les devTools, car c'est incompatible avec le devtool.
