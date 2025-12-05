import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Header from "@/components/Header";

export default function CreditsPage() {
  return (
    <div className="bg-background-base flex flex-col gap-[24px] items-center justify-center p-[28px] min-h-screen w-full">
      <div className="flex flex-col gap-[64px] items-center w-full max-w-[1456px]">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <div className="relative flex flex-col gap-[24px] items-center justify-center overflow-hidden px-0 py-[64px] rounded-[64px] w-full bg-background-raised">
          {/* Gradient backgrounds */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse 124.45px 13.55px at 95% 36%, rgba(237,0,130,1) 0%, rgba(177,0,98,1) 25%, rgba(118,0,65,1) 50%, rgba(89,0,49,1) 62.5%, rgba(59,0,33,1) 75%, rgba(30,0,16,1) 87.5%, rgba(15,0,8,1) 93.75%, rgba(0,0,0,1) 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse 96.249px 60.458px at 10% 29%, rgba(79,0,237,1) 0%, rgba(59,0,177,1) 25%, rgba(39,0,118,1) 50%, rgba(30,0,89,1) 62.5%, rgba(20,0,59,1) 75%, rgba(10,0,30,1) 87.5%, rgba(5,0,15,1) 93.75%, rgba(0,0,0,1) 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse 208.9px 10.084px at 87% 93%, rgba(166,95,236,1) 0%, rgba(125,71,177,1) 25%, rgba(104,59,148,1) 37.5%, rgba(83,48,118,1) 50%, rgba(62,36,89,1) 62.5%, rgba(42,24,59,1) 75%, rgba(21,12,30,1) 87.5%, rgba(10,6,15,1) 93.75%, rgba(0,0,0,1) 100%)`,
            }}
          />

          <div className="relative z-10 flex flex-col gap-[24px] items-center">
            <div className="relative w-[555px] h-[429px]">
              <Image
                alt="Logo ./insa.sh"
                src="/images/logo-insash.png"
                fill
                className="object-cover"
              />
            </div>
            <p className="font-pixelify font-normal text-[48px] text-white leading-normal text-center">
              Equipe ./insa.sh pour la Nuit de l&apos;info
            </p>
            <p className="font-pixelify font-normal text-[32px] text-white text-center leading-normal">
              ./insa.sh ? Ce n&apos;est pas un nom au hasard !
            </p>
            <div className="flex gap-[24px] items-start justify-center">
              <Button
                href="https://insash.org"
                target="_blank"
                variant="primary"
                className="text-[24px]"
              >
                Club Info de l&apos;INSA Hauts-de-France
              </Button>
              <Button
                href="https://hebergos.insash.org"
                target="_blank"
                variant="secondary"
                className="text-[24px]"
              >
                HebergOS
              </Button>
            </div>
          </div>
        </div>

        {/* ./insa.sh Section */}
        <div className="bg-[#de7f92] flex gap-[64px] items-center justify-center overflow-hidden p-[64px] rounded-[64px] w-full">
          <div className="flex flex-1 flex-col gap-[22px] items-center text-[#1f1f1f]">
            <p className="font-pixelify font-normal text-[48px] w-full leading-normal">
              ./insa.sh
            </p>
            <div className="font-anonymous text-[24px] w-full leading-[32px]">
              <p className="mb-0">
                C&apos;est LE Club Informatique de l&apos;INSA Hauts-de-France.
                Nous regroupons tous les étudiants passionnés d&apos;informatique,
                soutenons leurs projets & organisons des ateliers
                d&apos;initiation et conférences en informatique.
              </p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">
                Nous proposons aussi des services d&apos;hébergement aux
                associations et étudiants de l&apos;école. Par exemple, 4 sites
                de la Nuit de l&apos;info sont hébergés sur nos infrastructures
                cette année ! Pour cela, nous avons créé la plateforme
                HebergOS !
              </p>
              <p className="mb-0">&nbsp;</p>
              <p>@clubinfoinsahdf sur insta !</p>
            </div>
          </div>
          <div className="relative w-[438px] h-[298px] rounded-[32px] overflow-hidden">
            <Image
              alt="Club Info INSA"
              src="/images/club-info.png"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="flex flex-col gap-[64px] items-center justify-center overflow-hidden p-[64px] rounded-[64px] w-full">
          <div className="relative w-[896px] h-[370px]">
            <Image
              alt="Logo NDIR"
              src="/images/ndir-logo.png"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-[20px] items-center w-full">
            <p className="font-pixelify font-normal text-[48px] text-center text-white w-full leading-normal">
              La fine équipe, la voici, la voilà !
            </p>
            <p className="font-anonymous text-[24px] text-center text-white w-full leading-[32px]">
              Notre équipe est composée de 6 individus très mystérieux
            </p>
            <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
              {/* Baptiste SALTEL */}
              <div className="flex flex-col gap-[10px] items-center overflow-hidden p-[10px] w-[400px]">
                <div className="relative w-[300px] h-[300px] rounded-[32px] overflow-hidden">
                  <Image
                    alt="Baptiste SALTEL"
                    src="/images/baptiste.jpg"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-pixelify font-normal text-[48px] text-center text-white leading-normal">
                  Baptiste SALTEL
                </p>
                <p className="font-pixelify font-normal text-[24px] text-center text-white leading-normal">
                  aka &quot;Le seul, l&apos;unique, l&apos;exceptionnel, l&quot;ancêtre&quot;
                </p>
                <a
                  href="https://www.linkedin.com/in/baptiste-saltel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[40px] h-[40px] cursor-pointer"
                >
                  <Image
                    alt="LinkedIn"
                    src="/images/linkedin.png"
                    width={40}
                    height={40}
                  />
                </a>
              </div>

              {/* Maxime LEMAITRE */}
              <div className="flex flex-col gap-[10px] items-center overflow-hidden p-[10px] w-[400px]">
                <div className="relative w-[300px] h-[300px] rounded-[32px] overflow-hidden">
                  <Image
                    alt="Maxime LEMAITRE"
                    src="/images/maxime.jpg"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-pixelify font-normal text-[48px] text-center text-white leading-normal">
                  Maxime LEMAITRE
                </p>
                <p className="font-pixelify font-normal text-[24px] text-center text-white leading-normal">
                  aka &quot;8 en compta mais trésorier de l&apos;asso&quot;
                </p>
                <a
                  href="https://www.linkedin.com/in/lemaitre-maxime/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[40px] h-[40px] cursor-pointer"
                >
                  <Image
                    alt="LinkedIn"
                    src="/images/linkedin.png"
                    width={40}
                    height={40}
                  />
                </a>
              </div>

              {/* Clément OGE */}
              <div className="flex flex-col gap-[10px] items-center overflow-hidden p-[10px] w-[400px]">
                <div className="relative w-[300px] h-[300px] rounded-[32px] overflow-hidden">
                  <Image
                    alt="Clément OGE"
                    src="/images/clement.jpg"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-pixelify font-normal text-[48px] text-center text-white leading-normal">
                  Clément OGE
                </p>
                <p className="font-pixelify font-normal text-[24px] text-center text-white leading-normal">
                  aka &quot;sympa cette API maintenant essayons de la DDoS&quot;
                </p>
                <a
                  href="https://www.linkedin.com/in/coge/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[40px] h-[40px] cursor-pointer"
                >
                  <Image
                    alt="LinkedIn"
                    src="/images/linkedin.png"
                    width={40}
                    height={40}
                  />
                </a>
              </div>

              {/* Maël ADVISSE */}
              <div className="flex flex-col gap-[10px] items-center overflow-hidden p-[10px] w-[400px]">
                <div className="relative w-[300px] h-[300px] rounded-[32px] overflow-hidden">
                  <Image
                    alt="Maël ADVISSE"
                    src="/images/mael.jpg"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-pixelify font-normal text-[48px] text-center text-white leading-normal">
                  Maël ADVISSE
                </p>
                <p className="font-pixelify font-normal text-[24px] text-center text-white leading-normal">
                  aka &quot;3D-printer-and-developper-and-volleyball-man&quot;
                </p>
                <a
                  href="https://www.linkedin.com/in/mael-advisse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[40px] h-[40px] cursor-pointer"
                >
                  <Image
                    alt="LinkedIn"
                    src="/images/linkedin.png"
                    width={40}
                    height={40}
                  />
                </a>
              </div>

              {/* Ambre PETIT */}
              <div className="flex flex-col gap-[10px] items-center overflow-hidden p-[10px] w-[400px]">
                <div className="relative w-[300px] h-[300px] rounded-[32px] overflow-hidden">
                  <Image
                    alt="Ambre PETIT"
                    src="/images/ambre.jpg"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-pixelify font-normal text-[48px] text-center text-white leading-normal">
                  Ambre PETIT
                </p>
                <p className="font-pixelify font-normal text-[24px] text-center text-white leading-normal">
                  aka &quot;la hackeuse aux goûts douteux parce que 7FFF00
                  c&apos;est vraiment moche&quot;
                </p>
                <a
                  href="https://www.linkedin.com/in/ambre-petit-7aa784290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[40px] h-[40px] cursor-pointer"
                >
                  <Image
                    alt="LinkedIn"
                    src="/images/linkedin.png"
                    width={40}
                    height={40}
                  />
                </a>
              </div>

              {/* Louison BEDNAROWICZ */}
              <div className="flex flex-col gap-[10px] items-center overflow-hidden p-[10px] w-[400px]">
                <div className="relative w-[300px] h-[300px] rounded-[32px] overflow-hidden">
                  <Image
                    alt="Louison BEDNAROWICZ"
                    src="/images/louison.jpg"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-pixelify font-normal text-[48px] text-center text-white leading-normal">
                  Louison BEDNAROWICZ
                </p>
                <p className="font-pixelify font-normal text-[24px] text-center text-white leading-normal">
                  aka &quot;connaissez vous INSASH/Codinsa/[INSEREZ NOUVELLE
                  ASSO] ?&quot;
                </p>
                <a
                  href="https://www.linkedin.com/in/louisonbednarowicz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[40px] h-[40px] cursor-pointer"
                >
                  <Image
                    alt="LinkedIn"
                    src="/images/linkedin.png"
                    width={40}
                    height={40}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Model Credits Section */}
        <div
          className="relative flex gap-[64px] items-center justify-center overflow-hidden p-[64px] rounded-[64px] w-full"
        >
          {/* Gradient backgrounds */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse 124.45px 5.9993px at 95% 36%, rgba(237,0,130,1) 0%, rgba(177,0,98,1) 25%, rgba(118,0,65,1) 50%, rgba(89,0,49,1) 62.5%, rgba(59,0,33,1) 75%, rgba(30,0,16,1) 87.5%, rgba(15,0,8,1) 93.75%, rgba(0,0,0,1) 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(ellipse 27.65px 2.2185px at 10% 50%, rgba(79,0,237,1) 0%, rgba(59,0,177,1) 25%, rgba(39,0,118,1) 50%, rgba(30,0,89,1) 62.5%, rgba(20,0,59,1) 75%, rgba(10,0,30,1) 87.5%, rgba(5,0,15,1) 93.75%, rgba(0,0,0,1) 100%)`,
            }}
          />

          <div className="relative z-10 w-[209px] h-[220px]">
            <Image
              alt="Modèle 3D ordinateur"
              src="/images/cursor.png"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative z-10 flex flex-1 flex-col gap-[22px] items-center text-white">
            <p className="font-pixelify font-normal text-[48px] w-full leading-normal">
              Le modèle 3D de l&apos;ordinateur
            </p>
            <div className="font-anonymous text-[24px] w-full leading-[32px]">
              <p className="mb-0">
                Nous remercions Sketchfab.com et @anarki3000 pour son modèle 3D
                libre de droits -
                https://sketchfab.com/3d-models/old-pc-f0dca426be374fba96af9675799f9855
              </p>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
