"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import initApi from "./InitApi";

interface GameContextType {
  currency: number;
  updateCurrency: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState(0);

  const updateCurrency = async () => {
    const data = await initApi();
    if (data && typeof data.currency === "number") {
      setCurrency(data.currency);
    }
  };

  useEffect(() => {
    // Récupération initiale
    updateCurrency();

    // Mise à jour périodique toutes les secondes
    const interval = setInterval(updateCurrency, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider value={{ currency, updateCurrency }}>
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
