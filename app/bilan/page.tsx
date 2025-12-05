import React from "react";
import Header from "@/components/Header";
import ActionsPrises from "@/components/ActionsPrises";

export default function BilanPage() {
  return (
    <div className="bg-background-base flex flex-col gap-[24px] items-center p-[28px] min-h-screen w-full">
      <div className="flex flex-col gap-[24px] w-full">
        {/* Header */}
        <Header />

        {/* Mon parc informatique */}
        <div className="flex flex-col gap-[24px] items-center w-full">
          <h1 className="font-pixelify font-normal text-[48px] text-white leading-normal w-full max-w-[838px]">
            Mon parc informatique
          </h1>
          <div className="grid grid-cols-2 gap-[16px] w-full max-w-[838px]">
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
        <div className="flex flex-col gap-[24px] items-center w-full">
          <h1 className="font-pixelify font-normal text-[48px] text-white leading-normal w-full max-w-[838px]">
            Les recommandations de la NIRD
          </h1>
          <div className="grid grid-cols-2 gap-[16px] w-full max-w-[838px]">
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

      </div>
    </div>
  );
}
