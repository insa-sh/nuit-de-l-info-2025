"use server";

import { cookies } from "next/headers";

export async function clickHandler() {
  const cookieStore = await cookies();
  const data = await fetch("http://localhost:3001/click", {
    headers: {
      Cookie: `session=${cookieStore.get("session")?.value || ""}`,
    },
  });
  return await data.text();
}
