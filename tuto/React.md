# React - Cheatsheet

## Rendu conditionnel

### If / early return

```tsx
type Props = { isPacked: boolean; name: string };

function Item({ isPacked, name }: Props) {
  if (!isPacked) return <li>{name}</li>;
  return <li>{name} ✅</li>;
}
```

### `&&` (afficher ou rien)

Afficher seulement si la condition est vraie.

```tsx
{
  isAdmin && <AdminPanel />;
}
{
  items.length > 0 && <ItemList items={items} />;
}
```

### Ternaire `? :`

Choisir entre deux rendus.

```tsx
{
  isLoggedIn ? <Dashboard /> : <LoginForm />;
}
<span>{count === 0 ? "Vide" : count}</span>;
```

### Multiple états (loading / error / data)

Gérer plusieurs cas simplement.

```tsx
"use client";

import { useEffect, useState } from "react";

export default function UserCard() {
  const [data, setData] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setError("Erreur réseau"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Chargement…</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Aucun utilisateur</p>;

  return <div>{data.name}</div>;
}
```

---

## Listes & boucles

### `.map()` simple

Transformer un tableau en JSX.

```tsx
const users = [{ id: 1, name: "Alice" }];

<ul>
  {users.map((user) => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>;
```

### `.map()` vers un composant

Déléguer le rendu.

```tsx
type User = { id: number; name: string };
type UserListProps = { users: User[] };

function UserList({ users }: UserListProps) {
  return (
    <>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </>
  );
}
```

### `filter + map`

Filtrer avant de rendre.

```tsx
{
  tasks.filter((t) => !t.done).map((t) => <TaskRow key={t.id} task={t} />);
}
```

### map + index (fallback de key)

À éviter si possible, mais utile ponctuellement.

```tsx
{
  items.map((item, index) => <Row key={index} item={item} />);
}
```

### Empty state + liste

Afficher un message si la liste est vide.

```tsx
{
  items.length === 0 ? (
    <p>Aucun élément.</p>
  ) : (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  );
}
```

---

## State & événements

### `useState` basique

Compteur simple.

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

Attention, le hook `useState` ne peut être utilisé que dans des composants client (avec `'use client';` en haut du fichier).
Et il re render automatiquement le composant quand la valeur change.

### Input contrôlé

Formulaire simple.

```tsx
"use client";

const [value, setValue] = useState("");

<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

### Submit de formulaire

Empêcher le reload + handler.

```tsx
"use client";

function Form() {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

---

## Props & composition

### Props simples typées

Passer des données à un composant.

```tsx
type TitleProps = { text: string; size?: "sm" | "lg" };

function Title({ text, size = "lg" }: TitleProps) {
  return <h1 className={size === "lg" ? "text-2xl" : "text-lg"}>{text}</h1>;
}
```

### `children`

Wrapper réutilisable.

```tsx
type CardProps = { children: React.ReactNode };

function Card({ children }: CardProps) {
  return <div className="rounded border p-4">{children}</div>;
}

// usage
<Card>
  <h2>Titre</h2>
  <p>Contenu</p>
</Card>;
```

### Props de rendu (render prop)

Personnaliser l’intérieur depuis le parent.

```tsx
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// usage
<List items={users} renderItem={(u) => <li key={u.id}>{u.name}</li>} />;
```

---

## Classes & style conditionnels

### Template string simple

Activer une classe selon une condition.

```tsx
<div className={`p-2 ${isActive ? "bg-blue-500" : "bg-gray-200"}`}>Item</div>
```

---

## Patterns “vue actuelle”

### Switch avec objet

Mapper un état vers un composant.

```tsx
const views: Record<string, JSX.Element> = {
  home: <Home />,
  profile: <Profile />,
  settings: <Settings />,
};

{
  views[currentView] ?? <NotFound />;
}
```

### Tabs simples

Tabs contrôlés via state.

```tsx
"use client";

const tabs = ["info", "comments", "history"] as const;
type Tab = (typeof tabs)[number];

const [tab, setTab] = useState<Tab>("info");

<nav>
  {tabs.map((t) => (
    <button
      key={t}
      onClick={() => setTab(t)}
      className={tab === t ? "font-bold" : ""}
    >
      {t}
    </button>
  ))}
</nav>;

{
  tab === "info" && <Info />;
}
{
  tab === "comments" && <Comments />;
}
{
  tab === "history" && <History />;
}
```
