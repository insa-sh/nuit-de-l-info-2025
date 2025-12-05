"use client";

import Button from "@/components/Button";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import Amelioration from "@/components/Amelioration";
import { FaTrophy } from "react-icons/fa";
import Badge from "@/components/Badge";

import ClickerZone from "./ClickerZone";
import { GameProvider, useGame } from "./GameProvider";
import getCurrency from "./GetCurrency";
import { ameliorations } from "../consts";
import initApi from "./InitApi";

function GameContent() {
  const { currency, refreshData } = useGame();
  const [availableAmeliorations, setAvailableAmeliorations] =
    useState(ameliorations);

  const fetchAvailableAmeliorations = async () => {
    let data = await initApi();
    console.log("Fetched user data:", data);

    if (data && data.purchases && Array.isArray(data.purchases)) {
      // Filtrer les améliorations déjà achetées
      const purchased = data.purchases.map((u: any) => u.id);
      const available = ameliorations.filter((a) => !purchased.includes(a.id));
      setAvailableAmeliorations(available);
      console.log("Available improvements:", available);
    }
  };

  useEffect(() => {
    fetchAvailableAmeliorations();
  }, []);

import PcScene from "@/components/pc/PcScene";


  return (
    <div className="flex flex-col w-screen h-screen p-7 gap-6 lg:flex-row">
      <div className="flex flex-col justify-center items-start h-full w-full gap-6 flex-1">
        <div className="flex justify-between gap-8 w-full items-center">
          <Link
            className="flex items-center gap-4 font-pixelify cursor-pointer whitespace-nowrap shrink-0"
            href="/"
          >
            <div className="w-10 h-10 bg-white"></div>
            <h1>NIRD Advisor</h1>
          </Link>
          <div className="flex w-full gap-5 justify-end">
            <Link href="/bilan" className="flex w-full flex-col hidden lg:inline cursor-pointer">
              <p className="text-sm">Ma progression</p>
              <div className="w-full bg-fill-press rounded-full h-6 mt-1">
                <div
                  className="bg-[#32A26ECC] h-6 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.max(0, ((ameliorations.length - availableAmeliorations.length) / ameliorations.length) * 100))}%`,
                  }}
                ></div>
              </div>
            </Link>
            <Button href="/leaderboard">
              <FaTrophy className="text-white text-2xl"></FaTrophy>
            </Button>
          </div>
        </div>
        <Link href="/bilan" className="flex w-full flex-col lg:hidden cursor-pointer">
          <p className="text-sm">Ma progression</p>
          <div className="w-full bg-fill-press rounded-full h-6 mt-1">
            <div
              className="bg-[#32A26ECC] h-6 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.max(0, ((ameliorations.length - availableAmeliorations.length) / ameliorations.length) * 100))}%`,
              }}
            ></div>
          </div>
        </Link>
        <div className="flex justify-between items-center w-full gap-6 h-full">

          <ClickerZone />

          <div className="flex justify-center items-center bg-background-raised w-full h-full rounded-2xl">
            <Canvas style={{ width: '100%', height: '100%' }} gl={{ alpha: true, antialias: true }}>
              <PcScene />
            </Canvas>
          </div>

          <div className="lg:flex gap-4 hidden flex-col justify-start p-4 items-center bg-background-raised max-w-[126px] w-full h-full rounded-2xl">
            <Badge image={"/badge.svg"} />
            <Badge image={"/badge.svg"} />
            <Badge image={"/badge.svg"} />
            <Badge image={"/badge.svg"} />
            <Badge image={"/badge.svg"} />
            <Badge image={"/badge.svg"} />
            <Badge image={"/badge.svg"} />
            <h1>+4</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center w-full lg:max-w-[450px] pb-5 gap-6 lg:flex-1 bg-background-raised rounded-4xl">
        <div className="flex flex-col w-full items-center">
          <div className="flex p-4 border-b border-stroke-weak justify-between w-full items-center ">
            <h3>Améliorations</h3>
            <div className="flex p-1.5 justify-center items-center gap-1.5">
              <h4 className="text-fill-yellow!">{currency.toLocaleString()}</h4>
              <Image src={"/coin.svg"} width={22} height={20} alt={""}></Image>
            </div>
          </div>
          {availableAmeliorations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Bravo !</h3>
              <p className="text-sm text-gray-400">Tout est fini !</p>
            </div>
          ) : (
            availableAmeliorations
              .slice(0, 3)
              .map((amelioration) => (
                <Amelioration
                  key={amelioration.id}
                  title={amelioration.title}
                  cost={amelioration.cost}
                  iconSrc={"/coin.svg"}
                  id={amelioration.id}
                  cps={0}
                  multiplier={amelioration.multiplier}
                  onPurchase={fetchAvailableAmeliorations}
                />
              ))
          )}
        </div>
        <div className="px-5 w-full">
          <Button className="w-full text-center">
            <h3>Mes Améliorations</h3>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
