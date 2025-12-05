"use client";

import React from "react";

export default function Button({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={() => alert("hey")}
      className={`bg-icon-brand rounded-[20px] p-4 w-fit ${className} cursor-pointer hover:bg-icon-brand/70 transition-colors`}
    >
      {children}
    </button>
  );
}
