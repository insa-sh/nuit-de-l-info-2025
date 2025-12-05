import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <Link
      className="flex min-w-fit items-center gap-4 font-pixelify cursor-pointer"
      href="/"
    >
      <div className="w-10 h-10 bg-white"></div>
      <h1>NIRD Advisor</h1>
    </Link>
  );
}
