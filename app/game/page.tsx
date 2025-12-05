import Button from "@/components/Button";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Amelioration from "@/components/Amelioration";
import { FaTrophy } from "react-icons/fa";
import Badge from "@/components/Badge";

export default function page() {
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
                  style={{ width: `${Math.min(100, Math.max(0, 65))}%` }}
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
              style={{ width: `${Math.min(100, Math.max(0, 65))}%` }}
            ></div>
          </div>
        </Link>
        <div className="flex justify-between items-center w-full gap-6 h-full">
          <div className="flex justify-center items-center bg-background-raised w-full h-full rounded-2xl"></div>
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
              <h4 className="text-fill-yellow!">12 000</h4>
              <Image src={"/coin.svg"} width={22} height={20} alt={""}></Image>
            </div>
          </div>
          <Amelioration title={"Example"} cost={12000} iconSrc={"/coin.svg"} />
          <Amelioration title={"Example"} cost={12000} iconSrc={"/coin.svg"} />
          <Amelioration title={"Example"} cost={12000} iconSrc={"/coin.svg"} />
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
