# Better auth

## Configuration

Dans le .env, ne pas oublier de définir les variables :

- BETTER_AUTH_SECRE
- BETTER_AUTH_URL
- DATABASE_URL

## Database

Le schéma de la base de données est disponible dans "/db/schema.sql".
Il est automatiquement initialisé via le docker compose et contient tout ce que Better Auth utilise ; pour intéragir avec, Better Auth utilise pg (pas de Prisma même si c'est possible).

Si on veut rajouter des tables, le faire dedans. Par contre faudra rajouter un prisma ensuite pour intéragir avec, même si c'est mieux de faire une API qui vérifiera la session.
Le meilleur scenario c'est d'envoyer une requête à une API interne qui vérifiera la session et ensuite appellera l'API externe.
WAIT NAN ON OUBLIE le mieux c'est de faire une serveur action qui vérifie et fait l'appel à la DB ça revient au même mais sans une étape supplémentaire.
Mais bien faire attention à "sanitize" les inputs !!!!!

## Connexion, inscription, déconnexion

Voir ceci : https://www.better-auth.com/docs/authentication/email-password
Cela dépend si on fait la vérification côté serveur (serveur action) ou côté client (authClient).

Par exemple pour la connexion et l'inscription, faire du côté client.
Mais pour vérifier les sessions avant d'appeler notre API externe, le faire côté serveur.

## Vérifier la session dans TOUTES les pages protégées

```ts
export async function ServerComponent() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/better-auth-tuto/sign-in");
  }
  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
    </div>
  );
}
```

## Plugin

Il faut utiliser le plugin nextCookies pour que Better Auth puisse lire les cookies dans les requêtes Next.js.
Dasn le fichier lib/auth.ts :

```ts
export const auth = betterAuth({
  //...your config
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});
```
