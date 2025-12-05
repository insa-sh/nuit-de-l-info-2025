"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import InfoPopup from "@/components/InfoPopup";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { PcStatic } from "@/components/pc-static/PcStatic";
import PcStaticScene from "@/components/pc-static/PcStaticScene";

export default function pageAccueil() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 items-center justify-center p-7">
      <div className="flex flex-col gap-6 items-center w-full">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <Header />
        </div>

        {/* Hero Section */}
        <div className="flex flex-col gap-6 items-center justify-center px-0 py-16 w-full rounded-[64px] overflow-hidden relative">
          {/* Background gradients */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: `
                radial-gradient(30.62% 87.19% at 95.05% 36.08%, rgba(237, 0, 130, 0.90) 0%, rgba(0, 0, 0, 0.90) 100%), radial-gradient(79.37% 101.42% at 9.58% 29.04%, rgba(79, 0, 237, 0.90) 0%, rgba(0, 0, 0, 0.10) 100%), radial-gradient(44.37% 144.05% at 86.95% 93.13%, rgba(166, 95, 236, 0.90) 0%, rgba(0, 0, 0, 0.10) 100%), #1D1E26
              `,
            }}
          />

          <div className="relative z-10 w-screen">
            {/* <Image
              src="/images/computer.png"
              alt="Computer"
              width={555}
              height={429}
              className="object-cover"
            /> */}
            <Canvas
              style={{ width: "100%", height: "400px" }}
              gl={{ alpha: true, antialias: true }}
            >
              <PcStaticScene />
            </Canvas>
          </div>

          <p className="text-white text-[32px] md:text-[48px] font-normal relative z-10 font-pixelify">
            NIRD Advisor
          </p>

          <div className="flex flex-col items-center relative z-10">
            <p className="text-white text-[24px] md:text-[32px] font-normal text-center font-pixelify">
              <span>Apprennez à </span>
              <span
                className="font-bold underline decoration-solid [text-underline-position:from-font]"
                style={{ color: "#53ac83" }}
              >
                responsabiliser
              </span>
              <span> votre parc informatique avec la NIRD !</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-center relative z-10">
            <Button href="/game" className="flex items-center justify-center">
              <p className="text-white text-[24px] font-normal text-center">
                Deviens acteur de ton infrastructure !
              </p>
            </Button>

            <Button
              href="/leaderboard"
              variant="secondary"
              className="flex gap-2.5 items-center justify-center w-full md:w-auto"
            >
              <Image
                src="/images/trophy.svg"
                alt="Trophy"
                width={24}
                height={24}
              />
              <p className="text-[18px] md:text-[24px] font-normal text-center">
                Leaderboard
              </p>
            </Button>
          </div>
        </div>

        {/* NIRD Section */}
        <div
          className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center overflow-hidden p-8 lg:p-16 rounded-[64px] w-full"
          style={{
            background: `
                radial-gradient(94.61% 96.7% at 20.16% 47.05%, rgba(79, 0, 237, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)`,
          }}
        >
          <div className="relative flex-shrink-0">
            <Image
              src="/images/nird-logo.png"
              alt="NIRD Logo"
              width={373}
              height={154}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-[79px] items-center flex-1">
            <p className="text-white text-[32px] md:text-[48px] font-normal w-full font-pixelify">
              NIRD - Inclusif, Responsable & Durable
            </p>

            <div className="text-white text-[18px] md:text-[24px] leading-6 md:leading-8 w-full font-anonymous-pro">
              <p className="mb-0">
                <span>Grâce la </span>
                <span className="font-bold">démarche NIRD</span>
                <span>
                  , transformez vos systèmes et infrastructures informatiques
                  pour les rendre autonome, responsables et indépendentes. Nous
                  vous guidons pas-à-pas pour transformer votre parc
                  informatique en un outil inclusif, durable et
                  responsable.{" "}
                </span>
              </p>
              <p className="mb-0">&nbsp;</p>
              <p className="leading-8">
                <span>
                  Grâce à NIRD, vous pouvez reconditionner du matériel, adopter
                  des logiciels libres et alléger les coûts, tout en
                  renforçant{" "}
                </span>
                <span className="font-bold">l'autonomie numérique</span>
                <span> et </span>
                <span className="font-bold">l'éthique</span>
                <span> de vos pratiques. </span>
              </p>
            </div>

            <Button
              href="https://nird.forge.apps.education.fr/"
              target="_blank"
              className="flex items-center justify-center w-full md:w-auto"
            >
              <p className="text-white text-[18px] md:text-[24px] font-normal text-center">
                Voir le site de la NIRD →
              </p>
            </Button>
          </div>
        </div>

        {/* Le Clicker NIRD Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center overflow-hidden p-8 lg:p-16 rounded-[64px] w-full relative">
          {/* Background gradients */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
              radial-gradient(30.62% 87.19% at 95.05% 36.08%, rgba(237, 0, 130, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), radial-gradient(28.08% 20.03% at 10.44% 50.05%, rgba(79, 0, 237, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%)              `,
            }}
          />

          <div className="relative z-10 flex-shrink-0">
            <Image
              src="/images/cursor.png"
              alt="Cursor"
              width={320}
              height={320}
              className="w-[200px] h-[200px] lg:w-[320px] lg:h-[320px]"
            />
          </div>

          <div className="flex flex-col gap-[79px] items-center flex-1 relative z-10">
            <p className="text-white text-[32px] md:text-[48px] font-normal w-full font-pixelify">
              Le Clicker NIRD
            </p>

            <div className="text-white text-[18px] md:text-[24px] leading-6 md:leading-8 w-full font-anonymous-pro">
              <p className="mb-0">
                Connaissez-vous le jeu Cookie Clicker ? Un jeu simple et
                efficace. A chaque fois que le joueur clique sur le cookie, il
                gagne de l'argent. Avec cet argent, il peut améliorer ses clics,
                installer des clickers automatiques, ou des fermes à clic. Le
                but est d'obtenir toujours plus de clics.
              </p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">
                <span>
                  A travers la démarche NIRD, nous souhaitons mettre en
                  place{" "}
                </span>
                <span className="font-bold">
                  des infrastructures toujours plus éthiques
                </span>
                <span>
                  , toujours plus responsables et souveraines. Le principe du
                  jeu est le suivant : Plus vous touchez à votre infra, plus
                  vous gagnerez de l'argent, et plus vous pourrez l'améliorer.
                </span>
              </p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">
                L'objectif ? Tendre vers un modèle complètement indépendant,
                open source et éthique !{" "}
              </p>
              <p className="mb-0">&nbsp;</p>
              <p>
                Vous recevrez des conseils et un recap des actions que vous
                pouvez mettre en place pour améliorer vos parcs informatiques.
              </p>
            </div>

            <Button
              href="/game"
              className="flex items-center justify-center w-full md:w-auto"
            >
              <p className="text-white text-[18px] md:text-[24px] font-normal text-center">
                Jouer →
              </p>
            </Button>
          </div>
        </div>
      </div>

      {/* Popup */}
      <InfoPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Installation d'un OS Libre & Open Source"
        description="Windows 10 ? Obsolète. Windows 11 ? C'est lourd et cela dépend de Microsoft. Utilisez un système d'exploitation Open Source - cela signifie que le système n'est la propriété d'aucune entreprise et n'a pas pour objectif de faire gagner de l'argent à qui que ce soit."
        imageSrc="/images/computer.png"
        primaryButtonText="C'est super !"
        secondaryButtonText="En savoir plus"
      />
    </div>
  );
}
