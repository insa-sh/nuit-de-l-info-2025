"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  target?: "_blank" | "_self";
}

export default function Button({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
  type = "button",
  target = "_self",
}: ButtonProps) {
  const baseClasses =
    "rounded-[20px] px-6 py-4 md:px-8 w-fit cursor-pointer transition-all duration-200 font-pixelify";

  const variantClasses = {
    primary: "bg-icon-brand hover:bg-icon-brand/80 text-white",
    secondary:
      "bg-brand-weak border-2 border-solid border-stroke-selected text-brand-1000 hover:bg-brand-weak/80",
  };

  const fullClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={fullClassName}
        style={{ textDecoration: "none" }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={fullClassName}>
      {children}
    </button>
  );
}
