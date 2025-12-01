"use server";

import { cookies } from "next/headers";

export async function create(data: { locale: string }) {
  const cookieStore = await cookies();

  cookieStore.set("locale", data.locale);
}
