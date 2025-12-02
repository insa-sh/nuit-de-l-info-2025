import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";
import { prisma } from "./prisma";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prismaClient = prisma;

export const auth = betterAuth({
  // database: new Pool({
  //   connectionString: process.env.DATABASE_URL,
  // }),
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});
