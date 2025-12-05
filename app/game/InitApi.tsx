"use server";

import { cookies } from "next/headers";

export default async function initApi() {
  const cookieStore = await cookies();

  const data = await fetch("http://localhost:3001/user", {
    headers: {
      Cookie: `session=${cookieStore.get("session")?.value || ""}`,
    },
  });
  const posts = await data.json();

  cookieStore.set(
    "session",
    data.headers.get("Set-Cookie")?.split(";")[0].split("=")[1] ||
      cookieStore.get("session")?.value ||
      ""
  );
  return posts;
}
