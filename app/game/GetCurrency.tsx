"use server";

import { cookies } from "next/headers";

export default async function getCurrency() {
  const cookieStore = await cookies();

  const data = await fetch("http://localhost:3001/balance", {
    headers: {
      Cookie: `session=${cookieStore.get("session")?.value || ""}`,
    },
  });
  const posts = await data.json();

  console.log("je suis vie");

  cookieStore.set(
    "session",
    data.headers.get("Set-Cookie")?.split(";")[0].split("=")[1] ||
      cookieStore.get("session")?.value ||
      ""
  );
  return posts;
}
