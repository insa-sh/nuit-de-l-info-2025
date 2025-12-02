# Prisma

## Mise à jour du schéma

Pour changer la database (rajouter des colonnes, des tables...), il faut modifier le fichier `prisma/schema.prisma` puis lancer la commande suivante dans le terminal :

```bash
npx prisma migrate dev --name <nom_de_la_migration>
```

Cela va générer une nouvelle migration et mettre à jour la base de données.

## Génération du client Prisma

Après avoir mis à jour le schéma, il faut régénérer le client Prisma pour que les modifications soient prises en compte dans le code. Pour cela, lancer la commande suivante :

```bash
npx prisma generate
```

Cela va régénérer le client Prisma dans le dossier `generated/prisma`.

## Utilisation dans le code

Pour utiliser Prisma dans le code, il faut importer le client Prisma généré et l'instancier. Par exemple :

```ts
import { prisma } from "@/lib/prisma";

const prismaClient = prisma;

async function main() {
  // Example: Fetch all records from a table
  // Replace 'user' with your actual model name
  const allUsers = await prismaClient.user.findMany();
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
```

## Prisma studio

Pour visualiser et manipuler les données de la base de données, Prisma propose un outil appelé Prisma Studio. Pour l'ouvrir, lancer la commande suivante dans le terminal :

```bash
npx prisma studio --config ./prisma/prisma.config.ts
```
