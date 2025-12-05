import React from "react";

interface BadgeProps {
  image: string;
  title?: string;
}

export default function Badge({ image, title = "Badge" }: BadgeProps) {
  return (
    <div className="relative group">
      <div className="min-w-20 min-h-20 rounded-full bg-fill-yellow flex items-center justify-center overflow-hidden cursor-pointer">
        <img src={image} alt="Badge" className="w-full h-full object-cover" />
      </div>
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-3 py-2 bg-fill-yellow text-black! text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-10">
        <h4>{title}</h4>
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
    </div>
  );
}
