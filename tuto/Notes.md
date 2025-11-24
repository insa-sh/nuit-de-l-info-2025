## Routes

Dans Next.js, les routes sont basées sur la structure des fichiers dans le dossier `app`.
Chaque dossier représente une route si il contient un fichier `page.tsx`.
Par exemple, `app/about/page.tsx` correspond à la route `/about`.
On peut imbriquer les routes en créant des sous-dossiers.

## Routes dynamiques

Pour créer des routes dynamiques, on utilise des crochets dans le nom du dossier.
Par exemple, `app/products/[id]/page.tsx` correspond à la route `/products/:id`, où `:id` est une valeur dynamique.
On peut accéder à cette valeur dans le composant de la page via les paramètres.

```ts
import { useParams } from "next/navigation";
export default function ProductPage() {
  const params = useParams();
  return <h1>Product ID: {params.id}</h1>;
}
```

## Layouts

Les layouts permettent de définir une structure commune pour plusieurs pages.
On crée un fichier `layout.tsx` dans un dossier pour définir le layout de toutes les pages dans ce dossier et ses sous-dossiers.

```ts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <header>Mon en-tête</header>
        <main>{children}</main>
        <footer>Mon pied de page</footer>
      </body>
    </html>
  );
}
```

//TODO : si on veut une page sans layout du dessus ?

## Server components

Par défaut, les composants dans le dossier `app` sont des server components.
Cela signifie qu'ils sont rendus côté serveur.
C'est le serveur qui exécute le code, récupère les données via une API ou un ORM, et génère le HTML envoyé au client.
Cela permet d'améliorer les performances et le SEO, car le contenu est déjà présent dans le HTML initial.

### Fetching de la data

On peut utiliser `fetch` directement dans les server components pour récupérer des données.

```ts
export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

Si on a plusieurs Promise que l'on veut exécuter en parallèle, on peut utiliser `Promise.all`.

```ts
const artistData = getArtist(username);
const albumsData = getAlbums(username);

const [artist, albums] = await Promise.all([artistData, albumsData]);
```

Attention cependant : si une des Promises échoue, toutes échouent.

## Clients components

Ce sont des composants React qui s'exécutent côté client.
Pour en faire un, il faut ajouter la directive `"use client";` en haut du fichier.
On les utilise dans les composants qui nécessitent des interactions utilisateur, de l'état local avec `useState`, des effets avec `useEffect`, etc.
Three.js et GSAP par exemple doivent être utilisés dans des client components car ils manipulent le DOM.

### Fetching de la data dans les client components

C'est un peu plus compliqué car on ne peut pas utiliser `fetch` directement dans un client component.
Le parent qui est un server component doit faire le fetch et passer les données en props.
Ensuite, on peut utiliser le hook `use` de React pour attendre la résolution de la Promise dans le client component.
Il vaut mieux que le composant client reçoive une Promise plutôt que les données déjà résolues, pour profiter du rendu asynchrone avec `Suspense`.

```tsx
import Posts from "@/app/ui/posts";
import { Suspense } from "react";

export default function Page() {
  // Don't await the data fetching function
  const posts = getPosts();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  );
}
```

```tsx
"use client";
import { use } from "react";

