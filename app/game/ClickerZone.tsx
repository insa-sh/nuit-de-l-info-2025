"use client";

import React, { useEffect } from "react";
import initApi from "./InitApi";
import Button from "@/components/Button";
import { clickHandler } from "./Click";

export default function ClickerZone() {
  useEffect(() => {
    setInterval(async () => {
      let info = await initApi();
      console.log(info);
    }, 1000);
  }, []);

  return (
    <div className="flex justify-center items-center bg-background-raised w-full h-full rounded-2xl">
      <Button onClick={clickHandler}>
        <h1>Click me!</h1>
      </Button>
    </div>
  );
}
