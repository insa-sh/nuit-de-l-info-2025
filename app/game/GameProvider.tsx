"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import getCurrency from "./GetCurrency";

interface GameContextType {
  currency: number;
  updateCurrency: () => Promise<void>;
  refreshData: () => Promise<any>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState(0);

  const updateCurrency = async () => {
    const data = await getCurrency();
    if (data && typeof data.currency === "number") {
      setCurrency(data.currency);
    }
    return data;
  };

  const refreshData = async () => {
    return await updateCurrency();
  };

  useEffect(() => {
    // Récupération initiale
    updateCurrency();

    // Mise à jour périodique toutes les secondes
    const interval = setInterval(updateCurrency, 1000);
  }, []);

  return (
    <GameContext.Provider value={{ currency, updateCurrency, refreshData }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