export default function Posts({
  posts,
}: {
  posts: Promise<{ id: string; title: string }[]>;
}) {
  const allPosts = use(posts);

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Updating de la data

Pour éviter que le client intérage directement avec une API ou une base de données, on utilise des server functions.
On dit dans une fonction qu'elle est "server action" en ajoutant `"use server";` en haut du fichier.
Attention, cette fonction doit être dans un server component.
De telle sorte, quand le client finit un formulaire par exemple, il appelle cette fonction qui s'exécute côté serveur.
De cette manière on fait tout le traitement des données côté serveur.

```tsx
"use server";
export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  // Update data
  // Revalidate cache
}
```

Une fois que c'est fait on peut appeler cette fonction depuis un client component.

```tsx
"use client";

import { createPost } from "@/app/actions";

export function Button() {
  return <button onClick={createPost}>Create</button>;
}
```

On peut les utiliser dans des formulaires ou dans des Event Handler (comme le onClick).
On peut passer l'action comme props au composant client depuis le server component parent si on ne sait pas à l'avance quelle action utiliser.

```tsx
<ClientComponent updateItemAction={updateItem} />
```

```tsx
"use client";

export default function ClientComponent({
  updateItemAction,
}: {
  updateItemAction: (formData: FormData) => void;
}) {
  return <form action={updateItemAction}>{/* ... */}</form>;
}
```

Une fois fait on peut faire de nombreuses choses dans la server function :

- Rafraichir la page
- Rediriger ailleurs

## Rafraichir la page

```tsx
"use server";

import { refresh } from "next/cache";

export async function updatePost(formData: FormData) {
  // Update data
  // ...

  refresh();
}
```

## Rediriger

```tsx
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  // Update data
  // ...

  revalidatePath("/posts");
  redirect("/posts");
}
```

## Cookies

```tsx
"use server";

import { cookies } from "next/headers";

export async function exampleAction() {
  const cookieStore = await cookies();

  // Get cookie
  cookieStore.get("name")?.value;

  // Set cookie
  cookieStore.set("name", "Delba");

  // Delete cookie
  cookieStore.delete("name");
}
```

## Loading States

Si on met un fichier `loading.tsx` dans un dossier, Next.js l'utilisera pour afficher un état de chargement pendant que les données de la page sont en cours de récupération.
Le layout s'affichera immédiatement mais le contenu de la page sera remplacé par le composant de chargement jusqu'à ce que les données soient prêtes.

```ts
export default function Loading() {
  return <p>Chargement...</p>;
}
```

Si on souhaite un état de chargement pour une partie spécifique de la page, on peut utiliser `Suspense` de React autour du composant concerné.

```ts
import { Suspense } from "react";
import BlogListSkeleton from "@/components/BlogListSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <MonComposantAsynchrone />
    </Suspense>
  );
}
```

Attention ; si il y a le moindre composant asynchrone dans la page, et qu'il n'est pas dans un suspense, il utilisera le fichier `loading.tsx` du dossier.
Et s'il n'y en a pas il n'affichera rien en attendant.

## Importer une image

On préfère utiliser le composant `Image` de Next.js pour importer des images, car il offre des optimisations automatique.
On met les images dans le dossier `public` à la racine du projet.
On peut mettre l'URL si c'est une image externe, mais il faut configurer les domaines autorisés dans `next.config.js` !

```ts
import Image from "next/image";
// ...dans le composant React
<Image
  className="dark:invert"
  src="/next.svg"
  alt="Next.js logo"
  width={100}
  height={20}
  priority
/>;
```

## Ajouter des polices

### Google Fonts

On utilise le module `next/font` pour ajouter des polices locales ou hébergées.
Le mieux est d'utiliser des fonts variables quand c'est possible, sinon on peut spécifier les poids et styles nécessaires.

```ts
import { Geist } from "next/font/google";

const geist = Geist({
  // weight: ["400", "700"], // si pas variable
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={geist.className}>
      <h1>Hello, Next.js!</h1>
    </main>
  );
}
```

### Polices locales

On peut aussi ajouter des polices locales en utilisant `next/font/local`.
Il faut les mettres dans le dossier `public`.

```ts
import localFont from "next/font/local";

const myFont = localFont({
  src: "./my-font.woff2",
});
```

Si on veut ajouter plusieurs variantes (poids, styles), on peut passer un tableau d'objets au lieu d'une seule source.

```ts
const roboto = localFont({
  src: [
    {
      path: "./Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Roboto-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Roboto-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});
```

## CSS

Tailwind est préconfiguré dans les nouveaux projets Next.js.
Il y a aussi le fichier de CSS global dans `app/globals.css`.
Cependant on peut aussi avoir des fichiers CSS spécifiques à un composant, on appelle ça les CSS Modules.

Par exemple dans 'app/blog/blog.module.css' :

```css
.blog {
  padding: 24px;
}
```

Qu'on peut ensuite utiliser dans le composant React :

```ts
import styles from "./blog.module.css";

export default function Page() {
  return <main className={styles.blog}></main>;
}
```

## Cache et revalidation

Il arrive que l'on fasse plusieurs fois la même requête fetch dans un server component.
Dans ce cas il vaut mieux faire une fonction qui fait le fetch et qui met en cache le résultat.
Chaque cache possède un tag, ce qui permet de revalider uniquement les données liées à ce tag quand on fait une modification.

```ts
import { cacheTag } from "next/cache";

export async function getPosts() {
  "use cache";
  cacheTag("posts");

  const posts = await db.query("SELECT * FROM posts");
  return posts;
}
```

Ainsi quand la personne ajoute un post, on demande la revalidation du tag 'posts'.

```ts
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  // Create post in database
  const post = await db.post.create({
    data: {
      title: formData.get("title"),
      content: formData.get("content"),
    },
  });

  // Immediately expire cache so the new post is visible
  updateTag("posts");
  updateTag(`post-${post.id}`);

  redirect(`/posts/${post.id}`);
}
```

Pourquoi faire ? Par exemple, dans le Metadata, ou l'on veut le post pour générer un titre dynamique, mais qu'on veut aussi le post dans la page elle-même.
Cela demanderait 2 requêtes identiques ; via le cache, on évite cela.

> Le updateTag est valable que dans les server components, pas dans les API routes par exemple. Il faut dans ce cas utiliser revalidateTag.
> Dans ce cas il faut aussi faire un revalidatePath si on veut revalider une page entière.

## Metadata

On définit les métadatas dans le layout d'une page pour simplifier la gestion du SEO.

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blog",
  description: "...",
};

export default function Layout() {
  //...
}
```

Pour les pages ayant besoin d'un titre dynamique, on peut utiliser une fonction `generateMetadata`.
C'est notamment pour cela que l'on cache la requête de données dans une fonction `getPost` (voir section précédente).

```ts
import { getPost } from "@/app/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <div>{post.title}</div>;
}
```

### Favicon

Il suffit de remplacer le fichier `app/favicon.ico` par le sien.
