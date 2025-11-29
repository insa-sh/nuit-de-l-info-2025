# Odys.js

## Routing

Puisque Odys.js prend toute la page, et que Next.js comprend pas trop, il faut obligatoirement aller sur une page avec un jeu Odys.js via la balise `<a>`, pas via le composant `Link` de Next.js.

## Variables

Pour utiliser des états, ne pas faire de `useState` ou `useRef`, mais utiliser des variables "let" classiques, car le composant n'est pas "réactif".
Il recharge tout si on fait du `useState`, donc on perd le jeu en cours.
