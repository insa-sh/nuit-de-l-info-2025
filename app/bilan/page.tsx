import React from "react";
import Header from "@/components/Header";
import ActionsPrises from "@/components/ActionsPrises";

export default function BilanPage() {
  return (
    <div className="bg-background-base flex flex-col gap-[24px] items-center justify-center p-[28px] min-h-screen w-full">
      <div className="flex flex-col gap-[24px] items-center w-full max-w-[1456px]">
        {/* Header */}
        <Header />

        {/* Mon parc informatique */}
        <div className="flex flex-col gap-[24px] items-start w-full max-w-[838px]">
          <h1 className="font-pixelify font-normal text-[48px] text-white leading-normal w-full">
            Mon parc informatique
          </h1>
          <div className="grid grid-cols-2 gap-[16px] w-full">
            <ActionsPrises variant="valide">
              J&apos;ai changé mon système d&apos;exploitation
            </ActionsPrises>
            <ActionsPrises variant="valide">
              J&apos;ai changé mon système d&apos;exploitation
            </ActionsPrises>
            <ActionsPrises variant="valide">
              J&apos;ai changé mon système d&apos;exploitation
            </ActionsPrises>
            <ActionsPrises variant="erreur">
              J&apos;ai changé mon système d&apos;exploitation
            </ActionsPrises>
            <ActionsPrises variant="erreur">
              J&apos;ai changé mon système d&apos;exploitation
            </ActionsPrises>
            <ActionsPrises variant="erreur">
              J&apos;ai changé mon système d&apos;exploitation
            </ActionsPrises>
          </div>
        </div>

        {/* Les recommandations de la NIRD */}
        <div className="flex flex-col gap-[24px] items-start w-full max-w-[838px]">
          <h1 className="font-pixelify font-normal text-[48px] text-white leading-normal w-full">
            Les recommandations de la NIRD
          </h1>
          <div className="grid grid-cols-2 gap-[16px] w-full">
            <ActionsPrises variant="info">
              J&apos;ai changé mon système d&apos;exploitation
            </ActionsPrises>
            <ActionsPrises variant="info">
              J&apos;ai changé mon système d&apos;exploitation
            </ActionsPrises>
            <ActionsPrises variant="info">
              J&apos;ai changé mon système d&apos;exploitation
            </ActionsPrises>
          </div>
        </div>

        {/* Footer */}
        <p className="font-anonymous font-bold text-[14px] text-white leading-normal">
          Crédits
        </p>
      </div>
    </div>
  );
}
