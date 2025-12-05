"use server";

import { cookies } from "next/headers";

export default async function getCookie() {
  const cookieStore = await cookies();

  return cookieStore.get("session")?.value || "";
}
