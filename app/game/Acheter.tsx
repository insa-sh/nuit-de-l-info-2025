"use server";

import { cookies } from "next/headers";

export async function acheter({
  cost,
  id,
  cps,
  multiplier,
}: {
  cost: number;
  id: number;
  cps: number;
  multiplier: number;
}) {
  const cookieStore = await cookies();

  const data = await fetch("http://localhost:3001/purchase", {
    method: "POST",
    body: JSON.stringify({ cost, id, cps, multiplier }),
    headers: {
      Cookie: `session=${cookieStore.get("session")?.value || ""}`,
      "Content-Type": "application/json",
    },
  });
}
