import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Pixelify_Sans,
  Anonymous_Pro,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NIRD Advisor",
  description: "Created by ./insa.sh - Le CLub Info",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} antialiased bg-background-base`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          themes={["light", "dark", "theme-blue", "theme-green", "theme-red"]}
          storageKey="theme"
        >
          <NextIntlClientProvider>
            <div
              className="flex flex-col min-h-screen"
              style={{ backgroundColor: "var(--color-background-base)" }}
            >
              <main className="flex-1">{children}</main>
              <footer className="flex items-center justify-center py-4">
                <Link
                  href="/credits"
                  className="font-bold text-white text-[14px]"
                  style={{ fontFamily: "var(--font-anonymous-pro)" }}
                >
                  Crédits
                </Link>
              </footer>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
