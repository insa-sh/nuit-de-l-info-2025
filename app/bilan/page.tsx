"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ActionsPrises from "@/components/ActionsPrises";
import { ameliorations } from "@/app/consts";
import initApi from "@/app/game/InitApi";
import InfoPopup from "@/components/InfoPopup";

export default function BilanPage() {
  const [purchasedIds, setPurchasedIds] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    description: string;
    imageSrc: string;
  } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      const data = await initApi();
      if (data && data.purchases && Array.isArray(data.purchases)) {
        setPurchasedIds(data.purchases.map((u: any) => u.id));
      }
    };
    fetchPurchases();
  }, []);

  const handleActionClick = (amelioration: (typeof ameliorations)[0]) => {
    setSelectedItem({
      title: amelioration.title,
      description: amelioration.choix[0]?.description || "Amélioration",
      imageSrc: amelioration.icone,
    });
    setIsPopupOpen(true);
  };

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
            {ameliorations.map((amelioration) => (
              <div
                key={amelioration.id}
                onClick={() => handleActionClick(amelioration)}
                className="cursor-pointer"
              >
                <ActionsPrises
                  variant={
                    purchasedIds.includes(amelioration.id) ? "valide" : "erreur"
                  }
                >
                  {amelioration.title}
                </ActionsPrises>
              </div>
            ))}
          </div>
        </div>

        {/* Les recommandations de la NIRD
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
        </div> */}
      </div>

      {selectedItem && (
        <InfoPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          title={selectedItem.title}
          description={selectedItem.description}
          imageSrc={selectedItem.imageSrc}
          primaryButtonText="Compris !"
          secondaryButtonText="En savoir plus"
        />
      )}
    </div>
  );
}
