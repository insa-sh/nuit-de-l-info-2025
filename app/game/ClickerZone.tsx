"use client";

import React from "react";
import Button from "@/components/Button";
import { clickHandler } from "./Click";
import { useGame } from "./GameProvider";

export default function ClickerZone() {
  const { updateCurrency } = useGame();

  const handleClick = async () => {
    await clickHandler();
    await updateCurrency();
  };

  return (
    <div className="flex justify-center items-center bg-background-raised w-full h-full rounded-2xl">
      <Button onClick={handleClick}>
        <h1>Click me!</h1>
      </Button>
    </div>
  );
}
