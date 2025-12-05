# Description de l'API (le backend)

Pour notre proposition de cette année, nous avons opté pour une UI très différente de ce à quoi sont habitués les utilisateurs réguliers d'Internet. Pour suivre la logique de l'interface, le backend devait pouvoir être compatible et réalisé assez rapidement pour assurer le bon développement de l'interface par la suite.  
Nous avons choisi d'utiliser `Node.js` pour faire un serveur web à l'aide d'`Express`, pour pouvoir simuler un jeu de cliqueur, certes rudimentaire mais fonctionnel et efficace.

## Chemins disponibles
**Note**: Tous les chemins, à l'exception de `/scoreboard` créent automatiquement un cookie de session pour l'utilisateur s'il n'est pas déjà fourni dans la requête (ou est devenu invalide).

- GET `/user`: Renvoie toutes les informations stockées sur l'utilisateur
- GET `/click`: comptabilise un clic (multiplié par le multiplicateur du compte) et renvoie la quantité de pièce actuelle de l'utilisateur.
- GET `/balance`: renvoie le nombre de pièces actuel, après avoir calculé le résultat du nombre de clics par seconde
- POST `/purchase`: permet à l'utilisateur d'acheter des améliorations. Exemple d'utilisation avec cURL:
```bash
$ curl --cookie-jar 'cookies.txt' -H 'Content-Type: application/json' -d '{"id":1,"cost":10,"cps":1,"multiplier":0}' localhost:3000/purchase    

{"last_seen":"2025-12-04T19:07:08.366Z","currency":0,"cps":1,"multiplier":1,"purchases":[{"id":1,"cost":10,"cps":1,"multiplier":0,"purchased_on":"2025-12-04T19:07:08.366Z"}]}
```
- POST `/claim_username`: permet à l'utilisateur de choisir son pseudonyme. Ce chemin est "caché" et n'est normalement découvert qu'après avoir complété le jeu réalisé dans le cadre du défi de la pire entrée utilisateur.
- GET `/scoreboard`: Renvoie le classement des meilleurs utilisateurs, classés en fonction de leur nombre de pièces actuel. Ce chemin renvoie aussi la date de création du compte, ce qui permet une attaque des cookies de sessions, comme décrit dans la section sur les failles de l'application web, réalisée dans le cadre du challenge sur les failles de cybersécurité.