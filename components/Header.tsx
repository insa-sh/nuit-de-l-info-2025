import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Link
        className="flex items-center gap-4 font-pixelify cursor-pointer"
        href="/"
      >
        <div className="w-10 h-10 bg-white"></div>
        <h1>NIRD Advisor</h1>
      </Link>
      <Button href="/bilan" variant="secondary" className="text-[16px]">
        Mon bilan
      </Button>
    </div>
  );
}
