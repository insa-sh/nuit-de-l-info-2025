import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Link
        className="flex items-center gap-4 font-pixelify cursor-pointer"
        href="/"
      >
        <div className="w-10 h-10 relative">
          <Image
            src="/images/logo.png"
            alt="Logo NIRD Advisor"
            fill
            className="object-contain"
          />
        </div>
        <h1>NIRD Advisor</h1>
      </Link>
    </div>
  );
}
