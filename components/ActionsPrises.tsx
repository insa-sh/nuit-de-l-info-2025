import React from "react";
import Image from "next/image";

type ActionsPrisesProps = {
  variant?: "valide" | "erreur" | "gris" | "info";
  children: React.ReactNode;
};

export default function ActionsPrises({
  variant = "valide",
  children,
}: ActionsPrisesProps) {
  const variantStyles = {
    valide: "bg-fill-success-weak border-stroke-success-strong",
    erreur: "bg-fill-error-weak border-stroke-error-strong",
    gris: "bg-fill-weak border-stroke-strong",
    info: "bg-fill-weak border-stroke-information-strong",
  };

  const iconPaths = {
    valide: "/images/icons/valid.svg",
    erreur: "/images/icons/error.svg",
    gris: "/images/icons/error_gris.svg",
    info: "/images/icons/lightbulb.svg",
  };

  return (
    <div
      className={`border border-solid flex gap-[10px] items-center justify-center px-[27px] py-[30px] rounded-[10px] w-[343px] ${variantStyles[variant]}`}
    >
      <div className="relative shrink-0 size-[40px]">
        <Image
          src={iconPaths[variant]}
          alt=""
          width={40}
          height={40}
          className="w-full h-full"
        />
      </div>
      <p className="flex-1 font-pixelify font-normal leading-normal text-[20px] text-white whitespace-pre-wrap">
        {children}
      </p>
    </div>
  );
}
