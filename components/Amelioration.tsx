"use client";

import React from "react";
import Image from "next/image";
import { acheter } from "@/app/game/Acheter";
import { useGame } from "@/app/game/GameProvider";

export default function Amelioration({
  title,
  cost,
  iconSrc,
  id,
  cps,
  multiplier,
  onPurchase,
}: {
  title: string;
  cost: number;
  iconSrc: string;
  id: number;
  cps: number;
  multiplier: number;
  onPurchase?: () => void;
}) {
  const { refreshData } = useGame();

  const handleClick = async () => {
    await acheter({ cost, id, cps, multiplier });
    await refreshData();
    if (onPurchase) {
      onPurchase();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex justify-center items-center gap-4 bg-background-overlay px-6 py-4 border-b border-stroke-weak w-full hover:bg-brand-1000/30 cursor-pointer transition-colors"
    >
      <Image src={iconSrc} alt={title} width={40} height={40} />
      <div className="flex lg:flex-col justify-between lg:justify-center items-start w-full gap-2 ">
        <h4>{title}</h4>
        <div className="flex justify-center items-center gap-2">
          <Image src={"/coin.svg"} alt={"coin"} width={22} height={20} />
          <h4 className="text-fill-yellow!">{cost}</h4>
        </div>
      </div>
    </div>
  );
}
